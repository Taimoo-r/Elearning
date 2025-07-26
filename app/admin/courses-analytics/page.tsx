'use client'
import DashBoardHero from "@/app/components/Admin/DashboardHero";
import AdminProtected from "@/app/hooks/adminProtected";
import Heading from "@/app/utils/Heading";
import React from "react";
import AdminSidebar from "../../components/Admin/sidebar/AdminSidebar";
import CourseAnalytics from "../../components/Admin/CourseAnlytics"




const Page = () => {
    return (
        <div>
            <AdminProtected>
                <Heading
                    title="Elearning - Admin"
                    description="Elearning is a platform for studeents to learn and get help from teachers"
                    keywords="Programming, MERN, Redux, Machine Learning"
                />
                <div className="flex h-screen">
                    <div className="1500px:w-[16%] w-1/5">
                        <AdminSidebar/>
                    </div>
                    <div className="w-[85%]">
                        <DashBoardHero/>
                        <CourseAnalytics/>
                    </div>
                </div>
            </AdminProtected>
        </div>
    )
}

export default Page;
