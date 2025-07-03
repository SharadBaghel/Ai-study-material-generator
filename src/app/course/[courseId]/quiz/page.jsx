"use client";
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import StepProgress from '../_components/StepProgress';
import QuizCardItem from './_components/QuizCardItem';

function Quiz() {
    const { courseId } = useParams();
    const [quiz, setQuiz] = useState([]); // Initializing as an empty array
    const [quizData, setQuizData] = useState(null); // This will store the complete quiz data
    const [stepCount, setStepCount] = useState(0);
    const [correctAns, setCorrectAnswer] = useState(null);

    // Fetch quiz data when the component mounts
    useEffect(() => {
        const GetQuiz = async () => {
            try {
                const result = await axios.post('/api/study-type', {
                    courseId: courseId,
                    studyType: 'Quiz'
                });

                if (result.data) {
                    setQuizData(result.data); // Set the entire quiz data
                    setQuiz(result.data.content.questions); // Set the quiz questions
                }
            } catch (error) {
                console.error("Error fetching quiz data:", error);
            }
        };

        GetQuiz(); // Make sure we call the function to fetch quiz data
    }, [courseId]); // Re-run when `courseId` changes

    const checkAnswer = (userAnswer, currentQuestion) => {
        console.log(userAnswer, currentQuestion?.correctAnswer);
        if (userAnswer === currentQuestion?.correctAnswer) {
            setCorrectAnswer(true);
            return ;
        } else {
            setCorrectAnswer(false);
        }
    };


    useEffect(() => {
        setCorrectAnswer(null);
    }, [stepCount]);

    return (
        <div>
            <h2 className='font-bold text-3xl text-center'>Quiz</h2>
            
            {/* StepProgress component */}
            <StepProgress 
                data={quiz} 
                stepCount={stepCount} 
                setStepCount={(value) => setStepCount(value)} 
            />
            
            <div>
                {/* Check if quiz data is available before rendering */}
                {quiz.length > 0 ? (
                    <QuizCardItem 
                        quiz={quiz[stepCount]}
                        userSelectedOption={(v) => checkAnswer(v, quiz[stepCount])} 
                    />
                ) : (
                    <p>Loading quiz...</p> // Display loading text until quiz data is available
                )}
            </div>

            {/* Correct or Incorrect message */}
            {correctAns === false && 
                <div>
                   <div className='border p-3 border-red-700 bg-red-200 rounded-lg'>
                    <h2 className='font-bold text-lg text-red-600'>Incorrect</h2>
                    <p className='text-blue-800'>Correct Answer is: {quiz[stepCount]?.correctAnswer}</p>
                    </div>
                </div>
            }
            {correctAns === true && 
                <div>
                    <div className='border p-3 border-green-700 bg-green-200 rounded-lg'>
                    <h2 className='font-bold text-lg text-green-600'>Correct</h2>
                    <p className='text-green-600'>Your Answer is Correct</p>
                    </div>
                </div>
            }
        </div>
    );
}

export default Quiz;
