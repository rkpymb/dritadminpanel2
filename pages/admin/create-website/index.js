import React, { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import CheckloginContext from '/context/auth/CheckloginContext'
import SidebarLayout from 'src/layouts/SidebarLayout';
import MYS from '/Styles/mystyle.module.css'
import { useRouter, useParams } from 'next/router'

import CreateWebsite from '../../components/Admin/Add/CreateWebsite'


import Badge from '@mui/material/Badge';

import * as animationData from '/Data/Lottie/webappanima.json'

import Lottie from 'react-lottie'


import {
 
  styled,
  
} from '@mui/material';
function DashboardCrypto() {
  const Contextdata = useContext(CheckloginContext)
 
  const [initialData, setInitialData] = useState([]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const router = useRouter()




  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }


  return (
    <>
      <Head>
        <title>Get Started : Create App</title>
      </Head>

      <div className={MYS.marginTopMain}>
        <div className={MYS.MB}>
          <div className={MYS.MBFlex}>
            <div className={MYS.MBFlexA}>
              <div>
                <h1>Create Your <span className={MYS.primaryColor}>Free Website</span> 🎉 </h1>
                <span>Let's Create your first Web App for free, manage your Library and Study Center With Seamless Experience</span>
              </div>
              <div style={{height:"30px"}}></div>
              <CreateWebsite />
            </div>
            <div className={MYS.MBFlexB}>
              <Lottie options={defaultOptions}
                height={300}
                width={null}

                isStopped={false}
                isPaused={false} />
            
            </div>
          </div>
        </div>


      </div>
    </>
  );
}

DashboardCrypto.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardCrypto;
