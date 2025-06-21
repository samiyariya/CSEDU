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
  Download,
  Eye,
} from "lucide-react"
import { sampleNotices, assets } from "../assets/assets"
import { isExpired } from "./News"

const NewsDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  // Find the news item by ID - using sampleNotices instead of sampleNews
  const news = sampleNotices.find((item) => item.id === Number.parseInt(id))

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

  // Get the latest news items (excluding current news and archived status based on current view)
  const getLatestNews = (currentNewsId, limit = 3) => {
    // Filter out the current news and get appropriate notices based on archived status
    return sampleNotices
      .filter((item) => {
        const itemIsArchived = isExpired(item.expiryDate)
        return item.id !== Number.parseInt(currentNewsId) && itemIsArchived === newsIsArchived
      })
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleDownloadPDF = (item, e) => {
    e.stopPropagation(); // Prevent card click event
    
    // Check if PDF URL exists
    if (item.pdfUrl) {
      // Method 1: Direct download for stored PDFs
      const link = document.createElement('a');
      link.href = item.pdfUrl;
      link.download = `${item.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (item.id) {
      // Method 2: Generate PDF from notice content (requires backend endpoint)
      window.open(`/api/notices/${item.id}/download-pdf`, '_blank');
    } else {
      alert('PDF not available for this notice');
    }
  };

  const handleViewDetails = (item, e) => {
    e.stopPropagation(); // Prevent card click event
    navigate(`/news/${item.id}`);
    window.scrollTo(0, 0);
  };

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
          {/* Single White Frame with All Content */}
          <div className="bg-white p-8 border border-gray-100 shadow-sm rounded-lg">
            {/* Title and Action Buttons on Same Row */}
            <div className="flex items-start justify-between mb-4">
              {/* News Title */}
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 flex-1 mr-4">{news.title}</h1>
              
              {/* Action Buttons */}
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={handleShare}
                  className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                >
                  <Share2 className="w-5 h-5 text-gray-700" />
                </button>
                <button
                  onClick={() => window.print()}
                  className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                >
                  <Printer className="w-5 h-5 text-gray-700" />
                </button>
              </div>
            </div>
            
            {/* Category Badge and Archived Badge */}
            <div className="flex gap-2 mb-6">
              <span
                className={`px-3 py-1 text-xs font-medium rounded-full capitalize ${getCategoryColor(news.category)}`}
              >
                {news.category}
              </span>

              {/* Archived Badge */}
              {newsIsArchived && (
                <span className="px-3 py-1 bg-gray-600 text-white text-xs font-medium rounded-full flex items-center gap-1">
                  <Archive className="w-3 h-3" />
                  Archived
                </span>
              )}
            </div>
            
            {/* Horizontal Line after Category */}
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

                {news.time && (
                  <div className="flex items-center text-gray-700">
                    <div className="flex items-center justify-center w-10 h-10 bg-green-50 rounded-lg mr-4">
                      <Clock className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold">{news.time}</p>
                      <p className="text-sm text-gray-500">Time</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Author & Location */}
              <div className="space-y-4">
                {news.author && (
                  <div className="flex items-center text-gray-700">
                    <div className="flex items-center justify-center w-10 h-10 bg-orange-50 rounded-lg mr-4">
                      <User className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="font-semibold">{news.author}</p>
                      <p className="text-sm text-gray-500">Author</p>
                    </div>
                  </div>
                )}

                {news.location && (
                  <div className="flex items-center text-gray-700">
                    <div className="flex items-center justify-center w-10 h-10 bg-purple-50 rounded-lg mr-4">
                      <MapPin className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-semibold">{news.location}</p>
                      <p className="text-sm text-gray-500">Location</p>
                    </div>
                  </div>
                )}

                {/* Expiry Date for active notices */}
                {news.expiryDate && !newsIsArchived && (
                  <div className="flex items-center text-gray-700">
                    <div className="flex items-center justify-center w-10 h-10 bg-red-50 rounded-lg mr-4">
                      <Calendar className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <p className="font-semibold">{news.expiryDate}</p>
                      <p className="text-sm text-gray-500">Expiry Date</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-300 my-8"></div>

            {/* Article Content */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Notice Content</h3>
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

            {/* Attachments Section */}
            {news.attachments && news.attachments.length > 0 && (
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Attachments</h3>
                <div className="space-y-3">
                  {news.attachments.map((attachment, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-10 h-10 bg-red-100 rounded-lg">
                          <Download className="w-5 h-5 text-red-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{attachment.name}</p>
                          {attachment.size && (
                            <p className="text-sm text-gray-500">{attachment.size}</p>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          const link = document.createElement('a');
                          link.href = attachment.url;
                          link.download = attachment.name;
                          link.target = '_blank';
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm hover:shadow-md"
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-8 border-t border-gray-200">
              <button
                onClick={() => navigate(newsIsArchived ? "/news/archived" : "/news")}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                View More {newsIsArchived ? "Archived " : ""}Notices
              </button>
            </div>
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

        {/* Latest News Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-10 text-center">
            Latest {newsIsArchived ? "Archived " : ""}Notices
          </h2>
          
          {getLatestNews(id).length > 0 ? (
            <>
              {/* Latest News Cards */}
              <div className="space-y-4 mb-8">
                {getLatestNews(id).map((item) => (
                  <div key={item.id} className="group bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer relative">
                    {/* Archived Badge */}
                    {newsIsArchived && (
                      <div className="absolute top-3 right-3 z-10 bg-gray-600 text-white px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 shadow-md">
                        <Archive className="w-3 h-3" />
                        Archived
                      </div>
                    )}

                    <div className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 mr-4">
                          {/* Title */}
                          <h3 
                            className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 mb-2 cursor-pointer"
                            onClick={(e) => handleViewDetails(item, e)}
                          >
                            {item.title}
                          </h3>

                          <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                            <img 
                              src={assets.calender} 
                              alt="Calendar" 
                              className="w-4 h-4"
                            />
                            <span>{formatDate(item.date)}</span>
                          </div>
                          
                          {item.description && (
                            <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                              {item.description}
                            </p>
                          )}
                          
                          {item.category && (
                            <span className={`inline-block text-xs px-2 py-1 rounded-full ${getCategoryColor(item.category)}`}>
                              {item.category}
                            </span>
                          )}
                        </div>

                        {/* Action Buttons - Stacked Vertically */}
                        <div className="flex flex-col gap-3 flex-shrink-0">
                          {/* Download PDF Button */}
                          <button
                            onClick={(e) => handleDownloadPDF(item, e)}
                            className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md"
                            title="Download PDF"
                          >
                            <Download className="w-4 h-4" />
                            Download PDF
                          </button>

                          {/* View Details Button */}
                          <button
                            onClick={(e) => handleViewDetails(item, e)}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <button
                  onClick={() => navigate(newsIsArchived ? "/news/archived" : "/news")}
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-300 font-semibold inline-flex items-center shadow-md"
                >
                  View All {newsIsArchived ? "Archived " : ""}Notices
                  <ChevronRight className="w-5 h-5 ml-2" />
                </button>
              </div>
            </>
          ) : (
            <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-8 text-center">
              <p className="text-gray-500">
                No other {newsIsArchived ? "archived " : ""}notices available.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default NewsDetail
