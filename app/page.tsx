'use client';

import { useState, useEffect } from 'react';

// Types
interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl?: string;
  siteUrl?: string;
}

// Categories data
const categories = [
  { id: 'all', label: 'Tous les projets' },
  { id: 'restaurant-vitrine', label: 'Restaurant Vitrine' },
  { id: 'restaurant-premium', label: 'Restaurant Premium' },
  { id: 'restaurant-personnalise', label: 'Restaurant Personnalisé' },
  { id: 'identite-visuelle', label: 'Identité Visuelle' },
  { id: 'print-marketing', label: 'Print & Marketing' },
  { id: 'commerce-premium', label: 'Commerce Premium' },
  { id: 'commerce-vitrine', label: 'Commerce Vitrine' },
];

// Portfolio projects
const sampleProjects: Project[] = [
  {
    id: '1',
    title: 'Nizart Piazza',
    category: 'restaurant-personnalise',
    description: 'Restaurant italien premium avec commande en ligne intégrée',
    imageUrl: '/screenshots/nizart-piazza.png',
    siteUrl: 'https://nizartpiazza.lu',
  },
  {
    id: '2',
    title: 'Restaurant Pepperoni',
    category: 'restaurant-personnalise',
    description: 'Pizzeria italienne avec menu dynamique et commande en ligne',
    imageUrl: '/screenshots/pepperoni.png',
    siteUrl: 'https://food-order-lu.github.io/pepperoni/',
  },
  {
    id: '3',
    title: 'Chez Zhang',
    category: 'restaurant-vitrine',
    description: 'Restaurant asiatique moderne avec menu interactif',
    imageUrl: '/screenshots/chez-zhang.png',
    siteUrl: 'https://food-order-lu.github.io/chez-zhang/',
  },
  {
    id: '4',
    title: 'Mon Traiteur',
    category: 'commerce-premium',
    description: 'Service traiteur avec galerie et formulaire de contact',
    imageUrl: '/screenshots/montraiteur.png',
    siteUrl: 'https://food-order-lu.github.io/mon-traiteur/',
  },
  {
    id: '5',
    title: 'La Terrazza',
    category: 'restaurant-personnalise',
    description: 'Restaurant italien haut de gamme avec réservation en ligne',
    imageUrl: '/screenshots/laterrazza.png',
    siteUrl: 'https://la-terrazza.lu/',
  },
  {
    id: '6',
    title: 'Kohinoor',
    category: 'restaurant-vitrine',
    description: 'Restaurant indien et tibétain à Howald',
    imageUrl: '/screenshots/kohinoor.png',
    siteUrl: 'https://kohinoor.lu/',
  },
];

// Theme Toggle Component
function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check for saved theme or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme ? 'dark' : 'light');
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  return (
    <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
      <span className="theme-toggle-thumb">
        {isDark ? '🌙' : '☀️'}
      </span>
    </button>
  );
}

// Header Component
function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <span className="logo-main">WebVision</span>
          <span className="logo-sub">Digital Studio</span>
          <span className="logo-by">by Rivego</span>
        </div>
        <div className="header-right">
          <a href="#projets" className="nav-link">Projets</a>
          <a href="#contact" className="nav-link">Contact</a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

// Hero Section Component
function Hero() {
  return (
    <section className="hero">
      <div className="hero-container">
        <span className="hero-badge">Portfolio 2024</span>
        <h1 className="hero-title">
          Créations <span className="hero-title-gradient">Digitales</span> & Print
        </h1>
        <p className="hero-description">
          Découvrez nos réalisations : sites web pour restaurants et commerces,
          identités visuelles et supports marketing.
        </p>
      </div>
    </section>
  );
}

// Category Filter Component
interface FilterProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

function CategoryFilter({ activeCategory, onCategoryChange }: FilterProps) {
  return (
    <section className="filter-section">
      <div className="filter-container">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
            onClick={() => onCategoryChange(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </section>
  );
}

// Project Card Component
interface ProjectCardProps {
  project: Project;
}

function ProjectCard({ project }: ProjectCardProps) {
  const categoryLabel = categories.find(c => c.id === project.category)?.label || project.category;

  const handleClick = () => {
    if (project.siteUrl && project.siteUrl !== '#') {
      window.open(project.siteUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <article className="project-card" onClick={handleClick}>
      <div className="project-image-wrapper">
        {project.imageUrl ? (
          <img
            src={project.imageUrl}
            alt={project.title}
            className="project-image"
          />
        ) : (
          <div className="placeholder-image">🖼️</div>
        )}
        <div className="project-overlay">
          <button className="project-view-btn">
            Voir le projet
          </button>
        </div>
      </div>
      <div className="project-info">
        <span className="project-category">{categoryLabel}</span>
        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.description}</p>
      </div>
    </article>
  );
}

// Projects Grid Component
interface ProjectsGridProps {
  projects: Project[];
  activeCategory: string;
}

function ProjectsGrid({ projects, activeCategory }: ProjectsGridProps) {
  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <section className="projects-section" id="projets">
      <div className="projects-container">
        {filteredProjects.length > 0 ? (
          <div className="projects-grid">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">📁</div>
            <p className="empty-state-text">Aucun projet dans cette catégorie</p>
          </div>
        )}
      </div>
    </section>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="footer" id="contact">
      <p className="footer-text">
        © {new Date().getFullYear()} <a href="/" className="footer-link">WebVision</a> —
        Géré par <a href="https://rivego.lu" target="_blank" rel="noopener noreferrer" className="footer-link">rivego.lu</a>
      </p>
    </footer>
  );
}

// Main Page Component
export default function Home() {
  const [activeCategory, setActiveCategory] = useState('all');

  return (
    <>
      <Header />
      <main>
        <Hero />
        <CategoryFilter
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
        <ProjectsGrid
          projects={sampleProjects}
          activeCategory={activeCategory}
        />
      </main>
      <Footer />
    </>
  );
}
