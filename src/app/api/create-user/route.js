import { NextResponse } from "next/server";
import { Inngest } from "inngest";

export async function POST(req) {

    const {email}=await req.json();

    const result=await Inngest.send({
        name:'user.create',
        data:{
            user:user
        }
    })
    return NextResponse.json({fresult:result})
    
}