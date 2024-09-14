import { Button } from "@/components/ui/button";
import Image from "next/image";
import { MapFilterItems } from "./components/MapFilterItems";
import prisma from "./lib/db";
import { Listingcard } from "./components/listingcard";
import { Suspense } from "react";
import { SkeletonCard } from "./components/Skeletonbar";
import Noitem from "./components/noitem";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import {unstable_noStore as noStore} from "next/cache";

async function getData({
  searchParams,userId
}: {
  userId: string | undefined;
  searchParams?: { filter?: string;
    country?: string;
    mileage?: string;
    year?: string;
    passengers?: string;
   };
}) {
    noStore();
  const data = await prisma.vehicle.findMany({
    where: {
      addedCategory: true,
      addedDescription: true,
      addedLocation: true,
      categoryName: searchParams?.filter ?? undefined,
      Country: searchParams?.country ?? undefined,
      Mileage: searchParams?.mileage ?? undefined,
      Year: searchParams?.year ?? undefined,
      Passengers: searchParams?.passengers ?? undefined,
    },
    select: {
      Photo: true,
      id: true,
      price: true,
      description: true,
      Country: true,
      Preference:{
        where: {
          userId: userId ?? undefined,
        }
      }
    },
  });

  return data;
}

export default function Home({
  searchParams,
}: {
  searchParams?: { filter?: string;
    country?: string;
    mileage?: string;
    year?: string;
    passengers?: string;
   };
}) {
  console.log("Home component received searchParams:", searchParams);

  return (
    <div className="container mx-auto px-5 lg:px-10">
      <MapFilterItems />
      <Suspense key={searchParams?.filter} fallback={<SkeletionLoading />}>
        <ShowItems searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function ShowItems({
  searchParams,
}: {
  searchParams?: { filter?: string;
    country?: string;
    mileage?: string;
    year?: string;
    passengers?: string;
   };
}) {
  console.log("ShowItems component received searchParams:", searchParams);
  if (searchParams?.filter) {
    console.log(`Filter category name: ${searchParams.filter}`);
  } else {
    console.log("No filter category name provided");
  }

  const {getUser} = getKindeServerSession();
  const user=await getUser();

  const data = await getData({ searchParams:searchParams,userId:user?.id });
  console.log(data);

  return (
    <>
      {data.length === 0 ? (
        <Noitem title="No listings for this Category found...."   description="Please check for other Category or Wait for listings!!"/>
      ) : (
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
          {data.map((item) => (
            <Listingcard
              key={item.id}
              description={item.description as string}
              imagepath={item.Photo as string}
              location={item.Country as string}
              price={item.price as number}
              userId={user?.id}
              preferenceId={item.Preference[0]?.id}
              isinpreference={item.Preference.length > 0 ? true:false}
              vehid={item.id}
              pathName="/"
                          />
          ))}
        </div>
      )}
    </>
  );
}

function SkeletionLoading() {
  return (
    <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
}
