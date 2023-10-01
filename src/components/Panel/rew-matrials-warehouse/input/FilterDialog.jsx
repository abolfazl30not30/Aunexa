'use client'
import TextField from "@mui/material/TextField";
import React, {useState} from "react";
import {
    Autocomplete,
} from "@mui/material";
import {
    DialogContent,
    DialogContentText,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import {TailSpin} from "react-loader-spinner";
import * as yup from "yup";
import {useFormik} from "formik";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker from "react-multi-date-picker";
import "react-multi-date-picker/styles/colors/red.css"


export default function FilterDialog(props) {


    const top100Films = [
        "کربوهیدارت",
        "مس سولفات"
    ]

    const formik = useFormik({

        initialValues: {
            dateFrom: "",
            dateTo: "",
            material:"",
            carType:"",
            status:"",
            productionLine:"",
        },

        onSubmit: async ({}) => {
            try{

            }catch (err){
            }
        },
    });


    return(
        <>
            <Dialog
                fullWidth={true}
                open={props.openFilter}
                keepMounted
                onClose={props.handleCloseFilter}
                aria-describedby="alert-dialog-slide-description"
                PaperProps={{
                    style: {
                        fontFamily: "IRANYekan",
                    },
                }}>
                <DialogContent>
                    <DialogContentText style={{ fontFamily: "IRANYekan" }}>
                        <div className="flex justify-end">
                            <button onClick={props.handleCloseFilter}>
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
                                <div className="flex flex-col md:flex-row justify-between">
                                    <div>
                                        <div className="mb-2">
                                            <label className="text-[0.8rem] text-gray80 ">از تاریخ</label>
                                        </div>
                                        <DatePicker
                                            calendarPosition={`bottom`}
                                            className="red"
                                            digits={['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']}
                                            format={`YYYY/MM/DD`}
                                            containerStyle={{
                                                width: "100%"
                                            }}
                                            inputClass={`border border-[#D9D9D9] placeholder-neutral-300 text-gray-900 text-[0.8rem] rounded focus:ring-[#3B82F67F] focus:border-[#3B82F67F] block w-full px-3 py-4`}
                                            value={formik.values.dateFrom}
                                            onChange={(value) => {
                                                formik.setFieldValue("dateFrom",value)
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
                                                formik.setFieldValue("dateFrom","")}}>
                                                ریست
                                            </button>
                                        </DatePicker>
                                    </div>
                                    <div>
                                        <div className="mb-2 mt-3 md:mt-0">
                                            <label className="text-[0.8rem] text-gray80 ">تا تاریخ</label>
                                        </div>
                                        <DatePicker
                                            calendarPosition={`bottom`}
                                            className="red"
                                            digits={['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']}
                                            format={`YYYY/MM/DD`}
                                            containerStyle={{
                                                width: "100%"
                                            }}
                                            inputClass={`border border-[#D9D9D9] placeholder-neutral-300 text-gray-900 text-[0.8rem] rounded focus:ring-[#3B82F67F] focus:border-[#3B82F67F] block w-full px-3 py-4`}
                                            value={formik.values.dateTo}
                                            onChange={(value) => {
                                                formik.setFieldValue("dateTo",value)
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
                                                formik.setFieldValue("dateTo","")}}>
                                                ریست
                                            </button>
                                        </DatePicker>
                                    </div>
                                </div>
                                <div className=" flex flex-col">
                                    <div className="mb-2">
                                        <label className="text-[0.8rem] text-gray80 ">نوع محصول</label>
                                    </div>
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
                                            />}
                                    />
                                </div>
                                <div className=" flex flex-col">
                                    <div className="mb-2">
                                        <label className="text-[0.8rem] text-gray80 ">نوع وسیله</label>
                                    </div>
                                    <Autocomplete
                                        fullWidth
                                        disablePortal
                                        id="combo-box-demo"
                                        ListboxProps={{
                                            sx: { fontFamily: "IRANYekan",fontSize:"0.8rem"},
                                        }}
                                        options={top100Films}
                                        value={formik.values.carType}
                                        onChange={(event, newValue) => {
                                            formik.setFieldValue("material", newValue)
                                        }}
                                        renderInput={(params) =>
                                            <TextField
                                                error={formik.touched.carType && Boolean(formik.errors.carType)}
                                                helperText={formik.touched.carType && formik.errors.carType}
                                                {...params}
                                                InputProps={{ ...params.InputProps, style: {fontFamily: "IRANYekan",fontSize:"0.8rem"} }}
                                            />}
                                    />
                                </div>
                                <div className=" flex flex-col">
                                    <div className="mb-2">
                                        <label className="text-[0.8rem] text-gray80 ">وضیعت</label>
                                    </div>
                                    <Autocomplete
                                        fullWidth
                                        disablePortal
                                        id="combo-box-demo"
                                        ListboxProps={{
                                            sx: { fontFamily: "IRANYekan",fontSize:"0.8rem"},
                                        }}
                                        options={top100Films}
                                        value={formik.values.status}
                                        onChange={(event, newValue) => {
                                            formik.setFieldValue("material", newValue)
                                        }}
                                        renderInput={(params) =>
                                            <TextField
                                                error={formik.touched.status && Boolean(formik.errors.status)}
                                                helperText={formik.touched.status && formik.errors.status}
                                                {...params}
                                                InputProps={{ ...params.InputProps, style: {fontFamily: "IRANYekan",fontSize:"0.8rem"} }}
                                            />}
                                    />
                                </div>
                                <div className=" flex flex-col">
                                    <div className="mb-2">
                                        <label className="text-[0.8rem] text-gray80 ">لاین تولید</label>
                                    </div>
                                    <Autocomplete
                                        fullWidth
                                        disablePortal
                                        id="combo-box-demo"
                                        ListboxProps={{
                                            sx: { fontFamily: "IRANYekan",fontSize:"0.8rem"},
                                        }}
                                        options={top100Films}
                                        value={formik.values.productionLine}
                                        onChange={(event, newValue) => {
                                            formik.setFieldValue("material", newValue)
                                        }}
                                        renderInput={(params) =>
                                            <TextField
                                                error={formik.touched.productionLine && Boolean(formik.errors.productionLine)}
                                                helperText={formik.touched.productionLine && formik.errors.productionLine}
                                                {...params}
                                                InputProps={{ ...params.InputProps, style: {fontFamily: "IRANYekan",fontSize:"0.8rem"} }}
                                            />}
                                    />
                                </div>
                                <div className="mt-4">
                                    <button type="submit"
                                            className="w-full text-[0.9rem] rounded-[0.5rem] py-3 hover:border hover:opacity-80 font-bold  bg-mainRed text-white">اعمال فیلتر
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