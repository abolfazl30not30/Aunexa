'use client'
import TextField from "@mui/material/TextField";
import React, {useEffect, useState} from "react";
import { DialogContent, DialogContentText, FormControl, MenuItem, Select,} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import {TailSpin} from "react-loader-spinner";
import * as yup from "yup";
import {useFormik} from "formik";
import { useUpdateMutation } from "@/redux/features/organization/individual/IndividualRelationshipSlice";


export default function EditIndividualRelationshipInfoDialog(props) {
    
  const [individualRelationship,setIndividualRelationship] = useState(null)

 


    const [submitData, { isLoading:isSubmitLoading ,error}] = useUpdateMutation()

    

    


    const schema = yup.object().shape({
        fullname: yup.string("لطفا نام و نام خانوادگی شخص را درست وارد نمایید"),
        phoneNumber:yup.number(),
        relationship:yup.string(),
        address: yup.string(),
      
    });

    const formik = useFormik({

        initialValues: {
            fullname: "",
            phoneNumber:"",
            relationship:"",
            address: "",
        },

        

        validationSchema: schema,

        onSubmit: async (individualRelationship,helpers) => {
            const body = {...individualRelationship,
                organizationId:window.sessionStorage.getItem("organizationId"),
                subOrganizationId:window.sessionStorage.getItem("subOrganizationId"),
                
            }
            const userData = await submitData(body)
            console.log(error)
            console.log(userData)
            helpers.resetForm({
                individualRelationship
            });
            
            setIndividualRelationship(null)
            

            props.handleCloseEditIndividualRelationshipInfo()
            handleOpenEditIndividualRelationshipRelationship()
        },
    });
   
   
    
    useEffect(()=>{
        
        
        formik.setValues({
            id:props.editIndividualRelationshipInfoTarget?.id,
            fullname: props.editIndividualRelationshipInfoTarget?.fullname,
            phoneNumber:props.editIndividualRelationshipInfoTarget?.phoneNumber,
            relationship:props.editIndividualRelationshipInfoTarget?.relationship,
            address: props.editIndividualRelationshipInfoTarget?.address,
            
        })
        
        
    },[props.openEditIndividualRelationshipInfo])

    

   
    

    const handleReset = () =>{
        formik.resetForm()
        
        setIndividualRelationship(null)
       
    }

    return (
        <>
            <Dialog
                fullWidth={true}
                open={props.openEditIndividualRelationshipInfo}
                keepMounted
                onClose={()=>{props.handleCloseEditIndividualRelationshipInfo();handleReset()}}
                aria-describedby="alert-dialog-slide-description"
                PaperProps={{
                    style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}
                }}>
                <DialogContent>
                    <DialogContentText style={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}}>
                        <div className="flex justify-end">
                            <button onClick={()=>{props.handleCloseEditIndividualRelationshipInfo();handleReset()}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 14 14"
                                     fill="none">
                                    <path d="M13 1L1 13M1 1L13 13" stroke="black" stroke-width="2"
                                          stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                        </div>
                        <div className="flex justify-center mb-7">
                            <h3 className="text-[1.1rem]">ویرایش اطلاعات نزدیکان</h3>
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
                                        inputProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}}
                        InputLabelProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}}}/>
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
                                       
                                        inputProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}}
                        InputLabelProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}}}/>
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
                                        inputProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}}
                        InputLabelProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}}}/>
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
                                        inputProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}}
                                        InputLabelProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}}}/>
                                    

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
                                            بعدی
                                        </button>) : (
                                            <button type="submit"
                                                    className="w-full rounded-[0.5rem] py-3 hover:border hover:opacity-80 font-bold  bg-mainRed text-white">بعدی
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