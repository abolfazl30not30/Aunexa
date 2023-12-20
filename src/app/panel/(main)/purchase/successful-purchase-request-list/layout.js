'use client'
import React from "react"
import {useSelector} from "react-redux";
import {useRouter} from "next/navigation";


export default function RootLayout({children}) {
    const pages = useSelector((state)=> state.access.pages)
    const router = useRouter()

    if(pages.hasOwnProperty("SuccessfulPurchaseRequestList")){
        return (
            <>{children}</>
        );
    }else {
        router.push("/panel")
    }
}
