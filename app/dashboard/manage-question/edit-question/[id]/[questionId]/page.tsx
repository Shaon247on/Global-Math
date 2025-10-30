import AddQuestion from "@/components/dashboard/ModuleQuestion/AddQuestion";

interface PageProps {
  params: {
    id: string;
    questionId: string;
  };
}

async function Page({ params }: PageProps) {
  const { id, questionId } = await params;

  return (
    <div>
      <AddQuestion id={id} questionId={questionId} editMode={true}/>
    </div>
  );
}

export default Page;
