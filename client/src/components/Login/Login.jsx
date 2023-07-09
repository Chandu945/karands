import { useState } from "react";
import './Login.css';
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import logo from '../Navbar/spaceX logo.jpeg';
import toast from 'react-hot-toast';

const Login = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        conPass: ""
    })

    const {auth, setAuth} = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        toast.loading('Loading...');
        let url = process.env.REACT_APP_HOST +'user/login';
        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify({
                    email: data.email,
                    password: data.password
                })
            })
            const result = await res.json()
            toast.dismiss();
            if(result.status === 'success'){
                toast.success(result.message)
                localStorage.setItem('auth-token', result.token)
                localStorage.setItem('id', result.id)
                localStorage.setItem('profile', result.profile)
                setAuth({...auth, token: result.token});
                navigate('/');
            }else{
                toast.error(result.message)
            }
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong, try again later');
        }
    }
    return (
        <main className="login-container">
            <div>
                <img src={logo} alt="logo" className="logo" />
            </div>
            <h1>Login Form</h1>
            <form className="login form" onSubmit={handleSubmit}>
                <input
                    className="input"
                    type="text"
                    onChange={(e)=> setData({...data, email: e.target.value})}
                    value={data.email}
                    placeholder="Email"
                    autoComplete="off"
                    required
                />
                <input
                    className="input"
                    type="password"
                    onChange={(e)=> setData({...data, password: e.target.value})}
                    value={data.password}
                    placeholder="Password"
                    autoComplete="off"
                    required
                />
                <input
                    className={`input ${data.password !== data.conPass ? 'red-border' : 'green-border'}`}
                    type="password"
                    onChange={(e)=> setData({...data, conPass: e.target.value})}
                    value={data.conPass}
                    placeholder="Confirm password"
                    autoComplete="off"
                    required
                />
                <button className="btn" disabled={data.password !== data.conPass? true : false}
                > Login</button>
            </form>
            <p>Don't have an account <Link to={'/register'}>Register</Link></p>
        </main>
    )
}
export default Login;