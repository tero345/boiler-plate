import React, {useState} from 'react' ;
import {useDispatch} from 'react-redux';
import {loginUser} from '../../../actions/user_action';
import { useNavigate } from 'react-router-dom';

function LoginPage(props) {
    const dispatch = useDispatch();

    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");

    let navigate = useNavigate();

    // Email click
    const onEmailHandler = (event) => {
        //console.log("event = " + event);
        setEmail(event.currentTarget.value);
    }

    // Pw click
    const onPwHandler = (event) => {
        setPassword(event.currentTarget.value);
    }

    // Pw click
    const loginHandler = (event) => {
        //setPassword(event.currentTarget.value);
        console.log(" 로그인 ");
        event.preventDefault(); // 이벤트 방지

        console.log("Email=", Email);

        let param = {
            email : Email,
            password : Password
        }

        dispatch(loginUser(param)).then(response => {
            if(response.payload.loginSuccess){
                //props.history.push('/')
                navigate('/')
            }else{
                alert('Error');
            }
        })
    }

    return (
        <div style={{
            display : 'flex', justifyContent: 'center', alignItems : 'center', width:'100%', height:'100vh'
        }}>
            <form style={{ display:'flex', flexDirection:'column'}} onSubmit={loginHandler}>
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler}/>
                <label>Password</label>
                <input type="password" value={Password} onChange={onPwHandler}/>
                <br />
                <button>Login</button>
            </form>
        </div>
    )
}

export default LoginPage
