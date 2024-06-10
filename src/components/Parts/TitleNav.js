import React, { useState, useEffect, useContext } from 'react';
import { LuArrowLeft } from "react-icons/lu";
import Head from 'next/head';
import Badge from '@mui/material/Badge';
import MYS from '/Styles/mystyle.module.css'

import { useRouter, useParams } from 'next/router'

import {

    IconButton,

    styled
} from '@mui/material';

const TitleNav = ({ Title }) => {
    const router = useRouter()
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
             <Head>
                <title>{Title}</title>
            </Head>
            <div className={MYS.TitleHboxMain}>
                <div className={MYS.TitleHbox}>
                    <div className={MYS.TitleWithBackHeaderA}>
                        <IconButton aria-label="cart" onClick={() => router.back()}>
                            <StyledBadge color="secondary" >
                                <LuArrowLeft />
                            </StyledBadge>
                        </IconButton>
                        <div>
                            <span>{Title} </span>
                        </div>
                    </div>
                    <div className={MYS.TitleWithBackHeaderB}>

                    </div>

                </div>
            </div>

        </div>
    )
}

export default TitleNav
