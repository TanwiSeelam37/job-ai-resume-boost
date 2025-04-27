import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { FilePlus, Upload } from 'lucide-react';

interface JobPostFormProps {
  onSubmit: (jobData: any) => void;
}

const JobPostForm: React.FC<JobPostFormProps> = ({ onSubmit }) => {
  const [jobData, setJobData] = useState({
    title: '',
    company: '',
    location: '',
    salary: '',
    employmentType: 'full-time',
    description: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setJobData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setJobData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate a random ID for the job
      const newJob = {
        ...jobData,
        id: `job_${Date.now()}`,
        postedDate: new Date().toLocaleDateString(),
      };
      
      onSubmit(newJob);
      
      // Reset form
      setJobData({
        title: '',
        company: '',
        location: '',
        salary: '',
        employmentType: 'full-time',
        description: '',
      });
      
      toast({
        title: "Job Posted Successfully",
        description: "Your job has been posted and is now visible to job seekers.",
      });
    } catch (error) {
      toast({
        title: "Failed to Post Job",
        description: "There was an error posting your job. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <FilePlus className="h-5 w-5 mr-2 text-jobportal-purple" />
          Post a New Job
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Job Title</Label>
            <Input 
              id="title" 
              name="title" 
              value={jobData.title} 
              onChange={handleChange} 
              placeholder="e.g. Frontend Developer"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="company">Company</Label>
            <Input 
              id="company" 
              name="company" 
              value={jobData.company} 
              onChange={handleChange} 
              placeholder="e.g. Acme Inc."
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input 
                id="location" 
                name="location" 
                value={jobData.location} 
                onChange={handleChange} 
                placeholder="e.g. New York, NY"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="salary">Salary Range</Label>
              <Input 
                id="salary" 
                name="salary" 
                value={jobData.salary} 
                onChange={handleChange} 
                placeholder="e.g. $80,000 - $100,000"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="employmentType">Employment Type</Label>
            <Select 
              value={jobData.employmentType} 
              onValueChange={(value) => handleSelectChange('employmentType', value)}
              name="employmentType"
            >
              <SelectTrigger>
                <SelectValue placeholder="Select employment type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full-time">Full-time</SelectItem>
                <SelectItem value="part-time">Part-time</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
                <SelectItem value="freelance">Freelance</SelectItem>
                <SelectItem value="internship">Internship</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Job Description</Label>
            <Textarea 
              id="description" 
              name="description" 
              value={jobData.description} 
              onChange={handleChange} 
              placeholder="Enter job description, requirements, and responsibilities..."
              rows={6}
              required
            />
          </div>

          <CardFooter className="px-0 pt-4">
            <Button 
              type="submit" 
              className="w-full bg-jobportal-purple hover:bg-jobportal-darkpurple"
              disabled={loading}
            >
              {loading ? "Posting Job..." : "Post Job"}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

export default JobPostForm;
