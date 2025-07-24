import { useState, useEffect } from 'react';
import { Search, Filter, MessageSquare, Heart, Flag, Plus, Calendar, MapPin, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import PageLayout from '@/components/PageLayout';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { getPosts, createPost, flagPost, type ForumPost as ApiForumPost, CreatePostData } from '@/services/api';


const ForumPost = ({ post, onFlag }: { post: any, onFlag: (id: number) => void }) => {
  const { toast } = useToast();
  
  return (
    <Card className="mb-4">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-lg mb-2">{post.title || "Untitled Post"}</CardTitle>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant={
                (post.type || post.category) === 'physical' ? 'destructive' :
                (post.type || post.category) === 'verbal' ? 'secondary' : 'default'
              }>
                {post.type ? (
                  post.type === 'physical' ? 'Physical Bullying' :
                  post.type === 'verbal' ? 'Verbal Bullying' : 'Cyberbullying'
                ) : (post.category || 'General')}
              </Badge>
              {post.isAdviceSeeker && (
                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                  Seeking Advice
                </Badge>
              )}
              {post.isAnonymous && (
                <Badge variant="outline">
                  Anonymous
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>{post.author || "Anonymous"}</span>
              {post.timestamp && (
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {post.timestamp}
                </span>
              )}
              {post.school && (
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {post.school}
                </span>
              )}
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onFlag(post.id)}
            className="text-red-500 hover:text-red-700"
          >
            <Flag className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 mb-4">{post.content || "No content available"}</p>
        
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {post.tags.map((tag: string, index: number) => (
              <Badge key={`${tag}-${index}`} variant="outline" className="text-xs">
                <Tag className="h-3 w-3 mr-1" />
                {tag}
              </Badge>
            ))}
          </div>
        )}
        
        {/* Removed likes and comments section as requested */}
      </CardContent>
    </Card>
  );
};

const CreatePostDialog = ({ onPostCreated }: { onPostCreated: () => void }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handlePostSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter both title and content for your post.",
        duration: 3000,
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const postData: CreatePostData = {
        title,
        content,
        userId: "anonymous_user" // You can replace this with actual user ID when available
      };

      await createPost(postData);
      
      toast({
        title: "Post Created Successfully",
        description: "Your post has been added to the forum.",
        duration: 3000,
      });
      
      // Reset form
      setTitle('');
      setContent('');
      setIsOpen(false);
      
      // Refresh posts to show the new post
      await onPostCreated();
      
    } catch (error) {
      console.error('Error creating post:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create post. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="mb-6">
          <Plus className="h-4 w-4 mr-2" />
          Create Post
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Post</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title..."
            />
          </div>
          
          <div>
            <Label htmlFor="content">Content *</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share your thoughts or experience..."
              rows={4}
            />
          </div>
          
          <Button 
            className="w-full" 
            onClick={handlePostSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Posting...' : 'Create Post'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const Forum = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [posts, setPosts] = useState<ApiForumPost[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { isAdmin } = useAuth();

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const fetchedPosts = await getPosts();
      setPosts(fetchedPosts || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast({
        title: "Error",
        description: "Failed to load posts. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
      setPosts([]); // Set empty array on error to prevent blank UI
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
    
    // Real-time sync with polling every 10 seconds for admin users
    if (isAdmin) {
      const interval = setInterval(() => {
        fetchPosts();
      }, 10000); // Poll every 10 seconds for admins

      return () => clearInterval(interval);
    }
  }, [isAdmin]);

  const handlePostCreated = async () => {
    await fetchPosts(); // Refresh posts after creating a new one
  };

  const handleFlag = async (postId: number) => {
    if (!isAdmin) {
      toast({
        title: "Access Denied",
        description: "Only administrators can flag posts.",
        duration: 3000,
      });
      return;
    }

    try {
      await flagPost(postId);
      toast({
        title: "Post Flagged",
        description: "The post has been flagged for review.",
        duration: 3000,
      });
      fetchPosts(); // Refresh posts
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to flag post. Please try again.",
        duration: 3000,
      });
    }
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = (post.title ?? "").toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (post.content ?? "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || 
                           (post.category ?? "").toLowerCase().includes(categoryFilter.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  return (
    <PageLayout>
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Community Forum</h1>
          <p className="text-gray-600">Share your experiences and find support in our safe, anonymous community</p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Posts</TabsTrigger>
            <TabsTrigger value="advice">Seeking Advice</TabsTrigger>
            <TabsTrigger value="support">Support Groups</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search posts, keywords, or experiences..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="physical">Physical Bullying</SelectItem>
                  <SelectItem value="verbal">Verbal Bullying</SelectItem>
                  <SelectItem value="cyber">Cyberbullying</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="helpful">Most Helpful</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <CreatePostDialog onPostCreated={handlePostCreated} />

            <div className="space-y-4">
              {loading ? (
                <div className="text-center py-8">Loading posts...</div>
              ) : filteredPosts.length > 0 ? (
                filteredPosts.map(post => (
                  <ForumPost key={post.id} post={post} onFlag={handleFlag} />
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No posts found. Be the first to share your experience!
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="advice" className="mt-6">
            <div className="space-y-4">
              {filteredPosts.filter(post => post.isAdviceSeeker === true).map(post => (
                <ForumPost key={post.id} post={post} onFlag={handleFlag} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="support" className="mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Physical Bullying Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Connect with others who have experienced physical intimidation</p>
                  <Button variant="outline" className="w-full" onClick={() => toast({
                    title: "Feature Coming Soon", 
                    description: "Support groups feature is currently under development.",
                    duration: 3000,
                  })}>Join Group</Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Cyberbullying Recovery</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Get support for online harassment and digital safety</p>
                  <Button variant="outline" className="w-full" onClick={() => toast({
                    title: "Feature Coming Soon", 
                    description: "Support groups feature is currently under development.",
                    duration: 3000,
                  })}>Join Group</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="resources" className="mt-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Crisis Hotlines</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">24/7 support when you need it most</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Safety Planning</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">Create a plan to stay safe at school and online</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Legal Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">Know your rights and legal options</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default Forum;