// app/contact/page.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ScrollReveal } from '@/components/animations/scroll-reveal';
import axios from 'axios';
import { MotionInput, MotionTextArea } from '@/components/ui/motion/motion-input';
import { MotionButton } from '@/components/ui/motion/motion-button';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ success: boolean; message?: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      console.log('Submitting contact form:', formData);

      await axios.post('/api/contact', formData, {
        headers: {
          'Content-Type': 'application/json',
        }
      }).catch(error => {
        console.error('Error submitting contact form:', error)
        throw new Error(error.message || 'Failed to submit form')
      });

      setSubmitStatus({ success: true, message: 'Message sent successfully!' });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setSubmitStatus({ 
        success: false, 
        message: error instanceof Error ? error.message : 'An error occurred' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <section className="container py-20">
          <ScrollReveal delay={0.1}>
            <h1 className="text-4xl font-bold text-white mb-8">
              Contact Me
            </h1>
          </ScrollReveal>
          
          <div className="max-w-lg mx-auto">
            <AnimatePresence>
              {submitStatus && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`p-4 rounded-lg mb-6 ${
                    submitStatus.success 
                      ? 'bg-green-900 text-green-200' 
                      : 'bg-red-900 text-red-200'
                  }`}
                >
                  {submitStatus.message}
                </motion.div>
              )}
            </AnimatePresence>
            
            <ScrollReveal delay={0.2}>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-gray-300 mb-2">Name</label>
                  <MotionInput
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    whileFocus={{ scale: 1.02 }}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-300 mb-2">Email</label>
                  <MotionInput
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    whileFocus={{ scale: 1.02 }}
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-gray-300 mb-2">Message</label>
                  <MotionTextArea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    whileFocus={{ scale: 1.02 }}
                  ></MotionTextArea>
                </div>
                <MotionButton type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </MotionButton>
              </form>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}