import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { sampleNews, assets } from '../assets/assets';
import { isExpired } from './News';

const NewsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Find the news item by ID
  const news = sampleNews.find(item => item.id === parseInt(id));
  
  // Check if news is archived based on expiry date
  const newsIsArchived = isExpired(news?.expiryDate);
  
  // If news not found, show error message
  if (!news) {
    return (
      <div className="m-14 max-h-[90vh] overflow-y-scroll">
        <div className="text-center py-20">
          <h1 className="text-2xl font-semibold text-gray-700 mb-4">News Not Found</h1>
          <p className="text-gray-500 mb-6">The requested news article could not be found.</p>
          <button
            onClick={() => navigate('/news')}
            className="px-6 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors"
          >
            Back to News
          </button>
        </div>
      </div>
    );
  }

  // Function to get category badge color
  const getCategoryColor = (category) => {
    switch (category) {
      case 'academic':
        return 'bg-blue-100 text-blue-800';
      case 'general':
        return 'bg-green-100 text-green-800';
      case 'administrative':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="m-14 max-h-[90vh] overflow-y-scroll">
      {/* Back Button */}
      <div className="mb-6">
        <button
          onClick={() => navigate(newsIsArchived ? '/news/archived' : '/news')}
          className="flex items-center gap-2 px-4 py-2 text-primary hover:bg-blue-50 border border-gray-300 rounded-xl transition-all duration-200 font-medium"
        >
          <svg 
            className="w-4 h-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to {newsIsArchived ? 'Archived ' : ''}News
        </button>
      </div>

      {/* News Article */}
      <article className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header Image */}
        <div className="relative">
          <img
            src={news.image}
            alt={news.title}
            className="w-full h-64 md:h-80 object-cover"
          />
          
          {/* Overlay badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            {/* Category Badge */}
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getCategoryColor(news.category)}`}>
              {news.category.charAt(0).toUpperCase() + news.category.slice(1)}
            </span>
            
            {/* Archived Badge */}
            {newsIsArchived && (
              <span className="bg-gray-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                <svg
                  className="w-3 h-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clipRule="evenodd"
                  />
                </svg>
                Archived
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
            {news.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap gap-6 mb-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <img src={assets.calender} alt="Calendar" className="w-4 h-4" />
              <span>{news.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              <span>{news.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span>{news.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <span>{news.time}</span>
            </div>
          </div>

          {/* Archive Notice */}
          {newsIsArchived && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
              <div className="flex items-center gap-2 text-amber-800">
                <svg 
                  className="w-5 h-5 flex-shrink-0" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <p className="font-medium">
                  This notice has been archived and may contain outdated information.
                </p>
              </div>
            </div>
          )}

          {/* Detailed Description */}
          <div className="prose prose-lg max-w-none">
            <div className="text-gray-700 leading-relaxed space-y-4">
              {news.detailedDescription ? (
                news.detailedDescription.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-base leading-7">
                    {paragraph.trim()}
                  </p>
                ))
              ) : (
                <p className="text-base leading-7">
                  {news.description}
                </p>
              )}
            </div>
          </div>

          {/* Expiry Date Information */}
          {news.expiryDate && (
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 text-gray-600">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                <span className="text-sm">
                  {newsIsArchived ? 'Expired on:' : 'Valid until:'} {news.expiryDate}
                </span>
              </div>
            </div>
          )}
        </div>
      </article>

      {/* Related Actions */}
      <div className="mt-8 flex flex-wrap gap-4">
        <button
          onClick={() => navigate(newsIsArchived ? '/news/archived' : '/news')}
          className="px-6 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors"
        >
          View More {newsIsArchived ? 'Archived ' : ''}News
        </button>
        
        <button
          onClick={() => window.print()}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
        >
          Print Article
        </button>
        
        <button
          onClick={() => {
            navigator.share && navigator.share({
              title: news.title,
              text: news.description,
              url: window.location.href,
            });
          }}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
        >
          Share
        </button>
      </div>
    </div>
  );
};

export default NewsDetail;