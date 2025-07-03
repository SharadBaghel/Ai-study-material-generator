"use client";
import React, { useContext } from 'react';
import { Progress } from "@/components/ui/progress";
import Image from 'next/image';
import { LayoutDashboard, Shield, UserCircle } from 'lucide-react'; // Ensure all necessary icons are imported
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { CourseCountContext } from '../../_context/CourseCountContext';

function SideBar() {
  const MenuList = [ 
    {
      name: 'Dashboard',
      icon: LayoutDashboard,
      path: '/dashboard',
    },
    {
      name: 'Upgrade',
      icon: Shield,
      path: '/dashboard/upgrade',
    },
    {
      name: 'Profile',
      icon: UserCircle,
      path: '/dashboard/profile',
    },
  ];
  const path = usePathname();
  const { totalCourse, setTotalCourse } = useContext(CourseCountContext);
  
  return (
    <div className='h-screen shadow-md p-5'>
      <div className='flex gap-2 items-center'>
        <Image src={'/logo.svg'} alt='logo' width={40} height={40} />
        <h2 className='font-bold text-2xl'>Easy Study</h2>
      </div>
      <div className="mt-10">
        <Link href={'/create'} className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200">
          <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200">
            + Create New
          </button>
        </Link>
        <div className='mt-5'>
          {MenuList.map((menu, index) => (
            <Link href={menu.path} key={index} >
              <div 
                key={index} 
                className={`flex gap-2 items-center p-3 hover:bg-slate-200 rounded-lg cursor-pointer mt-3 ${path === menu.path ? 'bg-slate-200' : ''}`}>
                <menu.icon /> {/* Render the icon component correctly */}
                <h2>{menu.name}</h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className='border p-3 bg-slate-200 rounded-lg absolute bottom-10 w-[90%]'>
        <h2 className='text-lg mb-2'>Available Credits: {(5 - totalCourse)}</h2>
        <Progress value={(totalCourse / 5) * 100} />
        <h2 className='text-sm'>{totalCourse} out of 5 Credits Used</h2>

        <Link href={'/dashboard/upgrade'} className='text-primary text-xs mt-3'>Upgrade To Create More</Link>
      </div>
    </div>
  );
}

export default SideBar;
