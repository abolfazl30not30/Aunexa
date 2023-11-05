'use client'
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import { Autocomplete, DialogContent, DialogContentText } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { TailSpin } from "react-loader-spinner";
import * as yup from "yup";
import { useFormik } from "formik";
import CircularProgress from '@mui/material/CircularProgress';
import { useSaveMutation } from "@/redux/features/role/RoleSlice";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function AddRoleDialog(props) {
    const [checked, setChecked] = React.useState([true, false]);
    

  const handleChangeAllCheckBox = (event) => {
    setChecked([event.target.checked, event.target.checked]);
  };

  const handleChangeCheckBoxFirst = (event) => {
    setChecked([event.target.checked, checked[1]]);
  };

  const handleChangeCheckBoxSecond = (event) => {
    setChecked([checked[0], event.target.checked]);
  };

    const [role, setRole] = useState(null)


    const handleReset = () => {
        formik.resetForm()
        setRole(null)
    }

    const [submitData, { isLoading: isSubmitLoading, error }] = useSaveMutation()
    const schema = yup.object().shape({
        role: yup.string().required("لطفا نام نقش را وارد کنید"),

    });

    const formik = useFormik({
        initialValues: {
            role: "",
            

        },



        validationSchema: schema,

        onSubmit: async (role, helpers) => {
            let updateRole = { ...role }

            const userData = await submitData(updateRole)
            handleReset()
            props.handleCloseAddRole()
            console.log(defaultChecked)
        },
    });

    const [openAccess, setOpenAccess] = React.useState(true);
    const handleClick = () => {
        setOpenAccess(!openAccess);

      };
    return (
        <>
            <Dialog
                fullWidth={true}
                open={props.openAddRole}
                keepMounted
                onClose={() => { props.handleCloseAddRole(); handleReset() }}
                aria-describedby="alert-dialog-slide-description"
                PaperProps={{
                    style: {
                        fontFamily: "IRANYekan",
                    },
                }}>
                <DialogContent>
                    <DialogContentText style={{ fontFamily: "IRANYekan" }}>
                        <div className="flex justify-end">
                            <button onClick={() => { props.handleCloseAddRole(); handleReset() }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 14 14"
                                    fill="none">
                                    <path d="M13 1L1 13M1 1L13 13" stroke="black" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round" />
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
                                        inputProps={{ style: { fontFamily: "IRANYekan", fontSize: "0.8rem" } }}
                                        InputLabelProps={{ style: { fontFamily: "IRANYekan" } }} />
                                </div>
                                
                                <div className="w-full  flex flex-col gap-2">
                                
                                <List
                                  sx={{ bgcolor: 'background.paper',border:"1px solid #D9D9D9",color:"#29262A" }}
                                  component="nav"
                                  aria-labelledby="nested-list-subheader"
                                  subheader={
                                    <ListSubheader component="div" id="nested-list-subheader" >
                                       دسترسی ها
                                    </ListSubheader>
                                  }
                                >
                                  <ListItemButton onClick={handleClick}>
                                  <FormControlLabel
                                         label="صفحه"
                                        control={
                                          <Checkbox
                                            checked={checked[0] && checked[1]}
                                            indeterminate={checked[0] !== checked[1]}
                                            onChange={handleChangeAllCheckBox}
                                          />
                                        }
                                      />
                                    {openAccess ? <ExpandLess /> : <ExpandMore />}
                                  </ListItemButton>
                                  <Collapse in={openAccess} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                      <ListItemButton sx={{ pr: 4 }}>
                                      <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
                                            <FormControlLabel
                                            label="API1"
                                            control={<Checkbox checked={checked[0]} onChange={handleChangeCheckBoxFirst} />}
                                            />
                                            
                                            <FormControlLabel
                                            label="API2"
                                            control={<Checkbox checked={checked[1]} onChange={handleChangeCheckBoxSecond} />}
                                            />
     
                                       </Box>
                                      </ListItemButton>
                                    </List>
                                  </Collapse>
                                  
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
                                                visible={true} />
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