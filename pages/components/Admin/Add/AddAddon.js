import React, { useState, useEffect, useContext } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import DialogTitle from '@mui/material/DialogTitle';
import FileUpload from '../FileUpload'

import Skeleton from '@mui/material/Skeleton';
import Select from '@mui/material/Select';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import Badge from '@mui/material/Badge';
import { useRouter, useParams } from 'next/router'

import MYS from '/Styles/mystyle.module.css'
import {
   
    FormControl,
    TextField,
   
    styled,
   
} from '@mui/material';
import CheckloginContext from '/context/auth/CheckloginContext'
const EditCatModal = () => {
    const [Logo, setLogo] = useState('/img/picture.png');
    const Contextdata = useContext(CheckloginContext)
    const router = useRouter()
    const [Btnloading, setBtnloading] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');
    const [title, setTitle] = useState('');
    const [details, setdetails] = useState('');
    const [sprice, setSprice] = useState('');
    const [mprice, setMprice] = useState('');
    const [isActive, setIsActive] = useState(3);
    const [Branchcode, setBranchcode] = useState('');
    const [ValidityDay, setValidityDay] = useState(1);
    const [Loadingbranch, setLoadingbranch] = useState(false);

    const [BranchList, setBranchList] = useState([]);

    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: -3,
            top: 13,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
        },
    }));
    const handleChangeBranch = (event) => {
        setBranchcode(event.target.value);
        alert(`This Addon will be added to ${event.target.value}`)
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

    const handleChangeTSStatus = (event) => {
        setIsActive(event.target.value);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const descriptionElementRef = React.useRef(null);
    useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    const handleSubmit = (e) => {

        e.preventDefault();
        let FinalFileName = document.querySelector('#FinalFileName').value
        if (title !== ''
            && Branchcode !== ''
            && details !== ''
            && sprice !== ''
            && mprice !== ''
            && FinalFileName !== ''
        ) {
            setBtnloading(true)
            AddPass(FinalFileName)

        } else {
            alert('all fields are required');
        }


    };

    const AddPass = async (e) => {


        const sendUM = {
         
            title: title,
            details: details,
            Branchcode: Branchcode,
            img: e,
            mprice: mprice,
            sprice: sprice,
            isActive: isActive,
            ValidityDay:ValidityDay

        }
        const data = await fetch("/api/V3/Admin/Addons/AddLibraryAddons", {
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
                    setOpen(false)
                    router.push(`/admin/addons`)
                } else {

                    alert('Something went Wrong, please try again')
                }


            })
    }

    return (
        <div>
            <div>



                <Button
                    onClick={handleClickOpen('paper')}
                    size="small"
                    variant="outlined"
                    startIcon={<AddTwoToneIcon fontSize="small" />}
                >
                    Add New Addon
                </Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    scroll={scroll}
                    aria-labelledby="scroll-dialog-title"
                    aria-describedby="scroll-dialog-description"
                >
                    <DialogTitle id="scroll-dialog-title">Add New Addon</DialogTitle>
                    <DialogContent dividers={scroll === 'paper'}>
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
                                    label="Addon Title"
                                    fullWidth
                                    value={title}

                                    onInput={e => setTitle(e.target.value)}

                                />
                            </div>
                            <div className={MYS.inputlogin}>
                                <TextField
                                    required
                                    label="Addon Details"
                                    fullWidth
                                    value={details}

                                    onInput={e => setdetails(e.target.value)}

                                />
                            </div>
                            <div className={MYS.inputlogin}>
                                <TextField
                                    required
                                    label="Main Price"
                                    fullWidth
                                    value={mprice}

                                    onInput={e => setMprice(e.target.value)}

                                />
                            </div>
                            <div className={MYS.inputlogin}>
                                <TextField
                                    required
                                    label="Sale Price"
                                    fullWidth
                                    value={sprice}

                                    onInput={e => setSprice(e.target.value)}

                                />
                            </div>
                            <div className={MYS.inputlogin}>
                                <TextField
                                    required
                                    label="Validity in Days"
                                    fullWidth
                                    value={ValidityDay}

                                    onInput={e => setValidityDay(e.target.value)}

                                />
                            </div>

                            <div className={MYS.inputlogin}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Status</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={isActive}
                                        label="Status"
                                        onChange={handleChangeTSStatus}
                                    >
                                        <MenuItem value={3}>Public</MenuItem>
                                        <MenuItem value={2}>Upcoming</MenuItem>
                                        <MenuItem value={1}>Private</MenuItem>

                                    </Select>
                                </FormControl>
                            </div>



                            <div style={{ minHeight: 25 }}></div>
                            <div className={MYS.featuresimagebox}>
                                <div className={MYS.featuresimageboxA}>
                                    <img
                                        src={`${Logo}`}
                                        width={100}
                                        height={100}
                                        layout='responsive'
                                        alt='img'
                                        id="Fimage"

                                    />
                                    <div>
                                        <small>Addon image</small>
                                    </div>
                                </div>

                                <div className={MYS.featuresimageboxB}>
                                    <FileUpload />
                                </div>
                            </div>
                            <input type="hidden" value={Logo} id="FinalFileName" />

                            <div style={{ minHeight: 25 }}></div>

                        </form>
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
        </div>
    )
}

export default EditCatModal
