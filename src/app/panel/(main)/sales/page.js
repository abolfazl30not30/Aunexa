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
import FilterDialog from "@/components/Panel/sales/FilterDialog";
import MoreInfoDialog from "@/components/Panel/sales/MoreInfoDialog";
import DeleteDialog from "@/components/Panel/sales/DeleteDialog";
import EditInfoDialog from "@/components/Panel/sales/EditInfoDialog";
import { useSelector } from "react-redux";
import Checkbox from "@mui/material/Checkbox";
import RegisterFactorDialog from "@/components/Panel/sales/RegisterFactorDialog";
import { AccordionDetails } from "@material-ui/core";
import DeleteItemDialog from "@/components/Panel/sales/DeleteItemDialog";
import EditItemInfoDialog from "@/components/Panel/sales/EditItemInfoDialog";

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
  const [filterItemCounter, setFilterItemCounter] = useState(0);
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
  const [showProduct, setShowProduct] = useState("invoice");
  const handleCounterOfFilter = () => {
    let params = new URLSearchParams(filterItem);
    setFilterItemCounter(params.size);
  };

  useEffect(() => {
    handleCounterOfFilter();
  }, [filterItem]);

  return (
    <div>
      <header className="flex justify-between items-center text-[0.9rem] bg-white py-6 px-5 md:px-10">
        <div className="">
          <h2 className="font-[800] text-[0.9rem] md:text-[1.1rem]">فـروش</h2>
        </div>
        {showProduct === "invoice" && (
          <div className="">
            <button
              className="flex  text-white items-center bg-mainRed border px-3 py-2 rounded-full md:rounded"
              onClick={handleOpenRegisterFactor}
            >
              <span className="hidden md:inline">ثبت فروش</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M7 12H17"
                  stroke="#fff"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M12 7V17"
                  stroke="#fff"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
        )}
      </header>

      <section className="py-2 mt-4 md:px-8  bg-white ">
        {showProduct === "invoice" && (
          <div className="px-2 flex justify-between">
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
                className="flex relative items-center gap-2 text-[0.9rem] text-gray9F border border-1 border-solid border-borderGray rounded px-2 md:px-4 py-2"
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
                {filterItemCounter !== 0 && (
                  <div className="absolute md:top-1 md:right-2 top-1 right-1">
                    <span className=" rounded-full bg-mainRed w-[1rem] h-[1rem] text-[0.49rem] flex  items-center justify-center text-center text-white">
                      {filterItemCounter}
                    </span>
                  </div>
                )}
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
        )}

        <div className="mt-4">
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
                      <div>
                        <Accordion
                          className="justify-between sales-table-row sm:block hidden"
                          onChange={handleChangeInvoiceList(
                            `panel${data.id + index}`
                          )}
                        >
                          <AccordionSummary
                            aria-controls="panelbh-content"
                            id="panelbh-header"
                          >
                            <div className=" w-full flex justify-between items-center ">
                              <td className="hidden md:table-cell px-2 md:px-4 py-4  text-gray70 whitespace-nowrap ">
                                <span>{index + 1}</span>
                              </td>
                              <td className="hidden sm:flex px-2 md:px-4 py-4 sm:w-1/4 lg:w-2/5 items-center gap-1 text-gray70 whitespace-nowrap justify-start">
                                <span className="pl-2  text-[#4E4E4E]">
                                  شماره فاکتور :
                                </span>
                                <span>{data?.receiptCode}</span>
                              </td>
                              <td className="md:px-6 px-2 py-4  hidden sm:flex sm:w-1/3 lg:w-1/2 2xl:w-2/5 text-gray70 whitespace-nowrap justify-start">
                                <span className="pl-2  text-[#4E4E4E]">
                                  مشتری :
                                </span>
                                <span>{data?.customer}</span>
                              </td>
                              <td className="px-2 md:px-6 py-4 hidden lg:flex  items-center gap-1 2xl:w-1/4 text-gray70 whitespace-nowrap ">
                                <span className="pl-2  text-[#4E4E4E]">
                                  {" "}
                                  وضعیت :
                                </span>
                                <span>
                                  {data?.status === "IN_PROGRESS" ? (
                                    <div>
                                      <span className="text-[0.8rem] bg-[#EBEBEB] text-gray70  py-1 px-2 rounded-xl">
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
                              <td className=" space-x-2 px-2 py-4 md:px-6 hidden xl:flex 2xl:w-1/4 text-gray70 whitespace-nowrap ">
                                <span className="pl-2  text-[#4E4E4E]">
                                  تاریخ فروش :
                                </span>
                                <span>{data?.salesDate}</span>
                              </td>

                              <td className="px-6 py-4 2xl:table-cell hidden text-gray70 2xl:w-1/4 whitespace-nowrap ">
                                <span className="pl-2  text-[#4E4E4E]">
                                  دپارتمان :
                                </span>
                                <span>
                                  {
                                    data?.subOrganizationInfo
                                      ?.subOrganizationName
                                  }
                                </span>
                              </td>

                              <td
                                scope="row"
                                className="hidden sm:flex gap-2  py-4 justify-center text-gray70 whitespace-nowrap "
                              >
                                <button
                                  onClick={(e) => {
                                    handleOpenMoreInfo(data);
                                    e.stopPropagation();
                                  }}
                                  className="border border-1 border-solid border-gray70 rounded p-[0.3rem] hover:bg-neutral-100"
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
                                {data.status == "IN_PROGRESS" && (
                                  <button
                                    onClick={(e) => {
                                      handleOpenEditInfo(data);
                                      e.stopPropagation();
                                    }}
                                    className="border border-1 border-solid border-[#2492FF] rounded p-[0.3rem] hover:bg-blue-100"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="16"
                                      viewBox="0 0 16 16"
                                      fill="none"
                                    >
                                      <g clip-path="url(#clip0_197_250)">
                                        <path
                                          d="M7.3335 2.66666H4.5335C3.41339 2.66666 2.85334 2.66666 2.42552 2.88464C2.04919 3.07639 1.74323 3.38235 1.55148 3.75867C1.3335 4.1865 1.3335 4.74655 1.3335 5.86666V11.4667C1.3335 12.5868 1.3335 13.1468 1.55148 13.5746C1.74323 13.951 2.04919 14.2569 2.42552 14.4487C2.85334 14.6667 3.41339 14.6667 4.5335 14.6667H10.1335C11.2536 14.6667 11.8137 14.6667 12.2415 14.4487C12.6178 14.2569 12.9238 13.951 13.1155 13.5746C13.3335 13.1468 13.3335 12.5868 13.3335 11.4667V8.66666M5.33348 10.6667H6.44984C6.77596 10.6667 6.93902 10.6667 7.09247 10.6298C7.22852 10.5972 7.35858 10.5433 7.47788 10.4702C7.61243 10.3877 7.72773 10.2724 7.95833 10.0418L14.3335 3.66666C14.8858 3.11437 14.8858 2.21894 14.3335 1.66666C13.7812 1.11437 12.8858 1.11437 12.3335 1.66665L5.95832 8.04182C5.72772 8.27242 5.61241 8.38772 5.52996 8.52228C5.45685 8.64157 5.40298 8.77163 5.37032 8.90768C5.33348 9.06113 5.33348 9.22419 5.33348 9.55031V10.6667Z"
                                          stroke="#2492FF"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                        />
                                      </g>
                                      <defs>
                                        <clipPath id="clip0_197_250">
                                          <rect
                                            width="16"
                                            height="16"
                                            fill="white"
                                          />
                                        </clipPath>
                                      </defs>
                                    </svg>
                                  </button>
                                )}
                                {data.status === "IN_PROGRESS" && (
                                  <button
                                    onClick={(e) => {
                                      handleOpenDelete(data.id);
                                      e.stopPropagation();
                                    }}
                                    className="border border-1 border-solid border-[#FE4949] rounded p-[0.3rem] hover:bg-red-100"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="16"
                                      viewBox="0 0 16 16"
                                      fill="none"
                                    >
                                      <path
                                        d="M10.6667 3.99998V3.46665C10.6667 2.71991 10.6667 2.34654 10.5213 2.06133C10.3935 1.81044 10.1895 1.60647 9.93865 1.47864C9.65344 1.33331 9.28007 1.33331 8.53333 1.33331H7.46667C6.71993 1.33331 6.34656 1.33331 6.06135 1.47864C5.81046 1.60647 5.60649 1.81044 5.47866 2.06133C5.33333 2.34654 5.33333 2.71991 5.33333 3.46665V3.99998M6.66667 7.66665V11M9.33333 7.66665V11M2 3.99998H14M12.6667 3.99998V11.4666C12.6667 12.5868 12.6667 13.1468 12.4487 13.5746C12.2569 13.951 11.951 14.2569 11.5746 14.4487C11.1468 14.6666 10.5868 14.6666 9.46667 14.6666H6.53333C5.41323 14.6666 4.85318 14.6666 4.42535 14.4487C4.04903 14.2569 3.74307 13.951 3.55132 13.5746C3.33333 13.1468 3.33333 12.5868 3.33333 11.4666V3.99998"
                                        stroke="#FE4949"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                      />
                                    </svg>
                                  </button>
                                )}
                                <button
                                  onClick={() => {
                                    handleChangeInvoiceList(
                                      `panel${data.id + index}`
                                    );
                                  }}
                                  className="border border-1 border-solid border-[#797979] rounded p-[0.3rem] hover:bg-red-100"
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
                            <div className=" xl:px-32 px-14 lg:px-10 w-full">
                              <div className="overflow-x-auto  border-r border-dotted border-black">
                                <table className=" w-full overflow-scroll  border-collapse border-spacing-0 text-sm text-center text-gray70  ">
                                  <tbody className="">
                                    {data?.invoiceItems.map(
                                      (item, itemIndex) => (
                                        <div className="flex justify-between my-1 items-center pr-1 space-x-2">
                                          <Typography
                                            sx={{
                                              fontFamily:
                                                "__fonts_2f4189,__fonts_Fallback_2f4189",
                                            }}
                                            className="flex gap-1 items-center w-1/3 lg:w-1/4"
                                          >
                                            <span className="text-[0.8rem]">
                                              {itemIndex + 1}
                                            </span>
                                            <span className="text-[0.8rem] text-[#4E4E4E] pr-2 ">
                                              نام محصول :
                                            </span>
                                            <span className=" text-[0.8rem]">
                                              {item.productName}
                                            </span>
                                          </Typography>
                                          <Typography
                                            sx={{
                                              fontFamily:
                                                "__fonts_2f4189,__fonts_Fallback_2f4189",
                                            }}
                                            className="w-1/5 hidden gap-1 items-center md:flex "
                                          >
                                            <span className="text-[0.8rem] text-[#4E4E4E]">
                                              مقدار:
                                            </span>
                                            <span className="text-[0.8rem]">
                                              {item?.quantity?.value}
                                              {item?.quantity?.unit}
                                            </span>
                                          </Typography>
                                          <Typography
                                            sx={{
                                              fontFamily:
                                                "__fonts_2f4189,__fonts_Fallback_2f4189",
                                            }}
                                            className="w-3/5 hidden gap-1 items-center lg:flex"
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
                                                : item?.paymentMethod ===
                                                  "SAYER"
                                                ? "سایر"
                                                : null}
                                            </span>
                                          </Typography>
                                          <div className="hidden sm:flex gap-2 px-6  justify-center text-gray70 whitespace-nowrap ">
                                            {data.status === "IN_PROGRESS" && (
                                              <button
                                                onClick={() => {
                                                  handleOpenEditItemInfo(item);
                                                }}
                                                className="border border-1 border-solid border-[#2492FF] rounded p-[0.4rem] hover:bg-blue-100"
                                              >
                                                <svg
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  width="16"
                                                  height="16"
                                                  viewBox="0 0 16 16"
                                                  fill="none"
                                                >
                                                  <g clip-path="url(#clip0_197_250)">
                                                    <path
                                                      d="M7.3335 2.66666H4.5335C3.41339 2.66666 2.85334 2.66666 2.42552 2.88464C2.04919 3.07639 1.74323 3.38235 1.55148 3.75867C1.3335 4.1865 1.3335 4.74655 1.3335 5.86666V11.4667C1.3335 12.5868 1.3335 13.1468 1.55148 13.5746C1.74323 13.951 2.04919 14.2569 2.42552 14.4487C2.85334 14.6667 3.41339 14.6667 4.5335 14.6667H10.1335C11.2536 14.6667 11.8137 14.6667 12.2415 14.4487C12.6178 14.2569 12.9238 13.951 13.1155 13.5746C13.3335 13.1468 13.3335 12.5868 13.3335 11.4667V8.66666M5.33348 10.6667H6.44984C6.77596 10.6667 6.93902 10.6667 7.09247 10.6298C7.22852 10.5972 7.35858 10.5433 7.47788 10.4702C7.61243 10.3877 7.72773 10.2724 7.95833 10.0418L14.3335 3.66666C14.8858 3.11437 14.8858 2.21894 14.3335 1.66666C13.7812 1.11437 12.8858 1.11437 12.3335 1.66665L5.95832 8.04182C5.72772 8.27242 5.61241 8.38772 5.52996 8.52228C5.45685 8.64157 5.40298 8.77163 5.37032 8.90768C5.33348 9.06113 5.33348 9.22419 5.33348 9.55031V10.6667Z"
                                                      stroke="#2492FF"
                                                      stroke-linecap="round"
                                                      stroke-linejoin="round"
                                                    />
                                                  </g>
                                                  <defs>
                                                    <clipPath id="clip0_197_250">
                                                      <rect
                                                        width="16"
                                                        height="16"
                                                        fill="white"
                                                      />
                                                    </clipPath>
                                                  </defs>
                                                </svg>
                                              </button>
                                            )}
                                            {data.status === "IN_PROGRESS" && (
                                              <button
                                                onClick={() => {
                                                  handleOpenDeleteItem(item.id);
                                                }}
                                                className="border border-1 border-solid border-[#FE4949] rounded p-[0.3rem] hover:bg-red-100"
                                              >
                                                <svg
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  width="16"
                                                  height="16"
                                                  viewBox="0 0 16 16"
                                                  fill="none"
                                                >
                                                  <path
                                                    d="M10.6667 3.99998V3.46665C10.6667 2.71991 10.6667 2.34654 10.5213 2.06133C10.3935 1.81044 10.1895 1.60647 9.93865 1.47864C9.65344 1.33331 9.28007 1.33331 8.53333 1.33331H7.46667C6.71993 1.33331 6.34656 1.33331 6.06135 1.47864C5.81046 1.60647 5.60649 1.81044 5.47866 2.06133C5.33333 2.34654 5.33333 2.71991 5.33333 3.46665V3.99998M6.66667 7.66665V11M9.33333 7.66665V11M2 3.99998H14M12.6667 3.99998V11.4666C12.6667 12.5868 12.6667 13.1468 12.4487 13.5746C12.2569 13.951 11.951 14.2569 11.5746 14.4487C11.1468 14.6666 10.5868 14.6666 9.46667 14.6666H6.53333C5.41323 14.6666 4.85318 14.6666 4.42535 14.4487C4.04903 14.2569 3.74307 13.951 3.55132 13.5746C3.33333 13.1468 3.33333 12.5868 3.33333 11.4666V3.99998"
                                                    stroke="#FE4949"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                  />
                                                </svg>
                                              </button>
                                            )}
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
                        {showProduct === "invoice" && (
                          <div className=" bg-white border-b sm:hidden w-full flex justify-between items-center px-4">
                            {/* <td className="hidden md:table-cell px-2 md:px-6 py-4  text-gray70 whitespace-nowrap ">
                            <span>{index + 1}</span>
                          </td> */}
                            <td className="table-cell px-2 md:px-6 py-4  items-center gap-2 text-gray70 whitespace-nowrap ">
                              <span className="pl-2  text-[#4E4E4E]">
                                شماره فاکتور :
                              </span>
                              <span>{data?.receiptCode}</span>
                            </td>
                            {/* <td className="px-6 py-4  text-gray70 whitespace-nowrap ">
                            <span className="pl-2  text-[#4E4E4E]">
                              مشتری :
                            </span>
                            <span>{data?.customer}</span>
                          </td> */}
                            {/* <td className="px-2 md:px-6 py-4 flex items-center gap-2 text-gray70 whitespace-nowrap ">
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
                          </td> */}
                            {/* <td className=" space-x-2 px-2 py-4 md:px-6  text-gray70 whitespace-nowrap ">
                            <span className="pl-2  text-[#4E4E4E]">
                              تاریخ فروش :
                            </span>
                            <span>{data?.salesDate}</span>
                          </td> */}

                            {/* <td className="px-6 py-4 md:table-cell hidden text-gray70 whitespace-nowrap ">
                            <span className="pl-2  text-[#4E4E4E]">
                              دپارتمان :
                            </span>
                            <span>
                              {data?.subOrganizationInfo?.subOrganizationName}
                            </span>
                          </td> */}

                            <td
                              scope="row"
                              className="flex gap-1  py-4 justify-center text-gray70 whitespace-nowrap "
                            >
                              <button
                                onClick={(e) => {
                                  setShowProduct(data?.id);
                                }}
                                className="border border-1 border-solid border-[#94f596] rounded p-[0.3rem] hover:bg-green-100"
                              >
                                <svg
                                  fill="#94f596"
                                  width="20"
                                  height="20"
                                  viewBox="0 0 48 48"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M0 0h48v48H0z" fill="none" />
                                  <g id="Shopicon">
                                    <path
                                      d="M6,44l9-4l9,4l9-4l9,4V4H6V44z M10,8h28v29.845l-3.375-1.5L33,35.623l-1.625,0.722L24,39.623l-7.375-3.278L15,35.623
		l-1.625,0.722L10,37.845V8z"
                                    />
                                    <rect x="14" y="12" width="20" height="4" />
                                    <rect x="14" y="20" width="20" height="4" />
                                    <rect x="14" y="28" width="12" height="4" />
                                  </g>
                                </svg>
                              </button>
                              <button
                                onClick={(e) => {
                                  handleOpenMoreInfo(data);
                                }}
                                className="border border-1 border-solid border-gray70 rounded p-[0.3rem] hover:bg-neutral-100"
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
                              {data.status == "IN_PROGRESS" && (
                                <button
                                  onClick={(e) => {
                                    handleOpenEditInfo(data);
                                  }}
                                  className="border border-1 border-solid border-[#2492FF] rounded p-[0.3rem] hover:bg-blue-100"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                  >
                                    <g clip-path="url(#clip0_197_250)">
                                      <path
                                        d="M7.3335 2.66666H4.5335C3.41339 2.66666 2.85334 2.66666 2.42552 2.88464C2.04919 3.07639 1.74323 3.38235 1.55148 3.75867C1.3335 4.1865 1.3335 4.74655 1.3335 5.86666V11.4667C1.3335 12.5868 1.3335 13.1468 1.55148 13.5746C1.74323 13.951 2.04919 14.2569 2.42552 14.4487C2.85334 14.6667 3.41339 14.6667 4.5335 14.6667H10.1335C11.2536 14.6667 11.8137 14.6667 12.2415 14.4487C12.6178 14.2569 12.9238 13.951 13.1155 13.5746C13.3335 13.1468 13.3335 12.5868 13.3335 11.4667V8.66666M5.33348 10.6667H6.44984C6.77596 10.6667 6.93902 10.6667 7.09247 10.6298C7.22852 10.5972 7.35858 10.5433 7.47788 10.4702C7.61243 10.3877 7.72773 10.2724 7.95833 10.0418L14.3335 3.66666C14.8858 3.11437 14.8858 2.21894 14.3335 1.66666C13.7812 1.11437 12.8858 1.11437 12.3335 1.66665L5.95832 8.04182C5.72772 8.27242 5.61241 8.38772 5.52996 8.52228C5.45685 8.64157 5.40298 8.77163 5.37032 8.90768C5.33348 9.06113 5.33348 9.22419 5.33348 9.55031V10.6667Z"
                                        stroke="#2492FF"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                      />
                                    </g>
                                    <defs>
                                      <clipPath id="clip0_197_250">
                                        <rect
                                          width="16"
                                          height="16"
                                          fill="white"
                                        />
                                      </clipPath>
                                    </defs>
                                  </svg>
                                </button>
                              )}
                              {data.status === "IN_PROGRESS" && (
                                <button
                                  onClick={(e) => {
                                    handleOpenDelete(data.id);
                                  }}
                                  className="border border-1 border-solid border-[#FE4949] rounded p-[0.3rem] hover:bg-red-100"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                  >
                                    <path
                                      d="M10.6667 3.99998V3.46665C10.6667 2.71991 10.6667 2.34654 10.5213 2.06133C10.3935 1.81044 10.1895 1.60647 9.93865 1.47864C9.65344 1.33331 9.28007 1.33331 8.53333 1.33331H7.46667C6.71993 1.33331 6.34656 1.33331 6.06135 1.47864C5.81046 1.60647 5.60649 1.81044 5.47866 2.06133C5.33333 2.34654 5.33333 2.71991 5.33333 3.46665V3.99998M6.66667 7.66665V11M9.33333 7.66665V11M2 3.99998H14M12.6667 3.99998V11.4666C12.6667 12.5868 12.6667 13.1468 12.4487 13.5746C12.2569 13.951 11.951 14.2569 11.5746 14.4487C11.1468 14.6666 10.5868 14.6666 9.46667 14.6666H6.53333C5.41323 14.6666 4.85318 14.6666 4.42535 14.4487C4.04903 14.2569 3.74307 13.951 3.55132 13.5746C3.33333 13.1468 3.33333 12.5868 3.33333 11.4666V3.99998"
                                      stroke="#FE4949"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                  </svg>
                                </button>
                              )}
                            </td>
                          </div>
                        )}
                        {showProduct === data.id && (
                          <div>
                            <div className="bg-white flex justify-end px-2 pt-1">
                              <button
                                onClick={() => setShowProduct("invoice")}
                                className="flex justify-center border-mainRed border text-white items-center text- p-[0.3rem] rounded"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                >
                                  <path
                                    d="M6 12L10 8L6 4"
                                    stroke="#DB3746"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                </svg>
                              </button>
                            </div>

                            <div className="flex flex-col   text-[0.9rem] bg-white py-6">
                              <div className="space-y-3 border-b border-gray30 pb-4 px-4">
                                <div className="border border-gray30">
                                  <div className="px-2 md:px-6 w-1/4 py-3 flex items-center gap-2 text-gray70 whitespace-nowrap ">
                                    <span className="text-[#4E4E4E]">
                                      شماره فاکتور :{" "}
                                    </span>
                                    <span className=" text-sm">
                                      {data?.receiptCode}
                                    </span>
                                  </div>
                                </div>
                                <div className="border border-gray30">
                                  <div className="px-2 md:px-6 w-1/4 py-3 flex items-center gap-2 text-gray70 whitespace-nowrap ">
                                    <span className="text-[#4E4E4E]">
                                      {" "}
                                      تاریخ فروش :{" "}
                                    </span>
                                    <span className=" text-sm">
                                      {data?.salesDate}
                                    </span>
                                  </div>
                                </div>
                                <div className="border border-gray30">
                                  <div className="px-2 md:px-6 w-1/4 py-3 flex items-center gap-2 text-gray70 whitespace-nowrap ">
                                    <span className="text-[#4E4E4E]">
                                      {" "}
                                      دپارتمان :{" "}
                                    </span>
                                    <span className=" text-sm">
                                      {
                                        data?.subOrganizationInfo
                                          ?.subOrganizationName
                                      }
                                    </span>
                                  </div>
                                </div>
                                <div className="border border-gray30">
                                  <div className="px-2 md:px-6 w-1/4 py-3 flex items-center gap-2 text-gray70 whitespace-nowrap ">
                                    <span className="text-[#4E4E4E]">
                                      {" "}
                                      مشتری :{" "}
                                    </span>
                                    <span className=" text-sm">
                                      {data?.sellerName}
                                    </span>
                                  </div>
                                </div>
                                <div className="border border-gray30">
                                  <div className="px-2 md:px-6 w-1/4 py-3 flex items-center gap-2 text-gray70 whitespace-nowrap ">
                                    <span className="text-[#4E4E4E]">
                                      {" "}
                                      وضعیت :{" "}
                                    </span>
                                    <span className=" text-sm">
                                      {data?.status === "FAIL"
                                        ? "رد شده"
                                        : data?.status === "DONE"
                                        ? "تایید شده"
                                        : data?.status === "IN_PROGRESS"
                                        ? "در انتظار تایید"
                                        : null}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              {data?.invoiceItems.map((item, itemIndex) => (
                                <div className="flex items-center justify-between">
                                  <div className="px-4  py-3 flex items-center w-1/3 gap-2 text-gray70 whitespace-nowrap ">
                                    <span className="text-[#4E4E4E]">
                                      {" "}
                                      نام :{" "}
                                    </span>
                                    <span className=" text-sm">
                                      {item?.productName}
                                    </span>
                                  </div>
                                  <div className="px-4  py-3 flex items-center  w-1/2 gap-2 text-gray70 whitespace-nowrap ">
                                    <span className="text-[#4E4E4E]">
                                      {" "}
                                      مقدار :{" "}
                                    </span>
                                    <span className=" text-sm">
                                      <span>{item?.quantity?.unit}</span>
                                      <span>{item?.quantity?.value}</span>
                                    </span>
                                  </div>
                                  <div className="flex gap-1  justify-center text-gray70 whitespace-nowrap px-2 ">
                                    {
                                      <button
                                        onClick={() => {
                                          handleOpenEditItemInfo(item);
                                        }}
                                        className="border border-1 border-solid border-[#2492FF] rounded p-[0.3rem] hover:bg-blue-100"
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="16"
                                          height="16"
                                          viewBox="0 0 16 16"
                                          fill="none"
                                        >
                                          <g clip-path="url(#clip0_197_250)">
                                            <path
                                              d="M7.3335 2.66666H4.5335C3.41339 2.66666 2.85334 2.66666 2.42552 2.88464C2.04919 3.07639 1.74323 3.38235 1.55148 3.75867C1.3335 4.1865 1.3335 4.74655 1.3335 5.86666V11.4667C1.3335 12.5868 1.3335 13.1468 1.55148 13.5746C1.74323 13.951 2.04919 14.2569 2.42552 14.4487C2.85334 14.6667 3.41339 14.6667 4.5335 14.6667H10.1335C11.2536 14.6667 11.8137 14.6667 12.2415 14.4487C12.6178 14.2569 12.9238 13.951 13.1155 13.5746C13.3335 13.1468 13.3335 12.5868 13.3335 11.4667V8.66666M5.33348 10.6667H6.44984C6.77596 10.6667 6.93902 10.6667 7.09247 10.6298C7.22852 10.5972 7.35858 10.5433 7.47788 10.4702C7.61243 10.3877 7.72773 10.2724 7.95833 10.0418L14.3335 3.66666C14.8858 3.11437 14.8858 2.21894 14.3335 1.66666C13.7812 1.11437 12.8858 1.11437 12.3335 1.66665L5.95832 8.04182C5.72772 8.27242 5.61241 8.38772 5.52996 8.52228C5.45685 8.64157 5.40298 8.77163 5.37032 8.90768C5.33348 9.06113 5.33348 9.22419 5.33348 9.55031V10.6667Z"
                                              stroke="#2492FF"
                                              stroke-linecap="round"
                                              stroke-linejoin="round"
                                            />
                                          </g>
                                          <defs>
                                            <clipPath id="clip0_197_250">
                                              <rect
                                                width="16"
                                                height="16"
                                                fill="white"
                                              />
                                            </clipPath>
                                          </defs>
                                        </svg>
                                      </button>
                                    }
                                    {
                                      <button
                                        onClick={() => {
                                          handleOpenDeleteItem(item.id);
                                        }}
                                        className="border border-1 border-solid border-[#FE4949] rounded p-[0.4rem] hover:bg-red-100"
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="16"
                                          height="16"
                                          viewBox="0 0 16 16"
                                          fill="none"
                                        >
                                          <path
                                            d="M10.6667 3.99998V3.46665C10.6667 2.71991 10.6667 2.34654 10.5213 2.06133C10.3935 1.81044 10.1895 1.60647 9.93865 1.47864C9.65344 1.33331 9.28007 1.33331 8.53333 1.33331H7.46667C6.71993 1.33331 6.34656 1.33331 6.06135 1.47864C5.81046 1.60647 5.60649 1.81044 5.47866 2.06133C5.33333 2.34654 5.33333 2.71991 5.33333 3.46665V3.99998M6.66667 7.66665V11M9.33333 7.66665V11M2 3.99998H14M12.6667 3.99998V11.4666C12.6667 12.5868 12.6667 13.1468 12.4487 13.5746C12.2569 13.951 11.951 14.2569 11.5746 14.4487C11.1468 14.6666 10.5868 14.6666 9.46667 14.6666H6.53333C5.41323 14.6666 4.85318 14.6666 4.42535 14.4487C4.04903 14.2569 3.74307 13.951 3.55132 13.5746C3.33333 13.1468 3.33333 12.5868 3.33333 11.4666V3.99998"
                                            stroke="#FE4949"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                          />
                                        </svg>
                                      </button>
                                    }
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
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
      <EditItemInfoDialog
        editInfoItemTarget={editInfoItemTarget}
        handleCloseEditItemInfo={handleCloseEditItemInfo}
        openEditItemInfo={openEditItemInfo}
      />
    </div>
  );
}
