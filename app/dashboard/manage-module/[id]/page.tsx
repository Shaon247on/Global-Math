import ModelDetails from '@/components/dashboard/ModuleManagement/ModelDetails';
import React from 'react'

interface PageProps{
    params: {
        id: string;
    }
}

async function page({params}: PageProps) {
    const {id} = await params
  return (
    <section>
      <ModelDetails id={id}/>
    </section>
  )
}

export default page
