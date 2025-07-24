import { useState } from 'react';
import { Flag, Eye, MessageSquare, AlertTriangle, CheckCircle, Clock, Users, Shield, TrendingUp, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import PageLayout from '@/components/PageLayout';
import { useToast } from '@/hooks/use-toast';
import { getReports, type IncidentReport } from '@/services/api';
import { useEffect } from 'react';

// Mock data for moderator dashboard
const flaggedPosts = [
  {
    id: 1,
    title: "Inappropriate language in post",
    postId: "POST-001",
    flaggedBy: "User",
    reason: "Offensive language",
    priority: "Medium",
    timestamp: "2 hours ago",
    status: "Pending",
    category: "Verbal Bullying"
  },
  {
    id: 2,
    title: "Potential doxxing attempt",
    postId: "POST-002",
    flaggedBy: "Auto-Detection",
    reason: "Personal information shared",
    priority: "High",
    timestamp: "4 hours ago",
    status: "Under Review",
    category: "Cyberbullying"
  },
  {
    id: 3,
    title: "Threats of violence",
    postId: "POST-003",
    flaggedBy: "Multiple Users",
    reason: "Threatening behavior",
    priority: "Critical",
    timestamp: "6 hours ago",
    status: "Escalated",
    category: "Physical Bullying"
  }
];

const incidentReports = [
  {
    id: "RPT-001",
    type: "Physical Bullying",
    severity: "High",
    status: "New",
    location: "Central High School",
    timestamp: "1 hour ago",
    assignedTo: "Unassigned"
  },
  {
    id: "RPT-002",
    type: "Cyberbullying",
    severity: "Medium",
    status: "In Progress",
    location: "West Side Academy",
    timestamp: "3 hours ago",
    assignedTo: "Moderator Sarah"
  },
  {
    id: "RPT-003",
    type: "Verbal Bullying",
    severity: "Low",
    status: "Resolved",
    location: "North Valley School",
    timestamp: "1 day ago",
    assignedTo: "Moderator John"
  }
];

const moderatorStats = {
  totalFlags: 45,
  pendingReviews: 12,
  escalatedCases: 3,
  resolvedThisWeek: 28,
  responseTime: "2.5 hours",
  satisfactionRate: 94
};

const ModeratorDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState('all');
  const [backendReports, setBackendReports] = useState<IncidentReport[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Fetch backend reports
  const fetchBackendReports = async () => {
    try {
      setLoading(true);
      const fetchedReports = await getReports();
      setBackendReports(fetchedReports || []);
      console.log('Moderator: Fetched backend reports:', fetchedReports);
    } catch (error) {
      console.error('Moderator: Error fetching backend reports:', error);
      toast({
        title: "Error",
        description: "Failed to load incident reports from backend.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  // Real-time sync with polling
  useEffect(() => {
    fetchBackendReports();
    
    const interval = setInterval(() => {
      fetchBackendReports();
    }, 10000); // Poll every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const handleFlagAction = (flagId: number, action: string) => {
    toast({
      title: "Action Completed",
      description: `Flag ${flagId} has been ${action.toLowerCase()}`,
      duration: 3000,
    });
  };

  const handleAssignCase = (reportId: string) => {
    toast({
      title: "Case Assigned",
      description: `Report ${reportId} has been assigned to you`,
      duration: 3000,
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New': return 'bg-blue-100 text-blue-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Under Review': return 'bg-purple-100 text-purple-800';
      case 'Resolved': return 'bg-green-100 text-green-800';
      case 'Escalated': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <PageLayout>
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Moderator Dashboard</h1>
          <p className="text-gray-600">Monitor community activity and manage incident reports</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="flags">Flagged Content</TabsTrigger>
            <TabsTrigger value="reports">Incident Reports</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Pending Reviews</p>
                      <p className="text-2xl font-bold">{moderatorStats.pendingReviews}</p>
                    </div>
                    <Clock className="h-8 w-8 text-amber-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Escalated Cases</p>
                      <p className="text-2xl font-bold">{moderatorStats.escalatedCases}</p>
                    </div>
                    <AlertTriangle className="h-8 w-8 text-red-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Resolved This Week</p>
                      <p className="text-2xl font-bold">{moderatorStats.resolvedThisWeek}</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Flagged Content</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {flaggedPosts.slice(0, 3).map(flag => (
                      <div key={flag.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <div className="flex-1">
                          <h4 className="font-medium">{flag.title}</h4>
                          <p className="text-sm text-gray-500">{flag.timestamp}</p>
                        </div>
                        <Badge className={getPriorityColor(flag.priority)}>
                          {flag.priority}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Response Time</span>
                      <span className="text-sm font-medium">{moderatorStats.responseTime}</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Resolution Rate</span>
                      <span className="text-sm font-medium">{moderatorStats.satisfactionRate}%</span>
                    </div>
                    <Progress value={moderatorStats.satisfactionRate} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="flags" className="mt-6">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search flagged content..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Select value={filterPriority} onValueChange={setFilterPriority}>
                <SelectTrigger className="w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Post</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Flagged</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {flaggedPosts.map(flag => (
                      <TableRow key={flag.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{flag.title}</p>
                            <p className="text-sm text-gray-500">ID: {flag.postId}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getPriorityColor(flag.priority)}>
                            {flag.priority}
                          </Badge>
                        </TableCell>
                        <TableCell>{flag.reason}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(flag.status)}>
                            {flag.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{flag.timestamp}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-3 w-3 mr-1" />
                              View
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleFlagAction(flag.id, 'Approved')}
                            >
                              Approve
                            </Button>
                            <Button 
                              size="sm" 
                              variant="destructive"
                              onClick={() => handleFlagAction(flag.id, 'Removed')}
                            >
                              Remove
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="mt-6">
            <Alert className="mb-6">
              <Shield className="h-4 w-4" />
              <AlertDescription>
                All incident reports are confidential. Handle with appropriate care and follow escalation protocols.
              </AlertDescription>
            </Alert>

            <Card>
              <CardContent className="p-0">
                {loading ? (
                  <div className="p-8 text-center">
                    <p className="text-gray-600">Loading reports...</p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Report ID</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Urgency</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {/* Backend reports */}
                      {backendReports.map(report => (
                        <TableRow key={`backend-${report.id}`}>
                          <TableCell className="font-medium">{report.id}</TableCell>
                          <TableCell>{report.title}</TableCell>
                          <TableCell>
                            <Badge className={getPriorityColor('Medium')}>
                              {report.type || 'Medium'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(report.status || 'New')}>
                              {report.status || 'New'}
                            </Badge>
                          </TableCell>
                          <TableCell>{report.type}</TableCell>
                          <TableCell>{report.createdAt ? new Date(report.createdAt).toLocaleDateString() : 'N/A'}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Eye className="h-3 w-3 mr-1" />
                                View
                              </Button>
                              <Button 
                                size="sm"
                                onClick={() => handleAssignCase(report.id)}
                              >
                                Assign
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                      
                      {/* Mock local reports */}
                      {incidentReports.map(report => (
                        <TableRow key={`local-${report.id}`}>
                          <TableCell className="font-medium">{report.id}</TableCell>
                          <TableCell>{report.type}</TableCell>
                          <TableCell>
                            <Badge className={getPriorityColor(report.severity)}>
                              {report.severity}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(report.status)}>
                              {report.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{report.location}</TableCell>
                          <TableCell>{report.timestamp}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Eye className="h-3 w-3 mr-1" />
                                View
                              </Button>
                              {report.assignedTo === 'Unassigned' && (
                                <Button 
                                  size="sm"
                                  onClick={() => handleAssignCase(report.id)}
                                >
                                  Assign
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                      
                      {backendReports.length === 0 && incidentReports.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                            No incident reports found.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <Flag className="h-8 w-8 mx-auto mb-2 text-red-500" />
                  <p className="text-2xl font-bold">{moderatorStats.totalFlags}</p>
                  <p className="text-sm text-gray-500">Total Flags</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Users className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                  <p className="text-2xl font-bold">1,247</p>
                  <p className="text-sm text-gray-500">Active Users</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <MessageSquare className="h-8 w-8 mx-auto mb-2 text-green-500" />
                  <p className="text-2xl font-bold">892</p>
                  <p className="text-sm text-gray-500">Total Posts</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <TrendingUp className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                  <p className="text-2xl font-bold">94%</p>
                  <p className="text-sm text-gray-500">Resolution Rate</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Incident Categories</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Verbal Bullying</span>
                      <span>40%</span>
                    </div>
                    <Progress value={40} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Cyberbullying</span>
                      <span>35%</span>
                    </div>
                    <Progress value={35} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Physical Bullying</span>
                      <span>25%</span>
                    </div>
                    <Progress value={25} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Weekly Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>New Reports</span>
                      <span className="font-medium">23</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Resolved Cases</span>
                      <span className="font-medium">28</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Escalated</span>
                      <span className="font-medium">3</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Average Response Time</span>
                      <span className="font-medium">2.5 hours</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default ModeratorDashboard;