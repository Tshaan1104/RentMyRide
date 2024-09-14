import { createCategoryPage } from "@/app/action";
import { SelectCategory } from "@/app/components/SelectCategory";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import CreationSubmit from "../../../components/submitbuttons";
import Creationbottombar from "@/app/components/creationbottombar";

export default function StructureRoute({params}:{params:{id:string}}) {
  return (
    <>
      <div className="w-3/5 mx-auto">
        <h2 className="text-3xl font-semibold tracking-tight transition-colors text-center">
        Please select your preferred category of vehicle
        </h2>
        </div>
        <form action={createCategoryPage}>

          <input type="hidden" name="vehid" value={params.id} />
          <SelectCategory />
<Creationbottombar/>
        </form>
      
    </>
  );
}
