"use client";

import { useState } from "react";
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
import { Camera, Pencil } from "lucide-react";
import { toast } from "sonner";

// Profile Information Schema
const profileSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  role: z.string().min(2, {
    message: "Role must be at least 2 characters.",
  }),
  phoneNumber: z.string().min(10, {
    message: "Phone number must be at least 10 characters.",
  }),
});

// Password Schema
const passwordSchema = z
  .object({
    currentPassword: z.string().min(8, {
      message: "Current password is required.",
    }),
    newPassword: z
      .string()
      .min(8, {
        message: "Password must be at least 8 characters.",
      })
      .regex(/[0-9]/, {
        message: "Password must include at least one number.",
      })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Password must include at least one symbol.",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function ProfileSettings() {
  const [isProfileEditing, setIsProfileEditing] = useState(false);
  const [isPasswordEditing, setIsPasswordEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Profile Form
  const profileForm = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: "Alex David",
      email: "Alex.David",
      role: "Admin",
      phoneNumber: "+987875432",
    },
  });

  // Password Form
  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // Handle Profile Submit
  const onProfileSubmit = (values: z.infer<typeof profileSchema>) => {
    console.log("Profile Data:", values);
    setIsProfileEditing(false);
    toast.success("Profile Updated", {
      description: "Your profile information has been saved successfully.",
    });
  };

  // Handle Password Submit
  const onPasswordSubmit = (values: z.infer<typeof passwordSchema>) => {
    console.log("Password Data:", values);
    setIsPasswordEditing(false);
    passwordForm.reset();
    toast.success("Password Updated", {
      description: "Your password information has been saved successfully.",
    });
  };

  // Handle Image Upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        console.log("Selected Image:", file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Cancel Actions
  const handleProfileCancel = () => {
    profileForm.reset();
    setIsProfileEditing(false);
  };

  const handlePasswordCancel = () => {
    passwordForm.reset();
    setIsPasswordEditing(false);
  };

  return (
    <div className=" mx-auto p-6 space-y-6">
      {/* Profile Information Section */}
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
            {/* Avatar Section */}
            <div className="flex flex-col items-center gap-3">
              <div className="relative">
                <div className="relative w-40 h-40 rounded-full border-4 border-blue-500 overflow-hidden cursor-pointer">
                  <Avatar className="w-full h-full">
                    <AvatarImage
                      src={selectedImage || "https://github.com/shadcn.png"}
                      className="object-cover"
                    />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                </div>

                {isProfileEditing && (
                  <label
                    htmlFor="avatar-upload"
                    className="absolute bottom-0 right-0 w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors shadow-lg"
                  >
                    <Pencil className="w-6 h-6 text-white" />
                    <input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                      disabled={!isProfileEditing}
                    />
                  </label>
                )}
              </div>

              <span className="text-lg text-blue-500 font-semibold">
                Choose Photo
              </span>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={profileForm.control}
                name="fullName"
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
                      <Input {...field} readOnly={!isProfileEditing} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={profileForm.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <Input {...field} readOnly={!isProfileEditing} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={profileForm.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input {...field} readOnly={!isProfileEditing} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Action Buttons */}
            {isProfileEditing && (
              <div className="flex justify-center gap-3">
                <Button
                  size={"lg"}
                  type="button"
                  variant="outline"
                  onClick={handleProfileCancel}
                >
                  Cancel
                </Button>
                <Button size={"lg"} type="submit">
                  Save
                </Button>
              </div>
            )}
          </form>
        </Form>
      </div>

      {/* Change Password Section */}
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

            {/* Action Buttons */}
            {isPasswordEditing && (
              <div className="flex justify-center gap-3">
                <Button
                  size={"lg"}
                  type="button"
                  variant="outline"
                  onClick={handlePasswordCancel}
                >
                  Cancel
                </Button>
                <Button size={"lg"} type="submit">
                  Update
                </Button>
              </div>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
}
