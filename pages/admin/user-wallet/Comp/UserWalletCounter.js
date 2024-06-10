import React, { useState, useEffect, useContext } from 'react';
import MYS from '/Styles/mystyle.module.css'
import Skeleton from '@mui/material/Skeleton';


const UserCounter = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [WalletBalance, setWalletBalance] = useState(0);
    const [TotalTransactions, setTotalTransactions] = useState(0);
    const [Debit, setDebit] = useState(0);
    const [Credit, setCredit] = useState(0);
    const GetData = async () => {
        const sendUM = {
            mobile: 9661113102

        };

        try {
            const response = await fetch("/api/V3/Admin/Wallet/UserWalletCounter", {
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
             
                setWalletBalance(parsed.ReqD.WalletBalance)
                setTotalTransactions(parsed.ReqD.TotalTransactions)
                setDebit(parsed.ReqD.Debit)
                setCredit(parsed.ReqD.Credit)
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
                                <span>{WalletBalance}</span>
                            </div>
                            : <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={20} animation="wave" />
                        }
                    </div>
                    <div className={MYS.UserCounterItemB}>
                        <span>Amount in Wallet</span>
                    </div>
                </div>
                <div className={MYS.UserCounterItem}>
                    <div className={MYS.UserCounterItemA}>
                        {!isLoading ?
                            <div>
                                <span>{Credit}</span>
                            </div>
                            : <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={20} animation="wave" />
                        }
                    </div>
                    <div className={MYS.UserCounterItemB}>
                        <span>Total Credit</span>
                    </div>
                </div>
                <div className={MYS.UserCounterItem}>
                    <div className={MYS.UserCounterItemA}>
                        {!isLoading ?
                            <div>
                                <span>{Debit}</span>
                            </div>
                            : <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={20} animation="wave" />
                        }
                    </div>
                    <div className={MYS.UserCounterItemB}>
                        <span>Total Debit</span>
                    </div>
                </div>

                <div className={MYS.UserCounterItem}>
                    <div className={MYS.UserCounterItemA}>
                        {!isLoading ?
                            <span>{TotalTransactions}</span>
                            : <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={20} animation="wave" />
                        }
                    </div>
                    <div className={MYS.UserCounterItemB}>
                        <span>Transactions</span>
                    </div>
                </div>

            
            </div>
        </div>
    )
}

export default UserCounter
