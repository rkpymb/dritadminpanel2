import { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import SidebarLayout from 'src/layouts/SidebarLayout';
import MYS from '/Styles/mystyle.module.css'
import TitleNav from '../../../../src/components/Parts/TitleNav'

import { LuArrowLeft } from "react-icons/lu";
import Badge from '@mui/material/Badge';
import { useRouter, useParams } from 'next/router'
import CheckloginContext from '/context/auth/CheckloginContext'
import Skeleton from '@mui/material/Skeleton';

import BranchDetails from '../comp/BranchDetails'

import LibraryPosters from '../comp/LibraryPosters'
import LibraryPhotos from '../comp/LibraryPhotos'



import {
    IconButton,

    styled,
    TextField,
    Button,

} from '@mui/material';


export async function getServerSideProps(context) {
    const BranchCode = context.query.pageno[0];
    return {
        props: { BranchCode },
    }

}
const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));

function DashboardCrypto({ BranchCode }) {
    const Contextdata = useContext(CheckloginContext)
    const router = useRouter()

    const [IsLoading, setIsLoading] = useState(true);

    const [BranchData, setBranchData] = useState({});





    useEffect(() => {
        GetBranchData()
    }, [router.query])





    const GetBranchData = async () => {
        setIsLoading(true)
        const sendUM = { BranchCode: BranchCode, JwtToken: Contextdata.JwtToken }
        const data = await fetch("/api/V3/Admin/Branches/BranchDetails", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => {
            return a.json();
        })
            .then((parsed) => {
                if (parsed.ReqD.BranchData) {
                    if (parsed.ReqD.BranchData.length == 1) {
                        console.log(parsed.ReqD.BranchData[0])
                        setBranchData(parsed.ReqD.BranchData[0])


                        setIsLoading(false)

                    } else {
                        alert('Something Went Worng')
                    }
                }


            })
    }


    return (
        <>
            {!IsLoading &&

                <TitleNav Title={BranchData && BranchData.name} />
            }


            <div>
                
                <div className={MYS.MboxMain}>
                    
                            {!IsLoading &&

                                <BranchDetails BranchData={BranchData} />
                            }
                            {!IsLoading &&

                                <LibraryPosters BranchData={BranchData} />
                            }
                            {!IsLoading &&

                                <LibraryPhotos BranchData={BranchData} />
                            }





                        </div>

            </div>

        </>
    );
}

DashboardCrypto.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardCrypto;
