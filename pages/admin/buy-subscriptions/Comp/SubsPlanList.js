import React, { useState, useEffect, useContext } from 'react';

import MYS from '/Styles/mystyle.module.css'


import Badge from '@mui/material/Badge';
import { MediaFilesFolder, MediaFilesUrl } from '/Data/config'
import InfiniteScroll from 'react-infinite-scroll-component';
import CircularProgress from '@mui/material/CircularProgress';

import Image from 'next/image'
import PlanCheckout from './PlanCheckout'

import LoadingButton from '@mui/lab/LoadingButton';
import { LuArrowRight } from "react-icons/lu";
import { useRouter, useParams } from 'next/router'
import {

    FormControl,
    TextField,
    useTheme,
    styled,
    IconButton

} from '@mui/material';

const LibrarySubscriptions = () => {
    const [ShowPg, setShowPg] = useState(false);
    const [SelectedPlanPg, setSelectedPlanPg] = useState(null);

    const router = useRouter()

    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';


    const [ReqData, setReqData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [AllData, setAllData] = useState(0);
    const [limit, setlimit] = useState(10);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const [SubType, setSubType] = useState('Monthly');


    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: -3,
            top: 13,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
        },
    }));


    const GetData = async () => {

        const sendUM = {

            page: page,
            limit: limit,

        };

        try {
            const response = await fetch("/api/V3/Admin/buy-subscription/SubsPlanList", {
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
    const ChangeSubType = (e) => {
        setSubType(e)
    };


    useEffect(() => {

        GetData()

    }, [])



    const ShowPgDiloag = async (Plan) => {
        setSelectedPlanPg(Plan);
        setShowPg(true)


    };


    return (
        <div>
            <div className={MYS.MboxMain} style={{ backgroundColor: 'white' }}>

                <div className={MYS.Planh}>
                    <div className={MYS.PlanhA}>
                        <h1>My Smart Library <span className={MYS.primaryColor}>Subscription Plan</span></h1>
                        <div style={{ height: '10px' }}></div>
                        <div className={MYS.PlanhAx}>
                            <span>Choose your success path with flexible pricing</span>
                        </div>

                    </div>
                    <div className={MYS.PlanhB}>
                        <div className={MYS.PTSelctbtnBox}>
                            <div className={SubType == 'Monthly' ? MYS.PTSelctbtnActive : MYS.PTSelctbtn} onClick={() => ChangeSubType('Monthly')}>
                                <span>Monthly</span>
                            </div>
                            <div className={SubType == 'Yearly' ? MYS.PTSelctbtnActive : MYS.PTSelctbtn} onClick={() => ChangeSubType('Yearly')}>
                                <span>Yearly</span>
                            </div>
                        </div>

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

                    <div className={MYS.PlanGrid}>
                        {ReqData.map((item, index) => {
                            return <div hover key={index} className={MYS.PlanItem}>

                                <div className={MYS.PlanTop}>
                                    <div className={MYS.PlanTopA}>
                                        <div className={MYS.PlanImg}>
                                            <Image
                                                src={`${MediaFilesUrl}${MediaFilesFolder}/${item.Image}`}
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
                                            <span>  {item.Tagline}</span>
                                        </div>
                                        <div className={MYS.PmtagCredit}>
                                            <span>{item.FreeCredits || 0}</span>
                                            <small>Free Credits</small>
                                        </div>
                                    </div>

                                </div>
                                <div className={MYS.PlanTitle}>
                                    <span>{item.Title}</span>
                                    <div>
                                        <small>{item.Details}</small>
                                    </div>


                                </div>

                                <div className={MYS.includedBox}>
                                    <div className={MYS.includedBoxTitle}>
                                        <span> What’s included:</span>
                                    </div>
                                    <div className={MYS.PlanInItem}>
                                        <div className={MYS.PlanInItemA}>
                                            <span>Total Branches</span>
                                        </div>
                                        <div className={MYS.PlanInItemB}>
                                            <span>{item.IncludedItems.Branches}</span>
                                        </div>
                                    </div>
                                    <div className={MYS.PlanInItem}>
                                        <div className={MYS.PlanInItemA}>
                                            <span>Total Seats</span>
                                        </div>
                                        <div className={MYS.PlanInItemB}>
                                            <span>{item.IncludedItems.Seats} /Branch</span>
                                        </div>
                                    </div>
                                    <div className={MYS.PlanInItem}>
                                        <div className={MYS.PlanInItemA}>
                                            <span>Users Account</span>
                                        </div>
                                        <div className={MYS.PlanInItemB}>
                                            <span>{item.IncludedItems.Users}</span>
                                        </div>
                                    </div>
                                    <div className={MYS.PlanInItem}>
                                        <div className={MYS.PlanInItemA}>
                                            <span>Staff Account</span>
                                        </div>
                                        <div className={MYS.PlanInItemB}>
                                            <span>{item.IncludedItems.Staffs}</span>
                                        </div>
                                    </div>
                                   
                                    <div className={MYS.PlanInItem}>
                                        <div className={MYS.PlanInItemA}>
                                            <span>Addon Products</span>
                                        </div>
                                        <div className={MYS.PlanInItemB}>
                                            <span>{item.IncludedItems.AddonsProducts}</span>
                                        </div>
                                    </div>
                                    <div className={MYS.PlanInItem}>
                                        <div className={MYS.PlanInItemA}>
                                            <span>Website</span>
                                        </div>
                                        <div className={MYS.PlanInItemB}>
                                            <span>{item.IncludedItems.Website}</span>
                                        </div>
                                    </div>
                                    <div className={MYS.PlanInItem}>
                                        <div className={MYS.PlanInItemA}>
                                            <span>MobileApp</span>
                                        </div>
                                        <div className={MYS.PlanInItemB}>
                                            <span>{item.IncludedItems.MobileApp}</span>
                                        </div>
                                    </div>
                                    <div className={MYS.PlanInItem}>
                                        <div className={MYS.PlanInItemA}>
                                            <span>Pwa Support</span>
                                        </div>
                                        <div className={MYS.PlanInItemB}>
                                            <span>{item.IncludedItems.Pwa}</span>
                                        </div>
                                    </div>
                                   

                                </div>




                                <div style={{ height: '10px' }}></div>
                                <div className={MYS.PMItemFotter}>
                                    <div className={MYS.PMItemFA}>

                                        {item.Trial == false ?
                                            <div className={MYS.Pricebox}>
                                                {SubType == 'Monthly' ?
                                                    <div>
                                                        <div>
                                                            <del>{item.MonthlyPrice.Mprice} </del> <span> ₹ {item.MonthlyPrice.Sprice} </span>
                                                        </div>
                                                        <div className={MYS.PriceboxText}>
                                                            <small>for {item.MonthlyPrice.Validity} Days</small>
                                                        </div>
                                                    </div> :
                                                    <div>
                                                        <div>
                                                            <del>{item.YearlyPrice.Mprice} </del> <span> ₹ {item.YearlyPrice.Sprice} </span>
                                                        </div>
                                                        <div className={MYS.PriceboxText}>
                                                            <small>for {item.YearlyPrice.Validity} Days</small>
                                                        </div>
                                                    </div>


                                                }

                                            </div> :
                                            <div className={MYS.Pricebox}>
                                                <div>
                                                    <span> Free </span>
                                                </div>
                                                <div className={MYS.PriceboxText}>
                                                    <small>for {item.MonthlyPrice.Validity} Days</small>
                                                </div>
                                            </div>

                                        }

                                    </div>
                                    <div className={MYS.PMItemFB}>
                                        <div className={MYS.Flexbtnbox}>
                                            <div style={{ minWidth: '10px' }}></div>


                                            {item.Trial == false ?
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <LoadingButton
                                                        onClick={() =>
                                                            ShowPgDiloag(item)
                                                        }
                                                        endIcon={<LuArrowRight />}
                                                        loading={false}
                                                        loadingPosition="end"
                                                        variant="contained"
                                                    >
                                                        <span>Buy Now</span>
                                                    </LoadingButton>
                                                </div> :
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <LoadingButton
                                                        onClick={() =>
                                                            ShowPgDiloag(item)
                                                        }
                                                        endIcon={<LuArrowRight />}
                                                        loading={false}
                                                        loadingPosition="end"
                                                        variant="contained"
                                                    >
                                                        <span>Try Now</span>
                                                    </LoadingButton>
                                                </div>

                                            }

                                        </div>
                                    </div>

                                </div>



                            </div>
                        }

                        )}
                    </div>
                </InfiniteScroll>

            </div>
            {ShowPg &&

                <div>
                    <PlanCheckout Plan={SelectedPlanPg} SubType={SubType} />
                </div>
            }


        </div>
    )
}

export default LibrarySubscriptions
