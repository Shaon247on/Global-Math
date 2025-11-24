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
import { moduleData } from "@/data/moduleData";
import { useCreateModuleMutation } from "@/store/slice/apiSlice";
import { ModuleCreateResponse } from "@/types/module.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(2).max(50),
});

interface AddModuleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  id?: string;
}
function AddModuleDialog({ onOpenChange, open, id }: AddModuleDialogProps) {
  const moduleDetails = moduleData.find((item) => item.id === id);

  const [createModule, { isLoading }] = useCreateModuleMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: moduleDetails?.moduleName || "",
    },
  });

  console.log("The id:", id);

  useEffect(() => {
    if (moduleDetails) {
      form.setValue("name", moduleDetails.moduleName);
    }
  }, [moduleDetails, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    if (id !== "" && id !== undefined) {
      toast.success("Module edited Successfully");
      onOpenChange(false);
    } else {
      const response = await createModule({
        module_name: values.name,
      }).unwrap();
      if (response.id) {
        toast.success("Module Created");
        onOpenChange(false);
      } else {
        toast.error(response.detail || "Failed to create module");
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle>
          {id !== "" ? "Edit Module" : "Add New Module"}
        </DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Module Name</FormLabel>
                  <FormControl>
                    <Input placeholder="module name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="space-x-2">
              <Button
                variant={"outline"}
                type="button"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default AddModuleDialog;
