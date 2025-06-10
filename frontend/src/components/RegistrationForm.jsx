import React, { useState } from 'react';
import { X, User, Mail, Phone, Building, Hash, Calendar, MapPin, Clock, Users } from 'lucide-react';
import { toast } from 'react-toastify';
import axios from 'axios';

const RegistrationForm = ({ event, isOpen, onClose, onRegistrationSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    registrationNo: '',
    phone: '',
    department: '',
    specialRequirements: '',
    emergencyContact: '',
    emergencyPhone: '',
    dietary: '',
    tshirtSize: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Department options
  const departments = [
    { value: '', label: 'Select Department' },
    { value: 'cse', label: 'Computer Science & Engineering' },
    { value: 'eee', label: 'Electrical & Electronic Engineering' },
    { value: 'ce', label: 'Civil Engineering' },
    { value: 'me', label: 'Mechanical Engineering' },
    { value: 'che', label: 'Chemical Engineering' },
    { value: 'other', label: 'Other' }
  ];

  const tshirtSizes = [
    { value: '', label: 'Select T-Shirt Size' },
    { value: 'xs', label: 'Extra Small (XS)' },
    { value: 's', label: 'Small (S)' },
    { value: 'm', label: 'Medium (M)' },
    { value: 'l', label: 'Large (L)' },
    { value: 'xl', label: 'Extra Large (XL)' },
    { value: 'xxl', label: 'XXL' }
  ];

  const dietaryOptions = [
    { value: '', label: 'No special dietary requirements' },
    { value: 'vegetarian', label: 'Vegetarian' },
    { value: 'vegan', label: 'Vegan' },
    { value: 'halal', label: 'Halal' },
    { value: 'gluten-free', label: 'Gluten-free' },
    { value: 'other', label: 'Other (please specify in special requirements)' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.registrationNo.trim()) {
      newErrors.registrationNo = 'Registration number is required';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s\-\(\)]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (!formData.department) {
      newErrors.department = 'Please select your department';
    }

    // Event-specific validations
    if (event.requiresTshirt && !formData.tshirtSize) {
      newErrors.tshirtSize = 'T-shirt size is required for this event';
    }

    if (event.requiresEmergencyContact) {
      if (!formData.emergencyContact.trim()) {
        newErrors.emergencyContact = 'Emergency contact name is required';
      }
      if (!formData.emergencyPhone.trim()) {
        newErrors.emergencyPhone = 'Emergency contact phone is required';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fill in all required fields correctly');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Check if user is already registered
      const checkResponse = await axios.get(`/api/events/${event.id}/registrations/check`, {
        params: { email: formData.email }
      });
      
      if (checkResponse.data.isRegistered) {
        toast.error('You are already registered for this event!');
        setIsSubmitting(false);
        return;
      }

      // Submit registration
      const registrationData = {
        eventId: event.id,
        ...formData,
        registrationDate: new Date().toISOString()
      };

      const response = await axios.post(`/api/events/${event.id}/register`, registrationData);
      
      if (response.status === 200 || response.status === 201) {
        const { registrationId, confirmationNumber } = response.data;
        
        // Show success message
        toast.success(
          <div>
            <div className="font-semibold">Registration Successful! 🎉</div>
            <div className="text-sm mt-1">
              Confirmation #: {confirmationNumber}
            </div>
            <div className="text-sm">Check your email for details</div>
          </div>,
          {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          }
        );

        // Send confirmation email
        try {
          await axios.post(`/api/events/${event.id}/send-confirmation`, {
            email: formData.email,
            registrationId,
            confirmationNumber
          });
        } catch (emailError) {
          console.warn('Failed to send confirmation email:', emailError);
          toast.warn('Registration successful, but confirmation email could not be sent');
        }

        // Call success callback with registration details
        onRegistrationSuccess({
          registrationId,
          confirmationNumber,
          registrationData: formData
        });

        // Close form
        onClose();
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          registrationNo: '',
          phone: '',
          department: '',
          specialRequirements: '',
          emergencyContact: '',
          emergencyPhone: '',
          dietary: '',
          tshirtSize: ''
        });
        
      }
    } catch (error) {
      console.error('Registration error:', error);
      
      if (error.response?.status === 409) {
        toast.error('You are already registered for this event!');
      } else if (error.response?.status === 400) {
        toast.error(error.response.data.message || 'Registration failed. Please check your information.');
      } else if (error.response?.status === 403) {
        toast.error('Registration is closed for this event');
      } else if (error.response?.status === 410) {
        toast.error('Event is full. Registration is no longer available.');
      } else {
        toast.error('Registration failed. Please try again later.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Event Registration</h2>
              <p className="text-gray-600 mt-1">Complete the form below to register</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              disabled={isSubmitting}
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Event Summary */}
        <div className="px-6 py-4 bg-blue-50 border-b border-gray-200">
          <h3 className="font-semibold text-blue-900 mb-2">{event.title}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-blue-700">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(event.date)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{formatTime(event.startTime)} - {formatTime(event.endTime)}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{event.location}</span>
            </div>
            {event.maxAttendees && (
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>{event.currentAttendees || 0} / {event.maxAttendees} registered</span>
              </div>
            )}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-6 space-y-6">
          {/* Personal Information */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <User className="w-5 h-5" />
              Personal Information
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Enter your full name"
                  disabled={isSubmitting}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Enter your email address"
                  disabled={isSubmitting}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Registration/Student ID <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="registrationNo"
                  value={formData.registrationNo}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.registrationNo ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Enter your registration number"
                  disabled={isSubmitting}
                />
                {errors.registrationNo && <p className="text-red-500 text-xs mt-1">{errors.registrationNo}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Enter your phone number"
                  disabled={isSubmitting}
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Department <span className="text-red-500">*</span>
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.department ? 'border-red-500' : 'border-gray-300'}`}
                disabled={isSubmitting}
              >
                {departments.map(dept => (
                  <option key={dept.value} value={dept.value}>
                    {dept.label}
                  </option>
                ))}
              </select>
              {errors.department && <p className="text-red-500 text-xs mt-1">{errors.department}</p>}
            </div>
          </div>

          {/* Emergency Contact (if required) */}
          {event.requiresEmergencyContact && (
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Phone className="w-5 h-5" />
                Emergency Contact
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Emergency Contact Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.emergencyContact ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Enter emergency contact name"
                    disabled={isSubmitting}
                  />
                  {errors.emergencyContact && <p className="text-red-500 text-xs mt-1">{errors.emergencyContact}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Emergency Contact Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="emergencyPhone"
                    value={formData.emergencyPhone}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.emergencyPhone ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Enter emergency contact phone"
                    disabled={isSubmitting}
                  />
                  {errors.emergencyPhone && <p className="text-red-500 text-xs mt-1">{errors.emergencyPhone}</p>}
                </div>
              </div>
            </div>
          )}

          {/* Event-Specific Fields */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Event Preferences</h4>
            
            <div className="space-y-4">
              {/* T-shirt size */}
              {event.requiresTshirt && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    T-Shirt Size <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="tshirtSize"
                    value={formData.tshirtSize}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.tshirtSize ? 'border-red-500' : 'border-gray-300'}`}
                    disabled={isSubmitting}
                  >
                    {tshirtSizes.map(size => (
                      <option key={size.value} value={size.value}>
                        {size.label}
                      </option>
                    ))}
                  </select>
                  {errors.tshirtSize && <p className="text-red-500 text-xs mt-1">{errors.tshirtSize}</p>}
                </div>
              )}

              {/* Dietary requirements */}
              {event.includesMeals && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dietary Requirements
                  </label>
                  <select
                    name="dietary"
                    value={formData.dietary}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={isSubmitting}
                  >
                    {dietaryOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Special requirements */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Special Requirements / Notes
                </label>
                <textarea
                  name="specialRequirements"
                  value={formData.specialRequirements}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Any special requirements, accessibility needs, or additional notes..."
                  disabled={isSubmitting}
                />
              </div>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">
              By registering for this event, you agree to:
            </p>
            <ul className="text-sm text-gray-600 mt-2 space-y-1 ml-4">
              <li>• Attend the event at the specified date and time</li>
              <li>• Follow all event guidelines and code of conduct</li>
              <li>• Provide accurate information in this registration form</li>
              <li>• Allow event organizers to contact you regarding event updates</li>
            </ul>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium transition-all duration-200 ${
                isSubmitting 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:bg-blue-700 transform hover:scale-105 shadow-lg'
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Registering...</span>
                </div>
              ) : (
                'Complete Registration'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
