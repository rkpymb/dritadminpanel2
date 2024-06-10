import { useRouter, useParams } from 'next/router'
import React, { useState, useEffect, useContext } from 'react';

import Image from 'next/image'
import MYS from '/Styles/mystyle.module.css'
import LoadingButton from '@mui/lab/LoadingButton';
import { LuArrowRight } from "react-icons/lu";

import {
    Card,
    TextField,
    styled
} from '@mui/material';
const GmailSmtp = ({ SData }) => {
    const router = useRouter()
    const [GmailUserEmail, setGmailUserEmail] = useState(null);
    const [GmailPass, setGmailPass] = useState(null);
    const [CustomEmail, setCustomEmail] = useState(null);
    const [BtnLoading, setBtnLoading] = useState(false);
    const [SettingData, setSettingData] = useState(null);
    const [Sid, setSid] = useState(null);
    const [Skey, setSkey] = useState('GmailSmtp');

    useEffect(() => {
       
        setSid(SData._id)
        if (SData.SettingsData.GmailSmtp) {
            setGmailUserEmail(SData.SettingsData.GmailSmtp.GmailUserEmail)
            setGmailPass(SData.SettingsData.GmailSmtp.GmailPass)
            setCustomEmail(SData.SettingsData.GmailSmtp.CustomEmail)
        }


    }, [router.query])
    useEffect(() => {
        const DataNow = {

            GmailUserEmail: GmailUserEmail,
            GmailPass: GmailPass,
            CustomEmail: CustomEmail,

        }
        setSettingData(DataNow)


    }, [GmailUserEmail, GmailPass, CustomEmail])



    const UpdateData = async (e) => {
        e.preventDefault();
        if (Sid !== null && Skey !== null && SettingData !== null) {
            setBtnLoading(true)
            const sendUM = {
                Skey: Skey,
                Sid: Sid,
                SettingData: SettingData
            }
            const data = await fetch("/api/V3/Admin/Settings/UpdateSettings", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(sendUM)
            }).then((a) => {
                return a.json();
            })
                .then((parsed) => {
                
                    if (parsed.ReqD.Settings) {
                        setTimeout(function () {
                            alert('Settings updated successfully')
                            setBtnLoading(false)

                        }, 2000);
                    }else{
                        setBtnLoading(false)
                       
                        alert('Something went wrong')
                    }
                })
        } else {
            alert('Please Enter All Fields')
        }

    }



    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';
    return (
        <div className={MYS.SettingsItemBox}>
            <div className={MYS.SettingsItem}>
                <div className={MYS.SettingsItemA}>
                    <div className={MYS.STitle}>
                        <span>Gmail SMTP</span>
                        <small>please provide your Gmail SMTP credentials to send email notifications to users seamlessly</small>

                    </div>

                    <div>
                        <form onSubmit={UpdateData} >

                            <div className={MYS.inputlogin}>
                                <TextField
                                    fullWidth
                                    value={GmailUserEmail}
                                    onInput={e => setGmailUserEmail(e.target.value)}
                                    required
                                    label="Gmail User Email"

                                />

                            </div>
                            <div className={MYS.inputlogin}>
                                <TextField
                                    fullWidth
                                    value={CustomEmail}
                                    onInput={e => setCustomEmail(e.target.value)}
                                    required
                                    label="Business Email"

                                />


                            </div>
                            <div className={MYS.inputlogin}>
                                <TextField
                                    fullWidth
                                    value={GmailPass}
                                    onInput={e => setGmailPass(e.target.value)}
                                    required
                                    label="Gmail Pass Key"
                                    
                                />
                            </div>
                            <div className={MYS.inputlogin}>
                                <LoadingButton
                                    type="submit"
                                    fullWidth
                                    endIcon={<LuArrowRight />}
                                    loading={BtnLoading}
                                    loadingPosition="end"
                                    variant="contained"
                                    onClick={UpdateData}
                                >
                                    <span>Update</span>
                                </LoadingButton>
                            </div>

                        </form>




                    </div>



                </div>
                <div className={MYS.SettingsItemB}>

                    <div className={MYS.PMItemAImg}>
                        <Image
                            src={`/img/GmailSmtp.png`}
                            alt="image"
                            layout="responsive"
                            placeholder='blur'
                            width={50}
                            height={50}
                            quality={100}
                            blurDataURL={blurredImageData}
                            objectFit='center'


                        />

                    </div>

                </div>


            </div>
        </div>
    )
}

export default GmailSmtp
