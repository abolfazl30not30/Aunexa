'use client'
import React from 'react'
import "../../styles/login.css"
import {prefixer} from 'stylis';
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import Image from "next/image";

const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
});

export default function RootLayout({children}) {
    return (
        <>
            <div className=''>
                <header className="flex justify-between bg-white w-full py-6 px-14">
                    <div className="w-[7rem]">
                        <Image src="/redMICLogo.svg" alt="costumer" width={0}
                               height={0}
                               sizes="100vw"
                               style={{width: '100%', height: 'auto'}}/>
                    </div>
                    <div className="flex">
                        <div className="p-2 border border-solid border-1 border-borderGray rounded">
                            <div className="relative">
                                <img src="/icons/bell.svg" alt="bell"/>
                                <div className="absolute top-0">
                                    <span className="block rounded-full bg-mainRed w-[0.5rem] h-[0.5rem]"></span>
                                </div>
                            </div>

                        </div>
                        <div>

                        </div>
                    </div>
                </header>
                <div className='flex'>
                    <div className="mt-6 h-screen w-[18%] bg-white">
                        <div>

                        </div>
                    </div>
                    <div className="m-6 h-screen w-[80%]">
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}
