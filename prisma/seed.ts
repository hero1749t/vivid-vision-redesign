import 'dotenv/config';
import { PrismaClient, UserRole, StaffRole, BatchStatus, RoomType, PaymentType, PostStatus } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Starting seed...');

  // ─────────────────────────────────────────────
  // 1. USERS & STAFF
  // ─────────────────────────────────────────────

  // Admin user
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@baliyttc.com' },
    update: {},
    create: {
      email: 'admin@baliyttc.com',
      displayName: 'Admin User',
      uid: 'admin-001',
      role: UserRole.ADMIN,
    },
  });

  await prisma.staff.upsert({
    where: { userId: adminUser.id },
    update: {},
    create: {
      userId: adminUser.id,
      role: StaffRole.SUPER_ADMIN,
      status: 'ACTIVE',
    },
  });

  // Test student
  const studentUser = await prisma.user.upsert({
    where: { email: 'student@test.com' },
    update: {},
    create: {
      email: 'student@test.com',
      displayName: 'Test Student',
      uid: 'student-001',
      role: UserRole.STUDENT,
    },
  });

  await prisma.student.upsert({
    where: { userId: studentUser.id },
    update: {},
    create: {
      userId: studentUser.id,
      phone: '+1 555-0101',
      nationality: 'USA',
      yogaExperience: '1 year',
      paymentStatus: 'FULL_PAID',
      accessLevel: 'FULL',
    },
  });

  // Test teacher
  const teacherUser = await prisma.user.upsert({
    where: { email: 'teacher@test.com' },
    update: {},
    create: {
      email: 'teacher@test.com',
      displayName: 'Test Teacher',
      uid: 'teacher-001',
      role: UserRole.TEACHER,
    },
  });

  await prisma.staff.upsert({
    where: { userId: teacherUser.id },
    update: {},
    create: {
      userId: teacherUser.id,
      role: StaffRole.TEACHER,
      status: 'ACTIVE',
    },
  });

  console.log('✅ Users created');

  // ─────────────────────────────────────────────
  // 2. COURSES
  // ─────────────────────────────────────────────

  const course100 = await prisma.course.upsert({
    where: { slug: '100hr' },
    update: {},
    create: {
      slug: '100hr',
      name: '100-Hour Yoga Teacher Training',
      duration: '100 Hours | 11 Days',
      summary: 'An 11-day multi-style Yoga Teacher Training course for beginner yogis, accredited by Yoga Alliance.',
      description: 'A focused first immersion into authentic yoga. Perfect for beginners wanting to start their yoga journey.',
      priceFrom: 999,
      priceFull: 1299,
      image: 'https://ml4wp2nfx5ts.i.optimole.com/cb:JBht.f40/w:700/q:mauto/g:sm/f:best/https://baliyttc.com/wp-content/uploads/2025/08/Art-of-adjustment-Bali-YTTC.jpg',
      isActive: true,
    },
  });

  const course200 = await prisma.course.upsert({
    where: { slug: '200hr' },
    update: {},
    create: {
      slug: '200hr',
      name: '200-Hour Yoga Teacher Training',
      duration: '200 Hours | 21 Days',
      summary: 'Our flagship 21-day immersion for beginner and intermediate yogis. Become a Yoga Alliance certified teacher.',
      description: 'Comprehensive training covering Hatha, Ashtanga, Vinyasa, anatomy, philosophy, and teaching methodology.',
      priceFrom: 1499,
      priceFull: 1899,
      image: 'https://ml4wp2nfx5ts.i.optimole.com/cb:JBht.f40/w:700/q:mauto/g:sm/f:best/https://baliyttc.com/wp-content/uploads/2025/08/200-hour-Yoga-Teacher-Training-in-bali-1.jpg',
      isActive: true,
    },
  });

  const course300 = await prisma.course.upsert({
    where: { slug: '300hr' },
    update: {},
    create: {
      slug: '300hr',
      name: '300-Hour Advanced Teacher Training',
      duration: '300 Hours | 28 Days',
      summary: 'For certified 200-hour teachers ready to deepen practice and teaching through advanced modules.',
      description: 'Advanced asana, yoga therapy, Bhagavad Gita study, and one-on-one mentorship.',
      priceFrom: 1899,
      priceFull: 2299,
      image: 'https://ml4wp2nfx5ts.i.optimole.com/cb:JBht.f40/w:700/q:mauto/g:sm/f:best/https://baliyttc.com/wp-content/uploads/2025/08/Yoga-Retreat-in-Bali.jpg',
      isActive: true,
    },
  });

  console.log('✅ Courses created');

  // ─────────────────────────────────────────────
  // 3. MODULES for 200hr Course
  // ─────────────────────────────────────────────

  const modules200 = [
    { title: 'Asana Practice', description: 'Deep dive into Hatha, Ashtanga Vinyasa, and Yin Yoga styles.' },
    { title: 'Teaching Methodology', description: 'Art of sequencing, cueing, and classroom management.' },
    { title: 'Applied Anatomy', description: 'Detailed study of physiology as it relates to yoga practice.' },
    { title: 'Pranayama & Breath', description: 'Master the art of breath control and energy management.' },
    { title: 'Yoga Philosophy', description: 'Study of Patanjali Yoga Sutras and the 8 limbs.' },
    { title: 'Ayurveda Intro', description: 'Foundations of Ayurvedic nutrition and lifestyle.' },
    { title: 'Ethics & Business', description: 'How to launch your career and teach ethically worldwide.' },
    { title: 'Hands-on Adjustments', description: 'Safe, consensual, and effective hands-on teaching.' },
  ];

  for (let i = 0; i < modules200.length; i++) {
    await prisma.module.upsert({
      where: {
        id: `module-200-${i}`,
      },
      update: {},
      create: {
        id: `module-200-${i}`,
        courseId: course200.id,
        title: modules200[i].title,
        description: modules200[i].description,
        order: i,
        hours: i < 4 ? 25 : 20,
      },
    });
  }

  console.log('✅ Modules created');

  // ─────────────────────────────────────────────
  // 4. BATCHES
  // ─────────────────────────────────────────────

  const batches = [
    {
      courseId: course100.id,
      name: 'Feb 2026 Batch',
      startDate: new Date('2026-02-05'),
      endDate: new Date('2026-02-15'),
      capacity: 20,
      enrolled: 14,
      status: BatchStatus.OPEN,
      priceRegular: 999,
      priceEarlyBird: 899,
      earlyBirdDeadline: new Date('2026-01-15'),
    },
    {
      courseId: course200.id,
      name: 'Mar 2026 Batch',
      startDate: new Date('2026-03-02'),
      endDate: new Date('2026-03-22'),
      capacity: 20,
      enrolled: 16,
      status: BatchStatus.OPEN,
      priceRegular: 1499,
      priceEarlyBird: 1299,
      earlyBirdDeadline: new Date('2026-02-01'),
    },
    {
      courseId: course200.id,
      name: 'May 2026 Batch',
      startDate: new Date('2026-05-04'),
      endDate: new Date('2026-05-24'),
      capacity: 20,
      enrolled: 8,
      status: BatchStatus.OPEN,
      priceRegular: 1499,
      priceEarlyBird: 1299,
      earlyBirdDeadline: new Date('2026-04-01'),
    },
    {
      courseId: course300.id,
      name: 'Apr 2026 Batch',
      startDate: new Date('2026-04-06'),
      endDate: new Date('2026-05-03'),
      capacity: 15,
      enrolled: 6,
      status: BatchStatus.OPEN,
      priceRegular: 1899,
      priceEarlyBird: 1699,
      earlyBirdDeadline: new Date('2026-03-01'),
    },
  ];

  for (const batch of batches) {
    await prisma.batch.upsert({
      where: { id: batch.name.toLowerCase().replace(/\s+/g, '-') },
      update: {},
      create: {
        id: batch.name.toLowerCase().replace(/\s+/g, '-'),
        ...batch,
      },
    });
  }

  console.log('✅ Batches created');

  // ─────────────────────────────────────────────
  // 5. ACCOMMODATION OPTIONS
  // ─────────────────────────────────────────────

  const batch200Mar = await prisma.batch.findFirst({
    where: { name: 'Mar 2026 Batch' },
  });

  if (batch200Mar) {
    await prisma.accommodation.createMany({
      data: [
        { batchId: batch200Mar.id, type: RoomType.SHARED, price: 0, mandatory: true },
        { batchId: batch200Mar.id, type: RoomType.PRIVATE, price: 400, mandatory: false },
        { batchId: batch200Mar.id, type: RoomType.LUXURY, price: 900, mandatory: false },
      ],
      skipDuplicates: true,
    });
  }

  console.log('✅ Accommodation options created');

  // ─────────────────────────────────────────────
  // 6. TEACHERS
  // ─────────────────────────────────────────────

  const teachers = [
    {
      name: 'Vivek Kalura',
      slug: 'vivek-kalura',
      role: 'Lead Teacher / Founder',
      credentials: 'MSc - Yogic Science',
      bio: 'Vivek leads the school with more than a decade of immersive teaching across India and Bali. His method weaves classical Hatha discipline with the fluidity of Vinyasa. He holds a Masters in Yogic Science and is dedicated to authentic lineage.',
      image: 'https://ml4wp2nfx5ts.i.optimole.com/cb:JBht.f40/w:700/q:mauto/g:sm/f:best/https://baliyttc.com/wp-content/uploads/2025/08/Vivek-kalura-Yoga-teacher-in-bali.jpg',
      styles: ['Hatha', 'Philosophy', 'Pranayama'],
    },
    {
      name: 'Sachin Rautela',
      slug: 'sachin-rautela',
      role: 'Senior Teacher',
      credentials: 'E-RYT 500',
      bio: "Sachin's classes are anatomically precise yet deeply intuitive. He specialises in alignment, adjustments and safe, intelligent sequencing. He has over 500 hours of registered training and years of experience in Rishikesh and Bali.",
      image: 'https://ml4wp2nfx5ts.i.optimole.com/cb:JBht.f40/w:700/q:mauto/g:sm/f:best/https://baliyttc.com/wp-content/uploads/2025/08/Sachin-Rautela-Yoga-Teacher-in-Bali.jpg',
      styles: ['Ashtanga', 'Alignment', 'Adjustments'],
    },
    {
      name: 'Mrs. Yuli',
      slug: 'yuli',
      role: 'Vinyasa & Sound Specialist',
      credentials: 'Senior Instructor',
      bio: 'A native Balinese teacher, Yuli brings the gentle spirit of the island to her classes. She is an expert in Vinyasa Flow, Yin Yoga, and is our lead Sound Healing therapist.',
      image: 'https://ml4wp2nfx5ts.i.optimole.com/cb:JBht.f40/w:700/q:mauto/g:sm/f:best/https://baliyttc.com/wp-content/uploads/2025/08/Yuli-Yoga-teacher-in-bali.jpg',
      styles: ['Vinyasa', 'Yin', 'Sound Healing'],
    },
    {
      name: 'Sandeep Ji',
      slug: 'sandeep-ji',
      role: 'Philosophy Master',
      credentials: 'Masters in Yoga',
      bio: "Sandeep Ji is a profound scholar of Yoga Philosophy and Pranayama. His teachings bridge the gap between ancient texts and modern application, helping students find spiritual depth.",
      image: 'https://ml4wp2nfx5ts.i.optimole.com/cb:JBht.f40/w:700/q:mauto/g:sm/f:best/https://baliyttc.com/wp-content/uploads/2025/08/Sandeep-Yoga-teacher-in-bali.jpg',
      styles: ['Philosophy', 'Meditation', 'Sanskrit'],
    },
  ];

  for (const teacher of teachers) {
    await prisma.teacher.upsert({
      where: { slug: teacher.slug },
      update: {},
      create: teacher,
    });
  }

  console.log('✅ Teachers created');

  // ─────────────────────────────────────────────
  // 7. FAQS
  // ─────────────────────────────────────────────

  const faqs = [
    {
      question: 'What is Bali Yoga Teacher Training Center?',
      answer: 'Bali YTTC is a Yoga Alliance certified school in Ubud, Bali offering 100-hour, 200-hour and 300-hour Hatha, Ashtanga and Vinyasa Flow trainings, plus retreats and workshops.',
      category: 'General',
      keywords: ['school', 'bali yttc', 'yoga school', 'training center'],
      locale: 'en',
    },
    {
      question: 'What visa do I need for Bali?',
      answer: 'For most students, a Tourist Visa (VOA) or B211A is recommended. We provide advice on which visa best suits your stay duration.',
      category: 'Visa',
      keywords: ['visa', 'indonesia', 'bali', 'passport', 'travel'],
      locale: 'en',
    },
    {
      question: 'What should I pack for the training?',
      answer: 'We provide mats, but you can bring your own. Pack comfortable yoga clothes, sunscreens, insect repellent, and an open heart for learning.',
      category: 'Preparation',
      keywords: ['pack', 'packing', 'what to bring', 'luggage'],
      locale: 'en',
    },
    {
      question: 'What accommodation is included?',
      answer: 'Comfortable shared or private villa options. Rooms include private bathrooms with hot/cold showers, high-speed Wi-Fi, air conditioning, refrigerator, kettle and hair dryer.',
      category: 'Accommodation',
      keywords: ['accommodation', 'room', 'stay', 'villa', 'housing'],
      locale: 'en',
    },
    {
      question: 'How much does the training cost?',
      answer: '100hr from $999, 200hr from $1,499, 300hr from $1,899. All prices include accommodation, meals, training, and Yoga Alliance certification.',
      category: 'Pricing',
      keywords: ['price', 'cost', 'fee', 'investment', 'how much'],
      locale: 'en',
    },
    {
      question: 'Will I get certified?',
      answer: 'Yes! Upon successful completion, you\'ll receive a Yoga Alliance RYT certificate (RYT-200, RYT-300, or RYT-500 depending on your program). This is internationally recognized.',
      category: 'Certification',
      keywords: ['certificate', 'certification', 'yoga alliance', 'ryt', 'rys'],
      locale: 'en',
    },
    {
      question: 'Do I need yoga experience?',
      answer: '100hr is designed for beginners with little to no experience. 200hr is for beginners to intermediate. 300hr requires a 200hr certification.',
      category: 'Courses',
      keywords: ['experience', 'beginner', 'never', 'first time', 'no yoga'],
      locale: 'en',
    },
    {
      question: 'How can I pay?',
      answer: 'We accept Stripe (credit/debit in EUR or USD), PayPal, and bank transfer. Pay a deposit (from $200) to secure your spot, with the balance due 30 days before arrival.',
      category: 'Payment',
      keywords: ['payment', 'pay', 'deposit', 'installment', 'card'],
      locale: 'en',
    },
  ];

  for (let i = 0; i < faqs.length; i++) {
    await prisma.fAQ.upsert({
      where: { id: `faq-${i}` },
      update: {},
      create: {
        id: `faq-${i}`,
        ...faqs[i],
        order: i,
      },
    });
  }

  console.log('✅ FAQs created');

  // ─────────────────────────────────────────────
  // 8. SAMPLE COUPONS
  // ─────────────────────────────────────────────

  const coupons = [
    { code: 'EARLYBIRD', discountType: 'PERCENTAGE' as const, discount: 15, minAmount: 500, maxDiscount: 200, usageLimit: 100 },
    { code: 'ALUMNI', discountType: 'PERCENTAGE' as const, discount: 10, minAmount: 500, usageLimit: 50 },
    { code: 'GROUP3', discountType: 'PERCENTAGE' as const, discount: 20, minAmount: 1000, usageLimit: 20 },
    { code: 'WELCOME500', discountType: 'FIXED' as const, discount: 500, minAmount: 1000, usageLimit: 30 },
  ];

  for (const coupon of coupons) {
    await prisma.coupon.upsert({
      where: { code: coupon.code },
      update: {},
      create: coupon,
    });
  }

  console.log('✅ Coupons created');

  // ─────────────────────────────────────────────
  // 9. SAMPLE ENROLLMENT
  // ─────────────────────────────────────────────

  if (batch200Mar) {
    await prisma.enrollment.upsert({
      where: { id: 'sample-enrollment-1' },
      update: {},
      create: {
        id: 'sample-enrollment-1',
        userId: studentUser.id,
        studentId: (await prisma.student.findUnique({ where: { userId: studentUser.id } }))?.id,
        courseSlug: '200hr',
        batchId: batch200Mar.id,
        accommodation: RoomType.SHARED,
        name: 'Test Student',
        email: 'student@test.com',
        phone: '+1 555-0101',
        preferredDate: 'Mar 2026',
        paymentType: PaymentType.FULL,
        paymentStatus: 'FULL_PAID',
        amount: 1499,
        currency: 'USD',
        accessLevel: 'FULL',
        referralSource: 'Google',
      },
    });
  }

  console.log('✅ Sample enrollment created');

  // ─────────────────────────────────────────────
  // 10. BLOG POSTS
  // ─────────────────────────────────────────────

  const blogPosts = [
    {
      title: 'Why Bali is the Perfect Place for Yoga Teacher Training',
      slug: 'why-bali-perfect-yoga-teacher-training',
      excerpt: 'Discover why Ubud, Bali has become one of the world\'s most sought-after destinations for yoga teacher training programs.',
      content: 'Bali offers a unique combination of spiritual energy, natural beauty, and a supportive community that makes it ideal for immersive yoga training...',
      category: 'Yoga',
      tags: ['yoga', 'bali', 'ubud', 'yoga teacher training'],
      author: 'Vivek Kalura',
      status: PostStatus.PUBLISHED,
      publishedAt: new Date('2025-01-15'),
      locale: 'en',
      readTime: 5,
    },
    {
      title: 'What to Expect During Your 200-Hour YTT',
      slug: 'what-to-expect-200-hour-ytt',
      excerpt: 'A comprehensive guide to what you\'ll experience during your 21-day yoga teacher training journey.',
      content: 'The 200-hour yoga teacher training is a transformative journey that goes beyond just learning how to teach yoga...',
      category: 'Guide',
      tags: ['200-hour', 'ytt', 'guide', 'what to expect'],
      author: 'Sachin Rautela',
      status: PostStatus.PUBLISHED,
      publishedAt: new Date('2025-02-20'),
      locale: 'en',
      readTime: 8,
    },
  ];

  for (const post of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {},
      create: post,
    });
  }

  console.log('✅ Blog posts created');

  console.log('🎉 Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
