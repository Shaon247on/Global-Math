import ModuleQuestionTable from "@/components/dashboard/ModuleQuestion/ModuleQuestionTable";

interface PageProps{
    params:{
        id: string;
    }
}
async function page({params}: PageProps) {
const {id} = await params
  return (
    <div>
      <ModuleQuestionTable id={id}/>
    </div>
  )
}

export default page
