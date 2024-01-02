"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRef } from "react";
import AddDataDialog from "@/components/Dashboard/tracking/AddDataDialog";
const ReportMap = dynamic(
  () => import("../../../../components/Dashboard/reports/ReportMap"),
  { ssr: false }
);

export default function page() {
  // let permission = useSelector(
  //   (state) => state.access?.pages?.primaryStoreInput
  // );
  // const [page, setPage] = useState(1);
  // const [sort, setSort] = useState("desc");
  // const [anchorElSort, setAnchorElSort] = useState(null);
  // const openSort = Boolean(anchorElSort);
  // const handleOpenSortMenu = (event) => {
  //   setAnchorElSort(event.currentTarget);
  // };
  // const handleCloseSortMenu = () => {
  //   setAnchorElSort(null);
  // };
  // const [openFilter, setOpenFilter] = useState(false);

  // const [paymentList, setPaymentList] = useState([]);

  // const {
  //   data: inventoryData = [],
  //   isLoading: isDataLoading,
  //   isError: isDataError,
  // } = useGetAllSalesListQuery(
  //   { page, sort, filterItem },
  //   { refetchOnMountOrArgChange: true }
  // );

  // const handlePagination = (event, value) => {
  //   setPage(value);
  // };
  // const handleOpenFilter = () => {
  //   setOpenFilter(true);
  // };
  // const handleCloseFilter = () => {
  //   setOpenFilter(false);
  // };
  // const [openRegisterFactor, setOpenRegisterFactor] = useState(false);
  // const handleOpenRegisterFactor = () => {
  //   setOpenRegisterFactor(true);
  // };
  // const handleCloseRegisterFactor = () => {
  //   setOpenRegisterFactor(false);
  // };
  // const [openDelete, setOpenDelete] = useState(false);
  // const [deleteTargetId, setDeleteTargetId] = useState("");

  // const [openMoreInfo, setOpenMoreInfo] = useState(false);
  // const [moreInfoTarget, setMoreInfoTarget] = useState({
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
  // const handleOpenMoreInfo = (info) => {
  //   setMoreInfoTarget(info);
  //   setOpenMoreInfo(true);
  // };

  // const handleCloseMoreInfo = () => {
  //   setMoreInfoTarget({
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
  //   setOpenMoreInfo(false);
  // };
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

  // const handleOpenMoreInfoRow = (info) => {
  //   if (window.innerWidth <= 768) {
  //     handleOpenMoreInfo(info);
  //   }
  // };
  // const [searchValue, setSearchValue] = useState("");
  // const [filterType, setFilterType] = useState("receiptCode");

  // const handleSearchBox = (e) => {
  //   setSearchValue(e.target.value);
  //   let params = new URLSearchParams();
  //   params.set(filterType, e.target.value);
  //   setFilterItem(params.toString());
  // };

  // const [expanded, setExpanded] = React.useState(false);
  // const handleChangeInvoiceList = (panel) => (event, isExpanded) => {
  //   setExpanded(isExpanded ? panel : false);
  // };
  const [openAddData, setOpenAddData] = useState(false);
  const handleOpenAddData = () => {
    setOpenAddData(true);
  };
  const handleCloseAddData = () => {
    setOpenAddData(false);
  };
  const [filterItem, setFilterItem] = useState("");
  const scrollbars = useRef(null);
  const renderView = ({ style, ...reset }) => {
    const customStyle = {
      marginLeft: "-19px",
      left: "2px",
      overflowX: "hidden",
    };
    return <div {...reset} style={{ ...style, ...customStyle }} />;
  };
  const renderThumbHorizontal = ({ style, ...reset }) => {
    const thumbStyle = {
      borderRadius: 6,
      backgroundColor: "#F1F2F6",
    };
    return <div style={{ ...style, ...thumbStyle }} {...reset} />;
  };
  const renderThumbVertical = ({ style, ...reset }) => {
    const thumbStyle = {
      borderRadius: 6,
      backgroundColor: "#d9d9d9",
      left: "2px",
    };
    return <div style={{ ...style, ...thumbStyle }} {...reset} />;
  };

  const renderTrackVertical = () => {
    const thumbStyle = {
      position: "absolute",
      width: "6px",
      transition: "opacity 200ms ease 0s",
      opacity: 0,
      left: "6px",
      bottom: "2px",
      top: "2px",
      borderRadius: "3px",
    };
    return <div style={thumbStyle} />;
  };

  return (
    <div>
      <header className="flex justify-between items-center text-[0.9rem] bg-white py-6 px-5 md:px-10">
        <div className="">
          <h2 className="font-[800] text-[0.9rem] md:text-[1.1rem]">ردیابی</h2>
        </div>
        {/*<div className="">*/}
        {/*  <button*/}
        {/*    className="flex  text-white items-center bg-mainRed border px-3 py-2 rounded-full md:rounded"*/}
        {/*    onClick={handleOpenRegisterFactor}*/}
        {/*  >*/}
        {/*    <span className="hidden md:inline">گزارش جدید</span>*/}
        {/*    <svg*/}
        {/*      xmlns="http://www.w3.org/2000/svg"*/}
        {/*      width="24"*/}
        {/*      height="24"*/}
        {/*      viewBox="0 0 24 24"*/}
        {/*      fill="none"*/}
        {/*    >*/}
        {/*      <path*/}
        {/*        d="M7 12H17"*/}
        {/*        stroke="#fff"*/}
        {/*        stroke-width="2"*/}
        {/*        stroke-linecap="round"*/}
        {/*        stroke-linejoin="round"*/}
        {/*      />*/}
        {/*      <path*/}
        {/*        d="M12 7V17"*/}
        {/*        stroke="#fff"*/}
        {/*        stroke-width="2"*/}
        {/*        stroke-linecap="round"*/}
        {/*        stroke-linejoin="round"*/}
        {/*      />*/}
        {/*    </svg>*/}
        {/*  </button>*/}
        {/*</div>*/}
      </header>
      <section className="py-2 mt-4 md:px-8  bg-white h-[50rem]">
        <div className="mt-5 px-2 flex  justify-end">
          <div className="flex gap-3">
            <button
              className="flex  text-white items-center bg-mainRed border px-3 py-2 rounded-full md:rounded"
              onClick={handleOpenAddData}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="23"
                height="23"
                viewBox="0 0 30 30"
                fill="none"
              >
                <path
                  d="M23.4375 26.25H17.6414C18.6151 25.3806 19.5333 24.4511 20.3906 23.4668C23.6074 19.7672 25.3125 15.8672 25.3125 12.1875C25.3125 9.45246 24.226 6.82943 22.292 4.89546C20.3581 2.96149 17.735 1.875 15 1.875C12.265 1.875 9.64193 2.96149 7.70796 4.89546C5.77399 6.82943 4.6875 9.45246 4.6875 12.1875C4.6875 15.8672 6.38789 19.7672 9.60938 23.4668C10.4667 24.4511 11.3849 25.3806 12.3586 26.25H6.5625C6.31386 26.25 6.0754 26.3488 5.89959 26.5246C5.72377 26.7004 5.625 26.9389 5.625 27.1875C5.625 27.4361 5.72377 27.6746 5.89959 27.8504C6.0754 28.0262 6.31386 28.125 6.5625 28.125H23.4375C23.6861 28.125 23.9246 28.0262 24.1004 27.8504C24.2762 27.6746 24.375 27.4361 24.375 27.1875C24.375 26.9389 24.2762 26.7004 24.1004 26.5246C23.9246 26.3488 23.6861 26.25 23.4375 26.25ZM6.5625 12.1875C6.5625 9.94974 7.45145 7.80362 9.03379 6.22129C10.6161 4.63895 12.7622 3.75 15 3.75C17.2378 3.75 19.3839 4.63895 20.9662 6.22129C22.5486 7.80362 23.4375 9.94974 23.4375 12.1875C23.4375 18.8941 16.9371 24.4922 15 26.0156C13.0629 24.4922 6.5625 18.8941 6.5625 12.1875ZM19.6875 12.1875C19.6875 11.2604 19.4126 10.3541 18.8975 9.58326C18.3824 8.81241 17.6504 8.2116 16.7938 7.85681C15.9373 7.50203 14.9948 7.4092 14.0855 7.59007C13.1762 7.77094 12.341 8.21738 11.6854 8.87294C11.0299 9.5285 10.5834 10.3637 10.4026 11.273C10.2217 12.1823 10.3145 13.1248 10.6693 13.9813C11.0241 14.8379 11.6249 15.5699 12.3958 16.085C13.1666 16.6001 14.0729 16.875 15 16.875C16.2432 16.875 17.4355 16.3811 18.3146 15.5021C19.1936 14.623 19.6875 13.4307 19.6875 12.1875ZM12.1875 12.1875C12.1875 11.6312 12.3525 11.0875 12.6615 10.625C12.9705 10.1624 13.4098 9.80196 13.9237 9.58909C14.4376 9.37622 15.0031 9.32052 15.5487 9.42904C16.0943 9.53756 16.5954 9.80543 16.9887 10.1988C17.3821 10.5921 17.6499 11.0932 17.7585 11.6388C17.867 12.1844 17.8113 12.7499 17.5984 13.2638C17.3855 13.7777 17.0251 14.217 16.5625 14.526C16.1 14.835 15.5563 15 15 15C14.2541 15 13.5387 14.7037 13.0113 14.1762C12.4838 13.6488 12.1875 12.9334 12.1875 12.1875Z"
                  fill="#fff"
                />
              </svg>
              <span className="mr-2 hidden md:inline">انتخاب محرک</span>
            </button>
          </div>
        </div>
        <div className="mt-10">
          <div>
            <ReportMap />
          </div>
        </div>
      </section>
      <AddDataDialog
        handleCloseAddData={handleCloseAddData}
        openAddData={openAddData}
      />
      {/* <FilterDialog
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
      /> */}
      {/* <DeleteDialog
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
      /> */}
    </div>
  );
}
