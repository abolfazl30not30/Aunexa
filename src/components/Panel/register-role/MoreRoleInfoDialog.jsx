'use client'
import React from "react";
import {
    DialogContent,
    DialogContentText,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';

export default function MoreRoleInfoDialog(props) {
    const [openAccess, setOpenAccess] = React.useState(true);
    const handleClick = () => {
        setOpenAccess(!openAccess);
      };
    return(
        <>
            <Dialog
                fullWidth={true}
                open={props.openMoreRoleInfo}
                keepMounted
                onClose={props.handleCloseMoreRoleInfo}
                aria-describedby="alert-dialog-slide-description"
                PaperProps={{
                    style: {
                        fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189",
                    },
                }}>
                <DialogContent>
                    <DialogContentText style={{ fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189" }}>
                        <div className="flex justify-end">
                            <button onClick={props.handleCloseMoreRoleInfo}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 14 14" fill="none">
                                    <path d="M13 1L1 13M1 1L13 13" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                        </div>
                        <div className="flex justify-center mb-5">
                            <h3 className="text-[1.1rem]">جزییات</h3>
                        </div>
                        <div className="hidden md:flex flex-col items-center gap-8 md:justify-center mb-4">
                            <div className="w-full md:w-[90%] flex flex-col gap-2">
                                <div className="flex flex-col">
                                    <div className="mb-2">
                                        <span className="text-[0.9rem] text-gray70 ">نام نقش</span>
                                    </div>
                                    <div className="border border-[#D9D9D9]  flex justify-between px-4">
                                        <div className="p-2">
                                            <span className="text-[#29262A] text-[0.9rem]">{props.moreRoleInfoTarget?.role}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full md:w-[90%] flex flex-col gap-2">
                                <div>
                                    <span className="text-[0.9rem] text-gray70">
                                        دسترسی ها
                                    </span>
                                </div>
                                <List
                                  sx={{ width: '100%', bgcolor: 'background.paper',border:"1px solid #D9D9D9",color:"#29262A"}}
                                  component="nav"
                                  aria-labelledby="nested-list-subheader"
                                  subheader={
                                    <ListSubheader component="div" id="nested-list-subheader">
                                       
                                    </ListSubheader>
                                  }
                                >
                                  <ListItemButton onClick={handleClick}>
                                    <ListItemText primaryTypographyProps={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}}  primary="صفحه" />
                                    {openAccess ? <ExpandLess /> : <ExpandMore />}
                                  </ListItemButton>
                                  <Collapse in={openAccess} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                      <ListItemButton sx={{ pr: 4 }}>
                                        <ListItemText primaryTypographyProps={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}} primary="API" />
                                      </ListItemButton>
                                    </List>
                                  </Collapse>
                                </List>
                            </div>
                        </div>
                        <div className="md:hidden flex justify-center">
                            <div className="w-full md:w-[70%] flex flex-col gap-3">
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                        نام نقش :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                       {props.moreRoleInfoTarget?.role}
                                    </span>
                                </div>
                            </div>
                            <div className="w-full md:w-[70%] flex flex-col gap-3">
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                        دسترسی ها
                                    </span>
                                </div>
                                <List
                                  sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper',border:"1px solid #D9D9D9",color:"#29262A" }}
                                  component="nav"
                                  aria-labelledby="nested-list-subheader"
                                  subheader={
                                    <ListSubheader component="div" id="nested-list-subheader">
                                       
                                    </ListSubheader>
                                  }
                                >
                                  <ListItemButton onClick={handleClick}>
                                    <ListItemText primary="صفحه" />
                                    {openAccess ? <ExpandLess /> : <ExpandMore />}
                                  </ListItemButton>
                                  <Collapse in={openAccess} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                      <ListItemButton sx={{ pr: 4 }}>
                                        <ListItemText primary="API" />
                                      </ListItemButton>
                                    </List>
                                  </Collapse>
                                </List>
                            </div>
                        </div>
                        <div className="md:hidden flex  justify-center mt-5 gap-3">
                            <button onClick={()=>{props.handleOpenDeleteRole(props.moreRoleInfoTarget.id);props.handleCloseMoreRoleInfo()}} className="px-6 py-2 text-[0.8rem] text-mainRed border border-mainRed rounded hover:bg-mainRed hover:text-white">
                                حذف
                            </button>
                            <button onClick={()=>{props.handleOpenEditRoleInfo(props.moreRoleInfoTarget);props.handleCloseMoreRoleInfo()}}  className="px-5 py-2 text-[0.8rem] text-[#4087DB] border border-[#4087DB] rounded hover:bg-[#4087DB] hover:text-white">
                                ویرایش
                            </button>
                        </div>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </>
    )
}