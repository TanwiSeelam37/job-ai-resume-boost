
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import Navbar from '@/components/Navbar';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-jobportal-lightgray">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-28 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="animate-slide-up">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                Find the perfect job match with <span className="text-jobportal-purple">AI</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Upload your resume and let our AI match you with the ideal job opportunities based on your skills and experience. We'll even suggest improvements to help your resume stand out.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/register">
                  <Button className="bg-jobportal-purple hover:bg-jobportal-darkpurple text-white px-8 py-6 text-lg">
                    Get Started
                  </Button>
                </Link>
                <Link to="/jobs">
                  <Button variant="outline" className="border-jobportal-purple text-jobportal-purple hover:bg-jobportal-purple hover:text-white px-8 py-6 text-lg">
                    Browse Jobs
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative h-80 md:h-auto animate-fade-in">
              <div className="absolute top-0 left-0 w-full h-full bg-jobportal-purple rounded-lg opacity-10"></div>
              <div className="absolute top-5 left-5 right-5 bottom-5 bg-white rounded-lg shadow-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="inline-block p-4 rounded-full bg-jobportal-lightgray mb-4">
                    <svg className="w-12 h-12 text-jobportal-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold">Resume-Based Job Matching</h3>
                  <p className="text-gray-600 mt-2">AI-powered job recommendations tailored to your skills</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How JobMatch Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-jobportal-lightgray p-6 rounded-lg shadow-sm">
              <div className="h-14 w-14 bg-jobportal-purple bg-opacity-10 rounded-full flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-jobportal-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Create Your Profile</h3>
              <p className="text-gray-600">Register and upload your resume to start the job matching process.</p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-jobportal-lightgray p-6 rounded-lg shadow-sm">
              <div className="h-14 w-14 bg-jobportal-purple bg-opacity-10 rounded-full flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-jobportal-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Get Matched</h3>
              <p className="text-gray-600">Our AI analyzes your resume and matches you with suitable job opportunities.</p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-jobportal-lightgray p-6 rounded-lg shadow-sm">
              <div className="h-14 w-14 bg-jobportal-purple bg-opacity-10 rounded-full flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-jobportal-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Improve Your Resume</h3>
              <p className="text-gray-600">Get AI-powered suggestions to enhance your resume and increase your chances of landing interviews.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-jobportal-purple to-jobportal-darkpurple">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to find your dream job?</h2>
          <p className="text-white text-opacity-90 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of job seekers who have found their perfect match with our AI-powered platform.
          </p>
          <Link to="/register">
            <Button className="bg-white text-jobportal-purple hover:bg-gray-100 px-8 py-6 text-lg">
              Get Started Today
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">JobMatch</h3>
              <p className="text-gray-300">
                AI-powered job matching platform that connects you with opportunities that match your skills and experience.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
                <li><Link to="/jobs" className="text-gray-300 hover:text-white transition-colors">Jobs</Link></li>
                <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">About</Link></li>
                <li><Link to="/register" className="text-gray-300 hover:text-white transition-colors">Register</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-4">Contact Us</h4>
              <p className="text-gray-300">
                Email: info@jobmatch.com<br />
                Phone: (123) 456-7890
              </p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400">&copy; {new Date().getFullYear()} JobMatch. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
