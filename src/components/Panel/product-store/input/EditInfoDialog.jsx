
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
    useLazyGetAllProductQuery, useLazyGetAllSubOrganizationQuery,
    useLazyGetAllUnitQuery,
    useLazyGetAllVehicleListQuery,  useLazyGetAllMachineQuery,
} from "@/redux/features/category/CategorySlice";
import {
    useLazyGetOneVehiclesByCodeQuery,
    useLazyGetOneVehiclesByTagQuery
} from "@/redux/features/vehicles-and-equipment/VehiclesAndEquipmentSlice";
import {useUpdatePSOMutation} from "@/redux/features/primary-store/output/PSOapiSlice";
import {useUpdateESOMutation} from "@/redux/features/equipment-store/output/ESOapiSlice";
import {useUpdatePOSIMutation} from "@/redux/features/product-store/input/POSIapiSlice";
import { PersianToEnglish } from "@/helper/PersianToEnglish";
import { ConvertToNull } from "@/helper/ConvertToNull";
import { ConvertToEmpty } from "@/helper/ConvertToEmpty";
import {toast} from "react-toastify";
export default function EditInfoDialog(props) {
    const alphabeticalList = [
        {value: "هیچ کدام"},
        {value: "ا"},
        {value: "ب"},
        {value: "پ"},
        {value: "ت"},
        {value: "ث"},
        {value: "ج"},
        {value: "ح"},
        {value: "د"},
        {value: "ر"},
        {value: "ز"},
        {value: "ژ"},
        {value: "س"},
        {value: "ش"},
        {value: "ص"},
        {value: "ض"},
        {value: "ط"},
        {value: "ظ"},
        {value: "ع"},
        {value: "ف"},
        {value: "ق"},
        {value: "ک"},
        {value: "گ"},
        {value: "ل"},
        {value: "م"},
        {value: "ن"},
        {value: "و"},
        {value: "ه"},
        {value: "ی"},
        {value: "D"},
        {value: "S"},
    ]

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

    //subOrganization input
    const [subOrganization,setSubOrganization] = useState(null)
    const [openSubOrganizationList,setOpenSubOrganizationList] = useState(false)
    const [getSubOrganizationList,{ data : subOrganizationList  = [] , isLoading : isSubOrganizationLoading, isError: isSubOrganizationError }] = useLazyGetAllSubOrganizationQuery()
    useEffect(()=>{
        if(openSubOrganizationList){
            getSubOrganizationList()
        }
    },[openSubOrganizationList])
//machine code 


const [machine,setMachine] = useState(null)
const [openMachineList,setOpenMachineList] = useState(false)

const [getMachineList,
   { data:machineList = {content:[{}]},
    isLoading: isMachineLoading,
    isError: isMachineError,}
 ] = useLazyGetAllMachineQuery( 
    
  );
  useEffect(()=>{
    if(openMachineList){
        getMachineList()
    }
},[openMachineList])
    // //vehicle input
    // const [vehicle,setVehicle] = useState(null)
    // const [openVehicleList,setOpenVehicleList] = useState(false)
    // const [getVehicleList,{ data : vehicleList  = [] , isLoading : isVehicleLoading, isError: VehicleIsError }] = useLazyGetAllVehicleListQueryGet()
    // useEffect(()=>{
    //     if(openVehicleList){
    //         getVehicleList()
    //     }
    // },[openVehicleList])

    //date input
    const [date,setDate] = useState("")
    const handleDateInput = (value) => {
        if(value!==null){
            setDate(value)
            let month = value?.month < 10 ? ('0' + value?.month) : value?.month;
            let day = value?.day < 10 ? ('0' + value?.day) : value?.day;
            let convertDate = value?.year + '/' + month + '/' + day;
            formik.setFieldValue("expirationDate", convertDate)
        }else {
            formik.setFieldValue("expirationDate", null)
        }
    }

    //machineTag input
    const [machineTag, setmachineTag] = useState({
        part1: "",
        part2: "",
        part3: "",
        part4: "",
    })
    useEffect(()=>{
        const machineTagString = machineTag.part4 + machineTag.part2  + machineTag.part1  + machineTag.part3
        console.log(machineTagString)
        formik.setFieldValue("machineTag", machineTagString)
    },[machineTag])

    const handlemachineTag = (e) => {
        if (e.target.name === "part1") {
            setmachineTag((co) => ({...co, part1: e.target.value}))
        } else if (e.target.name === "part2") {
            setmachineTag((co) => ({...co, part2: e.target.value}))
        } else if (e.target.name === "part3") {
            if(e.target.value!=="هیچ کدام"){
             setmachineTag((co) => ({...co, part3: e.target.value}))
            }else{
             setmachineTag((co) => ({...co, part3: ""}))
            }
         } else if (e.target.name === "part4") {
            setmachineTag((co) => ({...co, part4: e.target.value}))
        }
    }
    const validate = (values, props) => {
        const errors = {};

        if (!values.machineTag && !values.machineCode) {
            errors.machineTag = "لطفا پلاک یا کد وسیله نقلیه را وارد کنید";
        } else if (!values.machineCode && values.machineTag) {
            if (!/[۰۱۲۳۴۵۶۷۸۹0-9]{7}./.test(values.machineTag)) {
                errors.machineTag = 'لطفا پلاک  وسیله نقلیه را به صورت صحیح و کامل وارد کنید';
            }
        }if(product?.isExpirable && !values.expirationDate){
            errors.expirationDate="لطفا تاریخ انقضا را وارد نمایید"
        }

        return errors;
    };


    const handleReset = () =>{
        formik.resetForm()
        setDate("")
        setMachine(null)
        setProduct(null)
        setUnit(null)
        setSubOrganization(null)
        setmachineTag({
            part1: "",
            part2: "",
            part3: "",
            part4: ""})
    }

    //submit data
    const [submitData, { isLoading:isSubmitLoading ,error}] = useUpdatePOSIMutation()

    const [getVehicleByTag,{ data : vehicleByTag  = {} , isLoading : isVehicleByTagLoading, isError: isVehicleByTagError }] = useLazyGetOneVehiclesByTagQuery()

    const [getVehicleByCode,{ data : vehicleByCode  = {} , isLoading : isVehicleByCodeLoading, isError: isVehicleByCodeError }] = useLazyGetOneVehiclesByCodeQuery()
    const [isExpirable,setIsExpirable]=useState()
    const schema = yup.object().shape({
        productId: yup.string().required("لطفا نام محصول را وارد کنید"),
        value: yup.string().required("لطفا مقدار محصول را وارد کنید").matches(
            /^[۰۱۲۳۴۵۶۷۸۹0.-9]+$/,
            "لطفا فقط عدد وارد نمایید"
          ),
        unit: yup.string().required("لطفا واحد محصول را وارد کنید"),
        driverName: yup.string().required("لطفا نام راننده را وارد کنید"),
        sourceSubOrganizationId: yup.string().required("لطفا دپارتمان مورد نظر را انتخاب کنید"),
    });

    const formik = useFormik({
        initialValues: {
            productId: "",
            productName: "",
            value: "",
            unit: "",
            expirationDate: "",
            machineTag: "",
            machineCode: "",
            driverName: "",
            sourceOrganizationId:"",
            sourceSubOrganizationId: "",
            sourceSubOrganizationName: "",
            description: "",
        },

        validate: validate,

        validationSchema: schema,

        onSubmit: async (product,helpers) => {
            let updateProduct = {...product,status:props.editInfoTarget?.status,value:PersianToEnglish(`${product.value}`)}

            if(product.machineTag !== ""){
                const res = await getVehicleByTag(product.machineTag)
                if(res?.status !== "rejected"){
                    updateProduct = {...updateProduct,machineType:res.data.type,machineId:res.data.id}
                    console.log(updateProduct)
                }else {
                    updateProduct = {...updateProduct,machineType:"نا معلوم",machineId:""}
                }
            }else if(product.machineCode !== ""){
                const res = await getVehicleByCode(product.machineCode)
                if(res?.status !== "rejected"){
                    updateProduct = {...updateProduct,machineType:res.data.type,machineId:res.data.id}
                    console.log(updateProduct)
                }else {
                    updateProduct = {...updateProduct,machineType:"نا معلوم",machineId:""}
                }
            }
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
//setData
    const handleSetProductInput = (id) =>{
        const product = productList.filter((product)=> product.id === id)
        setProduct(product[0])
    }
    const handleSetMachineInput = (code) =>{
        const machine = machineList.content.filter((machine)=> machine.code === code)
        setMachine(machine[0])
    }
    const handleSetSubOrganizationInput = (id) =>{
        const subOrg = subOrganizationList.filter((org)=> org.id === id)
        setSubOrganization(subOrg[0])
    }

    const handleSetUnitInput = (ab) =>{
        const units= unitList.filter((unit)=> unit.persianName === ab)
        setUnit(units[0])
    }

    const handleSetMachineTagInput = (machineTag) =>{
        if(machineTag !== null) {
            const tag = {
                part1: machineTag.slice(5, 7),
                part2: machineTag.slice(2, 5),
                part3: machineTag.slice(7, 8),
                part4: machineTag.slice(0, 2)
            }
            setmachineTag(tag)
        }
    }
    const handleSetExpirationDate = (date)=>{
        if( date !==null && date !=="" ){
            const newDate = new DateObject({
                date: date,
                format: "YYYY/MM/DD",
                calendar: persian,
                locale: persian_fa
            })
            setDate(newDate)
        }else{
            setDate(null)
        }
    }

    useEffect(()=>{
        getMachineList()
        getProductList()
        getUnitList()
        getSubOrganizationList()
        const editInfoObj = ConvertToEmpty(props.editInfoTarget)
        formik.setValues({
            id:editInfoObj?.id,
            productId: editInfoObj?.productId,
            productName:editInfoObj?.productName,
            value: editInfoObj?.value,
            unit: editInfoObj?.unit,
            expirationDate: editInfoObj?.expirationDate,
            machineTag: editInfoObj?.machineTag,
            machineCode: editInfoObj?.machineCode,
            machineType:editInfoObj?.machineType,
            driverName: editInfoObj?.driverName,
            sourceSubOrganizationId: editInfoObj?.sourceSubOrganizationId,
            sourceOrganizationId: editInfoObj?.sourceOrganizationId,
            sourceSubOrganizationName: editInfoObj?.sourceSubOrganizationName,
            description:editInfoObj?.description
        })
        handleSetMachineInput(props.editInfoTarget?.machineCode)
        handleSetProductInput(props.editInfoTarget?.productId)
        handleSetSubOrganizationInput(props.editInfoTarget?.sourceSubOrganizationId)
        handleSetUnitInput(props.editInfoTarget?.unit)
        handleSetMachineTagInput(props.editInfoTarget?.machineTag)
        handleSetExpirationDate(props.editInfoTarget?.expirationDate)
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
                        fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189",overflow:"visible"
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
                            <h3 className="text-[1.1rem]">ویرایش مواداولیه ورودی</h3>
                        </div>
                        <form className="flex justify-center " onSubmit={formik.handleSubmit} method="POST">
                            <div className="flex flex-col justify-center w-[90%] gap-5">
                                <div className=" flex flex-col">
                                    <Autocomplete
                                        FormHelperTextProps={{ style: { fontFamily: '__fonts_2f4189,__fonts_Fallback_2f4189',fontSize:"0.6rem"}}}
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
                                            setIsExpirable(newValue?.isExpirable)
                                            newValue?.isExpirable===false ? (handleDateInput(null)):null 
                                        }}
                                        renderInput={(params) =>
                                            <TextField
                                        FormHelperTextProps={{ style: { fontFamily: '__fonts_2f4189,__fonts_Fallback_2f4189',fontSize:"0.6rem"}}}
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
                                                placeholder="نام محصول (اجباری)"
                                            />}
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <div className="w-[70%]">
                                        <TextField
                                        FormHelperTextProps={{ style: { fontFamily: '__fonts_2f4189,__fonts_Fallback_2f4189',fontSize:"0.6rem"}}}
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
                                        FormHelperTextProps={{ style: { fontFamily: '__fonts_2f4189,__fonts_Fallback_2f4189',fontSize:"0.6rem"}}}
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
                                        FormHelperTextProps={{ style: { fontFamily: '__fonts_2f4189,__fonts_Fallback_2f4189',fontSize:"0.6rem"}}}
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
                                {product?.isExpirable && <div>
                                    <DatePicker
                                    calendarPosition={`bottom`}
                                    className="red"
                                    digits={['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']}
                                    format={`YYYY/MM/DD`}
                                    containerStyle={{
                                        width: "100%"
                                    }}
                                    placeholder="تاریخ انقضا (اجباری)"
                                    inputClass={`border border-[#D9D9D9] placeholder-neutral-300 text-gray-900 text-[0.8rem] rounded focus:ring-[#3B82F67F] focus:border-[#3B82F67F] block w-full px-3 py-4`}
                                    value={date}
                                    onChange={(value) => {
                                        handleDateInput(value)
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
                                        setDate("")
                                        formik.setFieldValue("expirationDate", "")
                                    }}>
                                        ریست
                                    </button>
                                </DatePicker>
                                </div>} { product?.isExpirable&&
                                            Boolean(formik.errors.expirationDate) && (
                                                <span className="mx-3 text-[0.6rem] text-red-600 ">
                                                    {formik.errors.expirationDate}
                                                </span>
                                            )
                                        }
                                <div>
                                    <div className="flex flex-col md:flex-row">
                                        <div className="plate w-full md:w-[47%] flex items-center pl-4">
                                            <div>
                                                <div className="w-[55px] h-full pt-3  pl-1 pr-3">
                                                    <input disabled={machine!==null && machine!=="" && machine!==undefined } name="part1"
                                                           onChange={handlemachineTag} value={machineTag.part1}
                                                           type="number" placeholder="55" maxLength="2"
                                                           className="w-full h-full placeholder-neutral-300 text-center rounded"/>
                                                </div>
                                            </div>
                                            <div className="flex">
                                                <div className="w-[60px] h-full py-1 pl-1 pr-3 h-full">
                                                    <input disabled={machine!==null && machine!=="" && machine!==undefined } name="part2"
                                                           onChange={handlemachineTag} value={machineTag.part2}
                                                           type="number" placeholder="555" maxLength="3"
                                                           className="w-full h-full placeholder-neutral-300 text-center rounded"/>
                                                </div>
                                                <div>
                                                    <FormControl sx={{width: "58px", bgcolor: "#fff"}} size="small">
                                                        <Select
                                                        sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}
                                                            disabled={machine!==null && machine!=="" && machine!==undefined }
                                                            name="part3"
                                                            value={machineTag.part3}
                                                            onChange={handlemachineTag}
                                                            labelId="demo-select-small-label"
                                                            id="demo-select-small">
                                                            {
                                                                alphabeticalList.map((alpha)=>(
                                                                    <MenuItem  sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}} value={alpha.value}>{alpha.value}</MenuItem>
                                                                ))
                                                            }
                                                        </Select>
                                                    </FormControl>
                                                </div>
                                                <div className="w-[50px] h-full py-1 pl-2 pr-1 h-full">
                                                    <input disabled={machine!==null && machine!=="" && machine!==undefined } name="part4"
                                                           onChange={handlemachineTag} value={machineTag.part4}
                                                           type="number" placeholder="55" maxLength="2"
                                                           className="w-full h-full placeholder-neutral-300 text-center rounded"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full md:w-[6%] flex justify-center items-center">
                                            <span className="text-[1rem]">
                                                یا
                                            </span>
                                        </div>
                                        <div className="w-full md:w-[47%]">
                                        <Autocomplete
                                        FormHelperTextProps={{ style: { fontFamily: '__fonts_2f4189,__fonts_Fallback_2f4189',fontSize:"0.6rem"}}}
                                                 disabled={formik.values.machineTag !== ""}
                                        open={openMachineList}
                                        onOpen={() => {
                                            setOpenMachineList(true);
                                            
                                            
                                        }}
                                        onClose={() => {
                                            setOpenMachineList(false);
                                        }}
                                        fullWidth
                                        clearOnEscape
                                        disablePortal
                                        id="combo-box-demo"
                                        ListboxProps={{
                                            sx: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"},
                                        }}
                                        options={machineList?.content}
                                        getOptionLabel={(option) => option?.code}
                                        value={machine}
                                        onChange={(event, newValue) => {
                                            
                                            setMachine(newValue)
                                            formik.setFieldValue("machineCode", newValue?.code)
                                        }}
                                        renderInput={(params) =>
                                            <TextField
                                        FormHelperTextProps={{ style: { fontFamily: '__fonts_2f4189,__fonts_Fallback_2f4189',fontSize:"0.6rem"}}}
                                           
                                            error={formik.touched.machineCode && Boolean(formik.errors.machineCode)}
                                            helperText={formik.touched.machineTag && formik.errors.machineTag}
                                                {...params}
                                                InputProps={{
                                                    ...params.InputProps,
                                                    style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"},
                                                    endAdornment:(
                                                        <React.Fragment>
                                                            {isMachineLoading ? <CircularProgress color="inherit" size={20} /> : null}
                                                            
                                                        </React.Fragment>
                                                    )
                                            }}
                                                placeholder="  کد وسیله "
                                            />}
                                    />
                                        </div>
                                    </div>
                                    <div>
                                        {
                                            Boolean(formik.errors.machineTag) && (
                                                <span className="mx-3 text-[0.6rem] text-red-600 ">
                                                    {formik.errors.machineTag}
                                                </span>
                                            )
                                        }
                                    </div>
                                </div>
                                <div className="flex flex-col md:flex-row gap-5 md:gap-1 justify-between">
                                    <div className="w-full md:w-1/2">
                                        <TextField
                                        FormHelperTextProps={{ style: { fontFamily: '__fonts_2f4189,__fonts_Fallback_2f4189',fontSize:"0.6rem"}}}
                                            fullWidth
                                            placeholder="نام راننده (اجباری)"
                                            type="text"
                                            name="driverName"
                                            value={formik.values.driverName}
                                            onChange={formik.handleChange}
                                            error={formik.touched.driverName && Boolean(formik.errors.driverName)}
                                            helperText={formik.touched.driverName && formik.errors.driverName}
                                            inputProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}}
                                            InputLabelProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}}}/>
                                    </div>
                                    <div className="w-full md:w-1/2">
                                        <Autocomplete
                                        FormHelperTextProps={{ style: { fontFamily: '__fonts_2f4189,__fonts_Fallback_2f4189',fontSize:"0.6rem"}}}
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
                                                formik.setFieldValue("sourceSubOrganizationId", newValue?.id)
                                                formik.setFieldValue("sourceSubOrganizationName", newValue?.name)
                                            }}
                                            renderInput={(params) =>
                                                <TextField
                                        FormHelperTextProps={{ style: { fontFamily: '__fonts_2f4189,__fonts_Fallback_2f4189',fontSize:"0.6rem"}}}
                                                    error={formik.touched.sourceSubOrganizationId && Boolean(formik.errors.sourceSubOrganizationId)}
                                                    helperText={formik.touched.sourceSubOrganizationId && formik.errors.sourceSubOrganizationId}
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
                                                    placeholder="از دپارتمان"
                                                />}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <TextField
                                        FormHelperTextProps={{ style: { fontFamily: '__fonts_2f4189,__fonts_Fallback_2f4189',fontSize:"0.6rem"}}}
                                        multiline
                                        minRows={2}
                                        maxRows={2}
                                        fullWidth
                                        placeholder="توضيحات (اختياری)"
                                        type="text"
                                        name="description"
                                        value={formik.values.description}
                                        onChange={formik.handleChange}
                                        error={formik.touched.description && Boolean(formik.errors.description)}
                                        helperText={formik.touched.description && formik.errors.description}
                                        inputProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}}
                                        InputLabelProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}}}/>
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