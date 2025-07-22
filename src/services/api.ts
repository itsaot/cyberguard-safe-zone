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
}

// Get all posts
export const getPosts = async (): Promise<ForumPost[]> => {
  const response = await fetch(`${BASE_URL}/api/posts`);
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  return response.json();
};

// Create new post (anonymous)
export const createPost = async (postData: CreatePostData): Promise<ForumPost> => {
  const response = await fetch(`${BASE_URL}/api/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  });
  if (!response.ok) {
    throw new Error('Failed to create post');
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