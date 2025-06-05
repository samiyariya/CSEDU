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
      className="border rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-300 w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.333rem)] min-w-[280px] shadow-[0_8px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.2),0_15px_20px_-8px_rgba(0,0,0,0.15)]"
    >
      <img
        className="w-full h-60 object-cover bg-blue-50"
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