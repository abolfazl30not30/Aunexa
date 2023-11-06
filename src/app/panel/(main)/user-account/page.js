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
import { useState } from "react";

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
  return (
    <div>
      <header className="flex justify-start items-center text-[0.9rem] bg-white py-6 md:px-8 px-2 ">
        <div className="">
          <h2 className="font-[800] text-[0.9rem] md:text-[1.1rem] text-[#29262A]">
            اطلاعات حساب کاربری
          </h2>
        </div>
      </header>
      <section className="py-16 md:px-32 mt-5 bg-white h-[55rem] ">
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
        <div className="mt-16 ">
          <Box
            className="boxUserAccount"
            component="form"
            noValidate
            sx={{
              display: "grid",
              gridTemplateColumns: { sm: "1fr 1fr" },
              gridRowGap: 40,
              gridColumnGap: 96,
            }}
          >
            <FormControl variant="standard">
              <InputLabel
                className="labelUserAccount "
                shrink
                htmlFor="organization"
              >
                نام سازمان
              </InputLabel>
              <TextField
                type="text"
                className="inputUserAccount"
                name="organizationName"
                value={"سازمان"}
                sx={{
                  backgroundColor: "#F2EDED",
                  color: "#29262A",
                  fontSize: 16,
                }}
                inputProps={{
                  style: {
                    fontFamily: "IRANYekan",
                    fontWeight: "600",
                  },
                }}
                disabled
                id="organization"
              />
            </FormControl>
            <FormControl variant="standard">
              <InputLabel
                className="labelUserAccount "
                shrink
                htmlFor="subOrganization"
              >
                نام دپارتمان
              </InputLabel>
              <TextField
                type="text"
                className="inputUserAccount"
                name="subOrganizationName"
                value={"دپارتمان"}
                sx={{
                  backgroundColor: "#F2EDED",
                  color: "#29262A",
                  fontSize: 16,
                }}
                inputProps={{
                  style: {
                    fontFamily: "IRANYekan",
                    fontWeight: "600",
                  },
                }}
                disabled
                id="subOrganization"
              />
            </FormControl>
            <FormControl variant="standard">
              <InputLabel
                className="labelUserAccount "
                shrink
                htmlFor="nationalCode"
              >
                کد ملی
              </InputLabel>
              <TextField
                type="text"
                className="inputUserAccount"
                name="nationalCode"
                value={"کدملی"}
                sx={{
                  backgroundColor: "#F2EDED",
                  color: "#29262A",
                  fontSize: 16,
                }}
                inputProps={{
                  style: {
                    fontFamily: "IRANYekan",
                    fontWeight: "600",
                  },
                }}
                disabled
                id="nationalCode"
              />
            </FormControl>
            <FormControl variant="standard">
              <InputLabel
                className="labelUserAccount "
                shrink
                htmlFor="personalCode"
              >
                کد پرسنلی
              </InputLabel>
              <TextField
                type="text"
                className="inputUserAccount"
                name="personalCode"
                value={"کد پرسنلی"}
                sx={{
                  backgroundColor: "#F2EDED",
                  color: "#29262A",
                  fontSize: 16,
                }}
                inputProps={{
                  style: {
                    fontFamily: "IRANYekan",
                    fontWeight: "600",
                  },
                }}
                disabled
                id="personalCode"
              />
            </FormControl>
            <div className="flex flex-col">
              <label for="originalPhoneNumber">شماره همراه</label>
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
            <FormControl variant="standard">
              <InputLabel
                className="labelUserAccount "
                shrink
                htmlFor="anotherPhoneNumber"
              >
                شماره همراه دوم
              </InputLabel>
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
                    fontWeight: "600",
                    letterSpacing: "0.3rem",
                    textAlign: "center",
                  },
                }}
                disabled={!enable}
                id="anotherPhoneNumber"
              />
            </FormControl>
            <FormControl variant="standard">
              <InputLabel
                className="labelUserAccount "
                shrink
                htmlFor="telePhoneNumber"
              >
                شماره ثابت
              </InputLabel>
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
            </FormControl>

            <FormControl variant="standard">
              <InputLabel className="labelUserAccount " shrink htmlFor="email">
                ایمیل
              </InputLabel>
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
            </FormControl>
            <FormControl variant="standard">
              <InputLabel
                className="labelUserAccount "
                shrink
                htmlFor="education"
              >
                تحصیلات
              </InputLabel>
              <TextField
                type="text"
                className="inputUserAccount"
                name="value"
                value={"تحصیلات"}
                sx={{
                  backgroundColor: "#F2EDED",
                  color: "#29262A",
                  fontSize: 16,
                }}
                disabled
                id="education"
              />
            </FormControl>
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
            <FormControl variant="standard">
              <InputLabel
                className="labelUserAccount "
                shrink
                htmlFor="address"
              >
                آدرس
              </InputLabel>
              <TextField
                type="text"
                className="inputUserAccount"
                name="value"
                value={"آدرس"}
                sx={{
                  backgroundColor: "#F2EDED",
                  color: "#29262A",
                  fontSize: 16,
                }}
                disabled
                id="address"
              />
            </FormControl>
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
      </section>
    </div>
  );
}
