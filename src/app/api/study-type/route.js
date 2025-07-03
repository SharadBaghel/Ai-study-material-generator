import { db } from "@/configs/db";
import { CHAPTER_NOTES_TABLE, STUDY_TYPE_CONTENT_TABLE } from "@/configs/schema";
import { eq, and } from "drizzle-orm";  // Import 'and' for combining conditions
import { NextResponse } from "next/server";

export async function POST(req) {
  const { courseId, studyType } = await req.json();

  // Handle "ALL" studyType case
  if (studyType === 'ALL') {
    const notes = await db.select().from(CHAPTER_NOTES_TABLE).where(eq(CHAPTER_NOTES_TABLE.courseId, courseId));

    const contentList = await db.select().from(STUDY_TYPE_CONTENT_TABLE).where(eq(STUDY_TYPE_CONTENT_TABLE.courseId, courseId));

    const result = {
      notes: notes,
      flashcard: contentList?.find(item => item.type === 'Flashcard'),
      quiz: contentList?.find(item => item.type === 'Quiz'),  
      qa: contentList?.find(item => item.type === 'QA'),
    };

    return NextResponse.json(result);
  }  
  // Handle "notes" studyType case
  else if (studyType === 'notes') {
    const notes = await db.select().from(CHAPTER_NOTES_TABLE).where(eq(CHAPTER_NOTES_TABLE.courseId, courseId));

    return NextResponse.json(notes);
  }
  // Handle other studyType cases
  else {
    const result = await db.select().from(STUDY_TYPE_CONTENT_TABLE).where(
      and(
        eq(STUDY_TYPE_CONTENT_TABLE.courseId, courseId),
        eq(STUDY_TYPE_CONTENT_TABLE.type, studyType)
      )
    );

    return NextResponse.json(result[0]??[]);
  }
}
