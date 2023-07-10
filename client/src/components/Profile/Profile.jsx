import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import './Profile.css';
import { Link } from "react-router-dom";
import Follow from "../Follow/Follow";

const Profile = ()=>{
    const url = process.env.REACT_APP_HOST ;
    const {auth} = useAuth();
    const [data, setData] = useState({posts: [], likes: [], comments: [], requests: [], suggestions: [], followers: [], following: [], current: "posts"})

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
            setData({current: "posts", posts, comments: [], likes: [],requests: [], suggestions: [], followers: [], following: []})
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
            setData({...data, comments, posts: [], likes: [],requests: [], suggestions: [], followers: [], following: []})
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
            setData({...data, likes: posts, posts: [], comments: [],requests: [], suggestions: [], followers: [], following: []})
        } catch (error) {
            console.log(error);
        }
    }

    const fetchSuggestions = async () => {
        try {
            const res = await fetch(url + 'follow/suggestions', {
                method: 'GET',
                headers: {
                    "authorization": auth.token,
                    "content-type":"application/json"
                }
            })
            const {users} = await res.json()
            setData({...data, likes: [], posts: [], comments: [],requests: [], suggestions: users, followers: [], following: []})
        } catch (error) {
            console.log(error);
        }
    }


    const fetchRequests = async () => {
        try {
            const res = await fetch(url + 'follow/requests', {
                method: 'GET',
                headers: {
                    "authorization": auth.token,
                    "content-type":"application/json"
                }
            })
            const {requests} = await res.json();
            console.log(requests)
            setData({...data, likes: [], posts: [], comments: [],requests: requests, suggestions: [], followers: [], following: []})
        } catch (error) {
            console.log(error);
        }
    }

    const fetchFollowers = async () => {
        try {
            const res = await fetch(url + 'follow/followers', {
                method: 'GET',
                headers: {
                    "authorization": auth.token,
                    "content-type":"application/json"
                }
            })
            const {followers} = await res.json();
            console.log(followers)
            setData({...data, likes: [], posts: [], comments: [],requests: [], suggestions: [], followers, following: []})
        } catch (error) {
            console.log(error);
        }
    }

    const fetchFollowing = async () => {
        try {
            const res = await fetch(url + 'follow/followings', {
                method: 'GET',
                headers: {
                    "authorization": auth.token,
                    "content-type":"application/json"
                }
            })
            const {followings} = await res.json();
            console.log(followings)
            setData({...data, likes: [], posts: [], comments: [],requests: [], suggestions: [], followers: [], following: followings})
        } catch (error) {
            console.log(error);
        }
    }



    

    useEffect(()=>{
        switch (data.current) {
            case "posts":
                fetchPosts()
                break;
            case "comments":
                fetchComments()
                break;
            case "likes":
                fetchLikes()
                break;
            case "suggestions":
                fetchSuggestions()
                break;
            case "requests":
                fetchRequests()
                break;
            case "followers":
                fetchFollowers()
                break;
            case "following":
                fetchFollowing()
                break;
        
            default:
                break;
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
                        <li className={data.current === 'requests'? "active" : ""} onClick={()=>{setData({...data, current: "requests"})}}>requests</li>
                        <li className={data.current === 'followers'? "active" : ""} onClick={()=>{setData({...data, current: "followers"})}}>followers</li>
                        <li className={data.current === 'following'? "active" : ""} onClick={()=>{setData({...data, current: "following"})}}>following</li>
                        <li className={data.current === 'suggestions'? "active" : ""} onClick={()=>{setData({...data, current: "suggestions"})}}>suggestions</li>
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
                            <div className="likes-card" key={idx}>
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
                            <div className="likes-card" key={idx}>
                                <h4>{comment.title}</h4>
                                <img src={comment.post?.image} alt="" key={idx} />
                            </div>
                        )
                    })
                }
            </main>}
            {data.suggestions?.length > 0 && <main className="main-posts-container">
                {
                    data.suggestions.map((user, idx)=>{
                        return(
                            <Follow user={user} btn="follow" key={idx}/>
                        )
                    })
                }
            </main>}
            {data.requests?.length > 0 && <main className="main-posts-container">
                {
                    data.requests.map((request, idx)=>{
                        return(
                            <Follow user={request.followedBy} btn="accept" id={request._id} key={idx}/>
                        )
                    })
                }
            </main>}
            {data.followers?.length > 0 && <main className="main-posts-container">
                {
                    data.followers.map((request, idx)=>{
                        return(
                            <Follow user={request.followedBy}  key={idx}/>
                        )
                    })
                }
            </main>}
            {data.following?.length > 0 && <main className="main-posts-container">
                {
                    data.following.map((request, idx)=>{
                        return(
                            <Follow user={request.followedTo}  key={idx}/>
                        )
                    })
                }
            </main>}
        </>
    )
}

export default Profile;