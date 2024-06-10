import React,{ useState, useEffect, useContext } from 'react';

import MYS from '/Styles/mystyle.module.css'
import Image from 'next/image';

import Badge from '@mui/material/Badge';
import { useRouter, useParams } from 'next/router'
import CheckloginContext from '/context/auth/CheckloginContext'
import Skeleton from '@mui/material/Skeleton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import DialogTitle from '@mui/material/DialogTitle';
import FileUpload from '../../../components/Admin/FileUpload'

import { MediaFilesUrl, MediaFilesFolder } from '/Data/config'

import { FiTrash, FiEdit } from "react-icons/fi";
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';

import Select from '@mui/material/Select';

import {
  IconButton,

  styled,
  FormControl,
    TextField,
   

} from '@mui/material';


const BranchDetails = ({ BranchData }) => {
  const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';

 
  const router = useRouter()

  const [IsLoading, setIsLoading] = useState(true);
  const [PosterList, setPosterList] = useState([]);
  const [Logo, setLogo] = useState('/img/picture.png');
    const Contextdata = useContext(CheckloginContext)
   
    const [Btnloading, setBtnloading] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');
    const [Url, setUrl] = useState('');
  
    const [isActive, setIsActive] = useState(3);
   
 

    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
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

  const handleSubmit = (e) => {

      e.preventDefault();
      let FinalFileName = document.querySelector('#FinalFileName').value
      if (FinalFileName !== '' && Url !== '') {
          setBtnloading(true)
          AddPass(FinalFileName)

      } else {
          alert('all fields are required');
      }


  };

  const AddPass = async (e) => {
      const sendUM = {
         
          BranchCode: BranchData.BranchCode,
          img: e,
          url: Url,
          isActive: true,
          order: 0,

      }
      const data = await fetch("/api/V3/Admin/LBPosterslider/AddLBSlider", {
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
                  alert(`Poster Added successfully`)
                  setOpen(false)
                  Getdata(BranchData.BranchCode)
                 
              } else {

                  alert('Something went Wrong, please try again')
              }


          })
  }



  const Getdata = async (e) => {

    const sendUM = {
   
      BranchCode: e
    }
    const data = await fetch("/api/V3/Admin/LBPosterslider/AllLBPosterslider", {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(sendUM)
    }).then((a) => {
      return a.json();
    })
      .then((parsed) => {
        console.log(parsed.ReqD.LBPosterSlider)
        if (parsed.ReqD.LBPosterSlider) {
          setPosterList(parsed.ReqD.LBPosterSlider)

          setIsLoading(false)
        }


      })



  };

  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));
  useEffect(() => {
  
    Getdata(BranchData.BranchCode)
  }, [])

  const DeletePoster = async (e) => {
    let text = "Do you really want to delete This Poster ?";
    if (confirm(text) == true) {

        const sendUM = {
          
            id: e
        }
        const data = await fetch("/api/V3/Admin/LBPosterslider/DeleteLBSlider", {
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
                    Getdata(BranchData.BranchCode)
                } else {
                    alert('Something went wrong')
                }



            })
    }



};


  return (
    <div>
      <div className={MYS.BranchDataBoxB}>
        <div className={MYS.LBsmallBoxHeader}>
          <div className={MYS.LBsmallBoxHeaderA}>
            <span>Library App Posters</span>
          </div>
          <div className={MYS.LBsmallBoxHeaderB}>
            {!IsLoading && 

            <div>
                <Button
                    onClick={handleClickOpen('paper')}
                    size="small"
                    variant="outlined"
                    startIcon={<AddTwoToneIcon fontSize="small" />}
                >
                    Add new
                </Button>
            </div>
            
            }
          </div>
        </div>
        <div>
          {!IsLoading ?
            <div className={MYS.LbPosterGrid}>
              {PosterList.map((item) => {
                return <div className={MYS.LBPosteritem} key={item._id}>
                  <div className={MYS.LBPosteritemimg}>
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
                  <div className={MYS.LBPosteritemBottom}>
                    <IconButton aria-label="cart" onClick={() =>
                      DeletePoster(item._id)
                    }>
                      <StyledBadge color="secondary" >
                        <FiTrash size={15} />
                      </StyledBadge>
                    </IconButton>
                  </div>
                </div>
              }

              )}
            </div> :
            <div> <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={130} height={130} animation="wave" /></div>
          }

        </div>
       

      </div>

      <Dialog
                    open={open}
                    onClose={handleClose}
                    scroll={scroll}
                    aria-labelledby="scroll-dialog-title"
                    aria-describedby="scroll-dialog-description"
                >
                    <DialogTitle id="scroll-dialog-title">Add New Poster</DialogTitle>
                    <DialogContent dividers={scroll === 'paper'}>
                        <form onSubmit={handleSubmit} >
                        <div className={MYS.inputlogin}>
                               
                               

                            </div>
                            <div className={MYS.inputlogin}>
                                <TextField
                                    required
                                    label="Posert Url"
                                    fullWidth
                                    value={Url}

                                    onInput={e => setUrl(e.target.value)}

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
                                        src={`${Logo}`}
                                        width={100}
                                        height={100}
                                        layout='responsive'
                                        alt='img'
                                        id="Fimage"

                                    />
                                    <div>
                                        <small>Poster image</small>
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
                            <span>Save</span>
                        </LoadingButton>
                    </DialogActions>
                </Dialog>
    </div>
  )
}

export default BranchDetails
