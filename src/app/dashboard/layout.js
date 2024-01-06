'use client'
import React from 'react'
import {useSelector} from "react-redux";
import {StompSessionProvider} from "react-stomp-hooks";

export default function RootLayout({children}) {

    return (
        <>
            <StompSessionProvider url={`http://194.33.125.112:30815/ws-endpoint`}>
                {children}
            </StompSessionProvider>
        </>
    )
}
