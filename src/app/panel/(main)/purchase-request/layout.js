'use client'
import React from "react"
import {useRouter} from "next/navigation";
import {useGetAccessQuery} from "@/redux/features/access/getAccessSlice";

export default function RootLayout({children}) {
    const { data : accessData={},isLoading: isLoadingAccess, error: errorAccess } = useGetAccessQuery();
    const router = useRouter()

    if(accessData.hasOwnProperty("PurchaseRequest")){
        return (
            <>{children}</>
        );
    }else {
        router.push("/panel")
    }
}
