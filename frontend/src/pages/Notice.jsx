import React, { useState } from 'react';
import NoticeCard from '../components/NoticeCard';
import { sampleNotices } from '../assets/assets';

const NoticesSection = () => {
  const [notices] = useState(sampleNotices);

  const handleViewAll = () => {
    console.log('Navigate to all notices');
  };

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <svg 
              className="h-8 w-8 text-primary mr-3" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <h2 className="text-3xl font-bold text-primary">
              Notice and Announcements
            </h2>
          </div>
          <div className="w-80 h-1 bg-secondary mx-auto"></div>
        </div>

        <div className="space-y-4 mb-8">
          {notices.map((notice) => (
            <NoticeCard key={notice.id} notice={notice} />
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={handleViewAll}
            className="inline-flex items-center px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-primary font-bold rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            View All Announcements
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoticesSection;