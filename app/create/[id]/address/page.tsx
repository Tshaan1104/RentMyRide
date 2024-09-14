"use client";

import { createlocation } from "@/app/action";
import Creationbottombar from "@/app/components/creationbottombar";
import { useCountries } from "@/app/lib/getcountries";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";
import { useState } from "react";

export default function Addressroute({params}:{params:{id:string}}) {
  const { getAllCountries } = useCountries();
  const [locationValue, setlocationvalue] = useState("");

  const LazyMap = dynamic(() => import("@/app/components/map"), { ssr: false });
  loading: () => <Skeleton className="h-[50vh] w-fill" />;

  return (
    <>
      <div className="w-3/5 mx-auto my-4">
        <h2 className="text-3xl text-center font-semibold tracking-tight transition-colors  ">
          State the Location
        </h2>
      </div>

      <form action={createlocation}>
        <input type="hidden" name="vehid" value={params.id} />
        <input type="hidden" name="countriesbyvalue" value={locationValue} />
        <div className="w-3/5 mx-auto mb-36">
          <div className="mb-5 ">
            <Select required onValueChange={(value) => setlocationvalue(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Country"></SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Countries</SelectLabel>
                  {getAllCountries().map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.flag} {item.label} / {item.region}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <LazyMap locationValue={locationValue} />
        </div>
          <Creationbottombar />
      </form>
    </>
  );
}
