
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/components/ui/use-toast";
import { Upload, FileText, X, Check } from 'lucide-react';

interface ResumeUploadProps {
  onUploadComplete: (fileText: string) => void;
}

const ResumeUpload: React.FC<ResumeUploadProps> = ({ onUploadComplete }) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    
    if (selectedFile) {
      // Check file type (accept PDF, DOC, DOCX, TXT)
      const fileType = selectedFile.type;
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
      
      if (!validTypes.includes(fileType)) {
        toast({
          title: "Invalid File Type",
          description: "Please upload a PDF, DOC, DOCX, or TXT file.",
          variant: "destructive",
        });
        return;
      }
      
      // Check file size (max 5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: "Please upload a file smaller than 5MB.",
          variant: "destructive",
        });
        return;
      }
      
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    
    setUploading(true);
    setProgress(0);
    
    // Simulate file upload with progress
    const intervalId = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) {
          clearInterval(intervalId);
          return prev;
        }
        return prev + 5;
      });
    }, 100);
    
    try {
      // Simulate file processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Read file content (in a real app, this would be handled server-side)
      const fileText = await readFileAsText(file);
      
      // Set progress to 100% when complete
      setProgress(100);
      
      // Wait a moment to show 100% progress
      await new Promise(resolve => setTimeout(resolve, 500));
      
      onUploadComplete(fileText);
      
      toast({
        title: "Resume Uploaded Successfully",
        description: "Your resume is now ready for AI analysis.",
      });
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "There was an error uploading your resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      clearInterval(intervalId);
      setUploading(false);
    }
  };
  
  const readFileAsText = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          resolve(event.target.result as string);
        } else {
          reject(new Error("Failed to read file"));
        }
      };
      reader.onerror = () => reject(new Error("File read error"));
      reader.readAsText(file);
    });
  };
  
  const clearFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileText className="h-5 w-5 mr-2 text-jobportal-purple" />
          Resume Upload
        </CardTitle>
        <CardDescription>
          Upload your resume to get AI-powered job matches and improvement suggestions
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!file ? (
          <div 
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-jobportal-purple transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="h-10 w-10 mx-auto text-gray-400" />
            <h3 className="mt-4 text-lg font-medium">Upload Your Resume</h3>
            <p className="mt-2 text-sm text-gray-500">
              Drag and drop or click to browse
            </p>
            <p className="mt-1 text-xs text-gray-400">
              PDF, DOC, DOCX, TXT (Max 5MB)
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-jobportal-purple bg-opacity-10 rounded">
                  <FileText className="h-5 w-5 text-jobportal-purple" />
                </div>
                <div>
                  <p className="font-medium truncate max-w-[180px] md:max-w-xs">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>
              {!uploading && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={clearFile}
                  className="h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            
            {uploading && (
              <div className="space-y-2">
                <Progress value={progress} className="h-2" />
                <div className="text-xs text-gray-500 text-right">
                  {progress}%
                </div>
              </div>
            )}
            
            {!uploading && (
              <Button 
                className="w-full bg-jobportal-purple hover:bg-jobportal-darkpurple"
                onClick={handleUpload}
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload Resume
              </Button>
            )}
          </div>
        )}
        
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept=".pdf,.doc,.docx,.txt"
        />
      </CardContent>
    </Card>
  );
};

export default ResumeUpload;
