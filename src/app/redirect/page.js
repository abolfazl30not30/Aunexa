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
import { useDispatch } from 'react-redux'
import { setCredentials } from '../../redux/api/authSlice'

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
    }
    let base64encodedData = Buffer.from( "client1"+ ':' +"myClientSecretValue" ).toString('base64');
    const handleLogin = async ()=>{
        try{
            const {data} = await axios.post('http://localhost:8000/oauth2/token', formData, {
                headers: {
                    'Access-Control-Allow-Origins':"*",
                    'Content-Type': 'application/x-www-form-urlencoded',
                    // "Authorization":"Basic " + base64encodedData,
                },
                auth: {
                    username: "client1",
                    password: "myClientSecretValue"
                }
            })
            console.log(data)
        }catch (err){
            console.log(err)
        }
        // try {
        //     const userData = await login(formData).unwrap()
        //     dispatch(setCredentials({access_token:userData.access_token}))
        //     router.push("/panel")
        // }catch (err){
        //     if(err){
        //          router.push("/")
        //     }
        // }
    }
    useEffect(()=>{handleLogin()},[])

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
