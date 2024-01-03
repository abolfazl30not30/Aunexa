'use client'
import React, {useEffect} from 'react'
import {useSelector} from "react-redux";
import {
    StompSessionProvider, useSubscription,
} from "react-stomp-hooks";
import {useState} from "react";

export default function RootLayout({children}) {


    return (
        <>
            <StompSessionProvider url={`http://localhost:8011/ws-endpoint`}>
                {children}
            </StompSessionProvider>
        </>
    )
}