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
import DatePicker from "react-multi-date-picker";
import CircularProgress from '@mui/material/CircularProgress';
import "react-multi-date-picker/styles/colors/red.css"
import {
    useLazyGetAllProductQuery,
    useLazyGetAllUnitQuery,
    useLazyGetAllVehicleQuery
} from "@/redux/features/category/CategorySlice";
import {useSavePSIMutation} from "@/redux/features/primary-store/input/PSIapiSlice";
import {
    useLazyGetOneVehiclesByCodeQuery,
    useLazyGetOneVehiclesByTagQuery
} from "@/redux/features/vehicles-and-equipment/VehiclesAndEquipmentSlice";


export default function AddDataDialog(props) {
    const alphabeticalList = [
        {value: ""},
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
    const [date,setDate] = useState("")
    const handleDateInput = (value) => {
        if(value){
            setDate(value)
            let month = value?.month < 10 ? ('0' + value?.month) : value?.month;
            let day = value?.day < 10 ? ('0' + value?.day) : value?.day;
            let convertDate = value?.year + '/' + month + '/' + day;
            formik.setFieldValue("expirationDate", convertDate)
        }else {
            formik.setFieldValue("expirationDate", "")
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
            setmachineTag((co) => ({...co, part3: e.target.value}))
        } else if (e.target.name === "part4") {
            setmachineTag((co) => ({...co, part4: e.target.value}))
        }
    }
    const validate = (values, props) => {
        const errors = {};

        if (!values.machineTag && !values.machineCode) {
            errors.machineTag = "لطفا پلاک یا کد وسیله نقلیه را وارد کنید";
        } else if (!values.machineCode && values.machineTag) {
            if (!/[0-9]{7}./.test(values.machineTag)) {
                errors.machineTag = 'لطفا پلاک  وسیله نقلیه را کامل وارد کنید';
            }
        }

        return errors;
    };

    const handleReset = () =>{
        formik.resetForm()
        setDate("")
        setProduct(null)
        setUnit(null)
        setmachineTag({
            part1: "",
            part2: "",
            part3: "",
            part4: ""})
    }

    //submit data
    const [submitData, { isLoading:isSubmitLoading ,error}] = useSavePSIMutation()
    const [getVehicleByTag,{ data : vehicleByTag  = {} , isLoading : isVehicleByTagLoading, isError: isVehicleByTagError }] = useLazyGetOneVehiclesByTagQuery()

    const [getVehicleByCode,{ data : vehicleByCode  = {} , isLoading : isVehicleByCodeLoading, isError: isVehicleByCodeError }] = useLazyGetOneVehiclesByCodeQuery()

    const schema = yup.object().shape({
        productId: yup.string().required("لطفا نام محصول را وارد کنید"),
        value: yup.string().required("لطفا مقدار محصول را وارد کنید"),
        unit: yup.string().required("لطفا واحد محصول را وارد کنید"),
        driverName: yup.string().required("لطفا نام راننده را وارد کنید"),
        producer: yup.string().required("لطفا تامین کننده را وارد کنید"),
    });

    const formik = useFormik({
        initialValues: {
            productId: "",
            productName:"",
            value: "",
            unit: "",
            status:"UNKNOWN",
            expirationDate: "",
            machineTag: "",
            machineCode: "",
            driverName: "",
            producer: "",
            description:"",
        },
      
        validate: validate,

        validationSchema: schema,

        onSubmit: async (product,helpers) => {
            let updateProduct = {...product}

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
            updateProduct = {...updateProduct,
                organizationId:window.sessionStorage.getItem("organizationId"),
                subOrganizationId:window.sessionStorage.getItem("subOrganizationId"),
            }
            const userData = await submitData(updateProduct)
            handleReset()
            props.handleCloseAddData()
        },
    });

    return (
        <>
            <Dialog
                fullWidth={true}
                open={props.openAddData}
                keepMounted
                onClose={()=>{props.handleCloseAddData();handleReset()}}
                aria-describedby="alert-dialog-slide-description"
                PaperProps={{
                    style: {
                        fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189",
                    },
                }}>
                <DialogContent>
                    <DialogContentText style={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}}>
                        <div className="flex justify-end">
                            <button onClick={()=>{props.handleCloseAddData();handleReset()}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 14 14"
                                     fill="none">
                                    <path d="M13 1L1 13M1 1L13 13" stroke="black" stroke-width="2"
                                          stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                        </div>
                        <div className="flex justify-center mb-7">
                            <h3 className="text-[1.1rem]">ثبت مواداولیه ورودی</h3>
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
                                <div>
                                    <DatePicker
                                        calendarPosition={`bottom`}
                                        className="red"
                                        digits={['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']}
                                        format={`YYYY/MM/DD`}
                                        containerStyle={{
                                            width: "100%"
                                        }}
                                        placeholder="تاریخ انقضا (اختیاری)"
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
                                                ["شنبه", "Sat"],
                                                ["یکشنبه", "Sun"],
                                                ["دوشنبه", "Mon"],
                                                ["سه شنبه", "Tue"],
                                                ["چهارشنبه", "Wed"],
                                                ["پنجشنبه", "Thu"],
                                                ["جمعه", "Fri"],
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
                                </div>
                                <div>
                                    <div className="flex flex-col md:flex-row">
                                        <div className="plate w-full md:w-[47%] flex items-center pl-4">
                                            <div>
                                                <div className="w-[55px] h-full pt-3  pl-1 pr-3">
                                                    <input disabled={formik.values.machineCode !== ""} name="part1"
                                                           onChange={handlemachineTag} value={machineTag.part1}
                                                           type="text" placeholder="55" maxLength="2"
                                                           className="w-full h-full placeholder-neutral-300 text-center rounded"/>
                                                </div>
                                            </div>
                                            <div className="flex">
                                                <div className="w-[60px] h-full py-1 pl-1 pr-3 h-full">
                                                    <input disabled={formik.values.machineCode !== ""} name="part2"
                                                           onChange={handlemachineTag} value={machineTag.part2}
                                                           type="text" placeholder="555" maxLength="3"
                                                           className="w-full h-full placeholder-neutral-300 text-center rounded"/>
                                                </div>
                                                <div>
                                                    <FormControl sx={{width: "58px", bgcolor: "#fff"}} size="small">
                                                        <Select
                                                            disabled={formik.values.machineCode !== ""}
                                                            name="part3"
                                                            value={machineTag.part3}
                                                            onChange={handlemachineTag}
                                                            labelId="demo-select-small-label"
                                                            id="demo-select-small">
                                                            {
                                                                alphabeticalList.map((alpha)=>(
                                                                    <MenuItem value={alpha.value}>{alpha.value}</MenuItem>
                                                                ))
                                                            }
                                                        </Select>
                                                    </FormControl>
                                                </div>
                                                <div className="w-[50px] h-full py-1 pl-2 pr-1 h-full">
                                                    <input disabled={formik.values.machineCode !== ""} name="part4"
                                                           onChange={handlemachineTag} value={machineTag.part4}
                                                           type="text" placeholder="55" maxLength="2"
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
                                            <TextField
                                                disabled={formik.values.machineTag !== ""}
                                                fullWidth
                                                placeholder="کد وسیله نقلیه(اجباری)"
                                                type="text"
                                                name="machineCode"
                                                value={formik.values.machineCode}
                                                onChange={formik.handleChange}
                                                error={formik.touched.machineCode && Boolean(formik.errors.machineCode)}
                                                // helperText={formik.touched.machineTag && formik.errors.machineTag}
                                                inputProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}}
                                                InputLabelProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}}}/>
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
                                <div>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label" sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem",color:"#9F9F9F"}}>وضعیت</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={formik.values.status}
                                            name="status"
                                            input={<OutlinedInput sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}} label="وضعیت" />}
                                            sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}
                                            onChange={formik.handleChange}>
                                            <MenuItem value="UNKNOWN" sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}>نامعلوم</MenuItem>
                                            <MenuItem value="CONFIRMED" sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}>تاييد شده</MenuItem>
                                            <MenuItem value="TROUBLED" sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}>مشکل دار</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className="flex flex-col md:flex-row gap-1 justify-between">
                                    <div className="w-full md:w-1/2">
                                        <TextField
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
                                        <TextField
                                            fullWidth
                                            placeholder="تامین کننده (اجباری)"
                                            type="text"
                                            name="producer"
                                            value={formik.values.producer}
                                            onChange={formik.handleChange}
                                            error={formik.touched.producer && Boolean(formik.errors.producer)}
                                            helperText={formik.touched.producer && formik.errors.producer}
                                            inputProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}}
                                            InputLabelProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}}}/>
                                    </div>
                                </div>
                                <div>
                                    <TextField
                                        multiline
                                        rows={1}
                                        maxRows={4}
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