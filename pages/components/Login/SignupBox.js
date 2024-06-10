import { useState, useEffect, useContext } from 'react';
import {
  Card,
  TextField,
  styled
} from '@mui/material';

import MYS from '../../../Styles/mystyle.module.css'
import LoadingButton from '@mui/lab/LoadingButton';
import { LuArrowRight } from "react-icons/lu";
import CheckloginContext from '../../../context/auth/CheckloginContext'
import { useRouter, useParams } from 'next/router'

function Hero() {
  const router = useRouter()
  const Contextdata = useContext(CheckloginContext)
  const [mobile, setMobile] = useState('');
  const [name, setName] = useState('');
  const [PassKey, setPassKey] = useState('');
  const [email, setEmail] = useState('');
  const [OTPtext, setOTPtext] = useState('');
  const [BtnLoading, setBtnLoading] = useState(false);
  const [MobileBox, setMobileBox] = useState(true);
  const [OtpBox, setOtpBox] = useState(false);
  const [Password, setPassword] = useState('');

  const [Btnloading, setBtnloading] = useState(false);
  const [Allok, setAllok] = useState(false);

  const [WebName, setWebName] = useState('');
  const [Webid, setWebid] = useState('');
  const [WebidText, setWebidText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mobile.length == 10 && Password !== '') {
      CheckLogin()
    } else {
      alert('invalid credentials')
    }
  };

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

          if (parsed.ReqD.LoginStatus == true) {
            const newToken = parsed.ReqD.token
            document.cookie = `jwt_token=${newToken}; expires=${new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000).toUTCString()}; path=/`;
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

  const CreateAccount = async (e) => {
    e.preventDefault();
    if (WebName !== '' && Webid !== '' && name !== '' && mobile !== '' && PassKey !== '' && email !== '') {
      setBtnLoading(true)
      const sendUM = {
        name: name,
        mobile: mobile,
        PassKey: PassKey,
        email: email,
        webid: Webid,
        WebName: WebName
      }
      const data = await fetch("/api/V3/auth/MainAdminSignup", {
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
          console.log(parsed.ReqD)
          if (parsed.ReqD.done) {
            setMobileBox(false)
            setOtpBox(true)
          } else {
            alert(parsed.ReqD.msg)
          }

        })
    }

  }

 

  const CheckWebid = async (e) => {
    const sendUM = {

      webid: e,
    }
    const data = await fetch("/api/V3/Admin/Checkwebid", {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(sendUM)
    }).then((a) => {
      return a.json();
    })
      .then((parsed) => {
        if (parsed.ReqData.msg) {
          setAllok(false);
          setWebidText(`${parsed.ReqData.msg} is not available`)
          setWebid('')
        }
        if (parsed.ReqData.ok) {
          setAllok(true);
          setWebidText(`${parsed.ReqData.ok} is available`)
          setWebid(parsed.ReqData.ok)

        }

      })
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
                <h2 style={{ margin: 0 }}>Get Started for<span className={MYS.primaryColor}>  Free</span> 🎉</h2>
                <span>Automate Your Study and Library Center 🚀</span>
              </div>
              <form onSubmit={CreateAccount} >
                <div className={MYS.inputlogin}>
                  <TextField
                    required
                    label="Your Good Name"
                    fullWidth
                    value={name}
                    onInput={e => setName(e.target.value)}

                  />
                </div>
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
                    required
                    label="Email Address"
                    fullWidth
                    value={email}
                    onInput={e => setEmail(e.target.value)}

                  />
                </div>
                <div className={MYS.inputlogin}>
                  <TextField
                    fullWidth
                    value={PassKey}
                    onInput={e => setPassKey(e.target.value)}
                    required
                    label="Create Password"
                    type="Password"
                  />
                </div>

                <div className={MYS.inputlogin}>
                  <TextField
                    required
                    label="Website Title"
                    fullWidth
                    value={WebName}
                    onChange={e => CheckWebid(e.target.value)}
                    onInput={e => setWebName(e.target.value)}

                  />
                </div>
                <div className={MYS.inputlogin}>
                  <TextField
                    required
                    label="Website Unique name"
                    fullWidth
                    value={Webid}
                    onInput={e => setWebid(e.target.value)}
                    onChange={e => CheckWebid(e.target.value)}
                  />
                  <div className={MYS.WebidText}>
                    <span> {WebidText}</span>
                  </div>
                </div>

                <div style={{ minHeight: 25 }}></div>

                <LoadingButton
                  type="submit"
                  fullWidth
                  endIcon={<LuArrowRight />}
                  loading={BtnLoading}
                  loadingPosition="end"
                  variant="contained"
                  onClick={CreateAccount}
                >
                  <span>Create Account</span>
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
              <form onSubmit={VerifyOTP} >
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

          <div style={{ height: '15px' }}></div>
          <div className={MYS.ADtexttwo} onClick={() => router.push('/Login')}>
            <span>Already a member? </span> <div style={{ width: '5px' }}></div>   <span className={MYS.Linkurlf4d03f}> Log in</span>
          </div>
        </div>

      </div>


    </div>
  );
}

export default Hero;
