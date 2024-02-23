'use client'
import { useTheme } from "@material-ui/core";
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
import "../../../styles/spinnerLoading.css"
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
import {useSaveProductMutation} from "@/redux/features/product/ProductSlice";
import {useUploadFileCloudMutation} from "@/redux/features/file/FileSlice";
import { ConvertToEmpty } from "@/helper/ConvertToEmpty";
import { ConvertToNull } from "@/helper/ConvertToNull";
import {toast} from "react-toastify";

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
//
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189",
      width: 250,
    },
  },
};

const names = [
  'ماده اولیه',
  'تولیدی',
  'تجهیزات سنگین',
  'تجهیزات اداری',
  'سایر'
];

function getStyles(name, tags, theme) {
  return {
    fontWeight:
      tags?.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
        display:
      tags?.indexOf(name) === -1
        ? "block"
        : "none",
        
  };
}
export default function EditInfoDialog(props) {

    //unit input
    const [unit,setUnit] = useState(null)
    const [openUnitList,setOpenUnitList] = useState(false)
    const [uploadedImage,setUploadedImage] = useState(null)
    const [getUnitList,{ data : unitList  = [] , isLoading : isUnitLoading, isError: unitIsError }] = useLazyGetAllUnitQuery()
    useEffect(()=>{
        if(openUnitList){
            getUnitList()
        }
    },[openUnitList])


    const handleReset = () =>{
        formik.resetForm()
        setUnit(null)
        setUploadedImage(null)
        setTags([])
    }
    const theme = useTheme();
    
    const [tags, setTags] = React.useState([]);
  
    const handleChange = (event) => {
      const {
        target: { value },
      } = event;
      setTags(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
      );
    };
    const handleFilterTags =(name,e)=>{
         setTags(tags.filter((subName)=>subName!==name))
         e.preventDefault()
    }
    //submit data
    const [submitData, { isLoading:isSubmitLoading ,error}] = useSaveProductMutation()
    const schema = yup.object().shape({
        // type: yup.string().required("لطفا نام محصول را وارد کنید"),
        persianName: yup.string().required("لطفا نام فارسی محصول را وارد کنید"),
        defaultUnit: yup.string().required("لطفا واحد پیش فرض را وارد کنید"),
    });
    const validate = (values, props) => {
        const errors = {};

        if (tags?.length===0) {
            errors.tags = "لطفانوع محصول را انتخاب کنید";
        } 

        return errors;
    };
    const formik = useFormik({
        initialValues: {
            id:"",
            // type: "",
            code:"",
            persianName: "",
            englishName: "",
            isExpirable:false,
            defaultUnit: "",
            imageURL:"",
            abbreviation:"",
        },
        validationSchema: schema,
        validate:validate,
        onSubmit: async (product) => {
            let updatedProduct = {...product,imageURL:uploadedImage,tags}
            updatedProduct=ConvertToNull(updatedProduct)
            try {
                const userData = await submitData(updatedProduct)
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

    const [uploadFile, { isLoading:isLoadingUpload ,error:errorUpload}] = useUploadFileCloudMutation()

    const handleUploadImage = async (event) =>{
        let formData = new FormData();
        formData.append('file', event.target.files[0]);
        const res = await uploadFile(formData)
        if(res.data){
            setUploadedImage(res.data?.fileUrl)
        }
    }

    const handleDeleteUpload = () =>{
        setUploadedImage(null)
    }

    const handleSetUnitInput = (ab) =>{
        const units= unitList.filter((unit)=> unit.persianName === ab)
        setUnit(units[0])
    }
    useEffect(()=>{
        getUnitList()
        const editInfoObj = ConvertToEmpty(props.editInfoTarget)
        setTags([editInfoObj?.tags])
        formik.setValues({
            id:editInfoObj?.id,
            // type: editInfoObj?.type,
            
            code:editInfoObj?.code,
            persianName: editInfoObj?.persianName,
            englishName: editInfoObj?.englishName,
            isExpirable:editInfoObj?.isExpirable,
            defaultUnit: editInfoObj?.defaultUnit,
            imageURL:editInfoObj?.imageURL,
            abbreviation:editInfoObj?.abbreviation,
        })
        handleSetUnitInput(props.editInfoTarget?.defaultUnit)
        setUploadedImage(props.editInfoTarget?.imageURL)

    },[props.openEditInfo])

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
                        fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189",overflow:"visible"
                    },
                }}>
                <DialogContent>
                    <DialogContentText style={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}}>
                        <div className="flex justify-end">
                            <button onClick={()=>{props.handleCloseEditInfo();handleReset()}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 14 14"
                                     fill="none">
                                    <path d="M13 1L1 13M1 1L13 13" stroke="black" stroke-width="2"
                                          stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                        </div>
                        <div className="flex justify-center mb-7">
                            <h3 className="text-[1.1rem]">ویرایش  محصولات</h3>
                        </div>
                        <form className="flex justify-center " onSubmit={formik.handleSubmit} method="POST">
                            <div className="flex flex-col justify-center w-[90%] gap-5">
                                <div className="flex justify-center items-center gap-4">
                                    <div>
                                        <span className="text-[0.8rem] text-[#9F9F9F]"> تصویر محصول :</span>
                                    </div>
                                    {
                                        isLoadingUpload ? (
                                            <div>
                                                <div className="p-4 rounded border border-dashed border-[#D9D9D9]">
                                                    <span className="spinnerLoader"></span>
                                                </div>
                                            </div>
                                        ) : (
                                            (uploadedImage !=="" && uploadedImage !==null) ? (
                                                <div>
                                                    <div className="relative w-16 h-16 rounded border border-dashed border-[#D9D9D9]">
                                                        <button onClick={handleDeleteUpload} className="shadow hover:bg-red-400 absolute z-10 top-0 right-0 rounded-full bg-mainRed p-1">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6L18 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                                                        </button>
                                                        <img className="object-cover w-full h-full" src={uploadedImage} alt="uploadedImage"/>
                                                    </div>
                                                </div>
                                            ):(
                                                <div>
                                                    <label htmlFor="dropzone-file"
                                                           className="block cursor-pointer p-5 rounded border border-dashed border-[#D9D9D9]">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                             viewBox="0 0 24 24" fill="none">
                                                            <path
                                                                d="M12.5 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21H17C17.93 21 18.395 21 18.7765 20.8978C19.8117 20.6204 20.6204 19.8117 20.8978 18.7765C21 18.395 21 17.93 21 17M19 8V2M16 5H22M10.5 8.5C10.5 9.60457 9.60457 10.5 8.5 10.5C7.39543 10.5 6.5 9.60457 6.5 8.5C6.5 7.39543 7.39543 6.5 8.5 6.5C9.60457 6.5 10.5 7.39543 10.5 8.5ZM14.99 11.9181L6.53115 19.608C6.05536 20.0406 5.81747 20.2568 5.79643 20.4442C5.77819 20.6066 5.84045 20.7676 5.96319 20.8755C6.10478 21 6.42628 21 7.06929 21H16.456C17.8951 21 18.6147 21 19.1799 20.7582C19.8894 20.4547 20.4547 19.8894 20.7582 19.1799C21 18.6147 21 17.8951 21 16.456C21 15.9717 21 15.7296 20.9471 15.5042C20.8805 15.2208 20.753 14.9554 20.5733 14.7264C20.4303 14.5442 20.2412 14.3929 19.8631 14.0905L17.0658 11.8527C16.6874 11.5499 16.4982 11.3985 16.2898 11.3451C16.1061 11.298 15.9129 11.3041 15.7325 11.3627C15.5279 11.4291 15.3486 11.5921 14.99 11.9181Z"
                                                                stroke="#D9D9D9" stroke-linecap="round"
                                                                stroke-linejoin="round"/>
                                                        </svg>
                                                        <input id="dropzone-file" type="file" className="hidden"
                                                               onChange={(e) => {
                                                                   handleUploadImage(e)
                                                               }}/>
                                                    </label>
                                                </div>
                                            )
                                        )
                                    }
                                </div>
                                <div>
                                    <TextField
                                        fullWidth
                                        placeholder="نام فارسي محصول"
                                        type="text"
                                        name="persianName"
                                        value={formik.values.persianName}
                                        onChange={formik.handleChange}
                                        error={formik.touched.persianName && Boolean(formik.errors.persianName)}
                                        helperText={formik.touched.persianName && formik.errors.persianName}
                                        inputProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}}
                                        InputLabelProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}}}/>
                                </div>
                                <div>
                                    <TextField
                                        fullWidth
                                        placeholder="نام انگليسی محصول (اختیاری)"
                                        type="text"
                                        name="englishName"
                                        value={formik.values.englishName}
                                        onChange={formik.handleChange}
                                        error={formik.touched.englishName && Boolean(formik.errors.englishName)}
                                        helperText={formik.touched.englishName && formik.errors.englishName}
                                        inputProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}}
                                        InputLabelProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}}}/>
                                </div>
                                <div className={"flex flex-col md:flex-row gap-5 md:gap-1 justify-between"}>
                                    <div className="w-full md:w-1/2">
                                        <TextField

                                            fullWidth
                                            placeholder="نام مخفف (اختیاری)"
                                            type="text"
                                            name="abbreviation"
                                            value={formik.values.abbreviation}
                                            onChange={formik.handleChange}
                                            error={formik.touched.abbreviation && Boolean(formik.errors.abbreviation)}
                                            helperText={formik.touched.abbreviation && formik.errors.abbreviation}
                                            inputProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}}
                                            InputLabelProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}}}/>
                                    </div>
                                    <div className="w-full md:w-1/2">
                                        <TextField
                                            fullWidth
                                            placeholder="کد محصول (اختیاری)"
                                            type="text"
                                            name="code"
                                            value={formik.values.code}
                                            onChange={formik.handleChange}
                                            error={formik.touched.code && Boolean(formik.errors.code)}
                                            helperText={formik.touched.code && formik.errors.code}
                                            inputProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}}
                                            InputLabelProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}}}/>
                                    </div>
                                </div>
                                <div>
      <FormControl
      
        fullWidth>
        <InputLabel sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem",color:"#9F9F9F"}} id="demo-multiple-name-label">نوع  محصولات </InputLabel>
        <Select
       
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
         multiple  
          value={tags}
          onChange={handleChange}
          sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}
          input={<OutlinedInput sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}} label="نوع  محصولات " />}
          MenuProps={MenuProps}
        >
          {  names.map((name) => (
            <MenuItem
            
            sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}
              key={name}
              value={name}
              style={getStyles(name, tags, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
    {tags?.length===0 && Boolean(formik.errors.tags) && (
                                                <span className="mx-3 text-[0.6rem] text-red-600 ">
                                                    {formik.errors.tags}
                                                </span>
                                            )}
    
    {tags?.length>0 &&  <div className="border rounded border-[#9F9F9F] p-2  grid grid-cols-3 gap-2">
        {  tags.map((name)=>(
            
                                        
                                            <div className="border border-[#9F9F9F] px-2 py-1 rounded-full flex justify-between items-center gap-2 w-full box-border h-max">
                                              <span className="text-xs">{name}</span>
                                              <button onClick={(e)=>{handleFilterTags(name,e)}} className="">
                                              <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 14 14"
                                     fill="none">
                                    <path d="M13 1L1 13M1 1L13 13" stroke="black" stroke-width="2"
                                          stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                              </button>
                                        </div>
                                        
                                    )

                                    )}
    </div>
                                  }
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
                                            sx: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"},
                                        }}
                                        options={unitList}
                                        getOptionLabel={(option) => option.persianName}
                                        value={unit}
                                        onChange={(event, newValue) => {
                                            setUnit(newValue)
                                            formik.setFieldValue("defaultUnit", newValue?.persianName)
                                        }}
                                        renderInput={(params) =>
                                            <TextField
                                                {...params}
                                                error={formik.touched.defaultUnit && Boolean(formik.errors.defaultUnit)}
                                                helperText={formik.touched.defaultUnit && formik.errors.defaultUnit}
                                                InputProps={{
                                                    ...params.InputProps,
                                                    style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}
                                                }}
                                                placeholder="واحد پیش فرض"
                                            />}/>
                                </div>
                                <div>
                                    <div className="flex flex-col">
                                        <div className="flex w-full">
                                            <div className="border border-[#D9D9D9] py-4 w-1/2 px-3">
                                                <span className="text-[#9F9F9F] text-[0.8rem]">آیا داری تاريخ انقضا است؟</span>
                                            </div>
                                            <div className="border border-[#D9D9D9] py-4 w-1/2">
                                                <div className="flex justify-center gap-2">
                                                    <span className="text-[#9F9F9F] text-[0.8rem]">خیر</span>
                                                    <AntSwitch checked={formik.values.isExpirable} onChange={(e)=>{formik.setFieldValue("isExpirable", e.target.checked)}}  inputProps={{ 'aria-label': 'ant design' }} />
                                                    <span className="text-[#9F9F9F] text-[0.8rem]">بله</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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