import React, { useState, useEffect, useContext } from 'react';

import MYS from '/Styles/mystyle.module.css'

import { useRouter, useParams } from 'next/router'


const OrderInvoice = ({ OrderData }) => {
    const router = useRouter()

    useEffect(() => {
     


    }, []);


    return (
        <div>
            <div className={MYS.OrderData}>
                <div className={MYS.InvBoxHeader}>
                    <div className={MYS.InvBoxHeaderA}>
                        <div className={MYS.OrderID}>
                            <span>{OrderData && OrderData.Orderid}</span>
                        </div>
                        <div className={MYS.OrderTitle}>
                            <span>{OrderData && OrderData.OrderTitle}</span>
                        </div>

                    </div>
                    <div className={MYS.InvBoxHeaderB}>
                        <div className={MYS.Statustag}>
                            <span>{OrderData && OrderData.OrderStatusText}</span>
                        </div>
                        <div className={MYS.OrderDate}>
                            <span>Date : {OrderData && OrderData.date}, {OrderData && OrderData.time}</span>
                        </div>



                    </div>
                </div>
                <div style={{ height: '20px' }}></div>
                <div className={MYS.InvBox}>



                    <div className={MYS.InvBoxItem}>
                        <div className={MYS.InvBoxItemA}>
                            <span>Order Amount</span>
                        </div>
                        <div className={MYS.InvBoxItemB}>
                            ₹ {OrderData && OrderData.rechargeAmount}

                        </div>

                    </div>
                    <div className={MYS.InvBoxItem}>
                        <div className={MYS.InvBoxItemA}>
                            <span>GST (18.00%)</span>
                        </div>
                        <div className={MYS.InvBoxItemB}>
                             ₹ {OrderData && OrderData.TaxData.TaxAmt}

                        </div>

                    </div>
                    <div className={MYS.InvBoxItem}>
                        <div className={MYS.InvBoxItemA}>
                            <span>Total</span>
                        </div>
                        <div className={MYS.InvBoxItemB} style={{ fontWeight:700 }} >
                            ₹ {OrderData && OrderData.amt}  {OrderData && OrderData.PayStatus === true ?
                                <span style={{ fontSize: '13px'}}>Paid </span> :
                                <span style={{ fontSize: '13px' }}  >Dues</span>

                            }


                        </div>

                    </div>


                </div>
                <div className={MYS.InvBoxMsg}>
                    {OrderData && OrderData.PayStatus === true ?
                        <span>₹ {OrderData && OrderData.CreditValue} Credited Succesfully 🎉</span> :
                        <span >Order Current Status : <span style={{ color: 'red' }}>{OrderData && OrderData.OrderStatusText}</span></span>

                    }


                </div>

            </div>
        </div>
    )
}

export default OrderInvoice
