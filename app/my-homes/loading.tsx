import { SkeletonCard } from "../components/Skeletonbar";

export default function MyhomeLoading(){
    return (
        <section className="container mx-auto px-5 lg:px-10 mt-10">
      <h2 className="text-3xl font-semibold tracking-tight">
        Your Vehicles
      </h2>

      <div className="grid lg:grid-col-4 md:grid-cols-3 sm:grid-col-2 grid-cols-1 gap-8 mt-8 ">
 <SkeletonCard/>
 <SkeletonCard/>
 <SkeletonCard/>
 <SkeletonCard/>
 <SkeletonCard/>
 <SkeletonCard/>
 <SkeletonCard/>
 <SkeletonCard/>
 <SkeletonCard/>
 <SkeletonCard/>
 </div>
        </section>
    )
} 