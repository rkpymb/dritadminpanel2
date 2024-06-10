import React, { useState, useEffect, useContext } from 'react';

import MYS from '/Styles/mystyle.module.css'
import AssignBranchStaff from './AssignBranchStaff'

import Badge from '@mui/material/Badge';
import { FiEdit, FiTrash, FiArrowRightCircle } from "react-icons/fi";
import {


    IconButton,

    styled,

} from '@mui/material';

import { MediaFilesUrl, MediaFilesFolder } from '/Data/config'
import { useRouter, useParams } from 'next/router'

const StaffBrancheList = ({ ProfileData }) => {

    const router = useRouter()

    const [ReqData, setReqData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';

    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: -3,
            top: 13,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
        },
    }));

    useEffect(() => {
        if (ProfileData) {
            setReqData(ProfileData.AssignBranches)
            setIsLoading(false)
        }

    }, [])


    const RemoveBranchStaff = async (Branch) => {

        let text = "Do you Really want to remove ?";
        if (confirm(text) == true) {
            const sendUM = {
                BranchCode: Branch.BranchCode,
                Userid: ProfileData.Userid
    
    
            }
            const data = await fetch("/api/V3/Admin/Staff/RemoveBranchStaff", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(sendUM)
            }).then((a) => {
                return a.json();
            })
                .then((parsed) => {
                    console.log(parsed)
                   
                    if (parsed.ReqData.message) {
                        alert(parsed.ReqData.message)
                    }
                    if (parsed.ReqData.error) {
                        alert(parsed.ReqData.error)
                    }
                    if (parsed.ReqData.done) {
    
                        
                        router.push(`/admin/staff/profile/${ProfileData.Userid}`)
                    }
    
    
    
                })
    
        } 

        

    };







    return (
        <div>
            {isLoading ? <p>Loading branches..</p> :
                <div>

                    <div className={MYS.BtnboxPage}>
                        <div className={MYS.BtnboxPageA}>
                            Assign Branches
                        </div>
                        <div className={MYS.BtnboxPageB}>
                            <AssignBranchStaff ProfileData={ProfileData} />
                        </div>
                    </div>
                    <div className={MYS.UserGrid}>
                        {ReqData.map((item, index) => {
                            return <div hover key={index} className={MYS.UserItemMain}>

                                <div className={MYS.LBlogo}>
                                    <img
                                        src={`${MediaFilesUrl}${MediaFilesFolder}/${item.logo}`}
                                        alt="image"
                                        layout="responsive"
                                        placeholder='blur'

                                        width={'100%'}

                                        quality={100}
                                        blurDataURL={blurredImageData}

                                    />
                                </div>

                                <div className={MYS.UserItemTitle}>
                                    <span>{item.name} ({item.Sname})</span>
                                    <small>Branch Code: {item.BranchCode}</small>
                                </div>
                                <div className={MYS.UserItemDescB}>
                                    <small>{item.Address} </small>
                                    <small>{item.City} {item.State} {item.pincode}</small>
                                </div>

                                <div className={MYS.PMItemFotter}>
                                    <div className={MYS.PMItemFA}>
                                        <div className={MYS.Pmtag}>

                                            <span>  {item.isActive == 3 ? 'Active' : 'Disabled'}</span>


                                        </div>

                                    </div>
                                    <div className={MYS.PMItemFB}>
                                        <div className={MYS.Flexbtnbox}>
                                            <div style={{ minWidth: '10px' }}></div>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <IconButton onClick={() =>
                                                    RemoveBranchStaff(item)
                                                }>
                                                    <StyledBadge color="secondary" >
                                                        <FiTrash size={15} />
                                                    </StyledBadge>
                                                </IconButton>
                                            </div>
                                        </div>
                                    </div>

                                </div>


                            </div>
                        }

                        )}
                    </div>
                </div>


            }




        </div>
    )
}

export default StaffBrancheList
