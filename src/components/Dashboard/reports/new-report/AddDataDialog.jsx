'use client'

import TextField from "@mui/material/TextField";
import React, {useEffect, useState} from "react";
import {
    Autocomplete,
    DialogContent,
    DialogContentText,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import {TailSpin} from "react-loader-spinner";
import * as yup from "yup";
import {useFormik} from "formik";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import CircularProgress from '@mui/material/CircularProgress';
import "react-multi-date-picker/styles/colors/red.css"
import {
    useLazyGetAllProductQuery,
    useLazyGetAllUnitQuery,
} from "@/redux/features/category/CategorySlice";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import {styled} from "@mui/material/styles";
import DatePicker, { DateObject } from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import Switch from "@mui/material/Switch";
import {useSavePurchaseRequestMutation} from "@/redux/features/purchase-request/PurchaseRequestSlice";
import { PersianToEnglish } from "@/helper/PersianToEnglish";
import { useGetAllTrackingMachineListQuery } from "@/redux/features/tracking/TrackingSlice";
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

export default function AddDataDialog(props) {
    const [values, setValues] = useState(
        ((number) =>
          new DateObject().set({
            day: number,
            hour: number,
            minute: number,
            second: number,
          })
        )
      );
      
      const handleDateInput = (value) => {
        if(value){
            setValues(value)
            let month = value?.month < 10 ? ('0' + value?.month) : value?.month;
            let day = value?.day < 10 ? ('0' + value?.day) : value?.day;
            let convertDate = value?.year + '/' + month + '/' + day;
            // formik.setFieldValue("expirationDate", convertDate)
        }else {
            // formik.setFieldValue("expirationDate", "")
        }
    }
    //product input
    const [product,setProduct] = useState(null)
    const [openProductList,setOpenProductList] = useState(false)
    const [getProductList,{ data : productList  = [] , isLoading : isProductLoading, isError: productIsError }] = useLazyGetAllProductQuery()
    useEffect(()=>{
        if(openProductList){
            getProductList()
        }
    },[openProductList])

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
        setProduct(null)
        setUnit(null)
    }

    //submit data
    const [submitData, { isLoading:isSubmitLoading ,error}] = useSavePurchaseRequestMutation()

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
            productId:"",
            productName:"",
            value: "",
            unit: "",
            priority: false,
            description:"",
            productImage:""
        },

        validationSchema: schema,

        onSubmit: async (product,helpers) => {
            let updateProduct = {...product,value:PersianToEnglish(product.value)}
            const userData = await submitData(updateProduct)
            handleReset()
            props.handleCloseAddData()
        },
    });

    const {
        data: organizationList = [],
        isLoading: isDataLoading,
        isError: isDataError,
      } = useGetAllTrackingMachineListQuery({ refetchOnMountOrArgChange: true });
// machine tag
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
    const [machineCode, setmachineCode] = useState([]);

    const handleChangeMachineCode = (event) => {
      const {
        target: { value },
      } = event;
      setmachineCode(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
      );
    };
    //
    const [group, setGroup] = useState([]);

    const handleChangeGroup = (event) => {
      const {
        target: { value },
      } = event;
      setGroup(
       
        typeof value === 'string' ? value.split(',') : value,
      );
    };
    //
    const [type, setType] = useState([]);

    const handleChangeType = (event) => {
      const {
        target: { value },
      } = event;
      setType(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
      );
    };
    return (
        <>
            <Dialog

                fullWidth={true}
                open={props.openAddData}
                keepMounted
                // onClose={()=>{props.handleCloseAddData();handleReset()}}
                aria-describedby="alert-dialog-slide-description"
                PaperProps={{
                    style: {
                        fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189",
                    },}}>
                <DialogContent>
                    <DialogContentText style={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}}>
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
                            <h3 className="text-[1.1rem]">ثبت گزارش </h3>
                        </div>
                        <form className="flex justify-center py-3 " onSubmit={formik.handleSubmit} method="POST">
                            <div className="flex flex-col justify-center w-[90%] gap-3">
                           
                            <div className=" flex flex-col">
                            <FormControl sx={{ m: 1 }}>
        <InputLabel id="demo-multiple-checkbox-label"sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem",color:"#9F9F9F"}}>کد یا پلاک وسیله نقلیه</InputLabel>
        <Select
         disabled={group.length>0 ||type.length>0 && true}
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={machineCode}
          onChange={handleChangeMachineCode}
          input={<OutlinedInput sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}} label="کد یا پلاک وسیله نقلیه" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {organizationList?.machines?.map((machine) => {
              if(machine?.tag){
                    return (<MenuItem style={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}} key={machine.tag} value={machine.tag}>
                        <Checkbox checked={machineCode.indexOf(machine.tag) > -1} />
                        <span className="text-sm">{machine.tag} </span>
                       
                      </MenuItem>)
              }
          else if(!machine?.tag && machine?.code) {
return (<MenuItem style={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}} key={machine.code} value={machine.code}>
    <Checkbox checked={machineCode.indexOf(machine.code) > -1} />
    <span className="text-sm">{machine.code} </span>
    
  </MenuItem>)
          }
         
})}
        </Select>
      </FormControl>
      
                                </div>
                                <div className=" flex flex-col">
                            <FormControl sx={{ m: 1 }}>
        <InputLabel id="demo-multiple-checkbox-label" sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem",color:"#9F9F9F"}}>گروه</InputLabel>
        <Select
         disabled={type.length>0 ||machineCode.length>0 && true}
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={group}
          onChange={handleChangeGroup}
          input={<OutlinedInput sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}} label="گروه" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {organizationList?.map((subOrgan) => (<MenuItem style={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}}  key={subOrgan.subOrganizationName} value={subOrgan.subOrganizationName}>
                        <Checkbox  checked={group.indexOf(subOrgan.subOrganizationName) > -1} />
                       <span className="text-sm">{subOrgan.subOrganizationName}</span>
                      </MenuItem>)
             
                   
              
          
         
)}
        </Select>
      </FormControl>
      
                                </div>
                                <div className=" flex flex-col">
                            <FormControl sx={{ m: 1 }}>
        <InputLabel id="demo-multiple-checkbox-label" sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem",color:"#9F9F9F"}}>نوع وسیله</InputLabel>
        <Select
         disabled={group.length>0 ||machineCode.length>0 && true}
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={type}
          onChange={handleChangeType}
          input={<OutlinedInput sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}} label="نوع وسیله" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {organizationList?.machines?.map((machine) => (<MenuItem style={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}} key={machine.type} value={machine.type}>
                        <Checkbox checked={type.indexOf(machine.type) > -1} />
                        <span className="text-sm">{machine.type}</span>
                      </MenuItem>)
)}
        </Select>
      </FormControl>
      
                                </div>
                                <div className="px-2 border-t pt-4 border-[#9F9F9F]">
                                    <FormControl fullWidth >
                                        <InputLabel id="demo-simple-select-label" sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem",color:"#9F9F9F"}}>گام</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={formik.values.value}
                                            name="value"
                                            input={<OutlinedInput sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}} label="گام" />}
                                            sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}
                                            onChange={formik.handleChange}>
                                            <MenuItem value="" sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}>بدون گام</MenuItem>
                                            <MenuItem value="UNKNOWN" sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}>امروز</MenuItem>
                                            <MenuItem value="CONFIRMED" sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}>دیروز</MenuItem>
                                            <MenuItem value="TROUBLED" sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}>هفته گذشته</MenuItem>
                                            <MenuItem value="UNKNOWN" sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}>دو هفته گذشته</MenuItem>
                                            <MenuItem value="CONFIRMED" sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}>ماه گذشته</MenuItem>
                                            <MenuItem value="TROUBLED" sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}>سه ماه گذشته</MenuItem>
                                            <MenuItem value="UNKNOWN" sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}>سال</MenuItem>
                                           
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className="w-full px-2 py-2">
                                <DatePicker
                                    disabled={!formik.values.value ? false : true }
                                    format="YYYY/MM/DD HH:mm:ss"
                                    plugins={[
                                        <TimePicker position="bottom"  />,
                                        
                                      ]}
                                        calendarPosition={`bottom`}
                                        className="red"
                                        digits={['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']}
                                        
                                        containerStyle={{
                                            width: "100%"
                                        }}
                                        placeholder="از تاریخ  (اجباری)"
                                        inputClass={`border border-[#9F9F9F]  placeholder-[#9F9F9F] text-gray-900 text-[0.8rem] rounded focus:ring-[#9F9F9F] focus:border-[#9F9F9F] block w-full px-3 py-4`}
                                        value={values}
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
                                        <button className="px-2 pb-2 text-sm" onClick={(e) => {
                                            e.preventDefault()
                                            setValues("")
                                            // formik.setFieldValue("expirationDate", "")
                                        }}>
                                            ریست
                                        </button>
                                        
                                    </DatePicker>
                                </div>
                                <div className="w-full px-2">
                                <DatePicker
                                    disabled={!formik.values.value ? false : true }
                                    format="YYYY/MM/DD HH:mm:ss"
                                    plugins={[
                                        <TimePicker position="bottom" />,
                                        
                                      ]}
                                        calendarPosition={`bottom`}
                                        className="red"
                                        digits={['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']}
                                        
                                        containerStyle={{
                                            width: "100%"
                                        }}
                                        placeholder="تا تاریخ  (اجباری)"
                                        inputClass={`border border-[#9F9F9F] placeholder-[#9F9F9F] text-gray-900 text-[0.8rem] rounded focus:ring-[#9F9F9F] focus:border-[#9F9F9F] block w-full px-3 py-4`}
                                        value={values}
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
                                        <button className="px-2 pb-4" onClick={(e) => {
                                            e.preventDefault()
                                            setValues("")
                                            // formik.setFieldValue("expirationDate", "")
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