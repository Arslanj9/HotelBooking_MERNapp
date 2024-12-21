import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom"
import '../styles/Register.scss'

const Register = () => {

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
  });


  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      [name]: name === "profileImage" ? files[0] : value,
    });
  };

  console.log(formData)





  
  
  const [passwordMatch, setPasswordMatch] = useState(true)

  useEffect(() => {
    setPasswordMatch(formData.password === formData.confirmPassword || formData.confirmPassword === "")
  })

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const register_form = new FormData()

      for (var key in formData) {
        register_form.append(key, formData[key])
      }

      // Using FETCH
      const response = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        body: register_form
      })

      if (response.ok) {
        navigate("/login")
      }
    } catch (err) {
      console.log("Registration failed", err.message)
    }
  }






  return (
    <div className="register">
      <div className="register_content">
        <form className="register_content_form" onSubmit={handleSubmit}>
          <input type="text" placeholder="First Name" onChange={handleChange} name="firstName" value={formData.firstName} required/>
          <input type="text" placeholder="Last Name" onChange={handleChange} name="lastName" value={formData.lastName} required/>
          <input type="email" placeholder="Email" onChange={handleChange} name="email" value={formData.email} required/>
          <input type="password" placeholder="Password" onChange={handleChange} name="password" value={formData.password} required/>
          <input type="password" placeholder="Confirm Password" onChange={handleChange} name="confirmPassword" value={formData.confirmPassword} required/>

          {!passwordMatch && (
            <p style={{ color: "red" }}>Passwords are not matched!</p>
          )}

          <input id="image" type="file" onChange={handleChange} name="profileImage" accept="image/*" style={{ display: "none" }} required/>
          <label htmlFor="image">
            <img src="/assets/addImage.png" alt="add profile image" />
            <p>Upload Your Photo</p>
          </label>
          <button type="submit">Register</button>
        </form>
        <p>Already have an account? <a href="/login">Login Here</a> </p>
      </div>
    </div>
  )
}

export default Register