
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the report type
export type Report = {
  id: number;
  type: string;
  platform: string;
  status: string;
  severity: string;
  date: string;
  description: string;
};

// Initial report data
const initialReports = [
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

// Create context type
type ReportContextType = {
  reports: Report[];
  addReport: (report: Omit<Report, 'id' | 'status'>) => void;
  getReportById: (id: number) => Report | undefined;
  updateReportStatus: (id: number, status: string) => void;
};

// Create context with default values
const ReportContext = createContext<ReportContextType>({
  reports: initialReports,
  addReport: () => {},
  getReportById: () => undefined,
  updateReportStatus: () => {},
});

// Provider component
export const ReportProvider = ({ children }: { children: ReactNode }) => {
  const [reports, setReports] = useState<Report[]>(initialReports);

  const addReport = (newReport: Omit<Report, 'id' | 'status'>) => {
    const reportWithId: Report = {
      ...newReport,
      id: reports.length + 1,
      status: 'New', // Default status for new reports
    };
    
    setReports(prevReports => [reportWithId, ...prevReports]);
  };

  const getReportById = (id: number) => {
    return reports.find(report => report.id === id);
  };

  const updateReportStatus = (id: number, status: string) => {
    setReports(prevReports => 
      prevReports.map(report => 
        report.id === id ? { ...report, status } : report
      )
    );
  };

  return (
    <ReportContext.Provider value={{ reports, addReport, getReportById, updateReportStatus }}>
      {children}
    </ReportContext.Provider>
  );
};

// Custom hook for using this context
export const useReports = () => useContext(ReportContext);
