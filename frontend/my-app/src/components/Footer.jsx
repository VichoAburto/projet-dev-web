import '../styles/Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Vinik Inc. - All rights reserved.</p>
      <p>123 Fun Street, Olympia town, Paris</p>
    </footer>
  );
}