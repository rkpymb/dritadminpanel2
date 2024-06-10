import React, { useState, useEffect, useContext } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';

import { LuChevronRight } from "react-icons/lu";

import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';

import { useRouter, useParams } from 'next/router'

import MYS from '/Styles/mystyle.module.css'
import {

    TextField,


} from '@mui/material';
import CheckloginContext from '/context/auth/CheckloginContext'
const EditCatModal = () => {
   
    const Contextdata = useContext(CheckloginContext)
    const router = useRouter()
    const [Btnloading, setBtnloading] = useState(false);
    const [Allok, setAllok] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');
    const [WebName, setWebName] = useState('');
    const [Webid, setWebid] = useState('');
    const [WebidText, setWebidText] = useState('');



    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
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



    const CheckWebid = async (e) => {
        const sendUM = {
           
            webid: e,
        }
        const data = await fetch("/api/V3/Admin/Checkwebid", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => {
            return a.json();
        })
            .then((parsed) => {
                if (parsed.ReqData.msg) {
                    setAllok(false);
                    setWebidText(`${parsed.ReqData.msg} is not available`)
                    setWebid(parsed.ReqData.ok)
                }
                if (parsed.ReqData.ok) {
                    setAllok(true);
                    setWebidText(`${parsed.ReqData.ok} is available`)
                    setWebid(parsed.ReqData.ok)

                }

            })
    }


    const CreateWebApp = async (e) => {
        if (WebName !== '' && Webid !== '' && Allok) {
            setBtnloading(true)
            const sendUM = {
               
                webid: Webid,
                WebName: WebName
            }

            const data = await fetch("/api/V3/Admin/CreateWebsite", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(sendUM)
            }).then((a) => {
                return a.json();
            })
                .then((parsed) => {

                    setTimeout(function () {

                        if (parsed.ReqData.msg) {
                            setAllok(false);
                            alert(`Something went wrong`)

                        }
                        if (parsed.ReqData.done) {
                           
                            const newToken = parsed.ReqData.token
                            document.cookie = `jwt_token_two=${newToken}; expires=${new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000).toUTCString()}; path=/`;
                            alert('Website Created Successfully')
                            handleClose()
                            
                            router.push('/admin/customize-website')

                        }
                        setBtnloading(false)
                    }, 2000);


                })
        } else {
            alert('All fields are required')
        }

    }

    return (
        <div>
            <div>
                <Button
                    onClick={handleClickOpen('paper')}
                    fullWidth
                    variant="contained"
                    endIcon={<LuChevronRight fontSize="small" />}
                >
                    Create Website For Free
                </Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    scroll={scroll}
                    aria-labelledby="scroll-dialog-title"
                    aria-describedby="scroll-dialog-description"
                >
                    <DialogTitle id="scroll-dialog-title">Create Website </DialogTitle>
                    <DialogContent dividers={scroll === 'paper'}>
                        <form onSubmit={CreateWebApp} >

                            <div className={MYS.inputlogin}>
                                <TextField
                                    required
                                    label="Website Title"
                                    fullWidth
                                    value={WebName}
                                    onChange={e => CheckWebid(e.target.value)}
                                    onInput={e => setWebName(e.target.value)}

                                />
                            </div>
                            <div className={MYS.inputlogin}>
                                <TextField
                                    required
                                    label="Website Unique name"
                                    fullWidth
                                    value={Webid}
                                    onInput={e => setWebid(e.target.value)}
                                    onChange={e => CheckWebid(e.target.value)}
                                />
                                <p>{WebidText}</p>
                            </div>


                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <LoadingButton
                            size="small"
                            onClick={CreateWebApp}
                          
                            loading={Btnloading}
                            loadingPosition="end"
                            variant="contained"
                        >
                            <span>Create Website</span>
                        </LoadingButton>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    )
}

export default EditCatModal
