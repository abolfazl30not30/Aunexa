'use client'
import React, {useEffect} from "react";
import {DialogContent, DialogContentText,} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { MapContainer, TileLayer} from "react-leaflet";
import osm from "@/helper/osm-providers";
import {useState} from "react";

export default function MoreInfoDialog(props) {
    const [center, setCenter] = useState({ lat: 35.7219, lng: 51.3347 });


    const changePolygonFormat = (pointArray)=>{
        let points = []
        for(let location of pointArray){
            let loc = []
            loc = [location.latitude,location.longitude]
            points.push(loc)
        }
        return points
    }
    const changeCirCleCenterFormat = (center)=>{

    }
    const DrawVector = () =>{
        if(props.moreInfoTarget.fenceType === "CIRCLE"){

        }else {
            const points = changePolygonFormat(props.moreInfoTarget?.points)
            console.log(points)
        }
    }
    useEffect(()=>{

    },[])
    const ZOOM_LEVEL = 12;
    return (
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
                    <DialogContentText style={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}}>
                        <div className="flex justify-end">
                            <button onClick={props.handleCloseMoreInfo}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 14 14"
                                     fill="none">
                                    <path d="M13 1L1 13M1 1L13 13" stroke="black" stroke-width="2"
                                          stroke-linecap="round" stroke-linejoin="round"/>
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
                                        <span className="text-[0.9rem] text-gray70 ">نام</span>
                                    </div>
                                    <div className="border border-[#D9D9D9]  flex justify-start px-4">
                                        <div className="p-2">
                                            <span className="text-[#29262A] text-[0.9rem]">
                                                 {props.moreInfoTarget?.name}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="mb-2">
                                        <span className="text-[0.9rem] text-gray70 ">گروه</span>
                                    </div>
                                    <div className="border border-[#D9D9D9]  flex justify-start px-4">
                                        <div className="p-2">
                                            <span className="text-[#29262A] text-[0.9rem]">
                                                {props.moreInfoTarget?.subOrganizationName}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                {
                                    props.moreInfoTarget?.description && (
                                        <div className="flex flex-col">
                                            <div className="mb-2">
                                                <span className="text-[0.9rem] text-gray70 ">توضیحات</span>
                                            </div>
                                            <div className="border border-[#D9D9D9]  flex justify-start px-4">
                                                <div className="p-2">
                                                    <span className="text-[#29262A] text-[0.9rem]">
                                                        {props.moreInfoTarget?.description}
                                                     </span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }

                                <div className="geofence-map">
                                    <MapContainer center={center} zoom={ZOOM_LEVEL} >
                                        <TileLayer
                                            url={osm.maptiler.url}
                                            attribution={osm.maptiler.attribution}/>

                                    </MapContainer>
                                </div>
                            </div>
                        </div>
                        <div className="md:hidden flex justify-center">
                            <div className="w-full md:w-[70%] flex flex-col gap-3">
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                        نام  :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                       {props.moreInfoTarget?.productName}
                                    </span>
                                </div>
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                        گروه  :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                       {props.moreInfoTarget?.productName}
                                    </span>
                                </div>
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                        توضیحات  :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                       {props.moreInfoTarget?.productName}
                                    </span>
                                </div>
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