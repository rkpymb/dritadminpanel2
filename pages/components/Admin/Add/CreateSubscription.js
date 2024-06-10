import React, { useState, useEffect, useContext, useRef } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import { FiX, FiChevronRight, FiClock, FiPlus } from "react-icons/fi";
import LoadingButton from '@mui/lab/LoadingButton';
import Toolbar from '@mui/material/Toolbar';
import Skeleton from '@mui/material/Skeleton';
import CheckloginContext from '/context/auth/CheckloginContext'
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import MYS from '/Styles/mystyle.module.css'
import Autocomplete from '@mui/material/Autocomplete';
import { useRouter, useParams } from 'next/router'
import Link from 'next/link'
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Badge from '@mui/material/Badge';
import { BsArrowRightShort } from "react-icons/bs";
import { LuArrowLeft } from "react-icons/lu";
import { FiPlusCircle, FiCheckCircle } from "react-icons/fi";

import dayjs from 'dayjs';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';


import {
    FormControl,
    TextField,
    IconButton,

    styled
} from '@mui/material';
import { TsunamiOutlined } from '@mui/icons-material';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog() {
    const Contextdata = useContext(CheckloginContext)
    const router = useRouter()
    const [open, setOpen] = React.useState(false);
    const [Btnloading, setBtnloading] = useState(false);

    const [BranchCode, setBranchCode] = useState('');
    const [passid, setPassid] = useState('');
    const [DateValue, setDateValue] = useState('');
    const [Shiftid, setShiftid] = useState('');
    const [SelectedAddonNow, setSelectedAddonNow] = useState([]);
    const [isActive, setIsActive] = useState(3);
    const [ShowUserBox, setShowUserBox] = useState(false);
    const [Loadingbranch, setLoadingbranch] = useState(true);
    const [LoadingSeat, setLoadingSeat] = useState(true);
    const [BranchList, setBranchList] = useState([]);
    const [SeatListSearch, setSeatListSearch] = useState([]);
    const [UserData, setUserData] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [Totalamt, setTotalamt] = useState(0);
    const [MainPrice, setMainPrice] = useState(0);
    const [Discount, setDiscount] = useState(0);

    const [BranchListSearch, setBranchListSearch] = useState([]);
    const [PassListSearch, setPassListSearch] = useState([]);
    const [ShiftListSearch, setShiftListSearch] = useState([]);
    const [AddonsListSearch, setAddonsListSearch] = useState([]);
    const [Loadinguser, setLoadinguser] = useState(true);
    const [LoadingPass, setLoadingPass] = useState(true);
    const [LoadingSeats, setLoadingSeats] = useState(true);
    const [LoadingShift, setLoadingShift] = useState(true);
    const [LoadingAddons, setLoadingAddons] = useState(true);
    const [PassBox, setPassBox] = useState(false);
    const [ShiftBox, setShiftBox] = useState(false);
    const [SeatBox, setSeatBox] = useState(false);
    const [AddonsBox, setAddonsBox] = useState(false);
    const [PricingBox, setPricingBox] = useState(false);

    const [PassData, setPassData] = useState([]);
    const [SeatData, setSeatData] = useState([]);
    const [AddonsData, setAddonsData] = useState([]);
    const [ShiftData, setShiftData] = useState([]);

    const [searchQuery, setSearchQuery] = useState('');
    const [UserMobile, setUserMobile] = useState('');
    const [SelectedSeat, setSelectedSeat] = useState({});

    const [inputValue, setInputValue] = React.useState('');

    const rows = [];
    let currentRow = [];


    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: -3,
            top: 13,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
        },
    }));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleChangeBranch = (event) => {
        BranchCode(event.target.value);
        alert(`This Seat will be added to ${event.target.value}`)
    };


    const GetBranchList = async () => {
        setDiscount(0)
        setTotalamt(0)
        setMainPrice(0)
        setPassBox(false)
        setSeatBox(false)
        setShiftBox(false)
        setPricingBox(false)
        setAddonsBox(false)
        const sendUM = { }
        const data = await fetch("/api/V3/Admin/Branches/AllBrancheslist", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => {
            return a.json();
        })
            .then((parsed) => {
                console.log(parsed.ReqD.Branchlist)

                if (parsed.ReqD.Branchlist) {
                    setBranchList(parsed.ReqD.Branchlist)
                    setBranchListSearch(parsed.ReqD.Branchlist)

                    setLoadingbranch(false)

                }
            })
    }

    useEffect(() => {
        GetBranchList()
    }, [router.query])


    const CreateLibrarySubscription = async (e) => {
        e.preventDefault();
        if (DateValue !== '') {
           
            setBtnloading(true)
            const sendUM = {
                
                PassData: PassData,
                SeatData: SeatData,
                AddonsData: selectedItems,
                ShiftData: ShiftData,
                UserData: UserData,
                DateValue: DateValue,
            }
            const data = await fetch("/api/V3/Admin/Orders/CreateLibrarySubscription", {
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
                        alert(parsed.ReqD.done)
                        window.location.reload();
                    } else {
                        alert('Something went wrong')
                    }
                })
        } else {
            alert('Plese Select validy start Date')
        }


    };

    const BranchSlected = async (e) => {
        setBranchCode(e.BranchCode)
        const D = [e]
        setBranchListSearch(D);
        console.log(e)
        setSearchQuery(e.BranchCode);
        setShowUserBox(true)



    };
    const PassSlected = async (e) => {
        setPassid(e.passid)
        setPassData(e)
        const D = [e]
        setPassListSearch(D);
        setShiftBox(true)
        GetShiftlist()


    };
    const ShiftSlected = async (e) => {
        setShiftid(e.Shiftid)
        setShiftData(e)

        const TS = (parseInt(e.sprice) * PassListSearch[0].Validity)
        setTotalamt(parseInt(Totalamt) + TS)
        const TM = (parseInt(e.mprice) * PassListSearch[0].Validity)
        setMainPrice(parseInt(MainPrice) + parseInt(TM))

        const DiscountAmtMP = (parseInt(e.mprice) * PassListSearch[0].Validity)
        const DiscountAmtSP = (parseInt(e.sprice) * PassListSearch[0].Validity)
        const FinalDis = DiscountAmtMP - DiscountAmtSP
        setDiscount(parseInt(Discount) + parseInt(FinalDis));
        const D = [e]
        setShiftListSearch(D);
        setSeatBox(true)
        GetSeatslist(e.Shiftid)



    };



    const SelectedAddon = (product) => {

        const isSelected = selectedItems.some((item) => item._id === product._id);
        if (isSelected) {
            setTotalamt(parseInt(Totalamt) - parseInt(product.sprice));
            setMainPrice(parseInt(MainPrice) - parseInt(product.mprice));
            setDiscount(parseInt(Discount) - parseInt(product.mprice - product.sprice));
            setSelectedItems(selectedItems.filter((item) => item._id !== product._id));
        } else {
            setTotalamt(parseInt(Totalamt) + parseInt(product.sprice));
            setMainPrice(parseInt(MainPrice) + parseInt(product.mprice));
            setDiscount(parseInt(Discount) + parseInt(product.mprice - product.sprice));
            setSelectedItems([...selectedItems, product]);
        }
    };
    const SeatSlected = async (e) => {
        setSelectedSeat(e)
        setAddonsBox(true)
        setPricingBox(true)
        GetAddonslist()
        setSeatData(e)

    };

    const handleSearchBranch = (e) => {
        ResetData()
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        const filteredData = BranchList.filter(item => (
            item.name.toLowerCase().includes(query) ||
            item.BranchCode.toLowerCase().includes(query)
        ));

        setBranchListSearch(filteredData);
    };
    const ResetData = () => {
        setDiscount(0)
        setTotalamt(0)
        setMainPrice(0)
        setPassBox(false)
        setSeatBox(false)
        setShiftBox(false)
        setPricingBox(false)
        setAddonsBox(false)
        setAddonsListSearch([])
        setShiftListSearch([])
        setPassListSearch([])
        setDateValue('')
        setPassid('')
        setPassData([])
        setShiftid('')
        setShiftData([])
        setSelectedItems([]);

                setSelectedSeat({})
     
       
        setSeatData([])
    };
    const Changeuser = async (e) => {

        ResetData()
        const mob = e.target.value
        if (UserMobile !== '' && mob.length == 10) {
            const sendUM = { mobile: mob }
            const data = await fetch("/api/V3/Admin/User/GetUserDatabymobile", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(sendUM)
            }).then((a) => {
                return a.json();
            })
                .then((parsed) => {
                    console.log(parsed.ReqD.Userlist)

                    if (parsed.ReqD.Userlist) {
                        if (parsed.ReqD.Userlist.length > 0) {
                            setUserData(parsed.ReqD.Userlist)
                            setLoadinguser(false)
                            setPassBox(true)
                            GetPasslist()
                        } else {
                            setPassBox(false)
                            setUserData([])
                            setLoadinguser(false)
                        }


                    }
                })
        }

        console.log(e.target.value)
    };
    const GetPasslist = async () => {
        setLoadingPass(true)
        const sendUM = {
           
            BranchCode: BranchCode

        }
        const data = await fetch("/api/V3/Admin/Passes/Passlistbybranchcode", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => {
            return a.json();
        })
            .then((parsed) => {
                setLoadingPass(false)

                if (parsed.ReqD.Passlist) {
                    if (parsed.ReqD.Passlist.length > 0) {

                        setPassListSearch(parsed.ReqD.Passlist)

                    } else {
                        setPassListSearch([])

                    }


                }
            })
    };
    const GetShiftlist = async () => {
        setLoadingShift(true)
        const sendUM = {
           
            BranchCode: BranchCode

        }
        const data = await fetch("/api/V3/Admin/Shifts/Shiftbybranchcode", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => {
            return a.json();
        })
            .then((parsed) => {
                setLoadingShift(false)
                setShiftBox(true)
                if (parsed.ReqD.Shiftlist) {
                    if (parsed.ReqD.Shiftlist.length > 0) {
                        setShiftListSearch(parsed.ReqD.Shiftlist)
                    } else {
                        setShiftListSearch([])

                    }


                }
            })
    };


    const GetAddonslist = async () => {
        setLoadingAddons(true)
        const sendUM = {
           
            BranchCode: BranchCode

        }
        const data = await fetch("/api/V3/Admin/Addons/LibraryAddonbybranchcode", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => {
            return a.json();
        })
            .then((parsed) => {
                setLoadingAddons(false)
                console.log(parsed.ReqD.Addonlist)
                if (parsed.ReqD.Addonlist) {
                    if (parsed.ReqD.Addonlist.length > 0) {
                        setAddonsListSearch(parsed.ReqD.Addonlist)
                    } else {
                        setAddonsListSearch([])

                    }


                }
            })
    };
    const GetSeatslist = async (e) => {
        setLoadingSeats(true);
        const sendUM = {
           
            BranchCode: BranchCode,
            Shiftid: e

        }
        const data = await fetch("/api/V3/Admin/Seats/GetLBSeatsbyBranchCode", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => {
            return a.json();
        })
            .then((parsed) => {
                setLoadingSeats(false)
                console.log(parsed.ReqD)
                if (parsed.ReqD.SeatsList) {
                    if (parsed.ReqD.SeatsList.length > 0) {
                        setSeatListSearch(parsed.ReqD.SeatsList)
                    } else {
                        setSeatListSearch([])

                    }


                }
            })
    };

    const OnchangeTotalAmtFunction = (event) => {
        const NewAmt = (event.target.value);
        if (MainPrice > NewAmt) {
            setDiscount(parseInt(MainPrice) - parseInt(NewAmt))
        } else {
            alert('Sale Price Can not be grater than Main Price')
        }


    };


    // Group seats by row


    let row1Seats = SeatListSearch.filter((seat) => seat.Row === 1);
    let row2Seats = SeatListSearch.filter((seat) => seat.Row === 2);
    row2Seats = row2Seats.reverse();

    const renderSeatsInRows = (seats) => {
        const rows = [];
        let currentRow = [];

        seats.forEach((seat, index) => {
            currentRow.push(
                <div key={seat._id}
                    className={
                        seat.SeatCode === SelectedSeat.SeatCode
                            ? MYS.SeatItemMainSelected
                            : seat.Occupied
                                ? MYS.SeatItemOccupied
                                : MYS.SeatItemMain
                    }


                    onClick={() =>
                        seat.Occupied
                            ? null
                            : SeatSlected(seat)

                    }>
                    <div className={MYS.SeatItemMainA}>
                        <span style={{ fontWeight: 500, fontSize: '12px' }}>{seat.title}</span>
                        <small>Facing : {seat.Facing}</small>
                    </div>
                    <div className={MYS.SeatItemMainB}>
                        {seat.SeatCode}

                    </div>
                </div>
            );

            if ((index + 1) % 4 === 0 || index === seats.length - 1) {
                rows.push(
                    <div key={index / 4} style={{ display: 'flex', marginBottom: '0px' }}>
                        {currentRow}
                    </div>
                );
                currentRow = [];
            }
        });

        return rows;
    };




    return (
        <React.Fragment>

            <Button
                onClick={handleClickOpen}
                size="small"
                variant="outlined"
                startIcon={<AddTwoToneIcon fontSize="small" />}
            >
                Create Subscription
            </Button>
            <Dialog

                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <div className={MYS.TitleWithBackHeader}>
                    <div className={MYS.TitleWithBackHeaderA}>
                        <IconButton aria-label="cart" onClick={handleClose}>
                            <StyledBadge color="secondary" >
                                <LuArrowLeft />
                            </StyledBadge>
                        </IconButton>
                        <div>
                            <span>Create New Library Order & Subscription</span>
                        </div>
                    </div>
                </div>

                <div className={MYS.AddSubsBoxMian}>

                    <form onSubmit={CreateLibrarySubscription} >
                        <div className={MYS.AddSubsBoxMianPadding}>
                            <div className={MYS.BranchboxItem}>
                                {Loadingbranch ?
                                    <div>
                                        <Skeleton variant="rounded" width='100%' height={60} />
                                    </div> :
                                    <div>
                                        <div className={MYS.Inputlabletext}>
                                            <span>Step 1 : Select Branch</span>
                                        </div>
                                        <TextField
                                            label="Branch Code"
                                            defaultValue="Small"

                                            fullWidth
                                            id="search"
                                            value={searchQuery}
                                            onChange={handleSearchBranch}
                                        />
                                        <div>
                                            {BranchListSearch.length > 0 &&
                                                <div>
                                                    {BranchListSearch.map((item) => {
                                                        return <div className={MYS.Branchitemlist} hover key={item._id} onClick={() => BranchSlected(item)}>
                                                            <div className={MYS.BranchitemlistA}>
                                                                <span style={{ fontWeight: 'bold' }}>{item.name}</span>
                                                                <span style={{ fontSize: '12px' }}>Branch Code  : {item.BranchCode}</span>
                                                                <span style={{ fontSize: '12px' }}>{item.Address}</span>
                                                            </div>
                                                            <div className={MYS.BranchitemlistB}>
                                                                {item.BranchCode == BranchCode ?
                                                                    <div>
                                                                        <IconButton aria-label="cart">
                                                                            <StyledBadge color="secondary" >
                                                                                <FiCheckCircle />
                                                                            </StyledBadge>
                                                                        </IconButton>
                                                                    </div> :
                                                                    <div>
                                                                        <div>
                                                                            <IconButton aria-label="cart" >
                                                                                <StyledBadge color="secondary" >
                                                                                    <FiPlusCircle />
                                                                                </StyledBadge>
                                                                            </IconButton>
                                                                        </div>
                                                                    </div>

                                                                }

                                                            </div>
                                                        </div>
                                                    }

                                                    )}
                                                </div>

                                            }

                                        </div>
                                    </div>
                                }
                                <div style={{ height: '20px' }}></div>
                                {ShowUserBox &&
                                    <div>
                                        <div className={MYS.Inputlabletext}>
                                            <span>Step 2 : Enter User Mobile Number</span>
                                        </div>
                                        <div className={MYS.inputlogin}>
                                            <TextField
                                                required
                                                label="User Mobile Number"
                                                fullWidth
                                                value={UserMobile}
                                                onInput={e => setUserMobile(e.target.value)}
                                                onChange={Changeuser}
                                            />
                                        </div>
                                        <div style={{ marginTop: '10px' }}>
                                            {UserMobile.length == 10 &&
                                                <div>
                                                    {Loadinguser ?
                                                        <div>
                                                            <Skeleton variant="rounded" width='100%' height={60} />

                                                        </div> :
                                                        <div>
                                                            {UserData.length > 0 ?
                                                                <div>
                                                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                                        <span style={{ color: 'black', fontWeight: 'bold' }}>{UserData[0].name}</span>
                                                                        <div style={{ height: '5px' }}></div>
                                                                        <small style={{ color: '#58D68D' }}>{UserData[0].mobile}</small>
                                                                        <small style={{ color: '#58D68D' }}>{UserData[0].email}</small>
                                                                    </div>

                                                                </div> :
                                                                <div>
                                                                    <span style={{ color: 'red', fontWeight: 'bold' }}>User Not Found with this Mobile Number</span>
                                                                </div>


                                                            }




                                                        </div>
                                                    }
                                                </div>
                                            }
                                        </div>




                                    </div>

                                }
                                <div style={{ height: '20px' }}></div>
                                {PassBox &&
                                    <div>
                                        <div className={MYS.Inputlabletext}>
                                            <span>Step 3 : Select Subscription Pass</span>
                                        </div>

                                        <div style={{ marginTop: '10px' }}>
                                            <div>
                                                {LoadingPass ?
                                                    <div>
                                                        <Skeleton variant="rounded" width='100%' height={60} />

                                                    </div> :
                                                    <div>
                                                        {PassListSearch.length > 0 ?
                                                            <div>
                                                                {PassListSearch.map((item) => {
                                                                    return <div className={MYS.Branchitemlist} hover key={item._id} onClick={() => item.passid !== passid ? PassSlected(item) : null}>
                                                                        <div className={MYS.BranchitemlistA}>
                                                                            <span style={{ fontWeight: 'bold', }}>{item.title}</span>
                                                                            <small style={{ fontSize: '12px' }}>Pass ID  : {item.passid}</small>
                                                                            <span style={{ fontSize: '12px' }}>Validity  : {item.Validity} days</span>
                                                                            <span style={{ fontSize: '12px' }}>{item.details}</span>
                                                                        </div>
                                                                        <div className={MYS.BranchitemlistB}>
                                                                            {item.passid == passid ?
                                                                                <div>
                                                                                    <IconButton aria-label="cart">
                                                                                        <StyledBadge color="secondary" >
                                                                                            <FiCheckCircle />
                                                                                        </StyledBadge>
                                                                                    </IconButton>
                                                                                </div> :
                                                                                <div>
                                                                                    <div>
                                                                                        <IconButton aria-label="cart" >
                                                                                            <StyledBadge color="secondary" >
                                                                                                <FiPlusCircle />
                                                                                            </StyledBadge>
                                                                                        </IconButton>
                                                                                    </div>
                                                                                </div>

                                                                            }

                                                                        </div>
                                                                    </div>
                                                                }

                                                                )}

                                                            </div> :
                                                            <div>
                                                                <span style={{ color: 'red', fontWeight: 'bold' }}>0 Subscription Pass Found</span>
                                                            </div>


                                                        }




                                                    </div>
                                                }
                                            </div>
                                        </div>




                                    </div>
                                }
                                <div style={{ height: '20px' }}></div>
                                {ShiftBox &&
                                    <div>
                                        <div className={MYS.Inputlabletext}>
                                            <span>Step 4 : Select Library Shift</span>
                                        </div>

                                        <div style={{ marginTop: '10px' }}>
                                            <div>
                                                {LoadingShift ?
                                                    <div>
                                                        <Skeleton variant="rounded" width='100%' height={60} />

                                                    </div> :
                                                    <div>
                                                        {ShiftListSearch.length > 0 ?
                                                            <div>
                                                                {ShiftListSearch.map((item) => {
                                                                    return <div className={MYS.Branchitemlist} hover key={item._id} onClick={() => item.Shiftid !== Shiftid ? ShiftSlected(item) : null}>
                                                                        <div className={MYS.BranchitemlistA}>
                                                                            <span style={{ fontWeight: 'bold', }}>{item.title}</span>
                                                                            <small style={{ fontSize: '12px' }}>Shift ID  : {item.Shiftid}</small>
                                                                            <span style={{ fontSize: '12px' }}>Timing  : {item.uptime} - {item.downtime}</span>
                                                                            <span style={{ fontSize: '12px' }}>Price Per Day : <del>  ₹{item.mprice} </del> <span style={{ fontWeight: 600, marginLeft: '5px' }}> ₹{item.sprice}</span></span>
                                                                            <span style={{ fontSize: '12px' }}>Price by Pass : <del>  ₹{parseInt(item.mprice) * PassListSearch[0].Validity} </del> <span style={{ fontWeight: 600, marginLeft: '5px' }}> ₹{parseInt(item.sprice) * PassListSearch[0].Validity}</span>( for {PassListSearch[0].Validity} days )</span>
                                                                            <span style={{ fontSize: '12px' }}>{item.details}</span>
                                                                        </div>
                                                                        <div className={MYS.BranchitemlistB}>
                                                                            {item.Shiftid == Shiftid ?
                                                                                <div>
                                                                                    <IconButton aria-label="cart">
                                                                                        <StyledBadge color="secondary" >
                                                                                            <FiCheckCircle />
                                                                                        </StyledBadge>
                                                                                    </IconButton>
                                                                                </div> :
                                                                                <div>
                                                                                    <div>
                                                                                        <IconButton aria-label="cart" >
                                                                                            <StyledBadge color="secondary" >
                                                                                                <FiPlusCircle />
                                                                                            </StyledBadge>
                                                                                        </IconButton>
                                                                                    </div>
                                                                                </div>

                                                                            }

                                                                        </div>
                                                                    </div>
                                                                }

                                                                )}

                                                            </div> :
                                                            <div>
                                                                <span style={{ color: 'red', fontWeight: 'bold' }}>0 Subscription Pass Found</span>
                                                            </div>


                                                        }




                                                    </div>
                                                }
                                            </div>
                                        </div>




                                    </div>
                                }
                                <div style={{ height: '20px' }}></div>
                                {SeatBox &&
                                    <div>
                                        <div className={MYS.Inputlabletext}>
                                            <span>Step 5 : Select Seat from Avaliable Seats</span>
                                        </div>

                                        <div style={{ marginTop: '10px' }}>
                                            <div>
                                                {LoadingSeats ?
                                                    <div>
                                                        <Skeleton variant="rounded" width='100%' height={60} />

                                                    </div> :
                                                    <div>

                                                        <div style={{ height: '20px' }}></div>
                                                        <div className={MYS.MainSeatBox}>
                                                            <div className={MYS.SeatBoxLayout}>

                                                                <div className={MYS.SeatBlock1}>
                                                                    <div>
                                                                        <small style={{ fontSize: '10px' }}> BLOCK 2</small>
                                                                        {renderSeatsInRows(row2Seats)}
                                                                    </div>
                                                                </div>
                                                                <div className={MYS.SeatBlock2}>
                                                                    <div className={MYS.SeatBlock2A}>

                                                                    </div>
                                                                    <div className={MYS.SeatBlock2B}>
                                                                        <small style={{ fontSize: '10px' }}> BLOCK 1</small>


                                                                        {renderSeatsInRows(row1Seats)}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>





                                                    </div>
                                                }
                                            </div>
                                        </div>




                                    </div>
                                }
                                <div style={{ height: '20px' }}></div>
                                {AddonsBox &&
                                    <div>
                                        <div className={MYS.Inputlabletext}>
                                            <span>Step 5 : Add Library Addons (Optional)</span>
                                        </div>

                                        <div style={{ marginTop: '10px' }}>
                                            <div>
                                                {LoadingAddons ?
                                                    <div>
                                                        <Skeleton variant="rounded" width='100%' height={60} />

                                                    </div> :
                                                    <div>
                                                        {AddonsListSearch.length > 0 ?
                                                            <div>
                                                                {AddonsListSearch.map((item) => {
                                                                    return <div className={MYS.Addonlist} hover key={item._id} onClick={() => SelectedAddon(item)}>
                                                                        <div className={MYS.BranchitemlistA}>
                                                                            <span style={{ fontWeight: 'bold', }}>{item.title}</span>


                                                                            <span style={{ fontSize: '12px' }}>Price : <del>  ₹{item.mprice} </del> <span style={{ fontWeight: 600, marginLeft: '5px' }}> ₹{item.sprice}</span></span>

                                                                            <span style={{ fontSize: '12px' }}>{item.details}</span>
                                                                        </div>
                                                                        <div className={MYS.BranchitemlistB}>
                                                                            <LoadingButton
                                                                                fullWidth
                                                                                size='small'
                                                                                color={selectedItems.some((p) => p._id === item._id) ? 'error' : 'primary'}
                                                                                endIcon={selectedItems.some((p) => p._id === item._id) ? <FiX /> : <FiPlus />}
                                                                                loading={false}
                                                                                loadingPosition="end"
                                                                                variant="outlined"

                                                                            >


                                                                                {selectedItems.some((p) => p._id === item._id) ? 'Remove' : 'Add'}
                                                                            </LoadingButton>

                                                                        </div>
                                                                    </div>
                                                                }

                                                                )}

                                                            </div> :
                                                            <div>
                                                                <span style={{ color: 'red', fontWeight: 'bold' }}>0 Addons Found</span>
                                                            </div>


                                                        }




                                                    </div>
                                                }
                                            </div>
                                        </div>




                                    </div>
                                }
                                <div style={{ height: '20px' }}></div>
                                {PricingBox &&
                                    <div>
                                        <div className={MYS.Inputlabletext}>
                                            <span>Step 6 : Pricing and Discount</span>
                                        </div>
                                        <div style={{ fontWeight: 600 }}>
                                            Total Price :
                                        </div>
                                        <div className={MYS.inputlogin}>
                                            <TextField
                                                required
                                                label=" ₹ Price"

                                                value={MainPrice}


                                            />
                                        </div>
                                        <div style={{ height: '10px' }}></div>
                                        <div style={{ fontWeight: 600 }}>
                                            Total Sale Amount :
                                        </div>
                                        <div className={MYS.inputlogin}>
                                            <TextField
                                                required
                                                label=" ₹ Price"

                                                value={Totalamt}
                                                onInput={e => setTotalamt(e.target.value)}
                                                onChange={OnchangeTotalAmtFunction}

                                            />
                                        </div>
                                        <div style={{ height: '10px' }}></div>
                                        <div style={{ fontWeight: 600 }}>
                                            Total Discount :
                                        </div>
                                        <div className={MYS.inputlogin}>
                                            <TextField
                                                required
                                                label=" ₹ Discount"

                                                value={Discount}

                                            // onChange={Changeuser}
                                            />
                                        </div>
                                        <div style={{ height: '10px' }}></div>
                                        <div>
                                        <div style={{ height: '10px' }}></div>
                                        <span>Validity Start Date : </span>
                                        <div style={{ height: '10px' }}></div>

                                            <input className={MYS.DatepikerCustom} type='date' 
                                            value={DateValue} 
                                          
                                            onInput={e => setDateValue(e.target.value)}
                                            />


                                        </div>
                                        <div style={{ height: '20px' }}></div>

                                        <LoadingButton

                                            onClick={CreateLibrarySubscription}
                                            endIcon={<FiChevronRight />}
                                            loading={Btnloading}
                                            loadingPosition="end"
                                            variant="contained"
                                        >
                                            <span>Add Pass Subscription</span>
                                        </LoadingButton>




                                    </div>
                                }

                            </div>


                            <div style={{ minHeight: 25 }}></div>

                        </div>







                    </form>


                </div>



            </Dialog>
        </React.Fragment>
    );
}