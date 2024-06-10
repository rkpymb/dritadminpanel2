import React, { useState, useEffect, useContext } from 'react';

import SidebarLayout from 'src/layouts/SidebarLayout';
import MYS from '../../../Styles/mystyle.module.css'



import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import Skeleton from '@mui/material/Skeleton';
import { FiEdit, FiTrash, FiArrowRightCircle } from "react-icons/fi";
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import DialogTitle from '@mui/material/DialogTitle';

import Badge from '@mui/material/Badge';
import { LuArrowLeft } from "react-icons/lu";

import TitleNav from '../../../src/components/Parts/TitleNav'
import MenuItem from '@mui/material/MenuItem';
import InfiniteScroll from 'react-infinite-scroll-component';
import CircularProgress from '@mui/material/CircularProgress';
import {

  Button,

  IconButton,

  styled,

  FormControl,
} from '@mui/material';
import Image from 'next/image'
import LoadingButton from '@mui/lab/LoadingButton';

import { useRouter, useParams } from 'next/router'
import { MediaFilesFolder, MediaFilesUrl } from '/Data/config'
function DashboardCrypto() {
  const router = useRouter()

  const [OpenEdit, setOpenEdit] = useState(false);
  const [scroll, setScroll] = React.useState('paper');

  const [ReqData, setReqData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [AllData, setAllData] = useState(0);
  const [limit, setlimit] = useState(10);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [CurrentSubID, setCurrentSubID] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [Btnloading, setBtnloading] = useState(false);
  const [StatusText, setStatusText] = useState('');
  const handleChangeTSStatus = (event) => {
    setIsActive(event.target.value);
    if (event.target.value === true) {
      setStatusText('Active')
    } else {
      setStatusText('Deactivated')
    }
  };



  const handleClickOpenShiftEdit = () => {
    setOpenEdit(true);
  };
  const handleClose = () => {
    setOpenEdit(false);
  };
  const GetData = async () => {

    const sendUM = {

      page: page,
      limit: limit,

    };

    try {
      const data = await fetch("/api/V3/Admin/LibraryAttendance/AllAttendance", {
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


  const EditAtt = async (Data) => {
    setIsActive(Data.isActive)
    setCurrentSubID(Data._id)


    setOpenEdit(true);



  };
  const UpdateAtt = async () => {

    if (CurrentSubID !== '') {

      const sendUM = {

        isActive: isActive,
        id: CurrentSubID,
      }
      const data = await fetch("/api/V3/Admin/LibraryAttendance/UpdateAtt", {
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
            alert(parsed.ReqD.done)
            setOpenEdit(false)

            router.push(`/admin/attendance`)
          } else {

            alert('Something went Wrong, please try again')
          }


        })

    }

  };

  const DeleteAtt = async (e) => {
    let text = "Do you really want to delete This Attendance ?";
    if (confirm(text) == true) {
      const sendUM = {

        AttData: e,

      }
      const data = await fetch("/api/V3/Admin/LibraryAttendance/DeleteAtt", {
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

            router.push(`/admin/attendance`)
          } else {
            alert('Something went wrong')
          }



        })
    }



  };



  return (
    <>
      <TitleNav Title={`Attendance`} />


      <div className={MYS.MboxMain}>
        <div className={MYS.BtnboxPage}>
          <div className={MYS.BtnboxPageA}>
            Total Attendance : {AllData}
          </div>
          <div className={MYS.BtnboxPageB}>

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
              return <div hover key={item.AttData.index} className={MYS.UserItemMain}>

                <div className={MYS.UserItemDescB}>
                  <span style={{ fontWeight: 500 }}>Date : {item.AttData.date}</span>

                </div>

                <div className={MYS.UserItemDescB}>
                  <small>Branch Code : {item.AttData.BranchCode}</small>
                  <small>Shift : {item.AttData.ShiftData.title} ({item.AttData.ShiftData.uptime} - {item.AttData.ShiftData.downtime})</small>
                  <small>Seat : {item.AttData.SeatData.title}</small>
                </div>
                <div className={MYS.UserItemDescB}>
                  <small>Name: {item.AttbyUser.name}</small>
                  <small>Mobile : {item.AttbyUser.mobile} </small>

                </div>


                <div className={MYS.PMItemFotter}>
                  <div className={MYS.PMItemFA}>
                    <div className={MYS.Pmtag}>
                      <span> {item.AttData.StatusText}</span>


                    </div>

                  </div>
                  <div className={MYS.PMItemFB}>

                    <div className={MYS.Flexbtnbox}>

                      <div style={{ minWidth: '10px' }}></div>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton aria-label="cart" onClick={() =>
                          DeleteAtt(item.AttData)
                        }>
                          <StyledBadge color="secondary" >
                            <FiTrash size={15} />
                          </StyledBadge>
                        </IconButton>
                        <div style={{ width: '5px' }}></div>
                        <IconButton aria-label="cart"
                          onClick={() =>
                            EditAtt(item.AttData)
                          }
                        >
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
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Edit Attendace</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <form onSubmit={UpdateAtt} >
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
                  <MenuItem value={true}>Present</MenuItem>
                  <MenuItem value={false}>Absent</MenuItem>

                </Select>
              </FormControl>
            </div>



            <div style={{ minHeight: 25 }}></div>


          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <LoadingButton
            size="small"
            onClick={UpdateAtt}

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
