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
export default function ScrollDialog({ ProfileData }) {
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
    const [Row, setRow] = useState(1);
    const [Facing, setFacing] = useState('');
    const [Branchcode, setBranchcode] = useState('');
    const [isActive, setIsActive] = useState(3);
    const [Loadingbranch, setLoadingbranch] = useState(true);

    const [BranchList, setBranchList] = useState([]);

    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };


    const handleChangeBranch = (event) => {
        setBranchcode(event.target.value);

    };
    const handleChangeFacing = (event) => {
        setFacing(event.target.value);

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

    const AssignBranchtoStaff = async (e) => {
        e.preventDefault();
        if (Branchcode !== '') {
            setBtnloading(true)
            const sendUM = {
                BranchCode: Branchcode,
                Userid: ProfileData && ProfileData.Userid


            }
            const data = await fetch("/api/V3/Admin/Staff/AssignBranchtoStaff", {
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
                    if (parsed.ReqData.message) {
                        alert(parsed.ReqData.message)
                     }
                     if (parsed.ReqData.error) {
                        alert( parsed.ReqData.error)
                     }
                    if (parsed.ReqData.done) {
                       
                        setBranchcode('')
                        setOpen(false)
                        router.push(`/admin/staff/profile/${ProfileData && ProfileData.Userid}`)
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
                Assign Branch
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"

            >
                <DialogTitle id="scroll-dialog-title"> Assign Branch</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>

                    <div>
                        <div className={MYS.UserDTb}>
                            <span>{ProfileData && ProfileData.name} </span>
                            <div style={{ height: '5px' }}></div>
                            <small>{ProfileData && ProfileData.mobile}</small>
                        </div>

                        <form onSubmit={AssignBranchtoStaff} >
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





                            <div style={{ minHeight: 25 }}></div>

                        </form>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <LoadingButton
                        size="small"
                        onClick={AssignBranchtoStaff}

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