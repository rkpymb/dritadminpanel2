import React, { useState, useEffect, useContext } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import DialogTitle from '@mui/material/DialogTitle';
import FileUpload from '../FileUpload'
import EditIcon from '@mui/icons-material/Edit';
import Skeleton from '@mui/material/Skeleton';
import Select from '@mui/material/Select';
import { FiEdit, FiTrash } from "react-icons/fi";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import Badge from '@mui/material/Badge';
import { useRouter, useParams } from 'next/router'
import { MediaFilesUrl, MediaFilesFolder } from '/Data/config'
import MYS from '/Styles/mystyle.module.css'
import {
    Tooltip,
    FormControl,
    TextField,
    useTheme,
    styled,
    IconButton
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
    const [Validity, setValidity] = useState(0);
    const [isActive, setIsActive] = useState(0);
    const [Branchcode, setBranchcode] = useState('');
    const [Loadingbranch, setLoadingbranch] = useState(true);

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
        alert(`This Pass will be added to ${event.target.value}`)
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
            && details !== ''
            && Validity !== ''
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
            Branchcode: Branchcode,
            img: e,
            details: details,
            Validity: Validity,
            isActive: isActive,

        }
        const data = await fetch("/api/V3/Admin/Passes/AddLBPass", {
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
                    alert(`${title} Subscription Pass Added Successfully`)
                    setOpen(false)
                    router.push(`/admin/subscription-pass`)
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
                    Add Pass
                </Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    scroll={scroll}
                    aria-labelledby="scroll-dialog-title"
                    aria-describedby="scroll-dialog-description"
                >
                    <DialogTitle id="scroll-dialog-title">Add New Subscription Pass</DialogTitle>
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
                                    label="Pass Title"
                                    fullWidth
                                    value={title}

                                    onInput={e => setTitle(e.target.value)}

                                />
                            </div>
                            <div className={MYS.inputlogin}>
                                <TextField
                                    required
                                    label="Pass Details"
                                    fullWidth
                                    value={details}

                                    onInput={e => setdetails(e.target.value)}

                                />
                            </div>
                            <div className={MYS.inputlogin}>
                                <TextField
                                    required
                                    label="Pass Validity"
                                    fullWidth
                                    value={Validity}

                                    onInput={e => setValidity(e.target.value)}

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
                                        <small>Pass image</small>
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
