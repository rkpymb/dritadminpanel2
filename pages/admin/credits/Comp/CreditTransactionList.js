import React, { useState, useEffect, useContext } from 'react';

import MYS from '/Styles/mystyle.module.css'

import Badge from '@mui/material/Badge';

import { LuChevronRight } from "react-icons/lu";


import InfiniteScroll from 'react-infinite-scroll-component';
import CircularProgress from '@mui/material/CircularProgress';
import {
   

    styled,


} from '@mui/material';

import LoadingButton from '@mui/lab/LoadingButton';

import { useRouter, useParams } from 'next/router'

const LibrarySubscriptions = () => {

    const router = useRouter()

    const [ReqData, setReqData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [Balance, setBalance] = useState(0);
    const [limit, setlimit] = useState(10);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);


    const GetData = async () => {

        const sendUM = {

            page: page,
            limit: limit,

        };

        try {
            const response = await fetch("/api/V3/Admin/Credit/CreditTransactionList", {
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

            if (parsed.ReqD) {
                if (parsed.ReqD.Balance) {
                    setBalance(parsed.ReqD.Balance)
                }

                if (parsed.ReqD.DataList.length === 0) {
                    setHasMore(false);
                    setIsLoading(false);

                } else {

                    if (page === 1) {
                        setReqData([])
                    }



                    setReqData(prevData => [...prevData, ...parsed.ReqD.DataList]);
                    setPage(page + 1)

                    if (parsed.ReqD.DataList.length < limit) {
                        setHasMore(false);

                    }
                    setIsLoading(false);
                }


            } else {
                setHasMore(false);
            }


        } catch (error) {
            console.error('Error fetching data:', error);

        }
    };

    const loadMoreData = () => {
        if (!isLoading) {
            setIsLoading(true);
            setTimeout(function () {
                GetData();
            }, 1000);

        }
    };


    useEffect(() => {

        GetData()

    }, [])





    return (
        <div>
            <div className={MYS.MboxMain}>
                <div className={MYS.BtnboxPage}>
                    <div className={MYS.BtnboxPageA}>
                        Credits Balance :  ₹ {Balance}
                    </div>
                    <div className={MYS.BtnboxPageB}>
                        <LoadingButton
                            endIcon={<LuChevronRight />}
                            loading={false}
                            loadingPosition="end"
                            variant="contained"
                            size='small'
                            onClick={() => router.push('/admin/recharge')}
                        >
                            <span>Add Credit</span>
                        </LoadingButton>
                    </div>
                </div>


                <InfiniteScroll
                    dataLength={ReqData.length}
                    next={loadMoreData}
                    hasMore={hasMore}
                    scrollThreshold={0.2}
                    loader={<div style={{ textAlign: 'center', margin: 'auto', marginTop: '20px' }} >
                        <CircularProgress size={25} color="success" />
                    </div>}
                    endMessage={
                        <div style={{ textAlign: 'center', margin: 'auto', marginTop: '20px' }} >
                            <b>Yay! You have seen it all 🎉</b>
                        </div>
                    }
                >

                    <div className={MYS.UserGrid}>
                        {ReqData.map((item, index) => {
                            return <div hover key={index} className={MYS.UserItemMain}>

                                <div className={MYS.WalletItemtop}>
                                    <div className={MYS.UserItemDescB}>
                                        <span style={{ fontWeight: 500 }}> <span> {item.isActive == true ? '+' : '-'}</span> ₹ {item.amt}</span>

                                    </div>
                                    <div >
                                        <div className={MYS.Pmtag}>
                                            <span> {item.isActive == true ? 'Credit' : 'Debit'}</span>
                                        </div>

                                    </div>

                                </div>

                                {/* <div className={MYS.UserItemDescB}>
                                    <small>Name: {item.UData.name}</small>
                                    <small>Mobile : {item.UData.mobile} </small>

                                </div> */}


                                <div className={MYS.UserItemDescB}>
                                    <small>{item.title}</small>
                                    <small>{item.details}</small>

                                </div>
                                <div className={MYS.UserItemDescB}>
                                    <small>{item.TrnsactionId}</small>
                                    <small>{item.date}</small>
                                </div>


                            </div>
                        }

                        )}
                    </div>
                </InfiniteScroll>

            </div>



        </div>
    )
}

export default LibrarySubscriptions
