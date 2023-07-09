import { useState } from "react";
import './Register.css';
import { Link, useNavigate } from "react-router-dom";
import logo from '../Navbar/spaceX logo.jpeg';
import toast from 'react-hot-toast';

const Register = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        conPass: ""
    })
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        toast.loading('Loading...')
        e.preventDefault();
        let url = process.env.REACT_APP_HOST +'user/register';
        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify({
                    name:data.name,
                    email: data.email,
                    password: data.password
                })
            })
            const result = await res.json();
            toast.dismiss()
            if (result.status === 'success') {
                toast.success(result.message);
                navigate('/login');
            }else{
                toast.error(result.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong, try again later');
        }
    }
    return (
        <main className="register-container">
            <div>
                <img src={logo} alt="logo" className="logo" />
            </div>
            <h1>Registration Form</h1>
            <form className="login form" onSubmit={handleSubmit}>
                <input
                    className="input"
                    type="text"
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                    value={data.name}
                    placeholder="Name"
                    autoComplete="off"
                    required
                />
                <input
                    className="input"
                    type="text"
                    onChange={(e) => setData({ ...data, email: e.target.value })}
                    value={data.email}
                    placeholder="Email"
                    autoComplete="off"
                    required
                />
                <input
                    className="input"
                    type="password"
                    onChange={(e) => setData({ ...data, password: e.target.value })}
                    value={data.password}
                    placeholder="Password"
                    autoComplete="off"
                    required
                />
                <input
                    className={`input ${data.password !== data.conPass ? 'red-border' : 'green-border'}`}
                    type="password"
                    onChange={(e) => setData({ ...data, conPass: e.target.value })}
                    value={data.conPass}
                    placeholder="Confirm password"
                    autoComplete="off"
                    required
                />
                <button className="btn" disabled={data.password !== data.conPass ? true : false}
                > Register</button>
            </form>
            <p>Already have an acoout <Link to={'/login'}>Login</Link></p>
        </main>
    )
}
export default Register;