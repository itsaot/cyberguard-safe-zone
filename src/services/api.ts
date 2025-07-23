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
  title: string;
  content: string;
  category: string;
  tags: string[];
  type: string;
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