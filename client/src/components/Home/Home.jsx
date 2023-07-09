import { useEffect, useRef, useState } from "react";
import Navbar from "../Navbar/Navbar";
import PopUp from "../PopUp/PopUp";
import Card from "../Card/Card";
import './Home.css';
import useAuth from "../../hooks/useAuth";

const Home = ()=>{
    let popUp = useRef()
    const [posts, setPosts] = useState([]);
    const url = process.env.REACT_APP_HOST + 'post/all';
    const {auth} = useAuth()

    const fetchPosts = async () => {
        try {
            const res = await fetch(url, {
                method: 'GET',
                headers: {
                    "authorization": auth.token,
                    "content-type":"application/json"
                }
            })
            const {posts} = await res.json()
            console.log(posts)
            setPosts(posts)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        fetchPosts()
    },[])
    return(
        <>
            <Navbar modal={popUp}/>
            <div ref={popUp} className="popup-container">
                <PopUp modal={popUp}/>
            </div>
            <main className="posts-container">
                {
                    posts.map((post, idx)=> <Card post={post} key={idx}/>)
                }
            </main>
        </>
    )
}

export default Home;