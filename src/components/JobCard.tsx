
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bookmark, MapPin, Building, Calendar, Briefcase, Trash2 } from 'lucide-react';

export interface JobProps {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  employmentType: string;
  description: string;
  postedDate: string;
  isOwner?: boolean;
  onDelete?: (id: string) => void;
  matchPercentage?: number;
}

const JobCard: React.FC<JobProps> = ({ 
  id, 
  title, 
  company, 
  location, 
  salary, 
  employmentType, 
  description, 
  postedDate,
  isOwner = false,
  onDelete,
  matchPercentage
}) => {
  const handleDelete = () => {
    if (onDelete) {
      onDelete(id);
    }
  };

  return (
    <Card className="w-full hover:shadow-md transition-shadow duration-300">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{title}</CardTitle>
            <CardDescription className="flex items-center mt-1">
              <Building className="h-4 w-4 mr-1" /> {company}
            </CardDescription>
          </div>
          {matchPercentage !== undefined && (
            <Badge className={`text-white ${matchPercentage > 85 ? 'bg-green-500' : matchPercentage > 70 ? 'bg-yellow-500' : 'bg-gray-400'}`}>
              {matchPercentage}% Match
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4 pb-3">
        <div className="flex flex-wrap gap-y-2">
          <div className="flex items-center mr-6">
            <MapPin className="h-4 w-4 text-gray-500 mr-1" />
            <span className="text-sm text-gray-600">{location}</span>
          </div>
          <div className="flex items-center mr-6">
            <Briefcase className="h-4 w-4 text-gray-500 mr-1" />
            <span className="text-sm text-gray-600">{employmentType}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 text-gray-500 mr-1" />
            <span className="text-sm text-gray-600">Posted {postedDate}</span>
          </div>
        </div>
        
        <div>
          <p className="font-medium text-jobportal-purple">{salary}</p>
          <p className="text-gray-600 line-clamp-2 mt-2">{description}</p>
        </div>
      </CardContent>
      <CardFooter>
        <div className="w-full flex justify-between items-center">
          {isOwner ? (
            <Button 
              variant="destructive"
              size="sm"
              className="flex items-center"
              onClick={handleDelete}
            >
              <Trash2 className="h-4 w-4 mr-1" />
              <span>Delete Job</span>
            </Button>
          ) : (
            <>
              <Button 
                variant="default" 
                size="sm"
                className="bg-jobportal-purple hover:bg-jobportal-darkpurple"
              >
                Apply Now
              </Button>
              <Button variant="outline" size="icon">
                <Bookmark className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default JobCard;
