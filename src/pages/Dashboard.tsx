
import { useState } from 'react';
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
  BarChart3,
  FileText,
  Shield,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import PageLayout from '@/components/PageLayout';

// Mock data for the dashboard
const recentReports = [
  {
    id: 1,
    type: 'Harassment',
    platform: 'Social Media',
    status: 'New',
    severity: 'high',
    date: '2025-05-05',
    description: 'Repeated negative comments on student\'s social media posts',
  },
  {
    id: 2,
    type: 'Exclusion',
    platform: 'School Platform',
    status: 'In Progress',
    severity: 'medium',
    date: '2025-05-04',
    description: 'Deliberate exclusion from online class group',
  },
  {
    id: 3,
    type: 'Threats',
    platform: 'Text Message',
    status: 'New',
    severity: 'high',
    date: '2025-05-04',
    description: 'Threatening messages sent via text',
  },
  {
    id: 4,
    type: 'Image Sharing',
    platform: 'Social Media',
    status: 'Resolved',
    severity: 'medium',
    date: '2025-05-03',
    description: 'Sharing altered images without consent',
  },
  {
    id: 5,
    type: 'Hate Speech',
    platform: 'Online Gaming',
    status: 'In Progress',
    severity: 'high',
    date: '2025-05-02',
    description: 'Discriminatory language used during online gaming session',
  },
];

const chartData = [
  { name: 'Jan', reports: 4 },
  { name: 'Feb', reports: 7 },
  { name: 'Mar', reports: 5 },
  { name: 'Apr', reports: 10 },
  { name: 'May', reports: 8 },
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

const ReportRow = ({ report }: { report: typeof recentReports[0] }) => {
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
        <Button variant="outline" size="sm">View Details</Button>
      </div>
      <p className="text-gray-700">{report.description}</p>
    </div>
  );
};

const Dashboard = () => {
  const [filter, setFilter] = useState('all');

  const filteredReports = filter === 'all' 
    ? recentReports 
    : recentReports.filter(report => report.status.toLowerCase() === filter);

  return (
    <PageLayout>
      <div className="cg-container py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-gray-600">Monitor and manage cyberbullying reports</p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-2">
            <Button variant="outline" className="hidden md:flex">
              <FileText className="mr-2 h-4 w-4" />
              Export Reports
            </Button>
            <Button className="cg-button-primary">
              <Shield className="mr-2 h-4 w-4" />
              Run Safety Check
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard 
            title="Total Reports" 
            value="24" 
            icon={<FileText className="h-6 w-6" />} 
            description="Last 30 days"
          />
          <StatsCard 
            title="Pending Review" 
            value="8"
            icon={<Clock className="h-6 w-6" />}
            description="Requires attention"
          />
          <StatsCard 
            title="Resolved" 
            value="16"
            icon={<CheckCircle className="h-6 w-6" />}
            description="67% resolution rate"
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="col-span-1 lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Incident Trends</span>
                <Select defaultValue="30days">
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
                    data={chartData}
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
                  {filteredReports.length > 0 ? (
                    <div className="divide-y">
                      {filteredReports.map((report) => (
                        <ReportRow key={report.id} report={report} />
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
    </PageLayout>
  );
};

export default Dashboard;
