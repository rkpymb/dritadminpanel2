import React, { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import CheckloginContext from '../../../context/auth/CheckloginContext'
import SidebarLayout from 'src/layouts/SidebarLayout';
import MYS from '../../../Styles/mystyle.module.css'

import Skeleton from '@mui/material/Skeleton';

import Badge from '@mui/material/Badge';


import TitleNav from '../../../src/components/Parts/TitleNav'
import GmailSmtp from './Comp/GmailSmtp'
import AttendanceSettings from './Comp/AttendanceSettings'
import PwaSetting from './Comp/PwaSetting'


import {

    IconButton,
    styled
} from '@mui/material';


import { useRouter, useParams } from 'next/router'

function DashboardCrypto() {
    const router = useRouter()
    const Contextdata = useContext(CheckloginContext)
    const [Settings, setSettings] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [AllData, setAllData] = useState(0);
    const [limit, setlimit] = useState(10);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);

    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';

    const GetData = async () => {

        const sendUM = {

        };

        try {
            const response = await fetch("/api/V3/Admin/Settings/CheckSettings", {
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
                if (parsed.ReqD.done) {
                    setIsLoading(false)
                    setSettings(parsed.ReqD.Settings)


                }

            }

        } catch (error) {
            console.error('Error fetching data:', error);

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
            <TitleNav Title={`Settigns`} />

            <div className={MYS.MboxMain}>
                {isLoading ?
                    <div>
                        <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={'100%'} />
                        <div style={{ height: '10px' }}></div>
                        <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={'50%'} />
                    </div> :
                    <div>
                        <GmailSmtp SData={Settings}/>
                        <div style={{ height: '20px' }}></div>
                        <AttendanceSettings SData={Settings}/>
                        <div style={{ height: '20px' }}></div>
                        <PwaSetting SData={Settings}/>
                    </div>


                }



            </div>

        </>
    );
}

DashboardCrypto.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardCrypto;
