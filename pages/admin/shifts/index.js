import React, { useState, useEffect, useContext } from 'react';

import SidebarLayout from 'src/layouts/SidebarLayout';
import MYS from '../../../Styles/mystyle.module.css'

import { FiEdit, FiTrash, FiArrowRightCircle } from "react-icons/fi";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import MenuItem from '@mui/material/MenuItem';
import AddShift from '../../components/Admin/Add/AddShift'

import Badge from '@mui/material/Badge';

import DialogTitle from '@mui/material/DialogTitle';
import LoadingButton from '@mui/lab/LoadingButton';
import TitleNav from '../../../src/components/Parts/TitleNav'

import InfiniteScroll from 'react-infinite-scroll-component';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import {

  Button,

  IconButton,

  styled,
 
  FormControl,
} from '@mui/material';
import Image from 'next/image'
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

import { useRouter, useParams } from 'next/router'
import { MediaFilesFolder, MediaFilesUrl } from '/Data/config'
function DashboardCrypto() {
  const router = useRouter()
  const [OpenEdit, setOpenEdit] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');
  const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';

  const [ReqData, setReqData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [AllData, setAllData] = useState(0);
  const [limit, setlimit] = useState(10);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [Btnloading, setBtnloading] = useState(false);
  
  const [title, setTitle] = useState('');
  const [mprice, setMprice] = useState('');
  const [sprice, setSprice] = useState('');
  const [uptime, setUptime] = useState('');
  const [downtime, setDowntime] = useState('');
  const [isActive, setIsActive] = useState(0);
  const [CurrentShiftID, setCurrentShiftID] = useState('');

  const handleClickOpenShiftEdit = () => {
    setOpenEdit(true);
  };
  const handleCloseShiftEdit = () => {
    setOpenEdit(false);
  };
  const handleChangeTSStatus = (event) => {
    setIsActive(event.target.value);
  };

  const GetData = async () => {

    const sendUM = {

      page: page,
      limit: limit,

    };

    try {
      const data = await fetch("/api/V3/Admin/Shifts/AllShifts", {
        method: "POST",
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(sendUM)
      });

      if (!data.ok) {
        throw new Error('Failed to fetch data');
      }
      const parsed = await data.json();

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
    setPage(1)

    GetData();

  }, [router.query])


  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }));

  const DeleteShift = async (e) => {
    let text = "Do you really want to delete Shift ?";
    if (confirm(text) == true) {

      const sendUM = {

        id: e
      }
      const data = await fetch("/api/V3/Admin/Shifts/DeleteShift", {
        method: "POST",
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(sendUM)
      }).then((a) => {
        return a.json();
      })
        .then((parsed) => {

          if (parsed.ReqD.done) {
            setPage(1)
            alert(parsed.ReqD.done)
            router.push('/admin/shifts')
          } else {
            alert('Something went wrong')
          }



        })
    }



  };


  const EditShift = async (ShiftD) => {


    console.log(ShiftD)
    setTitle(ShiftD.title)
    setMprice(ShiftD.mprice)
    setSprice(ShiftD.sprice)
    setUptime(ShiftD.uptime)
    setDowntime(ShiftD.downtime)
    setIsActive(ShiftD.isActive)
    setCurrentShiftID(ShiftD._id)

    handleClickOpenShiftEdit('paper')

  };
  const UpdateShift = async () => {
    if (title !== '' && mprice !== '' && sprice !== '' && uptime !== '' && downtime !== '') {
      setBtnloading(true)
      const sendUM = {
     
        title: title,
        uptime: uptime,
        downtime: downtime,
        mprice: mprice,
        sprice: sprice,
        isActive: isActive,
        id: CurrentShiftID,

      }
      const data = await fetch("/api/V3/Admin/Shifts/UpdateShift", {
        method: "POST",
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(sendUM)
      }).then((a) => {
        return a.json();
      })
        .then((parsed) => {
          setBtnloading(false)
          if (parsed.ReqD.done) {
            setPage(1)
            alert(`${title} Updated Successfully`)
            setOpenEdit(false)
            router.push(`/admin/shifts`)
          } else {

            alert('Something went Wrong, please try again')
          }


        })

    } else {
      alert('Please Provide all Required Details ')
    }


  };


  return (
    <>
      <TitleNav Title={`Branche's Shifts`} />

      <div className={MYS.MboxMain}>
        <div className={MYS.BtnboxPage}>
          <div className={MYS.BtnboxPageA}>
            Total Shifts : {AllData}
          </div>
          <div className={MYS.BtnboxPageB}>
            <AddShift />
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
            {ReqData.map((item, index) => {
              return <div hover key={index} className={MYS.UserItemMain}>


                <div className={MYS.UserItemTitle}>
                  <span>{item.title}</span>
                  <small>Shift ID : {item.Shiftid}</small>
                  <small>{item.uptime} - {item.downtime}</small>
                  <small>Branch Code : {item.Branchcode} </small>
                </div>
                <div className={MYS.UserItemDescB}>
                  <span>Price Per Day : <del>{item.mprice} </del>  ₹{item.sprice} </span>
                </div>

                <div className={MYS.PMItemFotter}>
                  <div className={MYS.PMItemFA}>
                    <div className={MYS.Pmtag}>

                      <span>  {item.isActive == 3 ? 'Active' : 'Disabled'}</span>


                    </div>

                  </div>
                  <div className={MYS.PMItemFB}>

                    <div className={MYS.Flexbtnbox}>

                      <div style={{ minWidth: '10px' }}></div>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton aria-label="cart" onClick={() =>
                          DeleteShift(item._id)
                        }>
                          <StyledBadge color="secondary" >
                            <FiTrash size={15} />
                          </StyledBadge>
                        </IconButton>

                        <div style={{ minWidth: '5px' }}></div>

                        <IconButton aria-label="cart" onClick={() =>
                           EditShift(item)
                        }>
                          <StyledBadge color="secondary" >
                            <FiEdit size={15} />
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


      <Dialog
          open={OpenEdit}
          onClose={handleCloseShiftEdit}
          scroll={scroll}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <DialogTitle id="scroll-dialog-title">Edit : {title}</DialogTitle>
          <DialogContent dividers={scroll === 'paper'}>
            <form onSubmit={UpdateShift} >
              <div className={MYS.inputlogin}>
                <TextField
                  required
                  label="Shift Title"
                  fullWidth
                  value={title}

                  onInput={e => setTitle(e.target.value)}

                />
              </div>
              <div className={MYS.inputlogin}>
                <TextField
                  required
                  label="UP Time"
                  fullWidth
                  value={uptime}

                  onInput={e => setUptime(e.target.value)}

                />
              </div>
              <div className={MYS.inputlogin}>
                <TextField
                  required
                  label="Down Time"
                  fullWidth
                  value={downtime}

                  onInput={e => setDowntime(e.target.value)}

                />
              </div>
              <div className={MYS.inputlogin}>
                <TextField
                  required
                  label="Main Price per Day"
                  fullWidth
                  value={mprice}

                  onInput={e => setMprice(e.target.value)}

                />
              </div>
              <div className={MYS.inputlogin}>
                <TextField
                  required
                  label="Sale Price per Day"
                  fullWidth
                  value={sprice}

                  onInput={e => setSprice(e.target.value)}

                />
              </div>
              <div className={MYS.inputlogin}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Status</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={isActive}
                    label="Status"
                    onChange={handleChangeTSStatus}
                  >
                    <MenuItem value={3}>Public</MenuItem>
                    <MenuItem value={2}>Upcoming</MenuItem>
                    <MenuItem value={1}>Private</MenuItem>

                  </Select>
                </FormControl>
              </div>



              <div style={{ minHeight: 25 }}></div>

            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseShiftEdit}>Cancel</Button>
            <LoadingButton
              size="small"
              onClick={UpdateShift}
              
              loading={Btnloading}
              loadingPosition="end"
              variant="contained"
            >
              <span>Update</span>
            </LoadingButton>
          </DialogActions>
        </Dialog>


    </>
  );
}

DashboardCrypto.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardCrypto;
