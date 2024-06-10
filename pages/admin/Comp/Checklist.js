import React, { useState, useEffect, useContext } from 'react';

import CheckloginContext from '/context/auth/CheckloginContext'

import MYS from '/Styles/mystyle.module.css'
import { useRouter, useParams } from 'next/router'


import Badge from '@mui/material/Badge';
import { LuChevronRight } from "react-icons/lu";

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import LoadingButton from '@mui/lab/LoadingButton';
import Image from 'next/image'

import {

  styled,


} from '@mui/material';

const steps = [
  {
    label: <div>
      <div>Create  your Website</div>
    </div>,
    description: <div>
      <div>Create your Free Website for your Library and Study Center Bussiness</div>
    </div>,
    btntext: "Create Website",
    Url: "/admin/create-website"
  },
  {
    label: 'Create a Branch',
    description:
      'Create a LibraryCenter Branch, you can add multiple branches for your study center',
    btntext: "Create Branch",
    Url: "/admin/branches"
  },
  {
    label: 'Create a Shift',
    description:
      'Add a Shift, you can add multiple Branch Shifts.',
    btntext: "Add Shift",
    Url: "/admin/shifts"
  },
  {
    label: 'Add Your Seats',
    description:
      'Add and Manage Your Library Seats ',
    btntext: "Add Seat",
    Url: "/admin/seats"
  },
  {
    label: 'Add Subscription Passes',
    description:
      'You can Add Subscription Passes with multiple pricing and validity',
    btntext: "Create Pass",
    Url: "/admin/subscription-pass"
  },
  {
    label: 'Important Settings',
    description:
      'Setup important settings to Make your website Live',
    btntext: "Open Settings",

    Url: "/admin/settings"
  }
  , {
    label: 'Publish Your Website',
    description:
      'Publish your website on the internet, please recheck all Details before publishing your Website',
    btntext: "GO LIVE",

    Url: "/admin/subscriptions"
  }
];

function DashboardCrypto({ ShowMainData }) {
  const router = useRouter()
  const [Loading, setLoading] = useState(true);
  const [Btnloading, setBtnloading] = useState(false);
  const [ShowMain, setShowMain] = useState(false);
  const Contextdata = useContext(CheckloginContext)
  const [ChecklistData, setChecklistData] = useState([]);
  const [CounterLoading, setCounterLoading] = useState(true);

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };


  const Golivebtn = async () => {
    setBtnloading(true)
    let sendUM = {}
    const data = await fetch("/api/V3/Admin/Golive", {
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
          if (parsed.ReqData.done) {
            alert(parsed.ReqData.done)
            router.push('/admin/')

          } else {
            alert('Something went wrong')
          }
          setTimeout(function () {
            setBtnloading(false)
          }, 2000);

        }

      })
  }
  const GetData = async () => {
    const sendUM = {}
    const data = await fetch("/api/V3/Admin/Checklist", {
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
          setChecklistData(parsed.ReqData.Checklist);
          console.log(parsed.ReqData.Checklist)

          if (parsed.ReqData.Checklist.WebsiteCheck == 1) {
            setActiveStep(1);

          }
          if (parsed.ReqData.Checklist.Branch > 0) {
            setActiveStep(2);

          }
          if (parsed.ReqData.Checklist.Shift > 0) {
            setActiveStep(3);

          }
          if (parsed.ReqData.Checklist.Seats > 0) {
            setActiveStep(4);

          }
          if (parsed.ReqData.Checklist.Pass > 0) {
            setActiveStep(5);

          }
          const GmailSettings = parsed.ReqData.Checklist.Settings.SettingsData.GmailSmtp
          const AttendanceSettings = parsed.ReqData.Checklist.Settings.SettingsData.AttendanceSettings
          const PwaSetting = parsed.ReqData.Checklist.Settings.SettingsData.PwaSetting
          if (parsed.ReqData.Checklist.Settings !== null && GmailSettings && AttendanceSettings && PwaSetting ) {
            setActiveStep(6);

          }
          

          setLoading(false)
        }

      })
  }
  useEffect(() => {

    GetData()
  }, [Contextdata.WebData, router.query])
  useEffect(() => {

    if (activeStep == 6) {
      setActiveStep(7);
      ShowMainData(true)
    }
  }, [activeStep])


  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }));
  return (
    <div>
      {!Loading &&
        <div>


          {activeStep < 7 &&
            <div>
              <div className={MYS.Comlteebox}>
                <span>Complete Required Steps</span>
                <small>please complete all required steps to make your website live.</small>

              </div>
              <Stepper activeStep={activeStep} orientation="vertical">

                {steps.map((step, index) => (
                  <Step key={step.label}>
                    <StepLabel
                      optional={
                        index === 7 ? (
                          <Typography>Ready to Go Live ?</Typography>
                        ) : null
                      }
                    >
                      {step.label}
                    </StepLabel>
                    <StepContent>
                      <Typography>{step.description}</Typography>
                      <Box sx={{ mb: 2 }}>
                        <div>


                          {index === 7 ?

                            <LoadingButton
                              endIcon={<LuChevronRight />}
                              loading={Btnloading}
                              loadingPosition="end"
                              variant="contained"
                              onClick={Golivebtn}
                              sx={{ mt: 1, mr: 1 }}
                            >
                              <span>GO LIVE</span>
                            </LoadingButton> :

                            <Button
                              variant="contained"
                              onClick={() => router.push(`${step.Url}`)}
                              sx={{ mt: 1, mr: 1 }}
                            >
                              {step.btntext}
                            </Button>

                          }


                        </div>
                      </Box>
                    </StepContent>
                  </Step>
                ))}
              </Stepper>
            </div>

          }
        </div>
      }



    </div>
  );
}


export default DashboardCrypto;
