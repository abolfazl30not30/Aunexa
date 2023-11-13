'use client'
import TextField from "@mui/material/TextField";
import React, {useEffect, useState} from "react";
import { DialogContent, DialogContentText, FormControl, MenuItem, Select,} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import {TailSpin} from "react-loader-spinner";
import * as yup from "yup";
import {useFormik} from "formik";
import { useUpdateRelationshipMutation } from "@/redux/features/organization/individual/IndividualRelationshipSlice";


export default function EditIndividualRelationshipInfoDialog(props) {
    
  const [individualRelationship,setIndividualRelationship] = useState(null)

 
    const relationshipCount=["اول","دوم"]

    const [submitData, { isLoading:isSubmitLoading ,error}] = useUpdateRelationshipMutation()

    

    


    const schema = yup.object().shape({
        fullName: yup.string(),
        phoneNumber:yup.string().min(11,"تعداد رقم وارد شده کم می باشد").max(11,"تعداد رقم وارد شده زیاد می باشد"),
        relationship:yup.string(),
        address: yup.string(),
        
      
    });

    const formik = useFormik({

        initialValues: {        
            relationshipsInformation:[
                {
                    individualId:"",
                    fullName:"",
                    phoneNumber:"",
                    relationship:"",
                    address:""
                }
            ]
        },

        

        validationSchema: schema,

        onSubmit: async (individualRelationship,helpers) => {
            const body = {...individualRelationship,individualId:props.editIndividualRelationshipInfoTarget,
                
                
            }
            const userData = await submitData(body)
            console.log(error)
            console.log(userData)
            helpers.resetForm({
                individualRelationship
            });
            
            setIndividualRelationship(null)
            

            props.handleCloseEditIndividualRelationshipInfo()
            
        },
    });
   
   
    
    useEffect(()=>{
        
        
        formik.setValues({
            id:props.editIndividualRelationshipInfoTarget?.individualId,
            fullName: props.editIndividualRelationshipInfoTarget?.fullName,
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
                            {relationshipCount.map((item,index)=>(
                                <div className="space-y-4">
                                     <div>
                                    <span>
                                        فرد {item}
                                    </span>
                                </div>
                                <div>
                                    <TextField
                                        fullWidth
                                        placeholder="نام و نام خانوادگی"
                                        type="text"
                                        name={`relationshipsInformation.${index}.fullName`}
                                        value={formik.values.fullName}
                                        onChange={formik.handleChange}
                                        inputProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}}
                                        InputLabelProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}}}/>
                                </div>
                                <div className="flex justify-between">
                                  <div className="w-[45%]">
                                    <TextField
                                        fullWidth
                                        placeholder="شماره تماس"
                                        type="text"
                                        name={`relationshipsInformation.${index}.phoneNumber`}
                                        value={formik.values.phoneNumber}
                                        onChange={formik.handleChange}
                                        error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                                        helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                                        inputProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}}
                                        InputLabelProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}}}/>
                                  </div>
                                  <div className="w-[45%]">
                                    <TextField
                                        fullWidth
                                        placeholder="نسبت"
                                        type="text"
                                        name={`relationshipsInformation.${index}.relationship`}
                                        value={formik.values.relationship}
                                        onChange={formik.handleChange}
                                        error={formik.touched.relationship && Boolean(formik.errors.relationship)}
                                        helperText={formik.touched.relationship && formik.errors.relationship}
                                        inputProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}}
                                        InputLabelProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}}}/>
                                  </div>
                                </div>
                                  <div className="">
                                    
                                      <TextField
                                        fullWidth
                                        placeholder="آدرس"
                                        type="text"
                                        name={`relationshipsInformation.${index}.address`}
                                        value={formik.values.address}
                                        onChange={formik.handleChange}
                                        error={formik.touched.address && Boolean(formik.errors.address)}
                                        helperText={formik.touched.address && formik.errors.address}
                                        inputProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}}
                                        InputLabelProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}}}/>
                                    

                                  </div>
                                </div>
                            ))}
                                 
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