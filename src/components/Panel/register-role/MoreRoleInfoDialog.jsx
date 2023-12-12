'use client'
import React from "react";
import {DialogContent, DialogContentText,} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import List from '@mui/material/List';

export default function MoreRoleInfoDialog(props) {
    const [openAccess, setOpenAccess] = React.useState(true);
    const handleClick = () => {
        setOpenAccess(!openAccess);
    };
    return (
        <>

            <Dialog
                fullWidth={true}
                open={props.openMoreRoleInfo}
                keepMounted
                // onClose={props.handleCloseMoreRoleInfo}
                aria-describedby="alert-dialog-slide-description"
                PaperProps={{
                    style: {
                        fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189",
                    },
                }}>
                <DialogContent>
                    <DialogContentText style={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}}>
                        <div className="flex justify-end">
                            <button onClick={props.handleCloseMoreRoleInfo}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 14 14"
                                     fill="none">
                                    <path d="M13 1L1 13M1 1L13 13" stroke="black" stroke-width="2"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"/>
                                </svg>
                            </button>
                        </div>
                        <div className="flex justify-center mb-5">
                            <h3 className="text-[1.1rem]">جزییات</h3>
                        </div>
                        <div className="hidden md:flex md:justify-center mb-4">
                            <div className="w-full md:w-[70%] flex flex-col gap-2">
                                <div className="flex flex-col">
                                    <div className="mb-2">
                                        <span className="text-[0.9rem] text-gray70 ">نام نقش</span>
                                    </div>
                                    <div className="border border-[#D9D9D9]  flex justify-between px-4">
                                        <div className="p-2">
                                            <span
                                                className="text-[#29262A] text-[0.9rem]">{props.moreRoleInfoTarget?.roleName}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full flex flex-col gap-2">
                                    <div className="mb-1">
                                        <span className="text-[0.9rem] text-gray70 ">درسترسی ها</span>
                                    </div>
                                    <List
                                        sx={{
                                            bgcolor: 'background.paper',
                                            border: "1px solid #D9D9D9",
                                            color: "#29262A"
                                        }}
                                        component="nav"
                                        aria-labelledby="nested-list-subheader">
                                        {
                                            props.moreRoleInfoTarget?.authorityDescription.map((auth) => (
                                                <div>
                                                    <details
                                                        className="group py-3 border-b border-b-1 border-b-solid  border-b-borderGray">
                                                        <summary
                                                            className="flex items-center justify-between gap-2 p-2 font-medium marker:content-none hover:cursor-pointer">
                                                            <span
                                                                className="text-gray9F group-open:text-textGray text-[0.9rem]">{auth.title}</span>
                                                            <svg
                                                                className="transition group-open:rotate-90"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="16"
                                                                height="16"
                                                                viewBox="0 0 16 16"
                                                                fill="none">
                                                                <path
                                                                    d="M10 4L6 8L10 12"
                                                                    stroke="#9F9F9F"
                                                                    stroke-linecap="round"
                                                                    stroke-linejoin="round"
                                                                />
                                                            </svg>
                                                        </summary>
                                                        <ul className="mr-6 flex flex-col gap-2 pr-2 list-disc">
                                                            {
                                                                auth.authorities[`${auth.title}::ReadOne`] && (
                                                                    <li>
                                                                <span
                                                                    className="text-[0.8rem] text-gray80">{auth.authorities[`${auth.title}::ReadOne`]}</span>
                                                                    </li>
                                                                )

                                                            }
                                                            {
                                                                auth.authorities[`${auth.title}::ReadAll`] && (
                                                                    <li>
                                                                <span
                                                                    className="text-[0.8rem] text-gray80">{auth.authorities[`${auth.title}::ReadAll`]}</span>
                                                                    </li>
                                                                )

                                                            }
                                                            {
                                                                auth.authorities[`${auth.title}::Create`] && (
                                                                    <li>
                                                                <span
                                                                    className="text-[0.8rem] text-gray80">{auth.authorities[`${auth.title}::Create`]}</span>
                                                                    </li>
                                                                )

                                                            }
                                                            {
                                                                auth.authorities[`${auth.title}::Update`] && (
                                                                    <li>
                                                                <span
                                                                    className="text-[0.8rem] text-gray80">{auth.authorities[`${auth.title}::Update`]}</span>
                                                                    </li>
                                                                )

                                                            }
                                                            {
                                                                auth.authorities[`${auth.title}::Delete`] && (
                                                                    <li>
                                                                <span
                                                                    className="text-[0.8rem] text-gray80">{auth.authorities[`${auth.title}::Delete`]}</span>
                                                                    </li>
                                                                )

                                                            }
                                                        </ul>
                                                    </details>
                                                </div>
                                            ))
                                        }
                                    </List>
                                </div>
                            </div>
                        </div>
                        <div className="md:hidden flex justify-center">
                            <div className="w-full md:w-[70%] flex flex-col gap-3">

                            </div>
                        </div>
                        <div className="md:hidden flex  justify-center mt-5 gap-3">
                            <button onClick={() => {
                                props.handleOpenDelete(props.moreInfoTarget.id);
                                props.handleCloseMoreInfo()
                            }}
                                    className="px-6 py-2 text-[0.8rem] text-mainRed border border-mainRed rounded hover:bg-mainRed hover:text-white">
                                حذف
                            </button>
                            <button onClick={() => {
                                props.handleOpenEditInfo(props.moreInfoTarget);
                                props.handleCloseMoreInfo()
                            }}
                                    className="px-5 py-2 text-[0.8rem] text-[#4087DB] border border-[#4087DB] rounded hover:bg-[#4087DB] hover:text-white">
                                ویرایش
                            </button>
                        </div>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </>
    )
}