import { Link } from 'react-router-dom';
import { newsData, getCategories } from '../data/newsData';
import { useState } from 'react';
import './News.css';

export default function News() {
  const categories = getCategories();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredNews = selectedCategory
    ? newsData.filter(news => news.category === selectedCategory)
    : newsData;

  return (
    <div>
      {/* Hero Section */}
      <section className="page-hero">
        <div className="container">
          <h1>Latest News & Updates</h1>
          <p>Stay informed about our latest services, achievements, and health tips</p>
        </div>
      </section>

      {/* News Section */}
      <section className="news-section py-4">
        <div className="container">
          {/* Category Filter */}
          <div className="filters mb-2">
            <button
              className={`filter-btn ${!selectedCategory ? 'active' : ''}`}
              onClick={() => setSelectedCategory(null)}
            >
              All News
            </button>
            {categories.map(category => (
              <button
                key={category}
                className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {/* News Grid */}
          <div className="grid grid-2">
            {filteredNews.map(news => (
              <Link to={`/news/${news.slug}`} key={news.id} className="news-card-link">
                <div className="news-card">
                  <div className="news-image-wrapper">
                    <img 
                      src={news.image} 
                      alt={news.title}
                      className="news-image"
                    />
                    <span className="news-category-badge">{news.category}</span>
                  </div>
                  <div className="news-content">
                    <div className="news-date">📅 {new Date(news.date).toLocaleDateString()}</div>
                    <h3 className="news-title">{news.title}</h3>
                    <p className="news-excerpt">{news.excerpt}</p>
                    <div className="read-more">
                      Read More →
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredNews.length === 0 && (
            <div className="no-results text-center py-4">
              <p>No news found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
