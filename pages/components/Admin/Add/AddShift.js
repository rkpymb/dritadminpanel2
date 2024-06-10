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
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
export default function ScrollDialog() {
    const [Btnloading, setBtnloading] = useState(false);
    const Contextdata = useContext(CheckloginContext)
    const router = useRouter()

    const [open, setOpen] = useState(false);
   
    const [scroll, setScroll] = useState('paper');
    const [title, setTitle] = useState('');
    const [mprice, setMprice] = useState('');
    const [sprice, setSprice] = useState('');
    const [uptime, setUptime] = useState('');
    const [downtime, setDowntime] = useState('');
    const [Branchcode, setBranchcode] = useState('');
    const [isActive, setIsActive] = useState(0);
    const [Loadingbranch, setLoadingbranch] = useState(true);

    const [BranchList, setBranchList] = useState([]);

    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };


    const handleChangeBranch = (event) => {
        setBranchcode(event.target.value);
        alert(`This Shift will be added to ${event.target.value}`)
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (title !== '' && mprice !== '' && sprice !== '' && uptime !== '' && downtime !== '' && Branchcode !== '') {
            setBtnloading(true)
            const sendUM = {
              
                title: title,
                Branchcode: Branchcode,
                uptime: uptime,
                downtime: downtime,
                mprice: mprice,
                sprice: sprice,
                isActive: isActive,

            }
            const data = await fetch("/api/V3/Admin/Shifts/AddLBShift", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(sendUM)
            }).then((a) => {
                return a.json();
            })
                .then((parsed) => {
                    setBtnloading(false)
                    if (parsed.ReqD.done) {
                        alert(`${title} Added Successfully`)
                        setBranchcode('')
                        setOpen(false)
                        router.push(`/admin/shifts`)
                    } else {

                        alert('Something went Wrong, please try again')
                    }


                })

        } else {
            alert('Please Provide all Required Details ')
        }


    };


    const GetBranchList = async () => {
        const dataid = '08c5th4rh86ht57h6g';
        const sendUM = { dataid }
        const data = await fetch("/api/V3/Admin/Branches/AllBrancheslist", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => {
            return a.json();
        })
            .then((parsed) => {
                console.log(parsed.ReqD.Branchlist)

                if (parsed.ReqD.Branchlist) {
                    setBranchList(parsed.ReqD.Branchlist)
                    setLoadingbranch(false)

                }
            })
    }

    useEffect(() => {
        GetBranchList()
    }, [router.query])





    return (
        <div>
            <Button
                onClick={handleClickOpen('paper')}
                size="small"
                variant="outlined"
                startIcon={<AddTwoToneIcon fontSize="small" />}
            >
                Add Shift
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"

            >
                <DialogTitle id="scroll-dialog-title">Add New Shift</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>

                    <div>

                        <form onSubmit={handleSubmit} >
                            <div className={MYS.inputlogin}>
                                {Loadingbranch &&
                                    <div>
                                        <Skeleton variant="rounded" width='100%' height={60} />
                                    </div>
                                }
                                {!Loadingbranch &&
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Select Branch</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={Branchcode}
                                            label="Select Branch"

                                            onChange={handleChangeBranch}
                                        >

                                            <MenuItem value={''}>Select</MenuItem>
                                            {BranchList.map((item) => {
                                                return <MenuItem value={item.BranchCode}>{item.BranchCode} : {item.name}</MenuItem>


                                            }

                                            )}
                                        </Select>

                                    </FormControl>
                                }


                            </div>
                            <div className={MYS.inputlogin}>
                                <TextField
                                    required
                                    label="Shift Title"
                                    fullWidth
                                    value={title}

                                    onInput={e => setTitle(e.target.value)}

                                />
                            </div>
                            <div className={MYS.inputlogin}>
                                <TextField
                                    required
                                    label="UP Time"
                                    fullWidth
                                    value={uptime}

                                    onInput={e => setUptime(e.target.value)}

                                />
                            </div>
                            <div className={MYS.inputlogin}>
                                <TextField
                                    required
                                    label="Down Time"
                                    fullWidth
                                    value={downtime}

                                    onInput={e => setDowntime(e.target.value)}

                                />
                            </div>
                            <div className={MYS.inputlogin}>
                                <TextField
                                    required
                                    label="Main Price per Day"
                                    fullWidth
                                    value={mprice}

                                    onInput={e => setMprice(e.target.value)}

                                />
                            </div>
                            <div className={MYS.inputlogin}>
                                <TextField
                                    required
                                    label="Sale Price per Day"
                                    fullWidth
                                    value={sprice}

                                    onInput={e => setSprice(e.target.value)}

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
                        onClick={handleSubmit}
                      
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