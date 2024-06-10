
import Head from 'next/head';

import SidebarLayout from 'src/layouts/SidebarLayout';
import MYS from '../../../Styles/mystyle.module.css'

import Button from '@mui/material/Button';
import Link from 'next/link'

import Badge from '@mui/material/Badge';
import { LuArrowRight } from "react-icons/lu";
import { LuArrowLeft } from "react-icons/lu";
import {

  IconButton,

  styled
} from '@mui/material';
import Image from 'next/image'
import { useRouter, useParams } from 'next/router'
function DashboardCrypto() {
  const router = useRouter()
 
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
        <title>Settings</title>
      </Head>
      <div className={MYS.marginTopMain}>
        <div className={MYS.TitleWithBackHeader}>
          <div className={MYS.TitleWithBackHeaderA}>
            <IconButton aria-label="cart" onClick={() => router.back()}>
              <StyledBadge color="secondary" >
                <LuArrowLeft />
              </StyledBadge>
            </IconButton>
            <div>
              <span>Settings</span>
            </div>
          </div>
        </div>
        <div className={MYS.stickyContainerBox} >
          <div className={MYS.stickyContainer}>
            <div className={MYS.DashboardCounterGrid}>
              <div className={MYS.DashboardCounterItem}>
                <div className={MYS.DashboardCounterItemA}>
                  <span>Poster Sliders</span>
                  <small>manage all Posters</small>
                  <div style={{ minHeight: '10px' }}></div>
                  <Link href='/Settings/PosterSliders'>
                    <Button size='small' variant="outlined" endIcon={<LuArrowRight />}>
                      view more
                    </Button>
                  </Link>

                </div>
                <div className={MYS.DashboardCounterItemB}>
                  <Image src='/slideshow.png' alt='im' height='50' width='50' />
                </div>
              </div>
              <div className={MYS.DashboardCounterItem}>
                <div className={MYS.DashboardCounterItemA}>
                  <span>Payment Methods</span>
                  <small>manage Payment all methods</small>
                  <div style={{ minHeight: '10px' }}></div>
                  <Link href='/Settings/PaymentMethods'>
                    <Button size='small' variant="outlined" endIcon={<LuArrowRight />}>
                      view more
                    </Button>
                  </Link>

                </div>
                <div className={MYS.DashboardCounterItemB}>
                  <Image src='/slideshow.png' alt='im' height='50' width='50' />
                </div>
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
