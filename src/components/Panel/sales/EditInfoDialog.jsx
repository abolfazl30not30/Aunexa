'use client'
import TextField from "@mui/material/TextField";
import React, {useEffect, useState} from "react";
import {
    Autocomplete,
    DialogContent,
    DialogContentText,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import {TailSpin} from "react-loader-spinner";
import * as yup from "yup";
import {useFormik} from "formik";

import CircularProgress from '@mui/material/CircularProgress';
import "react-multi-date-picker/styles/colors/red.css"
import {
    useLazyGetAllProductQuery,
    useLazyGetAllUnitQuery,
} from "@/redux/features/category/CategorySlice";
import {styled} from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import { useUpdateSalesMutation } from "@/redux/features/sales/SalesSlice";
import { useUploadFileMinioMutation } from "@/redux/features/file/FileSlice";
import { useDeleteFileMinioMutation } from "@/redux/features/file/FileSlice";
import { ConvertToNull } from "@/helper/ConvertToNull";
import { ConvertToEmpty } from "@/helper/ConvertToEmpty";
import {toast} from "react-toastify";
const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 35,
    height: 18,
    padding: 0,
    display: 'flex',
    '&:active': {
        '& .MuiSwitch-thumb': {
            width: 12,
        },
        '& .MuiSwitch-switchBase.Mui-checked': {
            transform: 'translateX(10px)',
        },
    },
    '& .MuiSwitch-switchBase': {
        padding: 2,
        '&.Mui-checked': {
            transform: 'translateX(17px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: theme.palette.mode === 'dark' ? '#DB3746' : '#DB3746',
            },
        },
    },
    '& .MuiSwitch-thumb': {
        boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
        width: 12,
        height: 13,
        borderRadius: 4,
        transition: theme.transitions.create(['width'], {
            duration: 200,
        }),
    },
    '& .MuiSwitch-track': {
        borderRadius: 16 / 2,
        opacity: 1,
        backgroundColor:
            theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
        boxSizing: 'border-box',
    },
}));

export default function EditInfoDialog(props) {

    //product input
    // const [product,setProduct] = useState(null)
    // const [openProductList,setOpenProductList] = useState(false)
    // const [getProductList,{ data : productList  = [] , isLoading : isProductLoading, isError: productIsError }] = useLazyGetAllProductQuery()
    // useEffect(()=>{
    //     if(openProductList){
    //         getProductList()
    //     }
    // },[openProductList])

    //unit input
    // const [unit,setUnit] = useState(null)
    // const [openUnitList,setOpenUnitList] = useState(false)
    // const [getUnitList,{ data : unitList  = [] , isLoading : isUnitLoading, isError: unitIsError }] = useLazyGetAllUnitQuery()
    // useEffect(()=>{
    //     if(openUnitList){
    //         getUnitList()
    //     }
    // },[openUnitList])
    const [uploadedImage,setUploadedImage] = useState("")
    const [uploadFile, { isLoading:isLoadingUpload ,error:errorUpload}] = useUploadFileMinioMutation()
    const handleUploadImage = async (event) =>{
        let formData = new FormData();
        formData.append('file', event.target.files[0]);
        const res = await uploadFile(formData)
        if(res.data){
            
            setUploadedImage(res.data?.name)
        }
    }
    const [handleDelete ,{isLoadingDelete}] = useDeleteFileMinioMutation()
    const handleDeleteUpload = async (e) =>{
        e.preventDefault()
        const res = await handleDelete(uploadedImage)
       setUploadedImage("")
    } 
    const handleReset = () =>{
        formik.resetForm()
        setUploadedImage("")
        // setProduct(null)
        // setUnit(null)
        // setProduct(null)
    }

    // const handleSetProductInput = (id) =>{
    //     const product = productList.filter((product)=> product.id === id)
    //     setProduct(product[0])
    // }
    // const handleSetUnitInput = (ab) =>{
    //     const units= unitList.filter((unit)=> unit.persianName === ab)
    //     setUnit(units[0])
    // }

    useEffect(()=>{
        // getProductList()
        // getUnitList()
        const editInfoObj = ConvertToEmpty(props.editInfoTarget)
        formik.setValues({
            id:editInfoObj?.id,
            customer:editInfoObj?.customer,
            receiptCode:editInfoObj?.receiptCode,
            description:editInfoObj?.description,
            receiptFile:editInfoObj?.receiptFile,
            
            // unit:props.editInfoTarget?.quantity?.unit,
            // value:props.editInfoTarget?.quantity?.value,
            
            
        })
        setUploadedImage(props.editInfoTarget?.receiptFile)
        // handleSetProductInput(props.editInfoTarget?.billCycle?.productId)
        // handleSetUnitInput(props.editInfoTarget?.quantity?.unit)
    },[props.openEditInfo])

    //submit data
    const [submitData, { isLoading:isSubmitLoading ,error}] = useUpdateSalesMutation()

    const schema = yup.object().shape({
        
        // value: yup.string().required("لطفا مقدار محصول را وارد کنید"),
        // unit: yup.string().required("لطفا واحد محصول را وارد کنید"),
        customer: yup.string().required("لطفا نام مشتری را وارد کنید"),
        receiptCode: yup.string().required("لطفا شماره فاکتور را وارد کنید"),
        
    });


    const formik = useFormik({
        initialValues: {
           id:"",
        //    unit:"",
        //    value:"",
           customer:"",
           receiptCode:"",
           receiptFile:"",
           description:"",
        },

        validationSchema: schema,

        onSubmit: async (product,helpers) => {
            let updateProduct = {...product,id:props.editInfoTarget?.id,receiptFile:uploadedImage}
            updateProduct=ConvertToNull(updateProduct)

            try {
                const userData = await submitData(updateProduct)
                if (userData.error) {
                    if (/.*[a-zA-Z].*/.test(userData.error.data.message)) {
                        throw new Error("سیستم با خطا رو به رو شده است")
                    } else {
                        throw new Error(userData.error.data.message)
                    }
                }
                handleReset()
                props.handleCloseEditInfo()
            } catch (error) {
                toast.error(error.message, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        },
    });

    return (
        <>
            <Dialog
                fullWidth={true}
                open={props.openEditInfo}
                keepMounted
                // onClose={()=>{props.handleCloseEditInfo();handleReset()}}
                aria-describedby="alert-dialog-slide-description"
                PaperProps={{
                    style: {
                        fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189",overflow:"visible"
                    },}}>
                <DialogContent>
                    <DialogContentText style={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}}>
                        <div className="flex justify-end">
                            <button onClick={()=>{props.handleCloseEditInfo();handleReset()}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 14 14"
                                     fill="none">
                                    <path d="M13 1L1 13M1 1L13 13" stroke="black" stroke-width="2"
                                          stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                        </div>
                        <div className="flex justify-center mb-7">
                            <h3 className="text-[1.1rem]">ویرایش  فروش</h3>
                        </div>
                        <form className="flex justify-center " onSubmit={formik.handleSubmit} method="POST">
                            <div className="flex flex-col justify-center w-[90%] gap-5">
                            <div className="flex gap-2">
                            <div className="w-[60%]">
                                        <TextField
                                            fullWidth
                                            placeholder="نام مشتری (اجباری)"
                                            type="text"
                                            name="customer"
                                            value={formik.values.customer}
                                            onChange={formik.handleChange}
                                            error={formik.touched.customer && Boolean(formik.errors.customer)}
                                            helperText={formik.touched.customer && formik.errors.customer}
                                            inputProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}}
                                            InputLabelProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}}}/>
                                    </div>
                                    <div className="w-[40%]">
                                        <TextField
                                            fullWidth
                                            placeholder="شماره فاکتور (اجباری)"
                                            type="text"
                                            name="receiptCode"
                                            value={formik.values.receiptCode}
                                            onChange={formik.handleChange}
                                            error={formik.touched.receiptCode && Boolean(formik.errors.receiptCode)}
                                            helperText={formik.touched.receiptCode && formik.errors.receiptCode}
                                            inputProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}}
                                            InputLabelProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}}}/>
                                    </div>
                            </div>
                            <div>
                            {
                                        isLoadingUpload ? (
                                            <div >
                                                <div className="p-4 rounded border border-dashed border-[#D9D9D9]">
                                                    <span className="spinnerLoader"></span>
                                                </div>
                                            </div>
                                        ) : (
                                             uploadedImage !=="" ? (
                                                <div>
                                                    <div className="relative  rounded border border-dashed border-[#D9D9D9]">
                                                        <button onClick={(e)=>handleDeleteUpload(e)} className="shadow hover:bg-red-400 absolute z-10 top-0 right-0 rounded-full bg-mainRed p-1">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6L18 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                                                        </button>
                                                        <img className="object-cover w-full h-full" src={uploadedImage} alt="uploadedImage"/>
                                                    </div>
                                                </div>
                                            ):(
                                                <div className="">
                                                    <label htmlFor="dropzone-file"
                                                           className="flex  gap-2 items-center cursor-pointer py-4 px-2  rounded border border-dashed border-[#D9D9D9]">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                            <g clip-path="url(#clip0_1834_5537)">
                                                            <path d="M7.99967 5.3335V10.6668M5.33301 8.00016H10.6663M14.6663 8.00016C14.6663 11.6821 11.6816 14.6668 7.99967 14.6668C4.31778 14.6668 1.33301 11.6821 1.33301 8.00016C1.33301 4.31826 4.31778 1.3335 7.99967 1.3335C11.6816 1.3335 14.6663 4.31826 14.6663 8.00016Z" stroke="#9F9F9F" stroke-linecap="round" stroke-linejoin="round"/>
                                                            </g>
                                                            <defs>
                                                            <clipPath id="clip0_1834_5537">
                                                            <rect width="16" height="16" fill="white"/>
                                                            </clipPath>
                                                            </defs>
                                                        </svg>
                                                        <span className="text-xs">
                                                            آپلود فاکتور (اختیاری)
                                                        </span>
                                                        <input id="dropzone-file" type="file" className="hidden"
                                                               onChange={(e) => {
                                                                   handleUploadImage(e)
                                                               }}/>
                                                    </label>
                                                </div>
                                            )
                                        )
                                    }
                            </div>
                            <div className="">
                            <TextField
                                            fullWidth
                                            placeholder="توضیحات "
                                            multiline
                                            minRows={2}
                                            maxRows={2}
                                            type="text"
                                            name="description"
                                            value={formik.values.description}
                                            onChange={formik.handleChange}
                                            error={formik.touched.description && Boolean(formik.errors.description)}
                                            helperText={formik.touched.description && formik.errors.description}
                                            inputProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}}
                                            InputLabelProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}}}/>
                           </div>
                                
                                

                                <div className="mt-6">
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
                                                    className="w-full rounded-[0.5rem] py-3  hover:opacity-80 font-bold  bg-mainRed text-white">ثبت
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