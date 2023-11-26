
'use client'
import React from "react";
import {
    TextField,
    DialogContent,
    DialogContentText,
    
} from "@mui/material";
import {TailSpin} from "react-loader-spinner";
import Dialog from "@mui/material/Dialog";
import * as yup from "yup";
import {useFormik} from "formik";
import { useSaveFailureVehiclesMutation } from "@/redux/features/failure-and-repair-report/FailureAndRepairReportSlice";

export default function FixFailureDialog(props) {
    const handleReset = () => {
        formik.resetForm()
        setVehicle(null)
        
    }
  const [submitData, {isLoading: isSubmitLoading, error}] = useSaveFailureVehiclesMutation()
  const schema = yup.object().shape({
        description: yup.string().required("لطفا توضیحات را وارد کنید"),
      
  });

  const formik = useFormik({
      initialValues: {
          
          
          description: "",
          
          
          
      },

      validationSchema: schema,

      

      onSubmit: async (vehicle, helpers) => {
          let updateVehicle = {status:"AVAILABLE",machine:{id:props.fixTarget.machine.id},description:vehicle.description}
          const userData = await submitData(updateVehicle)
          props.handleCloseFix()
          handleReset()
          
      },
  });
    return(
        <>
            <Dialog
                fullWidth={true}
                open={props.openFix}
                keepMounted
                onClose={props.handleCloseFix}
                aria-describedby="alert-dialog-slide-description"
                PaperProps={{
                    style: {
                        fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189",
                    },
                }}>
                <DialogContent>
                    <DialogContentText style={{ fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189" }}>
                    <form  onSubmit={formik.handleSubmit} method="POST">
                        <div className="flex justify-end">
                            <button onClick={props.handleCloseFix}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 14 14" fill="none">
                                    <path d="M13 1L1 13M1 1L13 13" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                        </div>
                        <div className="flex justify-center mb-5">
                            <h3 className="text-[1.1rem]">رفع خرابی</h3>
                        </div>
                        <div className="hidden md:flex md:justify-center mb-4">
                            <div className="w-full md:w-[70%] flex flex-col gap-2">
                                
                                
                                <div className="flex flex-col">
                                    <div className="mb-2">
                                        <span className="text-[0.9rem] text-gray70 ">نوع وسیله</span>
                                    </div>
                                    <div className="border border-[#D9D9D9] bg-[#F2EDED] flex justify-evenly px-4">
                                        <div className="p-2">
                                            <span className="text-[#29262A] text-[0.9rem]">{props.fixTarget?.machine?.type}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between">
                                    <div className="w-[45%]">
                                    <div className="mb-2">
                                        <span className="text-[0.9rem] text-gray70 ">پلاک وسیله </span>
                                    </div>
                                    <div className="border border-[#D9D9D9] bg-[#F2EDED] flex justify-start px-4">
                                        <div className="p-2">
                                            <span className="text-[#29262A] text-[0.9rem]">{props.fixTarget?.machine?.tag.slice(2, 5) + "-" + props.fixTarget?.machine?.tag.slice(5, 7) + " " + props.fixTarget?.machine?.tag.slice(7, 8) + " " + props.fixTarget?.machine?.tag.slice(0, 2)}</span>
                                        </div>
                                    </div>
                                    </div>
                                    <div className="w-[45%]">
                                    <div className="mb-2">
                                        <span className="text-[0.9rem] text-gray70 "> کد وسیله</span>
                                    </div>
                                    <div className="border border-[#D9D9D9] bg-[#F2EDED] flex justify-start px-4">
                                        <div className="p-2">
                                            <span className="text-[#29262A] text-[0.9rem]">{props.fixTarget?.machine?.code}</span>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                <div className="flex justify-between">
                                    <div className="w-[45%]">
                                    <div className="mb-2">
                                        <span className="text-[0.9rem] text-gray70 "> شاخص عملکرد </span>
                                    </div>
                                    <div className="border border-[#D9D9D9] bg-[#F2EDED] flex justify-start px-4">
                                        <div className="p-2">
                                            <span className="text-[#29262A] text-[0.9rem]">{"متن پیش فرض"}</span>
                                        </div>
                                    </div>
                                    </div>
                                    <div className="w-[45%]">
                                    <div className="mb-2">
                                        <span className="text-[0.9rem] text-gray70 ">  دپارتمان</span>
                                    </div>
                                    <div className="border border-[#D9D9D9] bg-[#F2EDED] flex justify-start px-4">
                                        <div className="p-2">
                                            <span className="text-[#29262A] text-[0.9rem]">{props.fixTarget?.machine?.subOrganizationName}</span>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                <div className="flex justify-between">
                                    <div className="w-[45%]">
                                    <div className="mb-2">
                                        <span className="text-[0.9rem] text-gray70 "> تاریخ خرابی </span>
                                    </div>
                                    <div className="border border-[#D9D9D9] bg-[#F2EDED] flex justify-start px-4">
                                        <div className="p-2">
                                            <span  className="text-[#29262A] text-[0.9rem]">{props.fixTarget?.date}</span>
                                        </div>
                                    </div>
                                    </div>
                                    <div className="w-[45%]">
                                    <div className="mb-2">
                                        <span className="text-[0.9rem] text-gray70 ">  وضعیت</span>
                                    </div>
                                    <div className="border border-[#D9D9D9] bg-[#F2EDED] flex justify-start px-4">
                                        <div className="p-2">
                                            <span className="text-[#29262A] text-[0.9rem]">{props.fixTarget?.status==="BROKEN"?"خراب":null}</span>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                <div className="">
                                    <div className="mb-2">
                                        <span className="text-[0.9rem] text-gray70 ">توضیحات</span>
                                    </div>
                                    <div className="  flex justify-start ">
                                    <TextField
                                multiline
                                rows={3}
                                        fullWidth
                                        placeholder=" توضیحات (اجباری) "
                                        type="text"
                                        name="description"
                                        value={formik.values.description}
                                        onChange={formik.handleChange}
                                        error={formik.touched.description && Boolean(formik.errors.description)}
                                        helperText={formik.touched.description && formik.errors.description}
                                        inputProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}}
                                            InputLabelProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}}}/>
                                    </div>
                                    </div>
                            </div>
                        </div>
                        <div className="md:hidden flex justify-center">
                            <div className="w-full md:w-[70%] flex flex-col gap-3">
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                        نام محصول :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                       {props.fixTarget?.productName}
                                    </span>
                                </div>
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                        مقدار :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                        {props.fixTarget?.value}{props.fixTarget?.unit} 
                                    </span>
                                </div>
                                {props.fixTarget.expirationDate&&
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                        تاریخ انقضا :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                        {props.fixTarget.expirationDate}
                                    </span>
                                </div>
                                 }
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                        نوع وسیله نقلیه :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                        {props.fixTarget?.machineType}
                                    </span>
                                </div>
                                {props.fixTarget?.machineCode&&
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                        کد وسیله نقلیه :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                        {
                                            props.fixTarget?.machineTag === "" ? (props.fixTarget?.machineCode) : (
                                                props.fixTarget?.machineTag.slice(2, 5) + "-" + props.fixTarget?.machineTag.slice(5, 7) + " " + props.fixTarget?.machineTag.slice(7, 8) + " " + props.fixTarget?.machineTag.slice(0, 2)
                                            )
                                        }
                                    </span>
                                </div>
                                }
                                {props.fixTarget?.machineTag&&
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                        پلاک وسیله نقلیه :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                        {
                                            props.fixTarget?.machineTag === "" ? (props.fixTarget?.machineCode) : (
                                                props.fixTarget?.machineTag.slice(2, 5) + "-" + props.fixTarget?.machineTag.slice(5, 7) + " " + props.fixTarget?.machineTag.slice(7, 8) + " " + props.fixTarget?.machineTag.slice(0, 2)
                                            )
                                        }
                                    </span>
                                </div>
                                }
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                        راننده :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                        {props.fixTarget?.driverName}
                                    </span>
                                </div>
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                        از دپارتمان :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                        {props.fixTarget?.sourceSubOrganizationName}
                                    </span>
                                </div>
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                        تاریخ :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                    <span>{props.fixTarget?.time}</span> <span className="pr-2">{props.fixTarget?.date}</span>
                                    </span>
                                </div>
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                        وضعیت :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                        {props.fixTarget?.status === "CONFIRMED" ? (<span className="text-[0.8rem] bg-greenBg text-greenText py-1 px-2 rounded-xl">تاييد شده</span>) : (
                                            props.fixTarget?.status === "UNKNOWN" ? (<span className="text-[0.8rem] bg-[#EBEBEB] text-gray70 py-1 px-2 rounded-xl">نامعلوم</span>) : (
                                                <span className="text-[0.8rem] bg-orangeBg text-orangeText py-1 px-2 rounded-xl">خراب</span>
                                            )
                                        )}
                                    </span>
                                </div>
                                {props.fixTarget?.description&&
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                        توضیحات :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                        {props.fixTarget.description}
                                    </span>
                                </div>}
                            </div>
                        </div>
                        <div className="flex justify-center mt-10 gap-4">
                        
                            <div className="">
                                <button onClick={props.handleCloseFix} className="px-6   text-[0.8rem]  rounded-[0.5rem] py-3  hover:opacity-80 font-bold  border border-gray70 text-gray70">انصراف</button>
                            </div>
                            <div className="w-1/5">
                                    {
                                        isSubmitLoading ? (<button disabled type="submit"
                                                                   className="hidden text-[0.8rem] flex gap-3 items-center justify-center w-full rounded-[0.5rem] py-3  border border-solid border-1 border-neutral-400 font-bold text-textGray bg-neutral-200">
                                            <TailSpin
                                                
                                                color="#4E4E4E"
                                                ariaLabel="tail-spin-loading"
                                                radius="1"
                                                wrapperStyle={{}}
                                                wrapperClass=""
                                                visible={true}/>
                                            تایید
                                        </button>) : (
                                            <button type="submit"
                                                    className="w-full rounded-[0.5rem] py-3  text-[0.8rem] hover:opacity-80 font-bold  bg-mainRed text-white">تایید
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