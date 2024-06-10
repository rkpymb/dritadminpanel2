import React, { useState, useEffect, useContext } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';
import FileUpload from '../../components/Admin/FileUpload'
import SidebarLayout from 'src/layouts/SidebarLayout';
import MYS from '../../../Styles/mystyle.module.css'
import Skeleton from '@mui/material/Skeleton';
import { FiEdit, FiTrash, FiArrowRightCircle } from "react-icons/fi";

import AddAddon from '../../components/Admin/Add/AddAddon'

import Badge from '@mui/material/Badge';
import { LuArrowLeft } from "react-icons/lu";

import TitleNav from '../../../src/components/Parts/TitleNav'

import InfiniteScroll from 'react-infinite-scroll-component';
import CircularProgress from '@mui/material/CircularProgress';
import Select from '@mui/material/Select';
import LoadingButton from '@mui/lab/LoadingButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import {

  FormControl,
  TextField,
  useTheme,
  styled,
  IconButton

} from '@mui/material';
import Image from 'next/image'

import { useRouter, useParams } from 'next/router'
import { MediaFilesFolder, MediaFilesUrl } from '/Data/config'
function DashboardCrypto() {
  const router = useRouter()

  const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';

  const [ReqData, setReqData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [AddonData, setAddonData] = useState({});
  const [AllData, setAllData] = useState(0);
  const [limit, setlimit] = useState(10);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const [Btnloading, setBtnloading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');

  const [Logo, setLogo] = useState('');
  const [title, setTitle] = useState('');
  const [details, setdetails] = useState('');
  const [sprice, setSprice] = useState('');
  const [mprice, setMprice] = useState('');
  const [isActive, setIsActive] = useState(null);
  const [ValidityDay, setValidityDay] = useState(0);


  const GetData = async () => {

    const sendUM = {

      page: page,
      limit: limit,

    };

    try {
      const data = await fetch("/api/V3/Admin/Addons/LBAddonsAll", {
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
setPage(1);
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



  const DeleteAddon = async (e) => {
    let text = "Do you really want to delete This Addon ?";
    if (confirm(text) == true) {

      const sendUM = {

        id: e
      }
      const data = await fetch("/api/V3/Admin/Addons/DeleteLBLBAddon", {
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
            alert(parsed.ReqD.done)
            router.push('/admin/addons')
          } else {
            alert('Something went wrong')
          }



        })
    }



  };


  const handleChangeTSStatus = (event) => {
    setIsActive(event.target.value);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const descriptionElementRef = React.useRef(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const EditAddon = (Data) => {
    setAddonData(Data)

    setLogo(Data.img);
    setTitle(Data.title);
    setdetails(Data.details);
    setSprice(Data.sprice);
    setMprice(Data.mprice);
    setIsActive(Data.isActive);
    setValidityDay(Data.ValidityDay);
    setOpen(true)


  };
  const handleSubmit = (e) => {

    e.preventDefault();
    let FinalFileName = document.querySelector('#FinalFileName').value
    if (title !== ''
      && details !== ''
      && sprice !== ''
      && mprice !== ''
      && FinalFileName !== ''
    ) {
      setBtnloading(true)
      UpdateAddon(FinalFileName)

    } else {
      alert('all fields are required');
    }


  };

  const UpdateAddon = async (e) => {


    const sendUM = {

      title: title,
      img: Logo,
      details: details,
      mprice: mprice,
      sprice: sprice,
      isActive: isActive,
      ValidityDay:ValidityDay,
      id: AddonData._id,

    }
    const data = await fetch("/api/V3/Admin/Addons/UpdateLBAddon", {
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
          alert(`${title} Updated Successfully`)
          setOpen(false)
          router.push(`/admin/addons`)
        } else {

          alert('Something went Wrong, please try again')
        }


      })
  }

  return (
    <>
      <TitleNav Title={`Addon Products`} />

      <div className={MYS.MboxMain}>
        <div className={MYS.BtnboxPage}>
          <div className={MYS.BtnboxPageA}>
            Addon Products : {AllData}
          </div>
          <div className={MYS.BtnboxPageB}>
            <AddAddon />
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

                <div className={MYS.Productimg}>
                  <Image
                    src={`${MediaFilesUrl}${MediaFilesFolder}/${item.img}`}
                    alt="image"
                    layout="responsive"
                    placeholder='blur'
                    width={30}
                    height={30}
                    quality={100}
                    blurDataURL={blurredImageData}

                  />
                </div>

                <div className={MYS.UserItemTitle}>
                  <span>{item.title} ({item.Addonid})</span>
                  <small>Branch Code: {item.Branchcode}</small>
                </div>
                <div className={MYS.UserItemDescB}>
                  <small>{item.details} </small>

                </div>
                <div className={MYS.UserItemDescB}>
                  <span><del>{item.mprice} </del> ₹{item.sprice} </span>
                  <small>Validity in Day :  {item.ValidityDay} </small>

                </div>
                <div style={{ height: '10px' }}></div>

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
                          DeleteAddon(item._id)
                        }>
                          <StyledBadge color="secondary" >
                            <FiTrash size={15} />
                          </StyledBadge>
                        </IconButton>
                        <div style={{ minWidth: '5px' }}></div>
                        <IconButton aria-label="cart" onClick={() =>
                          EditAddon(item)
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
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Edit Addon : {title}</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <form onSubmit={handleSubmit} >
            <div className={MYS.inputlogin}>
              <TextField
                required
                label="Addon Title"
                fullWidth
                value={title}

                onInput={e => setTitle(e.target.value)}

              />
            </div>
            <div className={MYS.inputlogin}>
              <TextField
                required
                label="Addon Details"
                fullWidth
                value={details}

                onInput={e => setdetails(e.target.value)}

              />
            </div>
            <div className={MYS.inputlogin}>
              <TextField
                required
                label="Main Price"
                fullWidth
                value={mprice}

                onInput={e => setMprice(e.target.value)}

              />
            </div>
            <div className={MYS.inputlogin}>
              <TextField
                required
                label="Sale Price"
                fullWidth
                value={sprice}

                onInput={e => setSprice(e.target.value)}

              />
            </div>


            <div className={MYS.inputlogin}>
              <TextField
                required
                label="Validity in Days"
                fullWidth
                value={ValidityDay}
                type='Number'

                onInput={e => setValidityDay(e.target.value)}

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
            <div className={MYS.featuresimagebox}>
              <div className={MYS.featuresimageboxA}>
                <img
                  src={`${MediaFilesUrl}${MediaFilesFolder}/${Logo}`}
                  width={100}
                  height={100}
                  layout='responsive'
                  alt='img'
                  id="Fimage"

                />
                <div>
                  <small>Addon image</small>
                </div>
              </div>

              <div className={MYS.featuresimageboxB}>
                <FileUpload />
              </div>
            </div>
            <input type="hidden" value={Logo} id="FinalFileName" />

            <div style={{ minHeight: 25 }}></div>

          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <LoadingButton
            size="small"
            onClick={handleSubmit}

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
