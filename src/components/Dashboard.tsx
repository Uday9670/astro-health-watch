import React from 'react';
import VitalSignCard from './VitalSignCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Thermometer, Activity, Droplet, Brain, Zap, AlertCircle, CheckCircle, Wifi, Battery, Cpu } from 'lucide-react';
import { useHealthData } from '@/hooks/useHealthData';
import astronautHero from '@/assets/astronaut-hero.jpg';

const Dashboard: React.FC = () => {
  const { vitals, fdaAlerts, deviceInfo, isLoading, getVitalStatus } = useHealthData(3000);

  // Combine FDA alerts with system alerts
  const systemAlerts = [
    { id: 'sys1', type: 'info', message: 'Medical device sync completed', time: '1 min ago' },
    { id: 'sys2', type: 'success', message: 'All systems operational', time: '3 min ago' },
    ...fdaAlerts.slice(0, 2) // Add recent FDA alerts
  ];

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

      {/* Device Status Card */}
      {deviceInfo && (
        <Card className="gradient-card border-border/20 backdrop-blur-sm mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cpu className="h-5 w-5 text-primary" />
              Medical Device Status - {deviceInfo.model}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <Battery className="h-4 w-4 text-success" />
                <span className="text-sm">Battery: {deviceInfo.batteryLevel}%</span>
              </div>
              <div className="flex items-center gap-2">
                <Wifi className="h-4 w-4 text-success" />
                <span className="text-sm">Signal: {deviceInfo.signalStrength}%</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-success" />
                <span className="text-sm">Status: Active</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Vital Signs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vitals && (
          <>
            <VitalSignCard
              title="Heart Rate"
              value={vitals.heartRate.value.toString()}
              unit="BPM"
              status={getVitalStatus('heartRate', vitals.heartRate.value)}
              icon={Heart}
              trend={vitals.heartRate.trend as any}
              lastUpdate="Live"
            />
            <VitalSignCard
              title="Temperature"
              value={vitals.temperature.value.toFixed(1)}
              unit="°F"
              status={getVitalStatus('temperature', vitals.temperature.value)}
              icon={Thermometer}
              trend={vitals.temperature.trend as any}
              lastUpdate="Live"
            />
            <VitalSignCard
              title="Blood Pressure"
              value={`${vitals.bloodPressure.systolic}/${vitals.bloodPressure.diastolic}`}
              unit="mmHg"
              status={getVitalStatus('heartRate', vitals.bloodPressure.systolic)} 
              icon={Activity}
              trend={vitals.bloodPressure.trend as any}
              lastUpdate="Live"
            />
            <VitalSignCard
              title="Oxygen Saturation"
              value={vitals.oxygenSaturation.value.toString()}
              unit="%"
              status={getVitalStatus('oxygenSaturation', vitals.oxygenSaturation.value)}
              icon={Droplet}
              trend={vitals.oxygenSaturation.trend as any}
              lastUpdate="Live"
            />
            <VitalSignCard
              title="Respiratory Rate"
              value={vitals.respiratoryRate.value.toString()}
              unit="BPM"
              status={getVitalStatus('respiratoryRate', vitals.respiratoryRate.value)}
              icon={Activity}
              trend={vitals.respiratoryRate.trend as any}
              lastUpdate="Live"
            />
            <VitalSignCard
              title="Stress Level"
              value={vitals.stressLevel.value.toString()}
              unit="%"
              status={getVitalStatus('stressLevel', vitals.stressLevel.value)}
              icon={Brain}
              trend={vitals.stressLevel.trend as any}
              lastUpdate="Live"
            />
          </>
        )}
        {isLoading && (
          <div className="col-span-full text-center py-8 text-muted-foreground">
            Loading real-time health data...
          </div>
        )}
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
            {systemAlerts.map((alert) => (
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
                  {alert.source && (
                    <Badge variant="secondary" className="text-xs">
                      {alert.source}
                    </Badge>
                  )}
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