"use client";
import { Button } from "@/components/ui/button";
import { moduleSets } from "@/data/ModuleSetData";
import { Star } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function ModuleQuestion() {
  const router = useRouter();
  const handleRouting = (id: string) => {
    router.push(`/dashboard/manage-question/${id}`);
  };
  const handleRoutingNew = ()=>{
    router.push("/dashboard/manage-question/synoptic")
  }
  return (
    <div className="bg-white p-6">
      <h1 className="text-4xl font-bold text-center mb-6">Modules</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-6">
        {moduleSets.map((item) => (
          <Button
            onClick={() => handleRouting(item.id)}
            key={item.id}
            className="relative border-2 border-blue-400 py-10 bg-blue-400/80 text-black font-semibold text-lg hover:bg-blue-400"
          >
            {item.name}
            <span
              className={`absolute top-0 right-0 rounded-bl-full p-2 pb-3 pl-3 bg-emerald-500 ${
                item.optionalModule === "" ? "hidden" : "block"
              }`}
            >
              <Star stroke="white" />
            </span>
          </Button>
        ))}
          <Button onClick={handleRoutingNew} className="relative border-2 border-blue-400 py-10 bg-blue-400 text-black font-semibold text-lg hover:bg-blue-00">
            SYNOPTIC
          </Button>
      </div>
    </div>
  );
}

export default ModuleQuestion;
