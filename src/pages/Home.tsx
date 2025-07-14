
import { Link } from 'react-router-dom';
import { Shield, Heart, AlertTriangle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import PageLayout from '@/components/PageLayout';
import sadChildImage from '@/assets/sad-child-africa.jpg';

const Home = () => {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="tech-section bg-gradient-to-br from-[hsl(var(--tech-surface))] via-[hsl(var(--tech-blue-light))] to-[hsl(var(--tech-purple-light))]">
        <div className="tech-container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 fade-in-up">
              <h1 className="tech-hero-text text-[hsl(var(--foreground))]">
                Protecting Students in the 
                <span className="tech-gradient-text"> Digital World</span>
              </h1>
              <p className="tech-body-text max-w-2xl">
                CyberGuard helps schools detect, prevent, and address cyberbullying incidents
                to create a safer learning environment for all students.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 pt-4">
                <Link to="/report">
                  <Button className="tech-button-primary text-lg">Report an Incident</Button>
                </Link>
                <Link to="/dashboard">
                  <Button className="tech-button-secondary text-lg">View Dashboard</Button>
                </Link>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <img 
                  src="https://www.crisisprevention.com/contentassets/aa97c2d1ad6a4d74a688c072feb84619/bullytrauma_498574384.jpg?format=webp&ranchor=5"
                  alt="Child experiencing bullying - representing the need for safe digital environments"
                  className="rounded-3xl shadow-[var(--shadow-elegant)] max-h-[500px] w-full object-cover floating-animation"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--tech-blue)_/_0.1)] to-transparent rounded-3xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="tech-section bg-[hsl(var(--tech-surface))]">
        <div className="tech-container">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-light text-[hsl(var(--foreground))] mb-6 tracking-tight">
              How <span className="tech-gradient-text">CyberGuard</span> Helps
            </h2>
            <p className="tech-body-text max-w-3xl mx-auto">
              Our comprehensive approach helps schools create a safer digital environment
              for all students through early detection and intervention.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="tech-card text-center group">
              <div className="tech-icon-container mx-auto">
                <AlertTriangle className="h-8 w-8 text-[hsl(var(--tech-blue))] scale-on-hover" />
              </div>
              <h3 className="text-2xl font-medium mb-4 text-[hsl(var(--foreground))]">Early Detection</h3>
              <p className="tech-body-text text-base">
                Identify potential cyberbullying incidents before they escalate 
                through our anonymous reporting system.
              </p>
            </div>
            
            <div className="tech-card text-center group">
              <div className="tech-icon-container mx-auto">
                <Heart className="h-8 w-8 text-[hsl(var(--tech-green))] scale-on-hover" />
              </div>
              <h3 className="text-2xl font-medium mb-4 text-[hsl(var(--foreground))]">Support Resources</h3>
              <p className="tech-body-text text-base">
                Provide students and staff with resources to address cyberbullying
                and promote positive digital citizenship.
              </p>
            </div>
            
            <div className="tech-card text-center group">
              <div className="tech-icon-container mx-auto">
                <CheckCircle className="h-8 w-8 text-[hsl(var(--tech-purple))] scale-on-hover" />
              </div>
              <h3 className="text-2xl font-medium mb-4 text-[hsl(var(--foreground))]">Data Insights</h3>
              <p className="tech-body-text text-base">
                Track patterns and trends to develop effective prevention 
                strategies tailored to your school's needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="tech-section bg-gradient-to-b from-[hsl(var(--tech-blue-light))] to-[hsl(var(--tech-green-light))]">
        <div className="tech-container">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-light text-[hsl(var(--foreground))] mb-6 tracking-tight">How It Works</h2>
            <p className="tech-body-text max-w-3xl mx-auto">
              CyberGuard makes it simple to report and address cyberbullying incidents.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="tech-glass rounded-3xl p-8 text-center group hover:scale-105 transition-all duration-500">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[hsl(var(--tech-blue))] to-[hsl(var(--tech-purple))] 
                            flex items-center justify-center mx-auto mb-6 shadow-[var(--shadow-tech)]">
                <span className="text-3xl font-light text-white">1</span>
              </div>
              <h3 className="text-xl font-medium mb-4 text-[hsl(var(--foreground))]">Report Incident</h3>
              <p className="text-[hsl(var(--tech-gray-light))] leading-relaxed">
                Students or witnesses anonymously submit information about cyberbullying incidents.
              </p>
            </div>
            
            <div className="tech-glass rounded-3xl p-8 text-center group hover:scale-105 transition-all duration-500">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[hsl(var(--tech-green))] to-[hsl(var(--tech-blue))] 
                            flex items-center justify-center mx-auto mb-6 shadow-[var(--shadow-tech)]">
                <span className="text-3xl font-light text-white">2</span>
              </div>
              <h3 className="text-xl font-medium mb-4 text-[hsl(var(--foreground))]">Review & Assessment</h3>
              <p className="text-[hsl(var(--tech-gray-light))] leading-relaxed">
                School staff review submitted reports and assess the severity and appropriate response.
              </p>
            </div>
            
            <div className="tech-glass rounded-3xl p-8 text-center group hover:scale-105 transition-all duration-500">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[hsl(var(--tech-purple))] to-[hsl(var(--tech-green))] 
                            flex items-center justify-center mx-auto mb-6 shadow-[var(--shadow-tech)]">
                <span className="text-3xl font-light text-white">3</span>
              </div>
              <h3 className="text-xl font-medium mb-4 text-[hsl(var(--foreground))]">Take Action</h3>
              <p className="text-[hsl(var(--tech-gray-light))] leading-relaxed">
                Implement appropriate interventions based on school policies and provide support resources.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="tech-section bg-[hsl(var(--tech-surface))]">
        <div className="tech-container">
          <div className="relative">
            <div className="bg-gradient-to-br from-[hsl(var(--tech-blue))] to-[hsl(var(--tech-purple))] 
                          rounded-3xl p-12 lg:p-16 text-center shadow-[var(--shadow-elegant)] overflow-hidden">
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
              
              <div className="relative z-10 max-w-4xl mx-auto">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-6 tracking-tight">
                  Ready to create a safer digital environment?
                </h2>
                <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
                  Join schools across the country that are taking a stand against cyberbullying.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-6">
                  <Link to="/report">
                    <Button className="bg-white text-[hsl(var(--tech-blue))] hover:bg-white/90 
                                     px-10 py-4 text-lg font-medium rounded-xl 
                                     hover:scale-105 transition-all duration-300 shadow-lg">
                      Report an Incident
                    </Button>
                  </Link>
                  <Link to="/dashboard">
                    <Button className="bg-transparent border-2 border-white text-white 
                                     hover:bg-white hover:text-[hsl(var(--tech-blue))] 
                                     px-10 py-4 text-lg font-medium rounded-xl 
                                     hover:scale-105 transition-all duration-300">
                      View Dashboard
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Home;
