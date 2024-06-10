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
import Switch from '@mui/material/Switch';
const AttendanceSettings = ({ SData }) => {
    const router = useRouter()



    const [BtnLoading, setBtnLoading] = useState(false);
    const [SettingData, setSettingData] = useState(null);
    const [Sid, setSid] = useState(null);
    const [Skey, setSkey] = useState('AttendanceSettings');
    const [MaxDistance, setMaxDistance] = useState(null);
    const [MinDistance, setMinDistance] = useState(null);
    const [RewardPresent, setRewardPresent] = useState(false);
    const [RewardAbsent, setRewardAbsent] = useState(false);
    const [AbsentRewardAmount, setAbsentRewardAmount] = useState(1);
    const [PresentRewardAmount, setPresentRewardAmount] = useState(1);

    const handleChangePresent = (event) => {

        setRewardPresent(event.target.checked);
    };
    const handleChangeAbsent = (event) => {
        setRewardAbsent(event.target.checked);
    };

    useEffect(() => {
      
        setSid(SData._id)
        if (SData.SettingsData.AttendanceSettings) {
            setMaxDistance(SData.SettingsData.AttendanceSettings.MaxDistance)
            setMinDistance(SData.SettingsData.AttendanceSettings.MinDistance)
            setRewardPresent(SData.SettingsData.AttendanceSettings.RewardPresent)
            setRewardAbsent(SData.SettingsData.AttendanceSettings.RewardAbsent)
            setAbsentRewardAmount(SData.SettingsData.AttendanceSettings.AbsentRewardAmount)
            setPresentRewardAmount(SData.SettingsData.AttendanceSettings.PresentRewardAmount)

        }


    }, [router.query])


    useEffect(() => {
        const DataNow = {
            MaxDistance: MaxDistance,
            MinDistance: MinDistance,
            RewardPresent: RewardPresent,
            RewardAbsent: RewardAbsent,
            PresentRewardAmount: PresentRewardAmount,
            AbsentRewardAmount: AbsentRewardAmount,


        }
        setSettingData(DataNow)


    }, [MaxDistance, MinDistance, RewardPresent, RewardAbsent, PresentRewardAmount, AbsentRewardAmount])



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
        <div className={MYS.SettingsItemBox}>
            <div className={MYS.SettingsItem}>
                <div className={MYS.SettingsItemA}>
                    <div className={MYS.STitleBig}>
                        <span>Attendance Settings</span>
                        <small>manage all related settings to user's Attendance process.</small>
                    </div>

                    <div>
                        <form onSubmit={UpdateData} >
                            <div className={MYS.inputlogin}>
                                <div className={MYS.InpuTitleXy}>
                                    <span>Max & Min Distance</span>
                                    <small>What should be the maximum and minimum distance from the library center for the user to mark attendance?  </small>

                                </div>
                                <div style={{ height: '20px' }}></div>
                                <TextField
                                    fullWidth
                                    value={MaxDistance}
                                    onInput={e => setMaxDistance(e.target.value)}
                                    required
                                    label="Max Distance in meter"
                                    type='Number'

                                />
                                <div className={MYS.hinttext}>
                                    <span>This value will decide that if the user is marking absent then what should be the distance of the user from the library centre, this data is in the meter.</span>
                                </div>
                                <div style={{ height: '20px' }}></div>
                                <TextField
                                    fullWidth
                                    value={MinDistance}
                                    onInput={e => setMinDistance(e.target.value)}
                                    required
                                    label="Min Distance in meter"
                                    type='Number'

                                />
                                <div className={MYS.hinttext}>
                                    <span>This value will decide that if the user is marking Present then what should be the distance of the user from the library centre, this data is in the meter.</span>
                                </div>
                            </div>

                            <div className={MYS.inputlogin}>
                                <div className={MYS.SwitchBox}>
                                    <div className={MYS.SwitchBoxA}>
                                        <div className={MYS.InpuTitleXy}>
                                            <span>Give Reward on Present</span>
                                            <small>give reward to your users on Present marking.</small>
                                        </div>
                                    </div>
                                    <div className={MYS.SwitchBoxB}>
                                        <Switch
                                            required
                                            checked={RewardPresent}
                                            onChange={handleChangePresent}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />

                                    </div>

                                </div>

                                {RewardPresent &&

                                    <div>
                                        <div style={{ height: '20px' }}></div>
                                        <TextField
                                            fullWidth
                                            value={PresentRewardAmount}
                                            onInput={e => setPresentRewardAmount(e.target.value)}
                                            required
                                            label="Present Reward Amount"
                                            type='Number'

                                        />
                                    </div>

                                }


                            </div>
                            <div className={MYS.inputlogin}>
                                <div className={MYS.SwitchBox}>
                                    <div className={MYS.SwitchBoxA}>
                                        <div className={MYS.InpuTitleXy}>
                                            <span>Give Reward on Absent</span>
                                            <small>give reward to your users on Absent marking.</small>
                                        </div>
                                    </div>
                                    <div className={MYS.SwitchBoxB}>
                                        <Switch
                                            required
                                            checked={RewardAbsent}
                                            onChange={handleChangeAbsent}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />

                                    </div>

                                </div>
                                {RewardAbsent &&

                                    <div>
                                        <div style={{ height: '20px' }}></div>
                                        <TextField
                                            fullWidth
                                            value={AbsentRewardAmount}
                                            onInput={e => setAbsentRewardAmount(e.target.value)}
                                            required
                                            label="Absent Reward Amount"
                                            type='Number'

                                        />
                                    </div>

                                }



                            </div>
                            <div style={{ height: '20px' }}></div>
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
                            src={`/img/calendar.png`}
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

export default AttendanceSettings
