import '../styles/Header.css';

export default function Header() {
  return (
    <header className="header">
      <div className="header-title">Lancer de poids</div>
      <nav className="header-nav">
        <a href="/" className="header-link">Domicile</a>
        <a href="/hall-of-fame" className="header-link">Temple de la renommée</a>
      </nav>
    </header>
  );
}