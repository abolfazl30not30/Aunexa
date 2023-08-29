'use client'
import React from 'react'
import "../../styles/login.css"
import {prefixer} from 'stylis';
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";

const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
});

export default function RootLayout({children}) {
    return (
        <>
            <div className=''>
                <header className="bg-white w-full h-20">
                    header
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
