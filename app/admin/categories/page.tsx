"use client";

import Heading from "@/app/utils/Heading";
import React from "react";
import AdminSidebar from "../../components/Admin/sidebar/AdminSidebar";
import AdminProtected from "../../hooks/adminProtected";
import DashBoardHero from "../../components/Admin/DashboardHero";
import EditCategories from "../../components/Customization/EditCategories";



const Page = () => {
  return (
    <div>
      <AdminProtected>
        <Heading
          title="Elearning - Admin"
          description="ELearning is a platform for students to learn and get help from teachers"
          keywords="Programming,MERN,Redux,Machine Learning"
        />
        <div className="flex h-screen">
          <div className="1500px:w-[15%] w-1/5">
            <AdminSidebar />
          </div>
          <div className="w-[85%]">
            <DashBoardHero />
            < EditCategories/>
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default Page;