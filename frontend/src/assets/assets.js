import iftar from './iftar.png';
import food_fest from './food_fest.png';
import research from './research.png';
import award from './award.png';
import career from './career.png';
import telco from './telco.png';

export const assets = {
  iftar,
  food_fest,
  research,
  award,
  career,
  telco,
};

export const sampleNews = [
  {
    id: 1,
    title: 'CSEDU Annual Iftar Program 2025',
    description: 'Join us for the annual iftar and dua program organized by the Computer Science and Engineering Department during the holy month of Ramadan.',
    image: iftar,
    category: 'general',
    date: 'Dec 21, 2024',
    author: 'CSEDU Administration',
    location: 'CSEDU Main Auditorium',
    time: '6:30 PM - 8:00 PM'
  },
  {
    id: 2,
    title: 'CSEDU Food Festival 2025',
    description: 'Experience a variety of cuisines at our annual food festival. Students and faculty showcase traditional and international dishes.',
    image: food_fest,
    category: 'general',
    date: 'Jan 15, 2025',
    author: 'Student Affairs Office',
    location: 'CSEDU Campus Ground',
    time: '10:00 AM - 4:00 PM'
  },
  {
    id: 3,
    title: 'International Research Symposium 2025',
    description: 'Explore the latest research findings at our international symposium. Leading researchers will present developments in computer science and AI.',
    image: research,
    category: 'academic',
    date: 'Feb 28, 2025',
    author: 'Research Committee',
    location: 'CSEDU Conference Hall',
    time: '9:00 AM - 5:00 PM'
  },
  {
    id: 4,
    title: 'Excellence Award Ceremony 2025',
    description: 'Celebrating outstanding achievements of our students and faculty members at the annual excellence award ceremony.',
    image: award,
    category: 'academic',
    date: 'Mar 10, 2025',
    author: 'CSEDU Administration',
    location: 'CSEDU Main Auditorium',
    time: '3:00 PM - 5:00 PM'
  },
  {
    id: 5,
    title: 'Career Development Workshop',
    description: 'Join our comprehensive career development workshop featuring industry experts and alumni sharing insights on professional growth.',
    image: career,
    category: 'general',
    date: 'Mar 20, 2025',
    author: 'Career Services',
    location: 'CSEDU Seminar Room',
    time: '10:00 AM - 3:00 PM'
  },
  {
    id: 6,
    title: 'Telecommunications Industry Seminar',
    description: 'Explore the latest trends and opportunities in the telecommunications industry with leading professionals and researchers.',
    image: telco,
    category: 'academic',
    date: 'Apr 05, 2025',
    author: 'Industry Relations Office',
    location: 'CSEDU Conference Hall',
    time: '2:00 PM - 6:00 PM'
  }
];

export const newsCategories = [
  { id: 'all', name: 'All News' },
  { id: 'academic', name: 'Academic' },
  { id: 'general', name: 'General' }
];