import { ARTICLES, type Article } from '../data/portfolio'
import FadeInSection from './FadeInSection'

function ArticleCard({ article, index }: Readonly<{ article: Article; index: number }>) {
  return (
    <FadeInSection delay={index * 100}>
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group block bg-surface border border-border rounded-lg overflow-hidden hover:border-primary/30 hover:shadow-md transition-all h-full"
      >
        <div className="p-6 flex flex-col h-full">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 bg-bg rounded text-[11px] font-mono text-muted"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-primary group-hover:text-accent transition-colors mb-2">
            {article.title}
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-subtle leading-relaxed flex-1">
            {article.excerpt}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
            <span className="text-xs text-muted font-mono">{article.date}</span>
            <span className="text-xs text-muted font-mono flex items-center gap-1">
              {article.readTime}
              <span className="group-hover:translate-x-0.5 transition-transform">→</span>
            </span>
          </div>
        </div>
      </a>
    </FadeInSection>
  )
}

export default function Blog() {
  if (ARTICLES.length === 0) return null

  return (
    <section id="blog" className="py-24 bg-bg border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInSection>
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary">
                Articles & Insights
              </h2>
              <p className="text-subtle mt-2">
                Technical writing on backend engineering, security automation, and architecture.
              </p>
            </div>
            <div className="hidden md:block">
              <span className="font-mono text-xs text-muted bg-surface px-3 py-1 rounded border border-border">
                blog_v1.0
              </span>
            </div>
          </div>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ARTICLES.map((article, i) => (
            <ArticleCard key={article.id} article={article} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
