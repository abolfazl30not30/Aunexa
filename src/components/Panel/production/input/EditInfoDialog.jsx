
'use client'
import TextField from "@mui/material/TextField";
import React, {useEffect, useState} from "react";
import {
    Autocomplete,
    DialogContent,
    DialogContentText,
    FormControl,
    InputLabel,
    MenuItem, OutlinedInput,
    Select,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import {TailSpin} from "react-loader-spinner";
import * as yup from "yup";
import {useFormik} from "formik";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker, {DateObject} from "react-multi-date-picker";
import CircularProgress from '@mui/material/CircularProgress';
import "react-multi-date-picker/styles/colors/red.css"
import {
    useLazyGetAllProductQuery,
    useLazyGetAllUnitQuery,
    useLazyGetAllVehicleQuery
} from "@/redux/features/category/CategorySlice";
import { useUpdateProductionInputMutation } from "@/redux/features/production/input/ProductionInputSlice";
import {
    useLazyGetOneVehiclesByCodeQuery,
    useLazyGetOneVehiclesByTagQuery
} from "@/redux/features/vehicles-and-equipment/VehiclesAndEquipmentSlice";
import { PersianToEnglish } from "@/helper/PersianToEnglish";
export default function EditInfoDialog(props) {
  

    //product input
    const [product,setProduct] = useState(null)
    const [openProductList,setOpenProductList] = useState(false)
    const [getProductList,{ data : productList  = [] , isLoading : isProductLoading, isError: productIsError }] = useLazyGetAllProductQuery()
    useEffect(()=>{
        if(openProductList){
            getProductList()
        }
    },[openProductList])



    const [producedProduct,setProducedProduct] = useState(null)
    const [openProducedProductList,setOpenProducedProductList] = useState(false)
    const [getProducedProductList,{ data : ProducedProductList  = [] , isLoading : isProducedProductLoading, isError: producedProductIsError }] = useLazyGetAllProductQuery()
    useEffect(()=>{
        if(openProducedProductList){
            getProducedProductList()
        }
    },[openProducedProductList])
    //unit input
    const [unit,setUnit] = useState(null)
    const [openUnitList,setOpenUnitList] = useState(false)
    const [getUnitList,{ data : unitList  = [] , isLoading : isUnitLoading, isError: unitIsError }] = useLazyGetAllUnitQuery()
    useEffect(()=>{
        if(openUnitList){
            getUnitList()
        }
    },[openUnitList])


    // //vehicle input
    // const [vehicle,setVehicle] = useState(null)
    // const [openVehicleList,setOpenVehicleList] = useState(false)
    // const [getVehicleList,{ data : vehicleList  = [] , isLoading : isVehicleLoading, isError: VehicleIsError }] = useLazyGetAllVehicleQueryGet()
    // useEffect(()=>{
    //     if(openVehicleList){
    //         getVehicleList()
    //     }
    // },[openVehicleList])

    //date input
   

    //machineTag input
   

    const handleReset = () =>{
        formik.resetForm()
        setProducedProduct(null)
        setProduct(null)
        setUnit(null)
        
    }

    //submit data
    const [submitData, { isLoading:isSubmitLoading ,error}] = useUpdateProductionInputMutation()

  

    const schema = yup.object().shape({
        productId: yup.string().required("لطفا نام محصول را وارد کنید"),
        value: yup.string().required("لطفا مقدار محصول را وارد کنید").matches(
            /^[۰۱۲۳۴۵۶۷۸۹0.-9]+$/,
            "لطفا فقط عدد وارد نمایید"
          ),
        unit: yup.string().required("لطفا واحد محصول را وارد کنید"),
        producedProductId: yup.string().required("لطفا محصول تولیدی را وارد کنید"),
    });

    const formik = useFormik({
        initialValues: {
            productId: "",
            productName:"",
            value: "",
            unit: "",
            producedProductId:"",
            producedProductName:""
        },

        

        validationSchema: schema,

        onSubmit: async (product,helpers) => {
            let updateProduct = {...product,value:PersianToEnglish(`${product.value}`)}

           

            const userData = await submitData(updateProduct)
            handleReset()
            props.handleCloseEditInfo()
        },
    });
//setData
    const handleSetProductInput = (id) =>{
        const product = productList.filter((product)=> product.id === id)
        setProduct(product[0])
    }
    const handleSetProducedProductInput = (id) =>{
        const producedProduct = ProducedProductList.filter((producedProduct)=> producedProduct.id === id)
        setProducedProduct(producedProduct[0])
    }
    const handleSetUnitInput = (ab) =>{
        const units= unitList.filter((unit)=> unit.persianName === ab)
        setUnit(units[0])
    }

    
    

    useEffect(()=>{
        getProductList()
        getUnitList()
        formik.setValues({
            id:props.editInfoTarget?.id,
            productId: props.editInfoTarget?.productId,
            productName:props.editInfoTarget?.productName,
            producedProductId: props.editInfoTarget?.producedProductId,
            producedProductName:props.editInfoTarget?.producedProductName,
            value: props.editInfoTarget?.value,
            unit: props.editInfoTarget?.unit,
          
        })
        handleSetProductInput(props.editInfoTarget?.productId)
        handleSetProducedProductInput(props.editInfoTarget?.producedProductId)
        handleSetUnitInput(props.editInfoTarget?.unit)
        
    },[props.openEditInfo])

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
                        fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189",
                    },
                }}>
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
                            <h3 className="text-[1.1rem]">ویرایش  ورودی</h3>
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
                                <div className=" flex flex-col">
                                    <Autocomplete
                                        open={openProducedProductList}
                                        onOpen={() => {
                                            setOpenProducedProductList(true);
                                        }}
                                        onClose={() => {
                                            setOpenProducedProductList(false);
                                        }}
                                        fullWidth
                                        clearOnEscape
                                        disablePortal
                                        id="combo-box-demo"
                                        ListboxProps={{
                                            sx: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"},
                                        }}
                                        options={ProducedProductList}
                                        getOptionLabel={(option) => option.persianName}
                                        value={producedProduct}
                                        onChange={(event, newValue) => {
                                            setProducedProduct(newValue)
                                            formik.setFieldValue("producedProductId", newValue?.id)
                                            formik.setFieldValue("producedProductName", newValue?.persianName)
                                        }}
                                        renderInput={(params) =>
                                            <TextField
                                                error={formik.touched.producedProductId && Boolean(formik.errors.producedProductId)}
                                                helperText={formik.touched.producedProductId && formik.errors.producedProductId}
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
                                                placeholder="محصول تولیدی (اجباری)"
                                            />}
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
                                            ویرایش
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