import { NextResponse } from "next/server";
import { courseOutline } from "@/configs/AiModel"; 
import { db} from "@/configs/db";
import { STUDY_MATERIAL_TABLE} from "@/configs/schema";
import { inngest } from "@/inngest/client";

export async function POST(req) {
    const { courseId, topic, courseType, difficultyLevel, createdBy } = await req.json();

    const PROMPT = 'Generate a study material for '+topic+' for '+courseType+' and level of difficulty will be '+difficultyLevel+' with summary of course,list of chapters along with summary for each chapter, Topic list in each chapter and Emoji icon for each chapter. All result should be in Json format';
    
    const aiResp = await courseOutline.sendMessage(PROMPT);
    const aiResult = JSON.parse(aiResp.response.text());

    const dbResult = await db.insert(STUDY_MATERIAL_TABLE).values({
        courseId: courseId,
        courseType: courseType,
        topic: topic,
        difficultyLevel: difficultyLevel,
        courseLayout: aiResult,
        createdBy: createdBy,
        
    }).returning({ resp:STUDY_MATERIAL_TABLE });

    // Trigger  inggest function to geernate chapter notes


    const result=await inngest.send({
        name:'notes.generate',
        data:{
            course:dbResult[0].resp
        }
    })
    console.log(result);

    return NextResponse.json({ result: dbResult[0] })
}
