'use client'
import TextField from "@mui/material/TextField";
import React, {useEffect, useState} from "react";
import {
    Autocomplete,
    DialogContent,
    DialogContentText, FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import {TailSpin} from "react-loader-spinner";
import * as yup from "yup";
import {useFormik} from "formik";
import CircularProgress from '@mui/material/CircularProgress';
import { useSaveOrganizationMutation } from "@/redux/features/organization/OrganizationSlice";
import {
    useLazyGetAllPaymentMethodQuery,
    useLazyGetAllProductQuery,
    useLazyGetAllUnitQuery
} from "@/redux/features/category/CategorySlice";
import { useUploadFileMinioMutation } from "@/redux/features/file/FileSlice";
import { useSaveSalesMutation } from "@/redux/features/sales/SalesSlice";
import AddProduct from "@/components/Panel/sales/AddProduct";
import { Box } from "@material-ui/core";
export default function RegisterFactorDialog(props) {

    const [openAddProduct,setOpenAddProduct] = useState(false)
    const handleOpenAddProduct = () => {
        setOpenAddProduct(true);
    };
    const handleCloseAddProduct = () => {
        setOpenAddProduct(false);
    };

    //product input
    const [product,setProduct] = useState(null)
    const [openProductList,setOpenProductList] = useState(false)
    const [getProductList,{ data : productList  = [] , isLoading : isProductLoading, isError: productIsError }] = useLazyGetAllProductQuery()
    useEffect(()=>{
        if(openProductList){
            getProductList()
        }
    },[openProductList])

    //unit input
    const [unit,setUnit] = useState(null)
    const [openUnitList,setOpenUnitList] = useState(false)
    const [getUnitList,{ data : unitList  = [] , isLoading : isUnitLoading, isError: unitIsError }] = useLazyGetAllUnitQuery()
    useEffect(()=>{
        if(openUnitList){
            getUnitList()
        }
    },[openUnitList])

    const [organization,setOrganization] = useState(null)
    const [uploadedImage,setUploadedImage] = useState("")
    const [uploadFile, { isLoading:isLoadingUpload ,error:errorUpload}] = useUploadFileMinioMutation()

    const [invoiceItemInput,setInvoiceItemInput] = useState([])

    const handleUploadImage = async (event) =>{
        let formData = new FormData();
        formData.append('file', event.target.files[0]);
        const res = await uploadFile(formData)
        if(res.data){
            setUploadedImage(res.data?.fileUrl)
        }
    }
    const handleDeleteUpload = () =>{
        setUploadedImage("")
    }

    // const [paymentMethod,setPaymentMethod] = useState(null)
    // const [openPaymentMethodList,setOpenPaymentMethodList] = useState(false)
    // const [getPaymentMethodList,{ data : paymentMethodList  = [] , isLoading : isPaymentMethodLoading, isError: paymentMethodIsError }] = useLazyGetAllPaymentMethodQuery()
    // useEffect(()=>{
    //     if(openPaymentMethodList){
    //         getPaymentMethodList()
    //     }
    // },[openPaymentMethodList])

    // const handlePaymentMethod = (e,item) =>{
    //     let tempPaymentItems = [...formik.values.paymentItems];
    //     let objIndex = tempPaymentItems.findIndex((payment => payment.bill.id === item.bill.id));
    //     console.log(objIndex)
    //     tempPaymentItems[objIndex].paymentMethod = e.target.value
    //     console.log(tempPaymentItems)
    //     formik.setFieldValue("paymentItems",tempPaymentItems)
    // }



    const handleReset = () =>{
        formik.resetForm()
        setOrganization(null)
    }

    const [submitData, { isLoading:isSubmitLoading ,error}] = useSaveSalesMutation()
    const schema = yup.object().shape({
        receiptCode:yup.string().required("لطفا شماره فاکتور را وارد نمایید "),
        customer:yup.string().required("لطفا نام مشتری را وارد نمایید "),
        
       
    });

    

    const formik = useFormik({
        initialValues: {
            customer:"",
            invoiceItems:[],
            receiptCode:"",
            receiptFile:"",
            description:""
        },

        validationSchema: schema,

        

        onSubmit: async (registerFactor,helpers) => {
            
            let updateRegisterFactor = {...registerFactor,receiptFile:uploadedImage,invoiceItems:invoiceItemInput}
            const userData = await submitData(updateRegisterFactor)
            handleReset()
            props.handleCloseRegisterFactor()
            setInvoiceItemInput([])
        },
    });

    
    return (
        <>
            <Dialog
                fullWidth={true}
                open={props.openRegisterFactor}
                keepMounted
                onClose={()=>{props.handleCloseRegisterFactor();handleReset();setInvoiceItemInput([])}}
                aria-describedby="alert-dialog-slide-description"
                PaperProps={{
                    style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}
                }}>
                <DialogContent>
                    <DialogContentText style={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}}>
                        <div className="flex justify-end">
                            <button onClick={()=>{props.handleCloseRegisterFactor();handleReset();setInvoiceItemInput([])}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 14 14"
                                     fill="none">
                                    <path d="M13 1L1 13M1 1L13 13" stroke="black" stroke-width="2"
                                          stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                        </div>
                        <div className="flex justify-center mb-7">
                            <h3 className="text-[1.1rem]">ثبت فروش</h3>
                        </div>
                        <form className="flex justify-center " onSubmit={formik.handleSubmit} method="POST">
                            <div className="flex flex-col justify-center w-[90%] gap-5">
                                <div className="border-b pb-3 border-gray50">
                                    <TextField
                                        fullWidth
                                        placeholder="مشتری (اجباری)"
                                        type="text"
                                        name="customer"
                                        value={formik.values.customer}
                                        onChange={formik.handleChange}
                                        error={formik.touched.customer && Boolean(formik.errors.customer)}
                                        helperText={formik.touched.customer && formik.errors.customer}
                                        inputProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}}
                                        InputLabelProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}}}/>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div>
                                        <span className="px-2 text-[0.8rem]">لیست محصولات</span>
                                    </div>
                                    
                                    {invoiceItemInput.map((item)=>(
                                        <div className="border border-gray50 px-4 py-3 gap-4 flex flex-col ">

                                            <div className="flex justify-between gap-4">
                                                <div className="flex items-center gap-2 text-sm">
                                                    <div><span>نام محصول :</span></div>
                                                    <div><span className="text-[#29262A] font-semibold">{item?.productName}</span></div>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm">
                                                    <div><span>مقدار :</span></div>
                                                    <div><span className="text-[#29262A] font-semibold">{item?.quantity?.value} {item?.quantity?.unit}</span></div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm">
                                                <div><span>شیوه پرداخت :</span></div>
                                                <div><span className="text-[#29262A] font-semibold">{item?.paymentMethod==="PARDAKHT_NAGHDI"?"پرداخت نقدی در محل تحویل":item?.paymentMethod==="PARDAKHT_BANKI"?"پرداخت با کارت بانکی در محل تحویل":item?.paymentMethod==="PARDAKHT_INTERNETI"?"پرداخت از طریق درگاه اینترنتی":item?.paymentMethod==="CHEK_MODAT_DAR"?"چک مدت دار":item?.paymentMethod==="CHEK"?"چک":item?.paymentMethod==="AGHSATI"?"اقساطی":item?.paymentMethod==="ETEBARI"?"اعتباری":item?.paymentMethod==="SAYER"?"سایر":null}
                                    </span></div>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="flex justify-center">
                                        <button
                                            className="flex text-gray70 items-center bg-white border px-10 py-2 rounded-full md:rounded"
                                            onClick={handleOpenAddProduct}>
                                            <span className="hidden md:inline"> ثبت کالا جدید</span>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                            >
                                                <path
                                                    d="M7 12H17"
                                                    stroke="#797979"
                                                    stroke-width="2"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                />
                                                <path
                                                    d="M12 7V17"
                                                    stroke="#797979"
                                                    stroke-width="2"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <div className="flex justify-between gap-2 items-center border-t pt-4 border-gray50">
                                    <div className="w-[45%]">
                                    <TextField
                                        fullWidth
                                        placeholder="شماره فاکتور (اجباری )"
                                        type="text"
                                        name="receiptCode"
                                        value={formik.values.receiptCode}
                                        onChange={formik.handleChange}
                                        error={formik.touched.receiptCode && Boolean(formik.errors.receiptCode)}
                                        helperText={formik.touched.receiptCode && formik.errors.receiptCode}
                                        inputProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}}
                                        InputLabelProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}}}/>

                                    </div>
                                    <div className="w-[45%]">
                                    {
                                        isLoadingUpload ? (
                                            <div >
                                                <div className="p-4 rounded border border-dashed border-[#D9D9D9]">
                                                    <span className="spinnerLoader"></span>
                                                </div>
                                            </div>
                                        ) : (
                                            uploadedImage !== '' ? (
                                                <div>
                                                    <div className="relative  rounded border border-dashed border-[#D9D9D9]">
                                                        <button onClick={handleDeleteUpload} className="shadow hover:bg-red-400 absolute z-10 top-0 right-0 rounded-full bg-mainRed p-1">
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
                                    
                                </div>
                                <div className="border-b pb-3 border-gray50">
                                    <TextField
                                        fullWidth
                                        placeholder="توضیحات "
                                        type="text"
                                        name="description"
                                        value={formik.values.description}
                                        onChange={formik.handleChange}
                                        inputProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}}
                                        InputLabelProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}}}/>
                                </div>
                                <div className="flex justify-center gap-5 mt-4">
                                <div className="w-1/3 flex items-center justify-center border border-neutral-400 font-bold rounded-[0.5rem]">
                                        <button onClick={()=>{props.handleCloseRegisterFactor(),handleReset();setInvoiceItemInput([]) }} className=" py-3 w-full">انصراف</button>
                                    </div>
                                    <div className="w-1/3">
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
                            </div>
                        </form>
                        <AddProduct invoiceItemInput={invoiceItemInput} setInvoiceItemInput={setInvoiceItemInput}  openAddProduct={openAddProduct} handleCloseAddProduct={handleCloseAddProduct}/>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </>
    )
}