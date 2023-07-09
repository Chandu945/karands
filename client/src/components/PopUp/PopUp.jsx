import './PopUp.css';
import { useState } from "react";
import toast from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';

const PopUp = ({modal})=>{

    const [data, setData] = useState({
        title: "",
        description: ""
    })

    const [image, setImage] = useState()

    const {auth} = useAuth()

    const handleSubmit = async (e) => {
        toast.loading('Loading...')
        e.preventDefault();
        let url = process.env.REACT_APP_HOST + 'post';
        try {
            const formData = new FormData()

            formData.append('title', data.title)
            formData.append('description', data.description)
            formData.append('image', image)

            for (let value of formData.values()){
                console.log(value);
            }
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    "authorization": auth.token
                },
                mode: 'cors',
                body: formData
            })
            const result = await res.json();
            toast.dismiss()
            if (result.status) {
                toast.success(result.message);
            }else{
                toast.error(result.message);
            }
        } catch (error) {
            toast.dismiss()
            console.log(error);
            toast.error('Something went wrong, try again later');
        }
    }

    const closeModal = ()=>{
        modal.current.style.top = '-300%'
    }
    return(
        <form onSubmit={handleSubmit} className="create-post-form form">
            <i className="fas fa-times" onClick={closeModal}></i>
            <h1>Create New Post</h1>
            <input
                    className="input"
                    type="text"
                    onChange={(e) => setData({ ...data, title: e.target.value })}
                    value={data.title}
                    placeholder="Title"
                    autoComplete="off"
                    required
                />
                <input
                    className="input"
                    type="text"
                    onChange={(e) => setData({ ...data, description: e.target.value })}
                    value={data.description}
                    placeholder="Description"
                    autoComplete="off"
                    required
                />
                <input
                    className="input"
                    type='file'
                    onChange={(e) => setImage(e.target.files[0])}
                    required
                />
                <button className="create-post-btn btn" > Create</button>
        </form>
    )
}
export default PopUp
