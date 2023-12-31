import React, { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import CheckloginContext from '/context/auth/CheckloginContext'
import SidebarLayout from 'src/layouts/SidebarLayout';
import MYS from '/Styles/mystyle.module.css'
import { useRouter, useParams } from 'next/router'

import Avatar from '@mui/material/Avatar';
import Fade from '@mui/material/Fade';
import Skeleton from '@mui/material/Skeleton';


import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Image from 'next/image';

import { FiFilter } from 'react-icons/fi';



import { MediaFilesUrl, MediaFilesFolder } from '/Data/config'
import Badge from '@mui/material/Badge';
import { LuArrowLeft } from "react-icons/lu";


import AddTsCourse from '../components/Add/AddTsCourse'

import {
  Button,

  IconButton,

  styled,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,

  TableRow,
  TableContainer,




} from '@mui/material';

export async function getServerSideProps(context) {
    const courseid = context.query.pageno[0];
    return {
        props: { courseid },
    }

}
function DashboardCrypto({courseid}) {
  const Contextdata = useContext(CheckloginContext)
  const [Retdata, setRetdata] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [FilterText, setFilterText] = useState('All');
  const [initialData, setInitialData] = useState([]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const router = useRouter()


  const [searchQuery, setSearchQuery] = useState('');

  const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';

  const GetData = async () => {
   
    const sendUM = { JwtToken: Contextdata.JwtToken ,courseid:courseid}
    const data = await fetch("/api/V3/List/GetCourseTSlist", {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(sendUM)
    }).then((a) => {
      return a.json();
    })
      .then((parsed) => {

        if (parsed.ReqD.TestSeries) {

          setInitialData(parsed.ReqD.TestSeries)

          setRetdata(parsed.ReqD.TestSeries)
          setIsLoading(false)

        }
      })
  }
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


  const ShortbyPublic = () => {
    const filteredData = initialData.filter(item => item.isActive === 3);
    setRetdata(filteredData);
    setAnchorEl(null);
    setFilterText('Public')
  };
  const ShortbyUpcoming = () => {
    const filteredData = initialData.filter(item => item.isActive === 2);
    setRetdata(filteredData);
    setAnchorEl(null);
    setFilterText('Upcoming')
  };
  const ShortbyPrivate = () => {
    const filteredData = initialData.filter(item => item.isActive === 1);
    setRetdata(filteredData);
    setAnchorEl(null);
    setFilterText('Private')
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
    const filteredData = initialData.filter(item => (
      item.title.toLowerCase().includes(query) 
    ));

    setRetdata(filteredData);
  };

  return (
    <>
      <Head>
        <title>Test Series</title>
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
                  <span>All Test Series : <span>{FilterText}</span> ({Retdata.length})</span>
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
                    label="Search by Title, Slug"

                    defaultValue="Small"
                    size="small"
                    id="search"
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                </div>

                <div className={MYS.Topbtnboxbtn}>

                <AddTsCourse CourseSlug={courseid} />
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

                  <MenuItem onClick={ShortbyUpcoming}>
                    <small>Upcoming</small>
                  </MenuItem>
                  <MenuItem onClick={ShortbyPublic}>
                    <small>Public</small>
                  </MenuItem>
                  <MenuItem onClick={ShortbyPrivate}>
                    <small>Private</small>
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
                    <TableCell>Test Series</TableCell>
                   
                    <TableCell>Status</TableCell>
                    <TableCell>Date/Time</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>

                {!isLoading ?
                  <TableBody>

                    {Retdata.map((item) => {
                      return <TableRow className={MYS.CourselistItemTable} hover key={item._id} onClick={() => router.push(`/tsdetails/${item.pid}`)}>
                        <TableCell>
                          <div className={MYS.Courselistimgbox}>
                            <div className={MYS.videothumbimg}>
                              <Image
                                src={`${MediaFilesUrl}${MediaFilesFolder}/${item.img}`}

                                alt="image"
                                layout="responsive"
                                placeholder='blur'
                                width={'100%'}
                                height={70}
                                quality={50}
                                blurDataURL={blurredImageData}

                              />
                            </div>
                            <div className={MYS.CourselistimgboxB} style={{maxWidth:'150px'}}>
                              <Typography
                                variant="body1"
                                fontWeight="bold"
                                color="text.primary"
                                gutterBottom
                                noWrap
                              >
                                {item.title}
                              </Typography>
                              <div>
                                <span style={{fontSize:'12px'}}><b>Course</b> : {item.courseid}</span>
                              </div>
                              
                            </div>


                          </div>


                        </TableCell>
                       
                        <TableCell>
                          <div

                          >
                            {item.isActive == 1 && <span>Private</span> }
                            {item.isActive == 2 && <span>Upcoming</span> }
                            {item.isActive == 3 && <span>Public</span> }
                          </div>
                        </TableCell>
                        <TableCell>
                          <div

                          >
                            <span> {item.date}</span>
                            <div>
                              <small> {item.time}</small>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button

                            size='small'
                            variant='outlined'
                            color='primary'
                          >
                            View Details
                          </Button>
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
