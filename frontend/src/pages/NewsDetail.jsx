"use client"
import { useParams, useNavigate } from "react-router-dom"
import {
  Calendar,
  MapPin,
  Clock,
  User,
  ArrowLeft,
  Share2,
  Archive,
  AlertTriangle,
  Printer,
  ChevronRight,
} from "lucide-react"
import { sampleNews, assets } from "../assets/assets"
import { isExpired } from "./News"

const NewsDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  // Find the news item by ID
  const news = sampleNews.find((item) => item.id === Number.parseInt(id))

  // Check if news is archived based on expiry date
  const newsIsArchived = isExpired(news?.expiryDate)

  // If news not found, show error message
  if (!news) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">News Not Found</h2>
          <p className="text-gray-600 mb-6">The requested news article could not be found.</p>
          <button
            onClick={() => navigate("/news")}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to News
          </button>
        </div>
      </div>
    )
  }

  // Function to get category badge color
  const getCategoryColor = (category) => {
    switch (category) {
      case "academic":
        return "bg-blue-600 text-white"
      case "general":
        return "bg-green-600 text-white"
      case "administrative":
        return "bg-purple-600 text-white"
      default:
        return "bg-gray-600 text-white"
    }
  }

  // Add a function to get the latest news items (after the getCategoryColor function)
  const getLatestNews = (currentNewsId, limit = 3) => {
    // Filter out the current news and get the latest ones
    return sampleNews
      .filter((item) => item.id !== Number.parseInt(currentNewsId))
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, limit)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: news.title,
        text: news.description,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("News link copied to clipboard!")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(newsIsArchived ? "/news/archived" : "/news")}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to {newsIsArchived ? "Archived " : ""}News
        </button>

        {/* Main News Content */}
        <div className="bg-transparent overflow-hidden">
          {/* News Image */}
          {news.image && (
            <div className="h-64 md:h-80 relative overflow-hidden rounded-t-lg">
              <img src={news.image || "/placeholder.svg"} alt={news.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>

              {/* Category Badge */}
              <div className="absolute top-4 left-4 flex gap-2">
                <span
                  className={`px-4 py-2 text-sm font-medium rounded-full capitalize ${getCategoryColor(news.category)}`}
                >
                  {news.category}
                </span>

                {/* Archived Badge */}
                {newsIsArchived && (
                  <span className="px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-full flex items-center gap-1">
                    <Archive className="w-3 h-3" />
                    Archived
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={handleShare}
                  className="p-2 bg-white bg-opacity-90 rounded-full hover:bg-white transition-colors"
                >
                  <Share2 className="w-5 h-5 text-gray-700" />
                </button>
                <button
                  onClick={() => window.print()}
                  className="p-2 bg-white bg-opacity-90 rounded-full hover:bg-white transition-colors"
                >
                  <Printer className="w-5 h-5 text-gray-700" />
                </button>
              </div>
            </div>
          )}

          {/* Single White Frame with All Content */}
          <div className={`bg-white p-8 border border-gray-100 shadow-sm ${news.image ? 'rounded-b-lg' : 'rounded-lg'}`}>
            {/* News Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{news.title}</h1>
            
            {/* Horizontal Line after Title */}
            <div className="border-t border-gray-200 mb-8"></div>

            {/* News Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Date & Time */}
              <div className="space-y-4">
                <div className="flex items-center text-gray-700">
                  <div className="flex items-center justify-center w-10 h-10 bg-blue-50 rounded-lg mr-4">
                    <Calendar className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold">{news.date}</p>
                    <p className="text-sm text-gray-500">Published Date</p>
                  </div>
                </div>

                <div className="flex items-center text-gray-700">
                  <div className="flex items-center justify-center w-10 h-10 bg-green-50 rounded-lg mr-4">
                    <Clock className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold">{news.time}</p>
                    <p className="text-sm text-gray-500">Time</p>
                  </div>
                </div>
              </div>

              {/* Author & Location */}
              <div className="space-y-4">
                <div className="flex items-center text-gray-700">
                  <div className="flex items-center justify-center w-10 h-10 bg-orange-50 rounded-lg mr-4">
                    <User className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="font-semibold">{news.author}</p>
                    <p className="text-sm text-gray-500">Author</p>
                  </div>
                </div>

                <div className="flex items-center text-gray-700">
                  <div className="flex items-center justify-center w-10 h-10 bg-purple-50 rounded-lg mr-4">
                    <MapPin className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-semibold">{news.location}</p>
                    <p className="text-sm text-gray-500">Location</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 my-8"></div>

            {/* Article Content */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Article Content</h3>
              <div className="text-gray-700 leading-relaxed space-y-6 text-lg">
                {news.detailedDescription ? (
                  news.detailedDescription.split("\n\n").map((paragraph, index) => (
                    <p key={index} className="whitespace-pre-line">
                      {paragraph.trim()}
                    </p>
                  ))
                ) : (
                  <p className="whitespace-pre-line">{news.description}</p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-8 border-t border-gray-200">
              <button
                onClick={() => navigate(newsIsArchived ? "/news/archived" : "/news")}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                View More {newsIsArchived ? "Archived " : ""}News
              </button>
            </div>
          </div>

          {/* Archive Notice - Outside the white frame */}
          {newsIsArchived && (
            <div className="mt-6">
              <div className="flex items-center p-6 bg-amber-50 rounded-lg border border-amber-200">
                <AlertTriangle className="w-6 h-6 text-amber-600 mr-4" />
                <div>
                  <p className="font-semibold text-amber-800 text-lg">Archived Content</p>
                  <p className="text-amber-700">
                    This notice has been archived and may contain outdated information.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Latest News Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-10 text-center">Latest News</h2>
          
          {/* Single White Frame for All Latest News - Same width as news details */}
          <div className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden">
            {getLatestNews(id).map((item, index) => (
              <div key={item.id}>
                {/* News Row */}
                <div
                  className="flex items-center p-6 hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => {
                    navigate(`/news/${item.id}`)
                    window.scrollTo(0, 0)
                  }}
                >
                  {/* Bigger Image */}
                  <div className="flex-shrink-0 mr-6">
                    {item.image ? (
                      <div className="w-24 h-24 rounded-lg overflow-hidden">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-gray-400 text-xs">No Image</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 pr-4">
                        <h3 className="font-semibold text-gray-900 text-lg mb-2 line-clamp-2 leading-tight">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>
                        <div className="flex items-center text-sm text-gray-500">
                          <img src={assets.calender} alt="Calendar" className="w-4 h-4 mr-2" />
                          <span>{item.date}</span>
                        </div>
                      </div>
                      
                      {/* Read more arrow */}
                      <div className="flex-shrink-0">
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Horizontal line separator (not for the last item) */}
                {index < getLatestNews(id).length - 1 && (
                  <div className="border-t border-gray-200"></div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => navigate("/news")}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-300 font-semibold inline-flex items-center shadow-md"
            >
              View All News
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewsDetail
