'use client'
import TextField from "@mui/material/TextField";
import React, {useEffect, useState} from "react";
import { Autocomplete, DialogContent, DialogContentText ,FormControlLabel,Checkbox,FormControl,InputLabel,Select,OutlinedInput,MenuItem,Typography} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import {TailSpin} from "react-loader-spinner";
import * as yup from "yup";
import {useFormik} from "formik";
import { useUpdateIndividualMutation } from "@/redux/features/organization/individual/IndividualSlice";
import EditIndividualRelationshipInfoDialog from "./EditIndividualRelationshipDialog";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker,{DateObject} from "react-multi-date-picker";
import { useLazyGetAllRoleListQuery } from "@/redux/features/category/CategoryRoleSlice";
import CircularProgress from '@mui/material/CircularProgress';
import { PersianToEnglish } from "@/helper/PersianToEnglish";
import { ConvertToNull } from "@/helper/ConvertToNull";
import { ConvertToEmpty } from "@/helper/ConvertToEmpty";
import {toast} from "react-toastify";
export default function EditIndividualInfoDialog(props) {
    
  const [individual,setIndividual] = useState(null)

 
  const [cLevel,setCLevel]=useState(props.editIndividualInfoTarget?.cLevel)
  const handleChangeClevel = (event) => {
    setCLevel(event.target.checked);
  };
    const [submitData, { isLoading:isSubmitLoading ,error}] = useUpdateIndividualMutation()

    

    
    const [role,setRole] = useState(null)
    const [openRoleList,setOpenRoleList] = useState(false)
    const [getRoleList,{ data : roleList  = [] , isLoading : isRoleLoading, isError: roleIsError }] = useLazyGetAllRoleListQuery()
    useEffect(()=>{
        if(openRoleList){
            getRoleList()
        }
    },[openRoleList])

    const schema = yup.object().shape({
      fullName: yup.string("لطفا نام و نام خانوادگی شخص را درست وارد نمایید").required("لطفا نام و نام خانوادگی شخص را وارد کنید"),
      nationalCode: yup.string().matches(
        /^[۰۱۲۳۴۵۶۷۸۹0-9]+$/,
        "لطفا فقط عدد وارد نمایید"
      ).min(10, "تعداد رقم وارد شده کم می باشد").max(10, "تعداد رقم وارد شده زیاد می باشد").required("لطفا کد ملی را وارد کنید"),
      personalCode: yup.string().required("لطفا کد پرسنلی خود را وارد کنید"),
      birthDate: yup.date().required("لطفا تاریخ تولد را وارد کنید"),
      fatherName: yup.string("لطفا نام پدر را درست وارد نمایید").required("لطفا نام پدر را وارد نمایید"),
      gender: yup.string().required("لطفا جنسیت را وارد نمایید"),
      role: yup.string(),
      originalPhoneNumber: yup.string().required("لطفا شماره همراه را وارد نمایید").matches(
        /^[۰۱۲۳۴۵۶۷۸۹0-9]+$/,
        "لطفا فقط عدد وارد نمایید"
      ).min(11, "تعداد رقم وارد شده کم می باشد").max(11, "تعداد رقم وارد شده زیاد می باشد"),
      anotherPhoneNumber: yup.string().matches(
        /^[۰۱۲۳۴۵۶۷۸۹0-9]+$/,
        "لطفا فقط عدد وارد نمایید"
      ).min(11, "تعداد رقم وارد شده کم می باشد").max(11, "تعداد رقم وارد شده زیاد می باشد"),
      telephoneNumber: yup.string().required("لطفا تلفن ثابت خود را وارد کنید را وارد نمایید").matches(
        /^[۰۱۲۳۴۵۶۷۸۹0-9]+$/,
        "لطفا فقط عدد وارد نمایید"
      ).min(11, "لطفا شماره تلفن ثابت خود را به همراه کد استان وارد کنید برای مثال برای تهران 021").max(11, "تعداد رقم وارد شده زیاد می باشد"),
      education: yup.string().required(),
      email: yup.string().email("فرمت ایمیل باید صحیح باشد"),
      address: yup.string(),

    });

    const formik = useFormik({

        initialValues: {
          individualId:"",
          fullName: "",
          nationalCode: "",
          personalCode: "",
          birthDate: "",
          fatherName: "",
          gender: "",
          role: "",
          originalPhoneNumber: "",
          anotherPhoneNumber: "",
          telephoneNumber: "",
          education: "",
          email: "",
          address: "",
          cLevel:false
          
        },

        

        validationSchema: schema,

        onSubmit: async (individual,helpers) => {
            let body = {...individual,cLevel:cLevel,originalPhoneNumber:PersianToEnglish(individual.originalPhoneNumber),anotherPhoneNumber:PersianToEnglish(individual.anotherPhoneNumber),telephoneNumber:PersianToEnglish(individual.telephoneNumber),nationalCode:PersianToEnglish(individual.nationalCode),personalCode:PersianToEnglish(individual.personalCode),
                organizationId:window.sessionStorage.getItem("organizationId"),
                subOrganizationId:window.sessionStorage.getItem("subOrganizationId"),
                
            }
            body=ConvertToNull(body)
            try {
                const userData = await submitData(body)
                if (userData.error) {
                    if (/.*[a-zA-Z].*/.test(userData.error.data.message)) {
                        throw new Error("سیستم با خطا رو به رو شده است")
                    } else {
                        throw new Error(userData.error.data.message)
                    }
                }
                handleReset()
                props.handleCloseEditIndividualInfo()
                props.handleOpenEditIndividualRelationshipInfo(userData.data)
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
    
    const handleSetBirthDate = (date)=>{
      if(date !== "" && date!==null){
          const newDate = new DateObject({
              date: date,
              format: "YYYY/MM/DD",
              calendar: persian,
              locale: persian_fa
          })
          setDate(newDate)
      }
  }
  const handleSetRole = (ab) =>{
    console.log(roleList)
    const roles= roleList.filter((role)=> role.role === ab)
    setRole(roles[0])
}
    useEffect(()=>{
        
      const editInfoObj = ConvertToEmpty(props.editIndividualInfoTarget)
        formik.setValues({
            id:editInfoObj?.id,
            fullName: editInfoObj?.fullName,
            nationalCode: editInfoObj?.nationalCode,
            personalCode: editInfoObj?.personalCode,
            birthDate: editInfoObj?.birthDate,
            fatherName: editInfoObj?.fatherName,
            gender: editInfoObj?.gender,
            role: editInfoObj?.role,
            originalPhoneNumber: editInfoObj?.originalPhoneNumber,
            anotherPhoneNumber: editInfoObj?.anotherPhoneNumber,
            telephoneNumber: editInfoObj?.telephoneNumber,
            education: editInfoObj?.education,
            email: editInfoObj?.email,
            address: editInfoObj?.address,
            cLevel:editInfoObj?.cLevel
          
        })
        handleSetBirthDate(props.editIndividualInfoTarget?.birthDate)
        handleSetRole(props.editIndividualInfoTarget?.role)
    },[props.openEditIndividualInfo])
   
    

   
    

    const handleReset = () =>{
        formik.resetForm()
        
        setIndividual(null)
       
    }
    const [date, setDate] = useState("")
  const handleDateInput = (value) => {
    if (value) {
      setDate(value)
      let month = value?.month < 10 ? ('0' + value?.month) : value?.month;
      let day = value?.day < 10 ? ('0' + value?.day) : value?.day;
      let convertDate = value?.year + '/' + month + '/' + day;
      formik.setFieldValue("birthDate", convertDate)
    } else {
      formik.setFieldValue("birthDate", "")
    }
  }

 
    return (
        <>
            <Dialog
                fullWidth={true}
                open={props.openEditIndividualInfo}
                keepMounted
                // onClose={()=>{props.handleCloseEditIndividualInfo();handleReset()}}
                aria-describedby="alert-dialog-slide-description"
                PaperProps={{
                    style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189",overflow:"visible"}
                }}>
                <DialogContent>
                    <DialogContentText style={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}}>
                        <div className="flex justify-end">
                            <button onClick={()=>{props.handleCloseEditIndividualInfo();handleReset()}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 14 14"
                                     fill="none">
                                    <path d="M13 1L1 13M1 1L13 13" stroke="black" stroke-width="2"
                                          stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                        </div>
                        <div className="flex justify-center mb-7">
                            <h3 className="text-[1.1rem]">ویرایش افراد</h3>
                        </div>
                        <form className="flex justify-center " onSubmit={formik.handleSubmit} method="POST">
              <div className="flex flex-col justify-center w-[90%] gap-5">
                <div>
                  <TextField
                                        FormHelperTextProps={{ style: { fontFamily: '__fonts_2f4189,__fonts_Fallback_2f4189',fontSize:"0.6rem"}}}
                    fullWidth
                    placeholder="نام و نام خانوادگی"
                    type="text"
                    name="fullName"
                    value={formik.values.fullName}
                    onChange={formik.handleChange}
                    error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                    helperText={formik.touched.fullName && formik.errors.fullName}
                    inputProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}}
                                        InputLabelProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}}}/>
                                        </div>
                <div className="flex justify-between sm:flex-row flex-col gap-5">
                  <div className="sm:w-[45%]">
                    <TextField
                                        FormHelperTextProps={{ style: { fontFamily: '__fonts_2f4189,__fonts_Fallback_2f4189',fontSize:"0.6rem"}}}
                      fullWidth
                      placeholder="کدملی"
                      type="text"
                      name="nationalCode"
                      value={formik.values.nationalCode}
                      onChange={formik.handleChange}
                      error={formik.touched.nationalCode && Boolean(formik.errors.nationalCode)}
                      helperText={formik.touched.nationalCode && formik.errors.nationalCode}
                      inputProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}}
                                        InputLabelProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}}}/>
                  </div>
                  <div className="sm:w-[45%]">
                    <TextField
                                        FormHelperTextProps={{ style: { fontFamily: '__fonts_2f4189,__fonts_Fallback_2f4189',fontSize:"0.6rem"}}}
                      fullWidth
                      placeholder="کد پرسنلی"
                      type="text"
                      name="personalCode"
                      value={formik.values.personalCode}
                      onChange={formik.handleChange}
                      error={formik.touched.personalCode && Boolean(formik.errors.personalCode)}
                      helperText={formik.touched.personalCode && formik.errors.personalCode}
                      inputProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}}
                      InputLabelProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}}}/>
                  </div>
                </div>
                <div className="flex justify-between sm:flex-row flex-col gap-5">
                  <div className="flex flex-col sm:w-[45%]">
                    <DatePicker
                      
                      calendarPosition={`bottom`}
                      className="red"
                      digits={['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']}
                      format={`YYYY/MM/DD`}
                      containerStyle={{
                        width: "100%"
                      }}
                      
                      
                      placeholder="تاریخ تولد"
                      inputClass={`border border-[#D9D9D9] placeholder-neutral-300 text-gray-900 text-[0.8rem] rounded focus:ring-[#3B82F67F] focus:border-[#3B82F67F] block w-full px-3 py-4`}
                      value={date}
                      onChange={(value) => {
                        handleDateInput(value)
                      }}
                      mapDays={({ date }) => {
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
                      <button className="px-2 pb-4" onClick={() => {
                        setDate("")
                        formik.setFieldValue("birthDate", "")
                      }}>
                        ریست
                      </button>
                    </DatePicker>
                    <div>
                                        {
                                            Boolean(formik.errors.birthDate) && (
                                                <span className="mx-3 text-[0.6rem] text-red-600 ">
                                                    {formik.errors.birthDate}
                                                </span>
                                            )
                                        }
                                    </div>
                  </div>
                  <div className="sm:w-[45%]">

                    <TextField
                                        FormHelperTextProps={{ style: { fontFamily: '__fonts_2f4189,__fonts_Fallback_2f4189',fontSize:"0.6rem"}}}
                      fullWidth
                      placeholder="نام پدر"
                      type="text"
                      name="fatherName"
                      value={formik.values.fatherName}
                      onChange={formik.handleChange}
                      error={formik.touched.fatherName && Boolean(formik.errors.fatherName)}
                      helperText={formik.touched.fatherName && formik.errors.fatherName}
                      inputProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}}
                      InputLabelProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}}}/>


                  </div>
                </div>
                <div className="flex justify-between sm:flex-row flex-col gap-5">


                  <div className="sm:w-[45%]">
                  <FormControl fullWidth error={formik.touched.gender && Boolean(formik.errors.gender)}>
                    <InputLabel id="demo-simple-select-label" sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem",color:"#9F9F9F"}}>جنسیت</InputLabel>
                            <Select
                                           
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={formik.values.gender}
                                name="gender"
                                input={<OutlinedInput sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}  label="جنسیت" />}
                                sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}
                                onChange={formik.handleChange}>
                                <MenuItem value="male" sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}>مرد</MenuItem>
                                <MenuItem value="female" sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}>زن</MenuItem>
                                <MenuItem value="other" sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}>دیگر</MenuItem>
                            </Select>
                                        
                  </FormControl>
                  </div>
                  <div className="sm:w-[45%]">
                  <Autocomplete
                                        FormHelperTextProps={{ style: { fontFamily: '__fonts_2f4189,__fonts_Fallback_2f4189',fontSize:"0.6rem"}}}
                                        open={openRoleList}
                                        onOpen={() => {
                                            setOpenRoleList(true);
                                        }}
                                        onClose={() => {
                                            setOpenRoleList(false);
                                        }}
                                        fullWidth
                                        clearOnEscape
                                        disablePortal
                                        id="combo-box-demo"
                                        ListboxProps={{
                                            sx: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"},
                                        }}
                                        options={roleList}
                                        getOptionLabel={(option) => option.role}
                                        value={role}
                                        onChange={(event, newValue) => {
                                            setRole(newValue)
                                            formik.setFieldValue("role", newValue?.role)
                                            
                                        }}
                                        renderInput={(params) =>
                                            <TextField
                                        FormHelperTextProps={{ style: { fontFamily: '__fonts_2f4189,__fonts_Fallback_2f4189',fontSize:"0.6rem"}}}
                                                error={formik.touched.role && Boolean(formik.errors.role)}
                                                helperText={formik.touched.role && formik.errors.role}
                                                {...params}
                                                InputProps={{
                                                    ...params.InputProps,
                                                    style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"},
                                                    endAdornment:(
                                                        <React.Fragment>
                                                            {isRoleLoading ? <CircularProgress color="inherit" size={20} /> : null}
                                                            {params.InputProps.endAdornment}
                                                        </React.Fragment>
                                                    )
                                            }}
                                                placeholder=" نام نقش (اجباری)"
                                            />}
                                    />
                  </div>

                </div>
                <div className="flex justify-between sm:flex-row flex-col gap-5">
                  <div className="sm:w-[45%]">
                    <TextField
                                        FormHelperTextProps={{ style: { fontFamily: '__fonts_2f4189,__fonts_Fallback_2f4189',fontSize:"0.6rem"}}}
                      fullWidth
                      placeholder="شماره همراه"
                      type="text"
                      name="originalPhoneNumber"
                      value={formik.values.originalPhoneNumber}
                      onChange={formik.handleChange}
                      error={formik.touched.originalPhoneNumber && Boolean(formik.errors.originalPhoneNumber)}
                      helperText={formik.touched.originalPhoneNumber && formik.errors.originalPhoneNumber}
                      inputProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}}
                                        InputLabelProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}}}/>
                  </div>
                  <div className="sm:w-[45%]">
                       <TextField
                                        FormHelperTextProps={{ style: { fontFamily: '__fonts_2f4189,__fonts_Fallback_2f4189',fontSize:"0.6rem"}}}
                         
                         fullWidth
                         placeholder="شماره همراه دوم"
                         type="text"
                         name="anotherPhoneNumber"
                         value={formik.values.anotherPhoneNumber}
                         onChange={formik.handleChange}
                         error={formik.touched.anotherPhoneNumber && Boolean(formik.errors.anotherPhoneNumber)}
                         helperText={formik.touched.anotherPhoneNumber && formik.errors.anotherPhoneNumber}
                         inputProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}}
                                        InputLabelProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}}}/>
                    </div>
                 
                </div>
                <div className="">
                    <TextField
                                        FormHelperTextProps={{ style: { fontFamily: '__fonts_2f4189,__fonts_Fallback_2f4189',fontSize:"0.6rem"}}}
                      fullWidth
                      placeholder="شماره ثابت"
                      type="text"
                      name="telephoneNumber"
                      value={formik.values.telephoneNumber}
                      onChange={formik.handleChange}
                      error={formik.touched.telephoneNumber && Boolean(formik.errors.telephoneNumber)}
                      helperText={formik.touched.telephoneNumber && formik.errors.telephoneNumber}
                      inputProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}}
                      InputLabelProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}}}/>
                  </div>
                  
                   
                  
                
                <div>
                  
                </div>
                <div >
                  <FormControl fullWidth error={formik.touched.education && Boolean(formik.errors.education)}>
                    <InputLabel id="demo-simple-select-label" sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem",color:"#9F9F9F"}}>تحصیلات</InputLabel>
                            <Select
                                           
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={formik.values.education}
                                name="education"
                                input={<OutlinedInput sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}  label="تحصیلات" />}
                                sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}
                                onChange={formik.handleChange}>
                                <MenuItem value="زیر دیپلم" sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}>زیر دیپلم</MenuItem>
                                <MenuItem value="دیپلم" sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}>دیپلم</MenuItem>
                                <MenuItem value="فوق دیپلم" sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}>فوق دیپلم</MenuItem>
                                <MenuItem value="لیسانس" sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}>لیسانس</MenuItem>
                                <MenuItem value="فوق لیسانس" sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}>فوق لیسانس</MenuItem>
                                <MenuItem value="دکتری" sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}>دکتری</MenuItem>
                            </Select>
                                        
                  </FormControl>

                </div>
                <div className="">

                  <TextField
                                        FormHelperTextProps={{ style: { fontFamily: '__fonts_2f4189,__fonts_Fallback_2f4189',fontSize:"0.6rem"}}}
                    fullWidth
                    placeholder="ایمیل"
                    type="text"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    inputProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}}
                                        InputLabelProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}}}/>


                </div>
                <div className="">

                  <TextField
                                        FormHelperTextProps={{ style: { fontFamily: '__fonts_2f4189,__fonts_Fallback_2f4189',fontSize:"0.6rem"}}}
                    fullWidth
                    placeholder="آدرس"
                    type="text"
                    name="address"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    error={formik.touched.address && Boolean(formik.errors.address)}
                    helperText={formik.touched.address && formik.errors.address}
                    inputProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}}
                                        InputLabelProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}}}/>


                </div>
                <div className="w-full  border border-[#D9D9D9] flex flex-col gap-2 px-4">
                    <FormControlLabel control={<Checkbox checked={cLevel} onChange={handleChangeClevel} />}   label={<Typography sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189",fontSize:"14px"}}>دسترسی مدیریت</Typography>} />
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
                        visible={true} />
                      بعدی
                    </button>) : (
                      <button type="submit"
                        className="w-full rounded-[0.5rem] py-3  hover:opacity-80 font-bold  bg-mainRed text-white">بعدی
                      </button>
                    )
                  }
                </div>
              </div>
            </form>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
            <EditIndividualRelationshipInfoDialog 
        editIndividualRelationshipInfoTarget={
          props.editIndividualRelationshipInfoTarget
        }
        handleCloseEditIndividualRelationshipInfo={
          props.handleCloseEditIndividualRelationshipInfo
        }
        openEditIndividualRelationshipInfo={props.openEditIndividualRelationshipInfo}
        
      /> 
        </>
    )
}