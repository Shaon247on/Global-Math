// src/store/slice/apiSlice.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCookie } from "@/hooks/cookie";
import { LoginFormValues, LoginResponse } from "@/types/auth.type";
import {
  ModuleCreateRequest,
  ModuleCreateResponse,
  ModuleListResponse,
} from "@/types/module.type";
import { toast } from "sonner";
import { DurationItem, DurationListResponse } from "@/types/quizDuration.type";
import {
  PasswordChangeRequest,
  ProfileResponse,
  UpdateProfileRequest,
  UpdateProfileResponse,
} from "@/types/profile.type";
import { QuestionListResponse, QuestionRquestion } from "@/types/question.type";
import { StudentListRequest, StudentListResponse } from "@/types/student.type";

const BASE_URL = "http://10.10.13.96:8000";

export const mainApi = createApi({
  reducerPath: "mainApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { endpoint }) => {
      // Don't set Content-Type for updateProfile - let browser set it for FormData
      if (endpoint !== "updateProfile") {
        headers.set("Content-Type", "application/json");
      }

      if (typeof window !== "undefined") {
        const accessToken = document.cookie
          .split("; ")
          .find((row) => row.startsWith("access_token="))
          ?.split("=")[1];

        if (accessToken) {
          headers.set("Authorization", `Bearer ${accessToken}`);
        }
      }
      return headers;
    },
  }),
  tagTypes: ["Module", "Duration", "Profile", "Question", "Student"],
  endpoints: (builder) => ({
    // auth endpoint

    login: builder.mutation<LoginResponse, LoginFormValues>({
      query: (body) => ({
        url: "/auth/login/",
        method: "POST",
        body,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.access_token) {
            setCookie("access_token", data.access_token);
            setCookie("refresh_token", data.refresh_token);
            toast.success("Login Success");
          }
        } catch {
          toast.error("Login failed");
        }
      },
    }),

    // Module endpoints

    getModules: builder.query<ModuleListResponse, { page?: number }>({
      query: ({ page = 1 }) => ({
        url: "/admin-api/modules/",
        method: "GET",
        params: { page },
      }),
      providesTags: (result) =>
        result
          ? [
              { type: "Module", id: "LIST" },
              ...result.results.map(({ id }) => ({
                type: "Module" as const,
                id,
              })),
            ]
          : [{ type: "Module", id: "LIST" }],
    }),

    createModule: builder.mutation<ModuleCreateResponse, ModuleCreateRequest>({
      query: (body) => ({
        url: "/admin-api/modules/",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Module", id: "LIST" }],
    }),

    deleteModule: builder.mutation<{ msg: string }, { id: string }>({
      query: ({ id }) => ({
        url: `/admin-api/modules/${id}/delete/`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Module", id },
        { type: "Module", id: "LIST" },
      ],
    }),

    // duration endpoints

    getQuizDurations: builder.query<DurationListResponse, void>({
      query: () => "/admin-api/quiz-duration/",
      providesTags: ["Duration"],
    }),

    createQuizDuration: builder.mutation<DurationItem, { duration: number }>({
      query: (body) => ({
        url: "/admin-api/quiz-duration/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Duration"],
    }),

    UpdateQuizDuration: builder.mutation<
      DurationItem,
      { id: string; duration: number }
    >({
      query: ({ id, ...body }) => ({
        url: `/admin-api/quiz-duration/${id}/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Duration"],
    }),

    deleteQuizDuration: builder.mutation<{ msg: string }, { id: string }>({
      query: ({ id }) => ({
        url: `/admin-api/quiz-duration/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Duration"],
    }),

    // Profile endpoints

    getProfile: builder.query<ProfileResponse, void>({
      query: () => "/admin-api/profile-information/",
      providesTags: ["Profile"],
    }),

    updateProfile: builder.mutation<
      UpdateProfileResponse,
      UpdateProfileRequest
    >({
      query: (body) => {
        const formData = new FormData();

        if (body.full_name !== undefined) {
          formData.append("full_name", body.full_name);
        }
        if (body.email !== undefined) {
          formData.append("email", body.email);
        }
        if (body.profile_pic !== undefined) {
          formData.append("profile_pic", body.profile_pic);
        }

        return {
          url: "/admin-api/profile-information/",
          method: "PATCH",
          body: formData,
          credentials: "include",
        };
      },
      invalidatesTags: ["Profile"],
    }),

    changePassword: builder.mutation<{ detail: string }, PasswordChangeRequest>(
      {
        query: (body) => ({
          url: "/admin-api/update-password/",
          method: "POST",
          body,
          credentials: "include",
        }),
      }
    ),

    // question endpoints

    getQuestion: builder.query<QuestionListResponse, QuestionRquestion>({
      query: ({ module, page = 1 }) => ({
        url: "/admin-api/questions/",
        method: "GET",
        params: { module, page },
      }),
      providesTags: ["Question"],
    }),
    // student endpoints
    getStudents: builder.query<StudentListResponse, StudentListRequest>({
      query: ({ page = 1, order_by, duration, search }) => ({
        url: "/admin-api/student-list/",
        method: "GET",
        params: { page, order_by, duration, search },
      }),
      providesTags: ["Student"],
    })
  }),
});

export const {
  // auth Hooks
  useLoginMutation,
  // Module Hooks
  useGetModulesQuery,
  useCreateModuleMutation,
  useDeleteModuleMutation,
  // Quiz Duration Hooks
  useGetQuizDurationsQuery,
  useCreateQuizDurationMutation,
  useUpdateQuizDurationMutation,
  useDeleteQuizDurationMutation,
  // Profile Hooks
  useGetProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  // Question Hooks
  useGetQuestionQuery,
  // Student Hooks
  useGetStudentsQuery,
} = mainApi;
