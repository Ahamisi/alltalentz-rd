import { generateFAQSchema } from '@/components/SchemaMarkup';

export const metadata = {
  title: 'Frequently Asked Questions | AllTalentz',
  description: 'Got questions about hiring remote talent from Africa? Find answers about our process, pricing, onboarding, and what makes AllTalentz different.',
  alternates: { canonical: 'https://alltalentz.com/faq' },
  openGraph: {
    type: 'website',
    siteName: 'AllTalentz',
    title: 'Frequently Asked Questions | AllTalentz',
    description: 'Got questions about hiring remote talent from Africa? Find answers about our process, pricing, onboarding, and what makes AllTalentz different.',
    url: 'https://alltalentz.com/faq',
    images: [{ url: '/twitter/twitter-card.png', width: 1200, height: 630, alt: 'AllTalentz' }],
  },
};

const faqData = [
  {
    question: 'What is All Talentz?',
    answer: 'All Talentz connects Employers with highly skilled remote workers from Africa at a low cost. Our service is flexible and helps you grow your business with the right talent for your needs.',
  },
  {
    question: 'Is All Talentz a Job board?',
    answer: "All Talentz is more than a job board. It is a platform that connects you with the best Talents for your specific needs. Whether you are looking for talent in a certain industry, skill, or role, we have a curated pool of qualified professionals ready to work with you. You don't have to waste time browsing through resumes or posting ads. Just tell us what you need and we will match you with the right talent.",
  },
  {
    question: 'Can I find any type of Remote Talent here?',
    answer: 'At All Talentz, we offer a range of Talents for various needs, such as Administrative, Digital, Software development and Marketing roles. If you need Talents for other roles that are not listed on our website, you can contact us for a customised role and we will find a suitable professional for you.',
  },
  {
    question: 'My needs aren\'t fully remote, more of a hybrid; what do I do?',
    answer: 'All Talentz only provides remote workers for various businesses at the moment. However, we can discuss your hybrid needs and might be able to work with you on an Immigration visa for on-site talent that suits your specific situation.',
  },
  {
    question: 'Is there someone I can talk to for a customised solution?',
    answer: 'Yes! You can schedule a meeting with a representative here. We are available to help you out with your custom needs.',
  },
  {
    question: 'I have requested Talent and have not heard back, what do I do?',
    answer: 'We apologize for any inconvenience caused by the delay in our response. This is a very uncommon situation and we are working hard to prevent it from happening again. Please contact us once more and we will do our best to assist you promptly.',
  },
  {
    question: 'I have applied to join the Talent pool but I have not heard back, what do I do?',
    answer: 'We apologize for any inconvenience caused by the delay in our response. Hiring managers are usually very busy. Please contact us once more and we will do our best to assist you promptly. And remember, kindness always wins.',
  },
  {
    question: 'I scheduled a meeting with an All Talentz representative but I missed the meeting, what do I do?',
    answer: 'If you missed a meeting with an All Talentz representative, you can reschedule for another meeting at the next available time. Our representatives are quite understanding and are ever ready to help you.',
  },
  {
    question: 'How reliable are the services All Talentz provides?',
    answer: 'Our reviews and ratings speak for themselves! We have a 5-star rating all around and our current clients give us a 5-star rating month-on-month.',
  },
  {
    question: 'Do I need an account to use All Talentz?',
    answer: 'You do not need an account to use All Talentz. When you get on the website, you can fill the form and provide your details and we will reach out to you. Alternatively, you could schedule a meeting with a representative on our website.',
  },
];

const faqSchema = generateFAQSchema(faqData);

export default function FaqLayout({ children }) {
  return (
    <>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      </head>
      {children}
    </>
  );
}
