import { Skeleton } from "@/components/ui/skeleton"
import dynamic from "next/dynamic"


export function Homemap({locationValue}:{locationValue:string}){
    
   const LazyMap=dynamic(()=>import("@/app/components/map"),{
       ssr:false ,loading :() => <Skeleton className="h-[50vh]"/>});
    return <LazyMap locationValue={locationValue}/>
}