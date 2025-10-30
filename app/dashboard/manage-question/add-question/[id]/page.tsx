import AddQuestion from "@/components/dashboard/ModuleQuestion/AddQuestion";

interface PageProps {
  params: {
    id: string;
  };
}

async function page({ params }: PageProps) {
  const { id } = await params;
  return (
    <div>
      <AddQuestion id={id} />
    </div>
  );
}

export default page;
