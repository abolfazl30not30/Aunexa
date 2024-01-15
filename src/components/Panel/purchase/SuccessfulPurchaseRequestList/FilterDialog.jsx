'use client'
import TextField from "@mui/material/TextField";
import React, {useState} from "react";
import { Autocomplete, DialogContent, DialogContentText ,FormControlLabel,Checkbox,FormControl,InputLabel,Select,OutlinedInput,MenuItem,Typography} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import {TailSpin} from "react-loader-spinner";
import * as yup from "yup";
import {useFormik} from "formik";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker from "react-multi-date-picker";
import "react-multi-date-picker/styles/colors/red.css"
import CircularProgress from "@mui/material/CircularProgress";
import {useLazyGetAllProductQuery} from "@/redux/features/category/CategorySlice";
import {useEffect} from "react";
import {styled} from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import {
    useLazyGetAllSubOrganizationQuery
 } from "@/redux/features/category/CategorySlice";
 import { useLazyGetAllPaymentMethodQuery } from "@/redux/features/category/CategorySlice";

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

export default function FilterDialog(props) {
    const [fromPurchaseDate,setFromPurchaseDate] = useState("")
    const [toPurchaseDate,setToPurchaseDate] = useState("")
    
    const [subOrganization,setSubOrganization] = useState(null)
    const [openSubOrganizationList,setOpenSubOrganizationList] = useState(false)
    const [getSubOrganizationList,{ data : subOrganizationList  = [] , isLoading : isSubOrganizationLoading, isError: isSubOrganizationError }] = useLazyGetAllSubOrganizationQuery()
    useEffect(()=>{
        if(openSubOrganizationList){
            getSubOrganizationList()
        }
    },[openSubOrganizationList])


    const [paymentMethod,setPaymentMethod] = useState(null)
    const [openPaymentMethodList,setOpenPaymentMethodList] = useState(false)
    const [getPaymentMethodList,{ data : paymentMethodList  = [] , isLoading : isPaymentMethodLoading, isError: isPaymentMethodError }] = useLazyGetAllPaymentMethodQuery()
    useEffect(()=>{
        if(openPaymentMethodList){
            getPaymentMethodList()
        }
    },[openPaymentMethodList])


    const [product,setProduct] = useState(null)
    const [openProductList,setOpenProductList] = useState(false)
    const [getProductList,{ data : productList  = [] , isLoading : isProductLoading, isError: productIsError }] = useLazyGetAllProductQuery()
    useEffect(()=>{
        if(openProductList){
            getProductList()
        }
    },[openProductList])

    const handleFromPurchaseDateInput = (value) => {
        if(value){
            setFromPurchaseDate(value)
            let month = value?.month < 10 ? ('0' + value?.month) : value?.month;
            let day = value?.day < 10 ? ('0' + value?.day) : value?.day;
            let convertDatePurchase = value?.year + '/' + month + '/' + day;
            formik.setFieldValue("fromPurchaseDate", convertDatePurchase)
        }else {
            formik.setFieldValue("fromPurchaseDate", "")
        }
    }
   

    const handleToPurchaseDateInput = (value) => {
        if(value){
            setToPurchaseDate(value)
            let month = value?.month < 10 ? ('0' + value?.month) : value?.month;
            let day = value?.day < 10 ? ('0' + value?.day) : value?.day;
            let convertDatePurchase = value?.year + '/' + month + '/' + day;
            formik.setFieldValue("toPurchaseDate", convertDatePurchase)
        }else {
            formik.setFieldValue("toPurchaseDate", "")
        }
    }
   
    const handleURLSearchParams = (values) =>{
        let params = new URLSearchParams()
        if(values.fromPurchaseDate){
            params.set("fromPurchaseDate",values.fromPurchaseDate)
        }
        if(values.toPurchaseDate){
            params.set("toPurchaseDate",values.toPurchaseDate)
        }
        if(values.productId){
            params.set("productId",values.productId)
        }
        if(values.status){
            params.set("status",values.status)
        }
        if(values.subOrganizationId){
            params.set("subOrganizationId",values.subOrganizationId)
        }if(values.paymentMethod){
            params.set("paymentMethod",values.paymentMethod)
        }if(values.status){
            params.set("status",values.status)
        }
        return params
    }

    const handleResetForm = () =>{
        formik.resetForm()
        setToPurchaseDate("")
        setFromPurchaseDate("")
        
        setProduct(null)
        setSubOrganization(null)
    }
    const formik = useFormik({

        initialValues: {
            fromPurchaseDate: "",
            toPurchaseDate: "",
            productId:"",
            status:"",
            paymentMethod:"",
            subOrganizationId:""
        },

        onSubmit: (values) => {
            let params = handleURLSearchParams(values)
            
            props.setFilterItem(params.toString())
            props.handleCloseFilter()
        },
    });


    return(
        <>
            <Dialog
                fullWidth={true}
                open={props.openFilter}
                // onClose={()=>{props.handleCloseFilter();}}
                keepMounted
                aria-describedby="alert-dialog-slide-description"
                PaperProps={{
                    style: {
                        fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189",overflow:"visible"
                    },
                }}>
                <DialogContent>
                    <DialogContentText style={{ fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189" }}>
                        <div className="flex justify-end">
                            <button onClick={()=>{props.handleCloseFilter(); }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 14 14" fill="none">
                                    <path d="M13 1L1 13M1 1L13 13" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                        </div>
                        <div className="flex justify-center mb-7">
                            <h3 className="text-[1.1rem]">فیلتر کردن</h3>
                        </div>
                        <form className="flex justify-center " onSubmit={formik.handleSubmit} method="POST">
                            <div className="flex flex-col justify-center w-[80%] gap-3">
                                <div>
                                    <span className="text-xs">
                                        تاریخ خرید
                                    </span>
                                </div>
                                <div className="flex flex-col md:flex-row justify-between gap-3">
                                    <div className="w-full md:w-1/2">
                                        <DatePicker
                                            placeholder="از تاریخ"
                                            calendarPosition={`bottom`}
                                            className="red"
                                            maxDate={formik.values.toPurchaseDate}
                                               digits={['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']}
                                            format={`YYYY/MM/DD`}
                                            containerStyle={{
                                                width: "100%"
                                            }}
                                            inputClass={`border border-[#D9D9D9] placeholder-neutral-300 text-gray-900 text-[0.8rem] rounded focus:ring-[#3B82F67F] focus:border-[#3B82F67F] block w-full px-3 py-4`}
                                            value={formik.values.fromPurchaseDate}
                                            onChange={(value) => {
                                              handleFromPurchaseDateInput(value)
                                            }}
                                            mapDays={({date}) => {
                                                let props = {}
                                                let isWeekend = [6].includes(date.weekDay.index)

                                                if (isWeekend)
                                                    props.className = "highlight highlight-red";

                                                return props
                                            }}

                                            weekDays={
                                                [
                                                    ["شنبه", "شنبه"],
                                                    ["یکشنبه", "یکشنبه"],
                                                    ["دوشنبه", "دوشنبه"],
                                                    ["سه شنبه", "سه شنبه"],
                                                    ["چهارشنبه", "چهارشنبه"],
                                                    ["پنجشنبه", "پنجشنبه"],
                                                    ["جمعه", "جمعه"],
                                                ]
                                            }

                                            calendar={persian}
                                            locale={persian_fa}>
                                            <button className="px-2 pb-4" onClick={(e) => {
                                                e.preventDefault()
                                                setFromPurchaseDate("")
                                                formik.setFieldValue("fromPurchaseDate","")
                                            }}>
                                                ریست
                                            </button>
                                        </DatePicker>
                                    </div>
                                    <div className="w-full md:w-1/2">
                                        <DatePicker
                                        minDate={formik.values.fromPurchaseDate}
                                            placeholder="تا تاریخ"
                                            calendarPosition={`bottom`}
                                            className="red"
                                               digits={['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']}
                                            format={`YYYY/MM/DD`}
                                            containerStyle={{
                                                width: "100%"
                                            }}
                                            inputClass={`border border-[#D9D9D9] placeholder-neutral-300 text-gray-900 text-[0.8rem] rounded focus:ring-[#3B82F67F] focus:border-[#3B82F67F] block w-full px-3 py-4`}
                                            value={formik.values.toPurchaseDate}
                                            onChange={(value) => {
                                                handleToPurchaseDateInput(value)
                                            }}
                                            mapDays={({date}) => {
                                                let props = {}
                                                let isWeekend = [6].includes(date.weekDay.index)

                                                if (isWeekend)
                                                    props.className = "highlight highlight-red";

                                                return props
                                            }}

                                            weekDays={
                                                [
                                                    ["شنبه", "شنبه"],
                                                    ["یکشنبه", "یکشنبه"],
                                                    ["دوشنبه", "دوشنبه"],
                                                    ["سه شنبه", "سه شنبه"],
                                                    ["چهارشنبه", "چهارشنبه"],
                                                    ["پنجشنبه", "پنجشنبه"],
                                                    ["جمعه", "جمعه"],
                                                ]
                                            }

                                            calendar={persian}
                                            locale={persian_fa}>
                                            <button className="px-2 pb-4" onClick={(e) => {
                                                e.preventDefault()
                                                setToPurchaseDate("")
                                                formik.setFieldValue("toPurchaseDate","")}}>
                                                ریست
                                            </button>
                                        </DatePicker>
                                    </div>
                                </div>
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
                                            sx: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"},
                                        }}
                                        options={productList}
                                        getOptionLabel={(option) => option.persianName}
                                        value={product}
                                        onChange={(event, newValue) => {
                                            setProduct(newValue)
                                            formik.setFieldValue("productId", newValue?.id)
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
                                                placeholder="نام محصول"
                                            />}
                                    />
                                </div>
                                <div className=" flex flex-col">
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
                                                formik.setFieldValue("subOrganizationId", newValue?.id)
                                                
                                            }}
                                            renderInput={(params) =>
                                                <TextField
                                                    error={formik.touched.subOrganizationId && Boolean(formik.errors.subOrganizationId)}
                                                    helperText={formik.touched.subOrganizationId && formik.errors.subOrganizationId}
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
                                                    placeholder="دپارتمان"
                                                />}
                                        />
                                </div>
                                <div className=" flex flex-col">
                                <FormControl fullWidth >
                                                    <InputLabel id="demo-simple-select-label" sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem",color:"#9F9F9F"}}>شیوه  پرداخت</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={formik.values.paymentMethod}
                                                        onChange={formik.handleChange}
                                                       
                                                        name="paymentMethod"
                                                        input={<OutlinedInput sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}} label="شیوه پرداخت" />}
                                                        sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}
                                                        
                                                    >
                                                        <MenuItem value="" sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}>همه شیوه ها</MenuItem>
                                                        <MenuItem value="PARDAKHT_NAGHDI" sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}>پرداخت نقدی در محل تحویل</MenuItem>
                                                        <MenuItem value="PARDAKHT_BANKI" sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}>پرداخت با کارت بانکی در محل تحویل</MenuItem>
                                                        <MenuItem value="PARDAKHT_INTERNETI" sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}>پرداخت از طریق درگاه اینترنتی</MenuItem>
                                                        <MenuItem value="CHEK_MODAT_DAR" sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}>چک مدت دار</MenuItem>
                                                        <MenuItem value="CHEK" sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}>چک</MenuItem>
                                                        <MenuItem value="AGHSATI" sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}>اقساطی</MenuItem>
                                                        <MenuItem value="ETEBARI" sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}>اعتباری</MenuItem>
                                                        <MenuItem value="SAYER" sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}>سایر</MenuItem>
                                                    </Select>
                                                </FormControl>
                                    
                                </div>
                                <div className=" flex flex-col">
                                <FormControl fullWidth error={formik.touched.status && Boolean(formik.errors.status)}>
                    <InputLabel id="demo-simple-select-label" sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem",color:"#9F9F9F"}}>وضعیت فاکتور</InputLabel>
                            <Select
                                           
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={formik.values.status}
                                name="status"
                                input={<OutlinedInput sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}  label="وضعیت فاکتور" />}
                                sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}
                                onChange={formik.handleChange}>
                                <MenuItem value="" sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}>همه وضعیت ها</MenuItem>
                                <MenuItem value="IN_PROGRESS" sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}>در انتظار تایید</MenuItem>
                                <MenuItem value="FAIL" sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}>رد شده</MenuItem>
                                <MenuItem value="DONE" sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}>تایید شده</MenuItem>
                            </Select>
                                        
                  </FormControl>
                                </div>

                                
                                <div className="mt-4">
                                    <button type="submit"
                                            className="w-full text-[0.9rem] rounded-[0.5rem] py-3  hover:opacity-80 font-bold  bg-mainRed text-white">اعمال فیلتر
                                    </button>
                                    <button disabled type="submit"
                                            className="hidden flex text-[0.9rem] gap-3 items-center justify-center w-full rounded-[0.5rem] py-3  border border-solid border-1 border-neutral-400 font-bold text-textGray bg-neutral-200">
                                        <TailSpin
                                            height="20"
                                            width="20"
                                            color="#4E4E4E"
                                            ariaLabel="tail-spin-loading"
                                            radius="1"
                                            wrapperStyle={{}}
                                            wrapperClass=""
                                            visible={true}/>
                                        اعمال فیلتر
                                    </button>
                                </div>
                            </div>
                        </form>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </>
    )
}