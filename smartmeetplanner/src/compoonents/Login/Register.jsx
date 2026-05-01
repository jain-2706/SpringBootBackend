import { useState } from "react";
import { InputField } from "./InputField";
import { PrimaryButton } from "./PrimaryButton";
import { AuthCard } from "./AuthCard";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ FIXED: Direct async function
  const handleRegister = async () => {
    // Basic validation
    if (!form.email || !form.password || !form.username) {
      alert("Please fill required fields");
      return;
    }
    console.log("email: ", form.email)
    console.log("password: ",form.password)
    setLoading(true);

    try {
      const res = await fetch("https://motivator-antelope-cucumber.ngrok-free.dev/addUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        // ✅ Success
        alert("Registration successful!");
        console.log("registered: ", data);
        // ✅ Redirect
        navigate("/login", { replace: true });
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard
      title="Create Account"
      subtitle="Join MeetingAI today"
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600">
            Sign in
          </Link>
        </>
      }
    >
      <InputField
        label="Username"
        name="username"
        value={form.username}
        onChange={handleChange}
      />

      <InputField
        label="Email"
        name="email"
        value={form.email}
        onChange={handleChange}
      />

      <InputField
        label="Password"
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
      />

      <PrimaryButton
        text={loading ? "Registering..." : "Register"}
        
        onClick={handleRegister}
      />
    </AuthCard>
  );
}