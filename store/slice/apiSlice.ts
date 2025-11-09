import { setCookie } from "@/hooks/cookie";
import { LoginFormValues, LoginResponse } from "@/types/auth.type";
import { ModuleListResponse } from "@/types/module.type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "sonner";

// interface ProfileResponse {
//     success: boolean;
// }

// interface ProfileRequest {
//     full_name: string;
//     profile_pic: File; // Changed from FormData to File
// }

const BASE_URL = "http://10.10.13.22:8000"

export const mainApi = createApi({
  reducerPath: "mainApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {

        if (!headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
      }

      if (typeof window !== "undefined") {
        const accessToken = document.cookie
          .split("; ")
          .find((row) => row.startsWith("access_token"))
          ?.split("=")[1];

        if (accessToken) {
          headers.set("Authorization", `Bearer ${accessToken}`);
        }
      }
    },
  }),
  endpoints: (builder) => ({
    //     updateProfile: builder.mutation<ProfileResponse, ProfileRequest>(
    //         {
    //         query: (body) => {
    //             const formData = new FormData();
    //             formData.append("full_name", body.full_name);
    //             formData.append("profile_pic", body.profile_pic);

    //             return {
    //                 url: "control/profile/",
    //                 method: "PATCH", // Fixed typo: was "PETCH"
    //                 headers: {
    //                     'Content-Type': 'multipart/form-data;'
    //                 },
    //                 body: formData, // Pass formData directly, not wrapped in object
    //                 // Don't set Content-Type header - browser will set it automatically with boundary
    //             };
    //         }
    //     }
    // ),

    // authentication
    
    login: builder.mutation<LoginResponse, LoginFormValues>({
      query: (body) => {
        return {
          url: "/auth/login/",
          method: "POST",
          body,
        };
      },
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.access_token) {
            setCookie("access_token", data.access_token);
            setCookie("refresh_token", data.refresh_token);
            toast.success("Login Success");
          } else {
            toast.error(data.error || "Something went wrong.");
          }
        } catch (error) {
          const err = error as Error;
          toast.error(err.message || "Something went wrong in function");
        }
      },
    }),
    getModules: builder.query<ModuleListResponse, {page?: number;}>({
        query: ({page = 1}) => {
            const params = new URLSearchParams({
                page: String(page),
            })
            return{
                url: `/admin-api/modules/?${params}`,
                method: "GET",
            }
        }
    }),
    deleteModule: builder.mutation<{msg: string}, {id: string}>({
        query: (id) =>({
            url: `/admin-api/modules/${id}/delete/`,
            method: "DELETE",
            credentials: "include"
        })
    })
  }),
});

export const {
  // useUpdateProfileMutation,

  // authentication
  useLoginMutation,
  // Modules
  useGetModulesQuery,
  useDeleteModuleMutation
} = mainApi;
