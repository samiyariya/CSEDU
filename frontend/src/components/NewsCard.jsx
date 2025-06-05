import React from 'react';
import { useNavigate } from 'react-router-dom';
import { sampleNews, assets } from '../assets/assets';

const NewsCard = ({ news, isArchived }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate(`/news/${news.id}`);
        scrollTo(0, 0);
      }}
      className="relative border rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-300 w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.333rem)] min-w-[280px] shadow-[0_8px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.2),0_15px_20px_-8px_rgba(0,0,0,0.15)] font-['Poppins'] bg-gray-50 hover:bg-blue-50"
    >
      {/* Archived Badge - Always visible when isArchived is true */}
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

      <img
        className="w-full h-60 object-cover bg-gray-50"
        src={news.image}
        alt={news.title}
      />
      <div className="p-6">
        <div className="flex items-center gap-2">
          <img src={assets.calender} alt="Calendar" className="w-4 h-4" />
          <p className="text-sm text-gray-500">{news.date}</p>
        </div>
        <p className="text-lg font-semibold text-gray-900 mt-2">
          {news.title}
        </p>
        <p className="text-sm text-gray-600 mt-3">
          {news.description.slice(0, 80)}...
        </p>
        <div className="text-xs text-gray-500 mt-4 space-y-1">
          {/* <p>
            <strong>Location:</strong> {news.location}
          </p> */}
          {/* <p>
            <strong>Time:</strong> {news.time}
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default NewsCard;