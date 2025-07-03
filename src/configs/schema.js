import { pgTable, serial, varchar, boolean, json, text, integer } from 'drizzle-orm/pg-core'; // Ensure correct imports

// User table definition
export const USER_TABLE = pgTable('users', {
    id: serial().primaryKey(), // Auto-incrementing primary key
    name: varchar('name').notNull(), // User's name
    email: varchar('email').notNull().unique(), // User's email
    isMember: boolean('is_member').default(false), // Membership status with default value
    customerId:varchar(),
});

// Study material table definition
export const STUDY_MATERIAL_TABLE = pgTable('studymaterial', {
    id: serial().primaryKey(), // Auto-incrementing primary key
    courseId: varchar('courseId').notNull(), // Course ID
    courseType: varchar('courseType').notNull(), // Course type
    topic: varchar('topic').notNull(), // Topic of study material
    difficultyLevel: varchar('difficultyLevel').default('Easy'), // Difficulty level with default value
    courseLayout: json('courseLayout'), // JSON field for course layout
    createdBy: varchar('createdBy').notNull(), // Creator's identifier
    status:varchar().default("Generating")
});

export const CHAPTER_NOTES_TABLE=pgTable('chapterNotes',{
    id:serial().primaryKey(),
    courseId:varchar().notNull(),
    chapterId:integer().notNull(),
    notes:text()

})

export const STUDY_TYPE_CONTENT_TABLE=pgTable('studyTypeContent',{
    id:serial().primaryKey(),
    courseId:varchar().notNull(),
    content:json(),
    type:varchar().notNull(),
    status:varchar().default('Generating....')

})

export const PAYMENT_RECORD_TABLE=pgTable('paymentRecords',{
    id:serial().primaryKey(),
    customerId:varchar(),
    sessionId:varchar(),
})
