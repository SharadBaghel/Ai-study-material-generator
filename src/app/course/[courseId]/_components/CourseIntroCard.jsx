import Image from 'next/image';
import React from 'react';
import { Progress } from '@/components/ui/progress';

function CourseIntroCard({ course }) {
    return (
        <div className='flex gap-5 items-center p-10 border shadow-md rounded-lg'>
            <Image src={'/knowledge.png'} alt='Course Knowledge' width={70} height={70} />
            <div>
                {/* Optional chaining to safely access course title */}
                <h2 className='font-bold text-2xl'>{course?.courseLayout?.course_title}</h2>
                
                {/* Course summary with line clamp for two lines */}
                <p className='line-clamp-3'>{course?.courseLayout?.course_summary}</p>
                
                <Progress className='mt-3' />

                <h2 className='mt-3 text-lg text-primary'>
                    Total Chapters: {course?.courseLayout?.chapters?.length}
                </h2>
            </div>
        </div>
    );
}

export default CourseIntroCard;
