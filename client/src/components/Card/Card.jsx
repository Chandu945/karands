import { useEffect, useState } from 'react';
import './Card.css'
import useAuth from '../../hooks/useAuth';

const Card = ({ post }) => {

    const url = process.env.REACT_APP_HOST;
    const [heart, setHeart] = useState({ display: true, count: post.likes.length });
    const [comment, setComment] = useState({ newComment: "", show: false, load: true, allComments : []});
    const { auth } = useAuth()

    const getComments = async () => {
        try {
            const res = await fetch(url + `comment/${post._id}`, {
                method: 'GET',
                headers: {
                    "authorization": auth.token,
                    "content-type": "application/json"
                }
            })

            const data = await res.json()
            setComment({ ...comment, load: false, allComments: data.comments })
        } catch (error) {
            console.log(error)
        }
    }

    const addLike = async (add) => {
        try {
            const res = await fetch(url + `post/${post._id}/like/?add=${add}`, {
                method: 'GET',
                headers: {
                    "authorization": auth.token,
                    "content-type": "application/json"
                }
            })
            const data = await res.json()
            console.log(data)
            setHeartColor(data.likes)
        } catch (error) {
            console.log(error)
        }
    }

    function setHeartColor(arr) {
        setHeart({ ...heart, count: arr.length, display: arr.includes(localStorage.getItem('id')) })
    }

    async function addNewComment(e) {
        e.preventDefault()
        try {
            const res = await fetch(url + 'comment', {
                method: 'POST',
                headers: {
                    "authorization": auth.token,
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    post: post._id,
                    title: comment.newComment
                })
            })
            const data = await res.json()
            getComments()
            setComment({...comment, newComment:""})
            console.log(data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        setHeartColor(post.likes)
    }, [])

    return (
        post && <div className="post-container">
            <div className="post-header">
                <div className="user-details">
                    <div className="profile-pic-con">
                        <img src={post.postedBy?.profilePic} alt="" />
                    </div>
                    <div className="details-con">
                        <h2>{post.postedBy?.name}</h2>
                        <p>{post.createdAt.split('T')[0]}</p>
                    </div>
                </div>
                <div className='delete-btn'></div>
            </div>
            <div className="post-image">
                <img src={post.image} alt={` of ${post.postedBy?.name}`} />
            </div>
            <div className="post-likes">
                <div className="likes">
                    <div className="icons">
                        <div className="heart-btn">
                            {(!heart.display) ? <div className="plain-heart" onClick={() => addLike(true)}></div>
                                : <div className="color-heart" onClick={() => addLike(false)}></div>}
                            <p>{heart.count} likes</p>
                        </div>
                        <div className="send-btn"></div>
                    </div>
                </div>
                <div className="comment-btn" title='show comments' onClick={() => setComment({ ...comment, show: !comment.show })}></div>
            </div>
            <div className="description">
                <h4 >{post.title}</h4>
            </div>
            {
                comment.show && <div className="comment-container">
                    <form className="new-comment-form" onSubmit={(e) => addNewComment(e)}>
                        <input
                            className="input"
                            type="text"
                            onChange={(e) => setComment({ ...comment, newComment: e.target.value })}
                            value={comment.newComment}
                            placeholder="New comment"
                            autoComplete="off"
                            required
                        />
                        <button className="btn">Add</button>
                    </form>
                    {comment.load ?
                        <p className="get-comments" onClick={getComments}>Load comments <i className="fas fa-arrow-down"></i></p> :
                        (<p className="get-comments" onClick={() => setComment({ ...comment, load: true, allComments: [] })}>Collapse <i className="fas fa-arrow-up"></i></p>)
                    }
                    {
                        comment.allComments?.length > 0 && <div className="all-comments">
                            {
                                comment.allComments.map((comment, idx)=>{
                                    return(
                                        <div key={idx} className='comment'>
                                            <img src={comment.commentedBy?.profilePic} alt="" />
                                            <strong>{comment.title}</strong>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    }
                </div>
            }
        </div>
    )
}
export default Card;