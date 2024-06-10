import React, { useState, useEffect, useContext } from 'react';


import LoadingButton from '@mui/lab/LoadingButton';

import { useRouter, useParams } from 'next/router'
import Skeleton from '@mui/material/Skeleton';

import MYS from '/Styles/mystyle.module.css'
import { LuArrowRight } from "react-icons/lu";
import {

  FormControl,
  TextField,

  styled,

} from '@mui/material';

import SidebarLayout from 'src/layouts/SidebarLayout';


import TitleNav from '/src/components/Parts/TitleNav'



function DashboardCrypto() {
  const router = useRouter()
  const [Amount, setAmount] = useState(0);
  const [CreditValue, setCreditValue] = useState(0);
  const [UserMobile, setUserMobile] = useState('');
  const [UserData, setUserData] = useState(null);
  const [GstAmt, setGstAmt] = useState(0);
  const [GstText, setGstText] = useState('18 % GST');

  ;


  const [Btnloading, setBtnloading] = useState(false);

  const [Loadinguser, setLoadinguser] = useState(false);
  const [DesabledBtn, setDesabledBtn] = useState(true);


  const RechargeProceed = async () => {
    if (Amount >= 1 && UserData) {
      setBtnloading(true)

      setDesabledBtn(true)

      const Recharge = {
        amount: Amount,
        CreditValue: CreditValue

      }

      const TaxData = {
        TaxAmt: GstAmt,
        GstText: GstText,

      }

      const sendUM = {
        Recharge: Recharge,
        TaxData: TaxData,
        UserData: UserData

      };

      try {
        const response = await fetch("/api/V3/Admin/Wallet/RechargeUserWallet", {
          method: "POST",
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(sendUM)
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const parsed = await response.json();

        if (parsed.ReqD.done) {
          alert('Recharge Successfull')
          setBtnloading(false)
          setUserMobile('')
          setUserData(null)
          setAmount(0)


        } else {
          setBtnloading(false)
          setDesabledBtn(false)
          alert('Something went wrong try after some time');
        }


      } catch (error) {
        console.error('Error fetching data:', error);

      }

    } else {
      alert('Please enter valid amount')
    }

  }
  const ChangeAmt = async (Amt) => {
    if (Amt >= 1) {
      setCreditValue(Amt)

      const taxRate = 0.18; // 18% tax rate
      const taxAmount = Amt * taxRate;
      setGstAmt(taxAmount.toFixed(2))

    }

  }


  useEffect(() => {

    const { amt } = router.query
    if (amt) {
      setAmount(amt)
      ChangeAmt(amt)
    }


  }, [router.query])


  const Changeuser = async (e) => {
    setDesabledBtn(true)

    const mob = e.target.value
    if (mob.length == 10) {
      setLoadinguser(true)
      setUserMobile(mob)
      const sendUM = { mobile: mob }
      const data = await fetch("/api/V3/Admin/Users/GetUserDatabymobile", {
        method: "POST",
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(sendUM)
      }).then((a) => {
        return a.json();
      })
        .then((parsed) => {
          setLoadinguser(false)
          if (parsed.ReqD.Userlist) {

            if (parsed.ReqD.Userlist.length > 0) {
              const ud = parsed.ReqD.Userlist[0]
              setUserData(ud)
             
              setDesabledBtn(false)
              setLoadinguser(false)


            } else {
              setUserData(null)
              setDesabledBtn(true)
            }
          }
        })
    }
  };

  return (
    <>
      <TitleNav Title={`User Wallet Recharge`} />
      <div className={MYS.MboxMain}>
        <div className={MYS.RechargeBox}>
          <div className={MYS.Formbox}>
            <form onSubmit={RechargeProceed} >
              <div className={MYS.RechargeBoxHeader}>
                <span>Recharge User Wallet</span>
                <div style={{ height: '5px' }}></div>
                <small>Please enter Mobile Number and Amount. </small>
              </div>
              <div className={MYS.inputlogin}>
                <TextField
                  required
                  label="Enter User Mobile Number"
                  type='Number'
                  inputProps={{ inputMode: 'numeric' }}
                  fullWidth
                  value={UserMobile}

                  onInput={e => setUserMobile(e.target.value)}
                  onChange={Changeuser}

                />


                <div style={{ marginTop: '10px' }}>
                  {UserMobile.length == 10 &&
                    <div>
                      {Loadinguser ?
                        <div>
                          <Skeleton variant="rounded" width='100%' height={60} />

                        </div> :
                        <div>
                          {UserData ?
                            <div>
                              <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span style={{ color: 'black', fontWeight: 'bold' }}>{UserData.name}</span>
                                <div style={{ height: '5px' }}></div>
                                <small style={{ color: '#58D68D' }}>{UserData.mobile}</small>
                                <small style={{ color: '#58D68D' }}>{UserData.email}</small>
                              </div>

                            </div> :
                            <div>
                              <span style={{ color: 'red', fontWeight: 'bold' }}>User Not Found with this Mobile Number</span>
                            </div>


                          }




                        </div>
                      }
                    </div>
                  }
                </div>
              </div>
              <div className={MYS.inputlogin}>
                <TextField
                  required
                  label="Enter Amount"
                  type='Number'
                  inputProps={{ inputMode: 'numeric' }}
                  fullWidth
                  value={Amount}
                  onInput={e => setAmount(e.target.value)}
                  onChange={e => ChangeAmt(e.target.value)}
                />
              </div>

              {Amount >= 1 &&

                <div className={MYS.Rbbox}>
                  <div className={MYS.RbboxItem}>
                    <div className={MYS.RbboxItemA}>
                      <span>Wallet Value</span>
                    </div>
                    <div className={MYS.RbboxItemB}>
                      <span>₹ {CreditValue}</span>
                    </div>
                  </div>
                  <div className={MYS.RbboxItem}>
                    <div className={MYS.RbboxItemA}>
                      <span>GST (18.00%)</span>
                    </div>
                    <div className={MYS.RbboxItemB}>
                      <span>₹ {GstAmt}</span>
                    </div>
                  </div>
                  <div className={MYS.RbboxItem}>
                    <div className={MYS.RbboxItemA}>
                      <span>Total Amount *</span>
                    </div>
                    <div className={MYS.RbboxItemB}>
                      <span>₹ {parseInt(Amount) + parseInt(GstAmt)}</span>
                    </div>
                  </div>
                </div>
              }

              <div style={{ height: '25px' }}></div>
              <LoadingButton
                fullWidth
                onClick={RechargeProceed}
                endIcon={<LuArrowRight />}
                loading={Btnloading}
                disabled={DesabledBtn}
                loadingPosition="end"
                variant="contained"
              >
                <span>Recharge</span>
              </LoadingButton>

            </form>
          </div>
        </div>

      </div>



    </>
  );
}

DashboardCrypto.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardCrypto;
