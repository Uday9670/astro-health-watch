import React from 'react';
import { Button } from '@/components/ui/button';
import { Activity, Users, Brain, Stethoscope, AlertTriangle } from 'lucide-react';

interface NavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeSection, setActiveSection }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'vitals', label: 'Vital Signs', icon: Stethoscope },
    { id: 'alerts', label: 'Alerts', icon: AlertTriangle },
    { id: 'telemedicine', label: 'Telemedicine', icon: Users },
    { id: 'mental-health', label: 'Mental Health', icon: Brain },
  ];

  return (
    <nav className="flex flex-wrap gap-2 mb-8">
      {navItems.map(({ id, label, icon: Icon }) => (
        <Button
          key={id}
          variant={activeSection === id ? 'medical' : 'outline'}
          onClick={() => setActiveSection(id)}
          className="flex items-center gap-2"
        >
          <Icon className="h-4 w-4" />
          {label}
        </Button>
      ))}
    </nav>
  );
};

export default Navigation;