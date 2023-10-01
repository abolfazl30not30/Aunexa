'use client'
import TextField from "@mui/material/TextField";
import React, {useState} from "react";
import {
    Autocomplete,
    FormControl,
 MenuItem,
} from "@mui/material";
import {
    DialogContent,
    DialogContentText,
    Select,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import {TailSpin} from "react-loader-spinner";
import * as yup from "yup";
import {useFormik} from "formik";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker from "react-multi-date-picker";
import "react-multi-date-picker/styles/colors/red.css"


export default function AddDataDialog(props) {

    const validate = (values, props ) => {
        const errors = {};

        if (!values.carTag && !values.carCode) {
            errors.carTag = "لطفا پلاک یا کد وسیله نقلیه را وارد کنید";
        } else if (!values.carCode && values.carTag) {
            if(!/[0-9]{2}-[0-9]{3}-[0-9]{2}-./.test(values.carTag)){
                errors.carTag = 'لطفا پلاک  وسیله نقلیه را کامل وارد کنید';
            }
        }

        return errors;
    };

    const [carTag,setCarTag] = useState({
        part1:"",
        part2:"",
        part3:"",
        part4:"",
    })

    const top100Films = [
        "کربوهیدارت",
        "مس سولفات"
    ]
    const schema = yup.object().shape({
        material: yup.string().required("لطفا نام محصول را وارد کنید"),
        value: yup.string().required("لطفا مقدار محصول را وارد کنید"),
        unit: yup.string().required("لطفا واحد محصول را وارد کنید"),
        driver: yup.string().required("لطفا نام راننده را وارد کنید"),
        supplier: yup.string().required("لطفا تامین کننده را وارد کنید"),
    });

    const formik = useFormik({

        initialValues: {
            material: "",
            value: "",
            unit:"",
            expirationDate:"",
            carTag:"",
            carCode:"",
            driver:"",
            supplier:""
        },
        validate:validate,

        validationSchema: schema,

        onSubmit: async ({material, value ,unit,expirationDate}) => {
            try{
                console.log(expirationDate)
            }catch (err){
            }
        },
    });

    const handleCarTag = (e) =>{
        if(e.target.name === "part1"){
            setCarTag((co)=>({...co,part1:e.target.value}))
        }else if(e.target.name === "part2"){
            setCarTag((co)=>({...co,part2:e.target.value}))
        }else if (e.target.name === "part3") {
            setCarTag((co)=>({...co,part3:e.target.value}))
        }else if (e.target.name === "part4") {
            setCarTag((co)=>({...co,part4:e.target.value}))
        }
        const carTagString = carTag.part4 +"-"+ carTag.part2+ "-" +carTag.part1+ "-" +carTag.part3
        console.log(carTagString)
        formik.setFieldValue("carTag", carTagString)
    }

    return(
        <>
            <Dialog
                fullWidth={true}
                open={props.openAddData}
                keepMounted
                onClose={props.handleCloseAddData}
                aria-describedby="alert-dialog-slide-description"
                PaperProps={{
                    style: {
                        fontFamily: "IRANYekan",
                    },
                }}>
                <DialogContent>
                    <DialogContentText style={{ fontFamily: "IRANYekan" }}>
                        <div className="flex justify-end">
                            <button onClick={props.handleCloseAddData}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 14 14" fill="none">
                                    <path d="M13 1L1 13M1 1L13 13" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
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
                                        fullWidth
                                        disablePortal
                                        id="combo-box-demo"
                                        ListboxProps={{
                                            sx: { fontFamily: "IRANYekan",fontSize:"0.8rem"},
                                        }}
                                        options={top100Films}
                                        value={formik.values.material}
                                        onChange={(event, newValue) => {
                                            formik.setFieldValue("material", newValue)
                                        }}
                                        renderInput={(params) =>
                                            <TextField
                                                error={formik.touched.material && Boolean(formik.errors.material)}
                                                helperText={formik.touched.material && formik.errors.material}
                                                {...params}
                                                InputProps={{ ...params.InputProps, style: {fontFamily: "IRANYekan",fontSize:"0.8rem"} }}
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
                                            inputProps={{style: {fontFamily: "IRANYekan",fontSize:"0.8rem"}}}
                                            InputLabelProps={{style: {fontFamily: "IRANYekan"}}}/>
                                    </div>
                                    <div className="w-[30%]">
                                        <Autocomplete
                                            fullWidth
                                            disablePortal
                                            id="combo-box-demo"
                                            ListboxProps={{
                                                sx: { fontFamily: "IRANYekan",fontSize:"0.8rem"},
                                            }}
                                            options={top100Films}
                                            value={formik.values.unit}
                                            onChange={(event, newValue) => {
                                                formik.setFieldValue("unit", newValue)
                                            }}
                                            renderInput={(params) =>
                                                <TextField
                                                    {...params}
                                                    error={formik.touched.unit && Boolean(formik.errors.unit)}
                                                    helperText={formik.touched.unit && formik.errors.unit}
                                                    InputProps={{ ...params.InputProps, style: {fontFamily: "IRANYekan",fontSize:"0.8rem"} }}
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
                                        value={formik.values.expirationDate}
                                        onChange={(value) => {
                                            formik.setFieldValue("expirationDate",value)
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
                                            formik.setFieldValue("expirationDate","")}}>
                                            ریست
                                        </button>
                                    </DatePicker>
                                </div>
                                <div>
                                    <div className="flex flex-col md:flex-row">
                                        <div className="plate w-full md:w-[47%] flex items-center pl-4">
                                            <div>
                                                <div className="w-[55px] h-full pt-3  pl-1 pr-3">
                                                    <input disabled={formik.values.carCode !== ""} name="part1" onChange={handleCarTag} value={carTag.part1}  type="text"  placeholder="55" maxLength="2" className="w-full h-full placeholder-neutral-300 text-center rounded"/>
                                                </div>
                                            </div>
                                            <div className="flex">
                                                <div className="w-[60px] h-full py-1 pl-1 pr-3 h-full">
                                                    <input disabled={formik.values.carCode !== ""} name="part2" onChange={handleCarTag} value={carTag.part2} type="text" placeholder="555" maxLength="3" className="w-full h-full placeholder-neutral-300 text-center rounded"/>
                                                </div>
                                                <div>
                                                    <FormControl sx={{width: "58px",bgcolor:"#fff" }} size="small">
                                                        <Select
                                                            disabled={formik.values.carCode !== ""}
                                                            name="part3"
                                                            value={carTag.part3}
                                                            onChange={handleCarTag}
                                                            labelId="demo-select-small-label"
                                                            id="demo-select-small">
                                                            <MenuItem value={"ا"}>الف</MenuItem>
                                                            <MenuItem value={"ب"}>ب</MenuItem>
                                                            <MenuItem value={"پ"}>پ</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </div>
                                                <div className="w-[50px] h-full py-1 pl-2 pr-1 h-full">
                                                    <input disabled={formik.values.carCode !== ""} name="part4" onChange={handleCarTag}  value={carTag.part4} type="text" placeholder="55" maxLength="2" className="w-full h-full placeholder-neutral-300 text-center rounded"/>
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
                                                disabled={formik.values.carTag !== ""}
                                                fullWidth
                                                placeholder="کد وسیله نقلیه(اجباری)"
                                                type="text"
                                                name="carCode"
                                                value={formik.values.carCode}
                                                onChange={formik.handleChange}
                                                error={formik.touched.carCode && Boolean(formik.errors.carCode)}
                                                // helperText={formik.touched.carTag && formik.errors.carTag}
                                                inputProps={{style: {fontFamily: "IRANYekan",fontSize:"0.8rem"}}}
                                                InputLabelProps={{style: {fontFamily: "IRANYekan"}}}/>
                                        </div>
                                    </div>
                                    <div>
                                        {
                                            Boolean(formik.errors.carTag) && (
                                                <span className="mx-3 text-[0.6rem] text-red-600 ">
                                                    {formik.errors.carTag}
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
                                        name="driver"
                                        value={formik.values.driver}
                                        onChange={formik.handleChange}
                                        error={formik.touched.driver && Boolean(formik.errors.driver)}
                                        helperText={formik.touched.driver && formik.errors.driver}
                                        inputProps={{style: {fontFamily: "IRANYekan",fontSize:"0.8rem"}}}
                                        InputLabelProps={{style: {fontFamily: "IRANYekan"}}}/>
                                </div>
                                <div>
                                    <TextField
                                        fullWidth
                                        placeholder="تامین کننده (اجباری)"
                                        type="text"
                                        name="supplier"
                                        value={formik.values.supplier}
                                        onChange={formik.handleChange}
                                        error={formik.touched.supplier && Boolean(formik.errors.supplier)}
                                        helperText={formik.touched.supplier && formik.errors.supplier}
                                        inputProps={{style: {fontFamily: "IRANYekan",fontSize:"0.8rem"}}}
                                        InputLabelProps={{style: {fontFamily: "IRANYekan"}}}/>
                                </div>
                                <div>
                                    <button type="submit"
                                            className="w-full rounded-[0.5rem] py-3 hover:border hover:opacity-80 font-bold  bg-mainRed text-white">ثبت
                                    </button>
                                    <button disabled type="submit"
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