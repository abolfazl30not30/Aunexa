'use client'
import MainForm from "@/components/Login/MainForm";
import { useSearchParams } from 'next/navigation'
import {useEffect} from "react";
import {useLoginMutation} from "../../redux/api/loginSlice"
import { useRouter } from 'next/navigation'
import axios from "axios";
import Image from "next/image";
import React from "react";
import "../../styles/loader.css"
import {useDispatch, useSelector} from 'react-redux'
import { setCredentials } from '../../redux/api/authSlice'
import {generateCodeVerifier} from "@/helper/pkce";
import jwt_decode from "jwt-decode";

export default function redirect() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const dispatch = useDispatch()

    const [login, { isLoading,error }] = useLoginMutation()

    const code = searchParams.get('code')

    const formData = {
        code:code,
        redirect_uri:"http://localhost:3000/redirect",
        client_id:"client1",
        grant_type:"authorization_code",
        code_verifier:window.sessionStorage.getItem("codeVerifier")
    }



    const handleLogin = async ()=>{

        try {
            const userData = await login(formData)
            let tokenContent = jwt_decode(userData.data.access_token);
            let credential = {
                name:tokenContent.name,
                role: tokenContent.role,
                accessToken:userData.data.access_token,
                profile:tokenContent.profile,
                subOrganizationName: tokenContent.subOrganizationName,
                subOrganizationId:tokenContent.subOrganizationId,
            }
            dispatch(setCredentials({...credential}))
            window.sessionStorage.setItem("refresh_token",userData.data.refresh_token)
            router.push("/panel")
        }catch (err){
            if(err){
                router.push("/")
            }
        }
    }
    useEffect(()=>{
        handleLogin()
    },[])

    return (
        <>
            <div className="w-full h-screen flex justify-center items-center flex-col">
                <div className="w-[150px]">
                    <Image src="/redMICLogo.svg" alt="costumer" width={0}
                           height={0}
                           sizes="100vw"
                           style={{width: '100%', height: 'auto'}}/>
                </div>
                <div className="mt-7 flex justify-center ml-5">
                    <span className="loader"></span>
                </div>
            </div>
        </>
    )
}
