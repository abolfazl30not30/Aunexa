'use client'
import TextField from "@mui/material/TextField";
import React, {useEffect, useState} from "react";
import {Autocomplete, DialogContent, DialogContentText, FormControl, MenuItem, Select,} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import {TailSpin} from "react-loader-spinner";
import * as yup from "yup";
import {useFormik} from "formik";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker from "react-multi-date-picker";
import CircularProgress from '@mui/material/CircularProgress';
import "react-multi-date-picker/styles/colors/red.css"
import {useLazyGetAllProductQuery, useLazyGetAllUnitQuery} from "@/redux/features/product/ProductSlice";
import {useSaveMutation} from "@/redux/features/primary-store/input/RMWIapiSlice";


export default function AddDataDialog(props) {

    const [product,setProduct] = useState(null)
    const [openProductList,setOpenProductList] = useState(false)
    const [getProductList,{ data : productList  = [] , isLoading : isProductLoading, isError: productIsError }] = useLazyGetAllProductQuery()
    useEffect(()=>{
        if(openProductList){
            getProductList()
        }
    },[openProductList])

    const [unit,setUnit] = useState(null)
    const [openUnitList,setOpenUnitList] = useState(false)
    const [getUnitList,{ data : unitList  = [] , isLoading : isUnitLoading, isError: unitIsError }] = useLazyGetAllUnitQuery()
    useEffect(()=>{
        if(openUnitList){
            getUnitList()
        }
    },[openUnitList])

    const [submitData, { isLoading:isSubmitLoading ,error}] = useSaveMutation()
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

    const [machineTag, setmachineTag] = useState({
        part1: "",
        part2: "",
        part3: "",
        part4: "",
    })

    const top100Films = ["Kg"]
    
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
            description: "",
        },
      
        validate: validate,

        validationSchema: schema,

        onSubmit: async (product,helpers) => {
            const body = {...product,
                organizationId:window.sessionStorage.getItem("organizationId"),
                subOrganizationId:window.sessionStorage.getItem("subOrganizationId"),
            }
            const userData = await submitData(body)
            console.log(error)
            console.log(userData)
            handleReset()
            props.handleCloseAddData()
        },
    });

    const handleReset = () =>{
        formik.resetForm()
        setProduct(null)
        setUnit(null)
    }

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
                        fontFamily: "IRANYekan",
                    },
                }}>
                <DialogContent>
                    <DialogContentText style={{fontFamily: "IRANYekan"}}>
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
                            <h3 className="text-[1.1rem]">ثبت کالا</h3>
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
                                            sx: {fontFamily: "IRANYekan", fontSize: "0.8rem"},
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
                                                    style: {fontFamily: "IRANYekan", fontSize: "0.8rem"},
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
                                            inputProps={{style: {fontFamily: "IRANYekan", fontSize: "0.8rem"}}}
                                            InputLabelProps={{style: {fontFamily: "IRANYekan"}}}/>
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
                                                sx: {fontFamily: "IRANYekan", fontSize: "0.8rem"},
                                            }}
                                            options={unitList}
                                            getOptionLabel={(option) => option.abbreviation}
                                            value={unit}
                                            onChange={(event, newValue) => {
                                                setUnit(newValue)
                                                formik.setFieldValue("unit", newValue.abbreviation)
                                            }}
                                            renderInput={(params) =>
                                                <TextField
                                                    {...params}
                                                    error={formik.touched.unit && Boolean(formik.errors.unit)}
                                                    helperText={formik.touched.unit && formik.errors.unit}
                                                    InputProps={{
                                                        ...params.InputProps,
                                                        style: {fontFamily: "IRANYekan", fontSize: "0.8rem"}
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
                                        <button className="px-2 pb-4" onClick={() => {
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
                                                inputProps={{style: {fontFamily: "IRANYekan", fontSize: "0.8rem"}}}
                                                InputLabelProps={{style: {fontFamily: "IRANYekan"}}}/>
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
                                    <TextField
                                        fullWidth
                                        placeholder="نام راننده (اجباری)"
                                        type="text"
                                        name="driverName"
                                        value={formik.values.driverName}
                                        onChange={formik.handleChange}
                                        error={formik.touched.driverName && Boolean(formik.errors.driverName)}
                                        helperText={formik.touched.driverName && formik.errors.driverName}
                                        inputProps={{style: {fontFamily: "IRANYekan", fontSize: "0.8rem"}}}
                                        InputLabelProps={{style: {fontFamily: "IRANYekan"}}}/>
                                </div>
                                <div>
                                    <TextField
                                        fullWidth
                                        placeholder="تامین کننده (اجباری)"
                                        type="text"
                                        name="producer"
                                        value={formik.values.producer}
                                        onChange={formik.handleChange}
                                        error={formik.touched.producer && Boolean(formik.errors.producer)}
                                        helperText={formik.touched.producer && formik.errors.producer}
                                        inputProps={{style: {fontFamily: "IRANYekan", fontSize: "0.8rem"}}}
                                        InputLabelProps={{style: {fontFamily: "IRANYekan"}}}/>
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