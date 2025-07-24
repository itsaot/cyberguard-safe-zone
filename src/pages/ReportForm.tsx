
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Shield, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import PageLayout from '@/components/PageLayout';
import { useReports } from '@/contexts/ReportContext';
import { useAuth } from '@/contexts/AuthContext';
import { createReport, type CreateReportData } from '@/services/api';

// Define form schema
const reportFormSchema = z.object({
  title: z.string().min(5, { message: 'Please provide a title (min. 5 characters)' }),
  incidentType: z.string().min(1, { message: 'Please select an incident type' }),
  platform: z.string().min(1, { message: 'Please select where this occurred' }),
  description: z.string().min(10, { message: 'Please provide a brief description (min. 10 characters)' }),
  location: z.string().min(1, { message: 'Please specify the location' }),
  urgency: z.enum(['low', 'medium', 'high'], { required_error: 'Please select urgency level' }),
  yourRole: z.string().min(1, { message: 'Please select your role' }),
  evidence: z.string().optional(),
  anonymous: z.boolean().default(true),
  agreeTerms: z.boolean().refine(val => val === true, { message: 'You must agree to the terms' }),
});

type ReportFormValues = z.infer<typeof reportFormSchema>;

const ReportForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { addReport } = useReports();
  const { isAdmin } = useAuth();

  // Redirect admins away from reporting
  useEffect(() => {
    if (isAdmin) {
      toast({
        title: "Access Restricted",
        description: "Administrators cannot submit incident reports. Please use your admin dashboard to manage reports.",
        duration: 5000,
      });
      navigate('/dashboard');
    }
  }, [isAdmin, navigate, toast]);
  
  const form = useForm<ReportFormValues>({
    resolver: zodResolver(reportFormSchema),
    defaultValues: {
      title: '',
      incidentType: '',
      platform: '',
      description: '',
      location: '',
      urgency: 'medium' as const,
      yourRole: '',
      evidence: '',
      anonymous: true,
      agreeTerms: false,
    }
  });

  const onSubmit = async (data: ReportFormValues) => {
    console.log('Form submitted:', data);
    
    try {
      // Prepare data for backend API
      const reportData: CreateReportData = {
        title: data.title,
        description: data.description,
        type: data.urgency === 'high' ? 'malware' : data.urgency === 'medium' ? 'phishing' : 'scam',
        userId: "anonymous_user" // You can replace this with actual user ID when available
      };

      // Submit to backend
      const createdReport = await createReport(reportData);
      console.log('Report created successfully:', createdReport);
      
      // Also add to local context for immediate UI update
      addReport({
        type: data.incidentType,
        platform: data.platform,
        severity: data.urgency,
        date: new Date().toISOString().split('T')[0],
        description: data.description,
      });
      
      toast({
        title: "Report submitted successfully",
        description: "Thank you for helping to create a safer environment. Your report has been sent to administrators.",
      });
      setSubmitted(true);
      
    } catch (error) {
      console.error('Error submitting report:', error);
      toast({
        title: "Error submitting report",
        description: error instanceof Error ? error.message : "Failed to submit report. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (submitted) {
    return (
      <PageLayout>
        <div className="cg-container py-12">
          <Card className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow">
            <CardContent className="flex flex-col items-center text-center">
              <Shield className="h-16 w-16 text-green-500 mb-6" />
              <h1 className="text-2xl font-semibold mb-2">Thank You For Your Report</h1>
              <p className="text-gray-600 mb-6">
                Your report has been submitted successfully. School administrators will 
                review your report and take appropriate action.
              </p>
              <Button onClick={() => setSubmitted(false)} className="cg-button-primary">
                Submit Another Report
              </Button>
            </CardContent>
          </Card>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="cg-container">
        <div className="max-w-3xl mx-auto py-12">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-3">Report an Incident</h1>
            <p className="text-gray-600">
              Your report will help us address cyberbullying and create a safer environment.
              All reports can be submitted anonymously.
            </p>
          </div>
          
          <Alert className="mb-8 bg-cyberguard-light-blue border-cyberguard-blue">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Your privacy is important</AlertTitle>
            <AlertDescription>
              All reports are confidential. If this is an emergency or someone is in immediate danger, 
              please contact the appropriate authorities right away.
            </AlertDescription>
          </Alert>

          <Card className="bg-white shadow-md rounded-xl p-6">
            <CardContent className="pt-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Report Title *</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Brief summary of the incident" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="incidentType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Type of Incident</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select incident type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="harassment">Harassment</SelectItem>
                              <SelectItem value="threats">Threats</SelectItem>
                              <SelectItem value="hate_speech">Hate Speech</SelectItem>
                              <SelectItem value="exclusion">Social Exclusion</SelectItem>
                              <SelectItem value="impersonation">Impersonation</SelectItem>
                              <SelectItem value="image_sharing">Unwanted Image Sharing</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="platform"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Where did this occur?</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select platform" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="social_media">Social Media</SelectItem>
                              <SelectItem value="text_message">Text Messages</SelectItem>
                              <SelectItem value="email">Email</SelectItem>
                              <SelectItem value="gaming">Online Gaming</SelectItem>
                              <SelectItem value="website">Website/Forum</SelectItem>
                              <SelectItem value="school_platform">School Platform</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description of Incident</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Please describe what happened..." 
                            className="min-h-32"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location *</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Where did this occur? (e.g., Main Office, School Name)" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="yourRole"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Role</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select your role" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="target">I am the target</SelectItem>
                              <SelectItem value="witness">I witnessed this</SelectItem>
                              <SelectItem value="friend">Friend of the target</SelectItem>
                              <SelectItem value="parent">Parent/Guardian</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="urgency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Urgency Level *</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex space-x-4"
                          >
                            <FormItem className="flex items-center space-x-2">
                              <FormControl>
                                <RadioGroupItem value="low" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Low
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2">
                              <FormControl>
                                <RadioGroupItem value="medium" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Medium
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2">
                              <FormControl>
                                <RadioGroupItem value="high" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                High
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="evidence"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Evidence Link (Optional)</FormLabel>
                        <FormControl>
                          <Input 
                            type="url" 
                            placeholder="URL to screenshot, video, or other evidence" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="anonymous"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox 
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>I want to report anonymously</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="agreeTerms"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox 
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              I confirm this report is truthful and accurate to the best of my knowledge
                            </FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <Button type="submit" className="w-full cg-button-primary">
                    Submit Report
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default ReportForm;
