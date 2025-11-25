import StudentDetails from "@/components/dashboard/ManageStudent/StudentDetails";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  return (
    <section>
      <StudentDetails id={id}/>
    </section>
  );
}