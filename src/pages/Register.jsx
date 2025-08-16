import React, { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [msg, setMsg] = useState(null);
  const [err, setErr] = useState(null);
  const [busy, setBusy] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    setMsg(null);

    try {
      if (!form.name.trim()) throw new Error("Name is required");
      if (!/^\S+@\S+\.\S+$/.test(form.email))
        throw new Error("Valid email is required");
      if (form.password.length < 8)
        throw new Error("Password must be at least 8 characters");

      await register(form);
      navigate("/");
      setMsg("Account created! You are now logged in.");
    } catch (error) {
      setErr(error.message || "Registration failed");
      setTimeout(() => {
        setErr(null)
      }, 4000)
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="card" role="region" aria-label="Register">
      <h1>Create account</h1>
      <form onSubmit={submit} className="row">
        <div className="col input_container">
          <label>Name</label>
          <input
            name="name"
            placeholder="Enter your full name"
            value={form.name}
            onChange={onChange}
            required
          />
        </div>
        <div className="col input_container">
          <label>Email</label>
          <input
            name="email"
            placeholder="youremail@example.com"
            type="email"
            value={form.email}
            onChange={onChange}
            required
          />
        </div>
        <div className="col input_container">
          <label>Password</label>
          <input
            name="password"
            placeholder="Enter your password"
            type="password"
            value={form.password}
            onChange={onChange}
            required
            minLength={8}
          />
        </div>
        <div className="login_or_register_container">
          <button disabled={busy} type="submit" className="btn">
            {busy ? "Creating..." : "Sign up"}
          </button>
        </div>
        <div className="helper redirect_to_reg_or_login">
          Already have an account?{" "}
          <Link type="button" to="/login">
            Log in
          </Link>
        </div>
        {err && <div className="error">{err}</div>}
        {msg && <div className="success">{msg}</div>}
      </form>
    </div>
  );
}
