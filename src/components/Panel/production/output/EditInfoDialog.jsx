'use client'
import TextField from "@mui/material/TextField";
import React, {useEffect, useState} from "react";
import {Autocomplete, DialogContent, DialogContentText,} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import {TailSpin} from "react-loader-spinner";
import * as yup from "yup";
import {useFormik} from "formik";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker, {DateObject} from "react-multi-date-picker";
import CircularProgress from '@mui/material/CircularProgress';
import "react-multi-date-picker/styles/colors/red.css"
import {useLazyGetAllProductQuery, useLazyGetAllUnitQuery} from "@/redux/features/category/CategorySlice";
import {useUpdateProductionOutputMutation} from "@/redux/features/production/output/ProductionOutputSlice";
import {PersianToEnglish} from "@/helper/PersianToEnglish";
import {ConvertToNull} from "@/helper/ConvertToNull";
import {ConvertToEmpty} from "@/helper/ConvertToEmpty";
import {toast} from "react-toastify";

export default function EditInfoDialog(props) {


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


    //date input
    const [date, setDate] = useState("")
    const handleDateInput = (value) => {
        if (value) {
            setDate(value)
            let month = value?.month < 10 ? ('0' + value?.month) : value?.month;
            let day = value?.day < 10 ? ('0' + value?.day) : value?.day;
            let convertDate = value?.year + '/' + month + '/' + day;
            formik.setFieldValue("expirationDate", convertDate)
        } else {
            formik.setFieldValue("expirationDate", "")
        }
    }


    const handleReset = () => {
        formik.resetForm()
        setDate("")
        setProduct(null)
        setUnit(null)

    }

    //submit data
    const [submitData, {isLoading: isSubmitLoading, error}] = useUpdateProductionOutputMutation()


    const schema = yup.object().shape({
        productId: yup.string().required("لطفا نام محصول را وارد کنید"),
        value: yup.string().required("لطفا مقدار محصول را وارد کنید").matches(
            /^[۰۱۲۳۴۵۶۷۸۹0.-9]+$/,
            "لطفا فقط عدد وارد نمایید"
        ),
        unit: yup.string().required("لطفا واحد محصول را وارد کنید"),


    });

    const formik = useFormik({
        initialValues: {
            productId: "",
            productName: "",
            value: "",
            unit: "",
            expirationDate: "",

        },


        validationSchema: schema,

        onSubmit: async (product, helpers) => {
            let updateProduct = {...product, type: "PRIMARY", value: PersianToEnglish(`${product.value}`)}

            updateProduct = ConvertToNull(updateProduct)
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
    const handleSetProductInput = (id) => {
        const product = productList.filter((product) => product.id === id)
        setProduct(product[0])
    }


    const handleSetUnitInput = (ab) => {
        const units = unitList.filter((unit) => unit.persianName === ab)
        setUnit(units[0])
    }


    const handleSetExpirationDate = (date) => {
        if (date !== null && date !== "") {
            const newDate = new DateObject({
                date: date,
                format: "YYYY/MM/DD",
                calendar: persian,
                locale: persian_fa
            })
            setDate(newDate)
        }
    }

    useEffect(() => {
        getProductList()
        getUnitList()
        const editInfoObj = ConvertToEmpty(props.editInfoTarget)
        formik.setValues({
            id: editInfoObj?.id,
            productId: editInfoObj?.productId,
            productName: editInfoObj?.productName,
            value: editInfoObj?.value,
            unit: editInfoObj?.unit,
            expirationDate: editInfoObj?.expirationDate,

        })
        handleSetProductInput(props.editInfoTarget?.productId)

        handleSetUnitInput(props.editInfoTarget?.unit)

        handleSetExpirationDate(props.editInfoTarget?.expirationDate)
    }, [props.openEditInfo])

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
                        fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", overflow: "visible"
                    },
                }}>
                <DialogContent>
                    <DialogContentText style={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}}>
                        <div className="flex justify-end">
                            <button onClick={() => {
                                props.handleCloseEditInfo();
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
                            <h3 className="text-[1.1rem]">ویرایش خروجی</h3>
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
                                        FormHelperTextProps={{ style: { fontFamily: '__fonts_2f4189,__fonts_Fallback_2f4189',fontSize:"0.6rem"}}}
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
                                        FormHelperTextProps={{ style: { fontFamily: '__fonts_2f4189,__fonts_Fallback_2f4189',fontSize:"0.6rem"}}}
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
                                    <DatePicker
                                        calendarPosition={`bottom`}
                                        className="red"
                                        digits={['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']}
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