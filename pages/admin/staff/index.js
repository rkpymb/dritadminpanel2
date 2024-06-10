import React, { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import CheckloginContext from '../../../context/auth/CheckloginContext'
import SidebarLayout from 'src/layouts/SidebarLayout';
import MYS from '../../../Styles/mystyle.module.css'

import Skeleton from '@mui/material/Skeleton';
import AddStaff from '../../components/Admin/Add/AddStaff'
import { LuArrowRight } from "react-icons/lu";
import Badge from '@mui/material/Badge';
import { LuArrowLeft } from "react-icons/lu";

import TitleNav from '../../../src/components/Parts/TitleNav'

import InfiniteScroll from 'react-infinite-scroll-component';
import CircularProgress from '@mui/material/CircularProgress';
import {

    IconButton,
    styled
} from '@mui/material';
import Image from 'next/image'
import LoadingButton from '@mui/lab/LoadingButton';

import { useRouter, useParams } from 'next/router'
import { MediaFilesFolder, MediaFilesUrl } from '/Data/config'
function DashboardCrypto() {
    const router = useRouter()
    const Contextdata = useContext(CheckloginContext)
    const [ReqData, setReqData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [AllData, setAllData] = useState(0);
    const [limit, setlimit] = useState(10);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);

    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';

    const GetData = async () => {

        const sendUM = {

            page: page,
            limit: limit,

        };

        try {
            const response = await fetch("/api/V3/Admin/Staff/StaffList", {
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

    }, [router.query])


    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: -3,
            top: 13,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
        },
    }));





    return (
        <>
            <TitleNav Title={`Staff`} />
          
            <div className={MYS.MboxMain}>
            <div className={MYS.BtnboxPage}>
                <div className={MYS.BtnboxPageA}>
                    Total Staff : {AllData}
                </div>
                <div className={MYS.BtnboxPageB}>
                    <AddStaff />

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
                        {ReqData.map((item) => {
                            return <div hover key={item._id} className={MYS.UserItemMain} onClick={() => router.push(`/admin/staff/profile/${item.Userid}`)}>

                                <div className={MYS.UserItemTop}>
                                    <div className={MYS.UserItemTopA}>
                                        <div className={MYS.USerDP}>
                                            <Image
                                                src={`${MediaFilesUrl}${MediaFilesFolder}/${item.dp}`}
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
                                    <div className={MYS.UserItemTopB}>
                                        <div className={MYS.UserItemTitle}>
                                            <span>{item.name}</span>
                                            <small>@{item.Userid}</small>
                                        </div>
                                        <div className={MYS.UserItemDesc}>

                                            <small>{item.mobile}</small>
                                            <small>{item.email}</small>
                                        </div>

                                    </div>
                                </div>

                                <div className={MYS.PMItemFotter}>
                                    <div className={MYS.PMItemFA}>
                                        <div className={MYS.Pmtag}>
                                            {item.isActive ? <span>Active</span> : <span>Not Active</span>}


                                        </div>

                                    </div>
                                    <div className={MYS.PMItemFB}>

                                        <LoadingButton size='small' variant="outlined" endIcon={<LuArrowRight />}>
                                            View Profile
                                        </LoadingButton>
                                    </div>

                                </div>


                            </div>
                        }

                        )}
                    </div>
                </InfiniteScroll>


            </div>

        </>
    );
}

DashboardCrypto.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardCrypto;
