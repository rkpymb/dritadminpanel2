import React, { useState, useEffect, useContext } from 'react';


import CheckloginContext from '/context/auth/CheckloginContext'
import SidebarLayout from 'src/layouts/SidebarLayout';
import MYS from '/Styles/mystyle.module.css'
import Skeleton from '@mui/material/Skeleton';

import { MediaFilesUrl, MediaFilesFolder } from '/Data/config'
import Avatar from '@mui/material/Avatar';

import LibrarySubscriptions from './Comp/LibrarySubscriptions'

import UserAttendance from './Comp/UserAttendance'
import LoadingButton from '@mui/lab/LoadingButton';
import UserAddonSubscriptions from './Comp/UserAddonSubscriptions'
import UserCounter from './Comp/UserCounter'
import UserWallet from './Comp/UserWallet'
import UserOrders from './Comp/UserOrders'


import TitleNav from '../../../../src/components/Parts/TitleNav'

import { useRouter, useParams } from 'next/router'


export async function getServerSideProps(context) {

    const UserMobile = context.query.pageno[0];
    const UserID = context.query.pageno[1];
    return {
        props: { UserMobile, UserID },
    }

}

function DashboardCrypto({ UserMobile, UserID }) {
    const Contextdata = useContext(CheckloginContext)
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true);
    const [Btnloading, setBtnloading] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [TabIndex, setTabIndex] = useState(0);
    const [TotalDebit, setTotalDebit] = useState(0);
    const [TotalCredit, setTotalCredit] = useState(0);
    const [ProfileData, setProfileData] = useState({});






    const ChangeUserStatus = async () => {
        setBtnloading(true)
        const sendUM = {

            UserID: UserID,

        }
        const data = await fetch("/api/V3/Admin/Users/ChangeUserStatus", {
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
                    router.push(`/admin/users/profile/${UserMobile}/${UserID}`)
                } else {
                    alert('Something went wrong')
                }

            })
    }
    const ChangeTab = async (e) => {
        setTabIndex(e)
    }
    const GetUserData = async () => {
        const sendUM = {

            UserID: UserID,
            UserMobile: UserMobile,
        }
        const data = await fetch("/api/V3/Admin/Users/GetuserProfileData", {
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
                    setTotalDebit(parsed.ReqData.TotalDebit)
                    setTotalCredit(parsed.ReqData.TotalCredit)
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
                                            Wallet :  ₹ {TotalCredit}
                                        </span>
                                    </div>

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
                    <div>
                        {!isLoading ?
                            <div className={MYS.Counterbox}>
                                <UserCounter ProfileData={ProfileData} />
                            </div>
                            : <div>
                                <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={200} animation="wave" />

                            </div>


                        }

                    </div>

                </div>

                <div className={MYS.ProfileTabbox} >
                    <div className={MYS.ProfileTabboxHeader} >
                        <div className={TabIndex == 0 ? MYS.ProfileTabboxMenuItemActive : MYS.ProfileTabboxMenuItem}
                            onClick={() => ChangeTab(0)}
                        >
                            <span>Attendance</span>
                        </div>
                        <div className={TabIndex == 1 ? MYS.ProfileTabboxMenuItemActive : MYS.ProfileTabboxMenuItem}
                            onClick={() => ChangeTab(1)}
                        >
                            <span>Library Subscriptions</span>
                        </div>
                        <div className={TabIndex == 2 ? MYS.ProfileTabboxMenuItemActive : MYS.ProfileTabboxMenuItem}
                            onClick={() => ChangeTab(2)}
                        >
                            <span>Addons Subscriptions</span>
                        </div>
                        <div className={TabIndex == 3 ? MYS.ProfileTabboxMenuItemActive : MYS.ProfileTabboxMenuItem}
                            onClick={() => ChangeTab(3)}
                        >
                            <span>All Orders</span>
                        </div>
                        <div className={TabIndex == 4 ? MYS.ProfileTabboxMenuItemActive : MYS.ProfileTabboxMenuItem}
                            onClick={() => ChangeTab(4)}
                        >
                            <span>Wallet</span>
                        </div>
                    </div>


                    {TabIndex == 0 &&

                        <div className={MYS.TabContentbox} >

                            {!isLoading ?
                                <div>
                                    <UserAttendance ProfileData={ProfileData} />
                                </div>
                                : <div>
                                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={200} animation="wave" />

                                </div>


                            }

                        </div>
                    }
                    {TabIndex == 1 &&

                        <div className={MYS.TabContentbox} >

                            {!isLoading ?
                                <div>
                                    <LibrarySubscriptions ProfileData={ProfileData} />
                                </div>
                                : <div>
                                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={200} animation="wave" />

                                </div>


                            }

                        </div>
                    }
                    {TabIndex == 2 &&

                        <div className={MYS.TabContentbox} >
                            {!isLoading ?
                                <div>
                                    <UserAddonSubscriptions ProfileData={ProfileData} />
                                </div>
                                : <div>
                                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={200} animation="wave" />

                                </div>


                            }

                        </div>
                    }
                    {TabIndex == 3 &&

                        <div className={MYS.TabContentbox} >
                            {!isLoading ?
                                <div>
                                    <UserOrders ProfileData={ProfileData} />
                                </div>
                                : <div>
                                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={200} animation="wave" />

                                </div>


                            }

                        </div>
                    }
                    {TabIndex == 4 &&

                        <div className={MYS.TabContentbox} >
                            {!isLoading ?
                                <div>
                                    <UserWallet ProfileData={ProfileData} />
                                </div>
                                : <div>
                                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={200} animation="wave" />

                                </div>


                            }

                        </div>
                    }
                </div>

            </div>


        </>
    );
}

DashboardCrypto.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardCrypto;
