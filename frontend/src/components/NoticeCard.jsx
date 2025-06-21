import React from 'react';

const NoticeCard = ({ notice }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="group bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors duration-200">
              {notice.title}
            </h3>
            <p className="text-sm text-gray-500 mb-3">
              Published on: {formatDate(notice.date)}
            </p>
            {notice.description && (
              <p className="text-gray-600 text-sm line-clamp-2">
                {notice.description}
              </p>
            )}
          </div>
          {/* Simple chevron right SVG */}
          <svg 
            className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors duration-200 ml-4 flex-shrink-0" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default NoticeCard;