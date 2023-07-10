import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import './Follow.css';

const Follow = ({user, btn, id})=>{

    const {auth} = useAuth()
    const url = process.env.REACT_APP_HOST ;
    const [isPending, setPending] = useState(false);
    const [isAccepted, setAccepted] = useState(false);

    const createFollowRequest = async()=>{
        try {
            const res = await fetch(url + 'follow', {
                method: 'POST',
                headers: {
                    "authorization": auth.token,
                    "content-type": 'application/json'
                },
                body: JSON.stringify({
                    to: user._id
                })
            })

            const data = await res.json();
            setPending(true)
            console.log(data);
        } catch (error) {
            console.log(error)
        }
    }

    const acceptFollowRequest = async()=>{
        try {
            const res = await fetch(url + `follow/${id}`, {
                method: 'PATCH',
                headers: {
                    "authorization": auth.token,
                    "content-type": 'application/json'
                }
            })

            const data = await res.json();
            setAccepted(true)
            console.log(data);

        } catch (error) {
            console.log(error)
        }
    }

    return(
        <div className="follow-card">
            <h3>{user.name}</h3>
            <img src={user.profilePic} alt="" />
            {
                !isPending && btn === "follow" && <button className="btn" onClick={createFollowRequest}>Follow</button>
            }
            {
                !isAccepted && btn === "accept" && <button className="btn" onClick={acceptFollowRequest}>Accept</button>
            }
            {
                isPending && <strong>Pending</strong>
            }
            {
                isAccepted && <strong>Accepted</strong>
            }
        </div>
    )
}

export default Follow;