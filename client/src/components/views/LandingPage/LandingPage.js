import React, {useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function LandingPage() {
    let navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:4000/api/hello').then(response => {
            console.log(response.data); 
        })
    }, [])

    const logoutHandler = (event) => {
        axios.get('http://localhost:4000/logout').then(response => {
            navigate('/login');
        });
    }


    return (
        <div style={{
            display : 'flex', justifyContent: 'center', alignItems : 'center', width:'100%', height:'100vh'
        }}>
            LandingPage

            <button onClick={logoutHandler}>Logout</button>
        </div>
    )
}

export default LandingPage
