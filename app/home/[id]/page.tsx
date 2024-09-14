import prisma from "@/app/lib/db";
import { useCountries } from "@/app/lib/getcountries";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Categoryshowcase } from "@/app/components/categoryshowcase";
import { Homemap } from "@/app/components/Homemap";
import { SelectCalendar } from "@/app/components/selectCalendar";
import { Button } from "@/components/ui/button";
import Link  from "next/link";
import { validatereservation } from "@/app/action";
import { Reservationbutton } from "@/app/components/submitbuttons";
import {unstable_noStore as noStore} from "next/cache";


async function getData(vehid: string) {
  noStore();
  const data = await prisma.vehicle.findUnique({
    where: {
      id: vehid,
    },
    select: {
      Photo: true,
      description: true,
      Mileage: true,
      title: true,
      Passengers: true,
      Country: true,
      price: true,
      categoryName: true,
      Year: true,
      User: {
        select: {
          profileimage: true,
          firstName: true,
        },
      },
      Reservation: {
        where: {
          vehID: vehid,
        }
      }
    },
  });
  return data;
}

export default async function Homeroute({
  params,
}: {
  params: { id: string };
}) {
  const data = await getData(params.id);
  const { getcountriesvalue } = useCountries();
  const country = getcountriesvalue(data?.Country as string);
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  console.log(user?.id);

  return (
    <div className="w-[75%] mx-auto mt-10 ">
      <h1 className="font-medium text-3xl mb-5">{data?.title}</h1>

      <div className="relative h-[500px]">
        <Image
          alt="vehicle image"
          className="rounded-lg h-full object-cover"
          fill
          src={`https://qgczojvqewinpiarilqo.supabase.co/storage/v1/object/public/images/${data?.Photo}`}
        />
      </div>
      <div className="flex justify-between gap-x-24 mt-8">
        <div className="w-2/3">
          <h3
            className="
          text-xl font-medium"
          >
            {country?.flag} {country?.label} /{country?.region}
          </h3>
          <div className="flex gap-x-2 text-muted-foreground">
            <p>{data?.Passengers} Passengers</p> *<p>{data?.Mileage} Mileage</p>
            *<p>{data?.Year} Year Of Manufracture</p>
          </div>
          <div className="flex items-center mt-6"> 
            <img
              src={
                data?.User?.profileimage ??
                "https://static.vecteezy.com/system/resources/previews/002/534/006/original/social-media-chatting-online-blank-profile-picture-head-and-body-icon-people-standing-icon-grey-background-free-vector.jpg"
              }
              alt="User image"
              className="w-11 h-11 rounded-full"
            />
            <div className="flex flex-col ml-4">
              <h3 className="font-medium">Hosted By {data?.User?.firstName}</h3>
              <p className="text-sm text-muted-foreground">Host since </p>
            </div>
          </div>
          <Separator className="my-7" />
          <Categoryshowcase categoryName={data?.categoryName as string} />
          <Separator className="my-7" />
          <p className="text-muted-foreground">{data?.description}</p>
          <Separator className="my-7" />

          <Homemap locationValue={data?.Country as string} />
        </div>

        <div>
          <form action={validatereservation}>
            <input type="hidden" name="vehid" value={params.id} />
            <input type="hidden" name="userid" value={user?.id} />

            <SelectCalendar reservations={data?.Reservation}/>
            {user?.id ? (
           <Reservationbutton/>
            ) : (
              <Button className="w-full" asChild>
                <Link href="/app/api/auth/login">Make Reservations</Link>
              </Button>
            )}
          </form>
          <p className="text-muted-foreground underline">
            * To select the range click on the start and end date
          </p>
        </div>
      </div>
    </div>
  );
}
