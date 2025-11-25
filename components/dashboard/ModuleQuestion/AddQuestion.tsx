"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Upload, Plus } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import UploadCsvDialog from "./UploadCsvDialog";
import { useRouter } from "next/navigation";
import {
  useCreateQuestionMutation,
  useUpdateQuestionMutation,
  useGetQuestionsQuery,
  useLazyDownloadCsvTemplateQuery,
} from "@/store/slice/apiSlice";

interface AddQuestionProps {
  id: string; // module ID
  editMode?: boolean;
  questionId?: string; // only for edit
}

const formSchema = z.object({
  question: z.string().min(10, "Question must be at least 10 characters"),
  option1: z.string().min(1, "Option A is required"),
  option2: z.string().min(1, "Option B is required"),
  option3: z.string().min(1, "Option C is required"),
  option4: z.string().min(1, "Option D is required"),
  correctAnswer: z.enum(["option1", "option2", "option3", "option4"], {
    message: "Please select the correct answer",
  }),
});

export default function AddQuestion({
  id,
  editMode = false,
  questionId,
}: AddQuestionProps) {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  console.log("the id:",id)

  const [createQuestion, { isLoading: isCreating }] =
    useCreateQuestionMutation();
  const [updateQuestion, { isLoading: isUpdating }] =
    useUpdateQuestionMutation();
  const [triggerDownload] = useLazyDownloadCsvTemplateQuery();
  // Fetch single question for edit
  const { data: questionsData } = useGetQuestionsQuery(
    { module: id, page: 1 },
    { skip: !editMode || !questionId }
  );

  const currentQuestion = questionsData?.results.find(
    (q) => q.id === questionId
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      correctAnswer: "option1",
    },
  });

  // Load question data when editing
  useEffect(() => {
    if (editMode && currentQuestion) {
      form.reset({
        question: currentQuestion.question_text,
        option1: currentQuestion.option1,
        option2: currentQuestion.option2,
        option3: currentQuestion.option3,
        option4: currentQuestion.option4,
        correctAnswer: currentQuestion.correct_answer,
      });
    }
  }, [currentQuestion, editMode, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const payload = {
      module: id,
      question_text: values.question,
      option1: values.option1,
      option2: values.option2,
      option3: values.option3,
      option4: values.option4,
      correct_answer: values.correctAnswer,
    };

    try {
      if (editMode && questionId) {
        await updateQuestion({ id: questionId, ...payload }).unwrap();
        toast.success("Question updated successfully!");
      } else {
        await createQuestion(payload).unwrap();
        toast.success("Question added successfully!");
        form.reset();
      }
      router.push(`/dashboard/manage-question/${id}`);
    } catch (error) {
      const err = error as { data?: { detail?: string } };
      toast.error(err?.data?.detail || "Failed to save question");
    }
  };

  const handleDownloadCSV = async () => {
    try {
      const csvText = await triggerDownload().unwrap();

      // Create a Blob from the CSV text
      const blob = new Blob([csvText], { type: "text/csv;charset=utf-8;" });

      // Create a temporary link and trigger download
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "demo_questions_template.csv"); // filename
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success("CSV template downloaded successfully!");
    } catch (error) {
      console.error("Download failed:", error);
      toast.error("Failed to download CSV template");
    }
  };

  const handleUploadCSV = () => {
    setOpen(true);
  };

  return (
    <div className="w-full space-y-6">
      <UploadCsvDialog open={open} setOpen={setOpen} moduleId={id}/>

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-lg">
        <h1 className="text-2xl font-bold uppercase">
          {editMode ? "Edit Question" : "Add Question"}
        </h1>
        {!editMode && (
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Button
              onClick={handleDownloadCSV}
              variant="outline"
              className="border-[#5CA1FE] text-[#5CA1FE] hover:bg-[#5CA1FE]/10"
            >
              <Download className="h-4 w-4 mr-2" />
              Download CSV File
            </Button>
            <Button
              onClick={handleUploadCSV}
              className="bg-[#5CA1FE] hover:bg-[#5CA1FE]/90 text-white"
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload CSV File
            </Button>
          </div>
        )}
      </div>

      {/* Form */}
      <div className="bg-white p-4 sm:p-6 lg:p-10 border-2 rounded-lg">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">
                    Question:
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write Question here"
                      className="min-h-[100px] resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Options */}
                {["option1", "option2", "option3", "option4"].map(
                  (opt, idx) => (
                    <div key={opt} className="flex items-center gap-3">
                      <FormField
                        control={form.control}
                        name="correctAnswer"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                value={field.value}
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value={opt} id={opt} />
                                  <Label
                                    htmlFor={opt}
                                    className="text-lg font-semibold cursor-pointer"
                                  >
                                    {String.fromCharCode(65 + idx)}
                                  </Label>
                                </div>
                              </RadioGroup>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={
                          opt as "option1" | "option2" | "option3" | "option4"
                        }
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input
                                placeholder="Write Option here"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )
                )}
              </div>

              <FormField
                control={form.control}
                name="correctAnswer"
                render={() => <FormMessage />}
              />
            </div>

            <div className="flex justify-center gap-3 pt-4">
              {!editMode && (
                <Button
                  type="button"
                  variant="outline"
                  className="border-2 min-w-[150px]"
                  onClick={() => form.reset()}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Question
                </Button>
              )}
              <Button
                type="submit"
                className="bg-[#5CA1FE] hover:bg-[#5CA1FE]/90 text-white min-w-[150px]"
                disabled={isCreating || isUpdating}
              >
                <Upload className="h-4 w-4 mr-2" />
                {isCreating || isUpdating
                  ? "Saving..."
                  : editMode
                  ? "Update"
                  : "Upload"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
