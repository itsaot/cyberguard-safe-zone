import { useState } from 'react';
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

// Mock data for forum posts
let forumPosts = [
  {
    id: 1,
    title: "Dealing with name-calling at school",
    content: "I've been experiencing verbal bullying in my classes. Students keep making fun of my appearance and it's affecting my confidence...",
    category: "Verbal Bullying",
    author: "Anonymous User",
    timestamp: "2 hours ago",
    isAdviceSeeker: true,
    school: "Central High School",
    tags: ["advice-needed", "school", "self-esteem"]
  },
  {
    id: 2,
    title: "Someone is spreading rumors about me online",
    content: "There are false stories being shared on social media about me. I don't know how to handle this situation...",
    category: "Cyberbullying",
    author: "Anonymous User",
    timestamp: "5 hours ago",
    isAdviceSeeker: true,
    school: "West Side Academy",
    tags: ["cyberbullying", "social-media", "rumors"]
  },
  {
    id: 3,
    title: "Physical intimidation in hallways",
    content: "A group of students has been pushing me around between classes. I'm scared to walk alone in the hallways...",
    category: "Physical Bullying",
    author: "Anonymous User",
    timestamp: "1 day ago",
    isAdviceSeeker: true,
    school: "North Valley School",
    tags: ["physical", "safety", "urgent"]
  }
];

const ForumPost = ({ post, onFlag }: { post: any, onFlag: (id: number) => void }) => {
  const { toast } = useToast();
  
  return (
    <Card className="mb-4">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-lg mb-2">{post.title}</CardTitle>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant={
                post.category === 'Physical Bullying' ? 'destructive' :
                post.category === 'Verbal Bullying' ? 'secondary' : 'default'
              }>
                {post.category}
              </Badge>
              {post.isAdviceSeeker && (
                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                  Seeking Advice
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>{post.author}</span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {post.timestamp}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {post.school}
              </span>
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
        <p className="text-gray-700 mb-4">{post.content}</p>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {post.tags.map((tag: string) => (
            <Badge key={tag} variant="outline" className="text-xs">
              <Tag className="h-3 w-3 mr-1" />
              {tag}
            </Badge>
          ))}
        </div>
        
        {/* Removed likes and comments section as requested */}
      </CardContent>
    </Card>
  );
};

const CreatePostDialog = ({ onPostCreated }: { onPostCreated: () => void }) => {
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isAdviceSeeker, setIsAdviceSeeker] = useState(false);
  const [school, setSchool] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const downloadCSV = (posts: any[]) => {
    const csvContent = [
      ['ID', 'Title', 'Content', 'Category', 'Author', 'Timestamp', 'IsAdviceSeeker', 'School', 'Tags'].join(','),
      ...posts.map(post => [
        post.id,
        `"${post.title.replace(/"/g, '""')}"`,
        `"${post.content.replace(/"/g, '""')}"`,
        `"${post.category}"`,
        `"${post.author}"`,
        `"${post.timestamp}"`,
        post.isAdviceSeeker,
        `"${post.school}"`,
        `"${post.tags.join('; ')}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `forum_posts_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePostSubmit = () => {
    if (!category || !title || !content) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        duration: 3000,
      });
      return;
    }

    const newPost = {
      id: Math.max(...forumPosts.map(p => p.id)) + 1,
      title,
      content,
      category: category === 'physical' ? 'Physical Bullying' : 
                category === 'verbal' ? 'Verbal Bullying' : 'Cyberbullying',
      author: "Anonymous User",
      timestamp: "Just now",
      isAdviceSeeker,
      school: school || "Unknown",
      tags: [
        ...(isAdviceSeeker ? ['advice-needed'] : []),
        category,
        ...(school ? ['school'] : [])
      ]
    };

    forumPosts.unshift(newPost);
    downloadCSV(forumPosts);
    
    // Reset form
    setCategory('');
    setTitle('');
    setContent('');
    setIsAdviceSeeker(false);
    setSchool('');
    setIsOpen(false);
    
    onPostCreated();
    
    toast({
      title: "Post Created Successfully",
      description: "Your anonymous post has been added to the forum and saved to CSV.",
      duration: 3000,
    });
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
          <DialogTitle>Create Anonymous Post</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="category">Category *</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="physical">Physical Bullying</SelectItem>
                <SelectItem value="verbal">Verbal Bullying</SelectItem>
                <SelectItem value="cyber">Cyberbullying</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Brief description of your situation"
            />
          </div>
          
          <div>
            <Label htmlFor="content">Your Story *</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share your experience. Remember, you're posting anonymously."
              rows={4}
            />
          </div>
          
          <div>
            <Label htmlFor="school">School/Location (Optional)</Label>
            <Input
              id="school"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              placeholder="Your school or general area"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="advice"
              checked={isAdviceSeeker}
              onChange={(e) => setIsAdviceSeeker(e.target.checked)}
            />
            <Label htmlFor="advice">I'm seeking advice and support</Label>
          </div>
          
          <Button className="w-full" onClick={handlePostSubmit}>
            Post Anonymously
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
  const [posts, setPosts] = useState(forumPosts);
  const { toast } = useToast();

  const handlePostCreated = () => {
    setPosts([...forumPosts]);
  };

  const handleFlag = (postId: number) => {
    toast({
      title: "Feature Coming Soon",
      description: "Post flagging feature is currently under development.",
      duration: 3000,
    });
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || 
                           post.category.toLowerCase().includes(categoryFilter.toLowerCase());
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
              {filteredPosts.map(post => (
                <ForumPost key={post.id} post={post} onFlag={handleFlag} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="advice" className="mt-6">
            <div className="space-y-4">
              {filteredPosts.filter(post => post.isAdviceSeeker).map(post => (
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