import React, { useState, useEffect, useContext } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';
import FileUpload from '../FileUpload'

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
const EditCatModal = ({ BranchData }) => {
    const Contextdata = useContext(CheckloginContext)
    const router = useRouter()
    const [Btnloading, setBtnloading] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');


    const [name, setName] = useState('');
    const [Sname, setSname] = useState('');
    const [City, setCity] = useState('');
    const [State, setState] = useState('');
    const [Logo, setLogo] = useState('');
    const [Address, setAddress] = useState('');
    const [pincode, setPincode] = useState('');
    const [longitude, setLongitude] = useState('');
    const [latitude, setLatitude] = useState('');
    const [isActive, setIsActive] = useState(1);
    const [GoogleMap, setGoogleMap] = useState('');
    const [MobileNum, setMobileNum] = useState('');
    const [Email, setEmail] = useState('');
    const [Whatsapp, setWhatsapp] = useState('');

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
        setName(BranchData.name)
        setSname(BranchData.Sname)
        setCity(BranchData.City)
        setState(BranchData.State)
        setAddress(BranchData.Address)
        setLogo(BranchData.logo)
        setPincode(BranchData.pincode)
        setLongitude(BranchData.longitude)
        setLatitude(BranchData.latitude)
        setIsActive(BranchData.isActive)
        setGoogleMap(BranchData.GoogleMap)
        setMobileNum(BranchData.MobileNum)
        setEmail(BranchData.Email)
        setWhatsapp(BranchData.Whatsapp)

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
        if (name !== ''
            && Sname !== ''
            && City !== ''
            && State !== ''
            && pincode !== ''
            && Address !== ''
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
           
            name: name,
            Sname: Sname,
            logo: e,
            City:City,
            Address: Address,
            State: State,
            pincode: pincode,
            longitude: longitude,
            latitude: latitude,
            GoogleMap: GoogleMap,
            isActive: isActive,
            MobileNum:MobileNum,
            Email: Email,
            Whatsapp:Whatsapp,
            id:BranchData._id,

        }
        const data = await fetch("/api/V3/Admin/Branches/UpdateLibraryBranch", {
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
                    alert('Branch Updated Successfully')
                    setOpen(false)
                  
                } else {

                    alert('Something went Wrong, please try again')
                }


            })
    }

    return (
        <div>
            <div>



                <LoadingButton
                    type="submit"
                    size="small"
                    onClick={handleClickOpen('paper')}
                    endIcon={<FiEdit />}
                    loading={false}
                    loadingPosition="end"
                    variant="outlined"
                >
                    <span>Edit Branch</span>
                </LoadingButton>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    scroll={scroll}
                    aria-labelledby="scroll-dialog-title"
                    aria-describedby="scroll-dialog-description"
                >
                    <DialogTitle id="scroll-dialog-title">Edit Branch : {name}</DialogTitle>
                    <DialogContent dividers={scroll === 'paper'}>
                        <form onSubmit={handleSubmit} >
                            <div className={MYS.inputlogin}>
                                <TextField
                                    required
                                    label="Branch Full Name"
                                    fullWidth
                                    value={name}

                                    onInput={e => setName(e.target.value)}

                                />
                            </div>
                            <div className={MYS.inputlogin}>
                                <TextField
                                    required
                                    label="Branch Short Name"
                                    fullWidth
                                    value={Sname}

                                    onInput={e => setSname(e.target.value)}

                                />
                            </div>

                            <div className={MYS.inputlogin}>
                                <TextField
                                    required
                                    label="Address"
                                    fullWidth
                                    value={Address}

                                    onInput={e => setAddress(e.target.value)}

                                />
                            </div>
                            <div className={MYS.inputlogin}>
                                <TextField
                                    required
                                    label="City"
                                    fullWidth
                                    value={City}

                                    onInput={e => setCity(e.target.value)}

                                />
                            </div>
                            <div className={MYS.inputlogin}>
                                <TextField
                                    required
                                    label="State"
                                    fullWidth
                                    value={State}

                                    onInput={e => setState(e.target.value)}

                                />
                            </div>
                            <div className={MYS.inputlogin}>
                                <TextField
                                    required
                                    label="pincode"
                                    fullWidth
                                    value={pincode}

                                    onInput={e => setPincode(e.target.value)}

                                />
                            </div>
                            <div className={MYS.inputlogin}>
                                <TextField
                                    required
                                    label="latitude"
                                    fullWidth
                                    value={latitude}

                                    onInput={e => setLatitude(e.target.value)}

                                />
                            </div>
                            <div className={MYS.inputlogin}>
                                <TextField
                                    required
                                    label="longitude"
                                    fullWidth
                                    value={longitude}

                                    onInput={e => setLongitude(e.target.value)}

                                />
                            </div>
                            <div className={MYS.inputlogin}>
                                <TextField
                                    required
                                    label="Google Map url"
                                    fullWidth
                                    value={GoogleMap}

                                    onInput={e => setGoogleMap(e.target.value)}

                                />
                            </div>
                            <div className={MYS.inputlogin}>
                                <TextField
                                    required
                                    label="Contact Number"
                                    fullWidth
                                    value={MobileNum}

                                    onInput={e => setMobileNum(e.target.value)}

                                />
                            </div>
                            <div className={MYS.inputlogin}>
                                <TextField
                                    required
                                    label="Email Address"
                                    fullWidth
                                    value={Email}

                                    onInput={e => setEmail(e.target.value)}

                                />
                            </div>
                            <div className={MYS.inputlogin}>
                                <TextField
                                    required
                                    label="WhatsApp Number"
                                    fullWidth
                                    value={Whatsapp}

                                    onInput={e => setWhatsapp(e.target.value)}

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
                                        width={'100%'}
                                        
                                        layout='responsive'
                                        alt='img'
                                        id="Fimage"

                                    />
                                    
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
