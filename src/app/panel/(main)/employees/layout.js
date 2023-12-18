'use client'
import React, {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/navigation";
import {useGetAccessQuery, useLazyGetAccessQuery} from "@/redux/features/access/getAccessSlice";
import {setAccess} from "@/redux/permission/accessSlice";

export default function RootLayout({children}){
    const dispatch = useDispatch();
    const { data : accessData={},isLoading: isLoadingAccess, error: errorAccess } = useGetAccessQuery();
    const router = useRouter()

    if(accessData.hasOwnProperty("Employee")){
        return (
            <>{children}</>
        );
    }else {
        router.push("/panel")
    }
}
