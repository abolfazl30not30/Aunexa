'use client'
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import { Autocomplete, DialogContent, DialogContentText ,FormControlLabel,Checkbox} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { TailSpin } from "react-loader-spinner";
import * as yup from "yup";
import { useFormik } from "formik";
import CircularProgress from '@mui/material/CircularProgress';
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker from "react-multi-date-picker";
import AddIndividualRelationshipDialog from "./AddIndividualRelationshipDialog";

import { useSaveMutation } from "@/redux/features/organization/individual/IndividualSlice";

export default function AddIndividualDialog(props) {

  const [individual, setIndividual] = useState(null)
  const [cLevel,setClevel]=useState(false)



  const handleReset = () => {
    formik.resetForm()
    setIndividual(null)
    setDate("")
    setGender(null)
    setEducation(null)
  }

  const [submitData, { isLoading: isSubmitLoading, error }] = useSaveMutation()
  const schema = yup.object().shape({
    fullname: yup.string("لطفا نام و نام خانوادگی شخص را درست وارد نمایید").required("لطفا نام و نام خانوادگی شخص را وارد کنید"),
    nationalCode: yup.number("لطفا فقط عدد وارد نمایید").min(10, "تعداد رقم وارد شده کم می باشد").max(10, "تعداد رقم وارد شده زیاد می باشد").required("لطفا کد ملی را وارد کنید"),
    personalCode: yup.string(),
    birthDate: yup.date().required("لطفا تاریخ تولد را وارد کنید"),
    fatherName: yup.string("لطفا نام پدر را درست وارد نمایید").required("لطفا نام پدر را وارد نمایید"),
    gender: yup.string().required("لطفا جنسیت را وارد نمایید"),
    role: yup.string("لطفا نقش را به درستی وارد نمایید").required("لطفا نقش را وارد نمایید"),
    originalPhoneNumber: yup.number("لطفا فقط عدد وارد نمایید").required("لطفا شماره همراه را وارد نمایید").min(11, "تعداد رقم وارد شده کم می باشد").max(11, "تعداد رقم وارد شده زیاد می باشد"),
    anotherPhoneNumber: yup.number("لطفا فقط عدد وارد نمایید").required("لطفا شماره همراه را وارد نمایید").min(11, "تعداد رقم وارد شده کم می باشد").max(11, "تعداد رقم وارد شده زیاد می باشد"),
    telePhoneNumber: yup.number("لطفا فقط عدد وارد نمایید").required("لطفا شماره تلفن را با کد شهر (به عنوان مثال برای تهران 021) وارد نمایید").min(11, "تعداد رقم وارد شده کم می باشد").max(11, "تعداد رقم وارد شده زیاد می باشد"),
    education: yup.string().required("لطفا سطح تحصیلات را وارد کنید"),
    email: yup.string().email().required("لطفا ایمیل را وارد نمایید"),
    address: yup.string().required("لطفا آدرس را وارد کنید"),

  });


  const formik = useFormik({
    initialValues: {
      fullname: "",
      nationalCode: "",
      personalCode: "",
      birthDate: "",
      fatherName: "",
      gender: "",
      role: "",
      originalPhoneNumber: "",
      anotherPhoneNumber: "",
      telePhoneNumber: "",
      education: "",
      email: "",
      address: "",
      cLevel:""

    },



    validationSchema: schema,

    onSubmit: async (individual, helpers) => {
      let updateIndividual = { ...individual }
      const userData = await submitData(updateIndividual)
      handleReset()
      props.handleCloseAddIndividual()
      props.handleOpenAddIndividualRelationship()
    },
  });


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

  const [gender, setGender] = useState(null)
  const genderList = [
    { label: 'زن' },
    { label: 'مرد' },
    { label: 'دیگر' },
  ];


  const [education, setEducation] = useState(null)
  const educationList = [
    { label: 'زیر دیپلم' },
    { label: 'دیپلم' },
    { label: 'کاردانی' },
    { label: 'لیسانس' },
    { label: 'فوق لیسانس' },
    { label: 'دکتری' },
  ];


  let anotherPhoneNumbers = []
  const handleSendAnotherPhoneNumber = () => {
    anotherPhoneNumbers.push(formik.values.anotherPhoneNumber)

  }
  const handleDeleteAnotherNumber = () => {
    if (formik.values.anotherPhoneNumber) {
      anotherPhoneNumbers.filter((phoneNumber) => {
        formik.values.anotherPhoneNumber !== phoneNumber
      })
    }
  }


  const [anotherPhoneNumberCount,setAnotherPhoneNumberCount]=useState([])
  



  return (
    <>
      <Dialog
        fullWidth={true}
        open={props.openAddIndividual}
        keepMounted
        onClose={() => { props.handleCloseAddIndividual(); handleReset() }}
        aria-describedby="alert-dialog-slide-description"
        PaperProps={{
          style: {
            fontFamily: "IRANYekan",
          },
        }}>
        <DialogContent>
          <DialogContentText style={{ fontFamily: "IRANYekan" }}>
            <div className="flex justify-end">
              <button onClick={() => { props.handleCloseAddIndividual(); handleReset() }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 14 14"
                  fill="none">
                  <path d="M13 1L1 13M1 1L13 13" stroke="black" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </button>
            </div>
            <div className="flex justify-center mb-7">
              <h3 className="text-[1.1rem]">ثبت افراد</h3>
            </div>
            <form className="flex justify-center " onSubmit={formik.handleSubmit} method="POST">
              <div className="flex flex-col justify-center w-[90%] gap-5">
                <div>
                  <TextField
                    fullWidth
                    placeholder="نام و نام خانوادگی"
                    type="text"
                    name="fullname"
                    value={formik.values.fullname}
                    onChange={formik.handleChange}
                    error={formik.touched.fullname && Boolean(formik.errors.fullname)}
                    inputProps={{ style: { fontFamily: "IRANYekan", fontSize: "0.8rem" } }}
                    InputLabelProps={{ style: { fontFamily: "IRANYekan" } }} />
                </div>
                <div className="flex justify-between">
                  <div className="w-2/5">
                    <TextField
                      fullWidth
                      placeholder="کدملی"
                      type="text"
                      name="nationalCode"
                      value={formik.values.nationalCode}
                      onChange={formik.handleChange}
                      error={formik.touched.nationalCode && Boolean(formik.errors.nationalCode)}

                      inputProps={{ style: { fontFamily: "IRANYekan", fontSize: "0.8rem" } }}
                      InputLabelProps={{ style: { fontFamily: "IRANYekan" } }} />
                  </div>
                  <div className="w-2/5">
                    <TextField
                      fullWidth
                      placeholder="کد پرسنلی"
                      type="text"
                      name="personalCode"
                      value={formik.values.personalCode}
                      onChange={formik.handleChange}
                      error={formik.touched.personalCode && Boolean(formik.errors.personalCode)}
                      inputProps={{ style: { fontFamily: "IRANYekan", fontSize: "0.8rem" } }}
                      InputLabelProps={{ style: { fontFamily: "IRANYekan" } }} />
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="w-2/5">
                    <DatePicker
                      calendarPosition={`bottom`}
                      className="red"
                      digits={['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']}
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
                  <div className="w-2/5">

                    <TextField
                      fullWidth
                      placeholder="نام پدر"
                      type="text"
                      name="fatherName"
                      value={formik.values.fatherName}
                      onChange={formik.handleChange}
                      error={formik.touched.fatherName && Boolean(formik.errors.fatherName)}
                      inputProps={{ style: { fontFamily: "IRANYekan", fontSize: "0.8rem" } }}
                      InputLabelProps={{ style: { fontFamily: "IRANYekan" } }} />


                  </div>
                </div>
                <div className="flex justify-between">


                  <div className="w-2/5">
                    <Autocomplete
                      fullWidth
                      clearOnEscape
                      disablePortal
                      id="combo-box-demo"
                      options={genderList}
                      sx={{ width: 300 }}
                      value={gender}
                      onChange={(event, newValue) => {
                        setGender(newValue)
                        formik.setFieldValue("gender", newValue.abbreviation)
                      }}
                      renderInput={(params) => <TextField error={formik.touched.gender && Boolean(formik.errors.gender)}
                        helperText={formik.touched.gender && formik.errors.gender}
                        InputProps={{
                          ...params.InputProps,
                          style: { fontFamily: "IRANYekan", fontSize: "0.8rem" }
                        }} {...params} placeholder="جنسیت" />}
                    />
                  </div>
                  <div className="w-2/5">
                    <TextField
                      fullWidth
                      placeholder="نقش"
                      type="text"
                      name="role"
                      value={formik.values.role}
                      onChange={formik.handleChange}
                      error={formik.touched.role && Boolean(formik.errors.role)}
                      inputProps={{ style: { fontFamily: "IRANYekan", fontSize: "0.8rem" } }}
                      InputLabelProps={{ style: { fontFamily: "IRANYekan" } }} />
                  </div>

                </div>
                <div className="flex justify-between">
                  <div className="w-2/5">
                    <TextField
                      fullWidth
                      placeholder="شماره همراه"
                      type="text"
                      name="originalPhoneNumber"
                      value={formik.values.originalPhoneNumber}
                      onChange={formik.handleChange}
                      error={formik.touched.originalPhoneNumber && Boolean(formik.errors.originalPhoneNumber)}
                      inputProps={{ style: { fontFamily: "IRANYekan", fontSize: "0.8rem" } }}
                      InputLabelProps={{ style: { fontFamily: "IRANYekan" } }} />
                  </div>
                  <div className="w-2/5">
                    <TextField
                      fullWidth
                      placeholder="شماره ثابت"
                      type="text"
                      name="telePhoneNumber"
                      value={formik.values.telePhoneNumber}
                      onChange={formik.handleChange}
                      error={formik.touched.telePhoneNumber && Boolean(formik.errors.telePhoneNumber)}
                      inputProps={{ style: { fontFamily: "IRANYekan", fontSize: "0.8rem" } }}
                      InputLabelProps={{ style: { fontFamily: "IRANYekan" } }} />
                  </div>
                </div>
                <div className="flex justify-between">
                  {anotherPhoneNumberCount.map((addAnotherPhoneNumber,index)=>{
                    <div className="w-2/5">
                       <TextField
                         onBlur={handleSendAnotherPhoneNumber}
                         onFocus={handleDeleteAnotherNumber}
                         fullWidth
                         placeholder="شماره همراه"
                         type="text"
                         name="anotherPhoneNumber"
                         value={formik.values.anotherPhoneNumber}
                         onChange={formik.handleChange}
                         error={formik.touched.anotherPhoneNumber && Boolean(formik.errors.anotherPhoneNumber)}
                         inputProps={{ style: { fontFamily: "IRANYekan", fontSize: "0.8rem" } }}
                         InputLabelProps={{ style: { fontFamily: "IRANYekan" } }} />
                    </div>
                  })}
                </div>
                <div>
                  <button
                    className="flex text-gray60 bg-white border border-gray60 items-center text- px-3 py-2 rounded-full md:rounded"
                    onClick={()=>{setAnotherPhoneNumberCount([...anotherPhoneNumberCount,"phoneNumber"])}}
                  >
                    <span className="hidden md:inline">
                      افزودن شماره
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M7 12H17"
                        stroke="white"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M12 7V17"
                        stroke="white"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </button>
                </div>
                <div >
                  <Autocomplete
                    fullWidth
                    clearOnEscape
                    disablePortal
                    id="combo-box-demo"
                    options={educationList}
                    sx={{ width: 300 }}
                    value={education}
                    onChange={(event, newValue) => {
                      setEducation(newValue)
                      formik.setFieldValue("education", newValue.abbreviation)
                    }}
                    renderInput={(params) => <TextField error={formik.touched.education && Boolean(formik.errors.education)}
                      helperText={formik.touched.education && formik.errors.education}
                      InputProps={{
                        ...params.InputProps,
                        style: { fontFamily: "IRANYekan", fontSize: "0.8rem" }
                      }} {...params} placeholder="تحصیلات" />}
                  />

                </div>
                <div className="">

                  <TextField
                    fullWidth
                    placeholder="ایمیل"
                    type="text"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    inputProps={{ style: { fontFamily: "IRANYekan", fontSize: "0.8rem" } }}
                    InputLabelProps={{ style: { fontFamily: "IRANYekan" } }} />


                </div>
                <div className="">

                  <TextField
                    fullWidth
                    placeholder="آدرس"
                    type="text"
                    name="address"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    error={formik.touched.address && Boolean(formik.errors.address)}
                    inputProps={{ style: { fontFamily: "IRANYekan", fontSize: "0.8rem" } }}
                    InputLabelProps={{ style: { fontFamily: "IRANYekan" } }} />


                </div>
                <div className="w-full  border border-[#D9D9D9] flex flex-col gap-2 px-4">
                    <FormControlLabel onClick={()=>{setClevel(!cLevel)}} control={<Checkbox />} label="دسترسی مدیریت" />
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
                        className="w-full rounded-[0.5rem] py-3 hover:border hover:opacity-80 font-bold  bg-mainRed text-white">بعدی
                      </button>
                    )
                  }
                </div>
              </div>
            </form>
          </DialogContentText>
        </DialogContent>
      </Dialog>
      <AddIndividualRelationshipDialog handleCloseAddIndividualRelationship={props.handleCloseAddIndividualRelationship}
        openAddIndividualRelationship={props.openAddIndividualRelationship} />
    </>
  )
}