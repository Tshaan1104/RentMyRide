import { File, FileQuestion } from "lucide-react";

interface IappProps{
  title: string;
  description:string;
}

export default function Noitem({description,title}:IappProps) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50 mt-10">
        <div className="flex h-28 w-28 items-center justify-center rounded-full bg-primary/15 ">
            <FileQuestion className="h-10 w-10 text-primary" />
        </div>
        <h2 className="mt-6 font-semibold text-xl">{title}</h2>
        <p className="mt-2 text-center text-sm leading-6 text-muted-foreground">{description} </p>
    </div>
  )
}
