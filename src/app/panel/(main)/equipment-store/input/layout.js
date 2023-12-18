'use client'
import React, {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/navigation";
import {useLazyGetAccessQuery} from "@/redux/features/access/getAccessSlice";
import {setAccess} from "@/redux/permission/accessSlice";

export default function RootLayout({children}){

    const router = useRouter()
    if(pages.hasOwnProperty("Employee")){
        return (
            <>{children}</>
        );
    }else {
        router.push("/panel")
    }
}
