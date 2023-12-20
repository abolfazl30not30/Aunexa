'use client'
import React from "react"
import {useRouter} from "next/navigation";


export default function RootLayout({children}) {
    const pages = useSelector((state)=> state.access.pages)
    const router = useRouter()

    if(pages.hasOwnProperty("ProductStoreInput")){
        return (
            <>{children}</>
        );
    }else {
        router.push("/panel")
    }

}
