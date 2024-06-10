import React, { useState, useEffect, useContext, useRef } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Skeleton from '@mui/material/Skeleton';
import CheckloginContext from '/context/auth/CheckloginContext'
import DialogTitle from '@mui/material/DialogTitle';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import MYS from '/Styles/mystyle.module.css'
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { Toast } from 'primereact/toast';
import { useRouter, useParams } from 'next/router'

import {
    FormControl,
    TextField,

    styled
} from '@mui/material';

import LoadingButton from '@mui/lab/LoadingButton';
export default function ScrollDialog() {
    const [Btnloading, setBtnloading] = useState(false);
   
    const router = useRouter()

    const [open, setOpen] = useState(false);

    const [scroll, setScroll] = useState('paper');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState(null);
    const [PassKey, setPassKey] = useState('');
   

    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };


    const handleClose = () => {
        setOpen(false);
    };

    const descriptionElementRef = useRef(null);
    useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    const AddStaff = async (e) => {
        e.preventDefault();
        if (name !== '' && email !== '' && PassKey !== '' && mobile.length == 10) {
            setBtnloading(true)
            const sendUM = {

                mobile:mobile,
                email:email,
                name:name,
                PassKey:PassKey

            }
            const data = await fetch("/api/V3/Admin/Staff/AddStaff", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(sendUM)
            }).then((a) => {
                return a.json();
            })
                .then((parsed) => {
                    console.log(parsed)
                    setBtnloading(false)
                    if (parsed.ReqData.done) {
                        alert(`Staff Added Successfully`)
                        
                        setOpen(false)
                        router.push(`/admin/staff`)
                    }
                    if (parsed.ReqData.error) {
                        alert(parsed.ReqData.error)
                       
                    }


                })

        } else {
            alert('Please Provide all Required Details ')
        }


    };


    return (
        <div>
            <Button
                onClick={handleClickOpen('paper')}
                size="small"
                variant="contained"
                startIcon={<AddTwoToneIcon fontSize="small" />}
            >
                Add Staff
            </Button>
          
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"

            >
                <DialogTitle id="scroll-dialog-title">Add New Staff</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>

                    <div>

                        <form onSubmit={AddStaff} >
                         
                            <div className={MYS.inputlogin}>
                                <TextField
                                    required
                                    label="Full Name"
                                    fullWidth
                                    value={name}

                                    onInput={e => setName(e.target.value)}

                                />
                            </div>
                            <div className={MYS.inputlogin}>
                                <TextField
                                    required
                                    label="Mobile Number"
                                    fullWidth
                                    value={mobile}
                                    type='Number'
                                    onInput={e => setMobile(e.target.value)}
                                />
                            </div>
                            <div className={MYS.inputlogin}>
                                <TextField
                                    required
                                    label="Email Address"
                                    fullWidth
                                    value={email}
                                    type='Email'
                                    onInput={e => setEmail(e.target.value)}
                                />
                            </div>
                            <div className={MYS.inputlogin}>
                                <TextField
                                    required
                                    label="Create Password"
                                    fullWidth
                                    value={PassKey}
                                    type='Password'
                                    onInput={e => setPassKey(e.target.value)}
                                />
                            </div>
                       




                            <div style={{ minHeight: 25 }}></div>

                        </form>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <LoadingButton
                        size="small"
                        onClick={AddStaff}
                     
                        loading={Btnloading}
                        loadingPosition="end"
                        variant="contained"
                    >
                        <span>Save</span>
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        </div>
    );
}