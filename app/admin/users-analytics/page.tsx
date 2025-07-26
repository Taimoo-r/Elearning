'use client'
import AdminProtected from "@/app/hooks/adminProtected";
import Heading from "@/app/utils/Heading";
import React from "react";
import AdminSidebar from "../../components/Admin/sidebar/AdminSidebar";
import UserAnalytics from "../../components/Admin/UserAnalytics"

const Page = () => {
    return (
        <div className="w-full  pl-0">
            <AdminProtected>
                <Heading
                    title="Elearning - Admin"
                    description="Elearning is a platform for studeents to learn and get help from teachers"
                    keywords="Programming, MERN, Redux, Machine Learning"
                />
                <div className="flex h-screen w-full">
                    <div className="1500px:w-[16%] w-1/5">
                        <AdminSidebar/>
                    </div>
                    <div className="w-full h-screen">
                        <UserAnalytics/>
                    </div>
                </div>
            </AdminProtected>
        </div>
    )
}

export default Page;
