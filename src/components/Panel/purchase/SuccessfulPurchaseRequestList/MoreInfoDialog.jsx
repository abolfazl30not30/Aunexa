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
                                <div>
                                {
                                    props.moreInfoTarget?.paymentItems?.bill?.billCycle?.productImage !== "" && (
                                        <div className="flex justify-center items-center gap-4">
                                            <div>
                                                <span className="text-[0.9rem] text-gray70"> تصویر محصول :</span>
                                            </div>
                                            <div>
                                                <div className="w-20 h-20 rounded border border-dashed border-[#D9D9D9]">
                                                    <img className="object-cover w-full h-full" src={props.moreInfoTarget?.paymentItems?.bill?.billCycle?.productImage} alt="product image"/>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                                </div>
                                <div className="flex flex-col">
                                    <div className="mb-2">
                                        <span className="text-[0.9rem] text-gray70 "> محصول</span>
                                    </div>
                                    <div className="border border-[#D9D9D9]  flex justify-evenly px-4">
                                        <div className="p-2">
                                            <span className="text-[#29262A] text-[0.9rem]">{props.moreInfoTarget?.paymentItems?.bill?.billCycle?.productName}</span>
                                        </div>
                                        <div className="border border-[#D9D9D9]">
                                        </div>
                                        <div className="p-2">
                                            <span className="text-[#29262A] text-[0.9rem]">{props.moreInfoTarget?.paymentItems?.quantity?.value}{props.moreInfoTarget?.paymentItems?.quantity?.unit} </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between gap-2 items-center">
                                    <div className="w-[45%]">
                                    <div className="mb-2">
                                        <span className="text-[0.9rem] text-gray70 "> کد درخواست </span>
                                    </div>
                                    <div className="border border-[#D9D9D9]   px-4">
                                        <div className="p-2">
                                            <span className="text-[#29262A] text-[0.9rem]">{props.moreInfoTarget?.paymentItems?.bill?.billCycle?.code}</span>
                                        </div>
                                        
                                       
                                    </div>
                                    </div>
                                    <div className="w-[45%]">
                                    <div className="mb-2">
                                        <span className="text-[0.9rem] text-gray70 "> تاریخ درخواست </span>
                                    </div>
                                    <div className="border border-[#D9D9D9]   px-4">
                                        <div className="p-2">
                                            <span className="text-[#29262A] text-[0.9rem]">{props.moreInfoTarget?.paymentItems?.bill?.billCycle?.requestDate}</span>
                                        </div>
                                        
                                       
                                    </div>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center gap-2">
                                    
                                    <div className="w-[45%]">
                                    <div className="mb-2">
                                        <span className="text-[0.9rem] text-gray70 "> تاریخ تایید </span>
                                    </div>
                                    <div className="border border-[#D9D9D9]   px-4">
                                        <div className="p-2">
                                            <span className="text-[#29262A] text-[0.9rem]">{props.moreInfoTarget?.paymentItems?.bill?.billCycle?.confirmationDate}</span>
                                        </div>
                                        
                                       
                                    </div>
                                    </div>
                                    <div className="w-[45%]">
                                    <div className="mb-2">
                                        <span className="text-[0.9rem] text-gray70 "> تاریخ خرید </span>
                                    </div>
                                    <div className="border border-[#D9D9D9]   px-4">
                                        <div className="p-2">
                                            <span className="text-[#29262A] text-[0.9rem]">{props.moreInfoTarget?.purchaseDate}</span>
                                        </div>
                                        
                                       
                                    </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 justify-between">
                                   <div className="w-[45%]">
                                   <div className="mb-2">
                                        <span className="text-[0.9rem] text-gray70 ">  دپارتمان </span>
                                    </div>
                                    <div className="border border-[#D9D9D9]   px-4">
                                        <div className="p-2">
                                            <span className="text-[#29262A] text-[0.9rem]">{props.moreInfoTarget?.paymentItems?.bill?.billCycle?.subOrganizationName}</span>
                                        </div>
                                        
                                       
                                    </div>
                                   </div>
                                   <div className="w-[45%]">
                                   <div className="mb-2">
                                        <span className="text-[0.9rem] text-gray70 "> وضعیت فاکتور </span>
                                    </div>
                                    <div className="border border-[#D9D9D9]  flex justify-start px-4">
                                        <div className="p-2">
                                            <span className="text-[#29262A] text-[0.9rem]">
                                                {props.moreInfoTarget?.status==="IN_PROGRESS" ? (
                                                    <div className="flex items-center gap-2">
                                                       
                                                        <span>در انتظار تایید</span>
                                                    </div>
                                                ):props.moreInfoTarget?.status==="FAIL" ?(
                                                    <div className="flex items-center gap-2">
                                                        
                                                        <span>رد شده</span>
                                                    </div>
                                                ):props.moreInfoTarget?.status==="DONE" ?(
                                                    <span>
                                                        تایید شده
                                                    </span>

                                                ):null}
                                            </span>
                                        </div>
                                    </div>
                                   </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="mb-2">
                                        <span className="text-[0.9rem] text-gray70 ">نام درخواست دهنده</span>
                                    </div>
                                    <div className="border border-[#D9D9D9]  flex justify-start px-4">
                                        <div className="p-2">
                                            <span className="text-[#29262A] text-[0.9rem]">{props.moreInfoTarget?.paymentItems?.bill?.billCycle?.registrar}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="mb-2">
                                        <span className="text-[0.9rem] text-gray70 ">نام تایید کننده درخواست </span>
                                    </div>
                                    <div className="border border-[#D9D9D9]  flex justify-start px-4">
                                        <div className="p-2">
                                            <span className="text-[#29262A] text-[0.9rem]">{props.moreInfoTarget?.paymentItems?.bill?.confirmerName}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="mb-2">
                                        <span className="text-[0.9rem] text-gray70 ">نام خریدار  </span>
                                    </div>
                                    <div className="border border-[#D9D9D9]  flex justify-start px-4">
                                        <div className="p-2">
                                            <span className="text-[#29262A] text-[0.9rem]">{props.moreInfoTarget?.buyerName}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="mb-2">
                                        <span className="text-[0.9rem] text-gray70 ">شیوه پرداخت  </span>
                                    </div>
                                    <div className="border border-[#D9D9D9]  flex justify-start px-4">
                                        <div className="p-2">
                                            <span className="text-[#29262A] text-[0.9rem]">{props.moreInfoTarget?.paymentItems?.paymentMethod}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="mb-2">
                                        <span className="text-[0.9rem] text-gray70 ">   توضیحات </span>
                                    </div>
                                    <div className="border border-[#D9D9D9]  flex justify-start px-4">
                                        <div className="p-2">
                                            <span className="text-[#29262A] text-[0.9rem]">{props.moreInfoTarget?.paymentItems?.bill?.billCycle?.description}</span>
                                        </div>
                                    </div>
                                </div>
                                {
                                    props.moreInfoTarget?.status==="FAIL" ?(<div className="flex flex-col">
                                    <div className="mb-2">
                                        <span className="text-[0.9rem] text-gray70 ">   دلیل رد </span>
                                    </div>
                                    <div className="border border-[#D9D9D9]  flex justify-start px-4">
                                        <div className="p-2">
                                            <span className="text-[#29262A] text-[0.9rem]">{props.moreInfoTarget?.failureReason?.description}</span>
                                        </div>
                                    </div>
                                </div>):null
                                }
                               
                            </div>
                        </div>
                        <div className="md:hidden flex justify-center">
                            <div className="w-full md:w-[70%] flex flex-col gap-3 ">
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                         محصول :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                    {props.moreInfoTarget?.paymentItems?.bill?.billCycle?.productName}
                                    </span>
                                </div>
                               
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                        مقدار :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                    {props.moreInfoTarget?.paymentItems?.quantity?.value}{props.moreInfoTarget?.paymentItems?.quantity?.unit}
                                    </span>
                                </div>
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                         کد درخواست :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                    {props.moreInfoTarget?.paymentItems?.bill?.billCycle?.code}
                                    </span>
                                </div>
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                         تاریخ درخواست :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                    {props.moreInfoTarget?.paymentItems?.bill?.billCycle?.requestDate}
                                    </span>
                                </div>
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                         تاریخ تایید :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                    {props.moreInfoTarget?.paymentItems?.bill?.billCycle?.confirmationDate}
                                    </span>
                                </div>
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                         تاریخ خرید :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                    {props.moreInfoTarget?.purchaseDate}
                                    </span>
                                </div>
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                          دپارتمان :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                    {props.moreInfoTarget?.paymentItems?.bill?.billCycle?.subOrganizationName}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                           وضعیت فاکتور :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                    {props.moreInfoTarget?.status==="IN_PROGRESS" ? (
                                                    <div className="flex items-center gap-2">
                                                       
                                                        <span>در انتظار تایید</span>
                                                    </div>
                                                ):props.moreInfoTarget?.status==="FAIL" ?(
                                                    <div className="flex items-center gap-2">
                                                        
                                                        <span>رد شده</span>
                                                    </div>
                                                ):props.moreInfoTarget?.status==="DONE" ?(
                                                    <span>
                                                        تایید شده
                                                    </span>

                                                ):null}
                                    </span>
                                </div>
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                        نام درخواست دهنده :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                    {props.moreInfoTarget?.paymentItems?.bill?.billCycle?.registrar}
                                    </span>
                                </div>
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                        نام تایید کننده درخواست :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                    {props.moreInfoTarget?.paymentItems?.bill?.confirmerName}
                                    </span>
                                </div>
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                        نام خریدار :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                    {props.moreInfoTarget?.buyerName}
                                    </span>
                                </div>
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                        شیوه پرداخت :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                    {props.moreInfoTarget?.paymentItems?.paymentMethod}
                                    </span>
                                </div>
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                        توضیحات :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                    {props.moreInfoTarget?.paymentItems?.bill?.billCycle?.description}
                                    </span>
                                </div>
                                {
                                    props.moreInfoTarget?.status==="FAIL" ?(<div>
                                        <span className="ml-1 text-gray9F text-[0.8rem]">
                                            دلیل رد :
                                        </span>
                                        <span className="text-[#29262A] text-[0.8rem]">
                                        {props.moreInfoTarget?.failureReason?.description}
                                        </span>
                                    </div>):null
                                }
                            </div>
                        </div>
                        
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </>
    )
}