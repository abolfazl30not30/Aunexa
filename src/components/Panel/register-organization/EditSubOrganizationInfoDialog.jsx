'use client'
import TextField from "@mui/material/TextField";
import React, {useEffect, useState} from "react";
import { DialogContent, DialogContentText, FormControl, MenuItem, Select,Autocomplete} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import {TailSpin} from "react-loader-spinner";
import * as yup from "yup";
import {useFormik} from "formik";
import { useUpdateMutation } from "@/redux/features/organization/sub-organization/SubOrganizationSlice";


export default function EditSubOrganizationInfoDialog(props) {
    
  const [subOrganization,setSubOrganization] = useState(null)

 


    const [submitData, { isLoading:isSubmitLoading ,error}] = useUpdateMutation()

    

    


    const schema = yup.object().shape({
      name: yup.string().required("لطفا نام دپارتمان را وارد کنید"),
      capacity: yup.string(),
      unit: yup.string(),
      type:yup.string().required()
      
    });

    const formik = useFormik({

        initialValues: {
          SubOrganizationId: "",
          name:"",
          capacity:"",
          unit:"",
          type:""
        },

        

        validationSchema: schema,

        onSubmit: async (subOrganization,helpers) => {
            const body = {...subOrganization,
                organizationId:window.sessionStorage.getItem("organizationId"),
                subOrganizationId:window.sessionStorage.getItem("subOrganizationId"),
                
            }
            const userData = await submitData(body)
            console.log(error)
            console.log(userData)
            helpers.resetForm({
                subOrganization
            });
            
            setSubOrganization(null)
            

            props.handleCloseEditSubOrganizationInfo()
        },
    });
   
   
    
    useEffect(()=>{
        
        
        formik.setValues({
            id:props.editSubOrganizationInfoTarget?.id,
            name: props.editSubOrganizationInfoTarget?.name,
            capacity: props.editSubOrganizationInfoTarget?.capacity,
            unit: props.editSubOrganizationInfoTarget?.unit,
            type: props.editSubOrganizationInfoTarget?.type,
            
        })
        
        
    },[props.openEditSubOrganizationInfo])

    

   
    

    const handleReset = () =>{
        formik.resetForm()
        
        setSubOrganization(null)
       
    }

    const [type, setType] = useState(null)
    const typeList = [
        { label: 'خرید ' },
        { label: 'تولید' },
        { label: 'انبار' },
        { label: 'فروش' },
        { label: 'حسابداری' },
      
    ];
    return (
        <>
            <Dialog
                fullWidth={true}
                open={props.openEditSubOrganizationInfo}
                keepMounted
                onClose={()=>{props.handleCloseEditSubOrganizationInfo();handleReset()}}
                aria-describedby="alert-dialog-slide-description"
                PaperProps={{
                    style: {
                        fontFamily: "IRANYekan",
                    },
                }}>
                <DialogContent>
                    <DialogContentText style={{fontFamily: "IRANYekan"}}>
                        <div className="flex justify-end">
                            <button onClick={()=>{props.handleCloseEditSubOrganizationInfo();handleReset()}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 14 14"
                                     fill="none">
                                    <path d="M13 1L1 13M1 1L13 13" stroke="black" stroke-width="2"
                                          stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                        </div>
                        <div className="flex justify-center mb-7">
                            <h3 className="text-[1.1rem]">ویرایش دپارتمان</h3>
                        </div>
                        <form className="flex justify-center " onSubmit={formik.handleSubmit} method="POST">
                            <div className="flex flex-col justify-center w-[90%] gap-5">
                               
                                
                                    <div className="w-full">
                                        <TextField
                                            fullWidth
                                            placeholder="نام دپارتمان (اجباری)"
                                            type="text"
                                            name="name"
                                            value={formik.values.name}
                                            onChange={formik.handleChange}
                                            error={formik.touched.name && Boolean(formik.errors.name)}
                                            helperText={formik.touched.name && formik.errors.name}
                                            inputProps={{style: {fontFamily: "IRANYekan", fontSize: "0.8rem"}}}
                                            InputLabelProps={{style: {fontFamily: "IRANYekan"}}}/>
                                    </div>
                                    <div className="w-full">
                                        <TextField
                                            fullWidth
                                            placeholder="ظرفیت (اختیاری)"
                                            type="text"
                                            name="capacity"
                                            value={formik.values.capacity}
                                            onChange={formik.handleChange}
                                            error={formik.touched.capacity && Boolean(formik.errors.capacity)}
                                            helperText={formik.touched.capacity && formik.errors.capacity}
                                            inputProps={{style: {fontFamily: "IRANYekan", fontSize: "0.8rem"}}}
                                            InputLabelProps={{style: {fontFamily: "IRANYekan"}}}/>
                                    </div>
                                    <div className="w-full">
                                        <TextField
                                            fullWidth
                                            placeholder="واحد (اختیاری)"
                                            type="text"
                                            name="unit"
                                            value={formik.values.unit}
                                            onChange={formik.handleChange}
                                            error={formik.touched.unit && Boolean(formik.errors.unit)}
                                            helperText={formik.touched.unit && formik.errors.unit}
                                            inputProps={{style: {fontFamily: "IRANYekan", fontSize: "0.8rem"}}}
                                            InputLabelProps={{style: {fontFamily: "IRANYekan"}}}/>
                                    </div>
                                    <div >
                                        <Autocomplete
                                            fullWidth
                                            clearOnEscape
                                            disablePortal
                                            id="combo-box-demo"
                                            options={typeList}
                                            sx={{ width: 300 }}
                                            value={type}
                                            onChange={(event, newValue) => {
                                            setType(newValue)
                                            formik.setFieldValue("type", newValue.abbreviation)
                                            }}
                                            renderInput={(params) => <TextField error={formik.touched.type && Boolean(formik.errors.type)}
                                             helperText={formik.touched.type && formik.errors.type}
                                            InputProps={{
                                                ...params.InputProps,
                                                style: { fontFamily: "IRANYekan", fontSize: "0.8rem" }
                                            }} {...params} placeholder="تحصیلات" />}
                                         />

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