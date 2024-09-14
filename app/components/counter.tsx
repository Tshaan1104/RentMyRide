"use client"

import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

export function Counter({name,step}:{name:string,step:number}) {

const [count,setcount] =useState(0);

function increase(){
    setcount(count+step);
}

function decrease(){
    if (count>=5) setcount(count-step);

    }

  return (
    <div className="flex items-center gap-x-4 max-w-full">
        <input type="hidden" name={name} value={count}/>
        <Button variant="outline" size="icon" type='button' onClick={decrease}>
            <Minus className="h-4 w-4 text-primary" />

        </Button>
        <p className="font-medium text-lg">{count}</p>
        <Button variant="outline" size="icon" type='button' onClick={increase}>
            <Plus className="h-4 w-4 text-primary" />

        </Button>

    </div>
  )
}
