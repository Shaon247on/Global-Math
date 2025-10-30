import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { moduleSets } from "@/data/ModuleSetData";
import Link from "next/link";


function SynopticSection() {
  return (
    <div>
      <h1 className="text-4xl font-medium">Synoptic</h1>
      <div className="bg-white lg:px-12">
        <h1 className="text-center text-lg py-6 font-medium">Select Which Module you want to mixed up</h1>
        <div className=" grid gap-8 grid-cols-1 md:grid-cols-2">
          {moduleSets.map((item) => (
            <div
              className="p-6 bg-[#EDF7FF] flex gap-4 items-center border-2 border-black/80 text-lg font-semibold rounded-lg"
              key={item.id}
            >
              <Checkbox className="border-2 size-6 text-black" id="terms" />{" "}
              {item.name}
            </div>
          ))}
        </div>
        <div className="text-center">
          <Link href={"/dashboard/manage-question"}>
          <Button
            size={"lg"}
            className="bg-[#81C6FF] text-lg text-black px-8 py-4 my-24"
          >
            Save
          </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SynopticSection;
