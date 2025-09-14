import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Dashboard from '@/components/Dashboard';
import VitalSignCard from '@/components/VitalSignCard';
import TelemedicinePanel from '@/components/TelemedicinePanel';
import AlertsPanel from '@/components/AlertsPanel';
import MentalHealthPanel from '@/components/MentalHealthPanel';
import { Heart, Thermometer, Activity, Droplet, Brain, Zap } from 'lucide-react';

const Index = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  // Sample vital signs data for the vitals section
  const vitalSigns = [
    {
      title: "Heart Rate",
      value: "72",
      unit: "BPM",
      status: 'normal' as const,
      icon: Heart,
      trend: 'stable' as const
    },
    {
      title: "Temperature",
      value: "98.6",
      unit: "°F",
      status: 'normal' as const,
      icon: Thermometer,
      trend: 'stable' as const
    },
    {
      title: "Blood Pressure",
      value: "120/80",
      unit: "mmHg",
      status: 'normal' as const,
      icon: Activity,
      trend: 'stable' as const
    },
    {
      title: "Oxygen Saturation",
      value: "98",
      unit: "%",
      status: 'normal' as const,
      icon: Droplet,
      trend: 'up' as const
    },
    {
      title: "Stress Level",
      value: "15",
      unit: "%",
      status: 'normal' as const,
      icon: Brain,
      trend: 'down' as const
    },
    {
      title: "Activity Level",
      value: "65",
      unit: "%",
      status: 'normal' as const,
      icon: Zap,
      trend: 'up' as const
    }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'vitals':
        return (
          <div className="space-y-6">
            <div className="text-center space-y-4 mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Vital Signs Monitoring
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Real-time physiological data tracking with AI-powered anomaly detection.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vitalSigns.map((vital, index) => (
                <VitalSignCard
                  key={index}
                  title={vital.title}
                  value={vital.value}
                  unit={vital.unit}
                  status={vital.status}
                  icon={vital.icon}
                  trend={vital.trend}
                />
              ))}
            </div>
          </div>
        );
      case 'alerts':
        return <AlertsPanel />;
      case 'telemedicine':
        return <TelemedicinePanel />;
      case 'mental-health':
        return <MentalHealthPanel />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
        {renderContent()}
      </div>
    </div>
  );
};

export default Index;