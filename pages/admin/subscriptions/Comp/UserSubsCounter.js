import React, { useState, useEffect, useContext } from 'react';
import MYS from '/Styles/mystyle.module.css'
import Skeleton from '@mui/material/Skeleton';


const UserSubsCounter = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [ActiveSubscription, setActiveSubscription] = useState(0);
    const [ExpSubscription, setExpSubscription] = useState(0);
    
    const GetData = async () => {
        const sendUM = {
            mobile: 9661113102

        };

        try {
            const response = await fetch("/api/V3/Admin/LBSubscriptions/UserSubsCounter", {
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
             
                setActiveSubscription(parsed.ReqD.ActiveSubscription)
                setExpSubscription(parsed.ReqD.ExpSubscription)
                
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
                                <span>{ActiveSubscription}</span>
                            </div>
                            : <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={20} animation="wave" />
                        }
                    </div>
                    <div className={MYS.UserCounterItemB}>
                        <span>Active</span>
                    </div>
                </div>
        

                <div className={MYS.UserCounterItem}>
                    <div className={MYS.UserCounterItemA}>
                        {!isLoading ?
                            <span>{ExpSubscription}</span>
                            : <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={20} animation="wave" />
                        }
                    </div>
                    <div className={MYS.UserCounterItemB}>
                        <span>Expired</span>
                    </div>
                </div>

                <div className={MYS.UserCounterItem}>
                    <div className={MYS.UserCounterItemA}>
                        {!isLoading ?
                            <div>
                                <span>{ActiveSubscription + ExpSubscription}</span>
                            </div>
                            : <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={20} animation="wave" />
                        }
                    </div>
                    <div className={MYS.UserCounterItemB}>
                        <span>Total</span>
                    </div>
                </div>

            
            </div>
        </div>
    )
}

export default UserSubsCounter
