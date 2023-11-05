'use client'
import TextField from "@mui/material/TextField";
import React, {useEffect, useState} from "react";
import { DialogContent, DialogContentText, FormControl, MenuItem, Select,} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import {TailSpin} from "react-loader-spinner";
import * as yup from "yup";
import {useFormik} from "formik";
import { useUpdateMutation } from "@/redux/features/role/RoleSlice";


export default function EditRoleInfoDialog(props) {
    
    const [role, setRole] = useState(null)

 


    const [submitData, { isLoading:isSubmitLoading ,error}] = useUpdateMutation()

    

    


    const schema = yup.object().shape({
        role: yup.string().required("لطفا نام نقش را وارد کنید"),
    });

    const formik = useFormik({

        initialValues: {
            role: ""
        },

        

        validationSchema: schema,

        onSubmit: async (role,helpers) => {
            const body = {...role,
                organizationId:window.sessionStorage.getItem("organizationId"),
                subOrganizationId:window.sessionStorage.getItem("subOrganizationId"),
                
            }
            const userData = await submitData(body)
            console.log(error)
            console.log(userData)
            helpers.resetForm({
                role
            });
            
            setRole(null)
            

            props.handleCloseEditRoleInfo()
        },
    });
   
   
    
    useEffect(()=>{
        
        
        formik.setValues({
            id:props.editRoleInfoTarget?.id,
            role: props.editRoleInfoTarget?.role,
            
        })
        
        
    },[props.openEditRoleInfo])

    

   
    

    const handleReset = () =>{
        formik.resetForm()
        
        setRole(null)
       
    }

    return (
        <>
            <Dialog
                fullWidth={true}
                open={props.openEditRoleInfo}
                keepMounted
                onClose={()=>{props.handleCloseEditRoleInfo();handleReset()}}
                aria-describedby="alert-dialog-slide-description"
                PaperProps={{
                    style: {
                        fontFamily: "IRANYekan",
                    },
                }}>
                <DialogContent>
                    <DialogContentText style={{fontFamily: "IRANYekan"}}>
                        <div className="flex justify-end">
                            <button onClick={()=>{props.handleCloseEditRoleInfo();handleReset()}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 14 14"
                                     fill="none">
                                    <path d="M13 1L1 13M1 1L13 13" stroke="black" stroke-width="2"
                                          stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                        </div>
                        <div className="flex justify-center mb-7">
                            <h3 className="text-[1.1rem]">ویرایش نقش</h3>
                        </div>
                        <form className="flex justify-center " onSubmit={formik.handleSubmit} method="POST">
                            <div className="flex flex-col justify-center w-[90%] gap-5">
                               
                                
                                    <div className="w-full">
                                        <TextField
                                            fullWidth
                                            placeholder="نام نقش (اجباری)"
                                            type="text"
                                            name="value"
                                            value={formik.values.role}
                                            onChange={formik.handleChange}
                                            error={formik.touched.role && Boolean(formik.errors.role)}
                                            helperText={formik.touched.role && formik.errors.role}
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
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </>
    )
}