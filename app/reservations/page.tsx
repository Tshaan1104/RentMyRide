import React from 'react'
import { Listingcard } from '../components/listingcard'
import Noitem from '../components/noitem'
import prisma from '../lib/db'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';
import {unstable_noStore as noStore} from "next/cache";



async function getData(userId: string){
  noStore();

    const data=await prisma.reservation.findMany({
        where:{
            userId:userId,
        },
        select:{
            vehicle:{
                select:{
                    Photo:true,
                    id:true,
                    price:true,
                    Country:true,
                    description:true,
                    Preference:{
                        where:{
                            userId:userId,
                        }

                    }
                }
            }
        }
    });
    return data;
}


export default async function Reservationroute() {
    const {getUser} =getKindeServerSession();
    const user= await getUser();

    if (!user?.id) return redirect("/");

    const data=await getData(user?.id as string);
  return (
    <section className="container mx-auto px-5 lg:px-10 mt-10">
    <h2 className="text-3xl font-semibold tracking-tight">
      Your Reservations
    </h2>
    {data.length === 0 ? (
<Noitem title="No Reservations here..." description="Please make some reservations"/>      ) : (
      <div className="grid lg:grid-col-4 md:grid-cols-3 sm:grid-col-2 grid-cols-1 gap-8 mt-8 ">
        {data.map((item) => (
          <Listingcard
            key={item.vehicle?.id}
            description={item.vehicle?.description as string}
            location={item.vehicle?.Country as string}
            pathName="/preference"
            vehid={item.vehicle?.id as string}
            imagepath={item.vehicle?.Photo as string}
            price={item.vehicle?.price as number}
            userId={user.id as string}
            preferenceId={item.vehicle?.Preference[0]?.id as string}
            isinpreference={
              (item.vehicle?.Preference.length as number) > 0 ? true : false
            }
          />
        ))}
      </div>
    )}
  </section>
    )
}
