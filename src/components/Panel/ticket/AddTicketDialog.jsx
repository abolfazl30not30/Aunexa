'use client'
import TextField from "@mui/material/TextField";
import React, {useEffect, useState} from "react";
import {Autocomplete, DialogContent, DialogContentText} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import {TailSpin} from "react-loader-spinner";
import * as yup from "yup";
import {useFormik} from "formik";
import CircularProgress from '@mui/material/CircularProgress';
import { useSaveTicketMutation } from "@/redux/features/ticket/TicketSlice";
import {
   useLazyGetAllSubOrganizationQuery
} from "@/redux/features/category/CategorySlice";
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';

export default function AddTicketDialog(props) {
  
    const blue = {
        100: '#DAECFF',
        200: '#b6daff',
        400: '#3399FF',
        500: '#007FFF',
        600: '#0072E5',
        900: '#003A75',
      };
    
      const grey = {
        50: '#F3F6F9',
        100: '#E5EAF2',
        200: '#DAE2ED',
        300: '#C7D0DD',
        400: '#B0B8C4',
        500: '#9DA8B7',
        600: '#6B7A90',
        700: '#434D5B',
        800: '#303740',
        900: '#1C2025',
      };
      const Textarea = styled(BaseTextareaAutosize)(
        ({ theme }) => `
        width:100%;
        font-family: __fonts_2f4189,__fonts_Fallback_2f4189;
        font-size: 0.875rem;
        font-weight: 400;
        line-height: 1.5;
        padding: 8px 12px;
        border-radius: 8px;
        color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
        background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
        border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
        
      `,
      );
    

    const [subOrganization,setSubOrganization] = useState(null)
    const [openSubOrganizationList,setOpenSubOrganizationList] = useState(false)
    const [getSubOrganizationList,{ data : subOrganizationList  = [] , isLoading : isSubOrganizationLoading, isError: isSubOrganizationError }] = useLazyGetAllSubOrganizationQuery()
    useEffect(()=>{
        if(openSubOrganizationList){
            getSubOrganizationList()
        }
    },[openSubOrganizationList])
  
    const handleReset = () =>{
        formik.resetForm()
        setSubOrganization(null)
        
    }

    const [submitData, { isLoading:isSubmitLoading ,error}] = useSaveTicketMutation()
    const schema = yup.object().shape({
        title: yup.string().required("لطفا موضوع پیام را مشخص کنید"),
        targetDepartmentId: yup.string().required("لطفا دپارتمان مورد نظر را انتخاب کنید"),
    
        
        
    });

    const formik = useFormik({
        initialValues: {
            title:"",
            targetDepartmentId: "",
            
            
        },
      
        

        validationSchema: schema,

        onSubmit: async (tiket,helpers) => {
            let updateTiket = {...tiket}
            
            const userData = await submitData(updateTiket)
            handleReset()
            props.handleCloseAddTicket()
            
        },
    });
    

    
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
                        fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189",
                    },
                }}>
                <DialogContent>
                    <DialogContentText style={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}}>
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
                            <div className="flex flex-col  w-[90%] gap-8">
                                     
                                    <div className=" space-y-2" >
                                    <div>
                                        <span className="text-gray60 text-sm">
                                            واحد مربوطه
                                        </span>
                                     </div>
                                    <Autocomplete
                                            open={openSubOrganizationList}
                                            onOpen={() => {
                                                setOpenSubOrganizationList(true);
                                            }}
                                            onClose={() => {
                                                setOpenSubOrganizationList(false);
                                            }}
                                            fullWidth
                                            clearOnEscape
                                            disablePortal
                                            id="combo-box-demo"
                                            ListboxProps={{
                                                sx: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"},
                                            }}
                                            options={subOrganizationList}
                                            getOptionLabel={(option) => option.name}
                                            value={subOrganization}
                                            onChange={(event, newValue) => {
                                                setSubOrganization(newValue)
                                                formik.setFieldValue("targetDepartmentId", newValue?.id)
                                                formik.setFieldValue("sourceSubOrganizationName", newValue?.name)
                                            }}
                                            renderInput={(params) =>
                                                <TextField
                                                    error={formik.touched.targetDepartmentId && Boolean(formik.errors.targetDepartmentId)}
                                                    helperText={formik.touched.targetDepartmentId && formik.errors.targetDepartmentId}
                                                    {...params}
                                                    InputProps={{
                                                        ...params.InputProps,
                                                        style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"},
                                                        endAdornment: (
                                                            <React.Fragment>
                                                                {isSubOrganizationLoading ?
                                                                    <CircularProgress color="inherit"
                                                                                      size={20}/> : null}
                                                                {params.InputProps.endAdornment}
                                                            </React.Fragment>
                                                        )
                                                    }}
                                                    placeholder="به دپارتمان"
                                                />}
                                        />

                                    </div>
                                    <div className="space-y-2 ">
                                    <div>
                                        <span className="text-gray60 text-sm">
                                             عنوان
                                        </span>
                                     </div>
                                    <TextField
                                        fullWidth
                                        placeholder="موضوع پیام (اجباری)"
                                        type="text"
                                        name="title"
                                        value={formik.values.title}
                                        onChange={formik.handleChange}
                                        error={formik.touched.title && Boolean(formik.errors.title)}
                                        helperText={formik.touched.title && formik.errors.title}
                                        inputProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}}
                                            InputLabelProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}}}/>
                                    </div>
                                    <div  className="space-y-2 ">
                                    <div >
                                        <span className="text-gray60 text-sm">
                                             متن پیام
                                        </span>
                                     </div>
                                        <Textarea aria-label="minimum height" minRows={10} />
                                    </div>
                                    
                                
                                <div className="mt-16">
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