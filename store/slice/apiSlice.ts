// src/store/slice/apiSlice.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCookie } from "@/hooks/cookie";
import { LoginFormValues, LoginResponse } from "@/types/auth.type";
import {
  ModuleCreateRequest,
  ModuleCreateResponse,
  ModuleListResponse,
  ModuleQuizStatsResponse,
} from "@/types/module.type";
import { toast } from "sonner";
import { DurationItem, DurationListResponse } from "@/types/quizDuration.type";
import {
  PasswordChangeRequest,
  ProfileResponse,
  UpdateProfileRequest,
  UpdateProfileResponse,
} from "@/types/profile.type";
import {
  CreateQuestionRequest,
  QuestionItem,
  QuestionListResponse,
} from "@/types/question.type";
import {
  StudentDetailsResponse,
  StudentListRequest,
  StudentListResponse,
} from "@/types/student.type";
import { DashboardStatsResponse } from "@/types/dashboard.type";
import {
  OptionModule,
  OptionModuleCreateRequest,
  OptionModuleResponse,
} from "@/types/optionalModule.type";
import { SynopticModuleResponse } from "@/types/synoptic.type";
import page from "@/app/dashboard/page";
import { string } from "zod";

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
  tagTypes: [
    "Module",
    "OptionalPair",
    "Duration",
    "Profile",
    "Question",
    "Student",
    "StudentDetail",
    "Dashboard",
  ],
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
      providesTags: ["Module"],
    }),

    getModuleById: builder.query<ModuleQuizStatsResponse, { id: string }>({
      query: ({ id }) => `/admin-api/modules-detail/${id}/`,
    }),

    createModule: builder.mutation<ModuleCreateResponse, ModuleCreateRequest>({
      query: (body) => ({
        url: "/admin-api/modules/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Module"],
    }),

    updateModule: builder.mutation<
      ModuleCreateResponse,
      ModuleCreateResponse
    >({
      query: (body) => ({
        url: `/admin-api/modules-update/${body.id}/`,
        method: "PATCH",
        body,
        credentials: "include",
      }),
      invalidatesTags: ["Module"],
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

    // optional module endpoints

    getOptionalPairs: builder.query<OptionModuleResponse, void>({
      query: () => "/admin-api/optional-module-pair/",
      providesTags: ["OptionalPair"],
    }),

    createOptionalPair: builder.mutation<
      OptionModule,
      OptionModuleCreateRequest
    >({
      query: (body) => ({
        url: "/admin-api/optional-module-pair/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["OptionalPair"],
    }),

    deleteOptionalPair: builder.mutation<void, string>({
      query: (id) => ({
        url: `/admin-api/optional-module-pair/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["OptionalPair"],
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

    // student endpoints

    getStudents: builder.query<StudentListResponse, StudentListRequest>({
      query: ({ page = 1, order_by, duration, search }) => ({
        url: "/admin-api/student-list/",
        method: "GET",
        params: { page, order_by, duration, search },
      }),
      providesTags: ["Student"],
    }),

    getStudentDetail: builder.query<
      StudentDetailsResponse,
      { user_id: string }
    >({
      query: ({ user_id }) => `/admin-api/student-detail/?user_id=${user_id}`,
      providesTags: ["StudentDetail"],
    }),

    
    banStudent: builder.mutation<{msg: string}, {user_id: string}>({
      query: ({user_id}) =>({
        url: "/admin-api/ban-user/",
        mehter: "POST",
        body: {user_id},
        credentials: "include",
      }),
      invalidatesTags: ["Student"],
    }),
    unbanStudent: builder.mutation<{msg: string}, {user_id: string}>({
      query: ({user_id}) =>({
        url: "/admin-api/unban-user/",
        mehter: "POST",
        body: {user_id},
        credentials: "include",
      }),
      invalidatesTags: ["Student"],
    }),

    // Dashboard endpoints

    getDashboardStats: builder.query<
      DashboardStatsResponse,
      { period: "day" | "month" | "year" }
    >({
      query: ({ period }) => ({
        url: "/admin-api/dashboard/",
        method: "GET",
        params: { period },
      }),
      providesTags: ["Dashboard"],
    }),


    // Question endpoints

    getQuestions: builder.query<
      QuestionListResponse,
      {
        module: string;
        page?: number;
        search?: string;
      }
    >({
      query: ({ module, page = 1, search = "" }) => ({
        url: "/admin-api/questions/",
        method: "GET",
        params: { module, page, search },
      }),
      providesTags: (result, error, { module }) =>
        result
          ? [
              { type: "Question", id: "LIST" },
              ...result.results.map(({ id }) => ({
                type: "Question" as const,
                id,
              })),
              { type: "Question", id: `MODULE-${module}` },
            ]
          : [{ type: "Question", id: "LIST" }],
    }),

    createQuestion: builder.mutation<QuestionItem, CreateQuestionRequest>({
      query: (body) => ({
        url: "/admin-api/questions/",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Question", id: "LIST" }],
    }),

    updateQuestion: builder.mutation<
      QuestionItem,
      { id: string } & Partial<CreateQuestionRequest>
    >({
      query: ({ id, ...body }) => ({
        url: `/admin-api/questions/${id}/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Question", id },
        { type: "Question", id: "LIST" },
      ],
    }),

    deleteQuestion: builder.mutation<void, string>({
      query: (id) => ({
        url: `/admin-api/questions/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Question", id: "LIST" }],
    }),

    // Question Buld Upload endpoint
    downloadCsvTemplate: builder.query<string, void>({
      query: () => ({
        url: `/admin-api/demo-csv/`,
        method: "GET",
        responseHandler: "text", // ← Critical! Tells RTK to return raw text
        cache: "no-cache",
      }),
    }),

    uploadCsvQuestions: builder.mutation<
      { message: string; error?: string },
      { moduleId: string; file: File }
    >({
      query: ({ moduleId, file }) => {
        const formData = new FormData();
        formData.append("file", file);

        return {
          url: `/admin-api/upload-csv/${moduleId}/`,
          method: "POST",
          body: formData,
          // Don't set Content-Type — browser sets it with boundary
        };
      },
      invalidatesTags: [{ type: "Question", id: "LIST" }],
    }),

    // Synoptic Module endpoints
    
    getSynopticModules: builder.query<SynopticModuleResponse, {page?: number}>({
      query: ({page = 1}) => ({
        url: `/admin-api/synoptic-module/`,
        method: "GET",
        params: { page },
      }),
      providesTags: ["Module"],
    }),
    
    createSynopticModule: builder.mutation<string[], string[]>({
      query: (body) => ({
        url: `/admin-api/synoptic-module/`,
        method: "POST",
        body:{module_ids:body},
        credentials: "include",
      }),
      invalidatesTags: ["Module"],
    })
  }),
});

export const {
  // auth Hooks
  useLoginMutation,
  // Module Hooks
  useGetModulesQuery,
  useGetModuleByIdQuery,
  useCreateModuleMutation,
  useUpdateModuleMutation,
  useDeleteModuleMutation,
  // Optional Module Hooks
  useGetOptionalPairsQuery,
  useCreateOptionalPairMutation,
  useDeleteOptionalPairMutation,
  // Quiz Duration Hooks
  useGetQuizDurationsQuery,
  useCreateQuizDurationMutation,
  useUpdateQuizDurationMutation,
  useDeleteQuizDurationMutation,
  // Profile Hooks
  useGetProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  // Student Hooks
  useGetStudentsQuery,
  useGetStudentDetailQuery,
  useBanStudentMutation,
  useUnbanStudentMutation,
  // Dashboard Hooks
  useGetDashboardStatsQuery,
  // Question Hooks
  useGetQuestionsQuery,
  useCreateQuestionMutation,
  useUpdateQuestionMutation,
  useDeleteQuestionMutation,
  // Question Bulk Upload Hook
  useLazyDownloadCsvTemplateQuery,
  useUploadCsvQuestionsMutation,
  // Synoptic Module Hooks
  useGetSynopticModulesQuery,
  useCreateSynopticModuleMutation,
} = mainApi;
