export interface ProfileResponse {
  id: string;
  profile_pic: string;
  email: string;
  full_name: string;
}

export interface UpdateProfileRequest {
  full_name?: string;
  profile_pic?: File;
  email?: string;
}

export interface UpdateProfileResponse {
  detail: string;
}

export interface PasswordChangeRequest {
  old_password: string;
  new_password: string;
}
