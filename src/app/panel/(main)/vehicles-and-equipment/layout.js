'use client'
import React from "react"
import {useGetAccessQuery} from "@/redux/features/access/getAccessSlice";
import {useRouter} from "next/navigation";


export default function RootLayout({children}) {
    const { data : accessData={},isLoading: isLoadingAccess, error: errorAccess } = useGetAccessQuery();
    const router = useRouter()

    if(accessData.hasOwnProperty("VehicleAndEquipment")){
        return (
            <>{children}</>
        );
    }else {
        router.push("/panel")
    }
}
