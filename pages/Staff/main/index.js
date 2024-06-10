import React, { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import CheckloginContext from '../../../context/auth/CheckloginContext'
import SidebarLayout from 'src/layouts/SidebarLayout';
import MYS from '../../../Styles/mystyle.module.css'

import Fade from '@mui/material/Fade';
import Link from 'next/link';
import Skeleton from '@mui/material/Skeleton';
import AddEducator from '../../components/Add/AddEducator'
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import { LuArrowLeft } from "react-icons/lu";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import {
    Table,
    Button,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableContainer,
    Typography,
    IconButton,
    styled
} from '@mui/material';

import { FiFilter } from 'react-icons/fi';
import { useRouter, useParams } from 'next/router'
function DashboardCrypto() {
    const router = useRouter()
    const Contextdata = useContext(CheckloginContext)
    const [FilterText, setFilterText] = useState('All');


    const [anchorEl, setAnchorEl] = React.useState(null);


    const [Retdata, setRetdata] = useState([]);
    const [initialData, setInitialData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    const [searchQuery, setSearchQuery] = useState('');



    const GetData = async () => {
        const sendUM = { JwtToken: Contextdata.JwtToken }
        const data = await fetch("/api/V3/List/EducatorList", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => {
            return a.json();
        })
            .then((parsed) => {
                if (parsed.ReqD.UL) {
                    setRetdata(parsed.ReqD.UL)
                    setInitialData(parsed.ReqD.UL)
                    setIsLoading(false)
                }

            })

    }

    useEffect(() => {

        GetData()

    }, [router.query])

    const Dummydta = [
        {
            id: 1
        },
        {
            id: 2
        }
        ,
        {
            id: 3
        }
        ,
        {
            id: 4
        }
        ,
        {
            id: 5
        },
        {
            id: 4
        }
        ,
        {
            id: 5
        }
    ]

    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: -3,
            top: 13,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
        },
    }));

    const ShortbyActive = () => {
        const filteredData = initialData.filter(user => user.isActive);
        setRetdata(filteredData);
        setAnchorEl(null);
        setFilterText('Active users')
    };

    // Function to sort products by price from high to low
    const ShortbyNotActive = () => {
        const filteredData = initialData.filter(user => !user.isActive);
        setRetdata(filteredData);
        setAnchorEl(null);
        setFilterText('Not Active users')
    };

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        const filteredData = initialData.filter(user => (
            user.name.toLowerCase().includes(query) ||
            user.email.toLowerCase().includes(query) ||
            user.mobile.toString().includes(query)
        ));

        setRetdata(filteredData);
    };
    return (
        <>
            <Head>
                <title>Educators</title>
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
                            {!isLoading ?
                                <div>
                                    <span>All Educators : <span>{FilterText}</span> ({Retdata.length})</span>
                                </div>
                                : <div>
                                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={200} animation="wave" />

                                </div>


                            }
                        </div>
                    </div>
                    <div className={MYS.TitleWithBackHeaderB}>
                        {!isLoading ?
                            <div className={MYS.Topbtnbox}>
                                <div style={{ minWidth: '10px' }}></div>
                                <div className={MYS.TopbtnboxSearch}>

                                    <TextField
                                        label="Search by Name, Email, Mobile"

                                        defaultValue="Small"
                                        size="small"
                                        id="search"
                                        value={searchQuery}
                                        onChange={handleSearch}
                                    />
                                </div>

                                <div className={MYS.Topbtnboxbtn}>
                                    {/* <Button variant="contained" endIcon={<FiFilter />}
                                        id="fade-button"
                                        size="small"
                                        aria-controls={open ? 'fade-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                        onClick={handleClick}
                                    >
                                        Add Educator
                                    </Button> */}
                                    <AddEducator/>
                                </div>

                                <div className={MYS.Topbtnboxbtn}>
                                    <Button variant="contained" endIcon={<FiFilter />}
                                        id="fade-button"
                                        size="small"
                                        aria-controls={open ? 'fade-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                        onClick={handleClick}
                                    >
                                        Filter
                                    </Button>
                                </div>
                                <Menu
                                    id="fade-menu"
                                    MenuListProps={{
                                        'aria-labelledby': 'fade-button',
                                    }}
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    TransitionComponent={Fade}
                                >
                                    <MenuItem onClick={ShortbyActive}>
                                        <small>Active Profile</small>
                                    </MenuItem>
                                    <MenuItem onClick={ShortbyNotActive}>
                                        <small>Deactivated Profile</small>
                                    </MenuItem>

                                </Menu>



                            </div>
                            : <div>
                                <Skeleton variant="text" sx={{ fontSize: '3rem' }} width={100} animation="wave" />

                            </div>


                        }

                    </div>

                </div>
                <div>
                    <div className={MYS.stickytableBox} >
                        <TableContainer className={MYS.stickytable}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Contact</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHead>


                                {!isLoading ?
                                    <TableBody>
                                        {Retdata.map((item) => {
                                            return <TableRow hover key={item._id}>
                                                <TableCell>
                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                        <div style={{ maxWidth: '50px' }}>
                                                            <Avatar alt={item.name} src="/static/images/avatar/1.jpg" />

                                                        </div>
                                                        <div style={{ marginLeft: '5px', maxWidth: '120px' }}>
                                                            <Typography
                                                                variant="body1"
                                                                fontWeight="bold"
                                                                color="text.primary"
                                                                gutterBottom
                                                                noWrap
                                                            >
                                                                {item.name}
                                                            </Typography>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography
                                                        variant="body1"
                                                        fontWeight="bold"
                                                        color="text.primary"
                                                        gutterBottom
                                                        noWrap
                                                    >
                                                        {item.email}
                                                    </Typography>
                                                    <Typography
                                                        variant="body1"
                                                        fontWeight="bold"
                                                        color="text.primary"
                                                        gutterBottom
                                                        noWrap
                                                    >
                                                        {item.mobile}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    { //Check if message failed
                                                        (item.isActive)
                                                            ? <div> Active </div>
                                                            : <div> Deactivated </div>
                                                    }


                                                </TableCell>
                                                <TableCell>
                                                    <Typography
                                                        variant="body1"

                                                        color="text.primary"
                                                        gutterBottom
                                                        noWrap
                                                    >
                                                        {item.date}, {item.time}
                                                    </Typography>

                                                </TableCell>
                                                <TableCell>
                                                    <div className={MYS.Acbtn}>
                                                        <Link href={`/Users/Profile/${item._id}`} >
                                                            <Button

                                                                size='small'
                                                                variant='outlined'
                                                                color='primary'
                                                            >
                                                                View Profile
                                                            </Button>
                                                        </Link>

                                                    </div>

                                                </TableCell>


                                            </TableRow>
                                        }

                                        )}
                                    </TableBody>
                                    : <TableBody>
                                        {Dummydta.map((item, index) => {
                                            return <TableRow hover key={index}>
                                                <TableCell>
                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                        <div style={{ maxWidth: '50px' }}>
                                                            <Skeleton variant="circular">
                                                                <Avatar />
                                                            </Skeleton>

                                                        </div>
                                                        <div style={{ marginLeft: '5px', maxWidth: '120px' }}>
                                                            <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={100} animation="wave" />
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Skeleton variant="text" sx={{ fontSize: '0.5rem' }} width={50} animation="wave" />

                                                </TableCell>
                                                <TableCell>
                                                    <Skeleton variant="text" sx={{ fontSize: '0.5rem' }} width={50} animation="wave" />


                                                </TableCell>
                                                <TableCell>
                                                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={200} animation="wave" />

                                                </TableCell>
                                                <TableCell align="right">
                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                        <Skeleton variant="text" sx={{ fontSize: '2rem' }} width={100} animation="wave" />
                                                    </div>

                                                </TableCell>


                                            </TableRow>
                                        }

                                        )}
                                    </TableBody>


                                }



                            </Table>
                        </TableContainer>
                    </div>


                </div>
            </div>
           
        </>
    );
}

DashboardCrypto.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardCrypto;
