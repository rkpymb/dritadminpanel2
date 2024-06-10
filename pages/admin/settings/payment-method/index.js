import React, { useState, useEffect, useContext } from 'react';

import CheckloginContext from '/context/auth/CheckloginContext'
import Head from 'next/head';

import SidebarLayout from 'src/layouts/SidebarLayout';
import MYS from '/Styles/mystyle.module.css'


import { MediaFilesUrl, MediaFilesFolder } from '/Data/config'
import Button from '@mui/material/Button';

import TitleNav from '/src/components/Parts/TitleNav'
import { LuArrowRight, LuSettings } from "react-icons/lu";


import Badge from '@mui/material/Badge';

import {

  IconButton,

  styled
} from '@mui/material';
import Image from 'next/image'
import { useRouter, useParams } from 'next/router'
function DashboardCrypto() {
  const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';
  const Contextdata = useContext(CheckloginContext)
  const router = useRouter()
  const [PaymentMethods, setPaymentMethods] = useState([]);
  const [Loading, setLoading] = useState(true);
  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }));


  const GetData = async () => {



    const sendUM = {}
    const data = await fetch("/api/V3/Admin/PaymentMethods", {
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
          setPaymentMethods(parsed.ReqData.AllPM);

          setLoading(false)
        }

      })
  }


  useEffect(() => {
    GetData()
  }, [router.query]);

  return (
    <>
      <TitleNav Title={`Payment Methods`} />

      <div className={MYS.MboxMain}>
       
        <div className={MYS.PMGrid}>
              {PaymentMethods.map((item) => {
                return <div key={item._id} className={MYS.PMItemMain} onClick={() => router.push(`/admin/settings/payment-method/${item.PMModeID}/${item.PMTitle}`)}>
                  <div className={MYS.PMItem} >
                    <div className={MYS.PMItemA}>
                      <div className={MYS.PMItemAImg}>
                        <Image
                          src={`${MediaFilesUrl}${MediaFilesFolder}/${item.Logo}`}
                          alt="image"
                          layout="responsive"
                          placeholder='blur'
                          width={50}
                          height={50}
                          quality={100}
                          blurDataURL={blurredImageData}
                          objectFit='center'


                        />

                      </div>
                      <div className={MYS.PMTypeText}>

                        <span>  {item.PMTitle}</span>
                        <div style={{ height: '5px' }}></div>
                        <small style={{ fontWeight: 'bold', color: 'blue' }}>  {item.PMType}</small>
                        <div style={{ height: '2px' }}></div>
                        <small>  {item.PMData[0].Details}</small>


                      </div>


                    </div>

                  </div>


                  <div className={MYS.PMItemFotter}>
                    <div className={MYS.PMItemFA}>
                      <div className={MYS.Pmtag}>
                        {item.Pgstatus ? <span>Active</span> : <span>Not Active</span>}


                      </div>

                    </div>
                    <div className={MYS.PMItemFB}>

                      <Button size='small' variant="outlined" startIcon={<LuSettings />}>
                        Settings
                      </Button>
                    </div>

                  </div>

                </div>
              }

              )}
            </div>



      </div>
     


    </>
  );
}

DashboardCrypto.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardCrypto;
