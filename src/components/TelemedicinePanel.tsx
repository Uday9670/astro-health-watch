import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Video, Phone, MessageSquare, User, Clock, Wifi } from 'lucide-react';

const TelemedicinePanel: React.FC = () => {
  const upcomingConsultations = [
    {
      id: 1,
      doctor: 'Dr. Sarah Chen',
      specialty: 'Space Medicine',
      time: '14:30 UTC',
      date: 'Today',
      type: 'video',
      status: 'scheduled'
    },
    {
      id: 2,
      doctor: 'Dr. Michael Rodriguez',
      specialty: 'Cardiology',
      time: '09:00 UTC',
      date: 'Tomorrow',
      type: 'audio',
      status: 'confirmed'
    }
  ];

  const recentConsultations = [
    {
      id: 1,
      doctor: 'Dr. Emily Watson',
      specialty: 'Psychology',
      date: '2 days ago',
      duration: '45 min',
      summary: 'Mental health assessment completed. Stress levels within normal range.'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4 mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Telemedicine Center
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Connect with ground-based medical experts for consultations, diagnostics, and health support.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Button variant="medical" className="h-16 flex-col">
          <Video className="h-6 w-6 mb-2" />
          Emergency Call
        </Button>
        <Button variant="outline" className="h-16 flex-col">
          <MessageSquare className="h-6 w-6 mb-2" />
          Send Message
        </Button>
        <Button variant="outline" className="h-16 flex-col">
          <Phone className="h-6 w-6 mb-2" />
          Schedule Call
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Consultations */}
        <Card className="gradient-card border-border/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Upcoming Consultations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingConsultations.map((consultation) => (
                <div key={consultation.id} className="p-4 rounded-lg bg-secondary/20 border border-border/10">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <User className="h-4 w-4 text-primary" />
                      <div>
                        <p className="font-medium">{consultation.doctor}</p>
                        <p className="text-sm text-muted-foreground">{consultation.specialty}</p>
                      </div>
                    </div>
                    <Badge variant={consultation.status === 'confirmed' ? 'success' : 'outline'}>
                      {consultation.status}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{consultation.date}</span>
                      <span>{consultation.time}</span>
                      <span className="flex items-center gap-1">
                        {consultation.type === 'video' ? <Video className="h-3 w-3" /> : <Phone className="h-3 w-3" />}
                        {consultation.type}
                      </span>
                    </div>
                    <Button size="sm" variant="outline">
                      Join
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Connection Status */}
        <Card className="gradient-card border-border/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wifi className="h-5 w-5 text-success" />
              Communication Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-success/10 border border-success/20">
                <span className="text-sm">Earth-Station Link</span>
                <Badge variant="success">Connected</Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-success/10 border border-success/20">
                <span className="text-sm">Medical Network</span>
                <Badge variant="success">Active</Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-warning/10 border border-warning/20">
                <span className="text-sm">Emergency Channel</span>
                <Badge variant="warning">Standby</Badge>
              </div>
              <div className="text-center pt-4">
                <p className="text-sm text-muted-foreground mb-2">Signal Strength: 89%</p>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-success h-2 rounded-full" style={{ width: '89%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Consultations */}
      <Card className="gradient-card border-border/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Recent Consultations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentConsultations.map((consultation) => (
              <div key={consultation.id} className="p-4 rounded-lg bg-secondary/20 border border-border/10">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium">{consultation.doctor}</p>
                    <p className="text-sm text-muted-foreground">{consultation.specialty}</p>
                    <p className="text-sm mt-2">{consultation.summary}</p>
                  </div>
                  <div className="text-right text-sm text-muted-foreground">
                    <p>{consultation.date}</p>
                    <p>{consultation.duration}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TelemedicinePanel;