import React, { useState, useEffect, useContext } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { LuMapPin } from "react-icons/lu";
import DialogTitle from '@mui/material/DialogTitle';

import { FiEdit, FiTrash } from "react-icons/fi";

import LoadingButton from '@mui/lab/LoadingButton';
import { LuChevronRight, LuArrowLeft, LuCheckCheck } from "react-icons/lu";
import Skeleton from '@mui/material/Skeleton';
import Badge from '@mui/material/Badge';
import { useRouter, useParams } from 'next/router'
import { MediaFilesUrl, MediaFilesFolder } from '/Data/config'
import MYS from '/Styles/mystyle.module.css'
import {

    styled,
    IconButton
} from '@mui/material';
import CheckloginContext from '/context/auth/CheckloginContext'
const EditCatModal = () => {

    const Contextdata = useContext(CheckloginContext)
    const router = useRouter()
    const [Btnloading, setBtnloading] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');


    const [BtnLoading, setBtnLoading] = useState(false);
    const [Loading, setLoading] = useState(true);
    const [Branches, setBranches] = useState([]);
    const [PrimaryBranch, setPrimaryBranch] = useState('');

    useEffect(() => {

        if (Contextdata.IsLogin) {


            if (Contextdata.Data.BranchCode) {
             
                const DataArray = Contextdata.Data.AssignBranches
                // Find the data with the specific branch code
                const filteredData = DataArray.find(data => data.BranchCode == Contextdata.Data.BranchCode );

                // Log the filtered data to the console
                if (filteredData) {
                   
                   
                    setPrimaryBranch(`${filteredData.BranchCode} ${filteredData.name}`)
                    

                } else {
                    console.log('No data found with the specified BranchCode.');
                }
            } else {

                // setOpen(true)

            }

            setBranches(Contextdata.Data.AssignBranches)
            setLoading(false);
        }


    }, [Contextdata.Data]);


    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: -3,
            top: 13,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
        },
    }));



    const handleClose = () => {
        setOpen(false);
    };


    const SelectedBranch = async (branch) => {
        console.log(branch)
        setBtnLoading(true)
        const sendUM = {

            BranchCode: branch.BranchCode,

        }
        const data = await fetch("/api/V3/Admin/Myprofile/UpdateAdminBranch", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => {
            return a.json();
        })
            .then((parsed) => {
                console.log(parsed)
                if (parsed.ReqD.done) {

                    setTimeout(function () {
                        alert('Branch Updated Successfully !')
                        setOpen(false);
                        setBtnLoading(false)
                        router.push('/admin')
                    }, 2000);

                } else {
                    setBtnLoading(false)
                    alert('unbale to update Branch')
                }






            })
    }

    return (
        <div>
            <div>

                <div className={MYS.BrboxMain}>

                    <div className={MYS.BrboxMainA}>
                        <IconButton aria-label="cart" onClick={handleClickOpen('paper')}>
                            <StyledBadge color="secondary" >
                                <LuMapPin size={15} color='white' />
                            </StyledBadge>
                        </IconButton>
                    </div>
                    <div className={MYS.BrboxMainB}>
                        <div className={MYS.BrboxMainTextB}>
                            {PrimaryBranch.slice(0, 25)}
                        </div>
                    </div>
                    <div className={MYS.BrboxMainC}>
                        <IconButton aria-label="cart" onClick={handleClickOpen('paper')}>
                            <StyledBadge color="secondary" >
                                <FiEdit size={15} color='white' />
                            </StyledBadge>
                        </IconButton>
                    </div>
                </div>

                <Dialog
                    open={open}
                    onClose={handleClose}
                    scroll={scroll}
                    aria-labelledby="scroll-dialog-title"
                    aria-describedby="scroll-dialog-description"
                >
                    <DialogTitle id="scroll-dialog-title">Set Primary Branch</DialogTitle>
                    <DialogContent dividers={scroll === 'paper'}>
                        {Loading ? <Skeleton variant="text" animation='wave' sx={{ fontSize: '2rem' }} width={'100%'} /> :

                            <div>
                                <div className={MYS.BlistGrid}>
                                    {Branches.map((item, index) => {
                                        return <div hover key={index} className={MYS.Blist}>

                                            <div className={MYS.BlistTop}>
                                                <div className={MYS.BlistTopLogo}>
                                                    <img
                                                        src={`${MediaFilesUrl}${MediaFilesFolder}/${item.logo}`}
                                                        alt="image"
                                                        layout="responsive"
                                                        placeholder='blur'

                                                        width={'100%'}

                                                        quality={100}


                                                    />
                                                </div>
                                                <div>
                                                    {Contextdata.Data.BranchCode == item.BranchCode ? <div className={MYS.Statustag}>
                                                        <span>Primary</span>

                                                    </div> : null}

                                                </div>


                                            </div>

                                            <div className={MYS.UserItemTitle}>
                                                <span>{item.name} ({item.Sname})</span>
                                                <small>Branch Code: {item.BranchCode}</small>
                                            </div>
                                            <div className={MYS.UserItemDescB}>
                                                <small>{item.Address} </small>
                                                <small>{item.City} {item.State} {item.pincode}</small>
                                            </div>
                                            <div style={{ height: '10px' }}></div>
                                            <div className={MYS.PMItemFotter}>

                                                <LoadingButton
                                                    endIcon={Contextdata.Data.BranchCode == item.BranchCode ? <LuCheckCheck /> : <LuChevronRight />}
                                                    loading={BtnLoading}
                                                    disabled={BtnLoading}
                                                    loadingPosition="end"
                                                    variant={Contextdata.Data.BranchCode == item.BranchCode ? "contained" : "outlined"}
                                                    fullWidth
                                                    onClick={() => SelectedBranch(item)}
                                                >
                                                    <span>{Contextdata.Data.BranchCode == item.BranchCode ? "Selected" : "Select Branch "}</span>
                                                </LoadingButton>
                                            </div>


                                        </div>
                                    }

                                    )}
                                </div>


                            </div>}
                    </DialogContent>

                </Dialog>
            </div>

            {/* <div hover key={index} className={MYS.UserItemMain}>

                <div className={MYS.LBlogo}>
                    <img
                        src={`${MediaFilesUrl}${MediaFilesFolder}/${item.logo}`}
                        alt="image"
                        layout="responsive"
                        placeholder='blur'

                        width={'100%'}

                        quality={100}


                    />
                </div>

                <div className={MYS.UserItemTitle}>
                    <span>{item.name} ({item.Sname})</span>
                    <small>Branch Code: {item.BranchCode}</small>
                </div>
                <div className={MYS.UserItemDescB}>
                    <small>{item.Address} </small>
                    <small>{item.City} {item.State} {item.pincode}</small>
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
                                <LoadingButton
                                    endIcon={<LuChevronRight />}
                                    loading={false}
                                    loadingPosition="end"
                                    variant="contained"
                                    fullWidth
                                    onClick={() => router.push(`/admin/recharge?amt=${PayCredit}`)}
                                >
                                    <span>Recharge Now</span>
                                </LoadingButton>


                            </div>
                        </div>
                    </div>

                </div>


            </div> */}
        </div>
    )
}

export default EditCatModal
