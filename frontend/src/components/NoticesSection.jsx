import React, { useState } from 'react';
import NoticeCard from './NoticeCard';
import { ChevronRightIcon, BellIcon } from '@heroicons/react/24/outline';

const NoticesSection = () => {
  const [notices] = useState([
    {
      id: 1,
      title: "১৫-০৭-২০২৫ তারিখের ইন্টার্নাল/ডিউটির পরীক্ষার সময় পরিবর্তন সংক্রান্ত বিজ্ঞপ্তি",
      date: "2025-05-14",
      description: "Internal and duty examination time change notification for 15-07-2025"
    },
    {
      id: 2,
      title: "ইফতার ও দোয়া অনুষ্ঠান-২০২৫ সংক্রান্ত বিজ্ঞপ্তি",
      date: "2025-03-06",
      description: "Iftar and prayer program 2025 notification"
    },
    {
      id: 3,
      title: "একজন অ্যালামনাইয়ের অভিভাবকের প্রেসিডেন্ট বিরোধী আর্গুমেন্টাটিক সম্পদে উন্নয়ন ও জ্ঞান নিরসনে...",
      date: "2025-03-06",
      description: "Alumni parent's anti-president argumentative development and knowledge resolution notification"
    }
  ]);

  const handleViewAll = () => {
    // Navigate to full notices page
    console.log('Navigate to all notices');
  };

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <BellIcon className="h-8 w-8 text-blue-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">
              Notice and Announcements
            </h2>
          </div>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>

        {/* Notices Grid */}
        <div className="space-y-4 mb-8">
          {notices.map((notice) => (
            <NoticeCard key={notice.id} notice={notice} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <button
            onClick={handleViewAll}
            className="inline-flex items-center px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            View all announcements
            <ChevronRightIcon className="ml-2 h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoticesSection;