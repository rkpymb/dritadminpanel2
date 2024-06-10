import { useState, useEffect, useContext } from 'react';

import MYS from '/Styles/mystyle.module.css'

import { useRouter, useParams } from 'next/router'
import CheckloginContext from '/context/auth/CheckloginContext'
import Skeleton from '@mui/material/Skeleton';

import { MediaFilesUrl, MediaFilesFolder } from '/Data/config'

import LoadingButton from '@mui/lab/LoadingButton';


import { FiTrash, FiEdit } from "react-icons/fi";
import EditBranch from '../../../components/Admin/Edit/EditBranch'



const BranchDetails = ({ BranchData }) => {

  const Contextdata = useContext(CheckloginContext)
  const router = useRouter()

  const [IsLoading, setIsLoading] = useState(false);

  
  const DeleteBranch = async (e) => {
    let text = "Do you really want to delete ?";
    if (confirm(text) == true) {

        const sendUM = {
          
            id: e
        }
        const data = await fetch("/api/V3/Admin/Branches/DeleteBranch", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => {
            return a.json();
        })
            .then((parsed) => {

                if (parsed.ReqD.done) {
                    alert(parsed.ReqD.done)
                    router.push('/admin/branches')
                } else {
                    alert('Something went wrong')
                }



            })
    }



};
  return (
    <div>
      <div className={MYS.BranchDataBoxA}>
        <div className={MYS.BrachDetailbox}>
          <div style={{ width: '130px', marginBottom: '10px' }}>
            {!IsLoading ?
              <div>
                <img src={`${MediaFilesUrl}${MediaFilesFolder}/${BranchData && BranchData.logo}`} width='100%' />
              </div>
              : <div>
                <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={130} height={130} animation="wave" />

              </div>


            }

          </div>
          <div>
            {!IsLoading ?
              <div>
                <b>{BranchData && BranchData.name}</b>
              </div>
              : <div>
                <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={'100%'} animation="wave" />

              </div>


            }
          </div>
          {!IsLoading ?
            <div>
              <div><span style={{ fontSize: '12px' }}>Short Name : {BranchData && BranchData.Sname}</span></div>
              <div><span style={{ fontSize: '12px' }}>Branch Code : {BranchData && BranchData.BranchCode}</span></div>
              <div><span style={{ fontSize: '12px' }}>Mobile number : {BranchData && BranchData.MobileNum}</span></div>
              <div><span style={{ fontSize: '12px' }}>Email  : {BranchData && BranchData.Email}</span></div>
              <div><span style={{ fontSize: '12px' }}>WhatsApp : {BranchData && BranchData.Whatsapp}</span></div>
              <div><span style={{ fontSize: '12px' }}>City : {BranchData && BranchData.City}</span></div>
              <div><span style={{ fontSize: '12px' }}>Full Address : {BranchData && BranchData.Address}</span></div>
              <div><span style={{ fontSize: '12px' }}>State : {BranchData && BranchData.State}</span></div>
              <div><span style={{ fontSize: '12px' }}>Pin Code : {BranchData && BranchData.pincode}</span></div>
              <div><span style={{ fontSize: '12px' }}>Longitude : {BranchData && BranchData.longitude}</span></div>
              <div><span style={{ fontSize: '12px' }}>Latitude : {BranchData && BranchData.latitude}</span></div>
              <div><span style={{ fontSize: '12px' }}>GoogleMap : {BranchData && BranchData.GoogleMap}</span></div>
              <div><span style={{ fontSize: '12px' }}>Status : {BranchData && BranchData.isActive == 3 ? <span style={{ color: '#2ECC71', fontWeight: 'bold' }}>Active</span> : <span style={{ color: 'red', fontWeight: 'bold' }}>Not Active</span>}</span></div>
            </div>
            : <div>
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={100} animation="wave" />
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={100} animation="wave" />

            </div>


          }
          {!IsLoading &&
            <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center' }}>
              {BranchData &&
                  <EditBranch BranchData={BranchData} />
              
              }

          
              <div style={{ width: '15px' }}></div>
              <LoadingButton
                type="submit"
                size="small"
                onClick={() =>
                  DeleteBranch(BranchData && BranchData._id)
                }
                endIcon={<FiTrash />}
                loading={false}
                loadingPosition="end"
                variant="outlined"
              >
                <span>Delete Branch</span>
              </LoadingButton>
            </div>
          }


        </div>
      </div>
    </div>
  )
}

export default BranchDetails
