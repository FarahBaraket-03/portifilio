import React, { useEffect, useState } from 'react'
import {lock,deny,no,noo,welcome,up} from "./assests"
import { Link } from 'react-router-dom'
import Dashboard from './Dashboard';
import axios from "axios";
import Swal from 'sweetalert2'

function Login() {
  const [email,setemail]=useState('');
  const [password,setpassword]=useState('');
  const [newpassword,setnewpassword]=useState('');
  const [editUser,setEditUser]=useState('');
  const config=(email,pwd,e)=>{
    e.preventDefault()
    if(email.length===0 || pwd.length===0){
      Swal.fire(
        'Wrong',
        'empty inputs',
        'error'
      )
    }
    else{
      getUser(email,pwd,e)
    }
  }
  const config2=(email,pwd,e)=>{
    e.preventDefault()
    if(email.length===0 || pwd.length===0){
      Swal.fire(
        'Wrong',
        'empty inputs',
        'error'
      )
    }
    else{
      axios.get(`http://localhost:5000/user/forget/${email}`).
      then((res)=>{
        console.log(res.data);
        setEditUser(res.data);
        if(res.data==="you don't exist"){
          Swal.fire({
            title: res.data,
            text: "You Are Not from our Team or Correct Your Email",
            imageUrl: no,
            imageWidth: 350,
            imageHeight: 400,
            imageAlt: 'Custom image',
          })
        }
        else{
          console.log(editUser);
          axios.put(`http://localhost:5000/user/update/${editUser._id}`,
          {
            "fullname": editUser.name,
      "description": editUser.description,
      "age": editUser.age ,
      "image": editUser.image ,
      "email":email,
      "password": pwd

          }).
          then((res)=>{
            Swal.fire({
              title: "Perfect",
              text: "You have changed your password",
              icon:"success"
            })

          }).catch((err)=>{console.log(err)})
        }

      })
      .catch((error)=>{
        console.log(error)
      })
    }
  }
  const[place,setplace]=useState(false)
  const getUser=(email,pwd,e)=>{
    e.preventDefault()
    axios.get(`http://localhost:5000/user/login/${email}/${pwd}`).
      then((res)=>{
        // console.log(res.data)
        setEditUser(res.data)
        if(res.data==="Can't Enter"){
          Swal.fire({
            title: res.data,
            text: "You Are Not from our Team",
            imageUrl: deny,
            imageWidth: 350,
            imageHeight: 400,
            imageAlt: 'Custom image',
          })
        }
        else{
          if(res.data==="Your Password Is Wrong"){
            Swal.fire({
              title: res.data,
              text: "Correct Your Password , Then Try Again",
              imageUrl: noo,
              imageWidth: 350,
              imageHeight: 350,
              imageAlt: 'Custom image',
            })
          }
          else{
            console.log(editUser,res.data)
            Swal.fire({
              title: res.data.fullname+" welcome To Dashboard",
              text: "Have A Good Day",
              imageUrl: welcome,
              imageWidth: 350,
              imageHeight: 350,
              imageAlt: 'Custom image',
            })
            setplace(true)
          }
        }

      })
      .catch((error)=>{
        console.log(error)
      })
  }

  return (
    <div>
     
      { place ? <Dashboard/>:
      (<div className='container'>
      <div className='cont_login'>
      <div class="alert alert-warning" role="alert">
  <p className='text-center'>A simple warning alert—check it out! You can't enter Unless You are from Our Team</p>
  <p className='text-center'><Link to="/">Back To Home Page</Link></p>
</div>
        <div className='form_login '>
        <h1 className='h1'>Log In</h1>
        <div className='row'>
        <div className='col-lg-6 col-md-6 col-sm-12 text-center'>
            <img src={lock} className='img-fluid'></img>
        </div>
<div className='col-lg-6 col-md-6 col-sm-12'>
<form>
  {/* Email input */}
  <div className="form-outline mb-4">
    <input type="email" id="form2Example1" onChange={(e)=>setemail(e.target.value )} className="form-control" />
    <label className="form-label" htmlFor="form2Example1" >Email address</label>
  </div>
  {/* Password input */}
  <div className="form-outline mb-4 d-flex flex-column">
    <input type="password" id="form2Example2" onChange={(e)=>setpassword(e.target.value )} className="form-control" />
    <label className="form-label" htmlFor="form2Example2" >Password</label>
    <a href='' className='mt-3 text-dark fs-5' data-bs-toggle="modal" data-bs-target="#exampleModal">
    <img width={50} className='me-2' height={50} src="https://img.icons8.com/color/48/forget.png" alt="forget" />

      Forget Password</a>
  </div>
  {/* 2 column grid layout for inline styling */}
  {/* Submit button */}
 
  <button  className="btn btn-warning btn-block mb-4" onClick={(e)=>config(email,password,e)}>LogIn</button>
</form>
</div>
        </div>

        </div>
      </div>
    </div>)}
   
   {/* Modals */}
   <div>
  {/* Modal */}
  <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="exampleModalLabel">Change password</h1>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        <div className="modal-body">
          <div className='text-center'>
          <img className='img-fluid ' width={200} height={200} src={up}></img>
          </div>
        <form>
  {/* Email input */}
  <div className="form-outline mb-4">
    <input type="email" id="form2Example1" onChange={(e)=>setemail(e.target.value )} className="form-control" />
    <label className="form-label" htmlFor="form2Example1" >Email address</label>
  </div>
  {/* Password input */}
  <div className="form-outline mb-4 d-flex flex-column">
    <input type="password" id="form2Example2" onChange={(e)=>setnewpassword(e.target.value )} className="form-control" />
    <label className="form-label" htmlFor="form2Example2" >New Password</label>
  </div>
  {/* 2 column grid layout for inline styling */}
  {/* Submit button */}

</form>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" onClick={(e)=>config2(email,newpassword,e)} className="btn btn-warning">Save change</button>
        </div>
      </div>
    </div>
  </div>
</div>


    </div>
  )
}

export default Login
