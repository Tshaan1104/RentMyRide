"use server"

import { redirect } from "next/navigation";
import prisma from "./lib/db";
import { supabase } from "./lib/supabase";
import { revalidatePath } from "next/cache";

export async function createRMRHome({ userId }: { userId: string }) {
    const data = await prisma.vehicle.findFirst({
        where: {
            userId: userId,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    if (data === null) {
        const data = await prisma.vehicle.create({
            data: {
                userId: userId,
            },
        });

        return redirect(`/create/${data.id}/structure`);
    } else if (!data.addedCategory && !data.addedDescription && !data.addedLocation) {
        return redirect(`/create/${data.id}/structure`);
    }
    else if (data.addedCategory && !data.addedDescription) {
        return redirect(`/create/${data.id}/description`);
    }
    else if (data.addedCategory && data.addedDescription && !data.addedLocation) {return redirect(`/create/${data.id}/address`);}
    else if (data.addedCategory && data.addedDescription && data.addedLocation) {const data = await prisma.vehicle.create({
        data: {
            userId: userId,
        },
    });}
}

export async function createCategoryPage(formData: FormData) {

    const categoryName = formData.get("categoryName") as string;
    const vehid = formData.get("vehid") as string;
    const data = await prisma.vehicle.update({
        where: {
            id: vehid,
        },
        data: {
            categoryName: categoryName,
            addedCategory: true,
        },

    });
    return redirect(`/create/${vehid}/description`);
}


export async function CreateDescription(formData: FormData) {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const price = formData.get("price");
    const imagefile = formData.get("image") as File;
    const passengers = formData.get("Passengers") as string;
    const vehid = formData.get("vehid") as string;
    const mileage =formData.get("Mileage") as string;
    const year = formData.get("yom") as string;

    const { data:imagedata } = await supabase.storage.from("images").upload(`${imagefile.name}-${new Date()}`, imagefile, {
        cacheControl: "2592000",
        contentType: "image/png",
    });

    const data = await prisma.vehicle.update({
        where: {
            id: vehid,
        },
        data: {
            title: title,
            description: description,
            price: Number(price),
            Photo: imagedata?.path, // Assuming you meant to use 'imagedata' here
            Passengers: passengers,
            addedDescription: true,
            Mileage: mileage,
            Year:year,
        }
    });
    return redirect(`/create/${vehid}/address`);
}


export async function createlocation(formData: FormData) {

    const vehid= formData.get('vehid') as string;
    const countriesbyValue=formData.get('countriesbyvalue') as string;

    const datab=await prisma.vehicle.update({
        where: {
            id:vehid,
        },
        data:{
            addedLocation:true,
            Country:countriesbyValue,
        }
    })  ;
    return redirect("/");
}

export async function addToPrefrence(formData: FormData) {
    const vehid= formData.get('vehid') as string;
    const userid = formData.get('userid') as string;
    const pathname=formData.get('pathname') as string;

    const data= await prisma.preference.create({
        data: {
            vehID: vehid,
            userId:userid,
        }
    });
    revalidatePath(pathname)
}


export async function Deletefromref(formData: FormData) {
    const vehid= formData.get('vehid') as string;
    const preferenceId = formData.get('preferenceId') as string;
    const userid = formData.get('userid') as string;
    const pathname= formData.get('pathname') as string;
    const data= await prisma.preference.delete({
        where: {
            id: preferenceId,
            userId: userid,
        },
       
    });
    revalidatePath(pathname);
}

export async function validatereservation(formData: FormData){
    const  userid = formData.get('userid') as string;
    const vehid = formData.get('vehid') as string;
    const startdate = formData.get('startdate') as string ;
    const enddate = formData.get('enddate') as string ;

    const data=await prisma.reservation.create({
        data:{
            userId: userid,
            startdata: startdate,
            enddate: enddate,
            vehID: vehid,

        }
    });
    return redirect("/");

}