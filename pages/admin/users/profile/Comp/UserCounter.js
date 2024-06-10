import React, { useState, useEffect, useContext } from 'react';
import MYS from '/Styles/mystyle.module.css'
import Skeleton from '@mui/material/Skeleton';


const UserCounter = ({ ProfileData }) => {

    const [isLoading, setIsLoading] = useState(true);
    const [Attendance, setAttendance] = useState(0);
    const [Orders, setOrders] = useState(0);
    const [LibrarySub, setLibrarySub] = useState(0);
    const [AddonSub, setAddonSub] = useState(0);
    const [AbsentAtt, setAbsentAtt] = useState(0);
    const [PresentAtt, setPresentAtt] = useState(0);
    const GetData = async () => {
        const sendUM = {
            mobile: ProfileData.mobile

        };

        try {
            const response = await fetch("/api/V3/Admin/Users/UserCounter", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(sendUM)
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const parsed = await response.json();

            if (parsed) {
               if(parsed.ReqD){
             

                setAddonSub(parsed.ReqD.AddonSub)
                setAttendance(parsed.ReqD.Attendance)
                setLibrarySub(parsed.ReqD.LibrarySub)
                setOrders(parsed.ReqD.Orders)
                setAbsentAtt(parsed.ReqD.AbsentAtt)
                setPresentAtt(parsed.ReqD.PresentAtt)

                setIsLoading(false)

               }
               
            }


        } catch (error) {
            console.error('Error fetching data:', error);

        }
    };

    useEffect(() => {

        GetData()

    }, [])
    return (
        <div>
            <div className={MYS.UserCounterGrid}>
                <div className={MYS.UserCounterItem}>
                    <div className={MYS.UserCounterItemA}>
                        {!isLoading ?
                            <div>
                                <span>{Attendance}</span>
                            </div>
                            : <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={20} animation="wave" />
                        }
                    </div>
                    <div className={MYS.UserCounterItemB}>
                        <span>Total Attendance</span>
                    </div>
                </div>
                <div className={MYS.UserCounterItem}>
                    <div className={MYS.UserCounterItemA}>
                        {!isLoading ?
                            <div>
                                <span>{PresentAtt}</span>
                            </div>
                            : <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={20} animation="wave" />
                        }
                    </div>
                    <div className={MYS.UserCounterItemB}>
                        <span>Total Present</span>
                    </div>
                </div>
                <div className={MYS.UserCounterItem}>
                    <div className={MYS.UserCounterItemA}>
                        {!isLoading ?
                            <div>
                                <span>{AbsentAtt}</span>
                            </div>
                            : <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={20} animation="wave" />
                        }
                    </div>
                    <div className={MYS.UserCounterItemB}>
                        <span>Total Absent</span>
                    </div>
                </div>

                <div className={MYS.UserCounterItem}>
                    <div className={MYS.UserCounterItemA}>
                        {!isLoading ?
                            <span>{Orders}</span>
                            : <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={20} animation="wave" />
                        }
                    </div>
                    <div className={MYS.UserCounterItemB}>
                        <span>Orders</span>
                    </div>
                </div>

                <div className={MYS.UserCounterItem}>
                    <div className={MYS.UserCounterItemA}>
                        {!isLoading ?
                            <span>{LibrarySub}</span>
                            : <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={20} animation="wave" />
                        }
                    </div>
                    <div className={MYS.UserCounterItemB}>
                        <span>Active Subscription</span>
                    </div>
                </div>
                <div className={MYS.UserCounterItem}>
                    <div className={MYS.UserCounterItemA}>
                        {!isLoading ?
                            <span>{AddonSub}</span>
                            : <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={20} animation="wave" />
                        }
                    </div>
                    <div className={MYS.UserCounterItemB}>
                        <span>Active Addons</span>
                    </div>
                </div>
              

            </div>
        </div>
    )
}

export default UserCounter
