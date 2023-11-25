
'use client'
import React from "react";
import {
    DialogContent,
    DialogContentText,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";

export default function FixFailureDialog(props) {
    return(
        <>
            <Dialog
                fullWidth={true}
                open={props.openFix}
                keepMounted
                onClose={props.handleCloseFix}
                aria-describedby="alert-dialog-slide-description"
                PaperProps={{
                    style: {
                        fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189",
                    },
                }}>
                <DialogContent>
                    <DialogContentText style={{ fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189" }}>
                        <div className="flex justify-end">
                            <button onClick={props.handleCloseFix}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 14 14" fill="none">
                                    <path d="M13 1L1 13M1 1L13 13" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                        </div>
                        <div className="flex justify-center mb-5">
                            <h3 className="text-[1.1rem]">رفع خرابی</h3>
                        </div>
                        <div className="hidden md:flex md:justify-center mb-4">
                            <div className="w-full md:w-[70%] flex flex-col gap-2">
                                
                                
                                <div className="flex flex-col">
                                    <div className="mb-2">
                                        <span className="text-[0.9rem] text-gray70 ">نوع وسیله</span>
                                    </div>
                                    <div className="border border-[#D9D9D9]  flex justify-evenly px-4">
                                        <div className="p-2">
                                            <span className="text-[#29262A] text-[0.9rem]">{props.fixTarget?.machineType}</span>
                                        </div>
                                        <div className="border border-[#D9D9D9]">
                                        </div>
                                        <div className="p-2 ">
                                            <span className="text-[#29262A] text-[0.9rem]">
                                              
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
                                            <span className="text-[#29262A] text-[0.9rem]">{props.fixTarget?.driverName}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="mb-2">
                                        <span className="text-[0.9rem] text-gray70 ">از دپارتمان</span>
                                    </div>
                                    <div className="border border-[#D9D9D9]  flex justify-start px-4">
                                        <div className="p-2">
                                            <span className="text-[#29262A] text-[0.9rem]">{props.fixTarget?.sourceSubOrganizationName}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="mb-2">
                                        <span className="text-[0.9rem] text-gray70 ">تاریخ</span>
                                    </div>
                                    <div className="border border-[#D9D9D9]  flex justify-start px-4">
                                        <div className="p-2">
                                            <span className="text-[#29262A] text-[0.9rem]"><span>{props.fixTarget?.time}</span> <span className="pr-2">{props.fixTarget?.date}</span></span>
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
                                                {props.fixTarget?.status === "CONFIRMED" ? (<span className="text-[0.8rem] bg-greenBg text-greenText py-1 px-2 rounded-xl">تاييد شده</span>) : (
                                                    props.fixTarget?.status === "UNKNOWN" ? (<span className="text-[0.8rem] bg-[#EBEBEB] text-gray70 py-1 px-2 rounded-xl">نامعلوم</span>) : (
                                                        <span className="text-[0.8rem] bg-orangeBg text-orangeText py-1 px-2 rounded-xl"> خراب</span>
                                                    )
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                {
                                    props.fixTarget.description && (
                                        <div className="flex flex-col">
                                            <div className="mb-2">
                                                <span className="text-[0.9rem] text-gray70 ">توضیحات</span>
                                            </div>
                                            <div className="border border-[#D9D9D9]  flex justify-start px-4">
                                                <div className="p-2">
                                                    <span className="text-[#29262A] text-[0.9rem]">{props.fixTarget.description}</span>
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
                                       {props.fixTarget?.productName}
                                    </span>
                                </div>
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                        مقدار :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                        {props.fixTarget?.value}{props.fixTarget?.unit} 
                                    </span>
                                </div>
                                {props.fixTarget.expirationDate&&
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                        تاریخ انقضا :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                        {props.fixTarget.expirationDate}
                                    </span>
                                </div>
                                 }
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                        نوع وسیله نقلیه :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                        {props.fixTarget?.machineType}
                                    </span>
                                </div>
                                {props.fixTarget?.machineCode&&
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                        کد وسیله نقلیه :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                        {
                                            props.fixTarget?.machineTag === "" ? (props.fixTarget?.machineCode) : (
                                                props.fixTarget?.machineTag.slice(2, 5) + "-" + props.fixTarget?.machineTag.slice(5, 7) + " " + props.fixTarget?.machineTag.slice(7, 8) + " " + props.fixTarget?.machineTag.slice(0, 2)
                                            )
                                        }
                                    </span>
                                </div>
                                }
                                {props.fixTarget?.machineTag&&
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                        پلاک وسیله نقلیه :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                        {
                                            props.fixTarget?.machineTag === "" ? (props.fixTarget?.machineCode) : (
                                                props.fixTarget?.machineTag.slice(2, 5) + "-" + props.fixTarget?.machineTag.slice(5, 7) + " " + props.fixTarget?.machineTag.slice(7, 8) + " " + props.fixTarget?.machineTag.slice(0, 2)
                                            )
                                        }
                                    </span>
                                </div>
                                }
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                        راننده :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                        {props.fixTarget?.driverName}
                                    </span>
                                </div>
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                        از دپارتمان :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                        {props.fixTarget?.sourceSubOrganizationName}
                                    </span>
                                </div>
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                        تاریخ :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                    <span>{props.fixTarget?.time}</span> <span className="pr-2">{props.fixTarget?.date}</span>
                                    </span>
                                </div>
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                        وضعیت :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                        {props.fixTarget?.status === "CONFIRMED" ? (<span className="text-[0.8rem] bg-greenBg text-greenText py-1 px-2 rounded-xl">تاييد شده</span>) : (
                                            props.fixTarget?.status === "UNKNOWN" ? (<span className="text-[0.8rem] bg-[#EBEBEB] text-gray70 py-1 px-2 rounded-xl">نامعلوم</span>) : (
                                                <span className="text-[0.8rem] bg-orangeBg text-orangeText py-1 px-2 rounded-xl">خراب</span>
                                            )
                                        )}
                                    </span>
                                </div>
                                {props.fixTarget?.description&&
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                        توضیحات :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                        {props.fixTarget.description}
                                    </span>
                                </div>}
                            </div>
                        </div>
                        <div className="md:hidden flex  justify-center mt-5 gap-3">
                            <button onClick={()=>{props.handleOpenDelete(props.fixTarget.id);props.handleCloseFix()}} className="px-6 py-2 text-[0.8rem] text-mainRed border border-mainRed rounded hover:bg-mainRed hover:text-white">
                                حذف
                            </button>
                            <button onClick={()=>{props.handleOpenEditInfo(props.fixTarget);props.handleCloseFix()}}  className="px-5 py-2 text-[0.8rem] text-[#4087DB] border border-[#4087DB] rounded hover:bg-[#4087DB] hover:text-white">
                                ویرایش
                            </button>
                        </div>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </>
    )
}