"use client"
import React, { useContext, useEffect } from 'react'
import {useUser} from '@clerk/nextjs'
import axios from 'axios'
import { useState } from 'react'
import CourseCardItem from './CourseCardItem'
import {Button} from '@/components/ui/button'
import { RefreshCw } from 'lucide-react'
import { CourseCountContext } from '../../_context/CourseCountContext'

function CourseList() {
    const {user}=useUser();
    const [courseList, setCourseList] = useState([]);
    const [loading,setLoading]=useState(false);
    const {totalCourse,setTotalCourse}=useContext(CourseCountContext);

    useEffect(()=>{
        user&&GetCourseList();
    },[user])
    const GetCourseList=async()=>{
        setLoading(true);
        const result=await axios.post('/api/courses',{createdBy:user?.primaryEmailAddress?.emailAddress})
        console.log(result)
        setCourseList(result.data.result);
        setTotalCourse(result.data.result?.length);
        setLoading(false);
        
    }
  return (
    <div className='mt-10'>
        <h2 className='font-vold text-2xl flex justify-between items-center'> Your Study Material
        <Button variant="outline" 
        onClick={GetCourseList}
        className="border-primary text-primary"><RefreshCw/>Refresh</Button>
        </h2>
        <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 mt-2 gap-4'>
        {loading==false? courseList?.map((course,index)=>(
            <CourseCardItem course={course} key={index}/>
        ))
    :[1,2,3,4,5,6].map((item,index)=>{
        <div key={index} className='h-56 w-full bg-slate rounded-lg animate-pulse'>

            </div>
    })}
        
    </div>
    </div>

    
  )
}

export default CourseList