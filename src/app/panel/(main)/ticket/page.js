"use client";

import React, { useEffect, useState } from "react";

import {
  FormControl,
  InputAdornment,
  Menu,
  OutlinedInput,
  Pagination,
  Skeleton,
} from "@mui/material";
import AddTicketDialog from "@/components/Panel/ticket/AddTicketDialog";
import Link from "next/link";
import { useGetAllTicketsQuery } from "@/redux/features/ticket/TicketSlice";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tab from "@material-ui/core/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import CloseTicketDialog from "@/components/Panel/ticket/CloseTicketDialog";

function Ticket() {
  let permission = useSelector((state) => state.access?.pages?.ticket);
  const [page, setPage] = useState(1);
  const [openAddTicket, setOpenAddTicket] = useState(false);

  const [ticketState, setTicketState] = useState("تیکت های باز");
  const handleChangeTicketState = (event, newValue) => {
    setTicketState(newValue);
  };

  const handleOpenAddTicket = () => {
    setOpenAddTicket(true);
  };
  const handleCloseAddTicket = () => {
    setOpenAddTicket(false);
  };

  const handlePagination = (event, value) => {
    setPage(value);
  };

  const [openEditTicketInfo, setOpenEditTicketInfo] = useState(false);
  const [editTicketInfoTarget, setEditTicketInfoTarget] = useState({
    status: "",
    targetDepartmentName: "",
    sourceDepartmentName: "",
    sourceDepartmentId: "",
    targetDepartmentId: "",
    createAt: "",
    updateAt: "",
    ticketNumber: "",
    title: "",
  });
  const handleOpenEditTicketInfo = (info) => {
    setEditTicketInfoTarget(info);
    setOpenEditTicketInfo(true);
  };
  const handleCloseEditTicketInfo = () => {
    setEditTicketInfoTarget({
      status: "",
      targetDepartmentName: "",
      sourceDepartmentName: "",
      sourceDepartmentId: "",
      targetDepartmentId: "",
      createAt: "",
      updateAt: "",
      ticketNumber: "",
      title: "",
    });
    setOpenEditTicketInfo(false);
  };

  const {
    data: ticketData = [],
    isLoading: isDataLoading,
    isError: isDataError,
  } = useGetAllTicketsQuery({ page }, { refetchOnMountOrArgChange: true });

  return (
    <>
      <div>
        <header className="flex justify-between items-center text-[0.9rem] bg-white py-6 md:px-10 px-2 ">
          <div className="">
            <h2 className="font-[800] text-[0.9rem] md:text-[1.1rem]">
              تیکت ها
            </h2>
          </div>

          <div className="">
            {
              <button
                className="flex bg-mainRed text-white items-center text- px-3 py-2 rounded-full md:rounded"
                onClick={handleOpenAddTicket}
              >
                <span className="hidden md:inline">ثبت تیکت</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M7 12H17"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12 7V17"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            }
          </div>
        </header>
        <section className="py-4 md:px-8 mt-5 bg-white h-[60rem] ">
          <div className="mt-10  gap-8 ">
            <div className="overflow-x-auto ">
              <Box
                sx={{
                  width: "100%",
                  typography: "body1",
                  fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189",
                }}
              >
                <TabContext value={ticketState}>
                  <Box
                    sx={{
                      borderBottom: 1,
                      borderColor: "divider",
                      fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189",
                    }}
                  >
                    <TabList
                      onChange={handleChangeTicketState}
                      aria-label="lab API tabs example"
                      className=""
                    >
                      <Tab label="تیکت های باز" value="تیکت های باز" />
                      <Tab label="بسته شده" value="بسته شده" />
                    </TabList>
                  </Box>
                  <table className=" w-full table-auto overflow-scroll border-collapse border-spacing-0 text-sm text-center text-gray70  ">
                    <thead className="text-[0.9rem] text-gray80  bg-[#F8F8F8] md:bg-[#F2EDED] ">
                      <tr>
                        <th className="hidden md:table-cell md:px-10 px-2  py-4">
                          #
                        </th>
                        <th className="px-2 md:px-10   py-4">شماره تیکت</th>
                        <th className="hidden md:table-cell md:px-10 px-2  py-4">
                          موضوع تیکت
                        </th>
                        <th className="hidden md:table-cell md:px-10 px-2  py-4">
                          دپارتمان
                        </th>
                        <th className="hidden md:table-cell md:px-10 px-2  py-4">
                          نام فرستنده
                        </th>
                        <th className="hidden md:table-cell md:px-10 px-2  py-4">
                          تاریخ آخرین پیام
                        </th>
                        <th className="hidden md:table-cell md:px-10 px-2  py-4">
                          وضعیت
                        </th>
                        <th className="hidden md:table-cell md:px-10 px-2  py-4">
                          عملیات
                        </th>
                      </tr>
                    </thead>
                    <tbody className="table-body">
                      {isDataLoading
                        ? [...Array(10)].map(() => (
                            <tr className="border-b">
                              <td className="hidden md:table-cell md:px-10 px-2  py-4  text-gray70 whitespace-nowrap ">
                                <Skeleton
                                  variant="text"
                                  sx={{ fontSize: "1rem" }}
                                />
                              </td>
                              <td className="hidden md:table-cell md:px-10 px-2  py-4  text-gray70 whitespace-nowrap ">
                                <Skeleton
                                  variant="text"
                                  sx={{ fontSize: "1rem" }}
                                />
                              </td>
                              <td className="px-2 md:px-10   py-4  text-gray70 whitespace-nowrap ">
                                <Skeleton
                                  variant="text"
                                  sx={{ fontSize: "1rem" }}
                                />
                              </td>
                              <td className="hidden md:table-cell md:px-10 px-2  py-4  text-gray70 whitespace-nowrap ">
                                <Skeleton
                                  variant="text"
                                  sx={{ fontSize: "1rem" }}
                                />
                              </td>
                              <td className="hidden md:table-cell md:px-10 px-2  py-4  text-gray70 whitespace-nowrap ">
                                <Skeleton
                                  variant="text"
                                  sx={{ fontSize: "1rem" }}
                                />
                              </td>
                              <td
                                scope="row"
                                className="hidden md:flex gap-2 md:px-10 px-2  py-4 justify-center text-gray70 whitespace-nowrap "
                              >
                                <Skeleton
                                  variant="text"
                                  sx={{ fontSize: "1rem" }}
                                />
                                <Skeleton
                                  variant="text"
                                  sx={{ fontSize: "1rem" }}
                                />
                              </td>
                              <td className="hidden md:table-cell md:px-10 px-2  py-4  text-gray70 whitespace-nowrap ">
                                <Skeleton
                                  variant="text"
                                  sx={{ fontSize: "1rem" }}
                                />
                              </td>
                              <td
                                scope="row"
                                className="hidden md:flex gap-2 md:px-10 px-2  py-4 justify-center text-gray70 whitespace-nowrap "
                              >
                                <Skeleton
                                  variant="rounded"
                                  width={23}
                                  height={23}
                                />
                                <Skeleton
                                  variant="rounded"
                                  width={23}
                                  height={23}
                                />
                              </td>
                            </tr>
                          ))
                        : ticketData?.content?.map((data, index) =>
                            (ticketState === "تیکت های باز" &&
                              data.status === "Initialize") ||
                            data.status === "inProgress" ||
                            data.status === "answered" ? (
                              <tr className="table-row border-b">
                                <td className="hidden md:table-cell md:px-10 px-2  py-4  text-gray70 whitespace-nowrap ">
                                  {index + 1}
                                </td>
                                <td className="px-2 md:px-10   py-4  text-gray70 whitespace-nowrap ">
                                  {data.ticketNumber}
                                </td>
                                <td className="px-2 md:px-10   py-4  text-gray70 whitespace-nowrap ">
                                  {data?.title}
                                </td>
                                <td className="px-2 md:px-10   py-4  text-gray70 whitespace-nowrap ">
                                  {data?.targetDepartmentName}
                                </td>
                                <td className="px-2 md:px-10   py-4  text-gray70 whitespace-nowrap ">
                                  {data.sourceDepartmentName}
                                </td>
                                <td className="px-2 md:px-10   py-4 flex gap-2 justify-center items-center text-gray70 whitespace-nowrap ">
                                  <span>{data.updateAt}</span>
                                </td>
                                <td className="px-2 md:px-6 py-4  text-gray70 whitespace-nowrap ">
                                  {data.status === "answered" ? (
                                    <span className="text-[0.8rem] bg-greenBg text-greenText py-1 px-2 rounded-xl">
                                      پاسخ داده شده
                                    </span>
                                  ) : data.status === "Initialize" ? (
                                    <span className="text-[0.8rem] text-gray70 bg-[#EBEBEB]  py-1 px-2 rounded-xl">
                                      در انتظار پاسخ
                                    </span>
                                  ) : data.status === "inProgress" ? (
                                    <span className=" text-[0.8rem] bg-[#ffe9d4] text-[#e95a18] py-1 px-2 rounded-xl">
                                      در حال بررسی
                                    </span>
                                  ) : null}
                                </td>
                                <td
                                  scope="row"
                                  className="hidden md:flex gap-2 md:px-10 px-2  py-4 justify-center text-gray70 whitespace-nowrap "
                                >
                                  <Link
                                    href={"/"}
                                    className="border border-1 border-solid border-[#6C8DFF] rounded p-[0.4rem] hover:bg-blue-100"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="18"
                                      height="18"
                                      viewBox="0 0 18 18"
                                      fill="none"
                                    >
                                      <path
                                        d="M4.55556 5.76714H9M4.55556 8.80078H11.6667M4.55556 14.0013V16.0256C4.55556 16.4875 4.55556 16.7184 4.65265 16.837C4.73709 16.9401 4.86513 17.0001 5.00048 17C5.15611 16.9998 5.34104 16.8556 5.71089 16.5671L7.8313 14.913C8.26446 14.5751 8.48104 14.4061 8.72221 14.286C8.93618 14.1794 9.16394 14.1015 9.3993 14.0544C9.66459 14.0013 9.94195 14.0013 10.4967 14.0013H12.7333C14.2268 14.0013 14.9735 14.0013 15.544 13.7179C16.0457 13.4686 16.4537 13.0708 16.7094 12.5815C17 12.0253 17 11.2972 17 9.84089V5.16042C17 3.70413 17 2.97599 16.7094 2.41977C16.4537 1.9305 16.0457 1.53271 15.544 1.28341C14.9735 1 14.2268 1 12.7333 1H5.26667C3.77319 1 3.02646 1 2.45603 1.28341C1.95426 1.53271 1.54631 1.9305 1.29065 2.41977C1 2.97599 1 3.70413 1 5.16042V10.5343C1 11.3403 1 11.7434 1.09086 12.074C1.33744 12.9714 2.05624 13.6723 2.97648 13.9127C3.31559 14.0013 3.72891 14.0013 4.55556 14.0013Z"
                                        stroke="#6C8DFF"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                      />
                                    </svg>
                                  </Link>
                                  <button
                                    onClick={() => {
                                      handleOpenEditTicketInfo(data.id);
                                    }}
                                    className="border border-1 border-solid border-[#FE4949] rounded p-[0.4rem] hover:bg-red-100"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="18"
                                      height="18"
                                      viewBox="0 0 18 18"
                                      fill="none"
                                    >
                                      <path
                                        d="M6.77778 5.33377L11.2222 9.66754M11.2222 5.33377L6.77778 9.66754M4.55556 14.0013V16.0256C4.55556 16.4875 4.55556 16.7184 4.65265 16.837C4.73709 16.9401 4.86513 17.0001 5.00048 17C5.15611 16.9998 5.34104 16.8556 5.71089 16.5671L7.8313 14.913C8.26446 14.5751 8.48104 14.4061 8.72221 14.286C8.93618 14.1794 9.16394 14.1015 9.3993 14.0544C9.66459 14.0013 9.94195 14.0013 10.4967 14.0013H12.7333C14.2268 14.0013 14.9735 14.0013 15.544 13.7179C16.0457 13.4686 16.4537 13.0708 16.7094 12.5815C17 12.0253 17 11.2972 17 9.84089V5.16042C17 3.70413 17 2.97599 16.7094 2.41977C16.4537 1.9305 16.0457 1.53271 15.544 1.28341C14.9735 1 14.2268 1 12.7333 1H5.26667C3.77319 1 3.02646 1 2.45603 1.28341C1.95426 1.53271 1.54631 1.9305 1.29065 2.41977C1 2.97599 1 3.70413 1 5.16042V10.5343C1 11.3403 1 11.7434 1.09086 12.074C1.33744 12.9714 2.05624 13.6723 2.97648 13.9127C3.31559 14.0013 3.72891 14.0013 4.55556 14.0013Z"
                                        stroke="#DB3746"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                      />
                                    </svg>
                                  </button>
                                </td>
                              </tr>
                            ) : ticketState === "بسته شده" &&
                              data.status === "closed" ? (
                              <tr className="table-row border-b">
                                <td className="hidden md:table-cell md:px-10 px-2  py-4  text-gray70 whitespace-nowrap ">
                                  {index + 1}
                                </td>
                                <td className="px-2 md:px-10   py-4  text-gray70 whitespace-nowrap ">
                                  {data.ticketNumber}
                                </td>
                                <td className="px-2 md:px-10   py-4  text-gray70 whitespace-nowrap ">
                                  {data?.title}
                                </td>
                                <td className="px-2 md:px-10   py-4  text-gray70 whitespace-nowrap ">
                                  {data?.targetDepartmentName}
                                </td>
                                <td className="px-2 md:px-10   py-4  text-gray70 whitespace-nowrap ">
                                  {data.sourceDepartmentName}
                                </td>
                                <td className="px-2 md:px-10   py-4 flex gap-2 justify-center items-center text-gray70 whitespace-nowrap ">
                                  <span>{data.updateAt}</span>
                                </td>
                                <td className="px-2 md:px-6 py-4  text-gray70 whitespace-nowrap ">
                                  {data.status === "closed" ? (
                                    <span className=" text-[0.8rem] bg-[#fdd5d2] text-[#f31c1c] py-1 px-2 rounded-xl">
                                      بسته شده
                                    </span>
                                  ) : null}
                                </td>
                                <td
                                  scope="row"
                                  className="hidden md:flex gap-2 md:px-10 px-2  py-4 justify-center text-gray70 whitespace-nowrap "
                                >
                                  <Link
                                    href={"/"}
                                    className="border border-1 border-solid border-[#6C8DFF] rounded p-[0.4rem] hover:bg-blue-100"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="18"
                                      height="18"
                                      viewBox="0 0 18 18"
                                      fill="none"
                                    >
                                      <path
                                        d="M4.55556 5.76714H9M4.55556 8.80078H11.6667M4.55556 14.0013V16.0256C4.55556 16.4875 4.55556 16.7184 4.65265 16.837C4.73709 16.9401 4.86513 17.0001 5.00048 17C5.15611 16.9998 5.34104 16.8556 5.71089 16.5671L7.8313 14.913C8.26446 14.5751 8.48104 14.4061 8.72221 14.286C8.93618 14.1794 9.16394 14.1015 9.3993 14.0544C9.66459 14.0013 9.94195 14.0013 10.4967 14.0013H12.7333C14.2268 14.0013 14.9735 14.0013 15.544 13.7179C16.0457 13.4686 16.4537 13.0708 16.7094 12.5815C17 12.0253 17 11.2972 17 9.84089V5.16042C17 3.70413 17 2.97599 16.7094 2.41977C16.4537 1.9305 16.0457 1.53271 15.544 1.28341C14.9735 1 14.2268 1 12.7333 1H5.26667C3.77319 1 3.02646 1 2.45603 1.28341C1.95426 1.53271 1.54631 1.9305 1.29065 2.41977C1 2.97599 1 3.70413 1 5.16042V10.5343C1 11.3403 1 11.7434 1.09086 12.074C1.33744 12.9714 2.05624 13.6723 2.97648 13.9127C3.31559 14.0013 3.72891 14.0013 4.55556 14.0013Z"
                                        stroke="#6C8DFF"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                      />
                                    </svg>
                                  </Link>
                                  <button
                                    onClick={() => {
                                      handleOpenEditTicketInfo(data);
                                    }}
                                    className="border border-1 border-solid border-[#FE4949] rounded p-[0.4rem] hover:bg-red-100"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="18"
                                      height="18"
                                      viewBox="0 0 18 18"
                                      fill="none"
                                    >
                                      <path
                                        d="M6.77778 5.33377L11.2222 9.66754M11.2222 5.33377L6.77778 9.66754M4.55556 14.0013V16.0256C4.55556 16.4875 4.55556 16.7184 4.65265 16.837C4.73709 16.9401 4.86513 17.0001 5.00048 17C5.15611 16.9998 5.34104 16.8556 5.71089 16.5671L7.8313 14.913C8.26446 14.5751 8.48104 14.4061 8.72221 14.286C8.93618 14.1794 9.16394 14.1015 9.3993 14.0544C9.66459 14.0013 9.94195 14.0013 10.4967 14.0013H12.7333C14.2268 14.0013 14.9735 14.0013 15.544 13.7179C16.0457 13.4686 16.4537 13.0708 16.7094 12.5815C17 12.0253 17 11.2972 17 9.84089V5.16042C17 3.70413 17 2.97599 16.7094 2.41977C16.4537 1.9305 16.0457 1.53271 15.544 1.28341C14.9735 1 14.2268 1 12.7333 1H5.26667C3.77319 1 3.02646 1 2.45603 1.28341C1.95426 1.53271 1.54631 1.9305 1.29065 2.41977C1 2.97599 1 3.70413 1 5.16042V10.5343C1 11.3403 1 11.7434 1.09086 12.074C1.33744 12.9714 2.05624 13.6723 2.97648 13.9127C3.31559 14.0013 3.72891 14.0013 4.55556 14.0013Z"
                                        stroke="#DB3746"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                      />
                                    </svg>
                                  </button>
                                </td>
                              </tr>
                            ) : null
                          )}
                    </tbody>
                  </table>
                </TabContext>
              </Box>
            </div>
          </div>
          <div
            className="flex justify-center mb-5 mt-7"
            style={{ direction: "rtl" }}
          >
            <Pagination
              page={page}
              count={ticketData.totalPages}
              onChange={handlePagination}
              shape="rounded"
            />
          </div>
        </section>
      </div>
      <AddTicketDialog
        handleCloseAddTicket={handleCloseAddTicket}
        openAddTicket={openAddTicket}
      />
      <CloseTicketDialog
        editTicketInfoTarget={editTicketInfoTarget}
        handleCloseEditTicketInfo={handleCloseEditTicketInfo}
        openEditTicketInfo={openEditTicketInfo}
      />
    </>
  );
}

export default Ticket;
