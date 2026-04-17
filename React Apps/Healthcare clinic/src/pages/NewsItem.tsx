import { useParams, Link } from 'react-router-dom';
import { getNewsBySlug, newsData } from '../data/newsData';
import './NewsItem.css';

export default function NewsItem() {
  const { id } = useParams<{ id: string }>();
  const news = id ? getNewsBySlug(id) : null;

  if (!news) {
    return (
      <div>
        <section className="page-hero">
          <div className="container">
            <h1>News Not Found</h1>
          </div>
        </section>
        <section className="py-4">
          <div className="container text-center">
            <p>Sorry, the news article you're looking for doesn't exist.</p>
            <Link to="/news" className="btn">Back to News</Link>
          </div>
        </section>
      </div>
    );
  }

  // Get related news (other articles from same category)
  const relatedNews = newsData
    .filter(n => n.category === news.category && n.id !== news.id)
    .slice(0, 2);

  return (
    <div>
      {/* Hero Section */}
      <section className="article-hero" style={{ backgroundImage: `url(${news.image})` }}>
        <div className="article-hero-overlay">
          <div className="container">
            <div className="article-header">
              <span className="article-category">{news.category}</span>
              <h1>{news.title}</h1>
              <div className="article-meta">
                <span className="article-date">📅 {new Date(news.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="article-content py-4">
        <div className="container">
          <div className="article-body">
            {news.content.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </article>

      {/* Related News */}
      {relatedNews.length > 0 && (
        <section className="related-news py-4">
          <div className="container">
            <h2 className="section-title">Related Articles</h2>
            <div className="grid grid-2">
              {relatedNews.map(relatedArticle => (
                <Link
                  to={`/news/${relatedArticle.slug}`}
                  key={relatedArticle.id}
                  className="related-news-card"
                >
                  <div className="related-news-image">
                    <img src={relatedArticle.image} alt={relatedArticle.title} />
                  </div>
                  <div className="related-news-body">
                    <h3>{relatedArticle.title}</h3>
                    <p>{relatedArticle.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="article-cta py-4">
        <div className="container text-center">
          <h2>Questions or Need to Schedule an Appointment?</h2>
          <p>Contact us today and our healthcare professionals will be happy to assist you</p>
          <Link to="/contacts" className="btn">Contact Us</Link>
        </div>
      </section>

      {/* Back to News Link */}
      <div className="container py-2">
        <Link to="/news" className="back-link">← Back to All News</Link>
      </div>
    </div>
  );
}
