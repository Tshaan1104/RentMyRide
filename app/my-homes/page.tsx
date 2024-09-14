
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "../lib/db";
import { redirect } from "next/navigation";
import Noitem from "../components/noitem";
import { Listingcard } from "../components/listingcard";
import {unstable_noStore as noStore} from "next/cache";



async function getData(userId: string){
  noStore();
    const data=await prisma.vehicle.findMany({
        where:{
            userId: userId,
            addedCategory:true,
            addedDescription:true,
            addedLocation:true,
        },
        select:{
            id:true,
            Country:true,
            Photo:true,
            price:true,
            description:true,
            Preference:{
                where:{
                    userId:userId,
                },
            },
        },
        orderBy:{
            createdAt: "desc",
        }
    })
    return data;
}

export default async function Myhomes() {
    const {getUser}=getKindeServerSession();
    const user=await getUser();

    if (!user) {
        return redirect("/");
    }
    const data=await getData(user?.id);
  return (
    <section className="container mx-auto px-5 lg:px-10 mt-10">
        <h2 className="text-3xl font-semibold tracking-tight">Your Vehicles</h2>

        {data.length===0 ? (
            <Noitem title="No Vehicles posted" description="Please add your Vehicle to view..."/>
        ):(
            <div className="grid lg:grid-col-4 md:grid-cols-3 sm:grid-col-2 grid-cols-1 gap-8 mt-8 ">
          {data.map((item) => (
            <Listingcard
              key={item.id}
              description={item.description as string}
              location={item.Country as string}
              pathName="/my-homes"
              vehid={item.id as string}
              imagepath={item.Photo as string}
              price={item.price as number}
              userId={user.id as string}
              preferenceId={item.Preference[0]?.id as string}
              isinpreference={
                (item.Preference.length as number) > 0 ? true : false
              }
            />
          ))}
        </div>
        )}

    </section>
  )
}
