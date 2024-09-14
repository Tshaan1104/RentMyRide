"use client";

import Link from "next/link";
import Image from "next/image";
import { categoryItems } from "../lib/categoryitems";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { cn } from "@/lib/utils";


export function MapFilterItems() {
  const searchParams = useSearchParams();
  const search = searchParams.get("filter");
  console.log(search);
  const pathname = usePathname();
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <div className="flex gap-x-20 mt-5 w-full  items-center overflow-x-auto no-scrollbar md:justify-center justify-start">
      {categoryItems.map((item) => (
        <Link
          key={item.id}
          href={pathname + "?" + createQueryString("filter", item.name)}
          className={cn(
            search === item.name
              ? "border-b-3 border-black pb-2 flex-shrink-0"
              : "opacity-80 flex-shrink-0",
            "flex flex-col items-center gap-y-3 "
          )}
        >
          <div className="flex  w-14 h-14 relative">
            <Image
              src={item.imageUrl}
              alt="category Images"
              className="w-14 h-14"
              width={24}
              height={24}
            />
          </div>
          <p className="text-xs font-medium" style={{ textAlign: "center" }}>
            {item.title}
          </p>
        </Link>
      ))}
    </div>
  );
}
