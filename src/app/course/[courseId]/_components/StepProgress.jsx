import React from 'react';
import { Button } from '@/components/ui/button';

function StepProgress({ stepCount, setStepCount, data }) {
  return (
    <div className='flex gap-5 items-center mt-10'>
      {stepCount !== 0 && (
        <Button variant="outlier" size='sm' onClick={() => setStepCount(stepCount - 1)}>
          Previous
        </Button>
      )}
      {data?.map((item, index) => (
        <div 
          key={index} 
          className={`border rounded-full p-2 ${stepCount === index ? 'bg-blue-800 text-white' : ''}`}>
          {index + 1}
        </div>
      ))}
      <Button 
        variant="outlier" 
        size='sm' 
        onClick={() => setStepCount(stepCount + 1)} 
        disabled={stepCount >= data.length - 1}>
        Next
      </Button>
    </div>
  );
}

export default StepProgress;
