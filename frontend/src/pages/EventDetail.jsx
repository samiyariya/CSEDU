import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  Tag, 
  ArrowLeft, 
  Share2, 
  Heart, 
  Download,
  User,
  Phone,
  Mail,
  Globe,
  ExternalLink,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { sampleEvents } from '../assets/assets';
import RegistrationForm from '../components/RegistrationForm';
import RegistrationSuccessModal from '../components/RegistrationSuccessModal';
import { toast } from 'react-toastify';

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  
  // Registration form states
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [registrationDetails, setRegistrationDetails] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        const foundEvent = sampleEvents.find(e => e.id.toString() === id);
        setEvent(foundEvent);
        setLoading(false);
        
        // Simulate checking registration status
        setIsRegistered(Math.random() > 0.7);
        setIsFavorited(Math.random() > 0.5);
      }, 500);
    };

    if (id) {
      fetchEvent();
    }
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    const time = new Date(`2000-01-01T${timeString}`);
    return time.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const getRegistrationStatus = () => {
    if (!event) return 'unknown';
    
    const today = new Date();
    const eventDate = new Date(event.date);
    const registrationDeadline = new Date(event.registrationDeadline);

    if (eventDate <= today) return 'past';
    if (registrationDeadline <= today) return 'deadline-passed';
    if (!event.registrationOpen) return 'closed';
    if (event.currentAttendees >= event.maxAttendees) return 'full';
    return 'open';
  };

  const getAttendancePercentage = () => {
    if (!event || !event.maxAttendees) return 0;
    return (event.currentAttendees / event.maxAttendees) * 100;
  };
  const handleRegister = () => {
    // Check if registration is open
    const now = new Date();
    const eventDate = new Date(event.date);
    const registrationDeadline = event.registrationDeadline ? new Date(event.registrationDeadline) : eventDate;
    
    if (now > eventDate) {
      toast.error('This event has already passed');
      return;
    }
    
    if (now > registrationDeadline) {
      toast.error('Registration deadline has passed');
      return;
    }
    
    if (event.maxAttendees && event.currentAttendees >= event.maxAttendees) {
      toast.error('This event is full');
      return;
    }
    
    // Open registration form
    setShowRegistrationForm(true);
  };

  const handleRegistrationSuccess = (details) => {
    setRegistrationDetails(details);
    setShowRegistrationForm(false);
    setShowSuccessModal(true);
    setIsRegistered(true);
    
    // Update the event's current attendees count
    setEvent(prevEvent => ({
      ...prevEvent,
      currentAttendees: (prevEvent.currentAttendees || 0) + 1
    }));
  };

  const handleCloseRegistrationForm = () => {
    setShowRegistrationForm(false);
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    setRegistrationDetails(null);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: event.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Event link copied to clipboard!');
    }
  };

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-32 mb-6"></div>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="h-64 bg-gray-300"></div>
              <div className="p-8">
                <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2 mb-6"></div>
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-4 bg-gray-300 rounded"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Event Not Found</h2>
          <p className="text-gray-600 mb-6">The event you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/events')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  const status = getRegistrationStatus();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/events')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Events
        </button>

        {/* Main Event Card */}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          {/* Event Image */}
          {event.image && (
            <div className="h-64 md:h-80 relative overflow-hidden">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              
              {/* Category Badge */}
              <div className="absolute top-4 left-4">
                <span className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-full capitalize">
                  {event.category}
                </span>
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
                  onClick={handleFavorite}
                  className={`p-2 bg-white bg-opacity-90 rounded-full hover:bg-white transition-colors ${
                    isFavorited ? 'text-red-600' : 'text-gray-700'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>
          )}

          <div className="p-8">
            {/* Event Tags */}
            {event.tags && event.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {event.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-full"
                  >
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Event Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {event.title}
            </h1>

            {/* Event Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Date & Time */}
              <div className="space-y-4">
                <div className="flex items-center text-gray-700">
                  <div className="flex items-center justify-center w-10 h-10 bg-blue-50 rounded-lg mr-4">
                    <Calendar className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold">{formatDate(event.date)}</p>
                    <p className="text-sm text-gray-500">Event Date</p>
                  </div>
                </div>

                <div className="flex items-center text-gray-700">
                  <div className="flex items-center justify-center w-10 h-10 bg-green-50 rounded-lg mr-4">
                    <Clock className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold">
                      {formatTime(event.startTime)} - {formatTime(event.endTime)}
                    </p>
                    <p className="text-sm text-gray-500">Event Time</p>
                  </div>
                </div>
              </div>

              {/* Location & Attendees */}
              <div className="space-y-4">
                <div className="flex items-center text-gray-700">
                  <div className="flex items-center justify-center w-10 h-10 bg-orange-50 rounded-lg mr-4">
                    <MapPin className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="font-semibold">{event.location}</p>
                    <p className="text-sm text-gray-500">Venue</p>
                  </div>
                </div>

                {event.maxAttendees && (
                  <div className="flex items-center text-gray-700">
                    <div className="flex items-center justify-center w-10 h-10 bg-purple-50 rounded-lg mr-4">
                      <Users className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-semibold">
                          {event.currentAttendees} / {event.maxAttendees} attendees
                        </p>
                        <span className="text-sm text-gray-500">
                          {Math.round(getAttendancePercentage())}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${getAttendancePercentage()}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">About This Event</h3>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {event.description}
              </p>
            </div>

            {/* Organizer Info */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Event Organizer</h3>
              <div className="flex items-center">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mr-4">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{event.organizer}</p>
                  <p className="text-sm text-gray-600">Event Organizer</p>
                </div>
              </div>
            </div>

            {/* Registration Status */}
            <div className="mb-8">
              {status === 'open' && (
                <div className="flex items-center p-4 bg-green-50 rounded-lg border border-green-200">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                  <div>
                    <p className="font-semibold text-green-800">Registration Open</p>
                    <p className="text-sm text-green-700">
                      Registration closes on {formatDate(event.registrationDeadline)}
                    </p>
                  </div>
                </div>
              )}

              {status === 'full' && (
                <div className="flex items-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mr-3" />
                  <div>
                    <p className="font-semibold text-yellow-800">Event Full</p>
                    <p className="text-sm text-yellow-700">
                      This event has reached maximum capacity
                    </p>
                  </div>
                </div>
              )}

              {status === 'closed' && (
                <div className="flex items-center p-4 bg-red-50 rounded-lg border border-red-200">
                  <XCircle className="w-5 h-5 text-red-600 mr-3" />
                  <div>
                    <p className="font-semibold text-red-800">Registration Closed</p>
                    <p className="text-sm text-red-700">
                      Registration is no longer available for this event
                    </p>
                  </div>
                </div>
              )}

              {status === 'deadline-passed' && (
                <div className="flex items-center p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <AlertCircle className="w-5 h-5 text-orange-600 mr-3" />
                  <div>
                    <p className="font-semibold text-orange-800">Registration Deadline Passed</p>
                    <p className="text-sm text-orange-700">
                      The registration deadline for this event has passed
                    </p>
                  </div>
                </div>
              )}

              {status === 'past' && (
                <div className="flex items-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <XCircle className="w-5 h-5 text-gray-600 mr-3" />
                  <div>
                    <p className="font-semibold text-gray-800">Event Completed</p>
                    <p className="text-sm text-gray-700">
                      This event has already taken place
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">              {status === 'open' && (
                <button
                  onClick={handleRegister}
                  className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                    isRegistered
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105'
                  }`}
                >
                  {isRegistered ? 'Registered ✓' : 'Register Now'}
                </button>
              )}

              <button
                onClick={() => navigate('/events')}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
              >
                Back to Events
              </button>

              {event.website && (
                <a
                  href={event.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-semibold"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Event Website
                </a>
              )}
            </div>          </div>
        </div>
      </div>

      {/* Registration Form Modal */}
      {showRegistrationForm && (
        <RegistrationForm
          event={event}
          isOpen={showRegistrationForm}
          onClose={handleCloseRegistrationForm}
          onRegistrationSuccess={handleRegistrationSuccess}
        />
      )}

      {/* Registration Success Modal */}
      {showSuccessModal && (
        <RegistrationSuccessModal
          isOpen={showSuccessModal}
          onClose={handleCloseSuccessModal}
          registrationDetails={registrationDetails}
          event={event}
        />
      )}
    </div>
  );
};

export default EventDetail;