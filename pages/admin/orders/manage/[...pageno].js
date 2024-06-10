import { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import SidebarLayout from 'src/layouts/SidebarLayout';
import MYS from '/Styles/mystyle.module.css'
import { Container, Grid } from '@mui/material';

import { LuArrowLeft } from "react-icons/lu";
import Badge from '@mui/material/Badge';
import { useRouter, useParams } from 'next/router'
import CheckloginContext from '/context/auth/CheckloginContext'
import Skeleton from '@mui/material/Skeleton';

import TitleNav from '/src/components/Parts/TitleNav'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
import Select from '@mui/material/Select';


import {
    IconButton,

    styled,
    TextField,

} from '@mui/material';


export async function getServerSideProps(context) {
    const OrderMainId = context.query.pageno[0];
    return {
        props: { OrderMainId },
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

function DashboardCrypto({ OrderMainId }) {
    const Contextdata = useContext(CheckloginContext)
    const router = useRouter()

    const [IsLoading, setIsLoading] = useState(true);

    const [Mprice, setMprice] = useState('');



    const [TotalDiscount, setTotalDiscount] = useState('');
    const [Total, setTotal] = useState('');
    const [Validity, setValidity] = useState('');
    const [Transitionsid, setTransitionsid] = useState('');
    const [PaymentRefid, setPaymentRefid] = useState('');
    const [OrderStatusText, setOrderStatusText] = useState('');
    const [PayStatusText, setPayStatusText] = useState('');

    const [Btnloading, setBtnloading] = useState(false);
    const [ShowVideo, setShowVideo] = useState(false);
    const [OrderStatus, setOrderStatus] = useState(false);
    const [PayStatus, setPayStatus] = useState(false);
    const [OrderDataMain, setOrderDataMain] = useState({});


    const UpdateOrder = async (e) => {

        const sendUM = {

            amt: Total,
            TotalDiscount: TotalDiscount,
            Paymentid: Transitionsid,
            refid: PaymentRefid,

            OrderStatus: OrderStatus,
            PayStatus: PayStatus,
            OrderStatusText: OrderStatusText,
            PayStatusText: PayStatusText,
            validity: Validity,
            id: OrderDataMain._id,

        }
        const data = await fetch("/api/V3/Admin/Orders/UpdateSalesOrder", {
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
                if (parsed.ReqData.done) {
                    alert('Order Updpated Successfully')

                    router.push(`/admin/orders/manage/${OrderMainId}`)
                } else {
                    alert(parsed.ReqData.message)

                }


            })
    }

    const handleChangeVideoStatus = (event) => {
        setVideoStatus(event.target.value);

    };
    useEffect(() => {
        GetOrderData()
    }, [router.query])


    const GetOrderData = async () => {
        const sendUM = { id: OrderMainId, JwtToken: Contextdata.JwtToken }
        const data = await fetch("/api/V3/Data/GetOrderData", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => {
            return a.json();
        })
            .then((parsed) => {
                if (parsed.ReqData.OrderData) {
                    if (parsed.ReqData.OrderData.length == 1) {
                        console.log(parsed.ReqData.OrderData[0])
                        setOrderDataMain(parsed.ReqData.OrderData[0])
                        setMprice(parsed.ReqData.OrderData[0].mprice)
                        setTotalDiscount(parsed.ReqData.OrderData[0].TotalDiscount)
                        setTotal(parsed.ReqData.OrderData[0].amt)
                        setValidity(parsed.ReqData.OrderData[0].validity)
                        setPaymentRefid(parsed.ReqData.OrderData[0].refid)
                        setTransitionsid(parsed.ReqData.OrderData[0].Paymentid)
                        setPayStatus(parsed.ReqData.OrderData[0].PayStatus)
                        setOrderStatus(parsed.ReqData.OrderData[0].OrderStatus)
                        setOrderStatusText(parsed.ReqData.OrderData[0].OrderStatusText)
                        setPayStatusText(parsed.ReqData.OrderData[0].PayStatusText)
                        setIsLoading(false)

                    } else {
                        alert('Something Went Worng')
                    }
                }


            })
    }


    const handleChangeOrderStatus = (event) => {
        setOrderStatus(event.target.value);
        if (event.target.value === true) {
            setOrderStatusText('Order Completed');
        } else {
            setOrderStatusText('Order Not Completed');
        }

    };
    const handleChangePayStatus = (event) => {
        setPayStatus(event.target.value);
        if (event.target.value === true) {
            setPayStatusText('Amount Paid');
        } else {
            setPayStatusText('Amount Not Paid');
        }
    };
    const ChangeDiscount = (event) => {
        setOrderStatus(event.target.value);
        setTotal(Mprice - event.target.value)
    };


    return (
        <>


            <TitleNav Title={OrderDataMain && OrderDataMain.Orderid} />

            <div className={MYS.MboxMain}>
                <div className={MYS.OrderBox}>
                    <div className={MYS.OrderBoxGrid}>
                        <div className={MYS.OrderBoxGridItem}>
                            <div className={MYS.OrderBoxGridItemTitle}>
                                <span>Order Details</span>
                            </div>
                            <div className={MYS.OrderBoxData}>
                                <div className={MYS.OrdedetailsItem}>
                                    <div className={MYS.OrdedetailsItemA}>
                                        <span>Order ID</span>
                                    </div>
                                    <div className={MYS.OrdedetailsItemB}>
                                        <span> {OrderDataMain && OrderDataMain.Orderid}</span>
                                    </div>

                                </div>
                                <div className={MYS.OrdedetailsItem}>
                                    <div className={MYS.OrdedetailsItemA}>
                                        <span>Order Title</span>
                                    </div>
                                    <div className={MYS.OrdedetailsItemB}>
                                        <span> {OrderDataMain && OrderDataMain.Mprice}</span>
                                    </div>

                                </div>
                                <div className={MYS.OrdedetailsItem}>
                                    <div className={MYS.OrdedetailsItemA}>
                                        <span>Order Type</span>
                                    </div>
                                    <div className={MYS.OrdedetailsItemB}>
                                        <span> {OrderDataMain && OrderDataMain.ProductType}</span>
                                    </div>

                                </div>
                                <div className={MYS.OrdedetailsItem}>
                                    <div className={MYS.OrdedetailsItemA}>
                                        <span>Order by</span>
                                    </div>
                                    <div className={MYS.OrdedetailsItemB}>
                                        <span> {OrderDataMain && OrderDataMain.usermob}</span>
                                    </div>

                                </div>
                                <div className={MYS.OrdedetailsItem}>
                                    <div className={MYS.OrdedetailsItemA}>
                                        <span>Order Date / Time</span>
                                    </div>
                                    <div className={MYS.OrdedetailsItemB}>
                                        <span> {OrderDataMain && OrderDataMain.date}</span>,  <span> {OrderDataMain && OrderDataMain.time}</span>
                                    </div>

                                </div>
                                <div className={MYS.OrdedetailsItem}>
                                    <div className={MYS.OrdedetailsItemA}>
                                        <span>Price</span>
                                    </div>
                                    <div className={MYS.OrdedetailsItemB}>
                                        <span> ₹{OrderDataMain && OrderDataMain.mprice}</span>
                                    </div>

                                </div>
                                <div className={MYS.OrdedetailsItem}>
                                    <div className={MYS.OrdedetailsItemA}>
                                        <span>TotalDiscount</span>
                                    </div>
                                    <div className={MYS.OrdedetailsItemB}>
                                        <span> ₹{OrderDataMain && OrderDataMain.TotalDiscount}</span>
                                    </div>

                                </div>
                                <div className={MYS.OrdedetailsItem}>
                                    <div className={MYS.OrdedetailsItemA}>
                                        <span>Total</span>
                                    </div>
                                    <div className={MYS.OrdedetailsItemB}>
                                        <span> ₹{OrderDataMain && OrderDataMain.amt}</span>
                                    </div>

                                </div>

                                <div className={MYS.OrdedetailsItem}>
                                    <div className={MYS.OrdedetailsItemA}>
                                        <span>Order Status</span>
                                    </div>
                                    <div className={MYS.OrdedetailsItemB}>
                                        <span> {OrderDataMain && OrderDataMain.OrderStatusText}</span>
                                    </div>

                                </div>
                                <div className={MYS.OrdedetailsItem}>
                                    <div className={MYS.OrdedetailsItemA}>
                                        <span>Payment Status</span>
                                    </div>
                                    <div className={MYS.OrdedetailsItemB}>
                                        <span> {OrderDataMain && OrderDataMain.PayStatusText}</span>
                                    </div>

                                </div>
                                <div className={MYS.OrdedetailsItem}>
                                    <div className={MYS.OrdedetailsItemA}>
                                        <span>Payment Ref id</span>
                                    </div>
                                    <div className={MYS.OrdedetailsItemB}>
                                        <span> {OrderDataMain && OrderDataMain.refid}</span>
                                    </div>

                                </div>
                                <div className={MYS.OrdedetailsItem}>
                                    <div className={MYS.OrdedetailsItemA}>
                                        <span>Transitions id</span>
                                    </div>
                                    <div className={MYS.OrdedetailsItemB}>
                                        <span> {OrderDataMain && OrderDataMain.Paymentid}</span>
                                    </div>
                                </div>
                                <div className={MYS.OrdedetailsItem}>
                                    <div className={MYS.OrdedetailsItemA}>
                                        <span>Subscription Validity</span>
                                    </div>
                                    <div className={MYS.OrdedetailsItemB}>
                                        <span> {OrderDataMain && OrderDataMain.validity}</span>
                                    </div>
                                </div>

                            </div>



                        </div>
                        <div className={MYS.OrderBoxGridItem}>

                            <div className={MYS.OrderBoxGridItemTitle}>
                                <span>Edit Order and Subscription</span>
                            </div>
                            <div className={MYS.EdiOrderBox}>
                                <form onSubmit={UpdateOrder} >
                                    <div className={MYS.inputlogin}>
                                        <TextField
                                            required
                                            label="Price"
                                            fullWidth
                                            type='Number'
                                            value={Mprice}


                                        />
                                    </div>
                                    <div className={MYS.inputlogin}>
                                        <TextField
                                            required
                                            label="TotalDiscount"
                                            fullWidth
                                            type='Number'
                                            value={TotalDiscount}
                                            onInput={e => setTotalDiscount(e.target.value)}
                                            onChange={ChangeDiscount}

                                        />
                                    </div>
                                    <div className={MYS.inputlogin}>
                                        <TextField
                                            required
                                            label="Total"
                                            fullWidth
                                            type='Number'
                                            value={Total}
                                            onInput={e => setTotal(e.target.value)}

                                        />
                                    </div>

                                    <div className={MYS.inputlogin}>
                                        <TextField
                                            required
                                            label="Subscription Validity End Date"
                                            fullWidth

                                            value={Validity}
                                            onInput={e => setValidity(e.target.value)}

                                        />
                                    </div>
                                    <div className={MYS.inputlogin}>
                                        <TextField
                                            required
                                            label="Transitions id"
                                            fullWidth

                                            value={Transitionsid}
                                            onInput={e => setTransitionsid(e.target.value)}

                                        />
                                    </div>
                                    <div className={MYS.inputlogin}>
                                        <TextField
                                            required
                                            label="Payment Ref. id"
                                            fullWidth

                                            value={PaymentRefid}
                                            onInput={e => setPaymentRefid(e.target.value)}

                                        />
                                    </div>
                                    <div className={MYS.inputlogin}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Order Status</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={OrderStatus}
                                                label="Status"
                                                onChange={handleChangeOrderStatus}
                                            >

                                                <MenuItem value={true}>Completed</MenuItem>
                                                <MenuItem value={false}>Not Completed</MenuItem>

                                            </Select>
                                        </FormControl>
                                    </div>
                                    <div className={MYS.inputlogin}>
                                        <TextField
                                            required
                                            label="Order Status Remark"
                                            fullWidth

                                            value={OrderStatusText}
                                            onInput={e => setOrderStatusText(e.target.value)}

                                        />
                                    </div>
                                    <div className={MYS.inputlogin}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Payment Status</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={PayStatus}
                                                label="Status"
                                                onChange={handleChangePayStatus}
                                            >

                                                <MenuItem value={true}>Paid</MenuItem>
                                                <MenuItem value={false}>Not Paid</MenuItem>


                                            </Select>
                                        </FormControl>
                                    </div>
                                    <div className={MYS.inputlogin}>
                                        <TextField
                                            required
                                            label="Payment Status Remark"
                                            fullWidth

                                            value={PayStatusText}
                                            onInput={e => setPayStatusText(e.target.value)}

                                        />
                                    </div>
                                    <div style={{ minHeight: 25 }}></div>
                                    <LoadingButton
                                        size="small"
                                        onClick={UpdateOrder}

                                        loading={Btnloading}
                                        loadingPosition="end"
                                        variant="contained"
                                    >
                                        <span>Update Order</span>
                                    </LoadingButton>


                                    <div style={{ minHeight: 25 }}></div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

DashboardCrypto.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardCrypto;
