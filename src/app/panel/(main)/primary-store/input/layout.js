'use client'
import React from "react"
import {useSelector} from "react-redux";
import {useRouter} from "next/navigation";
import {useGetAccessQuery} from "@/redux/features/access/getAccessSlice";

export default function RootLayout({children}) {

    const { data : accessData={},isLoading: isLoadingAccess, error: errorAccess } = useGetAccessQuery();
    const router = useRouter()

    if(accessData.hasOwnProperty("primaryStoreInput")){
        return (
            <>{children}</>
        );
    }else {
        router.push("/panel")
    }

}
