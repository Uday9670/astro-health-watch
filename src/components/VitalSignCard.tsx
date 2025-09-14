import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LucideIcon } from 'lucide-react';

interface VitalSignCardProps {
  title: string;
  value: string;
  unit: string;
  status: 'normal' | 'warning' | 'critical';
  icon: LucideIcon;
  trend?: 'up' | 'down' | 'stable';
  lastUpdate?: string;
}

const VitalSignCard: React.FC<VitalSignCardProps> = ({
  title,
  value,
  unit,
  status,
  icon: Icon,
  trend,
  lastUpdate = 'Just now'
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'normal': return 'success';
      case 'warning': return 'warning';
      case 'critical': return 'destructive';
      default: return 'secondary';
    }
  };

  const getCardGlow = () => {
    switch (status) {
      case 'normal': return 'glow-success';
      case 'warning': return 'glow-warning';
      case 'critical': return 'shadow-red-500/20 shadow-lg';
      default: return '';
    }
  };

  return (
    <Card className={`gradient-card border-border/20 backdrop-blur-sm ${getCardGlow()} transition-all duration-300 hover:scale-105`}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between text-sm font-medium">
          <div className="flex items-center gap-2">
            <Icon className="h-4 w-4 text-primary" />
            {title}
          </div>
          <Badge variant={getStatusColor() as any} className="text-xs">
            {status.toUpperCase()}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-primary">{value}</span>
            <span className="text-sm text-muted-foreground">{unit}</span>
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Updated {lastUpdate}</span>
            {trend && (
              <span className={`flex items-center gap-1 ${
                trend === 'up' ? 'text-success' : 
                trend === 'down' ? 'text-destructive' : 
                'text-muted-foreground'
              }`}>
                {trend === 'up' ? '↗' : trend === 'down' ? '↘' : '→'} {trend}
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VitalSignCard;