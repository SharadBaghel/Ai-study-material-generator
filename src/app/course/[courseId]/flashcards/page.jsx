"use client"
import axios from 'axios';
import { useParams } from 'next/navigation'
import React, { useState } from 'react'
import { useEffect } from 'react';
import FlashcardItem from './_components/FlashcradItem';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"


function Flashcards() {
    const {courseId}=useParams();
    const [flashCards, setFlashCards] = useState([]);
    const [isFlipped, setIsFlipped] = useState();
    const [api, setApi] = useState();

    useEffect(()=>{
        GetFlashCards();
    },[])

    useEffect(()=>{
      if(!api){
        return ;
      }
      api.on('select',()=>{
        setIsFlipped(false);
      })

    },[api])
    const GetFlashCards=async()=>{
        
        const result=await axios.post('/api/study-type',{
            courseId:courseId,
            studyType:'Flashcard'
        })

        setFlashCards(result?.data);

        console.log('Flashcard',result?.data)
    }

    const handleClick=()=>{
      setIsFlipped(!isFlipped);
    }
  return (
    <div>
      <h2 className='font-bold text-2xl'>Flashcards</h2>
      <p>Flashcards are great for memorizing key concepts.</p>

      <div className='mt-10'>
      <Carousel setApi={setApi}>
        <CarouselContent>
          {flashCards?.content&&flashCards.content?.map((flashcard,index)=>(
            <CarouselItem  key={index} className='flex items-center justify-center'>
            <FlashcardItem  handleClick={handleClick} isFlipped={isFlipped}
            flashcard={flashcard}/>
          </CarouselItem>
          ))}
          
        </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>

      
      </div>
      
      </div>
   
  )
}

export default Flashcards