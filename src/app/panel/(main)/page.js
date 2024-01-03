"use client";
import Link from "next/link";
import React from "react";
import {useState} from "react";
import {useSubscription} from "react-stomp-hooks";

export default function Dashboard() {
    return (
        <>
            <div className="flex justify-between items-center text-[0.9rem] bg-white py-6 px-5 md:px-10">
                <div className="">
                    <h2 className="font-[800] text-[0.9rem] md:text-[1.1rem]">
                        داشبورد
                    </h2>
                </div>
                <div className="">
                    <Link
                        href="/dashboard"
                        className="flex  text-white items-center bg-mainRed border px-3 py-2 rounded"
                    >
                    <span className="inline text-[0.9rem]">
                      داشبورد پیشرفته
                    </span>
                    </Link>
                </div>
            </div>
        </>
    )
}
