import React, { useState, useEffect, useContext } from 'react';

import MYS from '/Styles/mystyle.module.css'

import Badge from '@mui/material/Badge';
import { MediaFilesFolder, MediaFilesUrl } from '/Data/config'
import Image from 'next/image'
import InfiniteScroll from 'react-infinite-scroll-component';
import CircularProgress from '@mui/material/CircularProgress';
import {
    styled,
} from '@mui/material';

import LoadingButton from '@mui/lab/LoadingButton';
import { LuArrowRight } from "react-icons/lu";
import { useRouter, useParams } from 'next/router'

const LibrarySubscriptions = () => {
    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';
    const router = useRouter()



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
            const response = await fetch("/api/V3/Admin/my-subscription/mysubscriptionlist", {
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





    return (
        <div>
            <div className={MYS.MboxMain}>
                {!isLoading &&
                    <div>
                        {AllData == 0 ?

                            <div className={MYS.WaringBox}>
                                <div className={MYS.WaringBoxA}>
                                    You Don't Have Any Active Subscription Plan yet, please subscribe to a Plan to Avoid Data deletation.
                                    <div>
                                        <small>Data Will be Deleted After 10 Days of Last Plan Expiry. </small>
                                    </div>
                                </div>
                                <div className={MYS.WaringBoxB}>
                                    <LoadingButton
                                        size="small"
                                        fullWidth
                                        endIcon={<LuArrowRight />}
                                        onClick={() => router.push('/admin/buy-subscriptions')}
                                        loading={false}
                                        loadingPosition="end"
                                        variant="contained"
                                    >
                                        <span>Buy Plan</span>
                                    </LoadingButton>
                                </div>
                            </div> :
                            <div className={MYS.WaringBox}>
                                <div className={MYS.WaringBoxA}>
                                    Want to Buy more Subscription ?
                                    <div>
                                        <small>Get Best Offer Today </small>
                                    </div>
                                </div>
                                <div className={MYS.WaringBoxB}>
                                    <LoadingButton
                                        size="small"
                                        fullWidth
                                        endIcon={<LuArrowRight />}
                                        onClick={() => router.push('/admin/buy-subscriptions')}
                                        loading={false}
                                        loadingPosition="end"
                                        variant="contained"
                                    >
                                        <span>Buy Plan</span>
                                    </LoadingButton>
                                </div>
                            </div>
                        }

                    </div>

                }


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
                            return <div hover key={index} className={MYS.PlanItem}>

                                <div className={MYS.PlanTop}>
                                    <div className={MYS.PlanTopA}>
                                        <div className={MYS.PlanImg}>
                                            <Image
                                                src={`${MediaFilesUrl}${MediaFilesFolder}/${item.PlanData.Image}`}
                                                alt="image"
                                                layout="responsive"
                                                placeholder='blur'
                                                width={30}
                                                height={30}
                                                quality={100}
                                                blurDataURL={blurredImageData}

                                            />
                                        </div>
                                    </div>
                                    <div className={MYS.PlanTopB}>
                                        <div className={MYS.Pmtag}>
                                            <span>  {item.StatusText}</span>
                                        </div>
                                    </div>

                                </div>
                                <div className={MYS.UserItemTitle}>
                                    <span>{item.title}</span>
                                    <div style={{ height: '5px' }}></div>
                                    <small>Order ID : {item.Orderid}</small>


                                </div>
                                <div className={MYS.UserItemDescB}>
                                    <small>Plan ID : {item.PlanID}</small>

                                </div>
                                <div className={MYS.UserItemDescB}>
                                    <small>Validity : {item.validityStartDate} - {item.validityEndDate} </small>

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
