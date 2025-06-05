import { useState } from 'react';
import NewsCard from '../components/NewsCard';
import { sampleNews, newsCategories, assets } from '../assets/assets';

const News = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Search is handled in real-time through filteredNews
  };

  const filteredNews = sampleNews.filter(news => {
    const matchesCategory = selectedCategory === 'all' || news.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      news.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Date range filtering
    let matchesDateRange = true;
    if (dateFrom || dateTo) {
      const newsDate = new Date(news.date);
      const fromDate = dateFrom ? new Date(dateFrom) : null;
      const toDate = dateTo ? new Date(dateTo) : null;
      
      if (fromDate && newsDate < fromDate) {
        matchesDateRange = false;
      }
      if (toDate && newsDate > toDate) {
        matchesDateRange = false;
      }
    }
    
    return matchesCategory && matchesSearch && matchesDateRange;
  }).sort((a, b) => {
    // Sort by date based on sortOrder
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    
    if (sortOrder === 'newest') {
      return dateB - dateA; // Newest first
    } else {
      return dateA - dateB; // Oldest first
    }
  });

  const clearDateFilters = () => {
    setDateFrom('');
    setDateTo('');
  };

  return (
    <div className="m-14 max-h-[90vh] overflow-y-scroll">
      <h1 className="text-xl font-semibold mb-6 text-primary">Notice Board</h1>
      
      {/* Filter and Search Section */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3">
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

        {/* Search and Sort Section */}
        <div className="flex items-center gap-4">
          {/* Sort Dropdown */}
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border border-gray-300 text-gray-800 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-300"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>

          {/* Search Form */}
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center relative"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search for news..."
              className="border border-gray-300 text-gray-800 px-4 py-2 rounded-full text-sm w-70 focus:outline-none focus:ring-1 focus:ring-gray-300 pr-10" 
            />
            <button
              className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 pr-3"
              type="submit">
              <img src={assets.search} alt="Search" className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>

      {/* Date Range Filter Section */}
      <div className="flex flex-wrap items-center gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">From:</label>
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="border border-gray-300 text-gray-800 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-300"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">To:</label>
          <input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="border border-gray-300 text-gray-800 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-300"
          />
        </div>

        {(dateFrom || dateTo) && (
          <button
            onClick={clearDateFilters}
            className="px-3 py-2 text-sm text-red-600 hover:text-red-800 border border-red-300 hover:border-red-400 rounded-lg transition-colors"
          >
            Clear Dates
          </button>
        )}
      </div>

      {/* News Grid */}
      <div className="w-full flex flex-wrap gap-8 pt-6 gap-y-14">
        {filteredNews.length > 0 ? (
          filteredNews.map((item) => (
            <NewsCard key={item.id} news={item} />
          ))
        ) : (
          <p className="text-gray-500 text-center w-full">
            {searchQuery ? `No news found for "${searchQuery}"` : 'No news found for this category.'}
          </p>
        )}
      </div>
    </div>
  );
};

export default News;