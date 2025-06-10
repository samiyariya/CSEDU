import React from 'react';
import { Calendar, MapPin, Clock, Users, Tag } from 'lucide-react';

const EventCard = ({ event, onRegister, onViewDetails }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
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

  const isRegistrationOpen = () => {
    const today = new Date();
    const eventDate = new Date(event.date);
    const registrationDeadline = new Date(event.registrationDeadline);
    return eventDate > today && registrationDeadline > today && event.registrationOpen;
  };

  const getRegistrationStatus = () => {
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
    if (!event.maxAttendees) return 0;
    return (event.currentAttendees / event.maxAttendees) * 100;
  };

  const status = getRegistrationStatus();

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group">
      {/* Event Image */}
      {event.image && (
        <div className="h-48 overflow-hidden relative">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {/* Category Badge */}
          <div className="absolute top-3 right-3">
            <span className="px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-full capitalize">
              {event.category}
            </span>
          </div>
        </div>
      )}

      <div className="p-6">
        {/* Event Tags */}
        {event.tags && event.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {event.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2.5 py-0.5 bg-blue-50 text-blue-700 text-xs font-medium rounded-full"
              >
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </span>
            ))}
            {event.tags.length > 3 && (
              <span className="px-2.5 py-0.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                +{event.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Event Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {event.title}
        </h3>

        {/* Event Details */}
        <div className="space-y-2.5 mb-4">
          {/* Date */}
          <div className="flex items-center text-gray-600">
            <div className="flex items-center justify-center w-8 h-8 bg-blue-50 rounded-lg mr-3">
              <Calendar className="w-4 h-4 text-blue-600" />
            </div>
            <span className="text-sm font-medium">{formatDate(event.date)}</span>
          </div>

          {/* Time */}
          <div className="flex items-center text-gray-600">
            <div className="flex items-center justify-center w-8 h-8 bg-green-50 rounded-lg mr-3">
              <Clock className="w-4 h-4 text-green-600" />
            </div>
            <span className="text-sm font-medium">
              {formatTime(event.startTime)} - {formatTime(event.endTime)}
            </span>
          </div>

          {/* Location */}
          <div className="flex items-center text-gray-600">
            <div className="flex items-center justify-center w-8 h-8 bg-orange-50 rounded-lg mr-3">
              <MapPin className="w-4 h-4 text-orange-600" />
            </div>
            <span className="text-sm font-medium">{event.location}</span>
          </div>

          {/* Attendees Count */}
          {event.maxAttendees && (
            <div className="flex items-center text-gray-600">
              <div className="flex items-center justify-center w-8 h-8 bg-purple-50 rounded-lg mr-3">
                <Users className="w-4 h-4 text-purple-600" />
              </div>
              <div className="flex-1">
                <span className="text-sm font-medium">
                  {event.currentAttendees} / {event.maxAttendees} attendees
                </span>
                <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                  <div 
                    className="bg-purple-600 h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${getAttendancePercentage()}%` }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-gray-700 text-sm mb-5 line-clamp-3 leading-relaxed">
          {event.description}
        </p>

        {/* Organizer */}
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-500 mb-1">Organized by</p>
          <p className="text-sm font-medium text-gray-900">{event.organizer}</p>
        </div>

        {/* Registration Status & Action Buttons */}
        <div className="space-y-3">
          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => onViewDetails(event)}
              className="flex-1 px-4 py-2.5 border-2 border-secondary text-gray-700 rounded-lg hover:bg-gray-50 hover:border-yellow transition-all duration-200 text-sm font-medium"
            >
              View Details
            </button>
            
            {status === 'open' && (
              <button
                onClick={() => onRegister(event)}
                className="flex-1 px-4 py-2.5 bg-secondary text-white rounded-lg hover:bg-primary transform hover:scale-105 transition-all duration-200 text-sm font-medium shadow-md"
              >
                Register Now
              </button>
            )}
          </div>

          {/* Registration Status Indicator */}
          {status !== 'open' && (
            <div className="text-center">
              {status === 'past' && (
                <span className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                  Event Completed
                </span>
              )}
              {status === 'deadline-passed' && (
                <span className="inline-flex items-center px-3 py-1 bg-orange-100 text-orange-700 text-sm rounded-full">
                  Registration Deadline Passed
                </span>
              )}
              {status === 'closed' && (
                <span className="inline-flex items-center px-3 py-1 bg-red-100 text-red-700 text-sm rounded-full">
                  Registration Closed
                </span>
              )}
              {status === 'full' && (
                <span className="inline-flex items-center px-3 py-1 bg-yellow-100 text-yellow-700 text-sm rounded-full">
                  Event Full
                </span>
              )}
            </div>
          )}

          {/* Registration Deadline */}
          {status === 'open' && (
            <div className="text-center">
              <p className="text-xs text-gray-500">
                Registration closes: {formatDate(event.registrationDeadline)}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;