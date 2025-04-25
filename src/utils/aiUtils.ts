
import { JobProps } from '@/components/JobCard';

// Mock AI analysis function for resume job matching
export const analyzeResume = async (resumeText: string, availableJobs: JobProps[]): Promise<JobProps[]> => {
  // In a real app, this would make an API call to an AI service
  // For demo purposes, we'll simulate AI analysis with random match percentages
  await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API delay
  
  const getSkillMatchPercentage = (resumeText: string, jobDescription: string) => {
    // In a real app, this would use NLP to analyze skill matching
    // For demo, we'll use a simple random percentage
    const base = Math.floor(Math.random() * 30) + 60; // Random between 60-90
    return base;
  };
  
  // Calculate match percentages and sort jobs by match percentage
  const jobsWithMatches = availableJobs.map(job => ({
    ...job,
    matchPercentage: getSkillMatchPercentage(resumeText, job.description)
  })).sort((a, b) => (b.matchPercentage || 0) - (a.matchPercentage || 0));
  
  return jobsWithMatches;
};

// Mock AI analysis function for resume improvement suggestions
export const generateImprovementSuggestions = async (resumeText: string) => {
  // In a real app, this would make an API call to an AI service
  // For demo purposes, we'll return some predefined suggestions
  await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API delay
  
  return [
    {
      section: "Professional Summary",
      current: "Experienced software developer with programming skills.",
      suggestion: "Results-driven software developer with 5+ years of experience delivering robust applications that enhance user experience and drive business growth.",
      reasoning: "Adds specificity, quantifiable experience, and focuses on business impact rather than just listing generic skills."
    },
    {
      section: "Skills Section",
      current: "React, JavaScript, CSS",
      suggestion: "React.js, JavaScript (ES6+), CSS3, Redux, TypeScript, Jest, RESTful APIs, Agile methodologies",
      reasoning: "Expands on technical skills with specific versions and methodologies, showing deeper expertise and familiarity with industry standards."
    },
    {
      section: "Work Experience",
      current: "Responsible for developing websites and applications.",
      suggestion: "Led the development of a customer-facing web application that increased user engagement by 35% through implementing responsive design and optimizing load times from 5s to 1.2s.",
      reasoning: "Transforms generic responsibilities into specific achievements with measurable results and technical details that demonstrate impact."
    },
    {
      section: "Action Verbs",
      current: "Worked on, Helped with, Was responsible for",
      suggestion: "Engineered, Spearheaded, Implemented, Streamlined, Orchestrated",
      reasoning: "Stronger action verbs convey leadership, initiative and specific contributions rather than passive involvement."
    }
  ];
};
