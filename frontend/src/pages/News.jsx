import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import NewsCard from '../components/NewsCard';
import { sampleNews, newsCategories, assets } from '../assets/assets';

export const isExpired = (expiryDate) => {
  if (!expiryDate) return false;
  const today = new Date();
  const expiry = new Date(expiryDate);
  return today > expiry;
};

export const autoArchiveNews = (newsArray) => {
  return newsArray.map(news => ({
    ...news,
    isArchived: isExpired(news.expiryDate)
  }));
};

export const getActiveNews = (newsArray) => {
  return autoArchiveNews(newsArray).filter(news => !news.isArchived);
};

export const getArchivedNews = (newsArray) => {
  return autoArchiveNews(newsArray).filter(news => news.isArchived);
};

const News = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine if we're on archived page based on URL
  const showArchived = location.pathname === '/news/archived';
  
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Reset page when switching between active and archived
  useEffect(() => {
    setCurrentPage(1);
  }, [showArchived]);

  // Generate years from 2005 to current year
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2004 }, (_, i) => 2005 + i).reverse();
  
  // Months array
  const months = [
    { value: '01', name: 'January' },
    { value: '02', name: 'February' },
    { value: '03', name: 'March' },
    { value: '04', name: 'April' },
    { value: '05', name: 'May' },
    { value: '06', name: 'June' },
    { value: '07', name: 'July' },
    { value: '08', name: 'August' },
    { value: '09', name: 'September' },
    { value: '10', name: 'October' },
    { value: '11', name: 'November' },
    { value: '12', name: 'December' }
  ];

  // Get archived news count
  const archivedNewsCount = getArchivedNews(sampleNews).length;

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Search is handled in real-time through filteredNews
  };

  const handleFilterChange = (filterType, value) => {
    setCurrentPage(1); // Reset to first page when filter changes
    
    switch(filterType) {
      case 'category':
        setSelectedCategory(value);
        break;
      case 'year':
        setSelectedYear(value);
        break;
      case 'month':
        setSelectedMonth(value);
        break;
      case 'sort':
        setSortOrder(value);
        break;
    }
  };

  // Use active or archived news based on showArchived state
  const newsToShow = showArchived ? getArchivedNews(sampleNews) : getActiveNews(sampleNews);

  const filteredNews = newsToShow.filter(news => {
    const matchesCategory = selectedCategory === 'all' || news.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      news.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Year and Month filtering
    let matchesYearMonth = true;
    if (selectedYear || selectedMonth) {
      const newsDate = new Date(news.date);
      const newsYear = newsDate.getFullYear().toString();
      const newsMonth = (newsDate.getMonth() + 1).toString().padStart(2, '0');
      
      if (selectedYear && newsYear !== selectedYear) {
        matchesYearMonth = false;
      }
      if (selectedMonth && newsMonth !== selectedMonth) {
        matchesYearMonth = false;
      }
    }
    
    return matchesCategory && matchesSearch && matchesYearMonth;
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

  // Pagination calculations
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNews = filteredNews.slice(startIndex, endIndex);

  const clearYearMonthFilters = () => {
    setSelectedYear('');
    setSelectedMonth('');
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Scroll to top of news section
    window.scrollTo(0, 0);
  };

  const toggleArchived = () => {
    // Reset filters when switching between active and archived
    setSelectedCategory('all');
    setSelectedYear('');
    setSelectedMonth('');
    setSearchQuery('');
    
    // Navigate to appropriate route
    if (showArchived) {
      navigate('/news');
    } else {
      navigate('/news/archived');
    }
  };

  return (
    <div className="m-14 max-h-[90vh] overflow-y-scroll">
      {/* Header with Notice Board title and View Archived button */}
      <div className="flex items-center justify-between mb-6">
        {showArchived ? (
          // Archived News Header with Back Button
          <div className="flex items-center gap-4">
            <button
              onClick={toggleArchived}
              className="flex items-center gap-2 px-3 py-2 text-primary hover:bg-blue-50 hover:text-primary border border-gray-300 rounded-xl transition-all duration-200 font-medium"
            >
              <svg 
                className="w-4 h-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Active
            </button>
            <div className="flex items-center gap-2">
              <svg 
                className="w-6 h-6 text-primary" 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              <h1 className="text-xl font-semibold text-primary">Archived Notices</h1>
            </div>
          </div>
        ) : (
          // Active News Header
          <h1 className="text-xl font-semibold text-primary">Notice Board</h1>
        )}
        
        {!showArchived && (
          <button
            onClick={toggleArchived}
            className="flex items-center gap-2 px-4 py-2 text-primary hover:bg-blue-50 hover:text-primary border border-gray-300 rounded-xl transition-all duration-200 font-medium"
          >
            <svg 
              className="w-5 h-5" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            View Archived ({archivedNewsCount})
          </button>
        )}
      </div>

      {/* Archive Notice - Only show when viewing archived notices */}
      {showArchived && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2 text-amber-800">
            <svg 
              className="w-5 h-5 flex-shrink-0" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            <p className="font-medium">
              These notices have been automatically archived based on their expiry dates or manual archiving.
            </p>
          </div>
        </div>
      )}
      
      {/* Filter and Search Section */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        {/* Left Side - Category and Year/Month Dropdowns */}
        <div className="flex flex-wrap gap-3">
          {/* News Type Dropdown */}
          <select
            value={selectedCategory}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="border border-gray-300 text-gray-800 px-4 py-2 rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-gray-300 bg-white"
          >
            {newsCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          {/* Year Dropdown */}
          <select
            value={selectedYear}
            onChange={(e) => handleFilterChange('year', e.target.value)}
            className="border border-gray-300 text-gray-800 px-4 py-2 rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-gray-300 bg-white"
          >
            <option value="">All Years</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          {/* Month Dropdown */}
          <select
            value={selectedMonth}
            onChange={(e) => handleFilterChange('month', e.target.value)}
            className="border border-gray-300 text-gray-800 px-4 py-2 rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-gray-300 bg-white"
          >
            <option value="">All Months</option>
            {months.map((month) => (
              <option key={month.value} value={month.value}>
                {month.name}
              </option>
            ))}
          </select>

          {/* Sort Dropdown */}
          <select
            value={sortOrder}
            onChange={(e) => handleFilterChange('sort', e.target.value)}
            className="border border-gray-300 text-gray-800 px-4 py-2 rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-gray-300 bg-white"
          >
            <option value="oldest">Oldest First</option>
            <option value="newest">Newest First</option>
          </select>

          {/* Clear Year/Month Button */}
          {(selectedYear || selectedMonth) && (
            <button
              onClick={clearYearMonthFilters}
              className="px-3 py-2 text-sm text-red-600 hover:text-red-800 border border-red-300 hover:border-red-400 rounded-xl transition-colors"
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* Right Side - Search Section */}
        <div className="flex items-center gap-4">
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

      {/* Results Info */}
      {filteredNews.length > 0 && (
        <div className="mb-6 text-md text-gray-500">
          Showing {startIndex + 1}-{Math.min(endIndex, filteredNews.length)} of {filteredNews.length} results
        </div>
      )}

      {/* News Grid */}
      <div className="w-full flex flex-wrap gap-8 pt-6 gap-y-14">
        {currentNews.length > 0 ? (
          currentNews.map((item) => (
            <NewsCard key={item.id} news={item} isArchived={showArchived} />
          ))
        ) : (
          <p className="text-gray-500 text-center w-full">
            {searchQuery ? `No news found for "${searchQuery}"` : 'No news found for the selected filters.'}
          </p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-12 mb-8 gap-2">
          {/* Previous Button */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-2 rounded-xl border transition-all duration-200 ${
              currentPage === 1
                ? 'bg-gray-100 text-primay border-gray-200 cursor-not-allowed'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-primary hover:border-1 hover:scale-80'
            }`}
          >
            &lt;
          </button>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={`px-3 py-2 rounded-xl border transition-all duration-200 ${
                currentPage === pageNumber
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400 hover:border-2 hover:scale-110'
              }`}
            >
              {pageNumber}
            </button>
          ))}

          {/* Next Button */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-2 rounded-xl border transition-all duration-200 ${
              currentPage === totalPages
                ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400 hover:border-2 hover:scale-110'
            }`}
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
};

export default News;