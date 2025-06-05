import React from 'react';
import { useNavigate } from 'react-router-dom';
import { sampleNews } from '../assets/assets';

const NewsCard = ({ news }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate(`/news/${news.id}`);
        scrollTo(0, 0);
      }}
      className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-300 w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.333rem)] min-w-[280px]"
    >
      <img
        className="w-full h-40 object-cover bg-blue-50"
        src={news.image}
        alt={news.title}
      />
      <div className="p-6">
        <p className="text-sm text-gray-500">{news.date}</p>
        <p className="text-lg font-semibold text-gray-900 mt-2">{news.title}</p>
        <p className="text-sm text-gray-600 mt-3">
          {news.description.slice(0, 80)}...
        </p>
        <div className="text-xs text-gray-500 mt-4 space-y-1">
          <p>
            <strong>Location:</strong> {news.location}
          </p>
          <p>
            <strong>Time:</strong> {news.time}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;