'use client'
import TextField from "@mui/material/TextField";
import React, {useEffect, useState} from "react";
import {Autocomplete, DialogContent, DialogContentText} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import {TailSpin} from "react-loader-spinner";
import * as yup from "yup";
import {useFormik} from "formik";
import CircularProgress from '@mui/material/CircularProgress';
import { useSaveMutation } from "@/redux/features/ticket/TicketSlice";

export default function AddTicketDialog(props) {
  
    const [ticket,setTicket] = useState(null)
    
  
    const handleReset = () =>{
        formik.resetForm()
        setTicket(null)
    }

    const [submitData, { isLoading:isSubmitLoading ,error}] = useSaveMutation()
    const schema = yup.object().shape({
        title: yup.string().required("لطفا موضوع پیام را مشخص کنید"),
        
        
    });

    const formik = useFormik({
        initialValues: {
            title:"",
            
            
        },
      
        

        validationSchema: schema,

        onSubmit: async (tiket,helpers) => {
            let updateTiket = {...tiket}
            
            const userData = await submitData(updateTiket)
            handleReset()
            props.handleCloseAddTicket()
            setSubOrganization(null)
        },
    });
    const [subOrganization, setSubOrganization] = useState(null)
    const subOrganizationList = [
      { label: 'دپارتمان یک' },
      { label: 'دپارتمان دو' },
      
    ];

    
    return (
        <>
            <Dialog
                fullWidth={true}
                open={props.openAddTicket}
                keepMounted
                onClose={()=>{props.handleCloseAddTicket();handleReset()}}
                aria-describedby="alert-dialog-slide-description"
                PaperProps={{
                    style: {
                        fontFamily: "IRANYekan",
                    },
                }}>
                <DialogContent>
                    <DialogContentText style={{fontFamily: "IRANYekan"}}>
                        <div className="flex justify-end">
                            <button onClick={()=>{props.handleCloseAddTicket();handleReset()}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 14 14"
                                     fill="none">
                                    <path d="M13 1L1 13M1 1L13 13" stroke="black" stroke-width="2"
                                          stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                        </div>
                        <div className="flex justify-center mb-7">
                            <h3 className="text-[1.1rem]">ثبت تیکت جدید</h3>
                        </div>
                        <form className="flex justify-center " onSubmit={formik.handleSubmit} method="POST">
                            <div className="flex flex-col justify-center w-[90%] gap-5">
                                <div className="flex justify-between gap-2">
                                    <div className="" >
                                      <Autocomplete
                                        fullWidth
                                        clearOnEscape
                                        disablePortal
                                        id="combo-box-demo"
                                        options={subOrganizationList}
                                        sx={{ width: 300 }}
                                        value={subOrganization}
                                        onChange={(event, newValue) => {
                                            setSubOrganization(newValue)
                                            formik.setFieldValue("subOrganization", newValue.abbreviation)
                                        }}
                                        renderInput={(params) => <TextField error={formik.touched.subOrganization && Boolean(formik.errors.subOrganization)}
                                            helperText={formik.touched.subOrganization && formik.errors.subOrganization}
                                            InputProps={{
                                            ...params.InputProps,
                                            style: { fontFamily: "IRANYekan", fontSize: "0.8rem" }
                                            }} {...params} placeholder="دپارتمان" />}
                                        />

                                    </div>
                                    <div className="w-11/12 h-full">
                                    <TextField
                                        fullWidth
                                        placeholder="موضوع پیام (اجباری)"
                                        type="text"
                                        name="title"
                                        value={formik.values.title}
                                        onChange={formik.handleChange}
                                        error={formik.touched.title && Boolean(formik.errors.title)}
                                        helperText={formik.touched.title && formik.errors.title}
                                        inputProps={{style: {fontFamily: "IRANYekan", fontSize: "0.8rem"}}}
                                        InputLabelProps={{style: {fontFamily: "IRANYekan"}}}/>
                                    </div>
                                </div>
                                <div>
                                    {
                                        isSubmitLoading ? (<button disabled type="submit"
                                                                   className="hidden flex gap-3 items-center justify-center w-full rounded-[0.5rem] py-3  border border-solid border-1 border-neutral-400 font-bold text-textGray bg-neutral-200">
                                            <TailSpin
                                                height="20"
                                                width="20"
                                                color="#4E4E4E"
                                                ariaLabel="tail-spin-loading"
                                                radius="1"
                                                wrapperStyle={{}}
                                                wrapperClass=""
                                                visible={true}/>
                                            ثبت
                                        </button>) : (
                                            <button type="submit"
                                                    className="w-full rounded-[0.5rem] py-3 hover:border hover:opacity-80 font-bold  bg-mainRed text-white">ثبت
                                            </button>
                                        )
                                    }
                                </div>
                            </div>
                        </form>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </>
    )
}