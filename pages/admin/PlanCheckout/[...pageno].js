import React, { useState, useEffect, useContext } from 'react';

import SidebarLayout from 'src/layouts/SidebarLayout';
import MYS from '/Styles/mystyle.module.css'

import TitleNav from '/src/components/Parts/TitleNav'
import { MediaFilesFolder, MediaFilesUrl } from '/Data/config'

import * as OderDone from '/Data/Lottie/doneanim.json'
import PaywithCredit from './Comp/PaywithCredit'



import Lottie from 'react-lottie'
import Image from 'next/image'
import LoadingButton from '@mui/lab/LoadingButton';
import { LuArrowRight } from "react-icons/lu";

import { useRouter, useParams } from 'next/router'

export async function getServerSideProps(context) {

  const PlanID = context.query.pageno[0];


  const requestOptions = {

    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ PlanID: PlanID, token: process.env.MYKEY })
  };

  const response = await fetch(`${process.env.API_URL}SuperAdmin/PlanData`, requestOptions);
  const PD = await response.json();
  return {
    props: { PD },
  }

}

function DashboardCrypto({ PD }) {
  const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';

  const router = useRouter()
  const [PlanData, setPlanData] = useState(0);
  const [Loading, setLoading] = useState(true);
  const [StepA, setStepA] = useState(true);
  const [OrderDone, setOrderDone] = useState(false);
  const [ShowPg, setShowPg] = useState(false);
  const [SelectedPlanPg, setSelectedPlanPg] = useState(null);
  const [BtnLoading, setBtnLoading] = useState(false);


  useEffect(() => {

    if (PD.PlanData) {
      setPlanData(PD.PlanData)
      setLoading(false)

    }

  }, [])


  const PayDone = {
    loop: false,
    autoplay: true,
    animationData: OderDone,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }


  const TrialAccess = async (Plan) => {
    try {
      setBtnLoading(true)
      const sendUM = {

        PlanID: Plan.PlanID,


      }
      const data = await fetch("/api/V3/Admin/buy-subscription/TrialAccess", {
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
          if (parsed.ReqD.done) {
           
            setTimeout(function(){
              setStepA(false);
              setOrderDone(true);
  
  
           }, 2000);


          }
          if (parsed.ReqD.error) {
            setBtnLoading(false)
            alert(parsed.ReqD.error)

          }


        })
    } catch (error) {
      console.log(error)
      alert('Something went Wrong, please try again')
      setBtnLoading(false)

    }


  };
 
  const ShowPgDiloag = async (Plan) => {
    setSelectedPlanPg(Plan);
    setShowPg(true)


  };



  return (
    <>
      {Loading ?
        null :
        <div>
          <TitleNav Title={PlanData.Title} />
          <div className={MYS.MboxMain}>
            {StepA &&
              <div>
                <div className={MYS.PlanItem}>

                  <div className={MYS.PlanTop}>
                    <div className={MYS.PlanTopA}>
                      <div className={MYS.PlanImg}>
                        <Image
                          src={`${MediaFilesUrl}${MediaFilesFolder}/${PlanData.Image}`}
                          alt="image"
                          layout="responsive"
                          placeholder='blur'
                          width={30}
                          height={30}
                          quality={100}
                          blurDataURL={blurredImageData}

                        />
                      </div>
                    </div>
                    <div className={MYS.PlanTopB}>
                      <div className={MYS.Pmtag}>
                        <span>  {PlanData.Tagline}</span>
                      </div>
                    </div>

                  </div>
                  <div className={MYS.UserItemTitle}>
                    <span>{PlanData.Title}</span>
                    <div style={{ height: '5px' }}></div>
                    <small>{PlanData.Details}</small>

                  </div>
                  <div className={MYS.UserItemDescB}>
                    <small>{PlanData.details} </small>

                  </div>



                  <div style={{ height: '10px' }}></div>
                  <div className={MYS.PMItemFotter}>
                    <div className={MYS.PMItemFA}>

                      {PlanData.Trial == false ?
                        <div className={MYS.Pricebox}>
                          <div>
                            <del>{PlanData.Mprice} </del> <span> ₹ {PlanData.Sprice} </span>
                          </div>
                          <div className={MYS.PriceboxText}>
                            <small>for {PlanData.Validity} Days</small>
                          </div>
                        </div> :
                        <div className={MYS.Pricebox}>
                          <div>
                            <span> Free </span>
                          </div>
                          <div className={MYS.PriceboxText}>
                            <small>for {PlanData.Validity} Days</small>
                          </div>
                        </div>

                      }

                    </div>
                    <div className={MYS.PMItemFB}>
                      <div className={MYS.Flexbtnbox}>
                        <div style={{ minWidth: '10px' }}></div>


                        {PlanData.Trial == false ?
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <LoadingButton

                              onClick={() =>
                                ShowPgDiloag(PlanData)
                              }
                              endIcon={<LuArrowRight />}
                              loading={false}
                              loadingPosition="end"
                              variant="contained"
                            >
                              <span>Pay now</span>
                            </LoadingButton>
                          </div> :
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <LoadingButton
                              onClick={() =>
                                TrialAccess(PlanData)
                              }
                              endIcon={<LuArrowRight />}
                              loading={BtnLoading}
                              disabled={BtnLoading}
                              loadingPosition="end"
                              variant="contained"
                            >
                              <span>Get Offer</span>
                            </LoadingButton>
                          </div>

                        }

                      </div>
                    </div>

                  </div>

                </div>
              </div>


            }
            {OrderDone &&
              <div>
                <div className={MYS.OrderDonebox}>
                  <div className={MYS.OrderDoneLottieB} >

                    <Lottie options={PayDone}
                      height={null}
                      width={'100%'}
                      isStopped={false}
                      isPaused={false} />

                  </div>

                  <div className={MYS.OrderDoneboxFooter}>
                    <div className={MYS.OrderDoneboxText}>
                      <h1>Subscriptions Succesfully Added</h1>
                      <span>Congratulations! Your subscriptions have been successfully added. Now it will be easier for you to access your favorite services and updates. Keep enjoying!</span>
                    </div>
                    <div style={{ height: '10px' }}></div>
                    <LoadingButton
                      onClick={() =>
                        router.push('/admin/my-subscription')
                      }
                      endIcon={<LuArrowRight />}

                      loadingPosition="end"
                      variant="contained"
                    >
                      <span>View Subscriptions</span>
                    </LoadingButton>
                  </div>


                </div>
              </div>


            }

          </div>
        </div>

      }

      {ShowPg &&

        <div>
          
          <PaywithCredit Plan={SelectedPlanPg} />
        </div>
      }

    </>
  );
}

DashboardCrypto.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardCrypto;
