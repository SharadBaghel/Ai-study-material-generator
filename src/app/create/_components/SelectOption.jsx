import React, { useState } from 'react'; // Import useState
import Image from 'next/image'; // Import Image from next/image

function SelectOption({selectedStudyType}) {
    const Options = [
        {
            name: "Exam",
            icon: '/exam1.png'
        },
        {
            name: "Job Interview",
            icon: '/job.png'
        },
        {
            name: "Practice",
            icon: '/practice.png'
        },
        {
            name: "Coding Prep",
            icon: '/code.png'
        },
        {
            name: "Other",
            icon: '/knowledge.png'
        }
    ];

    const [selectedOption, setSelectedOption] = useState(); // Fixed useState import

    return (
        <div>
            <h2 className='text-center mb-2 text-lg'>For which topic would you like to build your custom study materials?</h2>
            <div className='grid grid-cols-2 md:grid-cols-3 mt-5 lg:grid-cols-5 gap-5'> {/* Fixed grid class names */}
                {Options.map((option, index) => (
                    <div 
                        key={index} 
                        className={`p-4 flex flex-col items-center border rounded-xl hover:border-primary cursor-pointer ${option.name === selectedOption ? 'border-primary' : ''}`} // Fixed template literal and class names
                        onClick={() => {setSelectedOption(option.name);selectedStudyType(option.name)}}
                    >
                        <Image src={option.icon} alt={option.name} width={50} height={50} />
                        <h2 className='text-sm mt-2'>{option.name}</h2> {/* Fixed mt-2 placement */}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SelectOption; 
