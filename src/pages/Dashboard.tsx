
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import JobCard, { JobProps } from '@/components/JobCard';
import JobPostForm from '@/components/JobPostForm';
import ResumeUpload from '@/components/ResumeUpload';
import ResumeAnalyzer from '@/components/ResumeAnalyzer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";

const Dashboard: React.FC = () => {
  const [userType, setUserType] = useState<'employer' | 'job-seeker'>('job-seeker');
  const [resumeText, setResumeText] = useState('');
  const [jobs, setJobs] = useState<JobProps[]>([
    {
      id: 'job1',
      title: 'Senior Frontend Developer',
      company: 'Tech Innovations Inc.',
      location: 'San Francisco, CA',
      salary: '$120,000 - $150,000',
      employmentType: 'Full-time',
      description: 'We are looking for a Senior Frontend Developer who is proficient with React.js. The ideal candidate should have a strong understanding of modern JavaScript frameworks and be able to implement responsive designs.',
      postedDate: '2 days ago'
    },
    {
      id: 'job2',
      title: 'Backend Engineer',
      company: 'DataFlow Systems',
      location: 'Remote',
      salary: '$110,000 - $140,000',
      employmentType: 'Full-time',
      description: 'Backend Engineer with experience in Node.js, Express, and MongoDB. You will be responsible for developing and maintaining our server-side applications and databases.',
      postedDate: '1 week ago'
    },
    {
      id: 'job3',
      title: 'UX/UI Designer',
      company: 'Creative Solutions',
      location: 'New York, NY',
      salary: '$90,000 - $120,000',
      employmentType: 'Full-time',
      description: 'Creative UX/UI Designer with a portfolio showcasing user-centered design approach. You should be proficient with design tools like Figma and have experience with design systems.',
      postedDate: '3 days ago'
    },
    {
      id: 'job4',
      title: 'DevOps Engineer',
      company: 'Cloud Technologies',
      location: 'Chicago, IL',
      salary: '$125,000 - $160,000',
      employmentType: 'Full-time',
      description: 'DevOps Engineer with experience in AWS, Docker, and CI/CD pipelines. You will be responsible for managing our cloud infrastructure and automating deployment processes.',
      postedDate: '5 days ago'
    }
  ]);
  const [userJobs, setUserJobs] = useState<JobProps[]>([]);

  useEffect(() => {
    // Get user type from local storage (in a real app, this would come from auth context)
    const storedUserType = localStorage.getItem('userType');
    if (storedUserType === 'employer') {
      setUserType('employer');
    } else {
      setUserType('job-seeker');
    }
  }, []);

  const handleJobPost = (jobData: JobProps) => {
    setUserJobs(prev => [jobData, ...prev]);
  };

  const handleDeleteJob = (jobId: string) => {
    setUserJobs(prev => prev.filter(job => job.id !== jobId));
    toast({
      title: "Job Deleted",
      description: "The job posting has been removed successfully.",
    });
  };

  const handleResumeUpload = (fileText: string) => {
    setResumeText(fileText);
  };

  return (
    <div className="min-h-screen bg-jobportal-lightgray">
      <Navbar />
      
      <div className="pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold mb-8">
            {userType === 'employer' ? 'Employer Dashboard' : 'Job Seeker Dashboard'}
          </h1>
          
          {userType === 'employer' ? (
            <div className="grid gap-8 md:grid-cols-3">
              <div className="md:col-span-1">
                <JobPostForm onSubmit={handleJobPost} />
              </div>
              
              <div className="md:col-span-2">
                <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                  <h2 className="text-xl font-semibold mb-4">Your Job Postings</h2>
                  
                  {userJobs.length > 0 ? (
                    <div className="space-y-4">
                      {userJobs.map(job => (
                        <JobCard 
                          key={job.id} 
                          {...job} 
                          isOwner={true} 
                          onDelete={handleDeleteJob}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 border border-dashed rounded-md">
                      <p className="text-gray-500">You haven't posted any jobs yet.</p>
                      <p className="text-gray-500">Use the form to create your first job posting.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                {!resumeText ? (
                  <ResumeUpload onUploadComplete={handleResumeUpload} />
                ) : (
                  <ResumeAnalyzer resumeText={resumeText} jobs={jobs} />
                )}
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Available Jobs</h2>
                <Tabs defaultValue="all">
                  <TabsList className="mb-4">
                    <TabsTrigger value="all">All Jobs</TabsTrigger>
                    <TabsTrigger value="matches" disabled={!resumeText}>
                      Matched Jobs
                    </TabsTrigger>
                    <TabsTrigger value="saved">Saved Jobs</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="all" className="space-y-4">
                    {jobs.map(job => (
                      <JobCard key={job.id} {...job} />
                    ))}
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
