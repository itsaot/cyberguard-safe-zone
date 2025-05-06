
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, LogIn } from 'lucide-react';
import PageLayout from '@/components/PageLayout';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(username, password);
    if (success) {
      navigate('/dashboard');
    }
  };

  return (
    <PageLayout>
      <div className="flex flex-col items-center justify-center min-h-[70vh] p-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center mb-4">
              <Shield className="h-10 w-10 text-cyberguard-blue" />
            </div>
            <CardTitle className="text-2xl text-center font-bold">Admin Login</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access the admin dashboard
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input 
                  id="username" 
                  placeholder="Enter your username" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)} 
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="Enter your password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full bg-cyberguard-blue hover:bg-blue-600" size="lg">
                <LogIn className="mr-2 h-4 w-4" /> 
                Admin Login
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </PageLayout>
  );
};

export default AdminLogin;
