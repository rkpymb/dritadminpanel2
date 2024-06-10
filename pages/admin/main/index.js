
import Head from 'next/head';

import SidebarLayout from 'src/layouts/SidebarLayout';
import MYS from '../../../Styles/mystyle.module.css'

import Button from '@mui/material/Button';
import Link from 'next/link'

import Badge from '@mui/material/Badge';
import { BsArrowRightShort } from "react-icons/bs";
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
        <title>StudyCenter & Study Center Management</title>
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
              <span>StudyCenter & Study Center Management</span>
            </div>
          </div>
        </div>
        <div className={MYS.stickyContainerBox} >
          <div className={MYS.stickyContainer}>
            <div className={MYS.DashboardCounterGrid}>
              <div className={MYS.DashboardCounterItem}>
                <div className={MYS.DashboardCounterItemA}>
                  <span>Study Center Branches</span>
                  <small>manage all Branches</small>
                  <div style={{ minHeight: '10px' }}></div>
                  <Link href='/StudyCenter/Branches'>
                    <Button size='small' variant="outlined" endIcon={<BsArrowRightShort />}>
                      view more
                    </Button>
                  </Link>

                </div>
                <div className={MYS.DashboardCounterItemB}>
                  <Image src='/img/branches.png' alt='im' height='50' width='50' />
                </div>
              </div>
              <div className={MYS.DashboardCounterItem}>
                <div className={MYS.DashboardCounterItemA}>
                  <span>Branch Shifts</span>
                  <small>manage all Shifts</small>
                  <div style={{ minHeight: '10px' }}></div>
                  <Link href='/StudyCenter/Shifts'>
                    <Button size='small' variant="outlined" endIcon={<BsArrowRightShort />}>
                      view more
                    </Button>
                  </Link>

                </div>
                <div className={MYS.DashboardCounterItemB}>
                  <Image src='/img/shift.png' alt='im' height='50' width='50' />
                </div>
              </div>
              <div className={MYS.DashboardCounterItem}>
                <div className={MYS.DashboardCounterItemA}>
                  <span>Seating Arrangement</span>
                  <small>manage all Seats</small>
                  <div style={{ minHeight: '10px' }}></div>
                  <Link href='/StudyCenter/Seats'>
                    <Button size='small' variant="outlined" endIcon={<BsArrowRightShort />}>
                      view more
                    </Button>
                  </Link>

                </div>
                <div className={MYS.DashboardCounterItemB}>
                  <Image src='/img/seats.png' alt='im' height='50' width='50' />
                </div>
              </div>
              <div className={MYS.DashboardCounterItem}>
                <div className={MYS.DashboardCounterItemA}>
                  <span>Subscription Passes</span>
                  <small>manage all Passes</small>
                  <div style={{ minHeight: '10px' }}></div>
                  <Link href='/StudyCenter/StudyCenterPass'>
                    <Button size='small' variant="outlined" endIcon={<BsArrowRightShort />}>
                      View more
                    </Button>
                  </Link>

                </div>
                <div className={MYS.DashboardCounterItemB}>
                  <Image src='/img/vip.png' alt='im' height='50' width='50' />
                </div>
              </div>
              <div className={MYS.DashboardCounterItem}>
                <div className={MYS.DashboardCounterItemA}>
                  <span>Study Center Addons</span>
                  <small>manage all Addons</small>
                  <div style={{ minHeight: '10px' }}></div>
                  <Link href='/StudyCenter/StudyCenterAddons'>
                    <Button size='small' variant="outlined" endIcon={<BsArrowRightShort />}>
                      View more
                    </Button>
                  </Link>

                </div>
                <div className={MYS.DashboardCounterItemB}>
                  <Image src='/img/Addons.png' alt='im' height='50' width='50' />
                </div>
              </div>
              <div className={MYS.DashboardCounterItem}>
                <div className={MYS.DashboardCounterItemA}>
                  <span>Study Center Subscriptions</span>
                  <small>manage all Subscription </small>
                  <div style={{ minHeight: '10px' }}></div>
                  <Link href='/StudyCenter/StudyCenterSubscription'>
                    <Button size='small' variant="outlined" endIcon={<BsArrowRightShort />}>
                      Manage
                    </Button>
                  </Link>

                </div>
                <div className={MYS.DashboardCounterItemB}>
                  <Image src='/img/subscriptionimg.png' alt='im' height='50' width='50' />
                </div>
              </div>
              <div className={MYS.DashboardCounterItem}>
                <div className={MYS.DashboardCounterItemA}>
                  <span>StudyCenter Attendance</span>
                  <small>manage all Subscription </small>
                  <div style={{ minHeight: '10px' }}></div>
                  <Link href='/StudyCenter/StudyCenterAttendance'>
                    <Button size='small' variant="outlined" endIcon={<BsArrowRightShort />}>
                      Manage
                    </Button>
                  </Link>

                </div>
                <div className={MYS.DashboardCounterItemB}>
                  <Image src='/img/attendance.png' alt='im' height='50' width='50' />
                </div>
              </div>
             

            </div>

            <div style={{ height: '50px' }}></div>
           


          </div>
        </div>
      </div>


    </>
  );
}

DashboardCrypto.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardCrypto;
