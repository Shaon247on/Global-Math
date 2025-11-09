"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useUpdateProfileMutation } from "@/store/slice/apiSlice";

const MAX_FILE_SIZE = 1 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const formSchema = z.object({
  full_name: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  profile_pic: z
    .instanceof(File, { message: "Please select a profile picture" })
    .refine((file) => file.size <= MAX_FILE_SIZE, "Max file size is 1MB")
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported"
    ),
});

function TestingPage() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [updateProfile, { isLoading, isSuccess, isError, error }] = useUpdateProfileMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: "",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (file) {
      // Set the file in form
      form.setValue("profile_pic", file, { shouldValidate: true });
      
      // Create preview
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const result = await updateProfile({
        full_name: values.full_name,
        profile_pic: values.profile_pic,
      }).unwrap();
      
      console.log("Profile updated successfully:", result);
      
      // Reset form and preview
      form.reset();
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
      }
    } catch (err) {
      console.error("Failed to update profile:", err);
    }
  }

  // Cleanup preview URL on unmount
 useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Full Name Field */}
          <FormField
            control={form.control}
            name="full_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Full Name" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Profile Picture Field */}
          <FormField
            control={form.control}
            name="profile_pic"
            render={({ field: { value, onChange, ...field } }) => (
              <FormItem>
                <FormLabel>Profile Picture</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    onChange={handleFileChange}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Upload a profile picture (JPG, PNG, or WebP, max 5MB)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Image Preview */}
          {previewUrl && (
            <div className="flex flex-col items-start space-y-2">
              <p className="text-sm font-medium">Preview:</p>
              <img
                src={previewUrl}
                alt="Profile preview"
                className="w-32 h-32 object-cover rounded-full border-2 border-gray-300"
              />
            </div>
          )}

          {/* Submit Button */}
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Updating..." : "Submit"}
          </Button>

          {/* Status Messages */}
          {isSuccess && (
            <div className="p-4 bg-green-50 text-green-800 rounded-md">
              Profile updated successfully!
            </div>
          )}
          
          {isError && (
            <div className="p-4 bg-red-50 text-red-800 rounded-md">
              Error: {error && 'data' in error 
                ? JSON.stringify(error.data) 
                : 'Failed to update profile'}
            </div>
          )}
        </form>
      </Form>
    </div>
  );
}

export default TestingPage;