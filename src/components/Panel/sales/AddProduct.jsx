'use client'
import TextField from "@mui/material/TextField";
import React, {useEffect, useState} from "react";
import {
    Autocomplete,
    DialogContent,
    DialogContentText,
    FormControl,
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
import {useLazyGetAllProductQuery, useLazyGetAllUnitQuery} from "@/redux/features/category/CategorySlice";
import {useUploadFileCloudMutation} from "@/redux/features/file/FileSlice";
import {
    useSavePendingPurchaseRequestListMutation
} from "@/redux/features/purchase/pending-purchase-request-list/PendingPurchaseRequestListSlice";

export default function AddProduct(props) {

    //product input
    const [product, setProduct] = useState(null)
    const [openProductList, setOpenProductList] = useState(false)
    const [getProductList, {
        data: productList = [],
        isLoading: isProductLoading,
        isError: productIsError
    }] = useLazyGetAllProductQuery()
    useEffect(() => {
        if (openProductList) {
            getProductList()
        }
    }, [openProductList])

    //unit input
    const [unit, setUnit] = useState(null)
    const [openUnitList, setOpenUnitList] = useState(false)
    const [getUnitList, {
        data: unitList = [],
        isLoading: isUnitLoading,
        isError: unitIsError
    }] = useLazyGetAllUnitQuery()
    useEffect(() => {
        if (openUnitList) {
            getUnitList()
        }
    }, [openUnitList])

   
    // const [uploadedImage, setUploadedImage] = useState("")
    // const [uploadFile, {isLoading: isLoadingUpload, error: errorUpload}] = useUploadFileCloudMutation()
    // const [invoiceItemInput, setInvoiceItemInput] = useState([
    //     {
    //         productId: "",
    //         productName: "",
    //         productImage: "",
    //     }
    // ])

    // const handleUploadImage = async (event) => {
    //     let formData = new FormData();
    //     formData.append('file', event.target.files[0]);
    //     const res = await uploadFile(formData)
    //     if (res.data) {
    //         setUploadedImage(res.data?.fileUrl)
    //     }
    // }
    // const handleDeleteUpload = () => {
    //     setUploadedImage("")
    // }



    const handleReset = () => {
        formik.resetForm()
        setProduct(null)
        setUnit(null)
    }

    const [submitData, {isLoading: isSubmitLoading, error}] = useSavePendingPurchaseRequestListMutation()
    const schema = yup.object().shape({
        productId: yup.string().required("لطفا نام محصول را وارد کنید"),
        paymentMethod: yup.string().required("لطفا شيوه پرداخت را انتخاب كنيد"),
        value: yup.string().required("لطفا مقدار محصول را وارد کنید"),
        unit: yup.string().required("لطفا واحد محصول را وارد کنید"),
    });
    

    const formik = useFormik({
        initialValues: {
            productId: "",
            productName: "",
            productImage: "",
            paymentMethod: "",
            unit: "",
            value: ""
        },

        validationSchema: schema,

        onSubmit: async (product, helpers) => {
            const updateInvoiceItems = [...props.invoiceItemInput]
            let newProduct = {
                productId: product.productId,
                productName: product.productName,
                productImage: product.productImage,
                paymentMethod: product.paymentMethod,
                quantity:{
                    unit: product.unit,
                    value: product.value
                }
            }
            updateInvoiceItems.push(newProduct)
            props.setInvoiceItemInput(updateInvoiceItems)
            handleReset()
            props.handleCloseAddProduct()
        },
    });

    return (
        <>
            <Dialog
                fullWidth={true}
                open={props.openAddProduct}
                keepMounted
                // onClose={() => {
                //     props.handleCloseAddProduct();
                //     handleReset()
                // }}
                aria-describedby="alert-dialog-slide-description"
                PaperProps={{
                    style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}
                }}>
                <DialogContent>
                    <DialogContentText style={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}}>
                        <div className="flex justify-end">
                            <button onClick={() => {
                                props.handleCloseAddProduct();
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
                            <h3 className="text-[1.1rem]">افرودن محصول</h3>
                        </div>
                        <form className="flex justify-center " onSubmit={formik.handleSubmit} method="POST">
                            <div className="flex flex-col justify-center w-[90%] gap-5">
                                <div className=" flex flex-col">
                                    <Autocomplete
                                        open={openProductList}
                                        onOpen={() => {
                                            setOpenProductList(true);
                                        }}
                                        onClose={() => {
                                            setOpenProductList(false);
                                        }}
                                        fullWidth
                                        clearOnEscape
                                        disablePortal
                                        id="combo-box-demo"
                                        ListboxProps={{
                                            sx: {
                                                fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189",
                                                fontSize: "0.8rem"
                                            },
                                        }}
                                        options={productList}
                                        getOptionLabel={(option) => option.persianName}
                                        value={product}
                                        onChange={(event, newValue) => {
                                            setProduct(newValue)
                                            formik.setFieldValue("productId", newValue?.id)
                                            formik.setFieldValue("productName", newValue?.persianName)
                                        }}
                                        renderInput={(params) =>
                                            <TextField
                                                error={formik.touched.productId && Boolean(formik.errors.productId)}
                                                helperText={formik.touched.productId && formik.errors.productId}
                                                {...params}
                                                InputProps={{
                                                    ...params.InputProps,
                                                    style: {
                                                        fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189",
                                                        fontSize: "0.8rem"
                                                    },
                                                    endAdornment: (
                                                        <React.Fragment>
                                                            {isProductLoading ?
                                                                <CircularProgress color="inherit" size={20}/> : null}
                                                            {params.InputProps.endAdornment}
                                                        </React.Fragment>
                                                    )
                                                }}
                                                placeholder="نوع محصول (اجباری)"
                                            />}
                                    />
                                </div>
                                <div className="flex">
                                    <div className="w-[70%]">
                                        <TextField
                                            fullWidth
                                            placeholder="مقدار (اجباری)"
                                            type="text"
                                            name="value"
                                            value={formik.values.value}
                                            onChange={formik.handleChange}
                                            error={formik.touched.value && Boolean(formik.errors.value)}
                                            helperText={formik.touched.value && formik.errors.value}
                                            inputProps={{
                                                style: {
                                                    fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189",
                                                    fontSize: "0.8rem"
                                                }
                                            }}
                                            InputLabelProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}}}/>
                                    </div>
                                    <div className="w-[30%]">
                                        <Autocomplete
                                            open={openUnitList}
                                            onOpen={() => {
                                                setOpenUnitList(true);
                                            }}
                                            onClose={() => {
                                                setOpenUnitList(false);
                                            }}
                                            fullWidth
                                            disablePortal
                                            id="combo-box-demo"
                                            ListboxProps={{
                                                sx: {
                                                    fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189",
                                                    fontSize: "0.8rem"
                                                },
                                            }}
                                            options={unitList}
                                            getOptionLabel={(option) => option.persianName}
                                            value={unit}
                                            onChange={(event, newValue) => {
                                                setUnit(newValue)
                                                formik.setFieldValue("unit", newValue?.persianName)
                                            }}
                                            renderInput={(params) =>
                                                <TextField
                                                    {...params}
                                                    error={formik.touched.unit && Boolean(formik.errors.unit)}
                                                    helperText={formik.touched.unit && formik.errors.unit}
                                                    InputProps={{
                                                        ...params.InputProps,
                                                        style: {
                                                            fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189",
                                                            fontSize: "0.8rem"
                                                        }
                                                    }}
                                                    placeholder="واحد"
                                                />}/>
                                    </div>
                                </div>
                                <div>
                                    <FormControl fullWidth
                                                 error={formik.touched.paymentMethod && Boolean(formik.errors.paymentMethod)}>
                                        <InputLabel id="demo-simple-select-label" sx={{
                                            fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189",
                                            fontSize: "0.8rem",
                                            color: "#9F9F9F"
                                        }}>شیوه پرداخت</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={formik.values.paymentMethod}
                                            onChange={formik.handleChange}
                                            name="paymentMethod"
                                            input={<OutlinedInput sx={{
                                                fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189",
                                                fontSize: "0.8rem"
                                            }} label="شیوه پرداخت"/>}
                                            sx={{
                                                fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189",
                                                fontSize: "0.8rem"
                                            }}
                                        >

                                            <MenuItem value="PARDAKHT_NAGHDI" sx={{
                                                fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189",
                                                fontSize: "0.8rem"
                                            }}>پرداخت نقدی در محل تحویل</MenuItem>
                                            <MenuItem value="PARDAKHT_BANKI" sx={{
                                                fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189",
                                                fontSize: "0.8rem"
                                            }}>پرداخت با کارت بانکی در محل تحویل</MenuItem>
                                            <MenuItem value="PARDAKHT_INTERNETI" sx={{
                                                fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189",
                                                fontSize: "0.8rem"
                                            }}>پرداخت از طریق درگاه اینترنتی</MenuItem>
                                            <MenuItem value="CHEK_MODAT_DAR" sx={{
                                                fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189",
                                                fontSize: "0.8rem"
                                            }}>چک مدت دار</MenuItem>
                                            <MenuItem value="CHEK" sx={{
                                                fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189",
                                                fontSize: "0.8rem"
                                            }}>چک</MenuItem>
                                            <MenuItem value="AGHSATI" sx={{
                                                fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189",
                                                fontSize: "0.8rem"
                                            }}>اقساطی</MenuItem>
                                            <MenuItem value="ETEBARI" sx={{
                                                fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189",
                                                fontSize: "0.8rem"
                                            }}>اعتباری</MenuItem>
                                            <MenuItem value="SAYER" sx={{
                                                fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189",
                                                fontSize: "0.8rem"
                                            }}>سایر</MenuItem>
                                        </Select>
                                    </FormControl>
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