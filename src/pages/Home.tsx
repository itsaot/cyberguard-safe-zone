import { Link } from 'react-router-dom';
import { Shield, Zap, Eye, Lock, ArrowRight, CheckCircle, Globe, Users, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import PageLayout from '@/components/PageLayout';

const Home = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <PageLayout>
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 lg:py-32">
          <div className="absolute inset-0 cyber-gradient"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10"></div>
          
          <div className="relative cyber-container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8 animate-fade-in">
                <div className="space-y-4">
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                    <Shield className="w-4 h-4 mr-2 text-primary" />
                    <span className="text-sm font-medium text-primary">Next-Gen Cybersecurity</span>
                  </div>
                  
                  <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                    <span className="text-foreground">CyberGuard</span>
                    <br />
                    <span className="cyber-text-glow text-primary">Safe Zone</span>
                  </h1>
                  
                  <p className="text-xl text-muted-foreground max-w-xl leading-relaxed">
                    Advanced threat detection and protection for the modern digital landscape. 
                    Secure your digital assets with enterprise-grade cybersecurity solutions.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/report">
                    <Button size="lg" className="cyber-gradient-accent text-white border-0 hover:opacity-90 transition-opacity w-full sm:w-auto group">
                      Get Protected Now
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link to="/dashboard">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto border-border/50 hover:bg-card">
                      View Dashboard
                    </Button>
                  </Link>
                </div>
                
                <div className="flex items-center gap-8 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-secondary" />
                    <span>99.9% Uptime</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-secondary" />
                    <span>Enterprise Grade</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-secondary" />
                    <span>24/7 Monitoring</span>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="relative cyber-glow rounded-2xl overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80"
                    alt="Advanced cybersecurity technology and digital protection systems"
                    className="w-full h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"></div>
                </div>
                
                {/* Floating stats */}
                <div className="absolute -bottom-6 -left-6 cyber-glass rounded-xl p-4">
                  <div className="text-2xl font-bold text-primary">10M+</div>
                  <div className="text-sm text-muted-foreground">Threats Blocked</div>
                </div>
                
                <div className="absolute -top-6 -right-6 cyber-glass rounded-xl p-4">
                  <div className="text-2xl font-bold text-secondary">99.9%</div>
                  <div className="text-sm text-muted-foreground">Detection Rate</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 relative">
          <div className="cyber-container">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-6">
                <Zap className="w-4 h-4 mr-2 text-secondary" />
                <span className="text-sm font-medium text-secondary">Advanced Protection</span>
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                Enterprise-Grade Security
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Comprehensive cybersecurity solutions designed for modern threats. 
                Protect, detect, and respond with cutting-edge technology.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="cyber-glass hover-lift border-border/20 group">
                <CardContent className="p-8">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary/30 transition-colors">
                    <Eye className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Real-time Monitoring</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    24/7 surveillance of your digital infrastructure with AI-powered 
                    threat detection and instant alert systems.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="cyber-glass hover-lift border-border/20 group">
                <CardContent className="p-8">
                  <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center mb-6 group-hover:bg-secondary/30 transition-colors">
                    <Lock className="w-6 h-6 text-secondary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Zero-Trust Security</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Advanced encryption and access controls ensure only authorized 
                    users can access your critical systems and data.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="cyber-glass hover-lift border-border/20 group">
                <CardContent className="p-8">
                  <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center mb-6 group-hover:bg-accent/30 transition-colors">
                    <Shield className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Threat Intelligence</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Machine learning algorithms analyze global threat patterns 
                    to predict and prevent cyber attacks before they happen.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="cyber-glass hover-lift border-border/20 group">
                <CardContent className="p-8">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary/30 transition-colors">
                    <Globe className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Global Protection</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Worldwide network of security nodes providing comprehensive 
                    coverage and protection across all geographic regions.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="cyber-glass hover-lift border-border/20 group">
                <CardContent className="p-8">
                  <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center mb-6 group-hover:bg-secondary/30 transition-colors">
                    <Users className="w-6 h-6 text-secondary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Expert Support</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Dedicated cybersecurity experts available around the clock 
                    to assist with threat response and system optimization.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="cyber-glass hover-lift border-border/20 group">
                <CardContent className="p-8">
                  <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center mb-6 group-hover:bg-accent/30 transition-colors">
                    <TrendingUp className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Advanced Analytics</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Comprehensive reporting and analytics provide insights into 
                    security posture and threat landscape trends.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-20 cyber-gradient-blue">
          <div className="cyber-container">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="space-y-6">
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                    <Shield className="w-4 h-4 mr-2 text-primary" />
                    <span className="text-sm font-medium text-primary">Trusted by Industry Leaders</span>
                  </div>
                  
                  <h2 className="text-4xl lg:text-5xl font-bold">
                    Redefining Cybersecurity Standards
                  </h2>
                  
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    Built by security experts, CyberGuard Safe Zone represents the next evolution 
                    in digital protection. Our platform combines cutting-edge AI, quantum-resistant 
                    encryption, and human expertise to create an impenetrable security ecosystem.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <div className="text-3xl font-bold text-primary mb-2">500+</div>
                    <div className="text-muted-foreground">Enterprise Clients</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-secondary mb-2">10B+</div>
                    <div className="text-muted-foreground">Threats Neutralized</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-accent mb-2">99.99%</div>
                    <div className="text-muted-foreground">Uptime Guaranteed</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary mb-2">150+</div>
                    <div className="text-muted-foreground">Countries Protected</div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="cyber-glow rounded-2xl overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80"
                    alt="Cybersecurity dashboard and monitoring systems"
                    className="w-full h-[400px] object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 cyber-gradient-accent opacity-90"></div>
          <div className="relative cyber-container">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <h2 className="text-4xl lg:text-6xl font-bold text-white">
                Ready to Secure Your Future?
              </h2>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                Join thousands of organizations worldwide who trust CyberGuard Safe Zone 
                to protect their most valuable digital assets.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <Link to="/report">
                  <Button size="lg" className="bg-white text-background hover:bg-white/90 w-full sm:w-auto">
                    Start Free Trial
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 w-full sm:w-auto">
                    Schedule Demo
                  </Button>
                </Link>
              </div>
              
              <div className="flex justify-center items-center gap-8 text-white/60 text-sm">
                <span>✓ 30-day free trial</span>
                <span>✓ No credit card required</span>
                <span>✓ Full feature access</span>
              </div>
            </div>
          </div>
        </section>
      </PageLayout>
    </div>
  );
};

export default Home;