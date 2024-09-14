
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MenuIcon } from "lucide-react";
import proimg from "../../public/next.svg";
import {RegisterLink, LoginLink, LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";
import {getKindeServerSession} from '@kinde-oss/kinde-auth-nextjs/server';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createRMRHome } from "../action";

export async function Usernav() {
  const {getUser}=getKindeServerSession();
  const user =await getUser();

const createRMRhomewithid=createRMRHome.bind(null,{
  userId:user?.id as string,
})



  if (user) {
    console.log(user);
  } else {
    console.log("Nothin");
  }
    return (
    <DropdownMenu>  
      <DropdownMenuTrigger>
        <div className="rounded-full border px-2 py-2 lg:px-4 lg:py-2 flex items-center gap-x-3">
          <MenuIcon className="w-6 h-6 lg:w-5 lg:h-5" />
          <img
            src={user?.picture ??"https://static.vecteezy.com/system/resources/previews/002/534/006/original/social-media-chatting-online-blank-profile-picture-head-and-body-icon-people-standing-icon-grey-background-free-vector.jpg"}
            alt="Profile Icon"
            className="rounded-full h-8 w-8 lg:block hidden "
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">

        {user ? (
          <>
          <DropdownMenuItem>
          <form action={createRMRhomewithid} className="w-full">
            <Button type="submit" className="w-full text-start" variant="secondary">RentMyRide Home</Button>
          </form>
            </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/my-homes" className="w-full">My Listings</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/reservations" className="w-full">My Reservations</Link>
          </DropdownMenuItem>
          
          <DropdownMenuItem>
            <Link href="/preference" className="w-full">My Preferences</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogoutLink className="w-full">LogOut</LogoutLink>
        </DropdownMenuItem></>
        ):( 
          <>
          <DropdownMenuItem>
          <RegisterLink className="w-full">Register</RegisterLink>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <LoginLink className="w-full">Login</LoginLink>
        </DropdownMenuItem></>
        )
      }
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
