import { useState, useEffect, useContext } from 'react';
import {
  Card,
  TextField,
  styled
} from '@mui/material';

import MYS from '/Styles/mystyle.module.css'
import LoadingButton from '@mui/lab/LoadingButton';
import { LuArrowRight } from "react-icons/lu";
import CheckloginContext from '/context/auth/CheckloginContext'
import { useRouter, useParams } from 'next/router'

function Hero() {
  const router = useRouter()
  const Contextdata = useContext(CheckloginContext)
  const [mobile, setMobile] = useState('');

  const [PassKey, setPassKey] = useState('');

  const [OTPtext, setOTPtext] = useState('');
  const [BtnLoading, setBtnLoading] = useState(false);
  const [MobileBox, setMobileBox] = useState(true);
  const [OtpBox, setOtpBox] = useState(false);
  const [Password, setPassword] = useState('');



  const VerifyOTP = async (e) => {
    e.preventDefault();

    if (mobile.length == 10 && OTPtext !== '') {
      setBtnLoading(true)
      const sendUM = { mobile: mobile, OTPtext: OTPtext }
      const data = await fetch("/api/V3/auth/verifyOtp", {
        method: "POST",
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(sendUM)
      }).then((a) => {
        return a.json();
      })
        .then((parsed) => {
          setBtnLoading(false)

          if (parsed.ReqD.LoginStatus == true) {
            const newToken = parsed.ReqD.token
            document.cookie = `jwt_token=${newToken}; expires=${new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000).toUTCString()}; path=/`;
            console.log(newToken)
            router.push('/admin/')

          } else {
            setBtnLoading(false)
            alert(parsed.ReqD.message)
          }

        })


    } else {
      alert('Please Enter OTP')
    }

  };

  const CheckLogin = async (e) => {
    e.preventDefault();
    if (mobile !== '' && PassKey !== '') {
      setBtnLoading(true)
      const sendUM = { mobile: mobile, PassKey: PassKey }
      const data = await fetch("/api/V3/auth/LoginAdminuser", {
        method: "POST",
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(sendUM)
      }).then((a) => {
        return a.json();
      })
        .then((parsed) => {
        
          setTimeout(function () {
            
            if (parsed.ReqD.LoginStatus == true && parsed.ReqD.token) {
              const newToken = parsed.ReqD.token
              document.cookie = `jwt_token=${newToken}; expires=${new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000).toUTCString()}; path=/`;
             
              router.push('/admin/')
            }

            if (parsed.ReqD.msg) {
              setBtnLoading(false)
              alert(parsed.ReqD.msg)
            }
          }, 2000);

        })
    } else {
      alert('Please Enter mobile number and password')
    }

  }

  return (
    <div>
      <div className={MYS.LoginBoxContainer}>

        <div className={MYS.LoginBox}>
          <div className={MYS.logomainDB}>
            <img src='/logo/logo.png' alt='logo' width={'100%'} />
          </div>
          <div style={{ height: "20px" }}></div>


          {MobileBox &&
            <div>
              <div>
                <h2 style={{ margin: 0 }}>Dashboard Login</h2>
                <span>Please Login to access Dashboard</span>
              </div>
              <form onSubmit={CheckLogin} >

                <div className={MYS.inputlogin}>
                  <TextField
                    required
                    label="Mobile Number"
                    fullWidth
                    value={mobile}
                    onInput={e => setMobile(e.target.value)}
                    type="number"
                  />
                </div>

                <div className={MYS.inputlogin}>
                  <TextField
                    fullWidth
                    value={PassKey}
                    onInput={e => setPassKey(e.target.value)}
                    required
                    label="Enter Password"
                    type="Password"
                  />
                </div>

                <div style={{ minHeight: 25 }}></div>

                <LoadingButton
                  type="submit"
                  fullWidth
                  endIcon={<LuArrowRight />}
                  loading={BtnLoading}
                  loadingPosition="end"
                  variant="contained"
                  onClick={CheckLogin}
                >
                  <span>Procced to Log in</span>
                </LoadingButton>
              </form>
            </div>

          }
          {OtpBox &&
            <div>
              <div>
                <h2 style={{ margin: 0 }}>Enter 6 Digit <span className={MYS.primaryColor}> OTP</span></h2>
                <span>OTP Succesfully sent on  <span className={MYS.Mobtext}> {mobile}</span></span>
              </div>
              <form onSubmit={VerifyOTP}>
                <div className={MYS.inputlogin}>
                  <TextField
                    required
                    label="ENTER OTP"
                    fullWidth
                    value={OTPtext}

                    onInput={e => setOTPtext(e.target.value)}
                    type="number"
                  />
                </div>
                <div style={{ minHeight: 25 }}></div>

                <LoadingButton
                  type="submit"
                  size="small"

                  // endIcon={<SendIcon />}
                  loading={BtnLoading}
                  loadingPosition="end"
                  variant="contained"
                >
                  <span>Verify OTP</span>
                </LoadingButton>
              </form>
            </div>

          }


        </div>







      </div>
      <div className={MYS.LoginFooterBox}>
        <div>
          <div style={{ height: '15px' }}></div>
          <div className={MYS.ADtext}>
            <div style={{fontSize:'25px'}}>Automate Your</div>
            <span>Study and Library Center Today 🚀</span>
          </div>
          <div style={{ height: '15px' }}></div>
          <div className={MYS.ADtexttwo} onClick={() => router.push('/Signup')}>
            <span>Don’t have an account?  </span> <div style={{ width: '5px' }}></div>   <span className={MYS.Linkurlf4d03f}> Get Started for Free</span>
          </div>
        </div>

      </div>



    </div>
  );
}

export default Hero;
