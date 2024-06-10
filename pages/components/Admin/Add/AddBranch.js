import React, { useState, useEffect, useContext, useRef } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import CheckloginContext from '/context/auth/CheckloginContext'
import DialogTitle from '@mui/material/DialogTitle';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import MYS from '/Styles/mystyle.module.css'

import FileUpload from '../FileUpload'
import { Toast } from 'primereact/toast';
import { useRouter, useParams } from 'next/router'

import {

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
   
    const [Mainimg, setMainimg] = useState('/img/picture.png');
    const [scroll, setScroll] = useState('paper');
    const [name, setName] = useState('');
    const [Sname, setSname] = useState('');
    const [City, setCity] = useState('');
    const [State, setState] = useState('');
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

    const handleSubmit = (e) => {
        e.preventDefault();
        let FinalFileName = document.querySelector('#FinalFileName').value
        if (name !== '' 
        && Sname !=='' 
        && City !==''
        && State !== ''
        && pincode !== ''
        && Address !== ''
        && FinalFileName !== ''
         ) {
            setBtnloading(true)
            AddBranch(FinalFileName)
        } else {
            alert('all fields are required');
        }


    };


    const AddBranch = async (e) => {

       
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
        
        }
        const data = await fetch("/api/V3/Admin/Branches/AddBranch", {
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
                    alert('Branch Added Successfully')
                    setOpen(false)
                    router.push('/admin/branches')
                } else {

                    alert('Something went Wrong, please try again')
                }


            })
    }

    useEffect(() => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            function (position) {
              const latitude = position.coords.latitude;
              const longitude = position.coords.longitude;
              setLatitude(latitude);
              setLongitude(longitude);
              const googleMapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
              setGoogleMap(googleMapsLink)
            },
            function (error) {
              console.error('Error getting geolocation: ' + error.message);
            }
          );
        } else {
          console.error('Geolocation is not supported by this browser.');
        }
      }, []);


    return (
        <div>
            <Button
                onClick={handleClickOpen('paper')}
                size="small"
                variant="outlined"
                startIcon={<AddTwoToneIcon fontSize="small" />}
            >
                Add Branch
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"

            >
                <DialogTitle id="scroll-dialog-title">Add New Branch</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>

                    <div>
                        <div className={MYS.featuresimagebox}>
                            <div className={MYS.featuresimageboxA}>
                                <img
                                    src={`${Mainimg}`}
                                    width={100}
                                    height={100}
                                    layout='responsive'
                                    alt='img'
                                    id="Fimage"

                                />
                                <div>
                                    <small>Branch Logo</small>
                                </div>
                            </div>
                            <div className={MYS.featuresimageboxB}>
                                <FileUpload />
                            </div>
                        </div>
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
                            <input type="hidden" id="FinalFileName" />

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