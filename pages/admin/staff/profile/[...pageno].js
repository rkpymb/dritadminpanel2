import React, { useState, useEffect, useContext } from 'react';


import CheckloginContext from '/context/auth/CheckloginContext'
import SidebarLayout from 'src/layouts/SidebarLayout';
import MYS from '/Styles/mystyle.module.css'
import Skeleton from '@mui/material/Skeleton';

import { MediaFilesUrl, MediaFilesFolder } from '/Data/config'
import Avatar from '@mui/material/Avatar';


import LoadingButton from '@mui/lab/LoadingButton';

import StaffBrancheList from './Comp/StaffBrancheList'

import TitleNav from '../../../../src/components/Parts/TitleNav'

import { useRouter, useParams } from 'next/router'


export async function getServerSideProps(context) {

    const Userid = context.query.pageno[0];

    return {
        props: { Userid },
    }

}

function DashboardCrypto({ Userid }) {

    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true);
    const [Btnloading, setBtnloading] = useState(false);

    const [IsActive, setIsActive] = useState(false);

    const [ProfileData, setProfileData] = useState({});


    const ChangeUserStatus = async () => {
        setBtnloading(true)
        const sendUM = {

            Userid: Userid,

        }
        const data = await fetch("/api/V3/Admin/Staff/ChangeStaffStatus", {
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
                if (parsed.ReqData.done) {
                    alert(parsed.ReqData.done)
                    router.push(`/admin/staff/profile/${Userid}`)
                } else {
                    alert('Something went wrong')
                }

            })
    }

    const GetUserData = async () => {
        const sendUM = {

            Userid: Userid,

        }
        const data = await fetch("/api/V3/Admin/Staff/StaffProfileData", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => {
            return a.json();
        })
            .then((parsed) => {
                if (parsed.ReqData.UserData) {
                    setProfileData(parsed.ReqData.UserData)
                    setIsActive(parsed.ReqData.UserData.isActive)

                    setIsLoading(false);
                }

            })
    }

    useEffect(() => {
        setIsLoading(true)
        GetUserData()
    }, [router.query])
    return (
        <>
            {!isLoading &&
                <TitleNav Title={`${ProfileData && ProfileData.name}'s Profile`} />

            }

            <div className={MYS.MboxMain}>

                <div>
                    <div className={MYS.ProfileboxgridItem}>
                        <div className={MYS.MainProfileBox}>
                            <div className={MYS.MainProfileBoxA}>

                                {!isLoading ?
                                    <Avatar
                                        alt={ProfileData.name}
                                        src={`${MediaFilesUrl}${MediaFilesFolder}/${ProfileData.dp}`}
                                        sx={{ width: 75, height: 75 }}
                                    />
                                    : <div>
                                        <Skeleton variant="circular" animation="wave">
                                            <Avatar sx={{ width: 75, height: 75 }} />
                                        </Skeleton>

                                    </div>


                                }
                            </div>
                            <div className={MYS.MainProfileBoxB}>
                                <div className={MYS.PAbox}>
                                    <span>{ProfileData.name}</span>
                                    <div>
                                        <small>{ProfileData.mobile}</small>
                                    </div>
                                    <div>
                                        <small>{ProfileData.email}</small>
                                    </div>
                                    <div>
                                        <small>joined @ {ProfileData.date}, {ProfileData.time} by {ProfileData.reg_by}</small>
                                    </div>

                                </div>
                                <div style={{ height: '10px' }}></div>

                                <div className={MYS.Pmtagflex}>

                                    <div className={MYS.Pmtag}>
                                        <span>
                                            {ProfileData.isActive ? 'Active Profile' :
                                                'Deactivated Profile'
                                            }
                                        </span>
                                    </div>
                                </div>

                            </div>

                        </div>

                        <div className={MYS.Activebtnbox}>
                            <LoadingButton
                                size="small"
                                onClick={ChangeUserStatus}

                                loading={Btnloading}
                                loadingPosition="end"
                                variant="contained"

                            >

                                {ProfileData.isActive ? <samll style={{ color: 'white' }}>Deactivate Profile</samll> :
                                    <small style={{ color: 'white' }}> Activate Profile</small>

                                }

                            </LoadingButton>
                        </div>

                    </div>


                </div>
                <div style={{ height: '10px' }}></div>
                {!isLoading &&
                    <div>
                        <StaffBrancheList AssignBranches={ProfileData.AssignBranches} ProfileData={ProfileData} />
                    </div>


                }




            </div>


        </>
    );
}

DashboardCrypto.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardCrypto;
