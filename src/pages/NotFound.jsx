import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>404</h1>
      <p style={styles.message}>Page Not Found</p>
      <Link to="/" style={styles.link}>Go back home</Link>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "80vh",
    textAlign: "center",
  },
  title: {
    fontSize: "6rem",
    margin: "0",
    color: "#1f2937",
  },
  message: {
    fontSize: "1.5rem",
    margin: "1rem 0",
    color: "#4b5563",
  },
  link: {
    fontSize: "1rem",
    color: "#2563eb",
    textDecoration: "none",
    border: "1px solid #2563eb",
    padding: "0.5rem 1rem",
    borderRadius: "0.25rem",
  },
};

export default NotFound;
