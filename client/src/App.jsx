import { useState } from "react";

export default function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin
      ? "http://localhost:5000/api/login"
      : "http://localhost:5000/api/register";

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setMessage(data.message || "Something happened");

      if (isLogin && res.ok) {
        localStorage.setItem("token", data.token);
      }
    } catch (err) {
      setMessage("Network error");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f0f0f0",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          background: "white",
          padding: 24,
          borderRadius: 8,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          width: 320,
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: 20 }}>
          {isLogin ? "Login" : "Register"}
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: 10,
              marginBottom: 12,
              borderRadius: 4,
              border: "1px solid #ccc",
            }}
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: 10,
              marginBottom: 12,
              borderRadius: 4,
              border: "1px solid #ccc",
            }}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: 10,
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: 4,
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        {message && (
          <p
            style={{
              marginTop: 16,
              textAlign: "center",
              color: "red",
              fontWeight: "bold",
            }}
          >
            {message}
          </p>
        )}

        <p style={{ textAlign: "center", marginTop: 20, fontSize: 14 }}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setMessage("");
            }}
            style={{
              color: "#007bff",
              border: "none",
              background: "none",
              cursor: "pointer",
              textDecoration: "underline",
              padding: 0,
              fontSize: 14,
            }}
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}
