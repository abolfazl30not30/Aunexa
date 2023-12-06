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
import { useGetAllSuccessfulPurchaseRequestListQuery } from "@/redux/features/purchase/successful-purchase-request-list/SuccessfulPurchaseRequestList";
import Link from "next/link";
import FilterDialog from "@/components/Panel/purchase/SuccessfulPurchaseRequestList/FilterDialog";
import MoreInfoDialog from "@/components/Panel/purchase/SuccessfulPurchaseRequestList/MoreInfoDialog";
import DeleteDialog from "@/components/Panel/sales/DeleteDialog";
import EditInfoDialog from "@/components/Panel/sales/EditInfoDialog";
import { useSelector } from "react-redux";
import Checkbox from "@mui/material/Checkbox";
import RegisterFactorDialog from "@/components/Panel/sales/RegisterFactorDialog";
import { AccordionDetails } from "@material-ui/core";
import DeleteItemDialog from "@/components/Panel/sales/DeleteItemDialog";
import EditItemInfoDialog from "@/components/Panel/sales/EditItemInfoDialog";
import MoreInfoItemDialog from "@/components/Panel/purchase/SuccessfulPurchaseRequestList/MoreInfoItemDialog";

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
  // const [checkedAll, setCheckedAll] = useState(false);
  // const handleChangeAllCheckbox = (event) => {
  //   setCheckedAll(event.target.checked);
  // };

  // const handleChangeChecked = (event, data) => {
  //   if (event.target.checked) {
  //     const obj = { ...data };
  //     let updateList = [...paymentList, obj];
  //     setPaymentList(updateList);
  //   } else {
  //     let temp = paymentList.filter((item) => item.id !== data.id);
  //     setPaymentList(temp);
  //   }
  // };

  const {
    data: inventoryData = [],
    isLoading: isDataLoading,
    isError: isDataError,
  } = useGetAllSuccessfulPurchaseRequestListQuery(
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
  // const [openRegisterFactor, setOpenRegisterFactor] = useState(false);
  // const handleOpenRegisterFactor = () => {
  //   setOpenRegisterFactor(true);
  // };
  // const handleCloseRegisterFactor = () => {
  //   setOpenRegisterFactor(false);
  // };
  // const [openDelete, setOpenDelete] = useState(false);
  // const [deleteTargetId, setDeleteTargetId] = useState("");

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

  // const [openEditInfo, setOpenEditInfo] = useState(false);
  // const [editInfoTarget, setEditInfoTarget] = useState({
  //   id: "",
  //   productId: "",
  //   productName: "",
  //   productImage: "",
  //   quantity: {
  //     unit: "",
  //     value: 0,
  //   },
  //   price: 0,
  //   description: "",
  //   paymentMethod: "",
  //   invoiceId: "",
  //   subOrganizationInfo: {
  //     subOrganizationId: "",
  //     subOrganizationName: "",
  //     organizationId: "",
  //   },
  //   salesDate: "",
  //   salesTime: "",
  //   confirmationDate: "",
  //   confirmationTime: "",
  //   confirmerName: "",
  //   status: "",
  //   sellerName: "",
  //   customer: "",
  //   receiptFile: "",
  //   receiptCode: "",
  //   failureReason: {
  //     date: "",
  //     time: "",
  //     description: "",
  //     reporter: "",
  //   },
  // });
  // const [openEditItemInfo, setOpenEditItemInfo] = useState(false);
  // const [editInfoItemTarget, setEditInfoItemTarget] = useState({
  //   id: "",
  //   productId: "",
  //   productName: "",
  //   productImage: "",
  //   quantity: {
  //     unit: "",
  //     value: 0,
  //   },
  //   price: 0,
  //   description: "",
  //   paymentMethod: "",
  //   invoiceId: "",
  //   subOrganizationInfo: {
  //     subOrganizationId: "",
  //     subOrganizationName: "",
  //     organizationId: "",
  //   },
  //   salesDate: "",
  //   salesTime: "",
  //   confirmationDate: "",
  //   confirmationTime: "",
  //   confirmerName: "",
  //   status: "",
  //   sellerName: "",
  //   customer: "",
  //   receiptFile: "",
  //   receiptCode: "",
  //   failureReason: {
  //     date: "",
  //     time: "",
  //     description: "",
  //     reporter: "",
  //   },
  // });
  // const handleOpenEditItemInfo = (info) => {
  //   setEditInfoItemTarget(info);
  //   setOpenEditItemInfo(true);
  // };
  // const handleCloseEditItemInfo = () => {
  //   setEditInfoItemTarget({
  //     id: "",
  //     productId: "",
  //     productName: "",
  //     productImage: "",
  //     quantity: {
  //       unit: "",
  //       value: 0,
  //     },
  //     price: 0,
  //     description: "",
  //     paymentMethod: "",
  //     invoiceId: "",
  //     subOrganizationInfo: {
  //       subOrganizationId: "",
  //       subOrganizationName: "",
  //       organizationId: "",
  //     },
  //     salesDate: "",
  //     salesTime: "",
  //     confirmationDate: "",
  //     confirmationTime: "",
  //     confirmerName: "",
  //     status: "",
  //     sellerName: "",
  //     customer: "",
  //     receiptFile: "",
  //     receiptCode: "",
  //     failureReason: {
  //       date: "",
  //       time: "",
  //       description: "",
  //       reporter: "",
  //     },
  //   });
  //   setOpenEditItemInfo(false);
  // };
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

  const [openMoreInfoItem, setOpenMoreInfoItem] = useState(false);
  const [moreInfoItemTarget, setMoreInfoItemTarget] = useState({
    description: "",
  });
  const handleOpenMoreInfoItem = (info) => {
    setMoreInfoItemTarget(info);
    setOpenMoreInfoItem(true);
  };

  const handleCloseMoreInfoItem = () => {
    setMoreInfoItemTarget({
      description: "",
    });
    setOpenMoreInfoItem(false);
  };
  // const handleOpenDelete = (id) => {
  //   setDeleteTargetId(id);
  //   setOpenDelete(true);
  // };

  // const handleCloseDelete = () => {
  //   setDeleteTargetId("");
  //   setOpenDelete(false);
  // };

  // const [openDeleteItem, setOpenDeleteItem] = useState(false);
  // const [deleteTargetItemId, setDeleteTargetItemId] = useState("");
  // const handleOpenDeleteItem = (id) => {
  //   setDeleteTargetItemId(id);
  //   setOpenDeleteItem(true);
  // };

  // const handleCloseDeleteItem = () => {
  //   setDeleteTargetItemId("");
  //   setOpenDeleteItem(false);
  // };
  // const handleOpenEditInfo = (info) => {
  //   setEditInfoTarget(info);
  //   setOpenEditInfo(true);
  // };
  // const handleCloseEditInfo = () => {
  //   setEditInfoTarget({
  //     id: "",
  //     productId: "",
  //     productName: "",
  //     productImage: "",
  //     quantity: {
  //       unit: "",
  //       value: 0,
  //     },
  //     price: 0,
  //     description: "",
  //     paymentMethod: "",
  //     invoiceId: "",
  //     subOrganizationInfo: {
  //       subOrganizationId: "",
  //       subOrganizationName: "",
  //       organizationId: "",
  //     },
  //     salesDate: "",
  //     salesTime: "",
  //     confirmationDate: "",
  //     confirmationTime: "",
  //     confirmerName: "",
  //     status: "",
  //     sellerName: "",
  //     customer: "",
  //     receiptFile: "",
  //     receiptCode: "",
  //     failureReason: {
  //       date: "",
  //       time: "",
  //       description: "",
  //       reporter: "",
  //     },
  //   });
  //   setOpenEditInfo(false);
  // };

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
  return (
    <div>
      <header className="flex justify-between items-center text-[0.9rem] bg-white py-6 px-5 md:px-10">
        <div className="">
          <h2 className="font-[800] text-[0.9rem] md:text-[1.1rem]">
            کالاهای خریداری شده
          </h2>
        </div>
      </header>
      <section className="py-4 md:px-8 mt-5 bg-white h-[50rem]">
        <div className="px-4 flex justify-between">
          <div className="xl:w-1/4 md:w-1/3">
            <FormControl fullWidth>
              <OutlinedInput
                value={searchValue}
                onChange={handleSearchBox}
                className=""
                size="small"
                sx={{
                  py: "0.2rem",
                  borderRadius: 0,
                }}
                placeholder="جستوجو شماره فاکتور"
                id="outlined-adornment-amount"
                inputProps={{
                  style: {
                    fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189",
                    fontSize: "0.9rem",
                  },
                }}
                startAdornment={
                  <InputAdornment position="start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M21 21L16.65 16.65M11 6C13.7614 6 16 8.23858 16 11M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
                        stroke="#9F9F9F"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </InputAdornment>
                }
              />
            </FormControl>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleOpenFilter}
              className="flex items-center gap-2 text-[0.9rem] text-gray9F border border-1 border-solid border-borderGray rounded px-2 md:px-4 py-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M3.38589 5.66687C2.62955 4.82155 2.25138 4.39889 2.23712 4.03968C2.22473 3.72764 2.35882 3.42772 2.59963 3.22889C2.87684 3 3.44399 3 4.57828 3H19.4212C20.5555 3 21.1227 3 21.3999 3.22889C21.6407 3.42772 21.7748 3.72764 21.7624 4.03968C21.7481 4.39889 21.3699 4.82155 20.6136 5.66687L14.9074 12.0444C14.7566 12.2129 14.6812 12.2972 14.6275 12.3931C14.5798 12.4781 14.5448 12.5697 14.5236 12.6648C14.4997 12.7721 14.4997 12.8852 14.4997 13.1113V18.4584C14.4997 18.6539 14.4997 18.7517 14.4682 18.8363C14.4403 18.911 14.395 18.9779 14.336 19.0315C14.2692 19.0922 14.1784 19.1285 13.9969 19.2012L10.5969 20.5612C10.2293 20.7082 10.0455 20.7817 9.89802 20.751C9.76901 20.7242 9.6558 20.6476 9.583 20.5377C9.49975 20.4122 9.49975 20.2142 9.49975 19.8184V13.1113C9.49975 12.8852 9.49975 12.7721 9.47587 12.6648C9.45469 12.5697 9.41971 12.4781 9.37204 12.3931C9.31828 12.2972 9.2429 12.2129 9.09213 12.0444L3.38589 5.66687Z"
                  stroke="#9F9F9F"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <span className="hidden md:inline">فیلتر کردن</span>
            </button>
            <div>
              <button
                onClick={handleOpenSortMenu}
                className="flex items-center gap-2 text-[0.9rem] text-gray9F border border-1 border-solid border-borderGray rounded px-2 md:px-4 py-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M6 12H18M3 6H21M9 18H15"
                    stroke="#9F9F9F"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <span className="hidden md:inline">مرتب سازی</span>
              </button>
              <Menu
                anchorEl={anchorElSort}
                id="account-menu"
                open={openSort}
                onClose={handleCloseSortMenu}
                onClick={handleCloseSortMenu}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    width: "10rem",
                    bgcolor: "#fff",
                    borderRadius: "0.5rem",
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 3px rgba(0,0,0,0.1))",
                    mt: 1.5,
                    fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189",
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "left", vertical: "top" }}
                anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
              >
                <div className="px-2 py-2">
                  <div>
                    <button
                      onClick={() => {
                        setSort("desc");
                      }}
                      className="w-full flex gap-2 py-3 px-2 hover:bg-neutral-100"
                    >
                      <span className="text-gray70 text-[0.8rem] tracking-tighter">
                        بر اساس جدید ترین
                      </span>
                    </button>
                    <button
                      onClick={() => setSort("asc")}
                      className="w-full flex gap-2 py-3 px-2 hover:bg-neutral-100 border-t border-t-[#D9D9D9]"
                    >
                      <span className="text-gray70 text-[0.8rem] tracking-tighter">
                        بر اساس قدیمی ترین
                      </span>
                    </button>
                  </div>
                </div>
              </Menu>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <div className="overflow-x-auto">
            <table className=" w-full table-auto overflow-scroll border-collapse border-spacing-0 text-sm text-center text-gray70  ">
              {/* <thead className="text-[0.9rem] text-gray80  bg-[#F8F8F8] md:bg-[#F2EDED] ">
                <tr>
                  <th className="hidden md:table-cell px-2 md:px-6 py-4">
                    شماره فاکتور
                  </th>
                  <th className="px-2 md:px-6 px-6 py-4 ">مشتری</th>
                  <th className="px-2 md:px-6 px-6 py-4">وضعیت فاکتور</th>
                  <th className="px-2 md:px-6 px-6 py-4">تاریخ فروش</th>
                  <th className="hidden md:table-cell px-6 py-4">دپارتمان</th>
                  <th className="hidden md:table-cell px-6 py-4">عملیات</th>
                </tr> 
              </thead> */}
              <tbody className="table-body">
                {isDataLoading
                  ? [...Array(8)].map(() => (
                      <tr className="border-b">
                        <td className="px-2 md:px-6 py-4  text-gray70 whitespace-nowrap ">
                          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                        </td>
                        <td className="px-2 md:px-6 py-4  text-gray70 whitespace-nowrap ">
                          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                        </td>
                        <td className="px-2 md:px-6 py-4  text-gray70 whitespace-nowrap ">
                          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                        </td>

                        <td className="px-2 md:px-6 py-2  text-gray70 whitespace-nowrap ">
                          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                        </td>
                        <td className="hidden md:table-cell px-6 py-4  text-gray70 whitespace-nowrap ">
                          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                        </td>

                        <td className="hidden md:table-cell px-6 py-4  text-gray70 whitespace-nowrap ">
                          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                        </td>

                        <td
                          scope="row"
                          className="hidden md:flex gap-2 px-6 py-4 justify-center text-gray70 whitespace-nowrap "
                        >
                          <Skeleton variant="rounded" width={23} height={23} />
                          <Skeleton variant="rounded" width={23} height={23} />
                          <Skeleton variant="rounded" width={23} height={23} />
                          <Skeleton variant="rounded" width={23} height={23} />
                        </td>
                      </tr>
                    ))
                  : inventoryData?.content?.map((data, index) => (
                      <Accordion
                        className="justify-between sales-table-row"
                        onChange={handleChangeInvoiceList(
                          `panel${data.id + index}`
                        )}
                      >
                        <AccordionSummary
                          aria-controls="panelbh-content"
                          id="panelbh-header"
                        >
                          <div
                            onClick={() => {
                              handleOpenMoreInfoRow(data);
                            }}
                            className=" w-full flex justify-between items-center "
                          >
                            <td className="hidden md:table-cell px-2 md:px-6 py-4  text-gray70 whitespace-nowrap ">
                              <span>{index + 1}</span>
                            </td>
                            <td className="hidden md:table-cell px-2 md:px-6 py-4  items-center gap-2 text-gray70 whitespace-nowrap ">
                              <span className="pl-2  text-[#4E4E4E]">
                                شماره فاکتور :
                              </span>
                              <span>{data?.receiptCode}</span>
                            </td>
                            <td className="px-6 py-4  text-gray70 whitespace-nowrap ">
                              <span className="pl-2  text-[#4E4E4E]">
                                مسئول خرید :
                              </span>
                              <span>{data?.buyerName}</span>
                            </td>
                            <td className="px-2 md:px-6 py-4 flex items-center gap-2 text-gray70 whitespace-nowrap ">
                              <span className="pl-2  text-[#4E4E4E]">
                                {" "}
                                وضعیت :
                              </span>
                              <span>
                                {data?.status === "IN_PROGRESS" ? (
                                  <div>
                                    <span className="text-[0.8rem] bg-[#EBEBEB] text-gray70 py-1 px-2 rounded-xl">
                                      در انتظار تایید
                                    </span>
                                  </div>
                                ) : data?.status === "FAIL" ? (
                                  <div>
                                    <span className="text-[0.8rem] bg-orangeBg text-orangeText py-1 px-2 rounded-xl">
                                      رد شده
                                    </span>
                                  </div>
                                ) : data?.status === "DONE" ? (
                                  <span className="text-[0.8rem] bg-greenBg text-greenText py-1 px-2 rounded-xl">
                                    تایید شده
                                  </span>
                                ) : null}
                              </span>
                            </td>
                            <td className=" space-x-2 px-2 py-4 md:px-6  text-gray70 whitespace-nowrap ">
                              <span className="pl-2  text-[#4E4E4E]">
                                تاریخ خرید :
                              </span>
                              <span>{data?.purchaseDate}</span>
                              <span>{data?.purchaseTime}</span>
                            </td>

                            <td className="px-6 py-4 md:table-cell hidden text-gray70 whitespace-nowrap ">
                              <span className="pl-2  text-[#4E4E4E]">
                                دپارتمان :
                              </span>
                              <span>{data?.subOrganizationName}</span>
                            </td>

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

                              <button
                                onClick={() => {
                                  handleChangeInvoiceList(
                                    `panel${data.id + index}`
                                  );
                                }}
                                className="border border-1 border-solid border-[#797979] rounded p-[0.4rem] hover:bg-red-100"
                              >
                                <svg
                                  className={
                                    expanded === `panel${data.id + index}`
                                      ? "rotate-180 transition-all duration-300"
                                      : " transition-all duration-300"
                                  }
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                >
                                  <path
                                    d="M4 6L8 10L12 6"
                                    stroke="#797979"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                </svg>
                              </button>
                            </td>
                          </div>
                        </AccordionSummary>
                        <AccordionDetails className="">
                          <div className=" px-32 w-full">
                            <div className="overflow-x-auto  border-r border-dotted border-black">
                              <table className=" w-full overflow-scroll  border-collapse border-spacing-0 text-sm text-center text-gray70  ">
                                <tbody className="">
                                  {data?.paymentItems?.map(
                                    (item, itemIndex) => (
                                      <div className="flex justify-between my-1 items-center pr-1">
                                        <Typography
                                          sx={{
                                            fontFamily:
                                              "__fonts_2f4189,__fonts_Fallback_2f4189",
                                          }}
                                          className="flex gap-2 items-center w-1/5"
                                        >
                                          <span className="text-[0.8rem]">
                                            {itemIndex + 1}
                                          </span>
                                          <span className="text-[0.8rem] text-[#4E4E4E] pr-2 ">
                                            نام محصول :
                                          </span>
                                          <span className=" text-[0.8rem]">
                                            {item?.bill?.billCycle?.productName}
                                          </span>
                                        </Typography>
                                        <Typography
                                          sx={{
                                            fontFamily:
                                              "__fonts_2f4189,__fonts_Fallback_2f4189",
                                          }}
                                          className="w-1/5 flex gap-2 items-center"
                                        >
                                          <span className="text-[0.8rem] text-[#4E4E4E]">
                                            مقدار:
                                          </span>
                                          <span className="text-[0.8rem]">
                                            {item?.bill?.quantity?.value}
                                            {item?.bill?.quantity?.unit}
                                          </span>
                                        </Typography>
                                        <Typography
                                          sx={{
                                            fontFamily:
                                              "__fonts_2f4189,__fonts_Fallback_2f4189",
                                          }}
                                          className="w-1/2 flex gap-2 items-center"
                                        >
                                          <span className="text-[0.8rem] text-[#4E4E4E]">
                                            روش پرداخت:
                                          </span>
                                          <span className="text-[0.8rem]">
                                            {item?.paymentMethod ===
                                            "PARDAKHT_NAGHDI"
                                              ? "پرداخت نقدی در محل تحویل"
                                              : item?.paymentMethod ===
                                                "PARDAKHT_BANKI"
                                              ? "پرداخت با کارت بانکی در محل تحویل"
                                              : item?.paymentMethod ===
                                                "PARDAKHT_INTERNETI"
                                              ? "پرداخت از طریق درگاه اینترنتی"
                                              : item?.paymentMethod ===
                                                "CHEK_MODAT_DAR"
                                              ? "چک مدت دار"
                                              : item?.paymentMethod === "CHEK"
                                              ? "چک"
                                              : item?.paymentMethod ===
                                                "AGHSATI"
                                              ? "اقساطی"
                                              : item?.paymentMethod ===
                                                "ETEBARI"
                                              ? "اعتباری"
                                              : item?.paymentMethod === "SAYER"
                                              ? "سایر"
                                              : null}
                                          </span>
                                        </Typography>
                                        <div className="hidden md:flex gap-2 px-6  justify-center text-gray70 whitespace-nowrap ">
                                          <button
                                            onClick={() => {
                                              handleOpenMoreInfoItem(item);
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
                                        </div>
                                      </div>
                                    )
                                  )}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </AccordionDetails>
                      </Accordion>
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
      <MoreInfoDialog
        // handleOpenDelete={handleOpenDelete}
        // handleOpenEditInfo={handleOpenEditInfo}
        moreInfoTarget={moreInfoTarget}
        openMoreInfo={openMoreInfo}
        handleCloseMoreInfo={handleCloseMoreInfo}
      />
      <MoreInfoItemDialog
        moreInfoItemTarget={moreInfoItemTarget}
        openMoreInfoItem={openMoreInfoItem}
        handleCloseMoreInfoItem={handleCloseMoreInfoItem}
      />
    </div>
  );
}
