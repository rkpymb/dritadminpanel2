import { useState, useEffect, useContext } from 'react';

import Head from 'next/head';
import CheckloginContext from '/context/auth/CheckloginContext'
import SidebarLayout from 'src/layouts/SidebarLayout';
import MYS from '/Styles/mystyle.module.css'
import { useRouter, useParams } from 'next/router'

import Image from 'next/image'
import ClickCopyText from './ClickCopyText'
import { WebMainDomain } from '/Data/config'

import Skeleton from '@mui/material/Skeleton';

import Badge from '@mui/material/Badge';
import {
  styled,
} from '@mui/material';
const DbTopBox = ({AllData}) => {
  const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';

  const router = useRouter()

  const Contextdata = useContext(CheckloginContext)
  const [Loading, setLoading] = useState(true);
  const [CounterLoading, setCounterLoading] = useState(true);
  const [CopyData, setCopyData] = useState('');



  useEffect(() => {
    if (Contextdata.WebData !== null) {
      setLoading(false)
    }

  }, [Contextdata.WebData])
  return (
    <div className={MYS.DbTopBoxMain}>
      <div className={MYS.DbTopBox}>
        <div className={MYS.DbTopBoxA}>
          {Loading ?
            <div className={MYS.SqureimgDb}>
              <Skeleton variant="circular" width={'100%'} height={'100%'} />
            </div> :
            <div className={MYS.SqureimgDb}>
              <Image
                layout="responsive"
                placeholder='blur'

                quality={100}
                blurDataURL={blurredImageData}
                src='/img/webpage.png' alt='im' height='50' width='50' />

            </div>

          }


        </div>
        <div className={MYS.DbTopBoxB}>
          {Loading ?
            <div className={MYS.DbTOptext}>
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={'100%'} />
            </div> :
            <div className={MYS.DbTOptext}>
              <span>{Contextdata.WebData.WebName} </span>
            </div>
          }
          {Loading ?
            <div className={MYS.DbTOptext}>
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={'70%'} />
            </div> :
            <div className={MYS.WebLive}>
               {AllData && AllData.SubSData == 0 ?
                 <div className={MYS.Pmtag} style={{backgroundColor:'red'}}><span>Deactivated</span></div>:
                 <div className={MYS.Pmtag}><span>Active</span></div>
              }
            
            </div>
          }

        </div>
      </div>

      <div>
        {Loading ?
          <div className={MYS.UrlBox}>
            <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={'50%'} />
          </div> :
          <div className={MYS.UrlBox}>
            <div className={MYS.UrlBoxText}>
              <small> Website Link</small>
              <span>{WebMainDomain}{Contextdata.WebData.webid}</span>
            </div>

            <div>
              <ClickCopyText CopyData={CopyData} />
            </div>

          </div>

        }


      </div>
    </div>
  )
}

export default DbTopBox
