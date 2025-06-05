import { useState } from 'react';
import NewsCard from '../components/NewsCard';
import { sampleNews, newsCategories } from '../assets/assets';

const News = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredNews = selectedCategory === 'all' 
    ? sampleNews 
    : sampleNews.filter(news => news.category === selectedCategory);

  return (
    <div className="m-14 max-h-[90vh] overflow-y-scroll">
      <h1 className="text-xl font-semibold mb-6 text-primary">Notice Board</h1>
      
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-3 mb-6">
        {newsCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              selectedCategory === category.id
                ? 'bg-primary text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* News Grid */}
      <div className="w-full flex flex-wrap gap-8 pt-6 gap-y-14">
        {filteredNews.length > 0 ? (
          filteredNews.map((item) => (
            <NewsCard key={item.id} news={item} />
          ))
        ) : (
          <p className="text-gray-500 text-center w-full">No news found for this category.</p>
        )}
      </div>
    </div>
  );
};

export default News;