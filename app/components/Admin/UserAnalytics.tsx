'use client'
import React from "react";
import {
    AreaChart,
    Area, 
    ResponsiveContainer,
    XAxis,
    Label,
    YAxis,
    Tooltip
} from "recharts";
import Loader from "../Loader/Loader";
import { useGetUsersAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";
import { styles } from "@/app/styles/style";

type Props = {
    isDashboard?: boolean
};

const UserAnalytics = ({isDashboard}: Props) => {
    const { isLoading} = useGetUsersAnalyticsQuery({});

    const analyticsData = [
        { name: 'January 2023', count: 440},
        { name: 'February 2023', count: 8231},
        { name: 'March 2023', count: 12},
        { name: 'April 2023', count:1237},
        { name: 'May 2023', count: 992},
        { name: 'June 2023', count: 2123},
        { name: 'July 2023', count: 531},
        { name: 'August 2023', count: 6473},
        { name: 'September 2023', count: 2132},
        { name: 'October 2023', count: 3212},
        { name: 'November 2023', count: 3453},
        { name: 'December 2023', count: 4444},
    ];



    return (
        <>
        {
            isLoading ? (
                <Loader />
            ) : (
                <div className={`${!isDashboard} ? "mt-[50px] : "mt[50px] dark:bg-[#111C43] shadow-sm pb-5 ml-5 mr-5 w-[870px] rounded-sm " `}>
                    <div className={`${isDashboard ? "!ml-8 mb-5" : ''}`}>
                        <h1 className={`${styles.title} ${isDashboard} && '!text-[20px] px-5 !text-start`}>
                            User Analytics
                        </h1>
                        {
                            !isDashboard && (
                                <p className={`${styles.label} px-5`}>
                                    Last 12 months analytics data{" "}
                                </p>
                            )
                        }
                    </div>

                    <div className={`w-full ${isDashboard ? 'h-[40vh]' : 'h-screen'} flex items-center justify-center`}>
                        <ResponsiveContainer width={isDashboard ? '100%' : '90%'} height={isDashboard ? '50%' : '100%'}>
                            <AreaChart 
                            data={analyticsData}
                            margin={{
                                top: 20,
                                right: 30,
                                left: 0,
                                bottom: 0,
                            }}
                            >
                                <XAxis dataKey="name"/>
                                <YAxis/>
                                <Tooltip/>
                                <Area
                                    type="monotone"
                                    dataKey="count"
                                    stroke="#4d62d9"
                                    fill="#4d62d9"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )
        }
        </>
    )
}

export default UserAnalytics;
