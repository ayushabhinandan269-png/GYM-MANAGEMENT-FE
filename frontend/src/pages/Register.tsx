import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/authAPI";

function Register() {

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(()=>{
    const token = localStorage.getItem("token");
    if(token) navigate("/dashboard");
  },[navigate]);

  const handleRegister = async (e:any)=>{

    e.preventDefault();

    try{

      await registerUser({
        name,
        email,
        password
      });

      alert("Registration successful!");
      navigate("/login");

    }catch(error:any){

      alert(error.response?.data?.message || "Registration failed");

    }

  };

  return (

    <div style={{
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      height:"85vh",
      background:"#f4f4f4"
    }}>

      <form
        onSubmit={handleRegister}
        style={{
          width:"420px",
          padding:"45px",
          borderRadius:"14px",
          background:"white",
          boxShadow:"0 10px 30px rgba(0,0,0,0.1)",
          display:"flex",
          flexDirection:"column",
          gap:"15px"
        }}
      >

        <h2 style={{textAlign:"center",marginBottom:"10px"}}>
          Register
        </h2>

        <input
          placeholder="Full Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          style={{
            padding:"12px",
            borderRadius:"8px",
            border:"1px solid #ddd",
            fontSize:"14px"
          }}
        />

        <input
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          style={{
            padding:"12px",
            borderRadius:"8px",
            border:"1px solid #ddd",
            fontSize:"14px"
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          style={{
            padding:"12px",
            borderRadius:"8px",
            border:"1px solid #ddd",
            fontSize:"14px"
          }}
        />

        <button
          disabled={!name || !email || !password}
          style={{
            padding:"12px",
            background:"#111",
            color:"white",
            border:"none",
            borderRadius:"8px",
            cursor:"pointer",
            fontSize:"15px",
            marginTop:"10px",
            opacity: !name || !email || !password ? 0.6 : 1
          }}
        >
          Register
        </button>

      </form>

    </div>

  );
}

export default Register;