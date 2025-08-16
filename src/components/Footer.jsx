import React from "react";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <p style={styles.text}>© {new Date().getFullYear()} Send Pocket Money App</p>
        <div style={styles.links}>
          <a href="/privacy" style={styles.link}>Privacy Policy</a>
          <a href="/terms" style={styles.link}>Terms of Service</a>
          <a href="/contact" style={styles.link}>Contact Us</a>
        </div>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: "#1f2937",
    color: "#f9fafb",
    padding: "1rem 0",
    marginTop: "50px",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 1rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  text: {
    margin: "0.5rem 0",
    fontSize: "0.9rem",
  },
  links: {
    display: "flex",
    gap: "1rem",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  link: {
    color: "#f9fafb",
    textDecoration: "none",
    fontSize: "0.9rem",
  },
};

export default Footer;
