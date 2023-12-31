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
                // onClose={props.handleCloseMoreInfo}
                aria-describedby="alert-dialog-slide-description"
                PaperProps={{
                    style: {
                        fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189",
                    },
                }}>
                <DialogContent>
                    <DialogContentText style={{ fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189" }}>
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
                                {
                                    props.moreInfoTarget.imageURL !== null && (
                                        <div className="flex justify-center items-center gap-4">
                                            <div>
                                                <span className="text-[0.9rem] text-gray70"> تصویر محصول :</span>
                                            </div>
                                            <div>
                                                <div className="w-20 h-20 rounded border border-dashed border-[#D9D9D9]">
                                                    <img className="object-cover w-full h-full" src={props.moreInfoTarget.imageURL} alt="uploadedImage"/>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                                <div className="flex flex-col">
                                    <div className="mb-2">
                                        <span className="text-[0.9rem] text-gray70 ">نام فارسی</span>
                                    </div>
                                    <div className="border border-[#D9D9D9]  flex justify-between px-4">
                                        <div className="p-2">
                                            <span className="text-[#29262A] text-[0.9rem]">{props.moreInfoTarget?.persianName}</span>
                                        </div>
                                    </div>
                                </div>
                                {
                                    props.moreInfoTarget.englishName && (
                                        <div className="flex flex-col">
                                            <div className="mb-2">
                                                <span className="text-[0.9rem] text-gray70 ">نام انگلیسی</span>
                                            </div>
                                            <div className="border border-[#D9D9D9]  flex justify-between px-4">
                                                <div className="p-2">
                                                    <span className="text-[#29262A] text-[0.9rem]">{props.moreInfoTarget?.englishName}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                                {
                                    props.moreInfoTarget.abbreviation && (
                                        <div className="flex flex-col">
                                            <div className="mb-2">
                                                <span className="text-[0.9rem] text-gray70 ">مخفف</span>
                                            </div>
                                            <div className="border border-[#D9D9D9]  flex justify-between px-4">
                                                <div className="p-2">
                                                    <span className="text-[#29262A] text-[0.9rem]">{props.moreInfoTarget?.abbreviation}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                                {
                                    props.moreInfoTarget.code && (
                                        <div className="flex flex-col">
                                            <div className="mb-2">
                                                <span className="text-[0.9rem] text-gray70 ">کد محصول</span>
                                            </div>
                                            <div className="border border-[#D9D9D9]  flex justify-between px-4">
                                                <div className="p-2">
                                                    <span className="text-[#29262A] text-[0.9rem]">{props.moreInfoTarget?.code}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                                <div className="flex flex-col">
                                    <div className="mb-2">
                                        <span className="text-[0.9rem] text-gray70 ">نوع محصول</span>
                                    </div>
                                    <div className="border border-[#D9D9D9]  flex justify-between px-4">
                                        <div className="p-2">
                                            <span className="text-[#29262A] text-[0.9rem]">
                                                {props.moreInfoTarget?.type === "PRIMARY" ? (<span>ماده اولیه</span>) : (
                                                    props.moreInfoTarget?.type === "EQUIPMENT" ? (<span>تجهیزات</span>) : (
                                                        props.moreInfoTarget?.type === "PRODUCED" ? (<span>تولیدی</span>) : (
                                                            <span>سایر</span>
                                                        )
                                                    )
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="mb-2">
                                        <span className="text-[0.9rem] text-gray70 ">واحد پیش فرض</span>
                                    </div>
                                    <div className="border border-[#D9D9D9]  flex justify-between px-4">
                                        <div className="p-2">
                                            <span className="text-[#29262A] text-[0.9rem]">{props.moreInfoTarget?.defaultUnit}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="mb-2">
                                        <span className="text-[0.9rem] text-gray70 ">منقضی شونده</span>
                                    </div>
                                    <div className="border border-[#D9D9D9]  flex justify-between px-4">
                                        <div className="p-2">
                                            <span className="text-[#29262A] text-[0.9rem]">
                                                {props.moreInfoTarget?.isExpirable ? (
                                                    <span>بله</span>
                                                ):(<span>خیر</span>)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="md:hidden flex justify-center">
                            <div className="w-full md:w-[70%] flex flex-col gap-3">
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                        نام فارسی :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                        {props.moreInfoTarget?.persianName}
                                    </span>
                                </div>
                                {props.moreInfoTarget?.englishName&&
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                        نام انگلیسی :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                        {props.moreInfoTarget?.englishName}
                                    </span>
                                </div>
                                }
                                {props.moreInfoTarget?.abbreviation&&
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                        مخفف :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                        {props.moreInfoTarget?.abbreviation}
                                    </span>
                                </div>
                                }
                                {props.moreInfoTarget?.code&&
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                        کدمحصول :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                        {props.moreInfoTarget?.code}
                                    </span>
                                </div>
                                }
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                        نوع محصول :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                        {props.moreInfoTarget?.type === "PRIMARY" ? (<span>ماده اولیه</span>) : (
                                            props.moreInfoTarget?.type === "EQUIPMENT" ? (<span>تجهیزات</span>) : (
                                                props.moreInfoTarget?.type === "PRODUCED" ? (<span>تولیدی</span>) : (
                                                    <span>سایر</span>
                                                )
                                            )
                                        )}
                                    </span>
                                </div>
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                        واحد پیش فرض :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                        {props.moreInfoTarget?.defaultUnit}
                                    </span>
                                </div>
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                        منقضی شونده :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                        {props.moreInfoTarget?.isExpirable ? (
                                            <span>بله</span>
                                        ):(<span>خیر</span>)}
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