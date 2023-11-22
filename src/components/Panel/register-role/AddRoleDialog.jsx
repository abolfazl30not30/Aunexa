'use client'
import TextField from "@mui/material/TextField";
import React, {useEffect, useState} from "react";
import {DialogContent, DialogContentText} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import {TailSpin} from "react-loader-spinner";
import * as yup from "yup";
import {useFormik} from "formik";
import { useLazyGetPageAccessQuery, useSaveRoleMutation} from "@/redux/features/role/RoleSlice";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import {useSelector} from "react-redux";
import Link from "next/link";

export default function AddRoleDialog(props) {
    const [authorities,setAuthorities] = useState([])
    const [pages,setPages] = useState([])
    const [listOfChecked,setListOfChecked] = useState({})


    const handleReset = () => {
        formik.resetForm()
        setBooleanList()
    }

    const [submitData, {isLoading: isSubmitLoading, error}] = useSaveRoleMutation()
    const schema = yup.object().shape({
        role: yup.string().required("لطفا نام نقش را وارد کنید"),
    });


    const formik = useFormik({
        initialValues: {
            role: "",
        },

        validationSchema: schema,

        onSubmit: async (role) => {
            let authorities = []
            let pages = []
            for (const auth in listOfChecked){
                if(listOfChecked[auth] === true){
                    authorities.push(auth)
                    let result = auth.split("::")
                    if(!(pages.find(value => value === result[0]))){
                        pages.push(result[0])
                    }
                }
            }
            const sendObj = {
                role:role.role,
                authorities:authorities,
                pages:pages,
            }
            const res = await submitData(sendObj)
            handleReset()
            props.handleCloseAddRole()
        },
    });

    const [openAccess, setOpenAccess] = React.useState(true);

    const token = useSelector((state) => state.auth.accessToken)


    const [getPages,{
        data : pagesList = [],
        isLoading: isPagesLoading,
        isError: isPagesError,
        error: pagesError,
    }] = useLazyGetPageAccessQuery({ refetchOnMountOrArgChange: true });

    const setBooleanList =  () =>{
        let booleanListAuthorities = {}
        for(const page of pagesList){
            for(const auth in page['authorities']){
                booleanListAuthorities[`${auth}`] = false
            }
        }
        setListOfChecked(booleanListAuthorities)
    }

    const handleChangeChecked = (e) =>{
        let updateCheckedList = {...listOfChecked}
        updateCheckedList[`${e.target.value}`] = e.target.checked
        setListOfChecked(updateCheckedList)
    }

    useEffect(()=>{
        if(props.openAddRole === true){
            getPages()
            setBooleanList()
        }
    },[props.openAddRole])

    return (
        <>
            <Dialog
                fullWidth={true}
                open={props.openAddRole}
                keepMounted
                onClose={() => {
                    handleReset()
                    props.handleCloseAddRole();
                }}
                aria-describedby="alert-dialog-slide-description"
                PaperProps={{
                    style: {
                        fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189",
                    },
                }}>
                <DialogContent>
                    <DialogContentText style={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}}>
                        <div className="flex justify-end">
                            <button onClick={() => {
                                handleReset()
                                props.handleCloseAddRole();
                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 14 14"
                                     fill="none">
                                    <path d="M13 1L1 13M1 1L13 13" stroke="black" stroke-width="2"
                                          stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                        </div>
                        <div className="flex justify-center mb-7">
                            <h3 className="text-[1.1rem]">ثبت نقش</h3>
                        </div>
                        <form className="flex justify-center " onSubmit={formik.handleSubmit} method="POST">
                            <div className="flex flex-col justify-center w-[90%] gap-5">
                                <div>
                                    <TextField
                                        fullWidth
                                        placeholder="نقش (اجباری)"
                                        type="text"
                                        name="role"
                                        value={formik.values.role}
                                        onChange={formik.handleChange}
                                        error={formik.touched.role && Boolean(formik.errors.role)}
                                        helperText={formik.touched.role && formik.errors.role}
                                        inputProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}}
                                        InputLabelProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}}}/>
                                </div>
                                <div className="w-full  flex flex-col gap-2">
                                    <List
                                        sx={{
                                            bgcolor: 'background.paper',
                                            border: "1px solid #D9D9D9",
                                            color: "#29262A"}}
                                        component="nav"
                                        aria-labelledby="nested-list-subheader"
                                        subheader={
                                            <ListSubheader component="div" id="nested-list-subheader">
                                                دسترسی ها
                                            </ListSubheader>}>
                                        {
                                            pagesList?.map((page)=>(
                                                <div>
                                                    <details className="group py-3 border-b border-b-1 border-b-solid  border-b-borderGray">
                                                        <summary className="flex items-center justify-between gap-2 p-2 font-medium marker:content-none hover:cursor-pointer">
                                                            <span className="text-gray9F group-open:text-textGray text-[0.9rem]">{page.title}</span>
                                                            <svg
                                                                className="transition group-open:rotate-90"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="16"
                                                                height="16"
                                                                viewBox="0 0 16 16"
                                                                fill="none">
                                                                <path
                                                                    d="M10 4L6 8L10 12"
                                                                    stroke="#9F9F9F"
                                                                    stroke-linecap="round"
                                                                    stroke-linejoin="round"
                                                                />
                                                            </svg>
                                                        </summary>
                                                        <ul className="flex flex-col gap-1 pr-2">
                                                            <li>
                                                                <Box sx={{display: 'flex', flexDirection: 'column', ml: 3}}>
                                                                    <FormControlLabel
                                                                        label={page.authorities[`${page.title}::ReadOne`]}
                                                                        control={<Checkbox checked={listOfChecked[`${page.title}::ReadOne`] || false}
                                                                                           value={`${page.title}::ReadOne`}
                                                                                           onChange={handleChangeChecked}/>}/>
                                                                </Box>
                                                            </li>
                                                            <li>
                                                                <Box sx={{display: 'flex', flexDirection: 'column',fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", ml: 3}}>
                                                                    <FormControlLabel
                                                                        sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}
                                                                        label={page.authorities[`${page.title}::ReadAll`]}
                                                                        control={<Checkbox checked={listOfChecked[`${page.title}::ReadAll` ] || false}
                                                                                           value={`${page.title}::ReadAll` || ''}
                                                                                           onChange={handleChangeChecked}/>}/>
                                                                </Box>
                                                            </li>
                                                            <li>
                                                                <Box sx={{display: 'flex', flexDirection: 'column', ml: 3}}>
                                                                    <FormControlLabel
                                                                        sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}
                                                                        label={page.authorities[`${page.title}::Create`]}
                                                                        control={<Checkbox checked={listOfChecked[`${page.title}::Create` ]|| false}
                                                                                           value={`${page.title}::Create` || ''}
                                                                                           onChange={handleChangeChecked}/>}/>
                                                                </Box>
                                                            </li>
                                                            <li>
                                                                <Box sx={{display: 'flex', flexDirection: 'column', ml: 3}}>
                                                                    <FormControlLabel
                                                                        label={page.authorities[`${page.title}::Update`]}
                                                                        control={<Checkbox checked={listOfChecked[`${page.title}::Update` ]|| false}
                                                                                           value={`${page.title}::Update` || ''}
                                                                                           onChange={handleChangeChecked}/>}/>
                                                                </Box>
                                                            </li>
                                                            <li>
                                                                <Box sx={{display: 'flex', flexDirection: 'column', ml: 3}}>
                                                                    <FormControlLabel
                                                                        label={page.authorities[`${page.title}::Delete`]}
                                                                        control={<Checkbox checked={listOfChecked[`${page.title}::Delete` ] || false}
                                                                                           value={`${page.title}::Delete` || ''}
                                                                                           onChange={handleChangeChecked}/>}/>
                                                                </Box>
                                                            </li>
                                                        </ul>
                                                    </details>
                                                </div>
                                            ))
                                        }
                                    </List>
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