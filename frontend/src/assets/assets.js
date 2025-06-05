import iftar from './iftar.png';
import food_fest from './food_fest.png';
import research from './research.png';
import award from './award.png';
import career from './career.png';
import telco from './telco.png';
import policy from './policy.png';
import faculty from './faculty.png';
import security from './security.png';
import calender from './calendar.png';

export const assets = {
  iftar,
  food_fest,
  research,
  award,
  career,
  telco,
  policy,
  faculty,
  security, 
  calender
};

export const sampleNews = [
  {
    id: 1,
    title: 'CSEDU Annual Iftar Program 2025',
    description: 'Join us for the annual iftar and dua program organized by the Computer Science and Engineering Department during the holy month of Ramadan.',
    image: iftar,
    category: 'general',
    date: 'December 21, 2023',
    expiryDate: 'January 15, 2024', // Expired - will be archived
    author: 'CSEDU Administration',
    location: 'CSEDU Main Auditorium',
    time: '6:30 PM - 8:00 PM',
    isArchived: false // Will be auto-calculated based on expiry date
  },
  {
    id: 2,
    title: 'CSEDU Food Festival 2025',
    description: 'Experience a variety of cuisines at our annual food festival. Students and faculty showcase traditional and international dishes.',
    image: food_fest,
    category: 'general',
    date: 'January 15, 2024',
    expiryDate: 'February 28, 2024', // Expired - will be archived
    author: 'Student Affairs Office',
    location: 'CSEDU Campus Ground',
    time: '10:00 AM - 4:00 PM',
    isArchived: false
  },
  {
    id: 3,
    title: 'International Research Symposium 2025',
    description: 'Explore the latest research findings at our international symposium. Leading researchers will present developments in computer science and AI.',
    image: research,
    category: 'academic',
    date: 'February 28, 2022',
    expiryDate: 'March 31, 2022', // Very old - will be archived
    author: 'Research Committee',
    location: 'CSEDU Conference Hall',
    time: '9:00 AM - 5:00 PM',
    isArchived: false
  },
  {
    id: 4,
    title: 'Excellence Award Ceremony 2025',
    description: 'Celebrating outstanding achievements of our students and faculty members at the annual excellence award ceremony.',
    image: award,
    category: 'academic',
    date: 'March 10, 2025',
    expiryDate: 'December 31, 2025', // Active until end of year
    author: 'CSEDU Administration',
    location: 'CSEDU Main Auditorium',
    time: '3:00 PM - 5:00 PM',
    isArchived: false
  },
  {
    id: 5,
    title: 'Career Development Workshop',
    description: 'Join our comprehensive career development workshop featuring industry experts and alumni sharing insights on professional growth.',
    image: career,
    category: 'general',
    date: 'March 20, 2025',
    expiryDate: 'August 31, 2025', // Active for several months
    author: 'Career Services',
    location: 'CSEDU Seminar Room',
    time: '10:00 AM - 3:00 PM',
    isArchived: false
  },
  {
    id: 6,
    title: 'Telecommunications Industry Seminar',
    description: 'Explore the latest trends and opportunities in the telecommunications industry with leading professionals and researchers.',
    image: telco,
    category: 'academic',
    date: 'April 5, 2025',
    expiryDate: 'September 30, 2025', // Active until fall
    author: 'Industry Relations Office',
    location: 'CSEDU Conference Hall',
    time: '2:00 PM - 6:00 PM',
    isArchived: false
  },
  {
    id: 7,
    title: 'New Academic Policy Updates 2025',
    description: 'Important updates to academic policies including grading system changes and course registration procedures effective from Spring 2025.',
    image: policy,
    category: 'administrative',
    date: 'January 10, 2023',
    expiryDate: 'December 31, 2023', // Expired - will be archived
    author: 'Academic Affairs Office',
    location: 'CSEDU Administration',
    time: 'Effective Immediately',
    isArchived: false
  },
  {
    id: 8,
    title: 'Faculty Appointment Announcement',
    description: 'We are pleased to announce the appointment of new faculty members to the Computer Science and Engineering Department.',
    image: faculty,
    category: 'administrative',
    date: 'February 1, 2024',
    expiryDate: 'June 30, 2024', // Expired - will be archived
    author: 'Human Resources',
    location: 'CSEDU Administration',
    time: 'Effective March 2025',
    isArchived: false
  },
  {
    id: 9,
    title: 'Campus Security and Compliance Update',
    description: 'New security protocols and compliance requirements for all students and staff. Please review the updated guidelines.',
    image: security,
    category: 'administrative',
    date: 'March 15, 2021',
    expiryDate: 'December 31, 2021', // Very old - will be archived
    author: 'Security Office',
    location: 'Campus-wide',
    time: 'Immediate Implementation',
    isArchived: false
  },
  {
    id: 10,
    title: 'Summer Internship Program 2025',
    description: 'Applications are now open for the summer internship program. Gain valuable industry experience with our partner companies.',
    image: career,
    category: 'academic',
    date: 'May 1, 2025',
    expiryDate: 'July 31, 2025', // Active for summer
    author: 'Career Services',
    location: 'CSEDU Career Center',
    time: 'Application Deadline: June 15, 2025',
    isArchived: false
  },
  {
    id: 11,
    title: 'Student Registration Reminder',
    description: 'Reminder for all students to complete their course registration for the upcoming semester. Late registration fees apply after the deadline.',
    image: research,
    category: 'administrative',
    date: 'June 1, 2025',
    expiryDate: 'June 30, 2025', // Active for current month
    author: 'Registrar Office',
    location: 'Online Registration System',
    time: 'Deadline: June 20, 2025',
    isArchived: false
  },
  {
    id: 12,
    title: 'Alumni Networking Event',
    description: 'Connect with CSEDU alumni working in top tech companies. Great opportunity for networking and career guidance.',
    image: faculty,
    category: 'general',
    date: 'June 10, 2025',
    expiryDate: 'October 31, 2025', // Active through fall
    author: 'Alumni Relations',
    location: 'CSEDU Alumni Hall',
    time: '5:00 PM - 8:00 PM',
    isArchived: false
  }
];

export const newsCategories = [
  { id: 'all', name: 'All' },
  { id: 'academic', name: 'Academic' },
  { id: 'general', name: 'General' },
  { id: 'administrative', name: 'Administrative' }
];