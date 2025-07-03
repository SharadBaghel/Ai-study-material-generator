"use client";
import React from 'react';
import { BookOpen, Brain, Lightbulb, ArrowRight, GraduationCap, Target, Clock, Trophy } from 'lucide-react';
import { Button } from "@/components/ui/button";  // Assuming this exists
import { UserButton, useClerk } from "@clerk/nextjs"; // Assuming this is the correct import
import { useRouter } from 'next/navigation';  // Import useRouter for navigation

function Home() {
  const { isLoaded, user, openSignIn, openSignUp } = useClerk(); // Use Clerk hooks
  const router = useRouter();

  // Handle button click to navigate to Dashboard
  const handleGetStarted = () => {
    if (!user) {
      openSignIn(); // Opens Sign In modal if user is not signed in
    } else {
      router.push('/dashboard'); // Navigates to Dashboard page if user is signed in
    }
  };

  const handleStartTrial = () => {
    if (!user) {
      openSignUp(); // Opens Sign Up modal if user is not signed up
    } else {
      router.push('/dashboard'); // Navigates to Dashboard page if user is signed in
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-black z-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32 relative z-10">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                Master Your Exams
              </span>
              <br />
              <span className="text-white">With AI-Powered Prep</span>
            </h1>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto lg:mx-0">
              Generate personalized study materials, practice tests, and flashcards tailored to your learning style and exam requirements.
            </p>
            <button 
              onClick={handleGetStarted} 
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2 mx-auto lg:mx-0">
              Get Started Now
              <ArrowRight className="w-5 h-5" />
            </button>
            {/* Sign In / Sign Up Buttons */}
            <div className="mt-6">
              <Button 
                onClick={openSignIn} 
                variant="outline" 
                className="mr-4">
                Sign In
              </Button>
              <Button 
                onClick={openSignUp} 
                className="bg-blue-600 hover:bg-blue-700">
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Banner */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <QuickStat icon={<Target className="w-6 h-6" />} label="Target Score Achievement" value="98%" />
            <QuickStat icon={<Clock className="w-6 h-6" />} label="Study Time Optimization" value="40%" />
            <QuickStat icon={<Trophy className="w-6 h-6" />} label="Student Success Rate" value="95%" />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-zinc-900 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <FeatureCard
              icon={<Brain className="w-8 h-8 text-blue-400" />}
              title="AI-Powered Learning"
              description="Smart algorithms analyze your performance and create personalized study plans."
            />
            <FeatureCard
              icon={<BookOpen className="w-8 h-8 text-blue-400" />}
              title="Custom Materials"
              description="Generate practice questions and study guides tailored to your needs."
            />
            <FeatureCard
              icon={<Lightbulb className="w-8 h-8 text-blue-400" />}
              title="Smart Analytics"
              description="Track your progress and identify areas that need more focus."
            />
          </div>
        </div>
      </div>

      {/* Progress Section */}
      <div className="bg-blue-900/30 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Track Your Progress</h2>
            <p className="text-xl text-gray-300">Watch your scores improve as you study smarter, not harder</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ProgressCard
              title="Practice Tests"
              score="85%"
              improvement="+15%"
              description="Average score improvement after 4 weeks"
            />
            <ProgressCard
              title="Study Efficiency"
              score="92%"
              improvement="+25%"
              description="Increase in study material retention"
            />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-black py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <StatCard number="95%" text="Success Rate" />
            <StatCard number="50K+" text="Students Helped" />
            <StatCard number="100+" text="Exam Types" />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-blue-900 to-black py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <GraduationCap className="w-16 h-16 mx-auto mb-8 text-blue-400" />
          <h2 className="text-4xl font-bold mb-8">Ready to Transform Your Study Experience?</h2>
          <p className="text-xl text-gray-300 mb-10">
            Join thousands of successful students who have already improved their exam scores with our platform.
          </p>
          <button 
            onClick={handleStartTrial} 
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105">
            Start Free Trial
          </button>
        </div>
      </div>

      
    </div>
  );
}

// FeatureCard Component
function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-black p-8 rounded-xl border border-blue-900/50 hover:border-blue-500 transition-all duration-300">
      <div className="mb-5">{icon}</div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}

// StatCard Component
function StatCard({ number, text }) {
  return (
    <div className="p-8">
      <div className="text-4xl font-bold text-blue-400 mb-2">{number}</div>
      <div className="text-gray-400">{text}</div>
    </div>
  );
}

// QuickStat Component (for quick stats banner)
function QuickStat({ icon, label, value }) {
  return (
    <div className="flex items-center space-x-4 text-white">
      <div className="p-3 bg-blue-700 rounded-lg">
        {icon}
      </div>
      <div>
        <div className="text-2xl font-bold">{value}</div>
        <div className="text-sm text-blue-200">{label}</div>
      </div>
    </div>
  );
}

// ProgressCard Component
function ProgressCard({ title, score, improvement, description }) {
  return (
    <div className="bg-blue-800/20 p-8 rounded-xl border border-blue-700/30 hover:border-blue-500 transition-all duration-300">
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <div className="flex items-end gap-4 mb-4">
        <div className="text-4xl font-bold text-blue-400">{score}</div>
        <div className="text-green-400 font-semibold">{improvement}</div>
      </div>
      <p className="text-gray-300">{description}</p>
    </div>
  );
}

export default Home;
