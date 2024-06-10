import React, { useState, useEffect, useContext } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';
import FileUpload from '../FileUpload'
import EditIcon from '@mui/icons-material/Edit';
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
const EditCatModal = ({ PassData }) => {
    const [Logo, setLogo] = useState('');
    const Contextdata = useContext(CheckloginContext)
    const router = useRouter()
    const [Btnloading, setBtnloading] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');
    const [title, setTitle] = useState('');
    const [details, setdetails] = useState('');
    const [Validity, setValidity] = useState(0);
    const [isActive, setIsActive] = useState(0);
    
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

    useEffect(() => {
        setTitle(PassData.title)
        setdetails(PassData.details)
        setValidity(PassData.Validity)
        setIsActive(PassData.isActive)
        setLogo(PassData.img)
       

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
            UpdateBranch(FinalFileName)

        } else {
            alert('all fields are required');
        }


    };

    const UpdateBranch = async (e) => {


        const sendUM = {
          
            title: title,
            img: e,
            details: details,
            Validity: Validity,
            isActive: isActive,
            id: PassData._id,

        }
        const data = await fetch("/api/V3/Admin/Passes/UpdatePass", {
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
                    alert(`${title} Subscription Pass Updated Successfully`)
                    setOpen(false)
                    router.push(`/admin/subscription-pass/`)
                } else {

                    alert('Something went Wrong, please try again')
                }


            })
    }

    return (
        <div>
            <div>



                <IconButton aria-label="cart" onClick={handleClickOpen('paper')}>
                    <StyledBadge color="secondary" >
                        <FiEdit size={15} />
                    </StyledBadge>
                </IconButton>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    scroll={scroll}
                    aria-labelledby="scroll-dialog-title"
                    aria-describedby="scroll-dialog-description"
                >
                    <DialogTitle id="scroll-dialog-title">Edit Pass : {title}</DialogTitle>
                    <DialogContent dividers={scroll === 'paper'}>
                        <form onSubmit={handleSubmit} >
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
                                        src={`${MediaFilesUrl}${MediaFilesFolder}/${Logo}`}
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
                            <span>Update</span>
                        </LoadingButton>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    )
}

export default EditCatModal
