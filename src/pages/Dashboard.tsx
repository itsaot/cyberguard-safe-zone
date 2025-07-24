import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger
} from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  Shield,
  AlertCircle,
  CalendarIcon,
  Tag,
  Layers,
  ExternalLink
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import PageLayout from '@/components/PageLayout';
import { useToast } from '@/hooks/use-toast';
import { useReports } from '@/contexts/ReportContext';
import { getReports, type IncidentReport } from '@/services/api';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock chart data for different time periods
const chartData7Days = [
  { name: 'Mon', reports: 2 },
  { name: 'Tue', reports: 4 },
  { name: 'Wed', reports: 1 },
  { name: 'Thu', reports: 3 },
  { name: 'Fri', reports: 5 },
  { name: 'Sat', reports: 2 },
  { name: 'Sun', reports: 1 },
];

const chartData30Days = [
  { name: 'Jan', reports: 4 },
  { name: 'Feb', reports: 7 },
  { name: 'Mar', reports: 5 },
  { name: 'Apr', reports: 10 },
  { name: 'May', reports: 8 },
];

const chartData90Days = [
  { name: 'Jan', reports: 10 },
  { name: 'Feb', reports: 15 },
  { name: 'Mar', reports: 12 },
  { name: 'Apr', reports: 18 },
  { name: 'May', reports: 20 },
  { name: 'Jun', reports: 15 },
];

const StatsCard = ({ title, value, icon, description }: { title: string, value: string, icon: JSX.Element, description?: string }) => (
  <Card>
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
          {description && <p className="text-xs text-gray-500 mt-1">{description}</p>}
        </div>
        <div className={`p-3 rounded-full ${title === 'Total Reports' ? 'bg-blue-100 text-blue-600' : title === 'Resolved' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'}`}>
          {icon}
        </div>
      </div>
    </CardContent>
  </Card>
);

type ReportRowProps = {
  report: any; 
  onViewDetails: (reportId: number) => void;
};

const ReportRow = ({ report, onViewDetails }: ReportRowProps) => {
  return (
    <div className="py-4 border-b last:border-0">
      <div className="flex justify-between items-start mb-2">
        <div>
          <div className="flex items-center">
            <h4 className="font-medium">{report.type}</h4>
            <Badge 
              className={`ml-2 ${
                report.severity === 'high' 
                  ? 'bg-red-100 text-red-800 hover:bg-red-100' 
                  : report.severity === 'medium'
                    ? 'bg-amber-100 text-amber-800 hover:bg-amber-100'
                    : 'bg-green-100 text-green-800 hover:bg-green-100'
              }`}
            >
              {report.severity}
            </Badge>
            <Badge 
              className={`ml-2 ${
                report.status === 'New' 
                  ? 'bg-blue-100 text-blue-800 hover:bg-blue-100' 
                  : report.status === 'Resolved'
                    ? 'bg-green-100 text-green-800 hover:bg-green-100'
                    : 'bg-amber-100 text-amber-800 hover:bg-amber-100'
              }`}
            >
              {report.status}
            </Badge>
          </div>
          <p className="text-sm text-gray-600">{report.platform} • {report.date}</p>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className="text-foreground"
          onClick={() => onViewDetails(report.id)}
        >
          View Details
        </Button>
      </div>
      <p className="text-gray-700">{report.description}</p>
    </div>
  );
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'New':
      return <AlertCircle className="h-5 w-5 text-blue-600" />;
    case 'In Progress':
      return <Clock className="h-5 w-5 text-amber-600" />;
    case 'Resolved':
      return <CheckCircle className="h-5 w-5 text-green-600" />;
    default:
      return <AlertCircle className="h-5 w-5 text-gray-600" />;
  }
};

const Dashboard = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAdmin) {
      navigate('/admin');
    }
  }, [isAdmin, navigate]);

  // Only render dashboard content if user is admin
  if (!isAdmin) {
    return null; // Or a loading indicator
  }

  const [filter, setFilter] = useState('all');
  const [periodFilter, setPeriodFilter] = useState('30days');
  const [selectedReportId, setSelectedReportId] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [backendReports, setBackendReports] = useState<IncidentReport[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { reports, getReportById, updateReportStatus } = useReports();

  const selectedReport = selectedReportId ? getReportById(selectedReportId) : null;

  // Fetch reports from backend
  const fetchBackendReports = async () => {
    try {
      setLoading(true);
      const fetchedReports = await getReports();
      setBackendReports(fetchedReports || []);
      console.log('Fetched backend reports:', fetchedReports);
    } catch (error) {
      console.error('Error fetching backend reports:', error);
      toast({
        title: "Error",
        description: "Failed to load reports from backend. Please check authentication.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  // Real-time sync with polling every 10 seconds
  useEffect(() => {
    fetchBackendReports();
    
    const interval = setInterval(() => {
      fetchBackendReports();
    }, 10000); // Poll every 10 seconds

    return () => clearInterval(interval);
  }, []);

  // Get chart data based on selected period
  const getChartData = () => {
    switch (periodFilter) {
      case '7days':
        return chartData7Days;
      case '90days':
        return chartData90Days;
      default:
        return chartData30Days;
    }
  };

  const handleSafetyCheck = () => {
    toast({
      title: "Safety Check Started",
      description: "The system is analyzing recent communications for potential cyberbullying incidents.",
      duration: 5000,
    });
  };

  const handleViewDetails = (reportId: number) => {
    setSelectedReportId(reportId);
    setIsDialogOpen(true);
  };

  const handleStatusUpdate = (newStatus: string) => {
    if (selectedReportId) {
      updateReportStatus(selectedReportId, newStatus);
      toast({
        title: "Status Updated",
        description: `Report #${selectedReportId} has been marked as ${newStatus}`,
        duration: 3000,
      });
    }
  };

  // Combine local context reports with backend reports
  const allReports = [...reports, ...backendReports.map(report => ({
    id: parseInt(report.id) || 0,
    type: report.title,
    platform: 'Backend Report',
    severity: report.type || 'Medium',
    date: report.createdAt ? new Date(report.createdAt).toLocaleDateString() : new Date().toLocaleDateString(),
    description: report.description,
    status: report.status || 'New'
  }))];

  // Filter reports based on selected filter
  const filteredReports = filter === 'all' 
    ? allReports 
    : allReports.filter(report => (report.status?.toLowerCase() || 'new') === filter);

  return (
    <PageLayout>
      <div className="cg-container py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-gray-600">Monitor and manage cyberbullying reports</p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-2">
            <Button variant="outline" className="hidden md:flex" onClick={() => toast({
              title: "Export Feature",
              description: "Feature not available yet",
              duration: 3000,
            })}>
              <FileText className="mr-2 h-4 w-4" />
              Export Reports
            </Button>
            <Button className="cg-button-primary" onClick={handleSafetyCheck}>
              <Shield className="mr-2 h-4 w-4" />
              Run Safety Check
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard 
            title="Total Reports" 
            value={allReports.length.toString()} 
            icon={<FileText className="h-6 w-6" />} 
            description={`${backendReports.length} from backend, ${reports.length} local`}
          />
          <StatsCard 
            title="Pending Review" 
            value={allReports.filter(r => (r.status || 'New') === 'New').length.toString()}
            icon={<Clock className="h-6 w-6" />}
            description="Requires attention"
          />
          <StatsCard 
            title="Resolved" 
            value={allReports.filter(r => (r.status || 'New') === 'Resolved').length.toString()}
            icon={<CheckCircle className="h-6 w-6" />}
            description={`${allReports.length > 0 ? Math.round((allReports.filter(r => (r.status || 'New') === 'Resolved').length / allReports.length) * 100) : 0}% resolution rate`}
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="col-span-1 lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Incident Trends</span>
                <Select value={periodFilter} onValueChange={setPeriodFilter}>
                  <SelectTrigger className="w-36">
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7days">Last 7 days</SelectItem>
                    <SelectItem value="30days">Last 30 days</SelectItem>
                    <SelectItem value="90days">Last 90 days</SelectItem>
                  </SelectContent>
                </Select>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={getChartData()}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="reports" stroke="#4A9DFF" fill="#D3E4FD" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Incident Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span>Harassment</span>
                  <span>35%</span>
                </div>
                <Progress value={35} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span>Hate Speech</span>
                  <span>25%</span>
                </div>
                <Progress value={25} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span>Threats</span>
                  <span>15%</span>
                </div>
                <Progress value={15} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span>Image Sharing</span>
                  <span>15%</span>
                </div>
                <Progress value={15} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span>Other</span>
                  <span>10%</span>
                </div>
                <Progress value={10} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Recent Reports</span>
              <Select defaultValue="all" onValueChange={setFilter}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Reports</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="in progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="list" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="list">List View</TabsTrigger>
                <TabsTrigger value="details">Detailed View</TabsTrigger>
              </TabsList>
              <TabsContent value="list" className="mt-4">
                <div className="rounded-md border">
                  {loading ? (
                    <div className="py-12 text-center">
                      <p className="text-gray-600">Loading reports...</p>
                    </div>
                  ) : filteredReports.length > 0 ? (
                    <div className="divide-y">
                      {filteredReports.map((report) => (
                        <ReportRow 
                          key={`${report.id}-${report.platform}`} 
                          report={report} 
                          onViewDetails={handleViewDetails}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="py-12 text-center">
                      <AlertTriangle className="h-12 w-12 mx-auto text-amber-500 mb-4" />
                      <h3 className="text-lg font-medium">No reports found</h3>
                      <p className="text-gray-600">No reports matching your filter criteria.</p>
                    </div>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="details">
                <div className="rounded-md border p-4">
                  <p className="text-center py-8 text-gray-600">
                    Select a report from the list to view detailed information.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Report Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">Report Details</DialogTitle>
            <DialogDescription>
              Complete information about the reported incident.
            </DialogDescription>
          </DialogHeader>

          {selectedReport ? (
            <>
              <div className="space-y-4">
                <div className="flex items-center flex-wrap gap-2">
                  <h3 className="text-lg font-semibold">{selectedReport.type}</h3>
                  <Badge 
                    className={`${
                      selectedReport.severity === 'high' 
                        ? 'bg-red-100 text-red-800 hover:bg-red-100' 
                        : selectedReport.severity === 'medium'
                          ? 'bg-amber-100 text-amber-800 hover:bg-amber-100'
                          : 'bg-green-100 text-green-800 hover:bg-green-100'
                    }`}
                  >
                    {selectedReport.severity}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">Status:</span>
                    <span>{selectedReport.status}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Layers className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">Platform:</span>
                    <span>{selectedReport.platform}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">Date:</span>
                    <span>{selectedReport.date}</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Description</h4>
                  <div className="p-3 bg-gray-50 rounded-md text-sm max-h-48 overflow-y-auto">
                    {selectedReport.description}
                  </div>
                </div>
              </div>
              
              <DialogFooter className="flex flex-col sm:flex-row gap-2 pt-4">
                <div className="flex flex-wrap gap-2">
                  <Button 
                    variant={selectedReport.status === 'New' ? "default" : "outline"} 
                    size="sm"
                    onClick={() => handleStatusUpdate('New')}
                    disabled={selectedReport.status === 'New'}
                  >
                    Mark as New
                  </Button>
                  <Button 
                    variant={selectedReport.status === 'In Progress' ? "default" : "outline"} 
                    size="sm"
                    onClick={() => handleStatusUpdate('In Progress')}
                    disabled={selectedReport.status === 'In Progress'}
                  >
                    Mark In Progress
                  </Button>
                  <Button 
                    variant={selectedReport.status === 'Resolved' ? "default" : "outline"} 
                    size="sm"
                    onClick={() => handleStatusUpdate('Resolved')}
                    disabled={selectedReport.status === 'Resolved'}
                  >
                    Mark Resolved
                  </Button>
                </div>
                <Button variant="outline" size="sm" className="ml-auto" onClick={() => toast({
                  title: "Export Feature",
                  description: "Feature not available yet",
                  duration: 3000,
                })}>
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Export Report
                </Button>
              </DialogFooter>
            </>
          ) : (
            <div className="py-8 text-center">
              <p>Report information not available.</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
};

export default Dashboard;
