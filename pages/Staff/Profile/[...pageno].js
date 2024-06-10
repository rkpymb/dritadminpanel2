import { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import SidebarLayout from 'src/layouts/SidebarLayout';
import MYS from '../../../Styles/mystyle.module.css'
import { Container, Grid } from '@mui/material';
import Footer from 'src/components/Footer';
import CheckloginContext from '../../../context/auth/CheckloginContext'
import { LuArrowLeft } from "react-icons/lu";
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';

import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useRouter, useParams } from 'next/router'
import {
    Card,
    IconButton,
    Typography,
    styled
} from '@mui/material';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';


export async function getServerSideProps(context) {
    const DataSlug = context.query.pageno[0];
    return {
        props: { DataSlug },
    }

}
const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));

function DashboardCrypto({DataSlug}) {
    const router = useRouter()
    const Contextdata = useContext(CheckloginContext)
    const [Loading, setLoading] = useState(true);
    const [UserData, setUserData] = useState();
    const [value, setValue] = useState(2);
    useEffect(() => {
        if (Contextdata.IsLogin == true) {
           
            GetUSerDatabyid()
            
        } else {
            router.push('/')

        }
    },[]);


  

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const GetUSerDatabyid = async (e) => {
        const sendUM = { userid: DataSlug, JwtToken: Contextdata.JwtToken}
        const data = await fetch("/api/V3/User/UserByid", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => {
            return a.json();
        })
            .then((parsed) => {
                setUserData(parsed.ReqData.UserData[0]);
             
                setLoading(false)
            })
    }
    return (
        <>
            <Head>
                <title>User's Profile {DataSlug}</title>
            </Head>

            <Container className={MYS.min100vh}>
                {!Loading &&
                    <div>
                        <div className={MYS.TitleWithBackHeader}>
                            <div className={MYS.TitleWithBackHeaderA}>
                                <IconButton aria-label="cart" onClick={() => router.back()}>
                                    <StyledBadge color="secondary" >
                                        <LuArrowLeft />
                                    </StyledBadge>
                                </IconButton>
                                <div>
                                    <span>{UserData.name}'s profile</span>
                                </div>
                            </div>
                            <div>

                            </div>
                        </div>
                        <Card>
                            <div className={MYS.UserProfileBoxTop}>
                                <div className={MYS.UserProfileBoxTopA}>
                                    <Avatar alt={UserData.name} src="/static/images/avatar/1.jpg" sx={{ width: 56, height: 56 }} />
                                </div>
                                <div className={MYS.UserProfileBoxTopB}>
                                  
                                    <div className={MYS.UserProfileBoxTopBName}>
                                        <span>{UserData.name}</span>
                                    </div>
                                    <div>
                                        <span>{UserData.mobile}</span>
                                    </div>
                                    <div>
                                        <small>{UserData.email}</small>
                                    </div>
                                </div>
                           </div>
                        </Card>
                       <div style={{minHeight:'20px'}}></div>
                        <Card >
                            <div style={{padding:'20px'}}>
                                <Box sx={{ width: '100%', typography: 'body1' }}>
                                    <TabContext value={value}>
                                        <Box sx={{ borderBottom: 1, borderColor: 'divider' ,padding:1}}>
                                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                                <Tab label="Test Series" value="1" />
                                                <Tab label="Test Attempts" value="2" />
                                                <Tab label="Orders" value="3" />
                                            </TabList>
                                        </Box>
                                        <TabPanel value="1">Item One</TabPanel>
                                        <TabPanel value="2">Item Two</TabPanel>
                                        <TabPanel value="3">Orders</TabPanel>
                                    </TabContext>
                                </Box>
                           </div>
                        </Card>
                    </div>
                }
            </Container>

            <Footer />
        </>
    );
}

DashboardCrypto.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardCrypto;
