import '../styles/Header.css';

export default function Header() {
  return (
    <header className="header">
      <div className="header-title">Lancer de poids</div>
      <nav className="header-nav">
        <a href="/" className="header-link">Home</a>
        <a href="/hall-of-fame" className="header-link">Hall of fame</a>
      </nav>
    </header>
  );
}