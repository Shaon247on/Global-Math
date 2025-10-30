"use client";
import { useEffect, useState } from "react";
import { ModuleQuestion, moduleSets } from "@/data/ModuleSetData";
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

interface AddQuestionProps {
  id: string;
  editMode?: boolean;
  questionId?: string;
}

const formSchema = z.object({
  question: z.string().min(10, {
    message: "Question must be at least 10 characters.",
  }),
  option1: z.string().min(1, {
    message: "Option A is required.",
  }),
  option2: z.string().min(1, {
    message: "Option B is required.",
  }),
  option3: z.string().min(1, {
    message: "Option C is required.",
  }),
  option4: z.string().min(1, {
    message: "Option D is required.",
  }),
  correctAnswer: z.string().min(1, {
    message: "Please select the correct answer.",
  }),
});

function AddQuestion({ id, editMode = false, questionId }: AddQuestionProps) {
  console.log(id, "questionId:", questionId);

  const [hasSubmitted, setHasSubmitted] = useState(false);
  const mainModule = moduleSets.find((item) => item.id === id);
  const [open, setOpen] = useState<boolean>(false);
  const [question, setQuestion] = useState<ModuleQuestion>({
    correctAnswer: "option1",
    id: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    question: "",
  });
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      correctAnswer: "",
    },
  });

  const getQuestion = () => {
    const questionSet = mainModule?.questions.find(
      (item) => item.id === questionId
    );
    form.setValue("correctAnswer", questionSet?.correctAnswer || "");
    form.setValue("option1", questionSet?.option1 || "");
    form.setValue("option2", questionSet?.option2 || "");
    form.setValue("option3", questionSet?.option3 || "");
    form.setValue("option4", questionSet?.option4 || "");
    form.setValue("question", questionSet?.question || "");
  };

  useEffect(() => {
    if (editMode) {
      getQuestion();
    }
  }, [mainModule]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast.success("Question added successfully!");
    router.push(`/dashboard/manage-question/${id}`);
  }

  function handleSubmitAnother() {
    form.reset();
    setHasSubmitted(false);
  }

  const handleDownloadCSV = () => {
    console.log("Download CSV");
    toast.info("CSV download started");
  };

  const handleUploadCSV = () => {
    console.log("Upload CSV");
    setOpen(true);
    // toast.info("CSV upload feature");
  };

  if (!mainModule) {
    return (
      <div className="w-full p-8 text-center">
        <p className="text-red-600 font-semibold">Module not found</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      <UploadCsvDialog open={open} setOpen={setOpen} />
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-lg">
        <h1 className="text-2xl font-bold uppercase">{mainModule.name}</h1>
        {editMode === false && (
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
            {/* Question Field */}
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

            {/* Options Grid */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Option A */}
                <div className="flex items-center gap-3">
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
                              <RadioGroupItem value="option1" id="option1" />
                              <Label
                                htmlFor="option1"
                                className="text-lg font-semibold cursor-pointer"
                              >
                                A
                              </Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="option1"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input
                            placeholder="Write Option here"
                            className="w-full"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Option B */}
                <div className="flex items-center gap-3">
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
                              <RadioGroupItem value="option2" id="option2" />
                              <Label
                                htmlFor="option2"
                                className="text-lg font-semibold cursor-pointer"
                              >
                                B
                              </Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="option2"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input
                            placeholder="Write Option here"
                            className="w-full"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Option C */}
                <div className="flex items-center gap-3">
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
                              <RadioGroupItem value="option3" id="option3" />
                              <Label
                                htmlFor="option3"
                                className="text-lg font-semibold cursor-pointer"
                              >
                                C
                              </Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="option3"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input
                            placeholder="Write Option here"
                            className="w-full"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Option D */}
                <div className="flex items-center gap-3">
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
                              <RadioGroupItem value="option4" id="option4" />
                              <Label
                                htmlFor="option4"
                                className="text-lg font-semibold cursor-pointer"
                              >
                                D
                              </Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="option4"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input
                            placeholder="Write Option here"
                            className="w-full"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Correct Answer Error Message */}
              <FormField
                control={form.control}
                name="correctAnswer"
                render={({ field }) => (
                  <FormItem>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-3 pt-4">
              {!hasSubmitted ? (
                <>
                  {editMode === false && (
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
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload
                  </Button>
                </>
              ) : (
                <Button
                  type="button"
                  onClick={handleSubmitAnother}
                  className="bg-[#5CA1FE] hover:bg-[#5CA1FE]/90 text-white min-w-[200px]"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Submit Another
                </Button>
              )}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default AddQuestion;
