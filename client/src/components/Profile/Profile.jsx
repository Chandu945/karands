import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import './Profile.css';
import { Link } from "react-router-dom";

const Profile = ()=>{
    const url = process.env.REACT_APP_HOST ;
    const {auth} = useAuth();
    const [data, setData] = useState({posts: [], likes: [], comments: [], current: "posts"})

    const fetchPosts = async () => {
        try {
            const res = await fetch(url + 'post', {
                method: 'GET',
                headers: {
                    "authorization": auth.token,
                    "content-type":"application/json"
                }
            })
            const {posts} = await res.json()
            setData({current: "posts", posts, comments: [], likes: []})
            console.log(posts)
        } catch (error) {
            console.log(error);
        }
    }
    const fetchComments = async () => {
        try {
            const res = await fetch(url + 'comment', {
                method: 'GET',
                headers: {
                    "authorization": auth.token,
                    "content-type":"application/json"
                }
            })
            const {comments} = await res.json();
            setData({...data, comments, posts: [], likes: []})
            console.log(comments)
        } catch (error) {
            console.log(error);
        }
    }
    const fetchLikes = async () => {
        try {
            const res = await fetch(url + 'post/likes', {
                method: 'GET',
                headers: {
                    "authorization": auth.token,
                    "content-type":"application/json"
                }
            })
            const {posts} = await res.json()
            setData({...data, likes: posts, posts: [], comments: []})
        } catch (error) {
            console.log(error);
        }
    }

    

    useEffect(()=>{
        if(data.current === 'posts'){
            fetchPosts()
        }
        else if(data.current === 'comments'){
            fetchComments()
        }
        else{
            fetchLikes()
        }
    },[data.current])

    return(
        <>
            <header className="profile-navbar">
                <nav>
                    <ul>
                        <li><Link to={'/'}><i className="fas fa-angle-left"></i>Back</Link></li>
                        <li className={data.current === 'posts'? "active":""} onClick={()=>{setData({...data, current: "posts"})}}>posts</li>
                        <li className={data.current === 'comments'? "active":""} onClick={()=>{setData({...data, current: "comments"})}}>comments</li>
                        <li className={data.current === 'likes'? "active" : ""} onClick={()=>{setData({...data, current: "likes"})}}>likes</li>
                    </ul>
                </nav>
            </header>
            {data.posts?.length > 0 && <main className="main-posts-container">
                {
                    data.posts.map((post, idx)=>{
                        return(<img src={post.image} alt="" key={idx} />)
                    })
                }
            </main>}
            {data.likes?.length > 0 && <main className="main-posts-container">
                {
                    data.likes.map((post, idx)=>{
                        return(
                            <div className="likes-card">
                                <h4>{post.title}</h4>
                                <img src={post.image} alt="" key={idx} />
                            </div>
                        )
                    })
                }
            </main>}
            {data.comments?.length > 0 && <main className="main-posts-container">
                {
                    data.comments.map((comment, idx)=>{
                        return(
                            <div className="likes-card">
                                <h4>{comment.title}</h4>
                                <img src={comment.post?.image} alt="" key={idx} />
                            </div>
                        )
                    })
                }
            </main>}
        </>
    )
}

export default Profile;