'use client'
import React from "react";
import { useState } from "react";
import {
    DialogContent,
    DialogContentText,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { useLazyDownloadFileMinioQuery } from "@/redux/features/file/FileSlice";
export default function MoreInfoDialog(props) {
    const [name,setName]=useState("")

    const handleImageName= async (e)=>{
        const res = await getDownload(props.moreInfoTarget?.receiptFile)
        console.log(res.data.fileUrl)
        const link = document.createElement('a');
        link.download = "file";
        link.href = res.data.fileUrl;
        link.click();
     }

     const [getDownload,{ data : downLoadURL  = [] , isLoading : isDownloadLoading, isError: downloadIsError }] = useLazyDownloadFileMinioQuery(name)
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
                               
                             
                                <div className="flex flex-col">
                                    <div className="mb-2">
                                        <span className="text-[0.9rem] text-gray70 "> شماره فاکتور  </span>
                                    </div>
                                    <div className="border border-[#D9D9D9]   px-4">
                                        <div className="p-2">
                                            <span className="text-[#29262A] text-[0.9rem]">{props.moreInfoTarget?.receiptCode}</span>
                                        </div>
                                        
                                       
                                    </div>
                                </div>
                                <div >
                                    <div >
                                    <div className="mb-2">
                                        <span className="text-[0.9rem] text-gray70 "> تاریخ فروش </span>
                                    </div>
                                    <div className="border border-[#D9D9D9]   px-4">
                                        <div className="p-2">
                                            <span className="text-[#29262A] text-[0.9rem]"><span>{props.moreInfoTarget?.salesDate}</span><span className="pl-2">{props.moreInfoTarget?.salesTime}</span></span>
                                        </div>
                                        
                                       
                                    </div>
                                    </div>
                                    
                                </div>
                                <div >
                                   <div  >
                                   <div className="mb-2">
                                        <span className="text-[0.9rem] text-gray70 ">  دپارتمان </span>
                                    </div>
                                    <div className="border border-[#D9D9D9]   px-4">
                                        <div className="p-2">
                                            <span className="text-[#29262A] text-[0.9rem]">{props.moreInfoTarget?.subOrganizationInfo?.subOrganizationName}</span>
                                        </div>
                                    </div>
                                   </div>
                                   
                                </div>
                                <div className="flex flex-col">
                                    <div className="mb-2">
                                        <span className="text-[0.9rem] text-gray70 ">  مشتری </span>
                                    </div>
                                    <div className="border border-[#D9D9D9]  flex justify-start px-4">
                                        <div className="p-2">
                                            <span className="text-[#29262A] text-[0.9rem]">{props.moreInfoTarget?.customer}</span>
                                        </div>
                                    </div>
                                </div>
                                
                                {props.moreInfoTarget?.failureReason?.description?(<div className="flex flex-col">
                                    <div className="mb-2">
                                        <span className="text-[0.9rem] text-gray70 "> توضیحات </span>
                                    </div>
                                    <div className="border border-[#D9D9D9]  flex justify-start px-4">
                                        <div className="p-2">
                                            <span className="text-[#29262A] text-[0.9rem]">{props.moreInfoTarget?.failureReason?.description}</span>
                                        </div>
                                    </div>
                                </div>):null}
                                {props.moreInfoTarget?.receiptFile && <div className="mb-2">
                                        
                                    
                                        <div className="border border-[#D9D9D9]  flex justify-center px-4">
                                            <button onClick={(e)=>{handleImageName(e)}}  className="p-2">
                                                <span className="text-[#29262A] text-[0.9rem]">دانلود فاکتور</span>
                                            </button>
                                        </div>
                                    </div>}
                               
                            </div>
                        </div>
                        <div className="md:hidden flex justify-center">
                            <div className="w-full md:w-[70%] flex flex-col gap-3 ">
                                
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                         شماره فاکتور :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                    {props.moreInfoTarget?.receiptCode}
                                    </span>
                                </div>
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                         تاریخ فروش :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                    {props.moreInfoTarget?.salesDate}
                                    </span>
                                </div>
                              
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                          دپارتمان :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                    {props.moreInfoTarget?.subOrganizationInfo?.subOrganizationName}
                                    </span>
                                </div>
                                
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                          مشتری :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                        {props.moreInfoTarget?.customer}
                                    </span>
                                </div>
                               
                                {props.moreInfoTarget?.failureReason?.description?(<div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                        توضیحات :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                        {props.moreInfoTarget?.failureReason?.description}
                                    </span>
                                </div>):null}
                                {props.moreInfoTarget?.receiptFile &&<div>
                                    <button  onClick={(e)=>{handleImageName(e)}}  className="ml-1 text-gray9F text-[0.8rem]">
                                         دانلود فاکتور
                                    </button>
                                   
                                </div>}
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