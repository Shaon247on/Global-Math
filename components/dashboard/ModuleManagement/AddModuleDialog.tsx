"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  useCreateModuleMutation,
  useGetModuleByIdQuery,
  useUpdateModuleMutation,
} from "@/store/slice/apiSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(2, "Module name must be at least 2 characters").max(100),
});

interface AddModuleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  id?: string; // undefined or "" → create mode, valid ID → edit mode
}

export default function AddModuleDialog({
  open,
  onOpenChange,
  id,
}: AddModuleDialogProps) {
  const isEditMode = !!id && id !== "";

  // Only fetch if we have a valid ID
  const {
    data: moduleData,
    isLoading: isFetching,
    isError,
  } = useGetModuleByIdQuery(
    { id: id! },
    {
      skip: !isEditMode, // Skip when creating new
    }
  );

  const [createModule, { isLoading: isCreating }] = useCreateModuleMutation();
  const [updateModule, { isLoading: isUpdating }] = useUpdateModuleMutation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  // Fill form when editing
  useEffect(() => {
    if (isEditMode && moduleData) {
      form.reset({
        name: moduleData.module_name || "",
      });
    } else if (!isEditMode) {
      form.reset({ name: "" });
    }
  }, [moduleData, isEditMode, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (isEditMode) {
        // You'll add update mutation later
        const response = await updateModule({
          id: id!,
          module_name: values.name,
        }).unwrap();
        if (response.id) {
          toast.success("Module updated successfully!");
        } else {
          toast.error(response?.detail || "Failed to update module");
        }
      } else {
        await createModule({ module_name: values.name }).unwrap();
        toast.success("Module created successfully!");
      }
      onOpenChange(false);
      form.reset();
    } catch (error) {
      const err = error as { data?: { detail?: string } };
      toast.error(err?.data?.detail || "Failed to save module");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogTitle className="text-2xl font-bold text-center">
          {isEditMode ? "Edit Module" : "Add New Module"}
        </DialogTitle>

        {isFetching ? (
          <div className="py-8 text-center text-gray-500">
            Loading module...
          </div>
        ) : isError ? (
          <div className="py-8 text-center text-red-600">
            Failed to load module
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Module Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter module name"
                        {...field}
                        disabled={isCreating}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  disabled={isCreating}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isCreating || isFetching}
                  className="bg-[#5CA1FE] hover:bg-[#5CA1FE]/90"
                >
                  {isCreating
                    ? "Saving..."
                    : isEditMode
                    ? "Save Changes"
                    : "Create Module"}
                </Button>
              </div>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
