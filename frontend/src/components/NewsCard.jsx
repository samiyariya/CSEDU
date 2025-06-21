import React from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets.js';

const NewsCard = ({ news, isArchived }) => {
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleDownloadPDF = (e) => {
    e.stopPropagation(); // Prevent card click event
    
    // Check if PDF URL exists
    if (news.pdfUrl) {
      // Method 1: Direct download for stored PDFs
      const link = document.createElement('a');
      link.href = news.pdfUrl;
      link.download = `${news.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (news.id) {
      // Method 2: Generate PDF from notice content (requires backend endpoint)
      window.open(`/api/notices/${news.id}/download-pdf`, '_blank');
    } else {
      alert('PDF not available for this notice');
    }
  };

  const handleViewDetails = (e) => {
    e.stopPropagation(); // Prevent card click event
    navigate(`/news/${news.id}`);
    scrollTo(0, 0);
  };

  return (
    <div className="group bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer relative">
      {/* Archived Badge */}
      {isArchived && (
        <div className="absolute top-3 right-3 z-10 bg-gray-600 text-white px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 shadow-md">
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
        </div>
      )}

      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1 mr-4">
            {/* Title */}
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors duration-200 mb-2">
              {news.title}
            </h3>

            <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
              <img 
                src={assets.calender} 
                alt="Calendar" 
                className="w-4 h-4"
              />
              <span>{formatDate(news.date)}</span>
            </div>
            {/* {news.description && (
              <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                {news.description}
              </p>
            )} */}
            {news.category && (
              <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                {news.category}
              </span>
            )}
          </div>

          {/* Action Buttons - Stacked Vertically */}
          <div className="flex flex-col gap-3 flex-shrink-0">
            {/* Download PDF Button */}
            <button
              onClick={handleDownloadPDF}
              className="flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-secondary/90 text-white rounded-lg text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md"
              title="Download PDF"
            >
              <svg 
                className="w-4 h-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download PDF
            </button>

            {/* View Details Button */}
            <button
              onClick={handleViewDetails}
              className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md"
              title="View Details"
            >
              <svg 
                className="w-4 h-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;