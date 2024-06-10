import { useState, useEffect, useContext } from 'react';

import Head from 'next/head';
import CheckloginContext from '/context/auth/CheckloginContext'
import SidebarLayout from 'src/layouts/SidebarLayout';
import MYS from '/Styles/mystyle.module.css'
import { useRouter, useParams } from 'next/router'

import Image from 'next/image'

import LoadingButton from '@mui/lab/LoadingButton';
import { LuArrowRight } from "react-icons/lu";
import DbTopBox from './DbTopBox'

import Badge from '@mui/material/Badge';

import {
  styled,
} from '@mui/material';
const WebAllData = () => {
  const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';
  const router = useRouter()

  const Contextdata = useContext(CheckloginContext)
  const [AllData, setAllData] = useState(null);
  const [CounterLoading, setCounterLoading] = useState(true);
  const GetData = async () => {
    const dataid = '08c5th4rh86ht57h6g';
    const sendUM = {}
    const data = await fetch("/api/V3/Library/WebAllData", {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(sendUM)
    }).then((a) => {
      return a.json();
    })
      .then((parsed) => {
        if (parsed.ReqData) {
          setAllData(parsed.ReqData)
          console.log(parsed)
          setCounterLoading(false);
        }

      })
  }


  useEffect(() => {
    GetData()
  }, [])
  return (
    <div>
      <DbTopBox AllData={AllData} />
      <div className={MYS.DbBox}>

        {AllData && AllData.SubSData == 0 &&
          <div className={MYS.WaringBox}>
            <div className={MYS.WaringBoxA}>
              <h2 style={{color:"red"}}>Your Websit is Offline</h2>
              You Don't Have Any Active Subscription Plan yet, please subscribe to a Plan to Avoid Data deletation.
              <div>
                <small>Data Will be Deleted After 10 Days of Last Plan Expiry. </small>
              </div>
            </div>
            <div className={MYS.WaringBoxB}>
              <LoadingButton
                size="small"
                fullWidth
                endIcon={<LuArrowRight />}
                onClick={() => router.push('/admin/buy-subscriptions')}
                loading={false}
                loadingPosition="end"
                variant="contained"
              >
                <span>Buy Plan</span>
              </LoadingButton>
            </div>
          </div>
        }

        <div className={MYS.BtnboxPage}>
          <div className={MYS.BtnboxPageA}>
            Credits Balance :  ₹ {AllData && AllData.Balance}
          </div>
          <div className={MYS.BtnboxPageB}>
            <LoadingButton
              endIcon={<LuArrowRight />}
              loading={false}
              loadingPosition="end"
              variant="contained"
              size='small'
              onClick={() => router.push('/admin/recharge')}
            >
              <span>Add Credit</span>
            </LoadingButton>
          </div>
        </div>



      </div>
    </div>
  )
}

export default WebAllData
