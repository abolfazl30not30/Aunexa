'use client'
import TextField from "@mui/material/TextField";
import React, {useEffect, useState} from "react";
import {Autocomplete, DialogContent, DialogContentText} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import {TailSpin} from "react-loader-spinner";
import * as yup from "yup";
import {useFormik} from "formik";
import CircularProgress from '@mui/material/CircularProgress';


import { useSaveMutation } from "@/redux/features/organization/individual/IndividualRelationshipSlice";

export default function AddIndividualRelationshipDialog(props) {
  
    const [individualRelationShip,setIndividualRelationship] = useState(null)
    
  
  
    const handleReset = () =>{
        formik.resetForm()
        setIndividualRelationship(null)
        
    }

    const [submitData, { isLoading:isSubmitLoading ,error}] = useSaveMutation()
    const schema = yup.object().shape({
        
        fullname: yup.string("لطفا نام و نام خانوادگی شخص را درست وارد نمایید"),
        phoneNumber:yup.number("لطفا فقط عدد وارد نمایید").min(11,"تعداد رقم وارد شده کم می باشد").max(11,"تعداد رقم وارد شده زیاد می باشد"),
        relationship:yup.string(),
        address:yup.string(),
        
    });
    

    const formik = useFormik({
        initialValues: {
          individualId:"",
          fullname:"",
          originalPhoneNumber:"",
          address:"",
            
        },
      
        

        validationSchema: schema,

        onSubmit: async (individualRelationShip,helpers) => {
            let updateIndividualRelationShip = {...individualRelationShip}
            const userData = await submitData(updateIndividualRelationShip)
            handleReset()
            props.handleCloseAddIndividualRelationship()
        },
    });
    

   const [relationshipcount,setRelationshipCount]=useState([])
    return (
        <>
            <Dialog
                fullWidth={true}
                open={props.openAddIndividualRelationship}
                keepMounted
                onClose={()=>{props.handleCloseAddIndividualRelationship();handleReset()}}
                aria-describedby="alert-dialog-slide-description"
                PaperProps={{
                    style: {
                        fontFamily: "IRANYekan",
                    },
                }}>
                <DialogContent>
                    <DialogContentText style={{fontFamily: "IRANYekan"}}>
                        <div className="flex justify-end">
                            <button onClick={()=>{props.handleCloseAddIndividualRelationship();handleReset()}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 14 14"
                                     fill="none">
                                    <path d="M13 1L1 13M1 1L13 13" stroke="black" stroke-width="2"
                                          stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                        </div>
                        <div className="flex justify-between mb-7">
                            <div>
                                <h3 className="text-[1.1rem]">اطلاعات نزدیکان</h3>
                            </div>
                            <div>
                                <button
                                        className="flex text-gray60 bg-white border border-gray60 items-center text- px-3 py-2 rounded-full md:rounded"
                                        onClick={()=>{setRelationshipCount([...relationshipcount,"relationship"])}}
                                      >
                                        <span className="hidden md:inline">
                                          افزودن افراد نزدیک 
                                        </span>
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="24"
                                          height="24"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                        >
                                          <path
                                            d="M7 12H17"
                                            stroke="white"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                          />
                                          <path
                                            d="M12 7V17"
                                            stroke="white"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                          />
                                        </svg>
                                    </button>
                            </div>
                        </div>
                        <form className="flex justify-center " onSubmit={formik.handleSubmit} method="POST">
                            <div className="flex flex-col justify-center w-[90%] gap-5">
                                <div>
                                    <TextField
                                        fullWidth
                                        placeholder="نام و نام خانوادگی"
                                        type="text"
                                        name="fullname"
                                        value={formik.values.fullname}
                                        onChange={formik.handleChange}
                                        error={formik.touched.fullname && Boolean(formik.errors.fullname)}
                                        inputProps={{style: {fontFamily: "IRANYekan", fontSize: "0.8rem"}}}
                                        InputLabelProps={{style: {fontFamily: "IRANYekan"}}}/>
                                </div>
                                <div className="flex justify-between">
                                  <div className="w-2/5">
                                    <TextField
                                        fullWidth
                                        placeholder="شماره تماس"
                                        type="text"
                                        name="phoneNumber"
                                        value={formik.values.phoneNumber}
                                        onChange={formik.handleChange}
                                        error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                                       
                                        inputProps={{style: {fontFamily: "IRANYekan", fontSize: "0.8rem"}}}
                                        InputLabelProps={{style: {fontFamily: "IRANYekan"}}}/>
                                  </div>
                                  <div className="w-2/5">
                                    <TextField
                                        fullWidth
                                        placeholder="نسبت"
                                        type="text"
                                        name="relationship"
                                        value={formik.values.relationship}
                                        onChange={formik.handleChange}
                                        error={formik.touched.relationship && Boolean(formik.errors.relationship)}
                                        inputProps={{style: {fontFamily: "IRANYekan", fontSize: "0.8rem"}}}
                                        InputLabelProps={{style: {fontFamily: "IRANYekan"}}}/>
                                  </div>
                                </div>
                                  <div className="">
                                    
                                      <TextField
                                        fullWidth
                                        placeholder="آدرس"
                                        type="text"
                                        name="address"
                                        value={formik.values.address}
                                        onChange={formik.handleChange}
                                        error={formik.touched.address && Boolean(formik.errors.address)}
                                        inputProps={{style: {fontFamily: "IRANYekan", fontSize: "0.8rem"}}}
                                        InputLabelProps={{style: {fontFamily: "IRANYekan"}}}/>
                                    

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
                        {relationshipcount.map((relation,index)=>{
                            <form className="flex justify-center " onSubmit={formik.handleSubmit} method="POST">
                            <div className="flex flex-col justify-center w-[90%] gap-5">
                                <div>
                                    <TextField
                                        
                                        fullWidth
                                        placeholder="نام و نام خانوادگی"
                                        type="text"
                                        name="fullname"
                                        value={formik.values.fullname}
                                        onChange={formik.handleChange}
                                        error={formik.touched.fullname && Boolean(formik.errors.fullname)}
                                        inputProps={{style: {fontFamily: "IRANYekan", fontSize: "0.8rem"}}}
                                        InputLabelProps={{style: {fontFamily: "IRANYekan"}}}/>
                                </div>
                                <div className="flex justify-between">
                                  <div className="w-2/5">
                                    <TextField
                                        fullWidth
                                        placeholder="شماره تماس"
                                        type="text"
                                        name="phoneNumber"
                                        value={formik.values.phoneNumber}
                                        onChange={formik.handleChange}
                                        error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                                       
                                        inputProps={{style: {fontFamily: "IRANYekan", fontSize: "0.8rem"}}}
                                        InputLabelProps={{style: {fontFamily: "IRANYekan"}}}/>
                                  </div>
                                  <div className="w-2/5">
                                    <TextField
                                        fullWidth
                                        placeholder="نسبت"
                                        type="text"
                                        name="relationship"
                                        value={formik.values.relationship}
                                        onChange={formik.handleChange}
                                        error={formik.touched.relationship && Boolean(formik.errors.relationship)}
                                        inputProps={{style: {fontFamily: "IRANYekan", fontSize: "0.8rem"}}}
                                        InputLabelProps={{style: {fontFamily: "IRANYekan"}}}/>
                                  </div>
                                </div>
                                  <div className="">
                                    
                                      <TextField
                                        fullWidth
                                        placeholder="آدرس"
                                        type="text"
                                        name="address"
                                        value={formik.values.address}
                                        onChange={formik.handleChange}
                                        error={formik.touched.address && Boolean(formik.errors.address)}
                                        inputProps={{style: {fontFamily: "IRANYekan", fontSize: "0.8rem"}}}
                                        InputLabelProps={{style: {fontFamily: "IRANYekan"}}}/>
                                    
                
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

                        })}
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </>
    )
}