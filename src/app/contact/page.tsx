import type { Metadata } from 'next'
import { constructMetadata, generateStructuredData } from '@/lib/metadata'

export const metadata: Metadata = constructMetadata({
  title: 'Contact Us | Get in Touch with Big Tour',
  description: 'Contact Big Tour for personalized travel planning, tour bookings, and expert travel advice. Our travel specialists are here to help create your perfect journey.',
  image: '/destination/baku.webp',
})

"use client";

import { useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageSquare,
  User,
  Mail as MailIcon,
  Calendar,
  Globe,
  Building,
  Users,
  Star,
  Instagram,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";
import SEOStructuredData from "@/components/SEOStructuredData";

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Our Office",
    description: "Chilonzor,Sergeli,Yunusobod ",
    color: "bg-primary",
  },
  {
    icon: Phone,
    title: "Call Us",
    description: "+998 90 019 22 00 ",
    color: "bg-primary",
  },
  {
    icon: Mail,
    title: "Email Us",
    description: "hello@bigtrip.com",
    color: "bg-primary",
  },
  {
    icon: Clock,
    title: "Working Hours",
    description: "Mon - Fri: 9AM - 6PM",
    color: "bg-primary",
  },
];

const faqData = [
  {
    question: "How do I book a tour?",
    answer:
      "You can book a tour through our website, by calling us directly, or by visiting our office. We offer multiple booking options for your convenience.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, PayPal, bank transfers, and cash payments. Payment plans are also available for longer tours.",
  },
  {
    question: "Can I cancel or modify my booking?",
    answer:
      "Yes, you can cancel or modify your booking up to 7 days before departure. Please refer to our cancellation policy for more details.",
  },
  {
    question: "Do you provide travel insurance?",
    answer:
      "Yes, we offer comprehensive travel insurance packages. We highly recommend purchasing insurance for international trips.",
  },
  {
    question: "What should I pack for my trip?",
    answer:
      "Packing requirements vary by destination and season. We'll provide you with a detailed packing list after booking.",
  },
  {
    question: "Are meals included in the tour price?",
    answer:
      "Meal inclusions vary by tour. Some tours include all meals, while others include only breakfast. Check the tour details for specifics.",
  },
];

const stats = [
  { number: "5000+", label: "Happy Travelers", icon: Users },
  { number: "150+", label: "Destinations", icon: Globe },
  { number: "4.9", label: "Average Rating", icon: Star },
  { number: "10+", label: "Years Experience", icon: Building },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

const cardHoverVariants = {
  initial: { scale: 1, y: 0 },
  hover: {
    scale: 1.05,
    y: -10,
    transition: {
      duration: 0.3,
      ease: "easeOut" as const,
    },
  },
};

const floatingVariants = {
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  },
};

const pulseVariants = {
  animate: {
    scale: [1, 1.1, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  },
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    tourType: "",
    budget: "",
    travelDate: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Scroll-based animations
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    toast({
      title: "Message Sent!",
      description:
        "Thank you for contacting us. We'll get back to you within 24 hours.",
    });

    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      tourType: "",
      budget: "",
      travelDate: "",
    });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOStructuredData 
        type="FAQPage" 
        data={{ faqs: faqData }} 
      />
      <Navigation scrollToSection={scrollToSection} />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-32 pb-20 overflow-hidden ">
        {/* Animated background elements */}
        <motion.div className="absolute inset-0 bg-[url('/destination/baku.webp')] bg-cover bg-center opacity-40 h-full top-0" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.2,
                type: "spring",
                stiffness: 200,
              }}
              className="inline-flex items-center gap-2 bg-primary/20 text-primary px-6 py-3 rounded-full text-sm font-medium mb-6 shadow-lg">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}>
                <MessageSquare className="h-5 w-5" />
              </motion.div>
              Get In Touch
            </motion.div>

            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight drop-shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}>
              Let's Start Your
              <motion.span
                className="text-primary block drop-shadow-lg"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.6,
                  type: "spring",
                  stiffness: 100,
                }}>
                Adventure
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-foreground max-w-3xl mx-auto mb-12 leading-relaxed drop-shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}>
              Ready to explore the world? Contact our travel experts and let us
              help you plan the perfect journey. We're here to make your travel
              dreams come true.
            </motion.p>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.05,
                    y: -5,
                    transition: { duration: 0.3 },
                  }}
                  className="text-center">
                  <motion.div
                    className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
                    whileHover={{
                      boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                      transition: { duration: 0.3 },
                    }}>
                    <motion.div
                      className="flex justify-center mb-3"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}>
                      <motion.div className="p-3 bg-primary/10 rounded-full">
                        <Icon className="h-6 w-6 text-primary" />
                      </motion.div>
                    </motion.div>
                    <motion.div
                      className="text-2xl md:text-3xl font-bold text-foreground mb-1"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        duration: 0.5,
                        delay: 1 + index * 0.1,
                        type: "spring",
                      }}>
                      {stat.number}
                    </motion.div>
                    <div className="text-sm text-muted-foreground font-medium">
                      {stat.label}
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-12">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-foreground mb-4"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}>
              Get In Touch
            </motion.h2>
            <motion.p
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}>
              We're here to help you plan your perfect trip. Reach out to us
              through any of these channels.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}>
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <motion.div
                  key={info.title}
                  variants={itemVariants}
                  whileHover="hover"
                  initial="initial"
                  className="group">
                  <motion.div
                    className="text-center p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white rounded-3xl"
                    variants={cardHoverVariants}
                    whileHover={{
                      boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
                      transition: { duration: 0.3 },
                    }}>
                    <motion.div
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${info.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}
                      whileHover={{
                        scale: 1.2,
                        rotate: [0, -10, 10, 0],
                        transition: { duration: 0.5 },
                      }}>
                      <Icon className="h-8 w-8" />
                    </motion.div>
                    <motion.h3
                      className="text-xl font-bold text-foreground mb-3"
                      whileHover={{ color: "#3b82f6" }}
                      transition={{ duration: 0.3 }}>
                      {info.title}
                    </motion.h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {info.description}
                    </p>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
              viewport={{ once: true, margin: "-100px" }}>
              <motion.div
                className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
                whileHover={{
                  boxShadow: "0 30px 60px rgba(0,0,0,0.12)",
                  transition: { duration: 0.3 },
                }}>
                <motion.div
                  className="mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}>
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    Send Us a Message
                  </h3>
                  <p className="text-muted-foreground">
                    Fill out the form below and we'll get back to you as soon as
                    possible.
                  </p>
                </motion.div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                          type="text"
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={(e) =>
                            handleInputChange("name", e.target.value)
                          }
                          className="pl-10 h-12"
                          required
                        />
                      </div>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          className="pl-10 h-12"
                          required
                        />
                      </div>
                    </motion.div>
                  </motion.div>

                  <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    viewport={{ once: true }}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                          type="tel"
                          placeholder="Enter your phone number"
                          value={formData.phone}
                          onChange={(e) =>
                            handleInputChange("phone", e.target.value)
                          }
                          className="pl-10 h-12"
                        />
                      </div>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Subject *
                      </label>
                      <Input
                        type="text"
                        placeholder="What can we help you with?"
                        value={formData.subject}
                        onChange={(e) =>
                          handleInputChange("subject", e.target.value)
                        }
                        className="h-12"
                        required
                      />
                    </motion.div>
                  </motion.div>

                  <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    viewport={{ once: true }}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Tour Type
                      </label>
                      <Select
                        value={formData.tourType}
                        onValueChange={(value) =>
                          handleInputChange("tourType", value)
                        }>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select tour type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beach">Beach Vacation</SelectItem>
                          <SelectItem value="mountain">
                            Mountain Adventure
                          </SelectItem>
                          <SelectItem value="city">City Tour</SelectItem>
                          <SelectItem value="cultural">
                            Cultural Experience
                          </SelectItem>
                          <SelectItem value="wildlife">
                            Wildlife Safari
                          </SelectItem>
                          <SelectItem value="luxury">Luxury Travel</SelectItem>
                          <SelectItem value="budget">Budget Travel</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Budget Range
                      </label>
                      <Select
                        value={formData.budget}
                        onValueChange={(value) =>
                          handleInputChange("budget", value)
                        }>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="under-1000">
                            Under $1,000
                          </SelectItem>
                          <SelectItem value="1000-3000">
                            $1,000 - $3,000
                          </SelectItem>
                          <SelectItem value="3000-5000">
                            $3,000 - $5,000
                          </SelectItem>
                          <SelectItem value="5000-10000">
                            $5,000 - $10,000
                          </SelectItem>
                          <SelectItem value="over-10000">
                            Over $10,000
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </motion.div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.0 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02 }}>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Travel Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        type="date"
                        value={formData.travelDate}
                        onChange={(e) =>
                          handleInputChange("travelDate", e.target.value)
                        }
                        className="pl-10 h-12"
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02 }}>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Message *
                    </label>
                    <Textarea
                      placeholder="Tell us about your travel plans, preferences, and any questions you have..."
                      value={formData.message}
                      onChange={(e) =>
                        handleInputChange("message", e.target.value)
                      }
                      className="min-h-[120px] resize-none"
                      required
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.4 }}
                    viewport={{ once: true }}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.2 }}>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-14 text-lg font-semibold bg-primary hover:bg-primary/90 transition-all duration-300">
                        <AnimatePresence mode="wait">
                          {isSubmitting ? (
                            <motion.div
                              key="loading"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="flex items-center gap-2">
                              <motion.div
                                className="h-5 w-5 border-2 border-white border-t-transparent rounded-full"
                                animate={{ rotate: 360 }}
                                transition={{
                                  duration: 1,
                                  repeat: Infinity,
                                  ease: "linear",
                                }}
                              />
                              Sending Message...
                            </motion.div>
                          ) : (
                            <motion.div
                              key="send"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="flex items-center gap-2">
                              <motion.div
                                animate={{ x: [0, 5, 0] }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  ease: "easeInOut",
                                }}>
                                <Send className="h-5 w-5" />
                              </motion.div>
                              Send Message
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </Button>
                    </motion.div>
                  </motion.div>
                </form>
              </motion.div>
            </motion.div>

            {/* Map & Additional Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-8">
              {/* Map */}
              <motion.div
                className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
                whileHover={{
                  boxShadow: "0 30px 60px rgba(0,0,0,0.12)",
                  transition: { duration: 0.3 },
                }}>
                <motion.h3
                  className="text-2xl font-bold text-foreground mb-6"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}>
                  Visit Our Office
                </motion.h3>
                <motion.div
                  className="bg-gray-200 rounded-2xl h-64 mb-6 flex items-center justify-center overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2995.2050329953568!2d69.2789503875483!3d41.34789699731678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8da27f4aa98d%3A0xb7e32f6b9b2b1c57!2sBigTrip!5e0!3m2!1sen!2s!4v1752419478340!5m2!1sen!2s"
                    width="600"
                    height="256"
                    //@ts-ignore
                    allowfullscreen=""
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"></iframe>
                </motion.div>
                <motion.div
                  className="space-y-3"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}>
                  {[
                    { icon: MapPin, text: "Chilonzor,Sergeli,Yunusobod " },
                    { icon: Phone, text: "+998 78 555 77 88" },
                    { icon: Instagram, text: "bigtrip.uz" },
                    { icon: Clock, text: "Mon - Fri: 9AM - 6PM" },
                  ].map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={index}
                        variants={itemVariants}
                        className="flex items-center gap-3"
                        whileHover={{ x: 10 }}
                        transition={{ duration: 0.3 }}>
                        <motion.div
                          whileHover={{ scale: 1.2, rotate: 360 }}
                          transition={{ duration: 0.5 }}>
                          <Icon className="h-5 w-5 text-primary" />
                        </motion.div>
                        <span className="text-foreground">{item.text}</span>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </motion.div>

              {/* Quick Contact */}
              <motion.div
                className="bg-gradient-to-br from-primary to-primary/80 rounded-3xl p-8 text-white"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.3 },
                }}>
                <motion.h3
                  className="text-2xl font-bold mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}>
                  Need Immediate Assistance?
                </motion.h3>
                <motion.p
                  className="mb-6 text-primary-foreground/90"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  viewport={{ once: true }}>
                  Call us now for instant support and personalized travel
                  advice.
                </motion.p>
                <motion.div
                  className="flex items-center gap-3 mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                  viewport={{ once: true }}>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}>
                    <Phone className="h-6 w-6" />
                  </motion.div>
                  <span className="text-xl font-semibold">
                    +998 78 555 77 88
                  </span>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}>
                  <Button
                    variant="secondary"
                    className="w-full h-12 text-base font-semibold">
                    Call Now
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-12">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-foreground mb-4"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}>
              Frequently Asked Questions
            </motion.h2>
            <motion.p
              className="text-lg text-muted-foreground"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}>
              Find answers to common questions about our services and booking
              process.
            </motion.p>
          </motion.div>

          <motion.div
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}>
            {faqData.map((faq, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  scale: 1.02,
                  y: -5,
                  transition: { duration: 0.3 },
                }}>
                <motion.div
                  className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white rounded-2xl"
                  whileHover={{
                    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                    transition: { duration: 0.3 },
                  }}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <motion.h3
                          className="text-lg font-semibold text-foreground mb-3"
                          whileHover={{ color: "#3b82f6" }}
                          transition={{ duration: 0.3 }}>
                          {faq.question}
                        </motion.h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                      <motion.div
                        className="ml-4"
                        whileHover={{
                          scale: 1.2,
                          rotate: 360,
                          transition: { duration: 0.5 },
                        }}>
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <MessageSquare className="h-4 w-4 text-primary" />
                        </div>
                      </motion.div>
                    </div>
                  </CardContent>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer scrollToSection={scrollToSection} />
    </div>
  );
}
