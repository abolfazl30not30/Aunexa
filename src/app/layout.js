'use client'
import React from "react"
import "../styles/globals.css";
import "../styles/main.css";
import {store} from '../redux/store'
import {Provider} from 'react-redux'

export default function RootLayout({children}) {
    return (
        <html lang="en">
        <body>
        <Provider store={store}>
            {children}
        </Provider>
        </body>
        </html>
    );
}
