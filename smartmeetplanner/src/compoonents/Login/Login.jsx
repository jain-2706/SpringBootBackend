import { useState } from "react";
import { InputField } from "./InputField";
import { PrimaryButton } from "./PrimaryButton";
import { AuthCard } from "./AuthCard";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // const handleLogin = async () => {
    //     try{
    //         // Call your backend here
    //         const res = await fetch("https://motivator-antelope-cucumber.ngrok-free.dev/loginUser",{
    //             method:"POST",
    //             headers:{
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify(form), // { email, password }
    //         })
    //         const data = await res.text();
    //         console.log(data)
    //         if (res.status === 201) {
    //             // ✅ Store tokens
    //             localStorage.setItem("refreshToken", data.refreshToken);

    //             // ✅ Store user
    //             localStorage.setItem("user", JSON.stringify(data.user));

    //             // ✅ Redirect to home
    //             navigate("/");
    //         }
    //         else {
    //             alert(data.message || "Invalid credentials");
    //         }
    //     }
    //     catch (err) {
    //         console.error(err);
    //         alert("Server error");
    //     }
    // };

    const handleLogin = async () => {
    try {
        const res = await fetch("https://motivator-antelope-cucumber.ngrok-free.dev/loginUser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        });

        const token = await res.text();

        console.log(token);

        if (res.ok) {
            // ✅ Store token
            localStorage.setItem("token", token);

            // ✅ Redirect
            navigate("/");
        } else {
            alert("Invalid credentials");
        }

    } catch (err) {
        console.error(err);
        alert("Server error");
    }
};

    return (
        <AuthCard
        title="MeetingAI"
        subtitle="Transform meetings into actionable tasks"
        footer={
            <>
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600">
                Sign up
            </Link>
            </>
        }
        >
        <InputField
            label="Email"
            name="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
        />

        <InputField
            label="Password"
            type="password"
            name="password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
        />

        <PrimaryButton text="Sign In" onClick={handleLogin} />

        <div className="text-center mt-3">
            <Link to="/forgot" className="text-blue-600 text-sm">
            Forgot password?
            </Link>
        </div>
        </AuthCard>
    );
}