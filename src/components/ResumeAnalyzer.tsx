
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileSearch, PenLine, ArrowRight } from 'lucide-react';
import { analyzeResume, generateImprovementSuggestions } from '@/utils/aiUtils';
import { JobProps } from './JobCard';

interface ResumeAnalyzerProps {
  resumeText: string;
  jobs: JobProps[];
}

interface SuggestionItem {
  section: string;
  current: string;
  suggestion: string;
  reasoning: string;
}

const ResumeAnalyzer: React.FC<ResumeAnalyzerProps> = ({ resumeText, jobs }) => {
  const [analyzing, setAnalyzing] = useState(false);
  const [matchedJobs, setMatchedJobs] = useState<JobProps[]>([]);
  const [suggestions, setSuggestions] = useState<SuggestionItem[]>([]);
  const [activeTab, setActiveTab] = useState('match');
  
  const handleAnalyze = async () => {
    setAnalyzing(true);
    
    try {
      // AI job matching analysis
      const jobMatches = await analyzeResume(resumeText, jobs);
      setMatchedJobs(jobMatches);
      
      // AI resume improvement suggestions
      const improvementSuggestions = await generateImprovementSuggestions(resumeText);
      setSuggestions(improvementSuggestions);
      
      // Switch to the job matches tab by default
      setActiveTab('match');
    } catch (error) {
      console.error('Error analyzing resume:', error);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileSearch className="h-5 w-5 mr-2 text-jobportal-purple" />
          Resume Analysis
        </CardTitle>
        <CardDescription>
          Get AI-powered job matches and resume improvement suggestions
        </CardDescription>
      </CardHeader>
      <CardContent>
        {matchedJobs.length === 0 && suggestions.length === 0 ? (
          <div className="text-center py-6">
            <FileSearch className="h-12 w-12 mx-auto text-jobportal-purple opacity-50 mb-4" />
            <h3 className="text-lg font-medium mb-2">Ready to Analyze Your Resume</h3>
            <p className="text-gray-500 mb-6">
              Our AI will match your skills with the perfect job opportunities and provide personalized suggestions to improve your resume.
            </p>
            <Button 
              className="bg-jobportal-purple hover:bg-jobportal-darkpurple"
              onClick={handleAnalyze}
              disabled={analyzing}
            >
              {analyzing ? "Analyzing..." : "Analyze Resume"}
            </Button>
          </div>
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="match">Job Matches</TabsTrigger>
              <TabsTrigger value="improve">Improve Resume</TabsTrigger>
            </TabsList>
            
            <TabsContent value="match" className="mt-4">
              <div className="space-y-6">
                <p className="text-sm text-gray-600">
                  Based on your resume, we've identified these job matches ranked by compatibility:
                </p>
                
                <div className="space-y-4">
                  {matchedJobs.map((job, index) => (
                    <div key={job.id} className="p-4 border rounded-md bg-white shadow-sm">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{job.title}</h3>
                          <p className="text-sm text-gray-600">{job.company}</p>
                        </div>
                        <div className="flex items-center">
                          <div className={`text-sm font-medium px-2 py-1 rounded-full ${
                            job.matchPercentage && job.matchPercentage > 85 
                              ? 'bg-green-100 text-green-800' 
                              : job.matchPercentage && job.matchPercentage > 70
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-gray-100 text-gray-800'
                          }`}>
                            {job.matchPercentage}% Match
                          </div>
                          <Button variant="ghost" size="sm" className="ml-2">
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="mt-2">
                        <p className="text-sm line-clamp-2">{job.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="improve" className="mt-4">
              <div className="space-y-6">
                <p className="text-sm text-gray-600">
                  Here are personalized suggestions to improve your resume and increase your chances of getting hired:
                </p>
                
                <div className="space-y-6">
                  {suggestions.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <h3 className="text-md font-medium flex items-center">
                        <PenLine className="h-4 w-4 mr-2 text-jobportal-purple" />
                        {item.section}
                      </h3>
                      
                      <div className="grid grid-cols-1 gap-4">
                        <div className="p-3 bg-gray-50 rounded-md">
                          <p className="text-sm text-gray-600 font-medium mb-1">Current</p>
                          <p className="text-sm">{item.current}</p>
                        </div>
                        
                        <div className="p-3 bg-jobportal-purple bg-opacity-5 rounded-md border border-jobportal-purple border-opacity-20">
                          <p className="text-sm text-jobportal-purple font-medium mb-1">Suggested Improvement</p>
                          <p className="text-sm">{item.suggestion}</p>
                        </div>
                        
                        <div className="p-3 bg-white rounded-md border">
                          <p className="text-sm text-gray-500 font-medium mb-1">Why This Works Better</p>
                          <p className="text-sm text-gray-600">{item.reasoning}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
};

export default ResumeAnalyzer;
