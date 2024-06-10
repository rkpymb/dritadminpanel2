import { useState, useEffect, useContext } from 'react';

import Head from 'next/head';
import CheckloginContext from '/context/auth/CheckloginContext'
import SidebarLayout from 'src/layouts/SidebarLayout';
import MYS from '/Styles/mystyle.module.css'
import { useRouter, useParams } from 'next/router'

import Badge from '@mui/material/Badge';
import Checklist from './Comp/Checklist'
import DbCounter from './Comp/DbCounter'
import WebAllData from './Comp/WebAllData'


import {
  styled,
} from '@mui/material';


function DashboardCrypto({ responseData }) {
  const router = useRouter()
  const [Loading, setLoading] = useState(true);
  const [ShowMain, setShowMain] = useState(false);
  const Contextdata = useContext(CheckloginContext)
  
 
  const ShowMainData = async () => {
    setShowMain(true);

  }
  useEffect(() => {
    console.log(responseData)
    if (Contextdata.WebData !== null) {
      if (Contextdata.WebData.length == 0) {
        router.push('/admin/create-website')
      } else {
        setLoading(false)
       
      }

    }

  }, [Contextdata.WebData])


  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }));
  return (
    <>
      <Head>
        <title>Admin Dashboard</title>
      </Head>
      <div className={MYS.marginTopMain}>
       

        {!ShowMain && !Loading?
          <div>
            <div className={MYS.MB}>
            <Checklist ShowMainData={ShowMainData} />

            </div>
           
          </div> :
          <div>
           
            <WebAllData/>
            <DbCounter/>
            
          </div>


        }




      </div>
    </>
  );
}

DashboardCrypto.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardCrypto;
