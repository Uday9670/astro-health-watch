import React, { useState, useEffect } from 'react';
import VitalSignCard from './VitalSignCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Thermometer, Activity, Droplet, Brain, Zap, AlertCircle, CheckCircle } from 'lucide-react';
import astronautHero from '@/assets/astronaut-hero.jpg';

const Dashboard: React.FC = () => {
  const [vitals, setVitals] = useState({
    heartRate: { value: 72, status: 'normal' as const, trend: 'stable' as const },
    temperature: { value: 98.6, status: 'normal' as const, trend: 'stable' as const },
    bloodPressure: { value: '120/80', status: 'normal' as const, trend: 'stable' as const },
    oxygenSaturation: { value: 98, status: 'normal' as const, trend: 'up' as const },
    stressLevel: { value: 15, status: 'normal' as const, trend: 'down' as const },
    activity: { value: 65, status: 'normal' as const, trend: 'up' as const },
  });

  const [alerts] = useState([
    { id: 1, type: 'info', message: 'Routine health check completed', time: '2 min ago' },
    { id: 2, type: 'success', message: 'All vital signs within normal range', time: '5 min ago' },
    { id: 3, type: 'warning', message: 'Reminder: Hydration break in 30 minutes', time: '15 min ago' },
  ]);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setVitals(prev => ({
        ...prev,
        heartRate: {
          ...prev.heartRate,
          value: 70 + Math.floor(Math.random() * 10),
        },
        oxygenSaturation: {
          ...prev.oxygenSaturation,
          value: 96 + Math.floor(Math.random() * 4),
        },
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-transparent z-10" />
        <img 
          src={astronautHero} 
          alt="Astronaut Health Monitoring"
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 z-20 flex items-center px-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Astronaut Health Monitor
            </h1>
            <p className="text-lg text-muted-foreground max-w-md">
              Real-time vital signs monitoring and AI-powered health insights for space missions.
            </p>
            <Button variant="hero" className="animate-pulse-glow">
              <Activity className="h-4 w-4" />
              View Live Data
            </Button>
          </div>
        </div>
      </div>

      {/* Vital Signs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <VitalSignCard
          title="Heart Rate"
          value={vitals.heartRate.value.toString()}
          unit="BPM"
          status={vitals.heartRate.status}
          icon={Heart}
          trend={vitals.heartRate.trend}
        />
        <VitalSignCard
          title="Temperature"
          value={vitals.temperature.value.toFixed(1)}
          unit="°F"
          status={vitals.temperature.status}
          icon={Thermometer}
          trend={vitals.temperature.trend}
        />
        <VitalSignCard
          title="Blood Pressure"
          value={vitals.bloodPressure.value}
          unit="mmHg"
          status={vitals.bloodPressure.status}
          icon={Activity}
          trend={vitals.bloodPressure.trend}
        />
        <VitalSignCard
          title="Oxygen Saturation"
          value={vitals.oxygenSaturation.value.toString()}
          unit="%"
          status={vitals.oxygenSaturation.status}
          icon={Droplet}
          trend={vitals.oxygenSaturation.trend}
        />
        <VitalSignCard
          title="Stress Level"
          value={vitals.stressLevel.value.toString()}
          unit="%"
          status={vitals.stressLevel.status}
          icon={Brain}
          trend={vitals.stressLevel.trend}
        />
        <VitalSignCard
          title="Activity Level"
          value={vitals.activity.value.toString()}
          unit="%"
          status={vitals.activity.status}
          icon={Zap}
          trend={vitals.activity.trend}
        />
      </div>

      {/* Recent Alerts */}
      <Card className="gradient-card border-border/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-primary" />
            Recent Alerts & Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div key={alert.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/20 border border-border/10">
                <div className="flex items-center gap-3">
                  {alert.type === 'success' ? (
                    <CheckCircle className="h-4 w-4 text-success" />
                  ) : alert.type === 'warning' ? (
                    <AlertCircle className="h-4 w-4 text-warning" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-primary" />
                  )}
                  <span className="text-sm">{alert.message}</span>
                </div>
                <Badge variant="outline" className="text-xs">
                  {alert.time}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;