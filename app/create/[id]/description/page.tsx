import { CreateDescription } from "@/app/action";
import { Counter } from "@/app/components/counter";
import Creationbottombar from "@/app/components/creationbottombar";
import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

export default function Descriptionpage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <>
      <div className="w-3/5 mx-auto">
        <h2 className="text-3xl text-center font-semibold tracking-tight transition-colors ">
          Kindly describe your Ride as precise as possible!
        </h2>
      </div>
      <form action={CreateDescription}>
        <input type="hidden" name="vehid" value={params.id} />
        <div className="mx-auto w-3/5 mt-10 flex flex-col gap-y-5 mb-36">
          <div className="flex flex-col gap-y-2">
            <Label>Title</Label>
            <Input name="title" type="text" placeholder="Short and simple..." />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Description</Label>
            <Textarea
              name="description"
              placeholder="Describe your requirements in detail..."
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Price</Label>
            <Input
              name="price"
              type="number"
              placeholder="Rent per day(₹)"
              min={10}
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Image</Label>
            <Input name="image" type="file" required />
          </div>

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
        </div>
        <Creationbottombar />
      </form>
    </>
  );
}
