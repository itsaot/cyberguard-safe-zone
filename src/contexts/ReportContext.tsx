
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

// Initial report data with South African context
const initialReports = [
  {
    id: 1,
    type: 'Harassment',
    platform: 'WhatsApp',
    status: 'New',
    severity: 'high',
    date: '2025-05-05',
    description: 'Grade 10 learner at Johannesburg High School receiving repeated hurtful messages in class WhatsApp group. Messages included name-calling in both English and Zulu, targeting the learner\'s appearance and family background.',
  },
  {
    id: 2,
    type: 'Exclusion',
    platform: 'School Platform',
    status: 'In Progress',
    severity: 'medium',
    date: '2025-05-04',
    description: 'Student from Cape Town Secondary School deliberately excluded from Google Classroom group project. Other learners created a separate group without the student and shared project details on MiWay bus group chat.',
  },
  {
    id: 3,
    type: 'Threats',
    platform: 'Instagram',
    status: 'New',
    severity: 'high',
    date: '2025-05-04',
    description: 'Grade 11 learner at Pretoria Girls High received threatening direct messages on Instagram after standing up to bullying. Threats mentioned waiting for her at Centurion Mall and knowing her taxi route home.',
  },
  {
    id: 4,
    type: 'Image Sharing',
    platform: 'TikTok',
    status: 'Resolved',
    severity: 'medium',
    date: '2025-05-03',
    description: 'Student from Durban North College had embarrassing photos from school sports day posted on TikTok without permission. Video included mocking commentary in isiZulu and was shared in multiple Durban school WhatsApp groups.',
  },
  {
    id: 5,
    type: 'Hate Speech',
    platform: 'Online Gaming',
    status: 'In Progress',
    severity: 'high',
    date: '2025-05-02',
    description: 'Grade 9 learner from Bloemfontein High School experiencing racial slurs and discriminatory language during Fortnite gaming sessions with school peers. Comments targeted his home language (Sesotho) and made references to apartheid-era terminology.',
  },
  {
    id: 6,
    type: 'Harassment',
    platform: 'Facebook',
    status: 'New',
    severity: 'medium',
    date: '2025-05-01',
    description: 'Grade 12 student at Port Elizabeth Technical High School being targeted in school Facebook page comments. Classmates posted negative comments about her family\'s financial situation and mocked her second-hand school uniform.',
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
