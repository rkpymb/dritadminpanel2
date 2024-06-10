import React, { useState, useEffect, useContext } from 'react';

import MYS from '/Styles/mystyle.module.css'

import Badge from '@mui/material/Badge';

import { FiEdit, FiTrash, FiEye } from "react-icons/fi";

import InfiniteScroll from 'react-infinite-scroll-component';
import CircularProgress from '@mui/material/CircularProgress';
import {


    IconButton,

    styled,


} from '@mui/material';

import { useRouter, useParams } from 'next/router'

const LibrarySubscriptions = ({ ProfileData }) => {

    const router = useRouter()

    const [ReqData, setReqData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [AllData, setAllData] = useState(0);
    const [limit, setlimit] = useState(10);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);

    const handleChangeTSStatus = (event) => {
        setIsActive(event.target.value);
        if (event.target.value === true) {
            setStatusText('Active')
        } else {
            setStatusText('Deactivated')
        }
    };





    const GetData = async () => {

        const sendUM = {

            page: page,
            limit: limit,
            mobile: ProfileData.mobile

        };

        try {
            const response = await fetch("/api/V3/Admin/Users/UserOrders", {
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
            <div className={MYS.BoxTitle}>Total Subscription ({AllData})</div>
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

                            <div className={MYS.itemOrderM}>
                                <span> {item.OrderTitle}</span>
                                <small>ORDER ID  : {item.Orderid}</small>
                                <small>Type : {item.ProductType}</small>
                            </div>
                            <div className={MYS.itemOrderBB}>
                                <span>Price : ₹ {item.mprice}</span>
                                <span>Discount : -₹ {item.TotalDiscount}</span>
                                <span style={{ fontWeight: 600 }}>Total : ₹ {item.amt}</span>
                            </div>


                            <div className={MYS.PMItemFotter}>
                                <div className={MYS.PMItemFABB}>
                                    <div className={MYS.Pmtag}>
                                        <span>{item.OrderStatusText}</span>
                                    </div>
                                    <div style={{ minWidth: '10px' }}></div>
                                    <div className={MYS.Pmtag}>
                                        <span>{item.PayStatusText}</span>
                                    </div>

                                </div>
                                <div className={MYS.PMItemFB}>

                                    <div className={MYS.Flexbtnbox}>

                                        <div style={{ minWidth: '10px' }}></div>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>

                                            <div style={{ width: '5px' }}></div>
                                            <IconButton aria-label="cart" onClick={() =>
                                                router.push(`/admin/orders/manage/${item._id}`)
                                            }>
                                                <StyledBadge color="secondary" >
                                                    <FiEye size={15} />
                                                </StyledBadge>
                                            </IconButton>
                                        </div>
                                    </div>
                                </div>

                            </div>


                        </div>
                    }

                    )}
                </div>
            </InfiniteScroll>


        </div>
    )
}

export default LibrarySubscriptions
