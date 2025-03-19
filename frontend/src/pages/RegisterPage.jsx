import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function RegisterPage() {
  const [name, setUsername] = useState("");  // FIXED
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!name || !email || !password) {
      alert("All fields are required!");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:5001/api/auth/signup", {
        name,
        email,
        password,
      });
  
      console.log("Registration successful:", response.data);
      alert("Registered Successfully!!")
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error); // Show the full error stack trace
      if (error.response?.data?.message) { // If there is a server message
          alert(error.response.data.message); // Show the server message
      } else if (error.message){ // If there is no server message
          alert("Registration failed: " + error.message); // Show a generic error with the error message
      } else {
          alert("Registration failed"); // Show a generic error
      }
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold">Register</h2>
      <input
        type="text"
        placeholder="Username"  // FIXED
        className="mt-2 p-2 border rounded-md"
        value={name}  // FIXED
        onChange={(e) => setUsername(e.target.value)}  // FIXED
      />
      <input
        type="email"
        placeholder="Email"
        className="mt-2 p-2 border rounded-md"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="mt-2 p-2 border rounded-md"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister} className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md">
        Sign Up
      </button>
    </div>
  );
}

export default RegisterPage;
