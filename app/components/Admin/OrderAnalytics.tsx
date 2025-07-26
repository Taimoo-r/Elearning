'use client'
import React from "react";
import {
    ResponsiveContainer,
    XAxis,
    Label, 
    CartesianGrid,
    Tooltip,
    Legend,
    YAxis,
    LabelList,
    LineChart,
    Line,
} from "recharts";
import Loader from "../Loader/Loader";
import { useGetOrderAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";
import { styles } from "@/app/styles/style";


type Props = {
    isDashboard?: boolean
};

const CourseAnalytics = ({isDashboard}: Props) => {
    const {data, isLoading} = useGetOrderAnalyticsQuery({});


    const analyticsData: any = [];

    if (data && data.orders && data.orders.last12Months) {
      data.orders.last12Months.forEach((item: any) => {
        analyticsData.push({ name: item.month, count: item.count });
      });
    }


    return (
        <>
        {
            isLoading ? (
                <Loader />
            ) : (
                <div className={`${!isDashboard ? "h-[30vh]" : "h-screen"}`}>
                    <div className={`${isDashboard ? "!mt-[0px] pl-[40px] mb-2" : 'mt-[50px]'}`}>
                        <h1 className={`${styles.title} ${isDashboard ? '!text-[20px] px-5 !text-start' : ''}`}>
                            Orders Analytics
                        </h1>
                        {
                            !isDashboard && (
                                <p className={`${styles.label} px-5`}>
                                    Last 12 months analytics data{" "}
                                </p>
                            )
                        }
                    </div>

                    <div className={`w-full ${isDashboard ? 'h-[90%]' : 'h-full'} flex items-center justify-center`}>
                        <ResponsiveContainer width={isDashboard ? '100%' : '90%'} height={isDashboard ? '100%' : '50%'}>
                            <LineChart 
                            width={500}
                            height={500}
                            data={analyticsData}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                            >
                                <CartesianGrid strokeDasharray="3 3"/>
                                <XAxis dataKey="name"/>
                                <YAxis/>
                                <Tooltip/>
                                {!isDashboard && <Legend/>}
                                <Line type="monotone" dataKey="count" stroke="#82ca9d"/>
                            </LineChart>
                                
                        </ResponsiveContainer>
                    </div>
                </div>
            )
        }
        </>
    )
}

export default CourseAnalytics;
