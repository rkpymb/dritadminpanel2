import { useState, useEffect, useContext } from 'react';
import {
  Typography,
  Box,
  Card,
  Container,
  Button,
  styled
} from '@mui/material';
import BaseLayout from 'src/layouts/BaseLayout';
import CheckloginContext from '../context/auth/CheckloginContext'

import Head from 'next/head';


import { useRouter, useParams } from 'next/router'
const HeaderWrapper = styled(Card)(
  ({ theme }) => `
  width: 100%;
  display: flex;
  align-items: center;
  height: ${theme.spacing(10)};
  margin-bottom: ${theme.spacing(10)};
`
);

const OverviewWrapper = styled(Box)(
  ({ theme }) => `
    overflow: auto;
    background: ${theme.palette.common.white};
    flex: 1;
    overflow-x: hidden;
`
);

function Overview() {
  const router = useRouter()
  const Contextdata = useContext(CheckloginContext)
  useEffect(() => {
    if (Contextdata.IsLogin) {

      // router.push('/videoplay')
    } else {

    }
  });
  return (
    <OverviewWrapper>
      <Head>
        <title>Create Your App</title>
      </Head>
      <div>
        {Contextdata.IsLogin &&
          <div>
            DD
          </div>
        }
      </div>
    </OverviewWrapper>
  );
}

export default Overview;

Overview.getLayout = function getLayout(page) {
  return <BaseLayout>{page}</BaseLayout>;
};
