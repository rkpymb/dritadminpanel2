import React, { useState, useEffect, useContext } from 'react';
import { LuCopy,LuCheckCheck } from "react-icons/lu";
import CheckloginContext from '/context/auth/CheckloginContext'
import IconButton from '@mui/material/IconButton';
import { useRouter, useParams } from 'next/router'

const ClickCopyText = ({ CopyData }) => {
    const router = useRouter()
    const Contextdata = useContext(CheckloginContext)
    const [Copied, setCopied] = useState(false);
    const CopyPurl = async (e) => {
        const textToCopy = e;
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                setCopied(true)
              
            })
            .catch(err => {
               

            });
    }

    return (
        <div>
            {Copied ?
                <IconButton onClick={() => CopyPurl(CopyData)}>
                    <LuCheckCheck size={16} />
                </IconButton> :

                <IconButton onClick={() => CopyPurl(CopyData)}>
                    <LuCopy size={16} />
                </IconButton>


            }

        </div>
    )
}

export default ClickCopyText
