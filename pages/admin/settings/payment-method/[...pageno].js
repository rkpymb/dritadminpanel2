import React, { useState, useEffect, useContext } from 'react';

import CheckloginContext from '/context/auth/CheckloginContext'
import Head from 'next/head';

import SidebarLayout from 'src/layouts/SidebarLayout';
import MYS from '/Styles/mystyle.module.css'


import { MediaFilesUrl, MediaFilesFolder } from '/Data/config'
import Button from '@mui/material/Button';

import UpiConnector from './Comp/UpiConnector'

import LoadingButton from '@mui/lab/LoadingButton';
import { LuArrowLeft, LuChevronRight } from "react-icons/lu";
import Badge from '@mui/material/Badge';
import { BsArrowRightShort } from "react-icons/bs";

import {

    IconButton,

    styled
} from '@mui/material';
import Image from 'next/image'
import { useRouter, useParams } from 'next/router'

export async function getServerSideProps(context) {
    const PMModeID = context.query.pageno[0];
    const PMTitle = context.query.pageno[1];
    return {
        props: { PMModeID, PMTitle },
    }

}

function DashboardCrypto({ PMModeID, PMTitle }) {
    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';
    const Contextdata = useContext(CheckloginContext)
    const router = useRouter()
    const [PaymentMethods, setPaymentMethods] = useState({});
    const [LoadingActive, setLoadingActive] = useState(false);
    const [IsActive, setIsActive] = useState(false);
    const [Loading, setLoading] = useState(true);
    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: -3,
            top: 13,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
        },
    }));


    const GetData = async () => {

        const sendUM = { PMModeID: PMModeID }
        const data = await fetch("/api/V3/Admin/PMbyPMModeID", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => {
            return a.json();
        })
            .then((parsed) => {
                if (parsed.ReqData) {
                    if (parsed.ReqData.PaymentMethods !== null) {
                        setPaymentMethods(parsed.ReqData.PaymentMethods);
                        console.log(parsed.ReqData.PaymentMethods)
                        if (parsed.ReqData.isActive === true) {
                            setIsActive(true);
                        }
                        setLoading(false)
                    }



                }

            })
    }

    const ActivePM = async () => {

        setLoadingActive(true)
        const sendUM = { PMModeID: PMModeID }
        const data = await fetch("/api/V3/Admin/ActivatePM", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => {
            return a.json();
        })
            .then((parsed) => {
                if (parsed.ReqData) {

                    if (parsed.ReqData.error) {
                        alert(parsed.ReqData.error)
                    }
                    if (parsed.ReqData.done) {
                        alert(`${PMTitle} Activated Successfully`)
                        router.push(`/admin/settings/payment-method/${PMModeID}/${PMTitle}`)
                    }
                    setLoadingActive(false)
                }

            })
    }


    useEffect(() => {
        GetData()
    }, [router.query]);

    return (
        <>
            <Head>
                <title>{PMModeID && PMTitle}Payment Methods</title>
            </Head>
            <div className={MYS.marginTopMain}>
                <div className={MYS.TitleWithBackHeader}>
                    <div className={MYS.TitleWithBackHeaderA}>
                        <IconButton aria-label="cart" onClick={() => router.back()}>
                            <StyledBadge color="secondary" >
                                <LuArrowLeft />
                            </StyledBadge>
                        </IconButton>
                        <div>
                            {IsActive ? <span>{PMTitle} / Settings</span> :
                                <span>{PMTitle}</span>
                            }
                        </div>
                    </div>
                </div>
                <div className={MYS.stickyContainerBox} >
                    <div className={MYS.stickyContainer}>
                        {Loading ?
                            <div></div> :
                            <div>
                                {IsActive ?
                                    <div>
                                        <div>
                                            {PMModeID == 'PM_1' &&
                                                <div>
                                                    <UpiConnector PmData={PaymentMethods} />
                                                </div>
                                            }
                                        </div>
                                    </div> :
                                    <div className={MYS.Activatebox}>
                                        <div className={MYS.PMItem} >
                                            <div className={MYS.PMItemA}>
                                                <div className={MYS.PMItemAImg}>
                                                    <Image
                                                        src={`${MediaFilesUrl}${MediaFilesFolder}/${PaymentMethods.Logo}`}
                                                        alt="image"
                                                        layout="responsive"
                                                        placeholder='blur'
                                                        width={50}
                                                        height={50}
                                                        quality={100}
                                                        blurDataURL={blurredImageData}
                                                        objectFit='center'


                                                    />

                                                </div>
                                                <div className={MYS.PMTypeText}>

                                                    <span>  {PaymentMethods.PMTitle}</span>
                                                    <div style={{ height: '5px' }}></div>
                                                    <small style={{ fontWeight: 'bold', color: 'blue' }}>  {PaymentMethods.PMType}</small>
                                                    <div style={{ height: '2px' }}></div>

                                                    <div className={MYS.Activatebtn}>
                                                        <small> You need to Activate and Setup this Payment Method</small>
                                                        <div style={{ height: '10px' }}></div>


                                                        <LoadingButton
                                                            size='small'
                                                            onClick={ActivePM}
                                                            endIcon={<LuChevronRight />}
                                                            loading={LoadingActive}
                                                            loadingPosition="end"
                                                            disabled={LoadingActive}
                                                            variant="contained"

                                                        >
                                                            <span>Activate</span>
                                                        </LoadingButton>
                                                    </div>


                                                </div>




                                            </div>

                                        </div>
                                    </div>

                                }

                            </div>


                        }





                    </div>
                </div>
            </div>


        </>
    );
}

DashboardCrypto.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardCrypto;


