import { useState } from "react";
import { authClient } from "./auth-client.js";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await authClient.signIn.email({email, password});
      console.log("Login successful:", res);
    }
    catch (error) {
      console.error("Login failed:", error);
    }
  }

  return (
    <div className="login-page">
      
    </div>
  )
}