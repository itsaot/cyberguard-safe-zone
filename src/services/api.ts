const BASE_URL = 'https://cybergaurd-backend-2.onrender.com';

export interface ForumPost {
  id: number;
  title: string;
  content: string;
  category: string;
  author: string;
  timestamp: string;
  tags: string[];
  flagged?: boolean;
  isAdviceSeeker?: boolean;
  school?: string;
}

export interface CreatePostData {
  type: "physical" | "verbal" | "cyber";
  content: string;
  category?: string;
  tags?: string[];
  isAnonymous: boolean;
}

export interface IncidentReport {
  id: string;
  title: string;
  description: string;
  location: string;
  urgency: "low" | "medium" | "high";
  reportedBy?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateReportData {
  title: string;
  description: string;
  location: string;
  urgency: "low" | "medium" | "high";
  reportedBy?: string;
}

// Get all posts
export const getPosts = async (): Promise<ForumPost[]> => {
  console.log('Fetching posts from:', `${BASE_URL}/api/posts`);
  
  try {
    const response = await fetch(`${BASE_URL}/api/posts`);
    console.log('GET posts response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('GET posts error:', errorText);
      throw new Error(`Failed to fetch posts: ${response.status} ${errorText}`);
    }
    
    const data = await response.json();
    console.log('Fetched posts:', data);
    return data;
  } catch (error) {
    console.error('Network error fetching posts:', error);
    throw error;
  }
};

// Create new post (anonymous)
export const createPost = async (postData: CreatePostData): Promise<ForumPost> => {
  console.log('Creating post with data:', postData);
  console.log('Sending to URL:', `${BASE_URL}/api/posts`);
  
  const response = await fetch(`${BASE_URL}/api/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  });
  
  console.log('Response status:', response.status);
  console.log('Response headers:', response.headers);
  
  if (!response.ok) {
    const errorText = await response.text();
    console.error('Error response:', errorText);
    throw new Error(`Failed to create post: ${response.status} ${errorText}`);
  }
  return response.json();
};

// Flag post (admin only)
export const flagPost = async (postId: number, token?: string): Promise<void> => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}/api/moderation/${postId}`, {
    method: 'POST',
    headers,
  });
  
  if (!response.ok) {
    throw new Error('Failed to flag post');
  }
};

// Helper function to get auth token
const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken');
};

// Get all reports (admin/auth required)
export const getReports = async (): Promise<IncidentReport[]> => {
  const token = getAuthToken();
  console.log('Fetching reports from:', `${BASE_URL}/api/reports`);
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${BASE_URL}/api/reports`, {
      headers,
    });
    
    console.log('GET reports response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('GET reports error:', errorText);
      throw new Error(`Failed to fetch reports: ${response.status} ${errorText}`);
    }
    
    const data = await response.json();
    console.log('Fetched reports:', data);
    return data;
  } catch (error) {
    console.error('Network error fetching reports:', error);
    throw error;
  }
};

// Create new incident report (requires auth)
export const createReport = async (reportData: CreateReportData): Promise<IncidentReport> => {
  const token = getAuthToken();
  console.log('Creating report with data:', reportData);
  console.log('Sending to URL:', `${BASE_URL}/api/reports`);
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}/api/reports`, {
    method: 'POST',
    headers,
    body: JSON.stringify(reportData),
  });
  
  console.log('Report creation response status:', response.status);
  
  if (!response.ok) {
    const errorText = await response.text();
    console.error('Error creating report:', errorText);
    
    if (response.status === 401) {
      throw new Error('Authentication required. Please log in.');
    }
    
    throw new Error(`Failed to create report: ${response.status} ${errorText}`);
  }
  
  return response.json();
};

// Get single report by ID
export const getReportById = async (reportId: string): Promise<IncidentReport> => {
  const token = getAuthToken();
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}/api/reports/${reportId}`, {
    headers,
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch report: ${response.status} ${errorText}`);
  }
  
  return response.json();
};