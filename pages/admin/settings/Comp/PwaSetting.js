import { useRouter, useParams } from 'next/router'
import React, { useState, useEffect, useContext } from 'react';
import Uploadimg from '../../Comp/Uploadimg'

import Image from 'next/image'
import MYS from '/Styles/mystyle.module.css'
import LoadingButton from '@mui/lab/LoadingButton';
import { LuArrowRight } from "react-icons/lu";

import { MediaFilesUrl, MediaFilesFolder, FeedimgFolder } from '/Data/config'

import {
    Card,
    TextField,
    styled
} from '@mui/material';
const PwaSetting = ({ SData }) => {
    const router = useRouter()
    const [AppName, setAppName] = useState(null);
    const [ShortDescription, setShortDescription] = useState(null);
    const [AppShortName, setAppShortName] = useState(null);
    const [BtnLoading, setBtnLoading] = useState(false);
    const [SettingData, setSettingData] = useState(null);

    const [Sid, setSid] = useState(null);
    const [Skey, setSkey] = useState('PwaSetting');
    const [Icon192, setIcon192] = useState(null);
    const [Icon512, setIcon512] = useState(null);

    const onImageUpload = (Filedata) => {
        if (Filedata) {
            console.log(Filedata.postData)
            setIcon192(Filedata.postData.fileName)
        } else {
            setIcon192(null)
        }
    };
    const onImageUpload512 = (Filedata) => {
        if (Filedata) {
            console.log(Filedata.postData)
            setIcon512(Filedata.postData.fileName)
        } else {
            setIcon512(null)
          
        }
    };

    useEffect(() => {
        setSid(SData._id)
        if (SData.SettingsData.PwaSetting) {
            setAppName(SData.SettingsData.PwaSetting.AppName)
            setShortDescription(SData.SettingsData.PwaSetting.ShortDescription)
            setAppShortName(SData.SettingsData.PwaSetting.AppShortName)
            setIcon192(SData.SettingsData.PwaSetting.Icon192)
            setIcon512(SData.SettingsData.PwaSetting.Icon512)
        }


    }, [router.query])
    useEffect(() => {
        const DataNow = {

            AppName: AppName,
            ShortDescription: ShortDescription,
            AppShortName: AppShortName,
            Icon192: Icon192,
            Icon512: Icon512

        }
        setSettingData(DataNow)


    }, [AppName, ShortDescription, AppShortName,Icon192, Icon512])



    const UpdateData = async (e) => {
        e.preventDefault();
      
        if (Sid !== null && Skey !== null && SettingData !== null && Icon512 !== null && Icon192 !==null) {
            setBtnLoading(true)
            const sendUM = {
                Skey: Skey,
                Sid: Sid,
                SettingData: SettingData,
               
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
                    } else {
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
        <div className={MYS.SettingsItemBox} style={{width:'100%', overflow:'hidden'}}>
            <div className={MYS.SettingsItem}>
                <div className={MYS.SettingsItemA}>
                    <div className={MYS.STitle}>
                        <span>PWA Settings</span>
                        <small>PWA - Progressive web app for users</small>
                    </div>

                    <div>
                        <form onSubmit={UpdateData} >

                            <div className={MYS.inputlogin}>
                                <TextField
                                    fullWidth
                                    value={AppName}
                                    onInput={e => setAppName(e.target.value)}
                                    required
                                    label="App Name"

                                />

                            </div>
                            <div className={MYS.inputlogin}>
                                <TextField
                                    fullWidth
                                    value={AppShortName}
                                    onInput={e => setAppShortName(e.target.value)}
                                    required
                                    label="App Short Name"

                                />
                            </div>
                            <div className={MYS.inputlogin}>
                                <TextField
                                    fullWidth
                                    value={ShortDescription}
                                    onInput={e => setShortDescription(e.target.value)}
                                    required
                                    label="Short Description"

                                />
                            </div>

                            <div className={MYS.IconBoxPwa}>
                                <div className={MYS.IconBoxPwaA}>
                                    <Image
                                        src={Icon192?`${MediaFilesUrl}${MediaFilesFolder}/${Icon192}`:'/img/pwa-icon.png'}
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
                                <div className={MYS.IconBoxPwaB}>
                                    <small>192x192 Icon</small>
                                    <Uploadimg onImageUpload={onImageUpload} />
                                </div>
                            </div>
                            <div className={MYS.IconBoxPwa}>
                                <div className={MYS.IconBoxPwaA}>
                                    <Image
                                          src={Icon512?`${MediaFilesUrl}${MediaFilesFolder}/${Icon512}`:'/img/pwa-icon.png'}
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
                                <div className={MYS.IconBoxPwaB}>
                                    <small>512x512 Icon</small>
                                    <Uploadimg onImageUpload={onImageUpload512} />
                                </div>
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
                            src={`/img/pwa-icon.png`}
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

export default PwaSetting
