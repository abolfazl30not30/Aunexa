'use client'
import React from "react";
import {
    DialogContent,
    DialogContentText,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";

export default function MoreInfoDialog(props) {
    return(
        <>
            <Dialog
                fullWidth={true}
                open={props.openMoreInfo}
                keepMounted
                onClose={props.handleCloseMoreInfo}
                aria-describedby="alert-dialog-slide-description"
                PaperProps={{
                    style: {
                        fontFamily: "IRANYekan",
                    },
                }}>
                <DialogContent>
                    <DialogContentText style={{ fontFamily: "IRANYekan" }}>
                        <div className="flex justify-end">
                            <button onClick={props.handleCloseMoreInfo}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 14 14" fill="none">
                                    <path d="M13 1L1 13M1 1L13 13" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
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
                                        <span className="text-[0.9rem] text-gray70 ">نام ماده</span>
                                    </div>
                                    <div className="border border-[#D9D9D9]  flex justify-between px-4">
                                        <div className="p-2">
                                            <span className="text-[#29262A] text-[0.9rem]">{props.moreInfoTarget?.productName}</span>
                                        </div>
                                        <div className="border border-[#D9D9D9]">
                                        </div>
                                        <div className="p-2">
                                            <span className="text-[#29262A] text-[0.9rem]">{props.moreInfoTarget?.unit} {props.moreInfoTarget?.value}</span>
                                        </div>
                                    </div>
                                </div>
                                {
                                    props.moreInfoTarget.expirationDate && (
                                        <div className="flex flex-col">
                                            <div className="mb-2">
                                                <span className="text-[0.9rem] text-gray70 ">تاریخ انقضا</span>
                                            </div>
                                            <div className="border border-[#D9D9D9]  flex justify-start px-4">
                                                <div className="p-2">
                                                    <span className="text-[#29262A] text-[0.9rem]">{props.moreInfoTarget?.expirationDate}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                                <div className="flex flex-col">
                                    <div className="mb-2">
                                        <span className="text-[0.9rem] text-gray70 ">نوع وسیله</span>
                                    </div>
                                    <div className="border border-[#D9D9D9]  flex justify-between px-4">
                                        <div className="p-2">
                                            <span className="text-[#29262A] text-[0.9rem]">{props.moreInfoTarget?.machineType}</span>
                                        </div>
                                        <div className="border border-[#D9D9D9]">
                                        </div>
                                        <div className="p-2 ">
                                            <span className="text-[#29262A] text-[0.9rem]">
                                                {
                                                    props.moreInfoTarget?.machineTag === "" ? (props.moreInfoTarget?.machineCode) : (
                                                        props.moreInfoTarget?.machineTag.slice(2, 5) + "-" + props.moreInfoTarget?.machineTag.slice(5, 7) + " " + props.moreInfoTarget?.machineTag.slice(7, 8) + " " + props.moreInfoTarget?.machineTag.slice(0, 2)
                                                    )
                                                }
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="mb-2">
                                        <span className="text-[0.9rem] text-gray70 ">نام راننده</span>
                                    </div>
                                    <div className="border border-[#D9D9D9]  flex justify-start px-4">
                                        <div className="p-2">
                                            <span className="text-[#29262A] text-[0.9rem]">{props.moreInfoTarget?.driverName}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="mb-2">
                                        <span className="text-[0.9rem] text-gray70 ">خریدار</span>
                                    </div>
                                    <div className="border border-[#D9D9D9]  flex justify-start px-4">
                                        <div className="p-2">
                                            <span className="text-[#29262A] text-[0.9rem]">{props.moreInfoTarget?.buyer}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="mb-2">
                                        <span className="text-[0.9rem] text-gray70 ">تاریخ</span>
                                    </div>
                                    <div className="border border-[#D9D9D9]  flex justify-start px-4">
                                        <div className="p-2">
                                            <span className="text-[#29262A] text-[0.9rem]">{props.moreInfoTarget?.time} {props.moreInfoTarget?.date}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="mb-2">
                                        <span className="text-[0.9rem] text-gray70 ">وضیعت</span>
                                    </div>
                                    <div className="border border-[#D9D9D9]  flex justify-start px-4">
                                        <div className="p-2">
                                            <span className="text-[#29262A] text-[0.9rem]">
                                                {props.moreInfoTarget?.status === "CONFIRMED" ? (<span className="text-[0.8rem] bg-greenBg text-greenText py-1 px-2 rounded-xl">تاييد شده</span>) : (
                                                    props.moreInfoTarget?.status === "UNKNOWN" ? (<span className="text-[0.8rem] bg-[#EBEBEB] text-gray70 py-1 px-2 rounded-xl">نامعلوم</span>) : (
                                                        <span className="text-[0.8rem] bg-orangeBg text-orangeText py-1 px-2 rounded-xl">مشکل دار</span>
                                                    )
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                {
                                    props.moreInfoTarget.description && (
                                        <div className="flex flex-col">
                                            <div className="mb-2">
                                                <span className="text-[0.9rem] text-gray70 ">توضیحات</span>
                                            </div>
                                            <div className="border border-[#D9D9D9]  flex justify-start px-4">
                                                <div className="p-2">
                                                    <span className="text-[#29262A] text-[0.9rem]">{props.moreInfoTarget.description}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                        <div className="md:hidden flex justify-center">
                            <div className="w-full md:w-[70%] flex flex-col gap-3">
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                        نام محصول :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                       {props.moreInfoTarget?.productName}
                                    </span>
                                </div>
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                        مقدار :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                        {props.moreInfoTarget?.unit} {props.moreInfoTarget?.value}
                                    </span>
                                </div>
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                        تاریخ انقضا :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                        {props.moreInfoTarget.expirationDate}
                                    </span>
                                </div>
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                        نوع وسیله نقلیه :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                        {props.moreInfoTarget?.machineType}
                                    </span>
                                </div>
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                        پلاک وسیله نقلیه :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                        {
                                            props.moreInfoTarget?.machineTag === "" ? (props.moreInfoTarget?.machineCode) : (
                                                props.moreInfoTarget?.machineTag.slice(2, 5) + "-" + props.moreInfoTarget?.machineTag.slice(5, 7) + " " + props.moreInfoTarget?.machineTag.slice(7, 8) + " " + props.moreInfoTarget?.machineTag.slice(0, 2)
                                            )
                                        }
                                    </span>
                                </div>
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                        راننده :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                        {props.moreInfoTarget?.driverName}
                                    </span>
                                </div>
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                        خریدار :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                        {props.moreInfoTarget?.buyer}
                                    </span>
                                </div>
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                        تاریخ :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                        {props.moreInfoTarget?.time} {props.moreInfoTarget?.date}
                                    </span>
                                </div>
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                        وضعیت :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                        {props.moreInfoTarget?.status === "CONFIRMED" ? (<span className="text-[0.8rem] bg-greenBg text-greenText py-1 px-2 rounded-xl">تاييد شده</span>) : (
                                            props.moreInfoTarget?.status === "UNKNOWN" ? (<span className="text-[0.8rem] bg-[#EBEBEB] text-gray70 py-1 px-2 rounded-xl">نامعلوم</span>) : (
                                                <span className="text-[0.8rem] bg-orangeBg text-orangeText py-1 px-2 rounded-xl">مشکل دار</span>
                                            )
                                        )}
                                    </span>
                                </div>
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                        توضیحات :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                        {props.moreInfoTarget.description}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="md:hidden flex  justify-center mt-5 gap-3">
                            <button onClick={()=>{props.handleOpenDelete(props.moreInfoTarget.id);props.handleCloseMoreInfo()}} className="px-6 py-2 text-[0.8rem] text-mainRed border border-mainRed rounded hover:bg-mainRed hover:text-white">
                                حذف
                            </button>
                            <button onClick={()=>{props.handleOpenEditInfo(props.moreInfoTarget);props.handleCloseMoreInfo()}}  className="px-5 py-2 text-[0.8rem] text-[#4087DB] border border-[#4087DB] rounded hover:bg-[#4087DB] hover:text-white">
                                ویرایش
                            </button>
                        </div>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </>
    )
}