import React, { useState, useEffect, useContext } from 'react';

import MYS from '/Styles/mystyle.module.css'

import Badge from '@mui/material/Badge';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { FiEdit, FiTrash, FiArrowRightCircle } from "react-icons/fi";
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import DialogTitle from '@mui/material/DialogTitle';

import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
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
const LibrarySubscriptions = () => {

    const router = useRouter()

    const [OpenEdit, setOpenEdit] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');
    
    const [ReqData, setReqData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [AllData, setAllData] = useState(0);
    const [limit, setlimit] = useState(10);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);

    const [CurrentSubID, setCurrentSubID] = useState('');
    const [CurrentOID, setCurrentOID] = useState('');

    const [StatusText, setStatusText] = useState('');
    const [validityStartDate, setValidityStartDate] = useState('');
    const [validityEndDate, setValidityEndDate] = useState('');
    const [isActive, setIsActive] = useState(false);
    const [Btnloading, setBtnloading] = useState(false);
   

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
    const handleCloseShiftEdit = () => {
        setOpenEdit(false);
    };

    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';

    const GetData = async () => {

        const sendUM = {

            page: page,
            limit: limit,
           
        };

        try {
            const response = await fetch("/api/V3/Admin/AddonSubs/AddonSubsList", {
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

        GetData()

    }, [])



    const DeleteShift = async (e) => {
        let text = "Do you really want to delete This Subscription ?";
        if (confirm(text) == true) {

            const sendUM = {

                id: e
            }
            const data = await fetch("/api/V3/Admin/AddonSubs/DeleteAddonSubscription", {
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
                        router.push(`/admin/addon-subscriptions`)
                    } else {
                        alert('Something went wrong')
                    }



                })
        }



    };

    const EditShift = async (SeatD) => {


        setStatusText(SeatD.StatusText)
        setValidityStartDate(SeatD.validityStartDate)
        setValidityEndDate(SeatD.validityEndDate)
       
        setIsActive(SeatD.isActive)
        setCurrentSubID(SeatD._id)
        setCurrentOID(`${SeatD.Orderid}`)

        handleClickOpenShiftEdit('paper')

    };
    const UpdateShift = async () => {
        if (StatusText !== '' && validityStartDate !== '' && validityEndDate !== '') {
            setBtnloading(true)
           
            
            const sendUM = {

                isActive: isActive,
                StatusText: StatusText,
                validityStartDate: validityStartDate,
                validityEndDate: validityEndDate,
               
                id: CurrentSubID,

            }
            const data = await fetch("/api/V3/Admin/AddonSubs/UpdateAddonSubscription", {
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
                        alert(`${CurrentOID} Updated Successfully`)
                        setOpenEdit(false)
                        
                        router.push(`/admin/addon-subscriptions`)
                    } else {

                        alert('Something went Wrong, please try again')
                    }


                })

        } else {
            alert('Please Provide all Required Details ')
        }


    };


    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: -3,
            top: 13,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
        },
    }));


    return (
        <div>
            <div className={MYS.MboxMain}>
                <div className={MYS.BtnboxPage}>
                    <div className={MYS.BtnboxPageA}>
                        Total Orders : {AllData}
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
                    {ReqData.map((item,index) => {
                        return <div hover key={index} className={MYS.UserItemMain}>

                            <div className={MYS.UserItemTop}>
                                <div className={MYS.UserItemTopA}>
                                    <div className={MYS.USerDP}>
                                        <Image
                                            src={`${MediaFilesUrl}${MediaFilesFolder}/${item.Addon[0].img}`}
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
                                <div className={MYS.UserItemTopB}>
                                    <div className={MYS.UserItemTitle}>
                                        <span>{item.Addon[0].title}</span>
                                        <small>ORDER ID : {item.Orderid}</small>
                                    </div>
                                    <div className={MYS.UserItemDescB}>
                                        <small>Branch Code : {item.BranchCode}</small>
                                        
                                    </div>
                                   
                                    <div className={MYS.UserItemDescB}>
                                        <small>Addons : {item.Addon.length} </small>
                                        <div>
                                            {item.Addon.map((item, index) => {

                                                return <div key={index} style={{fontSize:'10px'}}>✅ {item.title}</div>
                                            }

                                            )}
                                        </div>

                                    </div>
                                    <div className={MYS.UserItemDesc}>
                                        <small>{item.validityStartDate} - {item.validityEndDate}</small>
                                    </div>

                                </div>
                            </div>

                            <div className={MYS.PMItemFotter}>
                                <div className={MYS.PMItemFA}>
                                    <div className={MYS.Pmtag}>
                                        <span> {item.StatusText}</span>


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
                                            <div style={{ width: '5px' }}></div>
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
                <DialogTitle id="scroll-dialog-title">Edit : {CurrentOID}</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    <form onSubmit={UpdateShift} >
                        <div className={MYS.inputlogin}>
                            <TextField
                                required
                                label="validity Start Date"
                                fullWidth
                                value={validityStartDate}

                                onInput={e => setValidityStartDate(e.target.value)}

                            />
                        </div>
                        <div className={MYS.inputlogin}>
                            <TextField
                                required
                                label="validity End Date"
                                fullWidth
                                value={validityEndDate}

                                onInput={e => setValidityEndDate(e.target.value)}

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

                                    <MenuItem value={true}>Active</MenuItem>
                                    <MenuItem value={false}>Deactivated</MenuItem>

                                </Select>
                            </FormControl>
                        </div>
                        <div className={MYS.inputlogin}>
                            <TextField
                                required
                                label="Subscription Status"
                                fullWidth
                                value={StatusText}

                                onInput={e => setStatusText(e.target.value)}

                            />
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
               
        </div>
    )
}

export default LibrarySubscriptions
