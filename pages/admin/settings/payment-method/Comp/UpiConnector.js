import React, { useState, useEffect, useContext } from 'react';
import MYS from '/Styles/mystyle.module.css'

import CheckloginContext from '/context/auth/CheckloginContext'
import {
    Tooltip,
    FormControl,
    TextField,
    useTheme,
    styled,
    IconButton
} from '@mui/material';
import { useRouter, useParams } from 'next/router'

import LoadingButton from '@mui/lab/LoadingButton';
import { LuArrowLeft, LuChevronRight } from "react-icons/lu";

const UpiConnector = ({ PmData }) => {
    const router = useRouter()
    const Contextdata = useContext(CheckloginContext)
    const [LoadingBtn, setLoadingBtn] = useState(false);
    const [apikey, setApikey] = useState('');
    const [secretkey, setSecretkey] = useState('');
    const [providor_id, setProvidor_id] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (apikey !== '' && secretkey !== '' && providor_id !== '') {
            setLoadingBtn(true);
            const Credentials = {
                apikey:apikey,
                secretkey:secretkey,
                providor_id: providor_id
            }
            
            const sendUM = { PMModeID: PmData.PMModeID,Credentials:Credentials }
            const data = await fetch("/api/V3/Admin/UpdatePM", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(sendUM)
            }).then((a) => {
                return a.json();
            })
                .then((parsed) => {
                    if (parsed.ReqData) {
                      
                        console.log(parsed.ReqData)
                        if (parsed.ReqData.done ) {
                            alert('Credentials Updated Successfully')
                            
                        }else{
                            alert('Unable to update credentials, try again later')

                        }

                        setLoadingBtn(false)
                       
                    }

                })
        }
    };

    useEffect(() => {
        console.log(PmData)
        setApikey(PmData.Credentials.apikey)
        setSecretkey(PmData.Credentials.secretkey)
        setProvidor_id(PmData.Credentials.providor_id)

    }, [router.query]);



    return (
        <div>
            <div className={MYS.PgEditbox}>
                <div className={MYS.PgEditboxA}>
                    <div>
                        <div className={MYS.FormTitle}>
                            <span>UPI Connector Credentials</span>


                        </div>
                        <form onSubmit={handleSubmit} >
                            <div className={MYS.inputlogin}>
                                <TextField
                                    required
                                    label="API key"
                                    fullWidth
                                    value={apikey}

                                    onInput={e => setApikey(e.target.value)}

                                />
                            </div>
                            <div className={MYS.inputlogin}>
                                <TextField
                                    required
                                    label="Secret key"
                                    fullWidth
                                    value={secretkey}

                                    onInput={e => setSecretkey(e.target.value)}

                                />
                            </div>
                            <div className={MYS.inputlogin}>
                                <TextField
                                    required
                                    label="Providor ID"
                                    fullWidth
                                    value={providor_id}

                                    onInput={e => setProvidor_id(e.target.value)}

                                />
                            </div>
                            <div style={{ height: '20px' }}></div>

                            <LoadingButton

                                onClick={handleSubmit}
                                endIcon={<LuChevronRight />}
                                loading={LoadingBtn}
                                loadingPosition="end"
                                disabled={LoadingBtn}
                                variant="contained"

                            >
                                <span>Save Details</span>
                            </LoadingButton>

                        </form>
                    </div>

                </div>
                <div className={MYS.PgEditboxB}>
                    <div className={MYS.PgTipbox}>

                        <small>Get Your Credentials here - <span className={MYS.Linkurl}>upiconnector.online</span></small>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default UpiConnector
