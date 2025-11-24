"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Pencil } from "lucide-react";
import { toast } from "sonner";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
} from "@/store/slice/apiSlice";

// Profile Schema with file validation
const profileSchema = z.object({
  full_name: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  profile_pic: z
    .instanceof(File)
    .optional()
    .refine(
      (file) => !file || file.size <= 1024 * 1024,
      "Image size must be less than 1MB"
    )
    .refine(
      (file) => !file || file.type.startsWith("image/"),
      "File must be an image"
    ),
});

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function ProfileSettings() {
  const [isProfileEditing, setIsProfileEditing] = useState(false);
  const [isPasswordEditing, setIsPasswordEditing] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // RTK Query
  const { data: profile, isLoading } = useGetProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const [changePassword, { isLoading: isChangingPassword }] =
    useChangePasswordMutation();

  // Forms
  const profileForm = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: { 
      full_name: "", 
      email: "",
      profile_pic: undefined 
    },
  });

  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // Sync profile data - only update form values
  useEffect(() => {
    if (profile) {
      profileForm.reset({
        full_name: profile.full_name,
        email: profile.email,
        profile_pic: undefined
      });
    }
  }, [profile, profileForm]);

  // Compute preview URL - no state update in effect
  const displayPreviewUrl = previewUrl || profile?.profile_pic || "https://github.com/shadcn.png";

  // Handle image selection with preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Set the file in the form
    profileForm.setValue("profile_pic", file, { 
      shouldValidate: true 
    });

    // Check validation manually to show toast
    if (file.size > 1024 * 1024) {
      toast.error("Image size must be less than 1MB");
      e.target.value = "";
      setPreviewUrl(null);
      profileForm.setValue("profile_pic", undefined);
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("File must be an image");
      e.target.value = "";
      setPreviewUrl(null);
      profileForm.setValue("profile_pic", undefined);
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
      toast.success("Image selected – will be uploaded on save");
    };
    reader.readAsDataURL(file);
  };

  // Profile Submit
  const onProfileSubmit = async (values: z.infer<typeof profileSchema>) => {
    try {
      await updateProfile({
        full_name: values.full_name,
        email: values.email,
        profile_pic: values.profile_pic,
      }).unwrap();

      toast.success("Profile updated successfully");
      setIsProfileEditing(false);
    } catch (err: any) {
      toast.error(err?.data?.detail || "Failed to update profile");
    }
  };

  // Password Submit
  const onPasswordSubmit = async (values: z.infer<typeof passwordSchema>) => {
    try {
      await changePassword({
        old_password: values.currentPassword,
        new_password: values.newPassword,
      }).unwrap();

      toast.success("Password changed successfully");
      setIsPasswordEditing(false);
      passwordForm.reset();
    } catch (err: any) {
      toast.error(err?.data?.detail || "Failed to change password");
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center">Loading profile...</div>;
  }

  return (
    <div className="mx-auto p-6 space-y-6">
      {/* Profile Information */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-xl font-semibold">Profile Information</h2>
            <p className="text-sm text-gray-500">
              Update your personal information and profile picture
            </p>
          </div>
          {!isProfileEditing && (
            <Button
              onClick={() => setIsProfileEditing(true)}
              variant="outline"
              size="sm"
            >
              <Pencil className="w-4 h-4 mr-2" />
              Edit
            </Button>
          )}
        </div>

        <Form {...profileForm}>
          <form
            onSubmit={profileForm.handleSubmit(onProfileSubmit)}
            className="space-y-6"
          >
            {/* Avatar with Preview */}
            <div className="flex flex-col items-center gap-3">
              <div className="relative">
                <div className="w-40 h-40 rounded-full border-4 border-blue-500 overflow-hidden">
                  <Avatar className="w-full h-full">
                    <AvatarImage
                      src={displayPreviewUrl}
                      className="object-cover"
                    />
                    <AvatarFallback>
                      {profile?.full_name?.[0] || "A"}
                    </AvatarFallback>
                  </Avatar>
                </div>

                {isProfileEditing && (
                  <FormField
                    control={profileForm.control}
                    name="profile_pic"
                    render={({ field: { value, onChange, ...field } }) => (
                      <FormItem>
                        <FormLabel
                          htmlFor="avatar-upload"
                          className="absolute bottom-0 right-0 w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors shadow-lg"
                        >
                          <Pencil className="w-6 h-6 text-white" />
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            id="avatar-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              handleImageChange(e);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
              <span className="text-lg text-blue-500 font-semibold">
                Choose Photo (Max 1MB)
              </span>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={profileForm.control}
                name="full_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input {...field} readOnly={!isProfileEditing} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={profileForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        readOnly={!isProfileEditing}
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="off"
                        spellCheck={false}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {isProfileEditing && (
              <div className="flex justify-center gap-3">
                <Button
                  size="lg"
                  type="button"
                  variant="outline"
                  onClick={() => {
                    profileForm.reset({
                      full_name: profile?.full_name || "",
                      email: profile?.email || "",
                      profile_pic: undefined,
                    });
                    setPreviewUrl(null);
                    setIsProfileEditing(false);
                  }}
                  disabled={isUpdating}
                >
                  Cancel
                </Button>
                <Button size="lg" type="submit" disabled={isUpdating}>
                  {isUpdating ? "Saving..." : "Save"}
                </Button>
              </div>
            )}
          </form>
        </Form>
      </div>

      {/* Change Password */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-xl font-semibold">Change Password</h2>
            <p className="text-sm text-gray-500">
              Password must be at least 8 characters including symbol and number
            </p>
          </div>
          {!isPasswordEditing && (
            <Button
              onClick={() => setIsPasswordEditing(true)}
              variant="outline"
              size="sm"
            >
              <Pencil className="w-4 h-4 mr-2" />
              Edit
            </Button>
          )}
        </div>

        <Form {...passwordForm}>
          <form
            onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 gap-4">
              <FormField
                control={passwordForm.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="••••••••"
                        readOnly={!isPasswordEditing}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={passwordForm.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="••••••••"
                        readOnly={!isPasswordEditing}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={passwordForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm New password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="••••••••"
                        readOnly={!isPasswordEditing}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {isPasswordEditing && (
              <div className="flex justify-center gap-3">
                <Button
                  size="lg"
                  type="button"
                  variant="outline"
                  onClick={() => {
                    passwordForm.reset();
                    setIsPasswordEditing(false);
                  }}
                  disabled={isChangingPassword}
                >
                  Cancel
                </Button>
                <Button size="lg" type="submit" disabled={isChangingPassword}>
                  {isChangingPassword ? "Updating..." : "Update"}
                </Button>
              </div>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
}