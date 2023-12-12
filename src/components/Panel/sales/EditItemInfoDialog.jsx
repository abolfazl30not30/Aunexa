'use client'
import TextField from "@mui/material/TextField";
import React, {useEffect, useState} from "react";
import {
    Autocomplete,
    DialogContent,
    DialogContentText,
    FormControl,
    InputLabel,
    Select,
    OutlinedInput,
    MenuItem
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
import { useUpdateSalesItemMutation } from "@/redux/features/sales/SalesSlice";
import { PersianToEnglish } from "@/helper/PersianToEnglish";



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

export default function EditItemInfoDialog(props) {

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
   
    const handleReset = () =>{
        formik.resetForm()
        setProduct(null)
        setUnit(null)
        
    }
    const schema = yup.object().shape({
        
        value: yup.string().required("لطفا مقدار محصول را وارد کنید").matches(
            /^[۰۱۲۳۴۵۶۷۸۹0.-9]+$/,
            "لطفا فقط عدد وارد نمایید"
          ),
        unit: yup.string().required("لطفا واحد محصول را وارد کنید"),
        productId: yup.string().required("لطفا نام محصول را وارد کنید"),
        paymentMethod: yup.string().required("لطفا شیوه پرداخت  را وارد کنید"),
        
       
   });
   const formik = useFormik({
    initialValues: {
       id:"",
       unit:"",
       value:"",
       paymentMethod:"",
       productId: "",
       productName:"",
       productImage:""
      
    },

    validationSchema: schema,

    onSubmit: async (product,helpers) => {
        let updateProduct = {...product,quantity:{unit:formik.values.unit,value:PersianToEnglish(`${formik.values.value}`)},productImage:props.editInfoItemTarget?.imageURL}
        const userData = await submitData(updateProduct)
        handleReset()
        props.handleCloseEditItemInfo()
    },
});
    const handleSetProductInput = (id) =>{
        const product = productList.filter((product)=> product.id === id)
        setProduct(product[0])
    }
    const handleSetUnitInput = (ab) =>{
        const units= unitList.filter((unit)=> unit.persianName === ab)
        setUnit(units[0])
    }

    useEffect(()=>{
        getProductList()
        getUnitList()
        formik.setValues({
            id:props.editInfoItemTarget?.id,
            productId: props.editInfoItemTarget?.productId,
            unit:props.editInfoItemTarget?.quantity?.unit,
            value:props.editInfoItemTarget?.quantity?.value,
            paymentMethod:props.editInfoItemTarget?.paymentMethod,
            productName:props.editInfoItemTarget?.productName
            
            
        })
        handleSetProductInput(props.editInfoItemTarget?.productId)
        handleSetUnitInput(props.editInfoItemTarget?.quantity?.unit)
        
    },[props.openEditItemInfo])

    //submit data
    const [submitData, { isLoading:isSubmitLoading ,error}] = useUpdateSalesItemMutation()

    


    

    return (
        <>
            <Dialog
                fullWidth={true}
                open={props.openEditItemInfo}
                keepMounted
                // onClose={()=>{props.handleCloseEditItemInfo();handleReset()}}
                aria-describedby="alert-dialog-slide-description"
                PaperProps={{
                    style: {
                        fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189",
                    },}}>
                <DialogContent>
                    <DialogContentText style={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}}>
                        <div className="flex justify-end">
                            <button onClick={()=>{props.handleCloseEditItemInfo();handleReset()}}>
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
                            
                                    <div>
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
                                            sx: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"},
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
                                                    style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"},
                                                    endAdornment:(
                                                        <React.Fragment>
                                                            {isProductLoading ? <CircularProgress color="inherit" size={20} /> : null}
                                                            {params.InputProps.endAdornment}
                                                        </React.Fragment>
                                                    )
                                                }}
                                                placeholder="نوع محصول (اجباری)"
                                            />}/>
                                    </div>
                                    <div className="flex w-full">
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
                                            inputProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}}
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
                                                sx: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"},
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
                                                        style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}
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