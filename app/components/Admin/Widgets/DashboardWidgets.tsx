import React, { FC, useEffect, useState } from "react";
import UserAnalytics from "../UserAnalytics";
import { BiBorderLeft } from "react-icons/bi";
import { PiUsersFourLight } from "react-icons/pi";
import { Box, CircularProgress } from "@mui/material";
import OrdersAnalytics from "../OrderAnalytics";
import AllInvoices from "../Order/AllInvoices";
import {
  useGetOrderAnalyticsQuery,
  useGetUsersAnalyticsQuery,
} from "@/redux/features/analytics/analyticsApi";

type Props = {
  open?: boolean;
  value?: string | number;
};

const CircularProgressWithLabel: FC<{ value: number; open?: boolean }> = ({
  value,
  open,
}) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        value={value}
        size={45}
        color={value > 99 ? "info" : "error"}
        thickness={4}
        style={{ zIndex: open ? -1 : 1 }}
      />
    </Box>
  );
};

const DashboardWidgets: FC<Props> = ({ open, value }) => {
  const [ordersStats, setOrdersStats] = useState({
    current: 0,
    previous: 0,
    percent: 0,
  });
  const [userStats, setUserStats] = useState({
    current: 0,
    previous: 0,
    percent: 0,
  });

  const { data: userData, isLoading: userLoading } = useGetUsersAnalyticsQuery(
    {}
  );
  const {
    data: orderData,
    isLoading: orderLoading,
  } = useGetOrderAnalyticsQuery({});

  useEffect(() => {
    if (!userLoading && !orderLoading && userData && orderData) {
      const users = userData.users?.last12Months?.slice(-2) ?? [];
      const orders = orderData.orders?.last12Months?.slice(-2) ?? [];

      if (users.length === 2) {
        const curr = users[1].count ?? 0;
        const prev = users[0].count ?? 0;
        const percent = prev === 0 ? 100 : ((curr - prev) / prev) * 100;
        setUserStats({
          current: curr,
          previous: prev,
          percent: Math.max(-100, Math.min(100, percent)),
        });
      }

      if (orders.length === 2) {
        const curr = orders[1].count ?? 0;
        const prev = orders[0].count ?? 0;
        const percent = prev === 0 ? 100 : ((curr - prev) / prev) * 100;
        setOrdersStats({
          current: curr,
          previous: prev,
          percent: Math.max(-100, Math.min(100, percent)),
        });
      }
    }
  }, [userLoading, orderLoading, userData, orderData]);

  return (
    <div className="mt-[100px] min-h-screen">
      <div className="grid 800px:grid-cols-[75%,25%]">
        <div className="pt-[10px] 800px:p-7">
          <UserAnalytics isDashboard={true} />
        </div>

        <div className="800px:pt-[40px] p-[5px] 800px:block flex items-center justify-between">
          {/* Sales Obtained Widget */}
          <div className="w-full dark:bg-[#111C43] rounded-sm shadow my-10 mr-[10px] 800px:my-8 h-[170px]">
            <div className="flex items-center p-5 justify-between">
              <div>
                <BiBorderLeft className="dark:text-[#45CBA0] text-[#000] text-[30px]" />
                <h5 className="pt-2 font-Poppins dark:text-white text-black text-[20px]">
                  {ordersStats.current}
                </h5>
                <h5 className="py-2 font-Poppins dark:text-[#45CBA0] text-black text-[20px] font-[400]">
                  Sales Obtained
                </h5>
              </div>
              <div>
                <CircularProgressWithLabel
                  value={Math.abs(ordersStats.percent)}
                  open={open}
                />
                <h5 className="text-center pt-4">
                  {ordersStats.percent >= 0 ? "+" : ""}
                  {ordersStats.percent.toFixed(2)}%
                </h5>
              </div>
            </div>
          </div>

          {/* New Users Widget */}
          <div className="w-full dark:bg-[#111C43] rounded-sm shadow 800px:my-8 my-10">
            <div className="flex items-center p-5 justify-between">
              <div>
                <PiUsersFourLight className="dark:text-[#45CBA0] text-[#000] text-[30px]" />
                <h5 className="pt-2 font-Poppins dark:text-white text-black text-[20px]">
                  {userStats.current}
                </h5>
                <h5 className="py-2 font-Poppins dark:text-[#45CBA0] text-black text-[20px] font-[400]">
                  New Users
                </h5>
              </div>
              <div>
                <CircularProgressWithLabel
                  value={Math.abs(userStats.percent)}
                  open={open}
                />
                <h5 className="text-center pt-4">
                  {userStats.percent >= 0 ? "+" : ""}
                  {userStats.percent.toFixed(2)}%
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Orders Graph & Recent Transactions */}
      <div className="grid 800px:grid-cols-[65%,35%] mt-[-20px]">
        <div className="dark:bg-[#111c43] w-[95%] 800px:w-[94%] mt-[0px] h-[30vh] 800px:h-[40vh] shadow-sm m-auto">
          <OrdersAnalytics isDashboard={true} />
        </div>
        <div className="p-5">
          <h5 className="dark:text-white text-black text-[20px] font-[400] font-Poppins pb-3">
            Recent Transactions
          </h5>
          <AllInvoices isDashboard={true} />
        </div>
      </div>
    </div>
  );
};

export default DashboardWidgets;
