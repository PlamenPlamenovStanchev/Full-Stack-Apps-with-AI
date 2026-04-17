export interface NewsItem {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  image: string;
  category: string;
}

export const newsData: NewsItem[] = [
  {
    id: 1,
    title: 'New Advanced Cardiology Department Opens',
    slug: 'new-advanced-cardiology-department-opens',
    excerpt: 'We are thrilled to announce the opening of our state-of-the-art cardiology department equipped with the latest diagnostic and treatment technology.',
    content: `We are thrilled to announce the opening of our state-of-the-art cardiology department equipped with the latest diagnostic and treatment technology. 

Our new cardiology department features:
- Advanced echocardiography equipment
- Cardiac MRI technology
- Intervention catheterization lab
- Expert cardiologists with international experience

This expansion reinforces our commitment to providing the highest quality cardiac care to our patients. The department will be open for appointments starting next month.`,
    date: '2024-04-15',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop',
    category: 'Department News'
  },
  {
    id: 2,
    title: 'Healthcare Clinic Receives ISO 9001 Certification',
    slug: 'healthcare-clinic-receives-iso-9001-certification',
    excerpt: 'Our clinic has been awarded ISO 9001:2015 certification, recognizing our commitment to quality management and patient safety standards.',
    content: `Our clinic has been awarded ISO 9001:2015 certification, recognizing our commitment to quality management and patient safety standards.

This certification demonstrates our dedication to:
- Consistent quality of medical services
- Patient safety and satisfaction
- Continuous improvement in operations
- International best practices implementation

We are proud to maintain the highest standards of healthcare delivery and management.`,
    date: '2024-04-10',
    image: 'https://images.unsplash.com/photo-1631217314830-4e5938cda8b9?w=600&h=400&fit=crop',
    category: 'Achievements'
  },
  {
    id: 3,
    title: 'Free Health Screening Campaign Launched',
    slug: 'free-health-screening-campaign-launched',
    excerpt: 'Join us for our annual free health screening campaign. Get comprehensive health checks including blood pressure, cholesterol, and diabetes screening.',
    content: `Join us for our annual free health screening campaign. Get comprehensive health checks including blood pressure, cholesterol, and diabetes screening.

Campaign Details:
- Dates: April 20-30, 2024
- Location: All clinic branches
- Services: Blood pressure, cholesterol, diabetes, BMI assessment
- No registration required, walk-ins welcome
- Expert health consultants available for advice

Take charge of your health today!`,
    date: '2024-04-05',
    image: 'https://images.unsplash.com/photo-1579154204601-01d82b27d100?w=600&h=400&fit=crop',
    category: 'Community'
  },
  {
    id: 4,
    title: 'Telemedicine Services Now Available 24/7',
    slug: 'telemedicine-services-now-available-24-7',
    excerpt: 'Our clinic is proud to introduce 24/7 telemedicine services, allowing you to consult with healthcare professionals anytime, anywhere.',
    content: `Our clinic is proud to introduce 24/7 telemedicine services, allowing you to consult with healthcare professionals anytime, anywhere.

Benefits of our telemedicine platform:
- Convenient consultations from home
- Reduced wait times
- Secure and private video conferencing
- Prescription delivery to your pharmacy
- Available 24 hours, 7 days a week

Download our mobile app or visit our website to book your first consultation today!`,
    date: '2024-03-30',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop',
    category: 'Technology'
  },
  {
    id: 5,
    title: 'Expert Tips for Preventive Healthcare',
    slug: 'expert-tips-for-preventive-healthcare',
    excerpt: 'Our healthcare experts share valuable insights on maintaining good health and preventing common diseases through preventive care.',
    content: `Our healthcare experts share valuable insights on maintaining good health and preventing common diseases through preventive care.

Key preventive healthcare tips:
- Regular health screenings and check-ups
- Maintain a balanced diet and regular exercise
- Manage stress through meditation and relaxation
- Get sufficient sleep (7-8 hours daily)
- Avoid smoking and limit alcohol consumption
- Stay updated with vaccinations

Prevention is better than cure. Schedule your preventive health check-up today!`,
    date: '2024-03-25',
    image: 'https://images.unsplash.com/photo-1505576399279-1a202fa1a11d?w=600&h=400&fit=crop',
    category: 'Health Tips'
  },
  {
    id: 6,
    title: 'Dr. Sarah Johnson Joins Our Medical Team',
    slug: 'dr-sarah-johnson-joins-our-medical-team',
    excerpt: 'We welcome Dr. Sarah Johnson, a renowned ophthalmologist with over 15 years of experience in eye care and surgery.',
    content: `We welcome Dr. Sarah Johnson, a renowned ophthalmologist with over 15 years of experience in eye care and surgery.

Dr. Johnson's specialties include:
- Cataract surgery
- LASIK eye surgery
- Glaucoma treatment
- Comprehensive eye examinations
- Retinal disease management

Dr. Johnson brings exceptional expertise and is dedicated to providing the best eye care services. Book your appointment with Dr. Johnson today!`,
    date: '2024-03-20',
    image: 'https://images.unsplash.com/photo-1537368310450-e7b7a547d78e?w=600&h=400&fit=crop',
    category: 'Staff Updates'
  }
];

// Generate slug from title
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
};

// Get news item by slug
export const getNewsBySlug = (slug: string): NewsItem | undefined => {
  return newsData.find(news => news.slug === slug);
};

// Get all unique categories
export const getCategories = (): string[] => {
  return Array.from(new Set(newsData.map(news => news.category)));
};
