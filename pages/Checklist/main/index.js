import React, { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import CheckloginContext from '../../../context/auth/CheckloginContext'
import SidebarLayout from 'src/layouts/SidebarLayout';
import MYS from '../../../Styles/mystyle.module.css'
import { useRouter, useParams } from 'next/router'
import { Container, Grid } from '@mui/material';
import Footer from 'src/components/Footer';
import Badge from '@mui/material/Badge';


import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';


import Image from 'next/image'

import {

  styled,


} from '@mui/material';

const steps = [
  {
    label: <div>
      <div>Your Website is ready !</div>
      <div style={{ marginTop: 5, fontSize: 10 }}><span className={MYS.Linkurl}>Visit Website</span></div>

    </div>,
    description: <div>
      <div>Congratulations 🎉 Your Website is Live Now</div>
    </div>,
     btntext:"Create Website",
      Url:"/CreateWebsite"
  },
  {
    label: 'Create a Branch',
    description:
      'Create a Study Center Branch, you can add multiple branches for your study center',
      btntext:"Create Branch",
      Url:"/StudyCenter/Branches"
  }
];

function DashboardCrypto() {
  const router = useRouter()
  const [Loading, setLoading] = useState(true);
  const [ShowMain, setShowMain] = useState(false);
  const Contextdata = useContext(CheckloginContext)
  const [CounterData, setCounterData] = useState([]);
  const [CounterLoading, setCounterLoading] = useState(true);

  const [activeStep, setActiveStep] = React.useState(1);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };



  const GetData = async () => {
    const dataid = '08c5th4rh86ht57h6g';
    const sendUM = {  }
    const data = await fetch("/api/V3/List/DbMianCounter", {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(sendUM)
    }).then((a) => {
      return a.json();
    })
      .then((parsed) => {

        if (parsed.ReD.alldone) {
          setCounterData(parsed.ReD)
          setCounterLoading(false)

        }
      })
  }
  useEffect(() => {
    // if (Contextdata.WebData !== null) {
    //   if (Contextdata.WebData.length == 0) {
    //     router.push('/CreateWebsite')
    //   }else{
    //     setLoading(false)
    //   }

    // }

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
        <title>Checklist</title>
      </Head>

      <Container className={MYS.min100vh}>

        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel
                optional={
                  index === 2 ? (
                    <Typography variant="caption">Last step</Typography>
                  ) : null
                }
              >
                {step.label}
              </StepLabel>
              <StepContent>
                <Typography>{step.description}</Typography>
                <Box sx={{ mb: 2 }}>
                  <div>
                    <Button
                      variant="contained"
                      onClick={() => router.push(`${step.Url}`)}
                      sx={{ mt: 1, mr: 1 }}
                    >
                     {step.btntext}
                    </Button>
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} sx={{ p: 3 }}>
            <Typography>All steps completed - you&apos;re finished</Typography>
            <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
              Reset
            </Button>
          </Paper>
        )}
      </Container>


    </>
  );
}

DashboardCrypto.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardCrypto;
