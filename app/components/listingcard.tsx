import Image from "next/image";
import Link from "next/link";
import { useCountries } from "../lib/getcountries";
import { Heart } from "lucide-react";
import { Addtopreferences } from "./submitbuttons";
import { Deletefrompreference } from "./submitbuttons";
import { addToPrefrence, Deletefromref } from "../action";


interface iAppProps {
  imagepath: string;
  description: string;
  location: string;
  price: number;
  userId: string | undefined;
  isinpreference:  Boolean;
  preferenceId: string;
  vehid: string;
  pathName: string;
}

export function Listingcard({
  description,
  imagepath,
  location,
  price,
  userId,
  isinpreference,
  preferenceId,
  vehid,
  pathName
}: iAppProps) {
const {getcountriesvalue}= useCountries();
const country = getcountriesvalue(location);


  return (
    <div className="flex flex-col">
      <div className="relative h-72">
        <Image
          src={`https://qgczojvqewinpiarilqo.supabase.co/storage/v1/object/public/images/${imagepath}`}
          fill
          alt="Vehicle Image"
          className="rounded-lg h-full object-cover mb-3 "
        />
        {userId && (
          <div className="z-10 absolute top-2 right-2">
              {/* <Heart size={24} color="#F87171" /> */}
            {isinpreference?(
              <form action={Deletefromref}>
                <input type="hidden" name="vehid" value={vehid}/>
                <input type="hidden" name="userid" value={userId}/>
                <input type="hidden" name="pathname" value={pathName}/>
                <input type="hidden" name="preferenceId" value={preferenceId}/>


                <Deletefrompreference/>
              </form>
            ):(
              <form action={addToPrefrence}>
                <input type="hidden" name="vehid" value={vehid}/>
                <input type="hidden" name="userid" value={userId}/>
                <input type="hidden" name="pathname" value={pathName}/>


                <Addtopreferences/>
              </form>
            )}
          </div>
        )}
      </div>

      <Link href={`/home/${vehid}`} >
        <h3 className="font-medium text-base mt-3">{country?.flag} {country?.label} / {country?.region}</h3>
        <p className="text-muted-foreground text-sm line-clamp-2">{description}</p>
        <p className="text-muted-foreground text-sm line-clamp-2"><span className="font-medium text-black">₹{price} </span>/ Day</p>
      </Link>
    </div>
  );
}
