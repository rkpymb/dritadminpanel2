import { useState, useEffect, useContext } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import LoadingButton from '@mui/lab/LoadingButton';
import { LuChevronRight, LuArrowLeft } from "react-icons/lu";
import Skeleton from '@mui/material/Skeleton';
import Badge from '@mui/material/Badge';

import * as paymentdoneAnimation from '/Data/Lottie/doneanim.json'

import Lottie from 'react-lottie'
import Image from 'next/image'

import { LuArrowRight } from "react-icons/lu";

import { useRouter, useParams } from 'next/router'
import MYS from '/Styles/mystyle.module.css'
import {

    IconButton,

    styled
} from '@mui/material';
export default function SimpleBackdrop({ Plan }) {
    const router = useRouter()
    const [open, setOpen] = useState(true);
    const [BtnLoading, setBtnLoading] = useState(false);
    const [StepA, setStepA] = useState(true);
    const [DoneOrder, setDoneOrder] = useState(false);
    const [Loading, setLoading] = useState(true);
    const [Balance, setBalance] = useState(0);
    const [PayCredit, setPayCredit] = useState(0);
    const [Validity, setValidity] = useState(0);
    const [PlanTitle, setPlanTitle] = useState('');
    const [Discount, setDiscount] = useState(0);
    const [Mprice, setMprice] = useState(0);
    const [Sprice, setSprice] = useState(0);

    const PayDone = {
        loop: false,
        autoplay: true,
        animationData: paymentdoneAnimation,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    }


    const CreateOrder = async () => {
        console.log(Plan);
        try {
            setBtnLoading(true)
            const sendUM = {

                PlanID: Plan.PlanID,


            }
            const data = await fetch("/api/V3/Admin/buy-subscription/CreateOrderPlan", {
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

                        setTimeout(function () {
                            setStepA(false);
                            setDoneOrder(true);
                            setBtnLoading(false)
                        }, 2000);


                    }
                    if (parsed.ReqD.error) {
                        setBtnLoading(false)
                        alert(parsed.ReqD.error)

                    }


                })
        } catch (error) {
            console.log(error)
            alert('Something went Wrong, please try again')
            setBtnLoading(false)

        }


    };

    const GetData = async () => {

        const sendUM = {

        };

        try {
            const response = await fetch("/api/V3/Admin/Credit/CreditBalance", {
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

                if (parsed.ReqD.Balance) {
                    setBalance(parsed.ReqD.Balance)

                }
                setTimeout(function () {
                    setLoading(false)
                }, 2000);
            }
        } catch (error) {
            console.error('Error fetching data:', error);

        }
    };


    useEffect(() => {
        console.log(Plan)
        setSprice(Plan.Sprice)
        setMprice(Plan.Mprice)
        setPayCredit(Plan.Sprice)
        setPlanTitle(Plan.Title)
        setValidity(Plan.Validity)
        setDiscount(Plan.Mprice - Plan.Sprice)

        GetData()

    }, [])


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

            <Backdrop
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}

            >

                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>


                    <div className={MYS.PGDilogBox}>
                        {StepA &&

                            <div>
                                {!Loading &&
                                    <div className={MYS.TitleWithBackHeaderA}>
                                        <IconButton aria-label="cart" onClick={() => router.back()}>
                                            <StyledBadge color="secondary" >
                                                <LuArrowLeft />
                                            </StyledBadge>
                                        </IconButton>
                                        <div>
                                            <span>Pay using Credits</span>
                                        </div>
                                    </div>
                                }

                                {Loading ?
                                    <div className={MYS.CreditBBoxPbox}>

                                        <Skeleton variant="text" width={'100%'} sx={{ fontSize: '1rem' }} />
                                        <div style={{ height: "2px" }}></div>
                                        <Skeleton variant="text" width={'50%'} sx={{ fontSize: '1rem' }} />
                                        <div style={{ height: "15px" }}></div>
                                        <Skeleton variant="text" width={'50px'} sx={{ fontSize: '2rem' }} />
                                    </div> :
                                    <div className={MYS.CreditBBoxPbox} >

                                        <div style={{ height: "10px" }}></div>
                                        <div className={MYS.CreditBBox}>
                                            <div className={MYS.CreditBBoxA}>
                                                <span>Credit Balance</span>
                                            </div>
                                            <div className={MYS.CreditBBoxB}>
                                                ₹ {Balance}
                                            </div>
                                        </div>
                                        <div style={{ height: "20px" }}></div>
                                        <div className={MYS.InvBox}>

                                            <div className={MYS.InvBoxItem}>
                                                <div className={MYS.InvBoxItemA}>
                                                    <span>Plan</span>
                                                </div>
                                                <div className={MYS.InvBoxItemB}>
                                                    {PlanTitle}
                                                </div>
                                            </div>
                                            <div className={MYS.InvBoxItem}>
                                                <div className={MYS.InvBoxItemA}>
                                                    <span>Validity</span>
                                                </div>
                                                <div className={MYS.InvBoxItemB}>
                                                    {Validity} Days
                                                </div>
                                            </div>
                                            <div className={MYS.InvBoxItem}>
                                                <div className={MYS.InvBoxItemA}>
                                                    <span>Price</span>
                                                </div>
                                                <div className={MYS.InvBoxItemB}>
                                                    ₹ {Mprice}
                                                </div>
                                            </div>
                                            <div className={MYS.InvBoxItem}>
                                                <div className={MYS.InvBoxItemA}>
                                                    <span>Discount</span>
                                                </div>
                                                <div className={MYS.InvBoxItemB}>
                                                    - ₹ {Discount}
                                                </div>
                                            </div>
                                            <div className={MYS.InvBoxItem}>
                                                <div className={MYS.InvBoxItemA}>
                                                    <span>Total</span>
                                                </div>
                                                <div className={MYS.InvBoxItemB}>
                                                    ₹ {PayCredit}
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{ height: "20px" }}></div>
                                        {Balance < PayCredit ?

                                            <div>
                                                <div className={MYS.BtnboxPageB}>
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

                                                <div className={MYS.PassOrdermsg}>
                                                    <span> ⚠️ ₹ Insufficient Credit Wallet Balance </span>
                                                </div>

                                            </div> :
                                            <div>
                                                <div className={MYS.BtnboxPageB}>
                                                    <LoadingButton
                                                        endIcon={<LuChevronRight />}
                                                        loading={BtnLoading}
                                                        disabled={BtnLoading}
                                                        loadingPosition="end"
                                                        variant="contained"
                                                        fullWidth
                                                        onClick={CreateOrder}
                                                    >
                                                        <span>Pay  Now</span>
                                                    </LoadingButton>
                                                </div>

                                                <div className={MYS.PassOrdermsg}>
                                                    <span> ℹ️ ₹ {PayCredit} will be used form your Credit Wallet </span>
                                                </div>

                                            </div>


                                        }

                                    </div>

                                }

                            </div>

                        }

                        {DoneOrder &&

                            <div>
                                <div className={MYS.OrderDoneb}>
                                    <div className={MYS.OrderDonebLott} >

                                        <Lottie options={PayDone}
                                            height={null}
                                            width={'100%'}
                                            isStopped={false}
                                            isPaused={false} />

                                    </div>

                                    <div className={MYS.OrderDoneboxFooter}>
                                        <div className={MYS.OrderDoneboxText}>
                                            <h1>Subscriptions Succesfully Added</h1>
                                            <span>Congratulations! Your subscriptions have been successfully added. Now it will be easier for you to access your favorite services and updates. Keep enjoying!</span>
                                        </div>
                                        <div style={{ height: '10px' }}></div>
                                        <LoadingButton
                                            onClick={() =>
                                                router.push('/admin/my-subscription')
                                            }
                                            endIcon={<LuArrowRight />}

                                            loadingPosition="end"
                                            variant="contained"
                                        >
                                            <span>View Subscriptions</span>
                                        </LoadingButton>
                                    </div>


                                </div>
                            </div>
                        }


                    </div>
                </div>


            </Backdrop>
        </div>
    );
}
