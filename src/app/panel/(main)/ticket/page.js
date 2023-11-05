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

function Ticket() {
  let permission = useSelector((state) => state.access?.pages?.ticket);
  const [page, setPage] = useState(1);
  const [openAddTicket, setOpenAddTicket] = useState(false);

  const handleOpenAddTicket = () => {
    setOpenAddTicket(true);
  };
  const handleCloseAddTicket = () => {
    setOpenAddTicket(false);
  };

  const handlePagination = (event, value) => {
    setPage(value);
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
        <section className="py-4 md:px-8 mt-5 bg-white h-[50rem] ">
          <div className="mt-10 flex justify-evenly gap-8 ">
            <div className="overflow-x-auto ">
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
                          </td>
                        </tr>
                      ))
                    : ticketData?.content?.map((data, index) => {
                        <tr className="table-row border-b">
                          <td className="hidden md:table-cell md:px-10 px-2  py-4  text-gray70 whitespace-nowrap ">
                            {index + 1}
                          </td>
                          <td className="px-2 md:px-10   py-4  text-gray70 whitespace-nowrap ">
                            {data.شمارهتیکت}
                          </td>
                          <td className="px-2 md:px-10   py-4  text-gray70 whitespace-nowrap ">
                            {data.موضوعتیکت}
                          </td>
                          <td className="px-2 md:px-10   py-4  text-gray70 whitespace-nowrap ">
                            {data.دپارتمان}
                          </td>
                          <td className="px-2 md:px-10   py-4  text-gray70 whitespace-nowrap ">
                            {data.نامفرستنده}
                          </td>
                          <td className="px-2 md:px-10   py-4 flex gap-2 justify-center items-center text-gray70 whitespace-nowrap ">
                            <span>{data.تاریخآخرینپیام}</span>
                            <span>{data.ساعتآخرینپیام}</span>
                          </td>
                          <td className="px-2 md:px-6 py-4  text-gray70 whitespace-nowrap ">
                            {data.status === "CONFIRMED" ? (
                              <span className="text-[0.8rem] bg-greenBg text-greenText py-1 px-2 rounded-xl">
                                پاسخ داده شده
                              </span>
                            ) : (
                              data.status ===
                              "UNKNOWN"(
                                <span className="text-[0.8rem] bg-[#EBEBEB] text-gray70 py-1 px-2 rounded-xl">
                                  در انتظار پاسخ
                                </span>
                              )
                            )}
                          </td>
                          <td
                            scope="row"
                            className="hidden md:flex gap-2 md:px-10 px-2  py-4 justify-center text-gray70 whitespace-nowrap "
                          >
                            <Link
                              href={""}
                              className="border border-1 border-solid border-gray70 rounded p-[0.4rem] hover:bg-neutral-100"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                                fill="none"
                              >
                                <path
                                  d="M9 4.56442V4.55554"
                                  stroke="#797979"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M9 13.4445V7.22223"
                                  stroke="#797979"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z"
                                  stroke="#797979"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                            </Link>
                          </td>
                        </tr>;
                      })}
                </tbody>
              </table>
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
    </>
  );
}

export default Ticket;
