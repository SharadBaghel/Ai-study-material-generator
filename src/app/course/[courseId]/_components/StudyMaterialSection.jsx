import React, { useEffect, useState } from 'react';
import MaterialCardItem from './MaterialCardItem';
import axios from 'axios';
import Link from 'next/link';

function StudyMaterialSection({courseId,course}) {
    const [studyTypeContent,setStudyTypeContent]=useState();
    const MaterialList = [
        {
            name: 'Notes/Chapters',
            desc: 'Use these notes as a key resource for studying.',
            icon: '/notes.png',
            path: '/notes',
            type:'notes'
        },
        {
            name: 'Flashcard',
            desc: 'Flashcards are great for memorizing key concepts.',
            icon: '/flash-card.png',
            path: '/flashcards',
            type:'/flashcard'
        },
        {
            name: 'Quiz',
            desc: 'A powerful means to evaluate what you have learned.',
            icon: '/quiz.png',
            path: '/quiz',
            type:'/quiz'
        },
        {
            name: 'Question/Answer',
            desc: 'Take part in Q&A practice sessions.',
            icon: '/qa.png',
            path: '/qa',
            type:'/qa'
        }
    ]

    useEffect(()=>{
        GetStudyMaterial();
    },[])
    const GetStudyMaterial=async()=>{
        const result=await axios.post('/api/study-type',{
            courseId:courseId,
            studyType:'ALL'
        })
        console.log(result?.data);
        setStudyTypeContent(result.data);

    }

    return (
        <div>
            <h2 className='font-medium text-xl mt-3'>Study Material</h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                {MaterialList.map((item, index) => (
                
                    
                      <MaterialCardItem
                        item={item}
                        key={index}
                        studyTypeContent={studyTypeContent}
                        course={course}
                        refreshData={GetStudyMaterial}
                      />
                    
            
                ))}
            </div>
        </div>
    );
}

export default StudyMaterialSection;
