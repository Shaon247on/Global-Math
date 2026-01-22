"use client";

import { useState } from "react";
import {
  ChevronRight,
  Globe,
  Shield,
  Lock,
  Eye,
  Cookie,
  Mail,
  Clock,
  Users,
  X,
  Menu,
} from "lucide-react";
import Logo from "@/components/elements/Logo";

const PrivacyPolicyPage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const sections = [
    { id: "introduction", title: "Introduction", icon: Globe },
    {
      id: "information-we-collect",
      title: "Information We Collect",
      icon: Eye,
    },
    { id: "how-we-use", title: "How We Use Your Information", icon: Users },
    { id: "data-storage", title: "Data Storage & Security", icon: Lock },
    { id: "cookies", title: "Cookies & Tracking", icon: Cookie },
    { id: "quiz-data", title: "Quiz & Performance Data", icon: Clock },
    { id: "data-sharing", title: "Data Sharing", icon: Shield },
    { id: "your-rights", title: "Your Rights", icon: ChevronRight },
    { id: "children-privacy", title: "Children's Privacy", icon: Users },
    { id: "updates", title: "Policy Updates", icon: Clock },
    { id: "contact", title: "Contact Us", icon: Mail },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900">Privacy Policy</h1>
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-60"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <aside className="lg:hidden fixed right-0 top-0 bottom-0 w-[85%] max-w-sm bg-white z-70 shadow-2xl overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Globe className="w-6 h-6 text-[#A8D8FF]" />
                  <h2 className="font-bold text-gray-900">Contents</h2>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5 text-gray-700" />
                </button>
              </div>

              <nav>
                <ul className="space-y-1">
                  {sections.map((section) => {
                    const Icon = section.icon;
                    return (
                      <li key={section.id}>
                        <button
                          onClick={() => scrollToSection(section.id)}
                          className="w-full flex items-center gap-3 px-3 py-3 text-sm text-gray-700 hover:bg-[#A8D8FF]/10 hover:text-[#A8D8FF] rounded-lg transition-colors text-left group"
                        >
                          <Icon className="w-4 h-4 shrink-0 text-gray-400 group-hover:text-[#A8D8FF]" />
                          <span>{section.title}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <div className="mt-8 p-4 bg-[#A8D8FF]/10 rounded-lg border border-[#A8D8FF]/20">
                <p className="text-xs text-gray-600">
                  <strong>Last Updated:</strong> January 23, 2026
                </p>
              </div>
            </div>
          </aside>
        </>
      )}

      <div className="max-w-7xl mx-auto flex justify-center px-4 lg:px-8">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-80 bg-white border border-gray-200 rounded-2xl sticky top-[5.2vh] h-[85vh] overflow-y-auto shadow-sm shrink-0">
          <div className="p-6">
            <div className="flex items-center justify-center gap-2 mb-8">
              <Logo size="max-w-28"/>
            </div>

            <nav>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Contents
              </p>
              <ul className="space-y-1">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <li key={section.id}>
                      <button
                        onClick={() => scrollToSection(section.id)}
                        className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-[#A8D8FF]/10 hover:text-[#A8D8FF] rounded-lg transition-colors text-left group"
                      >
                        <Icon className="w-4 h-4 shrink-0 text-gray-400 group-hover:text-[#A8D8FF]" />
                        <span>{section.title}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:pl-8 py-8 lg:py-12 max-w-4xl">
          {/* Introduction */}
          <section id="introduction" className="mb-12 scroll-mt-20">
            <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#A8D8FF]/20 rounded-lg flex items-center justify-center">
                  <Globe className="w-5 h-5 text-[#A8D8FF]" />
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
                  Introduction
                </h2>
              </div>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-600 mb-4">
                  Welcome to Geography Quiz. We are committed to protecting your
                  privacy and ensuring you have a safe learning experience. This
                  Privacy Policy explains how we collect, use, and safeguard
                  your information when you use our geography quiz platform.
                </p>
                <p className="text-gray-600">
                  Our platform helps students enhance their geography knowledge
                  through timed quizzes. By using our service, you agree to the
                  collection and use of information in accordance with this
                  policy.
                </p>
              </div>
            </div>
          </section>

          {/* Information We Collect */}
          <section id="information-we-collect" className="mb-12 scroll-mt-20">
            <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#A8D8FF]/20 rounded-lg flex items-center justify-center">
                  <Eye className="w-5 h-5 text-[#A8D8FF]" />
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
                  Information We Collect
                </h2>
              </div>
              <div className="space-y-4">
                <div className="border-l-4 border-[#A8D8FF] pl-4">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Personal Information
                  </h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>Name and email address (if you create an account)</li>
                    <li>Username and profile information</li>
                    <li>School or educational institution (optional)</li>
                  </ul>
                </div>
                <div className="border-l-4 border-[#A8D8FF] pl-4">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Usage Data
                  </h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>Quiz selections and subject preferences</li>
                    <li>Time duration selected for quizzes</li>
                    <li>Quiz results and performance metrics</li>
                    <li>Questions answered and accuracy rates</li>
                    <li>Login times and session duration</li>
                  </ul>
                </div>
                <div className="border-l-4 border-[#A8D8FF] pl-4">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Technical Information
                  </h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>IP address and device information</li>
                    <li>Browser type and version</li>
                    <li>Operating system</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* How We Use Your Information */}
          <section id="how-we-use" className="mb-12 scroll-mt-20">
            <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#A8D8FF]/20 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-[#A8D8FF]" />
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
                  How We Use Your Information
                </h2>
              </div>
              <div className="space-y-3 text-gray-600">
                <p>
                  We use the collected information for the following purposes:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>To provide and maintain our quiz platform</li>
                  <li>To track your progress and display your quiz results</li>
                  <li>To personalize your learning experience</li>
                  <li>
                    To improve our question database and quiz functionality
                  </li>
                  <li>To send you updates about new quiz topics or features</li>
                  <li>To analyze usage patterns and improve our service</li>
                  <li>To ensure platform security and prevent fraud</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Data Storage & Security */}
          <section id="data-storage" className="mb-12 scroll-mt-20">
            <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#A8D8FF]/20 rounded-lg flex items-center justify-center">
                  <Lock className="w-5 h-5 text-[#A8D8FF]" />
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
                  Data Storage & Security
                </h2>
              </div>
              <div className="space-y-4 text-gray-600">
                <p>
                  We implement industry-standard security measures to protect
                  your personal information. Your data is stored on secure
                  servers with encryption and regular security audits.
                </p>
                <div className="bg-[#A8D8FF]/10 p-4 rounded-lg border border-[#A8D8FF]/20">
                  <p className="font-semibold text-gray-900 mb-2">
                    Security Measures:
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>SSL/TLS encryption for data transmission</li>
                    <li>Encrypted password storage</li>
                    <li>Regular security updates and patches</li>
                    <li>Access controls and authentication</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Cookies */}
          <section id="cookies" className="mb-12 scroll-mt-20">
            <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#A8D8FF]/20 rounded-lg flex items-center justify-center">
                  <Cookie className="w-5 h-5 text-[#A8D8FF]" />
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
                  Cookies & Tracking
                </h2>
              </div>
              <div className="space-y-3 text-gray-600">
                <p>
                  We use cookies and similar tracking technologies to enhance
                  your experience on our platform.
                </p>
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold text-gray-900">
                      Essential Cookies
                    </p>
                    <p className="text-sm">
                      Required for login and basic platform functionality
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      Performance Cookies
                    </p>
                    <p className="text-sm">
                      Help us understand how you use the platform
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      Preference Cookies
                    </p>
                    <p className="text-sm">
                      Remember your settings and quiz preferences
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Quiz Data */}
          <section id="quiz-data" className="mb-12 scroll-mt-20">
            <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#A8D8FF]/20 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-[#A8D8FF]" />
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
                  Quiz & Performance Data
                </h2>
              </div>
              <div className="space-y-4 text-gray-600">
                <p>
                  When you take quizzes on our platform, we collect and store:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>The subject topics you select</li>
                  <li>Time duration you choose for each quiz</li>
                  <li>Number of questions answered within the time limit</li>
                  <li>Your answers and their correctness</li>
                  <li>Final quiz scores and results</li>
                  <li>Performance trends over time</li>
                </ul>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mt-4">
                  <p className="text-sm text-blue-900">
                    <strong>Note:</strong> This data helps us provide you with
                    personalized feedback and track your learning progress. You
                    can request deletion of your quiz history at any time.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Data Sharing */}
          <section id="data-sharing" className="mb-12 scroll-mt-20">
            <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#A8D8FF]/20 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-[#A8D8FF]" />
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
                  Data Sharing
                </h2>
              </div>
              <div className="space-y-3 text-gray-600">
                <p className="font-semibold text-gray-900">
                  We do NOT sell your personal information.
                </p>
                <p>
                  We may share your information only in the following
                  circumstances:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>With your explicit consent</li>
                  <li>
                    With service providers who help us operate the platform
                  </li>
                  <li>When required by law or legal process</li>
                  <li>To protect our rights and prevent fraud</li>
                  <li>In connection with a business transfer or merger</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Your Rights */}
          <section id="your-rights" className="mb-12 scroll-mt-20">
            <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#A8D8FF]/20 rounded-lg flex items-center justify-center">
                  <ChevronRight className="w-5 h-5 text-[#A8D8FF]" />
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
                  Your Rights
                </h2>
              </div>
              <div className="space-y-3 text-gray-600">
                <p>You have the right to:</p>
                <div className="grid gap-3">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="font-semibold text-gray-900">Access</p>
                    <p className="text-sm">
                      Request a copy of your personal data
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="font-semibold text-gray-900">Correction</p>
                    <p className="text-sm">
                      Update or correct your information
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="font-semibold text-gray-900">Deletion</p>
                    <p className="text-sm">
                      Request deletion of your account and data
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="font-semibold text-gray-900">Portability</p>
                    <p className="text-sm">
                      Export your quiz data in a readable format
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="font-semibold text-gray-900">Opt-out</p>
                    <p className="text-sm">
                      Unsubscribe from marketing communications
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Children's Privacy */}
          <section id="children-privacy" className="mb-12 scroll-mt-20">
            <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#A8D8FF]/20 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-[#A8D8FF]" />
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
                  Children&apos;s Privacy
                </h2>
              </div>
              <div className="space-y-3 text-gray-600">
                <p>
                  Our service is designed for students of all ages. For users
                  under 13 years old, we require parental consent before
                  collecting any personal information.
                </p>
                <p>
                  Parents or guardians can review, modify, or delete their
                  child&apos;s information by contacting us. We are committed to
                  complying with COPPA (Children&apos;s Online Privacy
                  Protection Act) regulations.
                </p>
              </div>
            </div>
          </section>

          {/* Updates */}
          <section id="updates" className="mb-12 scroll-mt-20">
            <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#A8D8FF]/20 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-[#A8D8FF]" />
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
                  Policy Updates
                </h2>
              </div>
              <div className="space-y-3 text-gray-600">
                <p>
                  We may update this Privacy Policy from time to time. We will
                  notify you of any changes by posting the new Privacy Policy on
                  this page and updating the &ldquo;Last Updated&ldquo; date.
                </p>
                <p>
                  Significant changes will be communicated via email or a
                  prominent notice on our platform. We encourage you to review
                  this Privacy Policy periodically.
                </p>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section id="contact" className="mb-12 scroll-mt-20">
            <div className="bg-linear-to-br from-[#A8D8FF]/20 to-white rounded-2xl p-6 lg:p-8 shadow-sm border border-[#A8D8FF]/30">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#A8D8FF] rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
                  Contact Us
                </h2>
              </div>
              <div className="space-y-4 text-gray-600">
                <p>
                  If you have any questions about this Privacy Policy or our
                  data practices, please contact us:
                </p>
                <div className="space-y-2">
                  <p>
                    <strong>Email:</strong> privacy@geographyquiz.com
                  </p>
                  <p>
                    <strong>Address:</strong> 123 Education Street, Learning
                    City, ED 12345
                  </p>
                  <p>
                    <strong>Response Time:</strong> We aim to respond within 48
                    hours
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
