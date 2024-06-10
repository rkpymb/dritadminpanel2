import React, { useState, useEffect, useContext } from 'react';

import SidebarLayout from 'src/layouts/SidebarLayout';
import MYS from '/Styles/mystyle.module.css'

import TitleNav from '../../../src/components/Parts/TitleNav'
import Mysubscriptionlist from './Comp/Mysubscriptionlist'
import { useRouter, useParams } from 'next/router'

function DashboardCrypto() {
  const router = useRouter()




  return (
    <>
      <TitleNav Title={`My Subscription`} />

      <Mysubscriptionlist />

    </>
  );
}

DashboardCrypto.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardCrypto;
