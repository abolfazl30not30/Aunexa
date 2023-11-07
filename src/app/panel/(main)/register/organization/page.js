"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  FormControl,
  InputAdornment,
  Menu,
  OutlinedInput,
  Pagination,
  Skeleton,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddOrganizationDialog from "@/components/Panel/register-organization/AddOrganizationDialog";
import AddSubOrganizationDialog from "@/components/Panel/register-organization/AddSubOrganizationDialog";
import EditSubOrganizationInfoDialog from "@/components/Panel/register-organization/EditSubOrganizationInfoDialog";
import DeleteSubOrganizationDialog from "@/components/Panel/register-organization/DeleteSubOrganizationDialog";
import AddIndividualDialog from "@/components/Panel/register-organization/AddIndividualDialog";
import EditIndividualDialog from "@/components/Panel/register-organization/EditIndividualDialog";
import DeleteIndividualDialog from "@/components/Panel/register-organization/DeleteIndividualDialog";
import MoreIndividualInfoDialog from "@/components/Panel/register-organization/MoreIndividualInfoDialog";
import Link from "next/link";
import { useGetAllOrganizationQuery } from "@/redux/features/organization/OrganizationSlice";
import { useSelector } from "react-redux";

export default function registerOrganization() {
  /* search bar */
  const [filterItem, setFilterItem] = useState();
  /* search bar */

  const [expanded, setExpanded] = React.useState(false);
  const [organizationIdTarget,setOrganizationIdTarget] = useState("");

  const handleChangeIndividualList = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [openAddOrganization, setOpenAddOrganization] = useState(false);
  const handleOpenAddOrganization = () => {
    setOpenAddOrganization(true);
  };
  const handleCloseAddOrganization = () => {
    setOpenAddOrganization(false);
  };

  const [openAddSubOrganization, setOpenAddSubOrganization] = useState(false);
  const handleOpenAddSubOrganization = (id) => {
    setOrganizationIdTarget(id)
    setOpenAddSubOrganization(true);
  };
  const handleCloseAddSubOrganization = () => {
    setOpenAddSubOrganization(false);
  };

  const [openDeleteSubOrganization, setOpenDeleteSubOrganization] =
    useState(false);
  const [deleteTargetSubOrganizationId, sediveleteTargetSubOrganizationId] =
    useState("");
  const handleOpenDeleteSubOrganization = (id) => {
    sediveleteTargetSubOrganizationId(id);
    setOpenDeleteSubOrganization(true);
  };
  const handleCloseDeleteSubOrganization = () => {
    sediveleteTargetSubOrganizationId("");
    openDeleteSubOrganization(false);
  };

  const [openDeleteIndividual, setOpenDeleteIndividual] = useState(false);
  const [deleteTargetIndividualId, sediveleteTargetIndividualId] = useState("");
  const handleOpenDeleteIndividual = (id) => {
    sediveleteTargetIndividualId(id);
    setOpenDeleteIndividual(true);
  };
  const handleCloseDeleteIndividual = () => {
    sediveleteTargetIndividualId("");
    openDeleteIndividual(false);
  };

  const [openAddIndividual, setOpenAddIndividual] = useState(false);
  const handleOpenAddIndividual = () => {
    setOpenAddIndividual(true);
  };
  const handleCloseAddIndividual = () => {
    setOpenAddIndividual(false);
  };

  const [openMoreInfoIndividual, setOpenMoreInfoIndividual] = useState(false);
  const [moreInfoIndividualTarget, setMoreInfoIndividualTarget] = useState({
    fullname: "",
    nationalCode: "",
    personalCode: "",
    birthDate: "",
    fatherName: "",
    gender: "",
    role: "",
    originalPhoneNumber: "",
    anotherPhoneNumber: [],
    telePhoneNumber: "",
    eduction: "",
    email: "",
    address: "",
  });
  const handleOpenMoreInfoIndividual = (info) => {
    setMoreInfoIndividualTarget(info);
    setOpenMoreInfoIndividual(true);
  };
  const handleOpenMoreInfoIndividualRow = (info) => {
    if (window.innerWidth <= 768) {
      handleOpenMoreInfoIndividual(info);
    }
  };
  const handleCloseMoreInfoIndividual = () => {
    setMoreInfoIndividualTarget({
      fullname: "",
      nationalCode: "",
      personalCode: "",
      birthDate: "",
      fatherName: "",
      gender: "",
      role: "",
      originalPhoneNumber: "",
      anotherPhoneNumber: [],
      telePhoneNumber: "",
      eduction: "",
      email: "",
      address: "",
    });
    setOpenMoreInfoIndividual(false);
  };

  const [openEditSubOrganizationInfo, setOpenEditSubOrganizationInfo] =
    useState(false);
  const [editSubOrganizationInfoTarget, setEditSubOrganizationInfoTarget] =
    useState({
      name: "",
      capacity: "",
      unit: "",
      type: "",
    });
  const handleOpenEditSubOrganizationInfo = (info) => {
    setEditSubOrganizationInfoTarget(info);
    setOpenEditSubOrganizationInfo(true);
  };
  const handleCloseEditSubOrganizationInfo = () => {
    setEditSubOrganizationInfoTarget({
      name: "",
      capacity: "",
      unit: "",
      type: "",
    });
    setOpenEditSubOrganizationInfo(false);
  };

  const [openEditIndividualInfo, setOpenEditIndividualInfo] = useState(false);
  const [editIndividualInfoTarget, setEditIndividualInfoTarget] = useState({
    fullName: "",
    nationalCode: "",
    personalCode: "",
    birthDate: "",
    fatherName: "",
    gender: "",
    role: "",
    originalPhoneNumber: "",
    anotherPhoneNumber: [],
    telePhoneNumber: "",
    eduction: "",
    email: "",
    address: "",
  });
  const handleOpenEditIndividualInfo = (info) => {
    setEditIndividualInfoTarget(info);
    setOpenEditIndividualInfo(true);
  };
  const handleCloseEditIndividualInfo = () => {
    setEditIndividualInfoTarget({
      fullname: "",
      nationalCode: "",
      personalCode: "",
      birthDate: "",
      fatherName: "",
      gender: "",
      role: "",
      originalPhoneNumber: "",
      anotherPhoneNumber: [],
      telePhoneNumber: "",
      eduction: "",
      email: "",
      address: "",
    });
    setOpenEditIndividualInfo(false);
  };

  const [
    openEditIndividualRelationshipInfo,
    setOpenEditIndividualRelationshipInfo,
  ] = useState(false);
  const [
    editIndividualRelationshipInfoTarget,
    setEditIndividualRelationshipInfoTarget,
  ] = useState({
    fullname: "",
    phoneNumber: "",
    relationship: "",
    address: "",
  });
  const handleOpenEditIndividualRelationshipInfo = (info) => {
    setEditIndividualRelationshipInfoTarget(info);
    setOpenEditIndividualRelationshipInfo(true);
  };
  const handleCloseEditIndividualRelationshipInfo = () => {
    setEditIndividualRelationshipInfoTarget({
      fullname: "",
      phoneNumber: "",
      relationship: "",
      address: "",
    });
    setOpenEditIndividualRelationshipInfo(false);
  };
  const [filter, setFilter] = useState("organization");
  const [anchorElFilter, setAnchorElFilter] = useState(null);
  const openFilter = Boolean(anchorElFilter);
  const handleOpenFilterSearchBarMenu = (event) => {
    setAnchorElFilter(event.currentTarget);
  };
  const handleCloseFilterMenu = () => {
    setAnchorElFilter(null);
  };
  const {
    data: organizationList = [],
    isLoading: isDataLoading,
    isError: isDataError,
  } = useGetAllOrganizationQuery(
    { filterItem, filter },
    { refetchOnMountOrArgChange: true }
  );

  const [
    moreInfoIndividualRelationshipTarget,
    setMoreInfoIndividualRelationshipTarget,
  ] = useState({
    fullname: "",
    PhoneNumber: "",
    relationship: "",
    address: "",
  });
  const [openAddIndividualRelationship, setOpenAddIndividualRelationship] =
    useState(false);
  const handleOpenAddIndividualRelationship = () => {
    setOpenAddIndividualRelationship(true);
  };
  const handleCloseAddIndividualRelationship = () => {
    setOpenAddIndividualRelationship(false);
  };

  return (
    <div>
      <header className="flex justify-between items-center text-[0.9rem] bg-white py-6 px-10">
        <div className="">
          <h2 className="font-[800] text-[0.9rem] md:text-[1.1rem]">
            ثبت سازمان
          </h2>
        </div>
        <div className="w-[70%] md:w-[50%] flex ">
          <div className="grow">
            <FormControl fullWidth>
              <OutlinedInput
                onKeyUp={(event) => {
                  setFilterItem(event.target.value);
                }}
                className=""
                size="small"
                sx={{
                  py: "0.2rem",
                  borderRadius: 0,
                }}
                placeholder="جست و جو"
                id="outlined-adornment-amount"
                inputProps={{
                  style: { fontFamily: "IRANYekan", fontSize: "0.9rem" },
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
          <div className="grow">
            <div>
              <button
                onClick={handleOpenFilterSearchBarMenu}
                className="flex items-center gap-2 text-[0.9rem] text-gray9F border border-1 border-solid border-borderGray  border-r-0 px-2 md:px-4 py-[0.8rem] md:py-[0.63rem]"
              >
                <span className="hidden md:inline">براساس</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M4 6L8 10L12 6"
                    stroke="#9F9F9F"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
              <Menu
                anchorEl={anchorElFilter}
                id="account-menu"
                open={openFilter}
                onClose={handleCloseFilterMenu}
                onClick={handleCloseFilterMenu}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    width: "10rem",
                    bgcolor: "#fff",
                    borderRadius: "0.5rem",
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 3px rgba(0,0,0,0.1))",
                    mt: 1.5,
                    fontFamily: "IRANYekan",
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
                  <div className="">
                    <button
                      onClick={() => {
                        setFilter("organization");
                      }}
                      className="w-full flex justify-center gap-2 py-3 px-2 hover:bg-neutral-100"
                    >
                      <span className="text-gray70 text-[0.8rem]  tracking-tighter">
                        سازمان
                      </span>
                    </button>
                    <button
                      onClick={() => {
                        setFilter("subOrganization");
                      }}
                      className="w-full flex justify-center gap-2 py-3 px-2 hover:bg-neutral-100 border-t border-t-[#D9D9D9]"
                    >
                      <span className="text-gray70 text-[0.8rem]  tracking-tighter">
                        دپارتمان
                      </span>
                    </button>
                    <button
                      onClick={() => setFilter("individual")}
                      className="w-full flex justify-center gap-2 py-3 px-2 hover:bg-neutral-100 border-t border-t-[#D9D9D9]"
                    >
                      <span className="text-gray70 text-[0.8rem]  tracking-tighter">
                        افراد
                      </span>
                    </button>
                  </div>
                </div>
              </Menu>
            </div>
          </div>
        </div>
        <div className="">
          {
            <button
              className="flex bg-mainRed text-white items-center text- px-3 py-2 rounded-full md:rounded"
              onClick={handleOpenAddOrganization}
            >
              <span className="hidden md:inline">ثبت سازمان</span>
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
      {organizationList?.map((organization) => (
        <div>
          <div className="flex justify-between items-center text-[0.9rem] bg-white py-6 mt-8 px-10">
              <div className="">
                <h2 className="font-[800] text-[0.9rem] md:text-[1.1rem]">
                  {organization.name}
                </h2>
              </div>
              <div className="">
                {
                  <button
                    className="flex text-mainRed bg-white border border-mainRed items-center text- px-3 py-2 rounded-full md:rounded"
                    onClick={()=>{handleOpenAddSubOrganization(organization.id)}}
                  >
                    <span className="hidden md:inline">ثبت دپارتمان</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M7 12H17" stroke="#DB3746" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M12 7V17" stroke="#DB3746" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </button>
                }
              </div>
          </div>
          <div className="">
            <div className="overflow-x-auto">
              <table className=" w-full table-auto overflow-scroll border-collapse border-spacing-0 text-sm text-center text-gray70  ">
                <tbody className="table-body">
                  {isDataLoading
                    ? [...Array(6)].map(() => (
                        <tr className="border-b">
                          <div className="hidden md:table-cell px-6 py-4  text-gray70 whitespace-nowrap ">
                            <Skeleton
                              variant="text"
                              sx={{ fontSize: "1rem" }}
                            />
                          </div>
                          <div className="px-2 md:px-6 py-4  text-gray70 whitespace-nowrap ">
                            <Skeleton
                              variant="text"
                              sx={{ fontSize: "1rem" }}
                            />
                          </div>
                          <div className="px-2 md:px-6 py-4  text-gray70 whitespace-nowrap ">
                            <Skeleton
                              variant="text"
                              sx={{ fontSize: "1rem" }}
                            />
                          </div>
                          <div className="px-2 md:px-6 py-2  text-gray70 whitespace-nowrap ">
                            <Skeleton
                              variant="text"
                              sx={{ fontSize: "1rem" }}
                            />
                          </div>
                          <div className="hidden md:table-cell px-6 py-4  text-gray70 whitespace-nowrap ">
                            <Skeleton
                              variant="text"
                              sx={{ fontSize: "1rem" }}
                            />
                          </div>
                          <div
                            scope="row"
                            className="hidden md:flex gap-2 px-6 py-4 justify-center text-gray70 whitespace-nowrap "
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
                            <Skeleton
                              variant="rounded"
                              width={23}
                              height={23}
                            />
                          </div>
                        </tr>
                      ))
                    : organization.subOrganizations?.map(
                        (subOrganization, index) => (
                          <Accordion
                            expanded={expanded === "panel"}
                            onChange={handleChangeIndividualList("panel")}>
                            <AccordionSummary
                              aria-controls="panelbh-content"
                              id="panelbh-header">
                              <div className="flex justify-between items-center border-b">
                                <div className="hidden md:table-cell px-6 py-4  text-gray70 whitespace-nowrap ">
                                    {index + 1}
                                </div>
                                <div className="px-2 md:px-6 py-4 flex gap-2 text-gray70 whitespace-nowrap ">
                                    <span>: اسم دپارتمان</span>
                                    s<span>{subOrganization.name}</span>
                                </div>
                                <div className="px-2 md:px-6 py-4  text-gray70 whitespace-nowrap ">
                                    <span>:ظرفیت</span>
                                    <span>{subOrganization.capacity}</span>
                                </div>

                                <div className="hidden md:table-cell px-6 py-4  text-gray70 whitespace-nowrap ">
                                    <span>:واحد</span>
                                    <span>{subOrganization.unit}</span>
                                </div>
                                <div className="hidden md:table-cell px-6 py-4  text-gray70 whitespace-nowrap ">
                                    <span>:نوع</span>
                                    <span>{subOrganization.type}</span>
                                </div>
                                <div className="hidden md:table-cell px-6 py-4   whitespace-nowrap ">
                                    <div>
                                      <button
                                        className="flex text-gray60 bg-white border border-gray60 items-center text- px-3 py-2 rounded-full md:rounded"
                                        onClick={handleOpenAddIndividual}
                                      >
                                        <span className="hidden md:inline text-gray9F">
                                          ثبت افراد
                                        </span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                          <path d="M7 12H17" stroke="#9F9F9F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                          <path d="M12 7V17" stroke="#9F9F9F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                      </button>
                                    </div>
                                </div>
                                <div
                                  scope="row"
                                  className="hidden md:flex gap-2 px-6 py-4 justify-center text-gray70 whitespace-nowrap "
                                >
                                  <button
                                    onClick={() => {
                                      handleOpenEditSubOrganizationInfo(
                                        subOrganization
                                      );
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
                                  <button
                                    onClick={() => {
                                      handleOpenDeleteSubOrganization(
                                        subOrganization.id
                                      );
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

                                  <button
                                    onClick={() => {
                                      handleChangeIndividualList("panel");
                                    }}
                                    className="border border-1 border-solid border-[#797979] rounded p-[0.4rem] hover:bg-red-100"
                                  >
                                    <svg
                                      className={
                                        expanded === "panel"
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
                                </div>
                              </div>
                            </AccordionSummary>
                            <AccordionDetails>
                              {subOrganization.individual?.map((individual) => (
                                <div className="mt-10">
                                  <div className="overflow-x-auto">
                                    <table className=" w-full table-auto overflow-scroll border-collapse border-spacing-0 text-sm text-center text-gray70  ">
                                      <tbody className="table-body">
                                        <tr
                                          onClick={() => {
                                            handleOpenMoreInfoIndividualRow(
                                              individual
                                            );
                                          }}
                                          className="table-row border-b"
                                        >
                                          <Typography className="flex gap-2 items-center">
                                            <span>نام و نام خانوادگی :</span>
                                            {individual.fullname}
                                          </Typography>
                                          <Typography className="flex gap-2 items-center">
                                            <span> کد ملی:</span>
                                            {individual.nationalCode}
                                          </Typography>
                                          <Typography className="flex gap-2 items-center">
                                            <span>نقش:</span>
                                            {individual.role}
                                          </Typography>
                                            <div
                                              className="hidden md:flex gap-2 px-6 py-4 justify-center text-gray70 whitespace-nowrap ">
                                              <button
                                                onClick={() => {
                                                  handleOpenMoreInfoIndividual(
                                                    individual
                                                  );
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
                                              {
                                                <button
                                                  onClick={() => {
                                                    handleOpenEditIndividualInfo(
                                                      individual
                                                    );
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
                                              }
                                              {
                                                <button
                                                  onClick={() => {
                                                    handleOpenDeleteIndividual(
                                                      individual.id
                                                    );
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
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              ))}
                            </AccordionDetails>
                          </Accordion>
                        )
                      )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ))}
      <AddOrganizationDialog
        handleCloseAddOrganization={handleCloseAddOrganization}
        openAddOrganization={openAddOrganization}
      />
      <AddSubOrganizationDialog
          organizationIdTarget={organizationIdTarget}
        handleCloseAddSubOrganization={handleCloseAddSubOrganization}
        openAddSubOrganization={openAddSubOrganization}
      />
      <AddIndividualDialog
        handleOpenAddIndividualRelationship={
          handleOpenAddIndividualRelationship
        }
        handleCloseAddIndividualRelationship={
          handleCloseAddIndividualRelationship
        }
        handleCloseAddIndividual={handleCloseAddIndividual}
        openAddIndividual={openAddIndividual}
        openAddIndividualRelationship={openAddIndividualRelationship}
      />
      <DeleteSubOrganizationDialog
        deleteTargetSubOrganizationId={deleteTargetSubOrganizationId}
        openDeleteSubOrganization={openDeleteSubOrganization}
        handleCloseDeleteSubOrganization={handleCloseDeleteSubOrganization}
      />
      <DeleteIndividualDialog
        deleteTargetIndividualId={deleteTargetIndividualId}
        openDeleteIndividual={openDeleteIndividual}
        handleCloseDeleteIndividual={handleCloseDeleteIndividual}
      />
      <EditSubOrganizationInfoDialog
        editSubOrganizationInfoTarget={editSubOrganizationInfoTarget}
        handleCloseEditSubOrganizationInfo={handleCloseEditSubOrganizationInfo}
        openEditSubOrganizationInfo={openEditSubOrganizationInfo}
      />
      <EditIndividualDialog
        editIndividualInfoTarget={editIndividualInfoTarget}
        handleCloseEditIndividualInfo={handleCloseEditIndividualInfo}
        openEditIndividualInfo={openEditIndividualInfo}
        handleOpenEditIndividualRelationshipInfo={
          editIndividualRelationshipInfoTarget
        }
        editIndividualRelationshipInfoTarget={
          editIndividualRelationshipInfoTarget
        }
        handleCloseEditIndividualRelationshipInfo={
          handleCloseEditIndividualRelationshipInfo
        }
        openEditIndividualRelationshipInfo={openEditIndividualRelationshipInfo}
      />
      <MoreIndividualInfoDialog
        handleOpenDeleteIndividual={handleOpenDeleteIndividual}
        handleOpenEditIndividualInfo={handleOpenEditIndividualInfo}
        moreInfoIndividualTarget={moreInfoIndividualTarget}
        openMoreInfoIndividual={openMoreInfoIndividual}
        handleCloseMoreInfoIndividual={handleCloseMoreInfoIndividual}
        moreInfoIndividualRelationshipTarget={
          moreInfoIndividualRelationshipTarget
        }
      />
    </div>
  );
}
