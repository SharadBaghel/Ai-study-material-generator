import React, { useState } from 'react'
import {Button} from '@/components/ui/button'

function QuizCardItem({quiz, userSelectedOption}) {

    const [selectedOption,setSelectedOption]=useState();

  return (
    <div className='mt-10 p-5'>
        <h2 className='font-medium text-3xl text-center'>{quiz?.question}</h2>

        <div className='grid grid-cols-2 gap-5 mt-10'>
            {quiz.options.map((option,index)=>(
            
            <Button 
            onClick={() => {setSelectedOption(option);
                userSelectedOption(option);
            }}
            key={index} 
            variant="outline" 
            className={`w-full border rounded-full p-4 px-3 text-center text-lg hover:bg-gray-200 cursor-pointer ${selectedOption === option ? 'bg-gray-400' : 'bg-white'}`}
        >
            {option}
        </Button>
        
        ))}
        </div>
    </div>
  )
}

export default QuizCardItem