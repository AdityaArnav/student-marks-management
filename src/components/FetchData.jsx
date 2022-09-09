import React, { useEffect, useState } from 'react';
import "./fetchData.css"
import Axios from 'axios';

const url = `http://localhost:5000/data`;
const initialState={
    name:"",
    email:"",
    subject:"",
    marks:''
}

const FetchData = () => {
    const [user,setUser] = useState(initialState)
    const [data, setData] = useState([])

    useEffect(() => {
        dataFetch()

    }, [])
    const dataFetch = () => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setData(data)
            })
    };

    const handleSubmit = (e)=>{
        e.preventDefault();
        Axios.post(url,{
            name:user.name,
            email:user.email,
            subject:user.subject,
            marks: user.marks
        })
        // .then(res=>{
        //     console.log(res.user)
        // })
        dataFetch();
        
        // console.log(user);
    }

    const handleChange =(e) => {
        const {name,value} = e.target;
        setUser({...user, [name]:value})
    }

    return (
        <>
        <div className='main-box'>
        <h2>Student Data</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name</label>
                    <input type='text' placeholder='Enter Student Name' name='name' onChange={handleChange} />
                </div>
                <div>
                    <label>Email</label>
                    <input type='email' placeholder='Enter Email Address' name='email' onChange={handleChange} />
                </div>
                <div>
                    <label>Subject</label>
                    <input type='text' placeholder='Enter Subject' name='subject' onChange={handleChange} />
                </div>
                <div>
                    <label>marks</label>
                    <input type='text' placeholder='Enter Student Marks' name='marks' onChange={handleChange} />
                </div>
                <input type='submit'/>
            </form>
        </div>
            <table>
                <thead>
                    <tr>
                            <td>Id</td>
                            <td>Name</td>
                            <td>Email</td>
                            <td>Subject</td>
                            <td>Marks(in %)</td>
                            <td>Action</td>
                    </tr>
                </thead>
                <tbody>
                    
                        {
                            data.map((items,i) => {
                                return (
                                    <tr key={i}>
                                        <td>{items.id}</td>
                                        <td>{items.name}</td>
                                        <td>{items.email}</td>
                                        <td>{items.subject}</td>
                                        <td>{items.marks}</td>
                                        <td>
                                            <button>Edit</button>
                                            <button onClick={((id)=>setData())}>Delete</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }

                </tbody>

            </table>

        </>
    )
}

export default FetchData
