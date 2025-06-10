import React from 'react';
import { CheckCircle, Mail, Hash, Calendar, MapPin, Clock, X, Download, Share2 } from 'lucide-react';

const RegistrationSuccessModal = ({ 
  isOpen, 
  onClose, 
  registrationDetails, 
  event,
  onDownloadTicket,
  onShareEvent 
}) => {
  if (!isOpen || !registrationDetails) return null;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const handleDownloadTicket = () => {
    // Generate a simple ticket/confirmation document
    const ticketData = {
      event: event,
      registration: registrationDetails,
      timestamp: new Date().toISOString()
    };
    
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(ticketData, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `event-ticket-${registrationDetails.confirmationNumber}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    
    if (onDownloadTicket) {
      onDownloadTicket(registrationDetails);
    }
  };

  const handleShare = () => {
    const shareText = `I just registered for ${event.title}! 🎉\n\nDate: ${formatDate(event.date)}\nLocation: ${event.location}\n\nConfirmation #: ${registrationDetails.confirmationNumber}`;
    
    if (navigator.share) {
      navigator.share({
        title: `Registered for ${event.title}`,
        text: shareText,
        url: window.location.href
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(shareText).then(() => {
        alert('Event details copied to clipboard!');
      });
    }
    
    if (onShareEvent) {
      onShareEvent(event, registrationDetails);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative px-6 py-8 text-center bg-gradient-to-br from-green-50 to-blue-50 rounded-t-xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white hover:bg-opacity-50 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
          
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Registration Successful! 🎉
          </h2>
          <p className="text-gray-600">
            You're all set for the event. Check your email for confirmation details.
          </p>
        </div>

        {/* Registration Details */}
        <div className="px-6 py-6 space-y-6">
          {/* Confirmation Number */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="flex items-center gap-3 mb-2">
              <Hash className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-blue-900">Confirmation Number</span>
            </div>
            <div className="text-2xl font-bold text-blue-700 font-mono tracking-wider">
              {registrationDetails.confirmationNumber}
            </div>
            <p className="text-sm text-blue-600 mt-1">
              Save this number for your records
            </p>
          </div>

          {/* Event Details */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Event Details</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-gray-500 mt-0.5" />
                <div>
                  <div className="font-medium text-gray-900">{event.title}</div>
                  <div className="text-sm text-gray-600">{formatDate(event.date)}</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-gray-500 mt-0.5" />
                <div className="text-sm text-gray-600">
                  {formatTime(event.startTime)} - {formatTime(event.endTime)}
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
                <div className="text-sm text-gray-600">{event.location}</div>
              </div>
            </div>
          </div>

          {/* Registration Info */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Your Registration</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Name:</span>
                <span className="font-medium">{registrationDetails.registrationData.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Email:</span>
                <span className="font-medium">{registrationDetails.registrationData.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Registration ID:</span>
                <span className="font-medium">{registrationDetails.registrationData.registrationNo}</span>
              </div>
              {registrationDetails.registrationData.department && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Department:</span>
                  <span className="font-medium capitalize">{registrationDetails.registrationData.department}</span>
                </div>
              )}
            </div>
          </div>

          {/* Email Confirmation Notice */}
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <div className="font-medium text-yellow-900 mb-1">Confirmation Email Sent</div>
                <div className="text-sm text-yellow-700">
                  A detailed confirmation email has been sent to{' '}
                  <span className="font-medium">{registrationDetails.registrationData.email}</span>.
                  Please check your inbox and spam folder.
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">What's Next?</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                <span>Check your email for detailed event information and instructions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                <span>Add the event to your calendar</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                <span>Arrive 15 minutes early for check-in</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                <span>Bring your confirmation number and a valid ID</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={handleDownloadTicket}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              <Download className="w-4 h-4" />
              Download Ticket
            </button>
            
            <button
              onClick={handleShare}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <Share2 className="w-4 h-4" />
              Share Event
            </button>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegistrationSuccessModal;
