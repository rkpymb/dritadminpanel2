import { useState, useEffect, useContext } from 'react';

import Head from 'next/head';
import CheckloginContext from '/context/auth/CheckloginContext'
import SidebarLayout from 'src/layouts/SidebarLayout';
import MYS from '/Styles/mystyle.module.css'
import { useRouter, useParams } from 'next/router'

import Image from 'next/image'

import Badge from '@mui/material/Badge';

import {
  styled,
} from '@mui/material';
const DbCounter = () => {
  const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';
  const router = useRouter()

  const Contextdata = useContext(CheckloginContext)
  const [CounterData, setCounterData] = useState(null);
  const [CounterLoading, setCounterLoading] = useState(true);
  const GetData = async () => {
    const dataid = '08c5th4rh86ht57h6g';
    const sendUM = {}
    const data = await fetch("/api/V3/Library/DbMianCounter", {
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
          setCounterData(parsed.ReqData)
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
      <div className={MYS.DbBox}>
        {!CounterLoading &&
          <div className={MYS.MainCounterGrid}>
            <div className={MYS.DashboardCounterItem}>
              <div className={MYS.DashboardCounterItemA}>
                <span>{CounterData.Branches}</span>
                <small>Branches</small>
              </div>
              <div className={MYS.DashboardCounterItemB}>
                <Image
                  layout="responsive"
                  placeholder='blur'

                  quality={100}
                  blurDataURL={blurredImageData}
                  src='/img/branch.png' alt='im' height='50' width='50' />
              </div>
            </div>
            <div className={MYS.DashboardCounterItem}>
              <div className={MYS.DashboardCounterItemA}>
                <span>{CounterData.Users}</span>
                <small>Total Users</small>
              </div>
              <div className={MYS.DashboardCounterItemB}>
                <Image
                  layout="responsive"
                  placeholder='blur'

                  quality={100}
                  blurDataURL={blurredImageData}
                  src='/img/team.png' alt='im' height='50' width='50' />
              </div>
            </div>

            <div className={MYS.DashboardCounterItem}>
              <div className={MYS.DashboardCounterItemA}>
                <span>{CounterData.LibraryAddonProducts}</span>
                <small>Addon Products</small>
              </div>
              <div className={MYS.DashboardCounterItemB}>
                <Image
                  layout="responsive"
                  placeholder='blur'

                  quality={100}
                  blurDataURL={blurredImageData}
                  src='/img/addon.png' alt='im' height='50' width='50' />
              </div>
            </div>
            <div className={MYS.DashboardCounterItem}>
              <div className={MYS.DashboardCounterItemA}>
                <span>{CounterData.Orders}</span>
                <small>Sales Orders</small>
              </div>
              <div className={MYS.DashboardCounterItemB}>
                <Image
                  layout="responsive"
                  placeholder='blur'

                  quality={100}
                  blurDataURL={blurredImageData}
                  src='/img/orders.png' alt='im' height='50' width='50' />
              </div>
            </div>
            <div className={MYS.DashboardCounterItem}>
              <div className={MYS.DashboardCounterItemA}>
                <span>{CounterData.LibrarySubs}</span>
                <small>Total Library Subscriptions</small>
              </div>
              <div className={MYS.DashboardCounterItemB}>
                <Image
                  layout="responsive"
                  placeholder='blur'

                  quality={100}
                  blurDataURL={blurredImageData}
                  src='/img/subscription.png' alt='im' height='50' width='50' />
              </div>
            </div>
            <div className={MYS.DashboardCounterItem}>
              <div className={MYS.DashboardCounterItemA}>
                <span>{CounterData.LibraryAddonSubs}</span>
                <small>Total Addon Subscriptions</small>
              </div>
              <div className={MYS.DashboardCounterItemB}>
                <Image
                  layout="responsive"
                  placeholder='blur'

                  quality={100}
                  blurDataURL={blurredImageData}
                  src='/img/renewal.png' alt='im' height='50' width='50' />
              </div>
            </div>
            <div className={MYS.DashboardCounterItem}>
              <div className={MYS.DashboardCounterItemA}>
                <span>{CounterData.TotalAttendance}</span>
                <small>Total Attendance</small>
              </div>
              <div className={MYS.DashboardCounterItemB}>
                <Image
                  layout="responsive"
                  placeholder='blur'

                  quality={100}
                  blurDataURL={blurredImageData}
                  src='/img/attendance.png' alt='im' height='50' width='50' />
              </div>
            </div>
            <div className={MYS.DashboardCounterItem}>
              <div className={MYS.DashboardCounterItemA}>
                <span>{CounterData.Shifts}</span>
                <small>Total Shifts</small>
              </div>
              <div className={MYS.DashboardCounterItemB}>
                <Image
                  layout="responsive"
                  placeholder='blur'

                  quality={100}
                  blurDataURL={blurredImageData}
                  src='/img/rotation.png' alt='im' height='50' width='50' />
              </div>
            </div>
            <div className={MYS.DashboardCounterItem}>
              <div className={MYS.DashboardCounterItemA}>
                <span>{CounterData.Seats}</span>
                <small>Total Seats</small>
              </div>
              <div className={MYS.DashboardCounterItemB}>
                <Image
                  layout="responsive"
                  placeholder='blur'

                  quality={100}
                  blurDataURL={blurredImageData}
                  src='/img/seat.png' alt='im' height='50' width='50' />
              </div>
            </div>




          </div>
        }

      </div>
    </div>
  )
}

export default DbCounter
