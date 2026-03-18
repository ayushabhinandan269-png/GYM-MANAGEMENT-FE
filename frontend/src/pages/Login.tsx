import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/authAPI";
import { useAuth } from "../context/AuthContext";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { user, login } = useAuth();

  useEffect(() => {

    const token = user.token;
    const role = user.role;

    if (token) {

      if (role === "admin") navigate("/admin/dashboard");
      else if (role === "trainer") navigate("/trainer/dashboard");
      else navigate("/dashboard");

    }

  }, [user, navigate]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    try {

      const response = await loginUser({
        email,
        password
      });

      const token = response?.data?.token;
      const role = response?.data?.role;

      if (!token || !role) {
        throw new Error("Invalid server response");
      }
      

      login(token, role);

      alert("Login successful");

      if (role === "admin") navigate("/admin/dashboard");
      else if (role === "trainer") navigate("/trainer/dashboard");
      else navigate("/dashboard");

    } catch (error: any) {

      alert(error?.response?.data?.message || error.message || "Login failed");

    }

  };

  return (
    <div style={{ display:"flex", justifyContent:"center", alignItems:"center", height:"85vh", background:"#f4f4f4" }}>
      <form autoComplete="on" onSubmit={handleLogin}
        style={{ width:"420px", padding:"45px", borderRadius:"14px", boxShadow:"0 15px 35px rgba(0,0,0,0.15)", background:"white", textAlign:"center" }}>

        <h2 style={{ fontSize:"30px", marginBottom:"35px", fontWeight:"600" }}>
          Login
        </h2>

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          style={{ width:"100%", padding:"13px", marginBottom:"18px", borderRadius:"8px", border:"1px solid #ddd"}}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          style={{ width:"100%", padding:"13px", marginBottom:"28px", borderRadius:"8px", border:"1px solid #ddd"}}
        />

        <button
          disabled={!email || !password}
          style={{
            width:"100%",
            padding:"13px",
            background:!email || !password ? "#888":"#111",
            color:"white",
            border:"none",
            borderRadius:"8px",
            cursor:"pointer"
          }}
        >
          Login
        </button>

      </form>
    </div>
  );
}

export default Login;