
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
                        <div className="hidden md:flex md:justify-center md:flex-col mb-4">
                            <div className="w-full md:w-[100%] grid grid-cols-2 gap-4 justify-between items-center">
                            <div className="flex flex-col">
                                    <div className="mb-2">
                                        <span className="text-[0.9rem] text-gray70 ">نوع وسیله</span>
                                    </div>
                                    <div className="border border-[#D9D9D9]  flex justify-start px-4">
                                        <div className="p-2">
                                            <span className="text-[#29262A] text-[0.9rem] space-x-2">
                                                <span>
                                                    {/* {props.moreInfoTarget?.type} */}
                                                      خاور
                                                </span> 
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="mb-2">
                                        <span className="text-[0.9rem] text-gray70 "> پلاک وسیله</span>
                                    </div>
                                    <div className="border border-[#D9D9D9]  flex justify-start px-4">
                                        <div className="p-2">
                                            <span className="text-[#29262A] text-[0.9rem] space-x-2">
                                                <span>
                                                     {/* {machine?.tag?.slice(2, 5) +
                                                "-" +
                                                machine?.tag?.slice(5, 7) +
                                                " " +
                                                machine?.tag?.slice(7, 8) +
                                                " " +
                                                machine?.tag?.slice(0, 2)} */}
                                                12 ب 123 12
                                        
                                                      
                                                </span> 
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="mb-2">
                                        <span className="text-[0.9rem] text-gray70 ">کد وسیله</span>
                                    </div>
                                    <div className="border border-[#D9D9D9]  flex justify-start px-4">
                                        <div className="p-2">
                                            <span className="text-[#29262A] text-[0.9rem] space-x-2">
                                                <span>
                                                    {/* {props.moreInfoTarget?.code} */}
                                                      15
                                                </span> 
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="mb-2">
                                        <span className="text-[0.9rem] text-gray70 "> گروه</span>
                                    </div>
                                    <div className="border border-[#D9D9D9]  flex justify-start px-4">
                                        <div className="p-2">
                                            <span className="text-[#29262A] text-[0.9rem] space-x-2">
                                                <span>
                                                    {/* {props.moreInfoTarget?.group} */}
                                                      13
                                                </span> 
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            <div className="flex flex-col">
                                    <div className="mb-2">
                                        <span className="text-[0.9rem] text-gray70 ">ناحیه</span>
                                    </div>
                                    <div className="border border-[#D9D9D9]  flex justify-start px-4">
                                        <div className="p-2">
                                            <span className="text-[#29262A] text-[0.9rem] space-x-2">
                                                <span>
                                                    {/* {props.moreInfoTarget?.geofence} */}
                                                     زئوفنس یک
                                                </span> 
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="mb-2">
                                        <span className="text-[0.9rem] text-gray70 ">زمان ورود</span>
                                    </div>
                                    <div className=" flex  border border-[#D9D9D9]  justify-evenly px-4">
                                        <div className="p-2 text-[#29262A] text-[0.9rem]">
                                            {/* <span>{props.moreInfoTarget?.entryTime}</span> */}
                                            <span className="pr-1">1390/02/21</span>
                          <span>11:15</span>
                                        </div>
                                      
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="mb-2">
                                        <span className="text-[0.9rem] text-gray70 ">زمان خروج</span>
                                    </div>
                                    <div className="border border-[#D9D9D9]  flex justify-evenly px-4">
                                        <div className="p-2 text-[#29262A] text-[0.9rem]">
                                             {/* <span>{props.moreInfoTarget?.exitTime}</span> */}
                                            <span className="pr-1">1390/02/21</span>
                          <span>11:15</span>
                                        </div>
                                      
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="mb-2">
                                        <span className="text-[0.9rem] text-gray70 ">مدت زمان حضور در ناحیه</span>
                                    </div>
                                    <div className="border border-[#D9D9D9]  flex justify-start px-4">
                                        <div className="p-2">
                                            <span className="text-[#29262A] text-[0.9rem]">
                                                {/* {props.moreInfoTarget?.duration} */}
                                                06:19
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="mb-2">
                                        <span className="text-[0.9rem] text-gray70 ">مدت زمان روشن بودن ماشین</span>
                                    </div>
                                    <div className="border border-[#D9D9D9]  flex justify-start px-4">
                                        <div className="p-2">
                                            <span className="text-[#29262A] text-[0.9rem] space-x-2">
                                                <span>
                                                    {/* {props.moreInfoTarget?.onDuration} */}
                                                    05:17
                                                </span> 
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="mb-2">
                                        <span className="text-[0.9rem] text-gray70 ">مدت زمان خاموش بودن ماشین</span>
                                    </div>
                                    <div className="border border-[#D9D9D9]  flex justify-start px-4">
                                        <div className="p-2">
                                            <span className="text-[#29262A] text-[0.9rem] space-x-2">
                                                <span>
                                                    {/* {props.moreInfoTarget?.offDuration} */}
                                                    01:02
                                                </span> 
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="mb-2">
                                        <span className="text-[0.9rem] text-gray70 ">مدت زمان توقف ماشین</span>
                                    </div>
                                    <div className="border border-[#D9D9D9]  flex justify-start px-4">
                                        <div className="p-2">
                                            <span className="text-[#29262A] text-[0.9rem] space-x-2">
                                                <span>
                                                    {/* {props.moreInfoTarget?.stopsDuration} */}
                                                    00:13
                                                </span> 
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="mb-2">
                                        <span className="text-[0.9rem] text-gray70 ">تعداد تخلفات سرعت</span>
                                    </div>
                                    <div className="border border-[#D9D9D9]  flex justify-start px-4">
                                        <div className="p-2">
                                            <span className="text-[#29262A] text-[0.9rem] space-x-2">
                                                <span>
                                                    {/* {props.moreInfoTarget?.speed} */}
                                                    3
                                                </span> 
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="mb-2">
                                        <span className="text-[0.9rem] text-gray70 ">میزان سوخت مصرفی</span>
                                    </div>
                                    <div className="border border-[#D9D9D9]  flex justify-start px-4">
                                        <div className="p-2">
                                            <span className="text-[#29262A] text-[0.9rem] space-x-2">
                                                <span>
                                                    {/* {props.moreInfoTarget?.fuel} */}
                                                    10 لیتر
                                                </span> 
                                            </span>
                                        </div>
                                    </div>
                                </div>
                              
                                        <div className="flex flex-col">
                                            <div className="mb-2">
                                                <span className="text-[0.9rem] text-gray70 ">مسافت </span>
                                            </div>
                                            <div className="border border-[#D9D9D9]  flex justify-start px-4">
                                                <div className="p-2">
                                                    <span className="text-[#29262A] text-[0.9rem]">
                                                        {/* {props.moreInfoTarget?.distance} */}
                                                        10 کیلومتر
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
                                         نوع وسیله :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                        {/* <span>{props.moreInfoTarget?.type}</span> */}
                                        <span className="pr-1">خاور</span>
                          
                                    </span>
                                </div>
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                        پلاک وسیله نقلیه  :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                       
                                        <span className="pr-1">
                                        {/* {machine?.tag?.slice(2, 5) +
                                                "-" +
                                                machine?.tag?.slice(5, 7) +
                                                " " +
                                                machine?.tag?.slice(7, 8) +
                                                " " +
                                                machine?.tag?.slice(0, 2)} */}
                                                12 ب 123 12
                                        </span>
                          
                                    </span>
                                </div>
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                        کد وسیله   :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                        
                                        <span className="pr-1">
                                        {/* {props.moreInfoTarget?.code} */}
                                        12
                                        </span>
                          
                                    </span>
                                </div>
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                             ناحیه  :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem] space-x-2">
                                                <span>
                                                    {/* {props.moreInfoTarget?.geofence} */}
                                                     زئوفنس یک
                                                </span> 
                                            </span>
                                </div>
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                         گروه   :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                        
                                        <span className="pr-1">
                                        {/* {props.moreInfoTarget?.group} */}
                                        موناکو
                                        </span>
                          
                                    </span>
                                </div>
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                        زمان خروج :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                    {/* <span>{props.moreInfoTarget?.exitTime}</span> */}
                                    <span className="pr-1">1390/02/21</span>
                          <span>11:15</span>
                                    </span>
                                </div>
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                          مدت زمان حضور در ناحیه :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                                {/* {props.moreInfoTarget?.duration} */}
                                                06:19
                                            </span>
                                </div>
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                          مدت زمان روشن بودن ماشین :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem] space-x-2">
                                                <span>
                                                    {/* {props.moreInfoTarget?.onDuration} */}
                                                    05:17
                                                </span> 
                                            </span>
                                </div>
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                          مدت زمان خاموش بودن ماشین :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem] space-x-2">
                                                <span>
                                                    {/* {props.moreInfoTarget?.offDuration} */}
                                                    01:02
                                                </span> 
                                            </span>
                                </div>
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                          مدت زمان  توقف ماشین :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem] space-x-2">
                                                <span>
                                                    {/* {props.moreInfoTarget?.stopsDuration} */}
                                                    00:13
                                                </span> 
                                            </span>
                                </div>
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                           تعداد تخلفات سرعت  :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem] space-x-2">
                                                <span>
                                                    {/* {props.moreInfoTarget?.speed} */}
                                                    3
                                                </span> 
                                            </span>
                                </div>
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                             میزان سوخت مصرفی  :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem] space-x-2">
                                                <span>
                                                    {/* {props.moreInfoTarget?.fuel} */}
                                                    10 لیتر
                                                </span> 
                                            </span>
                                </div>
                               
                                
                                
                                    <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                        مسافت   :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                                        {/* {props.moreInfoTarget?.distance} */}
                                                        10 کیلومتر
                                                        </span>
                                </div>
                                
                                
                            </div>
                        </div>
                   
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </>
    )
}