'use client'
import TextField from "@mui/material/TextField";
import React, {useEffect,useRef, useState} from "react";
import {DialogContent, DialogContentText} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import {TailSpin} from "react-loader-spinner";
import * as yup from "yup";
import {useFormik} from "formik";


export default function ChangePasswordDialog(props) {
    
    
  

    const schema = yup.object().shape({
        otp: yup.string().matches(/^[0-9]+$/, "کد ارسال شده فقط شامل عدد میتواند باشد").required("لطفا کد ارسال شده را وارد کنید").min(6,"کد وارد شده باید 6 رقم باشد").max(6,"کد وارد شده باید 6 رقم باشد"),
        password:yup.string().matches(/^[0-9]+$/, "رمز فقط شامل عدد میتواند باشد").required("لطفا رمز عبور جدید را وارد کنید").min(8,"رمز عبور شما باید حداقل 8 رقم باشد").max(16,"رمز عبور شما باید حداکثر 16 رقم باشد"),
        repeatPassword:yup.string().matches(/^[0-9]+$/, "رمز فقط شامل عدد میتواند باشد").required("لطفا تکرار رمز عبور جدید را وارد کنید").oneOf([yup.ref('password'), null], "رمز وارد شده با تکرار آن یکسان نمی باشد."),
        
    });

    const handleReset = () => {
        formik.resetForm()
        
    }
    const formik = useFormik({
        initialValues: {
            otp:"",
            password: "",
            repeatPassword:""
            
        },

        validationSchema: schema,

        onSubmit: async (password, helpers) => {
            let updatePassword = {...password}
            // const userData = await submitData(updatePassword)
            
           handleReset()
           props.handleCloseChangePassword()
            
        },
    });

    

  

   

    


    return (
        <>
            <Dialog
                fullWidth={true}
                open={props.openChangePassword}
                keepMounted
                onClose={() => {
                    props.handleCloseChangePassword();
                    handleReset()
                }}
                aria-describedby="alert-dialog-slide-description"
                PaperProps={{
                    style: {
                        fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189",
                    },
                }}>
                <DialogContent>
                    <DialogContentText style={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}}>
                        <div className="flex justify-end">
                            <button onClick={() => {
                                
                                props.handleCloseChangePassword();
                                
                                handleReset()
                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 14 14"
                                     fill="none">
                                    <path d="M13 1L1 13M1 1L13 13" stroke="black" stroke-width="2"
                                          stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                        </div>
                        <div className="flex justify-center mb-7">
                            <h3 className="text-[1.1rem] text-[#4E4E4E]">تغییر رمز عبور</h3>
                        </div>
                        
                            
                            <form className="flex justify-center " onSubmit={formik.handleSubmit} method="POST">
                              <div className="flex flex-col justify-center w-[90%] gap-5">
                                <div className="text-center text-[#9F9F9F]">
                                  <p>یک کد 6 رقمی به zi**********@gmail.com ارسال شد. لطفا کد را وارد کنید.</p>
                                </div>
                                <div>
                                    <TextField
                                        fullWidth
                                        placeholder="کد ارسال شده "
                                        type="text"
                                        name="otp"
                                        value={formik.values.otp}
                                        onChange={formik.handleChange}
                                        error={formik.touched.otp && Boolean(formik.errors.otp)}
                                        helperText={formik.touched.otp && formik.errors.otp}
                                       inputProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}}
                                            InputLabelProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}}}/>
                                </div>
                                <div  className="text-center text-[#4E4E4E]">
                                  {props.seconds > 0 || props.minutes > 0 ? (
                                    <p>
                                      زمان با قی مانده: {props.minutes < 10 ? `0${props.minutes}` : props.minutes}:
                                      {props.seconds < 10 ? `0${props.seconds}` : props.seconds}
                                    </p>
                                  ) : (
                                    <button 
                                    className={props.seconds > 0 || props.minutes > 0?"hidden":"flex items-center gap-2"}
                                    style={{
                                      color: props.seconds > 0 || props.minutes > 0 ? "#DFE3E8" : "#FF5630"
                                    }}
                                    onClick={props.resendOTP}
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M2 10C2 10 4.00498 7.26822 5.63384 5.63824C7.26269 4.00827 9.5136 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.89691 21 4.43511 18.2543 3.35177 14.5M2 10V4M2 10H8" stroke="#DB3746" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                    <span>
                                       دریافت مجدد کد از طریق پیام
                                    </span>
                                  </button>
                                  )}
                                </div>
                                <div>
                                    <TextField
                                        fullWidth
                                        placeholder="رمز عبور جدید"
                                        type="text"
                                        name="password"
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        error={formik.touched.password && Boolean(formik.errors.password)}
                                        helperText={formik.touched.password && formik.errors.password}
                                       inputProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}}
                                            InputLabelProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}}}/>
                                </div>
                                <div>
                                    <TextField
                                        fullWidth
                                        placeholder="تکرار رمز عبور جدید"
                                        type="text"
                                        name="repeatPassword"
                                        value={formik.values.repeatPassword}
                                        onChange={formik.handleChange}
                                        error={formik.touched.repeatPassword && Boolean(formik.errors.repeatPassword)}
                                        helperText={formik.touched.repeatPassword && formik.errors.repeatPassword}
                                       inputProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}}
                                            InputLabelProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}}}/>
                                </div>

                               
                                <div>
                                            <button type="submit" 
                                                    className="w-full rounded-[0.5rem] py-3 hover:border hover:opacity-80 font-bold  bg-mainRed text-white">ثبت
                                            </button>
                                </div>
                            </div>
                            </form>
                            
        
               
                                
                            
                            
                            
                        
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </>
    )
}