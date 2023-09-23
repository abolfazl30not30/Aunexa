'use client'
import React from 'react'
import "../../styles/login.css"
import Image from "next/image";
import Link from "next/link";
import {usePathname} from 'next/navigation'
import {createTheme, ThemeProvider} from '@mui/material/styles';
import rtlPlugin from 'stylis-plugin-rtl';
import {prefixer} from 'stylis';
import {CacheProvider} from '@emotion/react';
import createCache from '@emotion/cache';

const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
});
const theme = createTheme({
    direction: 'rtl',
});

export default function RootLayout({children}) {
    const pathname = usePathname()
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
                    <div className="flex items-center gap-4">
                        <button className="p-2 border border-solid border-1 border-borderGray rounded">
                            <div className="relative">
                                <img src="/icons/bell.svg" alt="bell"/>
                                <div className="absolute top-0">
                                    <span className="block rounded-full bg-mainRed w-[0.5rem] h-[0.5rem]"></span>
                                </div>
                            </div>
                        </button>
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 border border-solid border-1 border-borderGray rounded">
                                <img className="w-full cover"
                                     src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                     alt="profile"/>
                            </div>
                            <div>
                                <button className="flex items-center text-textGray text-[0.8rem] ">
                                    حساب کاربری من
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"
                                         fill="none">
                                        <path d="M11.3332 6.33334L7.99984 9.66667L4.6665 6.33334" stroke="#29262A"
                                              stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div>

                        </div>
                    </div>
                </header>
                <div className='flex'>
                    <div className="mt-5 mr-5 h-screen w-[15%] bg-white">
                        <div className="px-4 py-3">
                            <div>
                                <Link href="/panel"
                                      className="block py-4 px-2 border-b border-b-1 border-b-solid  border-b-borderGray"><span
                                    className={pathname === "/panel" ? "text-mainRed text-[0.9rem]" : "text-gray9F hover:text-textGray text-[0.9rem]"}>داشبورد</span></Link>
                            </div>
                            <div>
                                <details className="group py-3 border-b border-b-1 border-b-solid  border-b-borderGray">
                                    <summary
                                        className="flex items-center justify-between gap-2 p-2 font-medium marker:content-none hover:cursor-pointer">
                                        <span className="text-gray9F group-open:text-textGray text-[0.9rem]">انبار مواد اولیه</span>
                                        <svg className="transition group-open:rotate-90" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                            <path d="M10 4L6 8L10 12" stroke="#9F9F9F" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </summary>
                                    <ul className="flex flex-col gap-1 pr-2">
                                        <li><Link href="/panel/raw-materials-warehouse/input"
                                                  className="block py-2 px-5"><span
                                            className={pathname === "/panel/raw-materials-warehouse/input" ? "text-mainRed text-[0.9rem]" : "text-gray9F hover:text-textGray text-[0.9rem]"}>بخش ورودی</span></Link></li>
                                        <li><Link href="/panel/raw-materials-warehouse/output"
                                                  className="block py-2 px-5"><span
                                            className={pathname === "/panel/raw-materials-warehouse/output" ? "text-mainRed text-[0.9rem]" : "text-gray9F hover:text-textGray text-[0.9rem]"}>بخش خروجی</span></Link></li>
                                    </ul>
                                </details>
                            </div>
                            <div>
                                <details className="group py-3 border-b border-b-1 border-b-solid  border-b-borderGray">
                                    <summary
                                        className="flex items-center justify-between gap-2 p-2 font-medium marker:content-none hover:cursor-pointer">
                                        <span className="text-gray9F group-open:text-textGray text-[0.9rem]">انبار تجهیزات</span>
                                        <svg className="transition group-open:rotate-90" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                            <path d="M10 4L6 8L10 12" stroke="#9F9F9F" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </summary>
                                    <ul className="flex flex-col gap-1 pr-2">
                                        <li><Link href="/panel/equipment-warehouse/input"
                                                  className="block py-2 px-5"><span
                                            className={pathname === "/panel/equipment-warehouse/input" ? "text-mainRed text-[0.9rem]" : "text-gray9F hover:text-textGray text-[0.9rem]"}>بخش ورودی</span></Link></li>
                                        <li><Link href="/panel/equipment-warehouse/output"
                                                  className="block py-2 px-5"><span
                                            className={pathname === "/panel/equipment-warehouse/output" ? "text-mainRed text-[0.9rem]" : "text-gray9F hover:text-textGray text-[0.9rem]"}>بخش خروجی</span></Link></li>
                                    </ul>
                                </details>
                            </div>
                            <div>
                                <details className="group py-3 border-b border-b-1 border-b-solid  border-b-borderGray">
                                    <summary
                                        className="flex items-center justify-between gap-2 p-2 font-medium marker:content-none hover:cursor-pointer">
                                        <span className="text-gray9F group-open:text-textGray text-[0.9rem]">انبار محصولات</span>
                                        <svg className="transition group-open:rotate-90" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                            <path d="M10 4L6 8L10 12" stroke="#9F9F9F" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </summary>
                                    <ul className="flex flex-col gap-1 pr-2">
                                        <li><Link href="/panel/product-warehouse/input"
                                                  className="block py-2 px-5"><span
                                            className={pathname === "/panel/product-warehouse/input" ? "text-mainRed text-[0.9rem]" : "text-gray9F hover:text-textGray text-[0.9rem]"}>بخش ورودی</span></Link></li>
                                        <li><Link href="/panel/product-warehouse/output"
                                                  className="block py-2 px-5"><span
                                            className={pathname === "/panel/product-warehouse/output" ? "text-mainRed text-[0.9rem]" : "text-gray9F hover:text-textGray text-[0.9rem]"}>بخش خروجی</span></Link></li>
                                    </ul>
                                </details>
                            </div>
                            <div>
                                <Link href="/panel/vehicles-and-equipment"
                                      className="block py-4 px-2 border-b border-b-1 border-b-solid  border-b-borderGray"><span
                                    className={pathname === "/panel/vehicles-and-equipment" ? "text-mainRed text-[0.9rem]" : "text-gray9F hover:text-textGray text-[0.9rem]"}>وسایل و تجهیزات</span></Link>
                            </div>
                        </div>

                    </div>
                    <div className="m-5 h-screen w-[85%]">
                        <CacheProvider value={cacheRtl}>
                            <ThemeProvider theme={theme}>
                                {children}
                            </ThemeProvider>
                        </CacheProvider>
                    </div>
                </div>
            </div>
        </>
    )
}
