'use client'

import TextField from "@mui/material/TextField";
import React, {useEffect, useState} from "react";
import {
    Autocomplete,
    DialogContent,
    DialogContentText,
    FormControl, FormHelperText,
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
    useLazyGetAllSubOrganizationQuery, useLazyGetAllUnitQuery,
    useLazyGetAllVehicleCategoryQuery
} from "@/redux/features/category/CategorySlice";
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import {useSaveVehiclesMutation} from "@/redux/features/vehicles-and-equipment/VehiclesAndEquipmentSlice";

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

export default function EditInfoDialog(props) {

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
    }

    //submit data
    const [submitData, { isLoading:isSubmitLoading ,error}] = useSaveVehiclesMutation()
    const schema = yup.object().shape({
        type: yup.string().required("لطفا نوع محصول را وارد کنید"),
        subOrganizationId: yup.string().required("لطفا دپارتمان مورد نظر را انتخاب کنید"),
        status: yup.string().required("لطفا وضعیت را انتخاب کنید"),
    });

    const formik = useFormik({
        initialValues: {
            type: "",
            code:"",
            persianName: "",
            englishName: "",
            isExpirable:false,
            defaultUnit: "",
            imageURL:"",
            abbreviation:"",
        },

        validationSchema: schema,

        onSubmit: async (vehicle) => {
            console.log(vehicle)
            const userData = await submitData(vehicle)
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
                            <h3 className="text-[1.1rem]">ثبت کالا و محصولات</h3>
                        </div>
                        <form className="flex justify-center " onSubmit={formik.handleSubmit} method="POST">
                            <div className="flex flex-col justify-center w-[90%] gap-5">
                                <div>
                                    <TextField
                                        disabled={!formik.values.hasGps}
                                        fullWidth
                                        placeholder="نام فارسي محصول"
                                        type="text"
                                        name="gpsURL"
                                        value={formik.values.persianName}
                                        onChange={formik.handleChange}
                                        error={formik.touched.persianName && Boolean(formik.errors.persianName)}
                                        helperText={formik.touched.persianName && formik.errors.persianName}
                                        inputProps={{style: {fontFamily: "IRANYekan", fontSize: "0.8rem"}}}
                                        InputLabelProps={{style: {fontFamily: "IRANYekan"}}}/>
                                </div>
                                <div>
                                    <TextField
                                        disabled={!formik.values.hasGps}
                                        fullWidth
                                        placeholder="نام انگليسی محصول (اختباری)"
                                        type="text"
                                        name="gpsURL"
                                        value={formik.values.englishName}
                                        onChange={formik.handleChange}
                                        error={formik.touched.englishName && Boolean(formik.errors.englishName)}
                                        helperText={formik.touched.englishName && formik.errors.englishName}
                                        inputProps={{style: {fontFamily: "IRANYekan", fontSize: "0.8rem"}}}
                                        InputLabelProps={{style: {fontFamily: "IRANYekan"}}}/>
                                </div>
                                <div>
                                    <TextField
                                        disabled={!formik.values.hasGps}
                                        fullWidth
                                        placeholder="نام مخفف (اختباری)"
                                        type="text"
                                        name="gpsURL"
                                        value={formik.values.englishName}
                                        onChange={formik.handleChange}
                                        error={formik.touched.englishName && Boolean(formik.errors.englishName)}
                                        helperText={formik.touched.englishName && formik.errors.englishName}
                                        inputProps={{style: {fontFamily: "IRANYekan", fontSize: "0.8rem"}}}
                                        InputLabelProps={{style: {fontFamily: "IRANYekan"}}}/>
                                </div>
                                <div>
                                    <TextField
                                        disabled={!formik.values.hasGps}
                                        fullWidth
                                        placeholder="کد محصول (اختباری)"
                                        type="text"
                                        name="gpsURL"
                                        value={formik.values.englishName}
                                        onChange={formik.handleChange}
                                        error={formik.touched.englishName && Boolean(formik.errors.englishName)}
                                        helperText={formik.touched.englishName && formik.errors.englishName}
                                        inputProps={{style: {fontFamily: "IRANYekan", fontSize: "0.8rem"}}}
                                        InputLabelProps={{style: {fontFamily: "IRANYekan"}}}/>
                                </div>
                                <div>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label" sx={{fontFamily: "IRANYekan", fontSize: "0.8rem",color:"#9F9F9F"}}>نوع محصول </InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={formik.values.type}
                                            name="type"
                                            input={<OutlinedInput sx={{fontFamily: "IRANYekan", fontSize: "0.8rem"}} label="وضعیت" />}
                                            sx={{fontFamily: "IRANYekan", fontSize: "0.8rem"}}
                                            onChange={formik.handleChange}>
                                            <MenuItem value="PRIMARY" sx={{fontFamily: "IRANYekan", fontSize: "0.8rem"}}>ماده اولیه</MenuItem>
                                            <MenuItem value="EQUIPMENT" sx={{fontFamily: "IRANYekan", fontSize: "0.8rem"}}>تجهیزات</MenuItem>
                                            <MenuItem value="PRODUCED" sx={{fontFamily: "IRANYekan", fontSize: "0.8rem"}}>تولیدی</MenuItem>
                                            <MenuItem value="OTHER" sx={{fontFamily: "IRANYekan", fontSize: "0.8rem"}}>سایر</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                                <div>
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
                                                    style: {fontFamily: "IRANYekan", fontSize: "0.8rem"}
                                                }}
                                                placeholder="واحد"
                                            />}/>
                                </div>
                                <div>
                                    <div className="flex flex-col">
                                        <div className="flex w-full">
                                            <div className="border border-[#D9D9D9] py-4 w-1/2 px-3">
                                                <span className="text-[#9F9F9F] text-[0.8rem]">آیا داری تاريخ انتقضا است؟</span>
                                            </div>
                                            <div className="border border-[#D9D9D9] py-4 w-1/2">
                                                <div className="flex justify-center gap-2">
                                                    <span className="text-[#9F9F9F] text-[0.8rem]">خیر</span>
                                                    <AntSwitch checked={formik.values.hasGps} onChange={(e)=>{formik.setFieldValue("hasGps", e.target.checked)}}  inputProps={{ 'aria-label': 'ant design' }} />
                                                    <span className="text-[#9F9F9F] text-[0.8rem]">بله</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <TextField
                                        disabled={!formik.values.hasGps}
                                        fullWidth
                                        placeholder="API جی پی اس"
                                        type="text"
                                        name="gpsURL"
                                        value={formik.values.gpsURL}
                                        onChange={formik.handleChange}
                                        error={formik.touched.gpsURL && Boolean(formik.errors.gpsURL)}
                                        helperText={formik.touched.gpsURL && formik.errors.gpsURL}
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