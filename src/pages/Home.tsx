
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
      <section className="bg-gradient-to-b from-cyberguard-light-blue to-white py-16">
        <div className="cg-container">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                Protecting Students in the Digital World
              </h1>
              <p className="text-lg text-gray-600 max-w-lg">
                CyberGuard helps schools detect, prevent, and address cyberbullying incidents
                to create a safer learning environment for all students.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/report">
                  <Button className="cg-button-primary w-full sm:w-auto">Report an Incident</Button>
                </Link>
                <Link to="/dashboard">
                  <Button variant="outline" className="w-full sm:w-auto">View Dashboard</Button>
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <img 
                src="/src/assets/sad-child-africa.jpg"
                alt="Child experiencing bullying - representing the need for safe digital environments"
                className="rounded-xl shadow-lg max-h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="cg-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-gray-800 mb-3">How CyberGuard Helps</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our comprehensive approach helps schools create a safer digital environment
              for all students through early detection and intervention.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="cg-card">
              <CardContent className="pt-6 text-center">
                <div className="mb-4 flex justify-center">
                  <AlertTriangle className="h-12 w-12 text-cyberguard-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Early Detection</h3>
                <p className="text-gray-600">
                  Identify potential cyberbullying incidents before they escalate 
                  through our anonymous reporting system.
                </p>
              </CardContent>
            </Card>
            
            <Card className="cg-card">
              <CardContent className="pt-6 text-center">
                <div className="mb-4 flex justify-center">
                  <Heart className="h-12 w-12 text-cyberguard-green" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Support Resources</h3>
                <p className="text-gray-600">
                  Provide students and staff with resources to address cyberbullying
                  and promote positive digital citizenship.
                </p>
              </CardContent>
            </Card>
            
            <Card className="cg-card">
              <CardContent className="pt-6 text-center">
                <div className="mb-4 flex justify-center">
                  <CheckCircle className="h-12 w-12 text-cyberguard-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Data Insights</h3>
                <p className="text-gray-600">
                  Track patterns and trends to develop effective prevention 
                  strategies tailored to your school's needs.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-cyberguard-light-green">
        <div className="cg-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-gray-800 mb-3">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              CyberGuard makes it simple to report and address cyberbullying incidents.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow flex flex-col items-center text-center">
              <div className="bg-cyberguard-light-blue h-12 w-12 rounded-full flex items-center justify-center mb-4">
                <span className="font-semibold text-cyberguard-blue">1</span>
              </div>
              <h3 className="text-lg font-medium mb-2">Report Incident</h3>
              <p className="text-sm text-gray-600">
                Students or witnesses anonymously submit information about cyberbullying incidents.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow flex flex-col items-center text-center">
              <div className="bg-cyberguard-light-blue h-12 w-12 rounded-full flex items-center justify-center mb-4">
                <span className="font-semibold text-cyberguard-blue">2</span>
              </div>
              <h3 className="text-lg font-medium mb-2">Review & Assessment</h3>
              <p className="text-sm text-gray-600">
                School staff review submitted reports and assess the severity and appropriate response.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow flex flex-col items-center text-center">
              <div className="bg-cyberguard-light-blue h-12 w-12 rounded-full flex items-center justify-center mb-4">
                <span className="font-semibold text-cyberguard-blue">3</span>
              </div>
              <h3 className="text-lg font-medium mb-2">Take Action</h3>
              <p className="text-sm text-gray-600">
                Implement appropriate interventions based on school policies and provide support resources.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="cg-container">
          <div className="bg-cyberguard-blue rounded-xl p-8 md:p-12">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Ready to create a safer digital environment?
              </h2>
              <p className="text-blue-100 mb-6">
                Join schools across the country that are taking a stand against cyberbullying.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/report">
                  <Button className="bg-white text-cyberguard-blue hover:bg-gray-100 w-full sm:w-auto">
                    Report an Incident
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button variant="outline" className="border-white text-black hover:bg-blue-700 w-full sm:w-auto">
                    View Dashboard
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Home;
