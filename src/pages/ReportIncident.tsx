import { useState } from 'react';
import { AlertTriangle, Shield, Clock, MapPin, Calendar, User, Camera, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import PageLayout from '@/components/PageLayout';
import { useToast } from '@/hooks/use-toast';

const ReportIncident = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    incidentType: '',
    severity: '',
    description: '',
    location: '',
    date: '',
    time: '',
    witnesses: '',
    evidence: '',
    reporterType: 'victim',
    anonymous: true,
    contactInfo: '',
    schoolNotification: false,
    parentNotification: false
  });
  const { toast } = useToast();

  const updateFormData = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    toast({
      title: "Report Submitted Successfully",
      description: "Your incident report has been received. Reference ID: #RPT-2024-001",
      duration: 5000,
    });
    
    // Reset form
    setFormData({
      incidentType: '',
      severity: '',
      description: '',
      location: '',
      date: '',
      time: '',
      witnesses: '',
      evidence: '',
      reporterType: 'victim',
      anonymous: true,
      contactInfo: '',
      schoolNotification: false,
      parentNotification: false
    });
    setStep(1);
  };

  const getProgressPercentage = () => (step / 4) * 100;

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <PageLayout>
      <div className="container mx-auto py-8 px-4 max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Report an Incident</h1>
          <p className="text-gray-600">Your safety matters. Report bullying incidents safely and anonymously.</p>
        </div>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm text-gray-500">Step {step} of 4</span>
            </div>
            <Progress value={getProgressPercentage()} className="h-2" />
          </CardContent>
        </Card>

        <Alert className="mb-6 border-blue-200 bg-blue-50">
          <Shield className="h-4 w-4" />
          <AlertDescription>
            <strong>Your privacy is protected.</strong> All reports are handled confidentially. 
            You can choose to remain completely anonymous.
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              {step === 1 && "Incident Details"}
              {step === 2 && "Description & Evidence"}
              {step === 3 && "Location & Timing"}
              {step === 4 && "Review & Submit"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {step === 1 && (
              <>
                <div>
                  <Label htmlFor="incidentType">Type of Incident</Label>
                  <Select value={formData.incidentType} onValueChange={(value) => updateFormData('incidentType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select incident type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="physical">Physical Bullying</SelectItem>
                      <SelectItem value="verbal">Verbal Bullying/Harassment</SelectItem>
                      <SelectItem value="cyber">Cyberbullying</SelectItem>
                      <SelectItem value="social">Social Exclusion</SelectItem>
                      <SelectItem value="discrimination">Discrimination</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="severity">Severity Level</Label>
                  <Select value={formData.severity} onValueChange={(value) => updateFormData('severity', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select severity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low - Mild teasing or occasional comments</SelectItem>
                      <SelectItem value="medium">Medium - Regular harassment affecting daily activities</SelectItem>
                      <SelectItem value="high">High - Severe or persistent bullying, safety concerns</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="reporterType">I am reporting as a:</Label>
                  <Select value={formData.reporterType} onValueChange={(value) => updateFormData('reporterType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="victim">The person being bullied</SelectItem>
                      <SelectItem value="witness">A witness to bullying</SelectItem>
                      <SelectItem value="friend">A friend of someone being bullied</SelectItem>
                      <SelectItem value="parent">A parent/guardian</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div>
                  <Label htmlFor="description">Describe what happened</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => updateFormData('description', e.target.value)}
                    placeholder="Please describe the incident in detail. Include what was said or done, who was involved, and how it made you or others feel."
                    rows={6}
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Take your time. The more details you provide, the better we can help.
                  </p>
                </div>

                <div>
                  <Label htmlFor="witnesses">Witnesses (if any)</Label>
                  <Input
                    id="witnesses"
                    value={formData.witnesses}
                    onChange={(e) => updateFormData('witnesses', e.target.value)}
                    placeholder="Names or descriptions of people who saw what happened"
                  />
                </div>

                <div>
                  <Label htmlFor="evidence">Evidence Description</Label>
                  <Textarea
                    id="evidence"
                    value={formData.evidence}
                    onChange={(e) => updateFormData('evidence', e.target.value)}
                    placeholder="Describe any photos, screenshots, messages, or other evidence you have"
                    rows={3}
                  />
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Camera className="h-4 w-4 text-blue-600" />
                    <span className="font-medium text-blue-800">Evidence Upload</span>
                  </div>
                  <p className="text-sm text-blue-700">
                    If you have screenshots, photos, or documents, you can upload them after submitting this report 
                    using your reference number.
                  </p>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div>
                  <Label htmlFor="location">Where did this happen?</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => updateFormData('location', e.target.value)}
                    placeholder="e.g., School hallway, classroom, online platform, etc."
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Date of incident</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => updateFormData('date', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="time">Approximate time</Label>
                    <Input
                      id="time"
                      type="time"
                      value={formData.time}
                      onChange={(e) => updateFormData('time', e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="anonymous"
                      checked={formData.anonymous}
                      onChange={(e) => updateFormData('anonymous', e.target.checked)}
                    />
                    <Label htmlFor="anonymous">Keep my report completely anonymous</Label>
                  </div>

                  {!formData.anonymous && (
                    <div>
                      <Label htmlFor="contactInfo">Contact information (optional)</Label>
                      <Input
                        id="contactInfo"
                        value={formData.contactInfo}
                        onChange={(e) => updateFormData('contactInfo', e.target.value)}
                        placeholder="Email or phone number if you want follow-up contact"
                      />
                    </div>
                  )}

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="schoolNotification"
                      checked={formData.schoolNotification}
                      onChange={(e) => updateFormData('schoolNotification', e.target.checked)}
                    />
                    <Label htmlFor="schoolNotification">Notify school administration</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="parentNotification"
                      checked={formData.parentNotification}
                      onChange={(e) => updateFormData('parentNotification', e.target.checked)}
                    />
                    <Label htmlFor="parentNotification">Notify parent/guardian</Label>
                  </div>
                </div>
              </>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Review Your Report</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Badge className={getSeverityColor(formData.severity)}>
                      {formData.severity?.toUpperCase()} SEVERITY
                    </Badge>
                    <Badge variant="outline">{formData.incidentType?.replace(/([A-Z])/g, ' $1').toUpperCase()}</Badge>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span>{formData.location || 'Not specified'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span>{formData.date || 'Not specified'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span>{formData.time || 'Not specified'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span>{formData.anonymous ? 'Anonymous' : 'Contact provided'}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Incident Description:</h4>
                    <p className="text-gray-700 bg-gray-50 p-3 rounded">
                      {formData.description || 'No description provided'}
                    </p>
                  </div>

                  {formData.witnesses && (
                    <div>
                      <h4 className="font-medium mb-2">Witnesses:</h4>
                      <p className="text-gray-700">{formData.witnesses}</p>
                    </div>
                  )}
                </div>

                <Alert>
                  <FileText className="h-4 w-4" />
                  <AlertDescription>
                    Once submitted, you'll receive a reference number to track your report and upload any evidence.
                  </AlertDescription>
                </Alert>
              </div>
            )}

            <div className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={step === 1}
              >
                Previous
              </Button>
              
              {step < 4 ? (
                <Button onClick={handleNext}>
                  Next
                </Button>
              ) : (
                <Button onClick={handleSubmit}>
                  Submit Report
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default ReportIncident;