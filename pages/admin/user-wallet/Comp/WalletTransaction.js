import React, { useState, useEffect, useContext } from 'react';

import MYS from '/Styles/mystyle.module.css'

import { LuArrowRight } from "react-icons/lu";

import Badge from '@mui/material/Badge';
import UserWalletCounter from './UserWalletCounter'
import InfiniteScroll from 'react-infinite-scroll-component';
import CircularProgress from '@mui/material/CircularProgress';
import {
    Button,

    IconButton,

    styled,

    FormControl,

} from '@mui/material';
import Image from 'next/image'
import LoadingButton from '@mui/lab/LoadingButton';

import { useRouter, useParams } from 'next/router'
import { MediaFilesFolder, MediaFilesUrl } from '/Data/config'
const LibrarySubscriptions = () => {

    const router = useRouter()

    const [OpenEdit, setOpenEdit] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');

    const [ReqData, setReqData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [AllData, setAllData] = useState(0);
    const [limit, setlimit] = useState(10);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);


    const GetData = async () => {

        const sendUM = {

            page: page,
            limit: limit,

        };

        try {
            const response = await fetch("/api/V3/Admin/Wallet/WalletTransactionList", {
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
                if (parsed.ReqD.AllData) {
                    setAllData(parsed.ReqD.AllData)
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





    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: -3,
            top: 13,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
        },
    }));


    return (
        <div>
            <div className={MYS.MboxMain}>

                <div className={MYS.TopFlexbox}>
                    <div className={MYS.TopFlexboxA}>
                        <UserWalletCounter />
                    </div>
                    <div className={MYS.TopFlexboxB}>
                        <LoadingButton
                           
                            fullWidth
                            endIcon={<LuArrowRight />}
                            onClick={() => router.push('/admin/user-wallet/recharge')}
                            loading={false}
                            loadingPosition="end"
                            variant="contained"
                        >
                            <span>Recharge Wallet</span>
                        </LoadingButton>
                    </div>
                </div>


                <div style={{ height: '20px' }}></div>

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
                                        <span style={{ fontWeight: 500 }}> <span> {item.WData.isActive == true ? '+' : '-'}</span> ₹ {item.WData.amt}</span>

                                    </div>
                                    <div >
                                        <div className={MYS.Pmtag}>
                                            <span> {item.WData.isActive == true ? 'Credit' : 'Debit'}</span>
                                        </div>

                                    </div>

                                </div>

                                <div className={MYS.UserItemDescB}>
                                    <small>Name: {item.UData.name}</small>
                                    <small>Mobile : {item.UData.mobile} </small>

                                </div>


                                <div className={MYS.UserItemDescB}>
                                    <small>{item.WData.title}</small>
                                    <small>{item.WData.details}</small>

                                </div>
                                <div className={MYS.UserItemDescB}>
                                    <small>{item.WData.TrnsactionId}</small>
                                    <small>{item.WData.date}</small>
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
