'use client'
import React from "react"
import "../styles/globals.css";
import "../styles/main.css";
import {store} from '../redux/store'
import {Provider} from 'react-redux'
import localFont from 'next/font/local'

const fonts = localFont({
    src: [
        {
            path: './fonts/IRANYekanLight.ttf',
            weight: '300',
            style: 'normal',
        },
        {
            path: './fonts/IRANYekanRegular.ttf',
            weight: '400',
            style: 'normal',
        },
        {
            path: './fonts/IRANYekanMedium.ttf',
            weight: '500',
            style: 'normal',
        },
        {
            path: './fonts/IRANYekanBold.ttf',
            weight: '700',
            style: 'normal',
        },
        {
            path: './fonts/IRANYekanExtraBold.ttf',
            weight: '800',
            style: 'normal',
        },
        {
            path: './fonts/IRANYekanBlack.ttf',
            weight: '900',
            style: 'normal',
        },
    ],
})

export default function RootLayout({children}) {
    return (
        <html lang="en" className={fonts.className}>
        <body>
        <Provider store={store}>
            {children}
        </Provider>
        </body>
        </html>
    );
}
