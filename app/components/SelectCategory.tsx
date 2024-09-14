"use client";

import { Card, CardHeader } from "@/components/ui/card";
import { categoryItems } from "../lib/categoryitems";
import Image from "next/image";
import { useState } from "react";

export function SelectCategory() {
  const [selectedCategory, setselectedCategory] = useState<string | undefined>(undefined);
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-10 w-3/5 mx-auto mb-36">
      <input
        type="hidden"
        name="categoryName"
        value={selectedCategory as string}
      />
      {categoryItems.map((item) => (
        <div key={item.id} className="cursor-pointer flex flex-col ">
          {/* className="cursor-pointer flex flex-col md:flex-row items-center md:items-start" */}
          <Card
            className={selectedCategory === item.name ? "border-primary" : ""}
            onClick={() => setselectedCategory(item.name)}
          >
            <CardHeader>
              <Image
                src={item.imageUrl}
                alt={item.name}
                height={72}
                width={72}
                quality={100}
                className="w-12 h-12  md:w-12 md:h-12 lg:w-16 lg:h-16"
              />
              <h3 className="title text-center truncate">{item.title}</h3>
            </CardHeader>
          </Card>
        </div>
      ))}
    </div>
  );
}
