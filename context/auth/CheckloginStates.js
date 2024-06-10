import CheckloginContext from './CheckloginContext'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
const CheckloginStates = (props) => {
    const [Data, setData] = useState({});
    const [WebData, setWebData] = useState(null);
    const [IsLogin, setIsLogin] = useState(false);
    const [JwtToken, setJwtToken] = useState(null);

    const router = useRouter()


    const Logout = async () => {
        setWebData(null)
        setData(null)
        setIsLogin(false)
        setJwtToken(null)


    };


    // Function to get cookie by name
    const getCookie = (name) => {
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            const [cookieName, cookieValue] = cookie.split('=');
            if (cookieName.trim() === name) {
                return decodeURIComponent(cookieValue);
            }
        }
        return null;
    };

    // Function to remove cookie by name
    const removeCookie = (name) => {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    };

    const CheckUSerLogin = async () => {
        try {
            const token = getCookie('jwt_token');

            if (token) {

                setJwtToken(token)
                const sendUM = { ud: 'tokenpasscode' };
                const data = await fetch("/api/V3/auth/CheckAccount", {
                    method: "POST",
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(sendUM)
                });
                const parsed = await data.json();
                console.log('parsed C')
                console.log(parsed)

                if (parsed.ReqData.WebData && parsed.ReqData.SatusData == true) {
                    setIsLogin(true);
                    setWebData(parsed.ReqData.WebData)

                    setData(parsed.ReqData.UserData)
                }

            }
        } catch (error) {
            setIsLogin(false);
        }
    };


    useEffect(() => {
        CheckUSerLogin()

    }, [router.query]);



    return (
        <CheckloginContext.Provider value={{ Data, IsLogin, JwtToken, WebData, Logout }}>
            {props.children}
        </CheckloginContext.Provider>
    )

}
export default CheckloginStates;