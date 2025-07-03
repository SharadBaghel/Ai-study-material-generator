import { inngest } from "./client";
import { eq } from "drizzle-orm";
import { db } from "@/configs/db"; // Assuming you have a `db` module for database operations
import { CHAPTER_NOTES_TABLE, STUDY_MATERIAL_TABLE, STUDY_TYPE_CONTENT_TABLE, USER_TABLE } from "@/configs/schema";
import { generateNotesAiModel, GenerateQuizAiModel, GenerateStudyTypeContentAiModel } from '@/configs/AiModel'; // Adjust the path as necessary


// Function to greet a user
export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  }
);

// Function to create a new user if they don't already exist
export const createNewUser  = inngest.createFunction(
  { id: "create-user" },
  { event: "user.create" },
  async ({ event, step }) => {
    const {user} = event.data; // Extract user data from the event

    // Step to check if the user exists and create a new one if not
    const result = await step.run("check-and-create-user", async () => {
      const existingUsers = await db
        .select()
        .from(USER_TABLE)
        .where(eq(USER_TABLE.email, user?.primaryEmailAddress?.emailAddress));

      if (existingUsers.length === 0) {
        // Insert new user if not found
        const newUser  = await db
          .insert(USER_TABLE)
          .values({
            name: user?.fullName,
            email: user?.primaryEmailAddress?.emailAddress,
          })
          .returning({ id: USER_TABLE.id });

        return newUser ; // Return the newly created user
      }

      return existingUsers; // Return existing users if found
    });

    // Step to send an email notification (placeholder for now)
    await step.run("send-email-notification", async () => {
      // Add logic to send an email notification here
      console.log("Email notification sent to:", user?.primaryEmailAddress?.emailAddress);
    });

    return "Success"; // Return success status
  }
);

export const GenerateNotes=inngest.createFunction(
  {id:'generate-course'},
  {event:'notes.generate'},
  async({event,step})=>{
    const {course}=event.data;

    //generate notes with AI
    const notesResult=await step.run('Generate Chapter Notes',async () => {
      const Chapters=course?.courseLayout?.chapters;
      let index=0;
      Chapters.forEach(async(chapter)=>{
        const Prompt= 'Generate exam material detail content for each chapter. Make sure to include all topic point in the  context, make sure to give context in html format(Do not add any HTML tag, head,body,title tags), The Chapters :'+JSON.stringify(chapter);
        const result=await generateNotesAiModel.sendMessage(Prompt);
        const aiResp=result.response.text();

        await db.insert(CHAPTER_NOTES_TABLE).values({
          courseId:course?.courseId,
          chapterId:index,
          notes:aiResp
        })
        index += 1;

      })
      return "Completed"

    })

    //update the status to ready
    const updateCourseStatusResult=await step.run('Update Course Status to Ready',async()=>{
      const result=await db.update(STUDY_MATERIAL_TABLE).set({
        status:'Ready'
      }).where(eq(STUDY_MATERIAL_TABLE.courseId,course?.courseId))
      return "success";
    })
  }
)

//to gnerate flashcard,quiz,qa

export const GenerateStudyTypeContent=inngest.createFunction(
  
    {id:"Generate Study Type Content"},
    {event:"studyType.content"},
    async({event,step})=>{
      const {studyType,prompt,courseId,recordId}=event.data;
      

      const AiResult=await step.run('Generating Flashcard',async()=>{
        const result=
        studyType=='Flashcard'?await GenerateStudyTypeContentAiModel.sendMessage(prompt):
        await GenerateQuizAiModel.sendMessage(prompt);
        const AIResult=JSON.parse(result.response.text());
        return AIResult

      })

      const DbResult=await step.run('Save Result to DB',async()=>{
        const result=await db.update(STUDY_TYPE_CONTENT_TABLE)
        .set({
          
          content:AiResult,
          status:'Ready'
        }).where(eq(STUDY_TYPE_CONTENT_TABLE.id,recordId))

        return 'Data Updated'
      })
    } 
)