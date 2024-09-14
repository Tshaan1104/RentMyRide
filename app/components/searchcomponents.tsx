"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { useState } from "react";
import { useCountries } from "../lib/getcountries";
import { Homemap } from "./Homemap";
import { Button } from "@/components/ui/button";
import CreationSubmit from "./submitbuttons";
import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Counter } from "./counter";

export default function SearchComponents() {
  const [step, setstep] = useState(1);
  const [locationValue, setlocationValue] = useState("");
  const { getAllCountries } = useCountries();

function Submitbuttonlocal(){
    if(step === 1){
        return (
            <Button onClick={()=>setstep(step+1)} type="button">Next</Button>
        );}
 else if(step ===2){
    return <CreationSubmit/>
 }
}


  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="rounded-full py-2 px-5 border flex items-center cursor-pointer">
          <div className="flex h-full divide-x font-medium">
            <p className="px-4">Anywhere</p>
            <p className="px-4">Any Week</p>
          </div>
          <Search className="bg-primary text-white p-1 h-8 w-8 rounded-full" />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form className="gap-4 flex flex-col">
            <input type="hidden" name="country" value={locationValue}/>
          {step === 1 ? (
            <>
              <DialogHeader>
                <DialogTitle>Select Country</DialogTitle>
                <DialogDescription>
                  Choose a country,so that we know what you what....
                </DialogDescription>
              </DialogHeader>
              <Select
                required
                onValueChange={(value) => setlocationValue(value)}
              >
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
              <Homemap locationValue={locationValue} />
            </>
          ) : (
            <>
                          <DialogHeader>
                <DialogTitle>Select Country</DialogTitle>
                <DialogDescription>
                  Choose a country,so that we know what you what....
                </DialogDescription>
              </DialogHeader>

              <Card>
            <CardHeader className="flex flex-col gap-y-5">
              {/* //// */}
              <div className="flex items-center justify-between flex-wrap">
                <div className="flex flex-col">
                  <h3 className="underline font-medium ">Passengers</h3>
                  <p className="text-muted-foreground text-sm">
                    How many passengers are you expecting?
                  </p>
                </div>
                <Counter name="Passengers" step={1}/>
              </div>
              {/* //// */}
              <div className="flex items-center justify-between flex-wrap">
                <div className="flex flex-col">
                  <h3 className="underline font-medium ">Year Of Manufracture</h3>
                  <p className="text-muted-foreground text-sm">
                    The year in which the car was Manufractured
                  </p>
                </div>
                <Input
              name="yom"
              type="number"
              placeholder="2020"
              maxLength={4}
              min={2000}
              className="w-[100px] max-w-full"
            />
              </div>


              <div className="flex items-center justify-between flex-wrap">
                <div className="flex flex-col">
                  <h3 className="underline font-medium ">Mileage</h3>
                  <p className="text-muted-foreground text-sm">
                    The Mileage of the vehicle in the year of Manufractured
                  </p>
                </div>
                <Counter name="Mileage" step={5}/>
              </div>
            </CardHeader>
          </Card>
            </>
          )}
          <DialogFooter>
<Submitbuttonlocal/>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
