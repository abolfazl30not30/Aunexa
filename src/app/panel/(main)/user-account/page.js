"use client";
import React from "react";
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import * as yup from "yup";
import { useFormik } from "formik";
import { TailSpin } from "react-loader-spinner";
import { useState, useEffect } from "react";
import ChangePasswordDialog from "@/components/Panel/user-account/ChangePasswordDialog";
export default function page() {
  {
    /*const [submitData, { isLoading:isSubmitLoading ,error}] = useSavePurchaseRequestMutation()*/
  }
  const [enable, setEnable] = useState(true);
  const schema = yup.object().shape({
    phoneNumber: yup.number().required("لطفا شماره همراه خود را وارد کنید"),
    anotherPhoneNumber: yup
      .number()
      .required("لطفا شماره همراه دوم خود را وارد کنید"),
    telePhoneNumber: yup.number().required("لطفا شماره ثابت خود را وارد کنید"),
    email: yup.string().email().required("لطفا ایمیل خود را وارد کنید"),
  });

  const formik = useFormik({
    initialValues: {
      originalPhoneNumber: "",
      anotherPhoneNumber: "",
      telePhoneNumber: "",
      email: "",
    },

    validationSchema: schema,

    onSubmit: async (individual, helpers) => {
      let updateIndividual = { ...individual };
      const userData = await submitData(updateIndividual);
      handleReset();
    },
  });
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const handleOpenChangePassword = () => {
    setOpenChangePassword(true);
    setSeconds(0);
    setMinutes(0);
  };
  const handleCloseChangePassword = () => {
    setOpenChangePassword(false);
  };

  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });
  const resendOTP = () => {
    setMinutes(2);
    setSeconds(59);
  };

  return (
    <div>
      <header className="flex justify-start items-center text-[0.9rem] bg-white py-6 md:px-8 px-2 ">
        <div className="">
          <h2 className="font-[800] text-[0.9rem] md:text-[1.1rem] text-[#29262A]">
            اطلاعات حساب کاربری
          </h2>
        </div>
      </header>
      <section className="py-16 2xl:px-72 xl:px-48 lg:px-32 px-8 mt-5  bg-white ">
        <div className="flex justify-start gap-4 items-center">
          <div className="w-16 h-16 md:w-20 md:h-20 border border-solid border-1 border-borderGray rounded">
            <img
              className="w-full cover"
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              alt="profile"
            />
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="text-[#9F9F9F] text-sm">اسم و فامیل :</span>
              <span className="font-bold "> نسترن فولادوند</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#9F9F9F] text-sm">نقش:</span>
              <span className="font-bold ">کارمند انبار مرکزی</span>
            </div>
          </div>
        </div>
        <div className="mt-12 ">
          <Box
            className="boxUserAccount grid sm:grid-cols-2 grid-cols-1 2xl:gap-x-12 gap-x-8 gap-y-5"
            component="form"
            noValidate
          >
            <div className="flex flex-col">
              <label className="mb-2" for="organization">
                نام سازمان
              </label>
              <TextField
                type="text"
                className="bg-[#F2EDED]"
                name="organization"
                value={formik.values.organization}
                onChange={formik.handleChange}
                error={
                  formik.touched.organization &&
                  Boolean(formik.errors.organization)
                }
                helperText={
                  formik.touched.organization && formik.errors.organization
                }
                inputProps={{
                  style: {
                    fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189",
                    fontSize: "0.8rem",
                  },
                }}
                InputLabelProps={{
                  style: {
                    fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189",
                  },
                }}
                disabled
                id="organization"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-2" for="subOrganizationName">
                نام دپارتمان
              </label>
              <TextField
                type="text"
                className="bg-[#F2EDED]"
                name="subOrganizationName"
                value={formik.values.subOrganizationName}
                onChange={formik.handleChange}
                error={
                  formik.touched.subOrganizationName &&
                  Boolean(formik.errors.subOrganizationName)
                }
                helperText={
                  formik.touched.subOrganizationName &&
                  formik.errors.subOrganizationName
                }
                inputProps={{
                  style: {
                    fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189",
                    fontSize: "0.8rem",
                  },
                }}
                InputLabelProps={{
                  style: {
                    fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189",
                  },
                }}
                disabled
                id="subOrganizationName"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-2" for="nationalCode">
                کد ملی
              </label>
              <TextField
                type="text"
                className="bg-[#F2EDED]"
                name="nationalCode"
                value={formik.values.nationalCode}
                onChange={formik.handleChange}
                error={
                  formik.touched.nationalCode &&
                  Boolean(formik.errors.nationalCode)
                }
                helperText={
                  formik.touched.nationalCode && formik.errors.nationalCode
                }
                inputProps={{
                  style: {
                    fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189",
                    fontSize: "0.8rem",
                  },
                }}
                InputLabelProps={{
                  style: {
                    fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189",
                  },
                }}
                disabled
                id="nationalCode"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-2" for="personalCode">
                کد پرسنلی
              </label>
              <TextField
                type="text"
                className="bg-[#F2EDED]"
                name="personalCode"
                value={formik.values.personalCode}
                onChange={formik.handleChange}
                error={
                  formik.touched.personalCode &&
                  Boolean(formik.errors.personalCode)
                }
                helperText={
                  formik.touched.personalCode && formik.errors.personalCode
                }
                inputProps={{
                  style: {
                    fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189",
                    fontSize: "0.8rem",
                  },
                }}
                InputLabelProps={{
                  style: {
                    fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189",
                  },
                }}
                disabled
                id="personalCode"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-2" for="originalPhoneNumber">
                شماره همراه
              </label>
              <TextField
                type="text"
                className={
                  enable === true
                    ? "inputUserAccount"
                    : "inputUserAccount bg-[#F2EDED]"
                }
                name="originalPhoneNumber"
                value={formik.values.originalPhoneNumber}
                onChange={formik.handleChange}
                error={
                  formik.touched.originalPhoneNumber &&
                  Boolean(formik.errors.originalPhoneNumber)
                }
                helperText={
                  formik.touched.originalPhoneNumber &&
                  formik.errors.originalPhoneNumber
                }
                inputProps={{
                  style: {
                    fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189",
                    fontSize: "0.8rem",
                  },
                }}
                InputLabelProps={{
                  style: {
                    fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189",
                  },
                }}
                disabled={!enable}
                id="originalPhoneNumber"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-2" for="anotherPhoneNumber">
                شماره همراه دوم
              </label>
              <TextField
                type="text"
                className={
                  enable === true
                    ? "inputUserAccount"
                    : "inputUserAccount bg-[#F2EDED]"
                }
                name="anotherPhoneNumber"
                value={formik.values.anotherPhoneNumber}
                onChange={formik.handleChange}
                error={
                  formik.touched.anotherPhoneNumber &&
                  Boolean(formik.errors.anotherPhoneNumber)
                }
                helperText={
                  formik.touched.anotherPhoneNumber &&
                  formik.errors.anotherPhoneNumber
                }
                inputProps={{
                  style: {
                    fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189",
                    fontSize: "0.8rem",
                  },
                }}
                InputLabelProps={{
                  style: {
                    fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189",
                  },
                }}
                disabled={!enable}
                id="anotherPhoneNumber"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-2" for="telePhoneNumber">
                شماره ثابت
              </label>
              <TextField
                type="text"
                className={
                  enable === true
                    ? "inputUserAccount"
                    : "inputUserAccount bg-[#F2EDED]"
                }
                name="telePhoneNumber"
                value={formik.values.telePhoneNumber}
                onChange={formik.handleChange}
                error={
                  formik.touched.telePhoneNumber &&
                  Boolean(formik.errors.telePhoneNumber)
                }
                helperText={
                  formik.touched.telePhoneNumber &&
                  formik.errors.telePhoneNumber
                }
                inputProps={{
                  style: {
                    fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189",
                    fontSize: "0.8rem",
                  },
                }}
                InputLabelProps={{
                  style: {
                    fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189",
                  },
                }}
                disabled={!enable}
                id="telePhoneNumber"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-2" for="email">
                ایمیل
              </label>
              <TextField
                type="text"
                className={
                  enable === true
                    ? "inputUserAccount"
                    : "inputUserAccount bg-[#F2EDED]"
                }
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                inputProps={{
                  style: {
                    fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189",
                    fontSize: "0.8rem",
                  },
                }}
                InputLabelProps={{
                  style: {
                    fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189",
                  },
                }}
                disabled={!enable}
                id="email"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-2" for="education">
                تحصیلات
              </label>
              <TextField
                type="text"
                className="bg-[#F2EDED]"
                name="education"
                value={formik.values.education}
                onChange={formik.handleChange}
                error={
                  formik.touched.education && Boolean(formik.errors.education)
                }
                helperText={formik.touched.education && formik.errors.education}
                inputProps={{
                  style: {
                    fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189",
                    fontSize: "0.8rem",
                  },
                }}
                InputLabelProps={{
                  style: {
                    fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189",
                  },
                }}
                disabled
                id="education"
              />
            </div>
          </Box>
          <Box
            className="boxUserAccount"
            component="form"
            noValidate
            sx={{
              display: "grid",
              gridTemplateColumns: { sm: "1fr " },
            }}
          >
            <div className="flex flex-col">
              <label className="mb-2" for="inputUserAccount">
                آدرس
              </label>
              <TextField
                type="text"
                className="bg-[#F2EDED]"
                name="inputUserAccount"
                value={formik.values.inputUserAccount}
                onChange={formik.handleChange}
                error={
                  formik.touched.inputUserAccount &&
                  Boolean(formik.errors.inputUserAccount)
                }
                helperText={
                  formik.touched.inputUserAccount &&
                  formik.errors.inputUserAccount
                }
                inputProps={{
                  style: {
                    fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189",
                    fontSize: "0.8rem",
                  },
                }}
                InputLabelProps={{
                  style: {
                    fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189",
                  },
                }}
                disabled
                id="inputUserAccount"
              />
            </div>
          </Box>
        </div>
        <div className="flex justify-between items-center mt-8">
          <div className="w-2/5">
            {!enable ? (
              <button
                onClick={() => {
                  setEnable(true);
                }}
                className="w-full rounded-[0.5rem] py-3  font-bold text-[#9F9F9F] border border-[#9F9F9F]"
              >
                ویرایش
              </button>
            ) : (
              <button className="w-full rounded-[0.5rem] py-3  font-bold text-[#9F9F9F] border border-[#9F9F9F]">
                انصراف
              </button>
            )}
          </div>
          <div className="w-2/5">
            <button
              onClick={() => {
                setEnable(false);
              }}
              type="submit"
              className="w-full rounded-[0.5rem] py-3 hover:border hover:opacity-80 font-bold  bg-mainRed text-white"
            >
              ثبت
            </button>
          </div>
        </div>
        <div className="text-center mt-8">
          <button
            onClick={handleOpenChangePassword}
            className="text-[#797979] border-b border-[#797979]"
          >
            تغییر رمز عبور
          </button>
        </div>
      </section>
      <ChangePasswordDialog
        handleCloseChangePassword={handleCloseChangePassword}
        openChangePassword={openChangePassword}
        resendOTP={resendOTP}
        seconds={seconds}
        minutes={minutes}
      />
    </div>
  );
}