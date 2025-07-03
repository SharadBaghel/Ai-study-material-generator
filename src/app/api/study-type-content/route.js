import {db} from "@/configs/db";
import {STUDY_TYPE_CONTENT_TABLE} from "@/configs/schema"
import { NextResponse } from "next/server";
import { inngest } from "../../../inngest/client";

export async function POST(req){
    const{chapters,courseId,type}=await req.json();

    const PROMPT = type === 'Flashcard'
    ? `Generate the Flashcard on topic: ${chapters} in JSON format with front and back content, Maximum 15`
    : `Generate Quiz on topic: ${chapters} with Questions and options along with the answers in JSON format, (max 10)`;

    //insert record to db
    const result=await db.insert(STUDY_TYPE_CONTENT_TABLE).values({
        courseId:courseId,
        type:type
    }).returning({
        id:STUDY_TYPE_CONTENT_TABLE.id
    });

    //trigger function

    await inngest.send({
        name:'studyType.content',
        data:{
            studyType:type,
            prompt:PROMPT,
            courseId:courseId,
            recordId:result[0].id
        }
    })
    return NextResponse.json(result[0].id)
}