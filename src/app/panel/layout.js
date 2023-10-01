'use client'
import React, {useState} from 'react'
import "../../styles/login.css"
import Image from "next/image";
import Link from "next/link";
import {usePathname} from 'next/navigation'
import {createTheme, ThemeProvider} from '@mui/material/styles';
import rtlPlugin from 'stylis-plugin-rtl';
import {prefixer} from 'stylis';
import {CacheProvider} from '@emotion/react';
import createCache from '@emotion/cache';
import {Divider, Drawer, ListItemIcon, Menu, MenuItem} from "@mui/material";

const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
});
const theme = createTheme({
    direction: 'rtl',
});

export default function RootLayout({children}) {
    const pathname = usePathname()

    const [openAlertMenu,setOpenAlertMenu] = useState(false)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [openSidebar,setOpenSidebar] = useState(false)

    const open = Boolean(anchorEl);
    const handleOpenAlertMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseAlertMenu = () => {
        setAnchorEl(null);
    };

    const handleOpenSidebar = (event) => {
        setOpenSidebar(true)
    };
    const handleCloseSidebar = () => {
        setOpenSidebar(false)
    };

    return (
        <>
            <div className=''>
                <header className="flex items-center justify-between bg-white w-full py-4 md:py-6 px-5 md:px-14">
                    <div className="block md:hidden">
                        <button onClick={handleOpenSidebar}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                                <path d="M4 16H28M4 8H28M4 24H28" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                    </div>
                    <div className="w-[6rem] md:w-[7rem]">
                        <Image src="/redMICLogo.svg" alt="costumer" width={0}
                               height={0}
                               sizes="100vw"
                               style={{width: '100%', height: 'auto'}}/>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="p-2 md:border md:border-borderGray rounded" onClick={handleOpenAlertMenu}>
                            <div className="relative">
                                <img src="/icons/bell.svg" alt="bell"/>
                                <div className="absolute top-0">
                                    <span className="block rounded-full bg-mainRed w-[0.5rem] h-[0.5rem]"></span>
                                </div>
                            </div>
                        </button>
                        <div className="hidden md:flex items-center gap-2">
                            <div className="w-12 h-12 md:w-10 md:h-10 border border-solid border-1 border-borderGray rounded">
                                <img className="w-full cover"
                                     src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                     alt="profile"/>
                            </div>
                            <div>
                                <button className="flex items-center text-textGray text-[0.8rem]" >
                                    حساب کاربری من
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"
                                         fill="none">
                                        <path d="M11.3332 6.33334L7.99984 9.66667L4.6665 6.33334" stroke="#29262A"
                                              stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </button>
                            </div>
                            <div>
                                <Menu
                                    anchorEl={anchorEl}
                                    id="account-menu"
                                    open={open}
                                    onClose={handleCloseAlertMenu}
                                    onClick={handleCloseAlertMenu}
                                    PaperProps={{
                                        elevation: 0,
                                        sx: {
                                            width:"20rem",
                                            bgcolor:"#fff",
                                            borderRadius:"0.5rem",
                                            overflow: 'visible',
                                            filter: 'drop-shadow(0px 2px 3px rgba(0,0,0,0.1))',
                                            mt: 1.5,
                                            fontFamily:"IRANYekan",
                                            '& .MuiAvatar-root': {
                                                width: 32,
                                                height: 32,
                                                ml: -0.5,
                                                mr: 1,
                                            },
                                        },
                                    }}
                                    transformOrigin={{ horizontal: 'left', vertical: 'top' }}
                                    anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}>
                                    <div className="px-5 py-2">
                                        <div className="flex justify-center items-center pt-2 pb-4">
                                            <h4 className="text-[0.9rem] text-">آخرین پیام ها</h4>
                                        </div>
                                        <div className="py-3 border-t border-t-[#D9D9D9]">
                                            <div className="flex justify-between">
                                                <h4 className="text-[0.9rem]">تیکت جدید</h4>
                                                <span className="text-[0.7rem] text-[#9F9F9F]">1402/09/03</span>
                                            </div>
                                            <div className="mt-2">
                                                <p className="text-[0.8rem] text-gray70">لورم ایپسوم متن ساختگی با تولید آن را سادگیا </p>
                                            </div>
                                        </div>
                                        <div className="py-3 border-t border-t-[#D9D9D9]">
                                            <div className="flex justify-between">
                                                <h4 className="text-[0.9rem]">تیکت جدید</h4>
                                                <span className="text-[0.7rem] text-[#9F9F9F]">1402/09/03</span>
                                            </div>
                                            <div className="mt-2">
                                                <p className="text-[0.8rem] text-gray70">لورم ایپسوم متن ساختگی با تولید آن را سادگیا </p>
                                            </div>
                                        </div>
                                        <div className="py-3 border-t border-t-[#D9D9D9] flex justify-center">
                                            <button className="text-[0.8rem] text-[#48B2FF]">
                                                مشاهده همه
                                            </button>
                                        </div>
                                    </div>
                                </Menu>
                            </div>
                        </div>
                        <div>

                        </div>
                    </div>
                </header>
                <div className='flex justify-center px-3 md:px-0'>
                    <div>
                        <Drawer
                            anchor={"right"}
                            open={openSidebar}
                            onClose={handleCloseSidebar}>
                            <div className="w-[17rem] h-screen bg-white">
                                <div className="flex justify-end m-3">
                                    <button className="p-4" onClick={handleCloseSidebar}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                            <path d="M11 1L1 11M1 1L11 11" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </button>
                                </div>
                                <div className="flex justify-center mb-4">
                                    <div className="w-[6rem] md:w-[3rem]">
                                        <Image src="/redMICLogo.svg" alt="costumer" width={0}
                                               height={0}
                                               sizes="100vw"
                                               style={{width: '100%', height: 'auto'}}/>
                                    </div>
                                </div>
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
                        </Drawer>
                    </div>
                    <div className="hidden md:block mt-5 md:mr-5 h-screen md:w-[30%] lg:w-[15%] bg-white">
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
                    <div className="m-5 h-screen w-full md:w-[70%] lg:w-[85%]">
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
