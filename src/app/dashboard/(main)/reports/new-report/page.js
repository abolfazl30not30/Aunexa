"use client";
import React, { useEffect, useState } from "react";

import {
  FormControl,
  InputAdornment,
  Menu,
  OutlinedInput,
  Pagination,
  Skeleton,
  Accordion,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { useGetAllSalesListQuery } from "@/redux/features/sales/SalesSlice";
import Link from "next/link";
import AddDataDialog from "@/components/Dashboard/reports/new-report/AddDataDialog";
import FilterDialog from "@/components/Panel/sales/FilterDialog";
import MoreInfoDialog from "@/components/Dashboard/reports/new-report/MoreInfoDialog";
import DeleteDialog from "@/components/Panel/sales/DeleteDialog";
import EditInfoDialog from "@/components/Panel/sales/EditInfoDialog";
import { useSelector } from "react-redux";
import Checkbox from "@mui/material/Checkbox";
import RegisterFactorDialog from "@/components/Panel/sales/RegisterFactorDialog";
import { AccordionDetails } from "@material-ui/core";
import DeleteItemDialog from "@/components/Panel/sales/DeleteItemDialog";
import EditItemInfoDialog from "@/components/Panel/sales/EditItemInfoDialog";
import dynamic from "next/dynamic";
const ReportMap = dynamic(
  () =>
    import("../../../../../components/Dashboard/reports/new-report/ReportMap"),
  { ssr: false }
);

export default function page() {
  let permission = useSelector(
    (state) => state.access?.pages?.primaryStoreInput
  );
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("desc");
  const [anchorElSort, setAnchorElSort] = useState(null);
  const openSort = Boolean(anchorElSort);
  const handleOpenSortMenu = (event) => {
    setAnchorElSort(event.currentTarget);
  };
  const handleCloseSortMenu = () => {
    setAnchorElSort(null);
  };
  const [openFilter, setOpenFilter] = useState(false);
  const [filterItem, setFilterItem] = useState("");

  const [paymentList, setPaymentList] = useState([]);

  const {
    data: inventoryData = [],
    isLoading: isDataLoading,
    isError: isDataError,
  } = useGetAllSalesListQuery(
    { page, sort, filterItem },
    { refetchOnMountOrArgChange: true }
  );
  const handlePagination = (event, value) => {
    setPage(value);
  };
  const handleOpenFilter = () => {
    setOpenFilter(true);
  };
  const handleCloseFilter = () => {
    setOpenFilter(false);
  };
  const [openRegisterFactor, setOpenRegisterFactor] = useState(false);
  const handleOpenRegisterFactor = () => {
    setOpenRegisterFactor(true);
  };
  const handleCloseRegisterFactor = () => {
    setOpenRegisterFactor(false);
  };
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState("");

  const [openMoreInfo, setOpenMoreInfo] = useState(false);
  const [moreInfoTarget, setMoreInfoTarget] = useState({
    id: "",
    productId: "",
    productName: "",
    productImage: "",
    quantity: {
      unit: "",
      value: 0,
    },
    price: 0,
    description: "",
    paymentMethod: "",
    invoiceId: "",
    subOrganizationInfo: {
      subOrganizationId: "",
      subOrganizationName: "",
      organizationId: "",
    },
    salesDate: "",
    salesTime: "",
    confirmationDate: "",
    confirmationTime: "",
    confirmerName: "",
    status: "",
    sellerName: "",
    customer: "",
    receiptFile: "",
    receiptCode: "",
    failureReason: {
      date: "",
      time: "",
      description: "",
      reporter: "",
    },
  });

  const [openEditInfo, setOpenEditInfo] = useState(false);
  const [editInfoTarget, setEditInfoTarget] = useState({
    id: "",
    productId: "",
    productName: "",
    productImage: "",
    quantity: {
      unit: "",
      value: 0,
    },
    price: 0,
    description: "",
    paymentMethod: "",
    invoiceId: "",
    subOrganizationInfo: {
      subOrganizationId: "",
      subOrganizationName: "",
      organizationId: "",
    },
    salesDate: "",
    salesTime: "",
    confirmationDate: "",
    confirmationTime: "",
    confirmerName: "",
    status: "",
    sellerName: "",
    customer: "",
    receiptFile: "",
    receiptCode: "",
    failureReason: {
      date: "",
      time: "",
      description: "",
      reporter: "",
    },
  });
  const [openEditItemInfo, setOpenEditItemInfo] = useState(false);
  const [editInfoItemTarget, setEditInfoItemTarget] = useState({
    id: "",
    productId: "",
    productName: "",
    productImage: "",
    quantity: {
      unit: "",
      value: 0,
    },
    price: 0,
    description: "",
    paymentMethod: "",
    invoiceId: "",
    subOrganizationInfo: {
      subOrganizationId: "",
      subOrganizationName: "",
      organizationId: "",
    },
    salesDate: "",
    salesTime: "",
    confirmationDate: "",
    confirmationTime: "",
    confirmerName: "",
    status: "",
    sellerName: "",
    customer: "",
    receiptFile: "",
    receiptCode: "",
    failureReason: {
      date: "",
      time: "",
      description: "",
      reporter: "",
    },
  });
  const handleOpenEditItemInfo = (info) => {
    setEditInfoItemTarget(info);
    setOpenEditItemInfo(true);
  };
  const handleCloseEditItemInfo = () => {
    setEditInfoItemTarget({
      id: "",
      productId: "",
      productName: "",
      productImage: "",
      quantity: {
        unit: "",
        value: 0,
      },
      price: 0,
      description: "",
      paymentMethod: "",
      invoiceId: "",
      subOrganizationInfo: {
        subOrganizationId: "",
        subOrganizationName: "",
        organizationId: "",
      },
      salesDate: "",
      salesTime: "",
      confirmationDate: "",
      confirmationTime: "",
      confirmerName: "",
      status: "",
      sellerName: "",
      customer: "",
      receiptFile: "",
      receiptCode: "",
      failureReason: {
        date: "",
        time: "",
        description: "",
        reporter: "",
      },
    });
    setOpenEditItemInfo(false);
  };
  const handleOpenMoreInfo = (info) => {
    setMoreInfoTarget(info);
    setOpenMoreInfo(true);
  };

  const handleCloseMoreInfo = () => {
    setMoreInfoTarget({
      id: "",
      productId: "",
      productName: "",
      productImage: "",
      quantity: {
        unit: "",
        value: 0,
      },
      price: 0,
      description: "",
      paymentMethod: "",
      invoiceId: "",
      subOrganizationInfo: {
        subOrganizationId: "",
        subOrganizationName: "",
        organizationId: "",
      },
      salesDate: "",
      salesTime: "",
      confirmationDate: "",
      confirmationTime: "",
      confirmerName: "",
      status: "",
      sellerName: "",
      customer: "",
      receiptFile: "",
      receiptCode: "",
      failureReason: {
        date: "",
        time: "",
        description: "",
        reporter: "",
      },
    });
    setOpenMoreInfo(false);
  };
  const handleOpenDelete = (id) => {
    setDeleteTargetId(id);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setDeleteTargetId("");
    setOpenDelete(false);
  };

  const [openDeleteItem, setOpenDeleteItem] = useState(false);
  const [deleteTargetItemId, setDeleteTargetItemId] = useState("");
  const handleOpenDeleteItem = (id) => {
    setDeleteTargetItemId(id);
    setOpenDeleteItem(true);
  };

  const handleCloseDeleteItem = () => {
    setDeleteTargetItemId("");
    setOpenDeleteItem(false);
  };
  const handleOpenEditInfo = (info) => {
    setEditInfoTarget(info);
    setOpenEditInfo(true);
  };
  const handleCloseEditInfo = () => {
    setEditInfoTarget({
      id: "",
      productId: "",
      productName: "",
      productImage: "",
      quantity: {
        unit: "",
        value: 0,
      },
      price: 0,
      description: "",
      paymentMethod: "",
      invoiceId: "",
      subOrganizationInfo: {
        subOrganizationId: "",
        subOrganizationName: "",
        organizationId: "",
      },
      salesDate: "",
      salesTime: "",
      confirmationDate: "",
      confirmationTime: "",
      confirmerName: "",
      status: "",
      sellerName: "",
      customer: "",
      receiptFile: "",
      receiptCode: "",
      failureReason: {
        date: "",
        time: "",
        description: "",
        reporter: "",
      },
    });
    setOpenEditInfo(false);
  };

  const handleOpenMoreInfoRow = (info) => {
    if (window.innerWidth <= 768) {
      handleOpenMoreInfo(info);
    }
  };
  const [searchValue, setSearchValue] = useState("");
  const [filterType, setFilterType] = useState("receiptCode");

  const handleSearchBox = (e) => {
    setSearchValue(e.target.value);
    let params = new URLSearchParams();
    params.set(filterType, e.target.value);
    setFilterItem(params.toString());
  };

  const [expanded, setExpanded] = React.useState(false);
  const handleChangeInvoiceList = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const [openAddData, setOpenAddData] = useState(false);
  const handleOpenAddData = () => {
    setOpenAddData(true);
  };
  const handleCloseAddData = () => {
    setOpenAddData(false);
  };
  return (
    <div>
      <header className="flex justify-between items-center text-[0.9rem] bg-white py-6 px-5 md:px-10">
        <div className="">
          <h2 className="font-[800] text-[0.9rem] md:text-[1.1rem]">
            گزارش جدید
          </h2>
        </div>
        <div className="">
          {
            <button
              className="flex bg-mainRed text-white items-center text- px-3 py-2 rounded-full md:rounded"
              onClick={handleOpenAddData}
            >
              <span className="hidden md:inline"> گزارش گیری</span>
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
      <section className="py-2 mt-4 md:px-8  bg-white ">
        {/*<div className="mt-5 px-2 flex  justify-end">*/}
        {/*  <div className="flex gap-3">*/}
        {/*    <button*/}
        {/*      onClick={handleOpenFilter}*/}
        {/*      className="flex items-center gap-2 text-[0.9rem] text-gray9F border border-1 border-solid border-borderGray rounded px-2 md:px-4 py-2"*/}
        {/*    >*/}
        {/*      <svg*/}
        {/*        xmlns="http://www.w3.org/2000/svg"*/}
        {/*        width="24"*/}
        {/*        height="24"*/}
        {/*        viewBox="0 0 24 24"*/}
        {/*        fill="none"*/}
        {/*      >*/}
        {/*        <path*/}
        {/*          d="M3.38589 5.66687C2.62955 4.82155 2.25138 4.39889 2.23712 4.03968C2.22473 3.72764 2.35882 3.42772 2.59963 3.22889C2.87684 3 3.44399 3 4.57828 3H19.4212C20.5555 3 21.1227 3 21.3999 3.22889C21.6407 3.42772 21.7748 3.72764 21.7624 4.03968C21.7481 4.39889 21.3699 4.82155 20.6136 5.66687L14.9074 12.0444C14.7566 12.2129 14.6812 12.2972 14.6275 12.3931C14.5798 12.4781 14.5448 12.5697 14.5236 12.6648C14.4997 12.7721 14.4997 12.8852 14.4997 13.1113V18.4584C14.4997 18.6539 14.4997 18.7517 14.4682 18.8363C14.4403 18.911 14.395 18.9779 14.336 19.0315C14.2692 19.0922 14.1784 19.1285 13.9969 19.2012L10.5969 20.5612C10.2293 20.7082 10.0455 20.7817 9.89802 20.751C9.76901 20.7242 9.6558 20.6476 9.583 20.5377C9.49975 20.4122 9.49975 20.2142 9.49975 19.8184V13.1113C9.49975 12.8852 9.49975 12.7721 9.47587 12.6648C9.45469 12.5697 9.41971 12.4781 9.37204 12.3931C9.31828 12.2972 9.2429 12.2129 9.09213 12.0444L3.38589 5.66687Z"*/}
        {/*          stroke="#9F9F9F"*/}
        {/*          stroke-width="1.5"*/}
        {/*          stroke-linecap="round"*/}
        {/*          stroke-linejoin="round"*/}
        {/*        />*/}
        {/*      </svg>*/}
        {/*      <span className="hidden md:inline">فیلتر کردن</span>*/}
        {/*    </button>*/}
        {/*    <div>*/}
        {/*      <button*/}
        {/*        onClick={handleOpenSortMenu}*/}
        {/*        className="flex items-center gap-2 text-[0.9rem] text-gray9F border border-1 border-solid border-borderGray rounded px-2 md:px-4 py-2"*/}
        {/*      >*/}
        {/*        <svg*/}
        {/*          xmlns="http://www.w3.org/2000/svg"*/}
        {/*          width="24"*/}
        {/*          height="24"*/}
        {/*          viewBox="0 0 24 24"*/}
        {/*          fill="none"*/}
        {/*        >*/}
        {/*          <path*/}
        {/*            d="M6 12H18M3 6H21M9 18H15"*/}
        {/*            stroke="#9F9F9F"*/}
        {/*            stroke-width="1.5"*/}
        {/*            stroke-linecap="round"*/}
        {/*            stroke-linejoin="round"*/}
        {/*          />*/}
        {/*        </svg>*/}
        {/*        <span className="hidden md:inline">مرتب سازی</span>*/}
        {/*      </button>*/}
        {/*      <Menu*/}
        {/*        anchorEl={anchorElSort}*/}
        {/*        id="account-menu"*/}
        {/*        open={openSort}*/}
        {/*        onClose={handleCloseSortMenu}*/}
        {/*        onClick={handleCloseSortMenu}*/}
        {/*        PaperProps={{*/}
        {/*          elevation: 0,*/}
        {/*          sx: {*/}
        {/*            width: "10rem",*/}
        {/*            bgcolor: "#fff",*/}
        {/*            borderRadius: "0.5rem",*/}
        {/*            overflow: "visible",*/}
        {/*            filter: "drop-shadow(0px 2px 3px rgba(0,0,0,0.1))",*/}
        {/*            mt: 1.5,*/}
        {/*            fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189",*/}
        {/*            "& .MuiAvatar-root": {*/}
        {/*              width: 32,*/}
        {/*              height: 32,*/}
        {/*              ml: -0.5,*/}
        {/*              mr: 1,*/}
        {/*            },*/}
        {/*          },*/}
        {/*        }}*/}
        {/*        transformOrigin={{ horizontal: "left", vertical: "top" }}*/}
        {/*        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}*/}
        {/*      >*/}
        {/*        <div className="px-2 py-2">*/}
        {/*          <div>*/}
        {/*            <button*/}
        {/*              onClick={() => {*/}
        {/*                setSort("desc");*/}
        {/*              }}*/}
        {/*              className="w-full flex gap-2 py-3 px-2 hover:bg-neutral-100"*/}
        {/*            >*/}
        {/*              <span className="text-gray70 text-[0.8rem] tracking-tighter">*/}
        {/*                بر اساس جدید ترین*/}
        {/*              </span>*/}
        {/*            </button>*/}
        {/*            <button*/}
        {/*              onClick={() => setSort("asc")}*/}
        {/*              className="w-full flex gap-2 py-3 px-2 hover:bg-neutral-100 border-t border-t-[#D9D9D9]"*/}
        {/*            >*/}
        {/*              <span className="text-gray70 text-[0.8rem] tracking-tighter">*/}
        {/*                بر اساس قدیمی ترین*/}
        {/*              </span>*/}
        {/*            </button>*/}
        {/*          </div>*/}
        {/*        </div>*/}
        {/*      </Menu>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</div>*/}
        <div className="mt-10">
          <ReportMap />
        </div>
        <div className="mt-10">
          <div className="overflow-x-auto">
            <table className="w-full table-auto overflow-scroll border-collapse border-spacing-0 text-sm text-center text-gray70  ">
              <thead className="text-[0.9rem] text-gray80  bg-[#F8F8F8] md:bg-[#F2EDED] ">
                <tr>
                  <th className="hidden md:table-cell px-6 py-4">#</th>
                  <th className="px-2 md:px-6 py-4">تایم ورود</th>
                  <th className="px-2 md:px-6 px-6 py-4">تایم خروج</th>
                  <th className="px-2 md:px-6 px-6 py-4 xl:table-cell hidden">
                    مدت زمان حضور در ناحیه
                  </th>
                  <th className="table-cell px-6 py-4">ناحیه</th>
                  <th className="hidden md:table-cell px-6 py-4">مسافت</th>

                  <th className="hidden md:table-cell px-6 py-4">عملیات</th>
                </tr>
              </thead>
              <tbody className="table-body">
                {isDataLoading
                  ? [...Array(8)].map(() => (
                      <tr className="border-b">
                        <td className="hidden md:table-cell px-6 py-4  text-gray70 whitespace-nowrap ">
                          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                        </td>
                        <td className="px-2 md:px-6 py-4  text-gray70 whitespace-nowrap ">
                          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                        </td>
                        <td className="px-2 md:px-6 py-4  text-gray70 whitespace-nowrap ">
                          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                        </td>
                        <td className="px-2 md:px-6 py-2 xl:table-cell hidden  text-gray70 whitespace-nowrap ">
                          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                        </td>
                        <td className="table-cell px-6 py-4  text-gray70 whitespace-nowrap ">
                          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                        </td>

                        <td className="px-2 md:px-6 py-4 md:table-cell hidden text-gray70 whitespace-nowrap ">
                          <div className="flex justify-center">
                            <Skeleton
                              variant="rounded"
                              width={50}
                              height={20}
                            />
                          </div>
                        </td>
                        <td
                          scope="row"
                          className="hidden md:flex gap-2 px-6 py-4 justify-center text-gray70 whitespace-nowrap "
                        >
                          <Skeleton variant="rounded" width={23} height={23} />
                          <Skeleton variant="rounded" width={23} height={23} />
                          <Skeleton variant="rounded" width={23} height={23} />
                        </td>
                      </tr>
                    ))
                  : inventoryData?.content?.map((data, index) => (
                      <tr
                        onClick={() => {
                          handleOpenMoreInfoRow(data);
                        }}
                        className="table-row border-b"
                      >
                        <td className="hidden md:table-cell px-6 py-4  text-gray70 whitespace-nowrap ">
                          {index + 1}
                        </td>
                        <td className="px-2 md:px-6 py-4  text-gray70 whitespace-nowrap  items-center justify-center ">
                          <span className="pr-1">1390/02/21</span>
                          <span>11:15</span>
                          {/* {data.entryTime} */}
                        </td>
                        <td className="px-2 md:px-6 py-4  text-gray70 whitespace-nowrap  items-center justify-center ">
                          <span className="pr-1">1390/02/21</span>
                          <span>19:34</span>
                          {/* {data.exitTime}  */}
                        </td>
                        <td className="px-2 md:px-6 py-2 xl:table-cell hidden text-gray70 whitespace-nowrap ">
                          {/* {data.duration} */}
                          06:19
                        </td>
                        <td className="table-cell px-6 py-4  text-gray70 whitespace-nowrap ">
                          {/* {data.geofence} */}
                          ژئوفنس یک
                        </td>
                        <td className="hidden md:table-cell px-6 py-4  text-gray70 whitespace-nowrap ">
                          {/* {data?.distance} */}
                          10 کیلومتر
                        </td>
                        {/* <td className="px-2 md:px-6 py-4  text-gray70 whitespace-nowrap ">
                          {data.status === "CONFIRMED" ? (
                            <span className="text-[0.8rem] bg-greenBg text-greenText py-1 px-2 rounded-xl">
                              تاييد شده
                            </span>
                          ) : data.status === "UNKNOWN" ? (
                            <span className="text-[0.8rem] bg-[#EBEBEB] text-gray70 py-1 px-2 rounded-xl">
                              نامعلوم
                            </span>
                          ) : (
                            <span className="text-[0.8rem] bg-orangeBg text-orangeText py-1 px-2 rounded-xl">
                              مشکل دار
                            </span>
                          )}
                        </td> */}
                        <td
                          scope="row"
                          className="hidden md:flex gap-2 px-6 py-4 justify-center text-gray70 whitespace-nowrap "
                        >
                          <button
                            onClick={() => {
                              handleOpenMoreInfo(data);
                            }}
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
                          </button>
                        </td>
                      </tr>
                    ))}
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
            count={inventoryData.totalPages}
            onChange={handlePagination}
            shape="rounded"
          />
        </div>
      </section>
      <FilterDialog
        filterItem={filterItem}
        setFilterItem={setFilterItem}
        openFilter={openFilter}
        handleCloseFilter={handleCloseFilter}
      />
      <RegisterFactorDialog
        paymentList={paymentList}
        handleCloseRegisterFactor={handleCloseRegisterFactor}
        openRegisterFactor={openRegisterFactor}
      />
      <MoreInfoDialog
        handleOpenDelete={handleOpenDelete}
        handleOpenEditInfo={handleOpenEditInfo}
        moreInfoTarget={moreInfoTarget}
        openMoreInfo={openMoreInfo}
        handleCloseMoreInfo={handleCloseMoreInfo}
      />
      <DeleteDialog
        deleteTargetId={deleteTargetId}
        openDelete={openDelete}
        handleCloseDelete={handleCloseDelete}
      />
      <DeleteItemDialog
        deleteTargetItemId={deleteTargetItemId}
        openDeleteItem={openDeleteItem}
        handleCloseDeleteItem={handleCloseDeleteItem}
      />
      <EditInfoDialog
        editInfoTarget={editInfoTarget}
        handleCloseEditInfo={handleCloseEditInfo}
        openEditInfo={openEditInfo}
      />
      <AddDataDialog
        handleCloseAddData={handleCloseAddData}
        openAddData={openAddData}
      />
      <EditItemInfoDialog
        editInfoItemTarget={editInfoItemTarget}
        handleCloseEditItemInfo={handleCloseEditItemInfo}
        openEditItemInfo={openEditItemInfo}
      />
    </div>
  );
}
