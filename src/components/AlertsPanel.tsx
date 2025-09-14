import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle, Info, Clock, Bell, Shield } from 'lucide-react';

const AlertsPanel: React.FC = () => {
  const alerts = [
    {
      id: 1,
      type: 'critical',
      title: 'Oxygen Level Warning',
      message: 'Cabin oxygen levels dropped to 19.2%. Immediate attention required.',
      time: '2 minutes ago',
      acknowledged: false,
      category: 'Environmental'
    },
    {
      id: 2,
      type: 'warning',
      title: 'Heart Rate Elevated',
      message: 'Heart rate consistently above 90 BPM for 15 minutes during rest period.',
      time: '12 minutes ago',
      acknowledged: false,
      category: 'Vital Signs'
    },
    {
      id: 3,
      type: 'info',
      title: 'Medication Reminder',
      message: 'Time for daily vitamin D supplement.',
      time: '1 hour ago',
      acknowledged: true,
      category: 'Medication'
    },
    {
      id: 4,
      type: 'success',
      title: 'System Check Complete',
      message: 'All health monitoring systems functioning normally.',
      time: '2 hours ago',
      acknowledged: true,
      category: 'System'
    }
  ];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical':
      case 'warning':
        return AlertTriangle;
      case 'success':
        return CheckCircle;
      default:
        return Info;
    }
  };

  const getAlertVariant = (type: string) => {
    switch (type) {
      case 'critical':
        return 'destructive';
      case 'warning':
        return 'warning';
      case 'success':
        return 'success';
      default:
        return 'secondary';
    }
  };

  const getAlertGlow = (type: string) => {
    switch (type) {
      case 'critical':
        return 'shadow-red-500/20 shadow-lg';
      case 'warning':
        return 'glow-warning';
      case 'success':
        return 'glow-success';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4 mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Alert Management System
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Real-time monitoring and intelligent alerts for astronaut health and safety.
        </p>
      </div>

      {/* Alert Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="gradient-card border-border/20 backdrop-blur-sm text-center">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-destructive mb-2">1</div>
            <div className="text-sm text-muted-foreground">Critical</div>
          </CardContent>
        </Card>
        <Card className="gradient-card border-border/20 backdrop-blur-sm text-center">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-warning mb-2">1</div>
            <div className="text-sm text-muted-foreground">Warning</div>
          </CardContent>
        </Card>
        <Card className="gradient-card border-border/20 backdrop-blur-sm text-center">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-primary mb-2">1</div>
            <div className="text-sm text-muted-foreground">Info</div>
          </CardContent>
        </Card>
        <Card className="gradient-card border-border/20 backdrop-blur-sm text-center">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-success mb-2">1</div>
            <div className="text-sm text-muted-foreground">Resolved</div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-4 mb-6">
        <Button variant="outline" className="flex items-center gap-2">
          <Bell className="h-4 w-4" />
          Acknowledge All
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <Shield className="h-4 w-4" />
          Emergency Protocol
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          Alert History
        </Button>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {alerts.map((alert) => {
          const IconComponent = getAlertIcon(alert.type);
          return (
            <Card
              key={alert.id}
              className={`gradient-card border-border/20 backdrop-blur-sm ${getAlertGlow(alert.type)} transition-all duration-300 ${
                !alert.acknowledged ? 'animate-pulse-glow' : 'opacity-70'
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-full ${
                      alert.type === 'critical' ? 'bg-destructive/20' :
                      alert.type === 'warning' ? 'bg-warning/20' :
                      alert.type === 'success' ? 'bg-success/20' :
                      'bg-primary/20'
                    }`}>
                      <IconComponent className={`h-5 w-5 ${
                        alert.type === 'critical' ? 'text-destructive' :
                        alert.type === 'warning' ? 'text-warning' :
                        alert.type === 'success' ? 'text-success' :
                        'text-primary'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold">{alert.title}</h3>
                        <Badge variant={getAlertVariant(alert.type) as any} className="text-xs">
                          {alert.type.toUpperCase()}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {alert.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{alert.message}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {alert.time}
                        </span>
                        {alert.acknowledged && (
                          <span className="flex items-center gap-1 text-success">
                            <CheckCircle className="h-3 w-3" />
                            Acknowledged
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {!alert.acknowledged && (
                      <Button size="sm" variant="outline">
                        Acknowledge
                      </Button>
                    )}
                    <Button size="sm" variant="ghost">
                      Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default AlertsPanel;