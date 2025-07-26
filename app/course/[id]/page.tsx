"use client";
import React, { FC } from "react";
import CourseDetailsPage from "../../components/Course/CourseDetailsPage";
import { useParams } from "next/navigation";



const Page = () => {
    const param = useParams();
    const id = param?.id
  return (
    <div>
      <CourseDetailsPage id={id ? id : ""} />
    </div>
  );
};
export default Page;