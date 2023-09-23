'use client'

import TextField from "@mui/material/TextField";
import React, {useState} from "react";
import {
    Autocomplete,
    FormControl,
    IconButton,
    InputAdornment,
    OutlinedInput,
    Pagination,
    PaginationItem
} from "@mui/material";
import {
    DialogContent,
    DialogContentText,
    Select,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import {TailSpin} from "react-loader-spinner";
import * as yup from "yup";
import {useFormik} from "formik";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker from "react-multi-date-picker";
import "react-multi-date-picker/styles/colors/red.css"

import axios from "axios";
import {formatModuleTrace} from "next/dist/build/webpack/plugins/wellknown-errors-plugin/getModuleTrace";

export default function Dashboard() {
    const [openAddData , setOpenAddData] = useState(false)

    const handleOpenAddData = () =>{
        setOpenAddData(true)
    }

    const handleCloseAddData = () =>{
        setOpenAddData(false)
    }
    const top100Films = [
        "کربوهیدارت",
        "مس سولفات"
    ]
    const schema = yup.object().shape({
        material: yup.string().required("لطفا نام محصول را وارد کنید"),
        value: yup.string().required("لطفا مقدار محصول را وارد کنید"),
        unit: yup.string().required("لطفا واحد محصول را وارد کنید"),
        carTag: yup.string().required("لطفا پلاک وسیله نقلیه را وارد کنید"),
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
            driver:"",
            supplier:""
        },

        validationSchema: schema,

        onSubmit: async ({material, value ,unit,expirationDate}) => {
            try{
                console.log(expirationDate)
            }catch (err){
            }
        },
    });
    return (
        <>
            <div>
               <header className="flex justify-between items-center text-[0.9rem] bg-white py-6 px-10">
                   <div className="">
                       <h2 className="font-[800] text-[1.1rem]">انبار مواد اولیه / بخش ورودی</h2>
                   </div>
                   <div className="">
                       <button className="flex bg-mainRed text-white items-center text- px-3 py-2 rounded" onClick={handleOpenAddData}>
                           ثبت مواد اولیه ورودی
                           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                           <path d="M7 12H17" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                           <path d="M12 7V17" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                       </svg>
                       </button>
                   </div>
               </header>
                <section className="py-4 px-8 mt-5 bg-white h-[50rem]">
                    <div className="flex justify-between">
                        <div className="w-[37%]">
                            <FormControl fullWidth>
                                <OutlinedInput
                                    size="small"
                                    sx={{py:"0.2rem"}}
                                    placeholder="جستوجو..."
                                    id="outlined-adornment-amount"
                                    inputProps={{style: {fontFamily: "IRANYekan",fontSize:"0.9rem"}}}
                                    startAdornment={<InputAdornment position="start">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M21 21L16.65 16.65M11 6C13.7614 6 16 8.23858 16 11M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="#9F9F9F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </InputAdornment>}
                                />
                            </FormControl>
                        </div>
                        <div className="flex gap-3">
                            <button className="flex items-center gap-2 text-[0.9rem] text-gray9F border border-1 border-solid border-borderGray rounded px-4 py-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M3.38589 5.66687C2.62955 4.82155 2.25138 4.39889 2.23712 4.03968C2.22473 3.72764 2.35882 3.42772 2.59963 3.22889C2.87684 3 3.44399 3 4.57828 3H19.4212C20.5555 3 21.1227 3 21.3999 3.22889C21.6407 3.42772 21.7748 3.72764 21.7624 4.03968C21.7481 4.39889 21.3699 4.82155 20.6136 5.66687L14.9074 12.0444C14.7566 12.2129 14.6812 12.2972 14.6275 12.3931C14.5798 12.4781 14.5448 12.5697 14.5236 12.6648C14.4997 12.7721 14.4997 12.8852 14.4997 13.1113V18.4584C14.4997 18.6539 14.4997 18.7517 14.4682 18.8363C14.4403 18.911 14.395 18.9779 14.336 19.0315C14.2692 19.0922 14.1784 19.1285 13.9969 19.2012L10.5969 20.5612C10.2293 20.7082 10.0455 20.7817 9.89802 20.751C9.76901 20.7242 9.6558 20.6476 9.583 20.5377C9.49975 20.4122 9.49975 20.2142 9.49975 19.8184V13.1113C9.49975 12.8852 9.49975 12.7721 9.47587 12.6648C9.45469 12.5697 9.41971 12.4781 9.37204 12.3931C9.31828 12.2972 9.2429 12.2129 9.09213 12.0444L3.38589 5.66687Z" stroke="#9F9F9F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                فیلتر کردن
                            </button>
                            <button className="flex items-center gap-2 text-[0.9rem] text-gray9F border border-1 border-solid border-borderGray rounded px-4 py-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M6 12H18M3 6H21M9 18H15" stroke="#9F9F9F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                مرتب سازی
                            </button>
                        </div>
                    </div>

                    <div className="mt-10">
                        <table className="w-full text-sm text-center text-gray70">
                            <thead className="text-[0.9rem] text-gray80  bg-[#F2EDED] ">
                            <tr>
                                <th scope="col" className="px-6 py-4">
                                    #
                                </th>
                                <th scope="col" className="px-6 py-4">
                                    ماده
                                </th>
                                <th scope="col" className="px-6 py-4">
                                    مقدار
                                </th>
                                <th scope="col" className="px-6 py-4">
                                    نوع وسیله
                                </th>
                                <th scope="col" className="px-6 py-4">
                                    تامین کننده
                                </th>
                                <th scope="col" className="px-6 py-4">
                                    تاریخ
                                </th>
                                <th scope="col" className="px-6 py-4">
                                    وضعیت
                                </th>
                                <th scope="col" className="px-6 py-4">
                                    عملیات
                                </th>
                            </tr>
                            </thead>
                            <tbody className='table-body'>
                            <tr className="border-b ">
                                <td scope="row" className="px-6 py-4  text-gray70 whitespace-nowrap ">
                                    1
                                </td>
                                <td scope="row" className="px-6 py-4  text-gray70 whitespace-nowrap ">
                                    لاستیک 18 چرخ
                                </td>
                                <td scope="row" className="px-6 py-4  text-gray70 whitespace-nowrap ">
                                    2000 kg
                                </td>
                                <td scope="row" className="px-6 py-2  text-gray70 whitespace-nowrap ">
                                    <div>كاميون سنگين</div>
                                    <div className="mt-1 text-gray9F text-[0.75rem]">256-11ب21</div>
                                </td>
                                <td scope="row" className="px-6 py-4  text-gray70 whitespace-nowrap ">
                                    انبار1
                                </td>
                                <td scope="row" className="px-6 py-4  text-gray70 whitespace-nowrap ">
                                    18:49 1402/09/03
                                </td>
                                <td scope="row" className="px-6 py-4  text-gray70 whitespace-nowrap ">
                                    <span className="text-[0.8rem] bg-greenBg text-greenText py-1 px-2 rounded-xl">
                                        تاييد شده
                                    </span>
                                </td>
                                <td scope="row" className="flex gap-2 px-6 py-4 justify-center text-gray70 whitespace-nowrap ">
                                    <button className="border border-1 border-solid border-gray70 rounded p-[0.4rem] hover:bg-neutral-100">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                            <path d="M9 4.56442V4.55554" stroke="#797979" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M9 13.4445V7.22223" stroke="#797979" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z" stroke="#797979" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </button>
                                    <button className="border border-1 border-solid border-[#2492FF] rounded p-[0.4rem] hover:bg-blue-100">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                            <g clip-path="url(#clip0_197_250)">
                                                <path d="M7.3335 2.66666H4.5335C3.41339 2.66666 2.85334 2.66666 2.42552 2.88464C2.04919 3.07639 1.74323 3.38235 1.55148 3.75867C1.3335 4.1865 1.3335 4.74655 1.3335 5.86666V11.4667C1.3335 12.5868 1.3335 13.1468 1.55148 13.5746C1.74323 13.951 2.04919 14.2569 2.42552 14.4487C2.85334 14.6667 3.41339 14.6667 4.5335 14.6667H10.1335C11.2536 14.6667 11.8137 14.6667 12.2415 14.4487C12.6178 14.2569 12.9238 13.951 13.1155 13.5746C13.3335 13.1468 13.3335 12.5868 13.3335 11.4667V8.66666M5.33348 10.6667H6.44984C6.77596 10.6667 6.93902 10.6667 7.09247 10.6298C7.22852 10.5972 7.35858 10.5433 7.47788 10.4702C7.61243 10.3877 7.72773 10.2724 7.95833 10.0418L14.3335 3.66666C14.8858 3.11437 14.8858 2.21894 14.3335 1.66666C13.7812 1.11437 12.8858 1.11437 12.3335 1.66665L5.95832 8.04182C5.72772 8.27242 5.61241 8.38772 5.52996 8.52228C5.45685 8.64157 5.40298 8.77163 5.37032 8.90768C5.33348 9.06113 5.33348 9.22419 5.33348 9.55031V10.6667Z" stroke="#2492FF" stroke-linecap="round" stroke-linejoin="round"/>
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_197_250">
                                                    <rect width="16" height="16" fill="white"/>
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </button>
                                    <button className="border border-1 border-solid border-[#FE4949] rounded p-[0.4rem] hover:bg-red-100">
                                        <svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                            <path d="M10.6667 3.99998V3.46665C10.6667 2.71991 10.6667 2.34654 10.5213 2.06133C10.3935 1.81044 10.1895 1.60647 9.93865 1.47864C9.65344 1.33331 9.28007 1.33331 8.53333 1.33331H7.46667C6.71993 1.33331 6.34656 1.33331 6.06135 1.47864C5.81046 1.60647 5.60649 1.81044 5.47866 2.06133C5.33333 2.34654 5.33333 2.71991 5.33333 3.46665V3.99998M6.66667 7.66665V11M9.33333 7.66665V11M2 3.99998H14M12.6667 3.99998V11.4666C12.6667 12.5868 12.6667 13.1468 12.4487 13.5746C12.2569 13.951 11.951 14.2569 11.5746 14.4487C11.1468 14.6666 10.5868 14.6666 9.46667 14.6666H6.53333C5.41323 14.6666 4.85318 14.6666 4.42535 14.4487C4.04903 14.2569 3.74307 13.951 3.55132 13.5746C3.33333 13.1468 3.33333 12.5868 3.33333 11.4666V3.99998" stroke="#FE4949" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                            <tr className="border-b ">
                                <td scope="row" className="px-6 py-4  text-gray70 whitespace-nowrap ">
                                    1
                                </td>
                                <td scope="row" className="px-6 py-4  text-gray70 whitespace-nowrap ">
                                    لاستیک 18 چرخ
                                </td>
                                <td scope="row" className="px-6 py-4  text-gray70 whitespace-nowrap ">
                                    2000 kg
                                </td>
                                <td scope="row" className="px-6 py-2  text-gray70 whitespace-nowrap ">
                                    <div>كاميون سنگين</div>
                                    <div className="mt-1 text-gray9F text-[0.75rem]">256-11ب21</div>
                                </td>
                                <td scope="row" className="px-6 py-4  text-gray70 whitespace-nowrap ">
                                    انبار1
                                </td>
                                <td scope="row" className="px-6 py-4  text-gray70 whitespace-nowrap ">
                                    18:49 1402/09/03
                                </td>
                                <td scope="row" className="px-6 py-4  text-gray70 whitespace-nowrap ">
                                    <span className="text-[0.8rem] bg-orangeBg text-orangeText py-1 px-2 rounded-xl">
                                        مشكل دار
                                    </span>
                                </td>
                                <td scope="row" className="flex gap-2 px-6 py-4 justify-center text-gray70 whitespace-nowrap ">
                                    <button className="border border-1 border-solid border-gray70 rounded p-[0.4rem] hover:bg-neutral-100">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                            <path d="M9 4.56442V4.55554" stroke="#797979" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M9 13.4445V7.22223" stroke="#797979" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z" stroke="#797979" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </button>
                                    <button className="border border-1 border-solid border-[#2492FF] rounded p-[0.4rem] hover:bg-blue-100">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                            <g clip-path="url(#clip0_197_250)">
                                                <path d="M7.3335 2.66666H4.5335C3.41339 2.66666 2.85334 2.66666 2.42552 2.88464C2.04919 3.07639 1.74323 3.38235 1.55148 3.75867C1.3335 4.1865 1.3335 4.74655 1.3335 5.86666V11.4667C1.3335 12.5868 1.3335 13.1468 1.55148 13.5746C1.74323 13.951 2.04919 14.2569 2.42552 14.4487C2.85334 14.6667 3.41339 14.6667 4.5335 14.6667H10.1335C11.2536 14.6667 11.8137 14.6667 12.2415 14.4487C12.6178 14.2569 12.9238 13.951 13.1155 13.5746C13.3335 13.1468 13.3335 12.5868 13.3335 11.4667V8.66666M5.33348 10.6667H6.44984C6.77596 10.6667 6.93902 10.6667 7.09247 10.6298C7.22852 10.5972 7.35858 10.5433 7.47788 10.4702C7.61243 10.3877 7.72773 10.2724 7.95833 10.0418L14.3335 3.66666C14.8858 3.11437 14.8858 2.21894 14.3335 1.66666C13.7812 1.11437 12.8858 1.11437 12.3335 1.66665L5.95832 8.04182C5.72772 8.27242 5.61241 8.38772 5.52996 8.52228C5.45685 8.64157 5.40298 8.77163 5.37032 8.90768C5.33348 9.06113 5.33348 9.22419 5.33348 9.55031V10.6667Z" stroke="#2492FF" stroke-linecap="round" stroke-linejoin="round"/>
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_197_250">
                                                    <rect width="16" height="16" fill="white"/>
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </button>
                                    <button className="border border-1 border-solid border-[#FE4949] rounded p-[0.4rem] hover:bg-red-100">
                                        <svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                            <path d="M10.6667 3.99998V3.46665C10.6667 2.71991 10.6667 2.34654 10.5213 2.06133C10.3935 1.81044 10.1895 1.60647 9.93865 1.47864C9.65344 1.33331 9.28007 1.33331 8.53333 1.33331H7.46667C6.71993 1.33331 6.34656 1.33331 6.06135 1.47864C5.81046 1.60647 5.60649 1.81044 5.47866 2.06133C5.33333 2.34654 5.33333 2.71991 5.33333 3.46665V3.99998M6.66667 7.66665V11M9.33333 7.66665V11M2 3.99998H14M12.6667 3.99998V11.4666C12.6667 12.5868 12.6667 13.1468 12.4487 13.5746C12.2569 13.951 11.951 14.2569 11.5746 14.4487C11.1468 14.6666 10.5868 14.6666 9.46667 14.6666H6.53333C5.41323 14.6666 4.85318 14.6666 4.42535 14.4487C4.04903 14.2569 3.74307 13.951 3.55132 13.5746C3.33333 13.1468 3.33333 12.5868 3.33333 11.4666V3.99998" stroke="#FE4949" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-center mb-5 mt-7" style={{direction: "rtl"}}>
                        <Pagination count={10} shape="rounded"/>
                    </div>
                </section>

                <Dialog
                    fullWidth={true}
                    open={openAddData}
                    keepMounted
                    onClose={handleCloseAddData}
                    aria-describedby="alert-dialog-slide-description"
                    PaperProps={{
                        style: {
                            fontFamily: "IRANYekan",
                        },
                    }}>
                    <DialogContent>
                        <DialogContentText style={{ fontFamily: "IRANYekan" }}>
                            <div className="flex justify-end">
                                <button onClick={handleCloseAddData}>
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
                                                    />}
                                            />
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
                                        <TextField
                                            fullWidth
                                            placeholder="پلاک (اجباری)"
                                            type="text"
                                            name="carTag"
                                            value={formik.values.carTag}
                                            onChange={formik.handleChange}
                                            error={formik.touched.carTag && Boolean(formik.errors.carTag)}
                                            helperText={formik.touched.carTag && formik.errors.carTag}
                                            inputProps={{style: {fontFamily: "IRANYekan",fontSize:"0.8rem"}}}
                                            InputLabelProps={{style: {fontFamily: "IRANYekan"}}}/>
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
            </div>
        </>
    )
}
