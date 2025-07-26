import { styles } from "@/app/styles/style";
import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "../../../redux/features/layout/layoutApi"
import React, { FC, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineCamera } from "react-icons/ai";

const EditHero = () => {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const { data, refetch } = useGetHeroDataQuery("Banner", {
    refetchOnMountOrArgChange: true,
  });
  const [editLayout, { isSuccess, error }] = useEditLayoutMutation();

  useEffect(() => {
    if (data) {
      if (!title) setTitle(data?.layout?.banner.title || "");
      if (!subTitle) setSubTitle(data?.layout?.banner.subTitle || "");
      if (!image) setImage(data?.layout?.banner?.image?.url || "");
    }
    if (isSuccess) {
      toast.success("Hero updated successfully!");
      refetch();
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message);
      }
    }
  }, [data, isSuccess, error]);

  const handleUpdate = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = async () => {
    await editLayout({
      type: "Banner",
      image,
      title,
      subTitle,
    });
  };

  console.log(title, subTitle, image);

  return (
    <>
      <div className="w-full min-h-screen flex flex-col lg:flex-row items-center justify-center px-4 sm:px-6 lg:px-8 py-12 lg:py-0">
        <div className="w-1/2 lg:w-[40%] flex justify-center items-center order-1 lg:order-1 mt-8 lg:mt-0">
          <div className="relative w-full max-w-md min-h-[200px]">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-teal-500 rounded-full filter blur-3xl opacity-70 animate-blob"></div>
            <img
                src={image}
                alt=""
                className="relative z-10 w-full h-auto object-contain hover:scale-105 transition-transform duration-300 hover-anim"
              />
            <input
                type="file"
                name=""
                id="banner"
                accept="image/*"
                onChange={handleUpdate}
                className="hidden"
              />
              <label htmlFor="banner" className="absolute bottom-4 right-4 z-20 cursor-pointer bg-white/70 rounded-full p-2 shadow-lg border-2 border-rose-700">
                <AiOutlineCamera className="dark:text-black text-black text-[24px]" />
              </label>
          </div>
        </div>
        <div className="1000px:w-[60%] flex flex-col items-center 1000px:mt-[0px] text-center 1000px:text-left mt-[150px] border-solid border-cyan-900 order-2 lg:order-2">
          <textarea
            className="dark:text-white resize-none text-[#000000c7] text-[20px] px-3 w-full 1000px:text-[60px] 1500px:text-[50px] font-[300] font-Josefin py-2 1000px:leading-[75px] 1500px:w-[60%] 1100px:w-[78%] outline-none bg-transparent block"
            placeholder="Improve Your Online Learning Experience Better Instantly"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            rows={4}
          />
          <br />
          <textarea
            value={subTitle}
            onChange={(e) => setSubTitle(e.target.value)}
            placeholder="We have 40k+ Online courses & 500K+ Online registered student. Find your desired Courses from them."
            className="text-rose-500 dark:text-[#edfff4] text-[#000000ac] font-Josefin font-[500] text-[15px] 1500px:!w-[55%] 1100px:!w-[74%] bg-transparent outline-none resize-none"
          ></textarea>
          <br />
          <br />
          <br />
          <div
            className={`${
              styles.button
            } !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-black bg-[#cccccc34] 
          ${
            data?.layout?.banner?.title !== title ||
            data?.layout?.banner?.subTitle !== subTitle ||
            data?.layout?.banner?.image?.url !== image
              ? "!cursor-pointer !bg-[#42d383]"
              : "!cursor-not-allowed"
          }
          !rounded absolute bottom-12 right-12`}
            onClick={
              data?.layout?.banner?.title !== title ||
              data?.layout?.banner?.subTitle !== subTitle ||
              data?.layout?.banner?.image?.url !== image
                ? handleEdit
                : () => null
            }
          >
            Save
          </div>
        </div>
      </div>
    </>
  );
};

export default EditHero;