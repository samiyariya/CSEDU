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
  },
  {
    id: 13,
    title: 'Machine Learning Workshop Series',
    description: 'Join our comprehensive machine learning workshop series covering fundamentals to advanced topics. Perfect for students and professionals.',
    image: research,
    category: 'academic',
    date: 'June 15, 2025',
    expiryDate: 'September 15, 2025',
    author: 'AI Research Lab',
    location: 'CSEDU Lab Complex',
    time: 'Every Saturday 2:00 PM - 5:00 PM',
    isArchived: false
  },
  {
    id: 14,
    title: 'Cybersecurity Awareness Campaign',
    description: 'Learn about the latest cybersecurity threats and how to protect yourself and your data. Mandatory for all students and staff.',
    image: security,
    category: 'administrative',
    date: 'May 20, 2025',
    expiryDate: 'July 20, 2025',
    author: 'IT Security Office',
    location: 'Campus-wide',
    time: 'Online Training Available',
    isArchived: false
  },
  {
    id: 15,
    title: 'Tech Startup Incubation Program',
    description: 'Transform your innovative ideas into successful startups with our incubation program. Mentorship and funding opportunities available.',
    image: career,
    category: 'general',
    date: 'April 25, 2025',
    expiryDate: 'November 30, 2025',
    author: 'Innovation Hub',
    location: 'CSEDU Innovation Center',
    time: 'Application Deadline: July 1, 2025',
    isArchived: false
  },
  {
    id: 16,
    title: 'Database Management System Course',
    description: 'Intensive course on database design, implementation, and management. Hands-on experience with popular database systems.',
    image: research,
    category: 'academic',
    date: 'March 1, 2024',
    expiryDate: 'May 31, 2024', // Expired
    author: 'Database Lab',
    location: 'CSEDU Lab 301',
    time: 'Mon/Wed/Fri 10:00 AM - 12:00 PM',
    isArchived: false
  },
  {
    id: 17,
    title: 'Annual Sports Day 2025',
    description: 'Join the annual sports day featuring various competitions including cricket, football, badminton, and table tennis.',
    image: food_fest,
    category: 'general',
    date: 'February 14, 2025',
    expiryDate: 'February 15, 2025', // Past event
    author: 'Sports Committee',
    location: 'CSEDU Sports Complex',
    time: '8:00 AM - 6:00 PM',
    isArchived: false
  },
  {
    id: 18,
    title: 'Final Examination Schedule Spring 2025',
    description: 'Final examination schedule for Spring 2025 semester. Please check your exam dates and venues carefully.',
    image: policy,
    category: 'administrative',
    date: 'May 15, 2025',
    expiryDate: 'June 15, 2025',
    author: 'Examination Committee',
    location: 'Various Examination Halls',
    time: 'Check Individual Schedule',
    isArchived: false
  },
  {
    id: 19,
    title: 'Industry-Academia Collaboration Forum',
    description: 'Bridging the gap between industry and academia. Leading companies will share insights on future technology trends.',
    image: telco,
    category: 'academic',
    date: 'July 5, 2025',
    expiryDate: 'December 31, 2025',
    author: 'Industry Relations',
    location: 'CSEDU Main Auditorium',
    time: '9:00 AM - 4:00 PM',
    isArchived: false
  },
  {
    id: 20,
    title: 'Programming Contest Training Camp',
    description: 'Intensive training camp for competitive programming. Prepare for ACM ICPC and other prestigious programming contests.',
    image: award,
    category: 'academic',
    date: 'August 1, 2025',
    expiryDate: 'October 15, 2025',
    author: 'Programming Club',
    location: 'CSEDU Programming Lab',
    time: 'Daily 4:00 PM - 8:00 PM',
    isArchived: false
  },
  {
    id: 21,
    title: 'Faculty Development Program',
    description: 'Professional development program for faculty members focusing on modern teaching methodologies and research techniques.',
    image: faculty,
    category: 'administrative',
    date: 'January 5, 2022',
    expiryDate: 'March 31, 2022', // Very old - archived
    author: 'Faculty Development Office',
    location: 'CSEDU Conference Room',
    time: 'Weekly Sessions',
    isArchived: false
  },
  {
    id: 22,
    title: 'Student Mental Health Awareness Week',
    description: 'A week-long program focusing on mental health awareness, stress management, and well-being for students.',
    image: iftar,
    category: 'general',
    date: 'September 10, 2025',
    expiryDate: 'November 30, 2025',
    author: 'Student Counseling Center',
    location: 'CSEDU Campus',
    time: 'Various Activities Throughout the Week',
    isArchived: false
  },
  {
    id: 23,
    title: 'Research Paper Publication Guidelines',
    description: 'Updated guidelines for research paper publication in international journals and conferences. Mandatory for all graduate students.',
    image: research,
    category: 'academic',
    date: 'December 1, 2022',
    expiryDate: 'June 30, 2023', // Expired
    author: 'Graduate Studies Office',
    location: 'CSEDU Administration',
    time: 'Effective Immediately',
    isArchived: false
  },
  {
    id: 24,
    title: 'Library Extended Hours During Exams',
    description: 'The library will extend its operating hours during the examination period to support students in their studies.',
    image: policy,
    category: 'administrative',
    date: 'November 20, 2024',
    expiryDate: 'January 15, 2025', // Expired
    author: 'Library Administration',
    location: 'CSEDU Central Library',
    time: '6:00 AM - 12:00 AM',
    isArchived: false
  },
  {
    id: 25,
    title: 'International Conference on AI and Data Science',
    description: 'Premier international conference bringing together researchers, practitioners, and students in artificial intelligence and data science.',
    image: research,
    category: 'academic',
    date: 'October 15, 2025',
    expiryDate: 'December 31, 2025',
    author: 'Conference Committee',
    location: 'CSEDU Main Campus',
    time: 'October 15-17, 2025',
    isArchived: false
  },
  {
    id: 26,
    title: 'Campus Wi-Fi Upgrade Notice',
    description: 'Campus-wide Wi-Fi infrastructure upgrade scheduled. Temporary service interruptions may occur during the upgrade period.',
    image: security,
    category: 'administrative',
    date: 'March 25, 2023',
    expiryDate: 'April 30, 2023', // Expired
    author: 'IT Services',
    location: 'Campus-wide',
    time: 'Upgrade Period: April 1-15, 2023',
    isArchived: false
  },
  {
    id: 27,
    title: 'Scholarship Application Deadline Extended',
    description: 'The deadline for merit-based scholarship applications has been extended. Don\'t miss this opportunity for financial assistance.',
    image: award,
    category: 'administrative',
    date: 'July 20, 2025',
    expiryDate: 'August 31, 2025',
    author: 'Financial Aid Office',
    location: 'CSEDU Administration',
    time: 'New Deadline: August 15, 2025',
    isArchived: false
  },
  {
    id: 28,
    title: 'Green Campus Initiative Launch',
    description: 'Join our green campus initiative to make CSEDU more environmentally sustainable. Various eco-friendly programs and activities.',
    image: iftar,
    category: 'general',
    date: 'Earth Day 2025',
    expiryDate: 'December 31, 2025',
    author: 'Environmental Committee',
    location: 'CSEDU Campus',
    time: 'Ongoing Initiative',
    isArchived: false
  }
];

export const newsCategories = [
  { id: 'all', name: 'All' },
  { id: 'academic', name: 'Academic' },
  { id: 'general', name: 'General' },
  { id: 'administrative', name: 'Administrative' }
];