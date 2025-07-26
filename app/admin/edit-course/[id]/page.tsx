'use client';
import React from 'react';
import { useParams } from 'next/navigation';

import AdminSidebar from '../../../components/Admin/sidebar/AdminSidebar';
import Heading from '../../../utils/Heading';
import DashboardHeader from '../../../components/Admin/DashBoardHeader';
import EditCourse from "../../../components/Admin/Course/EditCourse";

const Page = () => {
  const params = useParams();
  const id = params?.id as string;

  return (
    <div>
      <Heading
        title='Elearning - Admin'
        description='Elearning is best'
        keywords='Programming, MERN, Machine Learning'
      />
      <div className='flex'>
        <div className='1500px:w-[16%] w-1/5'>
          <AdminSidebar />
        </div>
        <div className='w-[85%]'>
          <DashboardHeader />
          <EditCourse id={id} />
        </div>
      </div>
    </div>
  );
};

export default Page;
