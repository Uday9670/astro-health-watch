import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, Heart, Smile, CloudRain, Sun, Moon, Activity, Users } from 'lucide-react';

const MentalHealthPanel: React.FC = () => {
  const [mood, setMood] = useState('good');
  
  const mentalHealthMetrics = {
    stressLevel: 25,
    sleepQuality: 85,
    moodScore: 78,
    socialConnectedness: 65,
    cognitivePerformance: 92
  };

  const moodOptions = [
    { id: 'excellent', icon: Sun, label: 'Excellent', color: 'text-success' },
    { id: 'good', icon: Smile, label: 'Good', color: 'text-primary' },
    { id: 'neutral', icon: CloudRain, label: 'Neutral', color: 'text-muted-foreground' },
    { id: 'low', icon: Moon, label: 'Low', color: 'text-warning' }
  ];

  const assessmentResults = [
    {
      category: 'Sleep Quality',
      score: 85,
      status: 'Good',
      recommendation: 'Maintain current sleep schedule'
    },
    {
      category: 'Stress Management',
      score: 75,
      status: 'Moderate',
      recommendation: 'Consider meditation exercises'
    },
    {
      category: 'Social Connection',
      score: 65,
      status: 'Fair',
      recommendation: 'Schedule more team activities'
    }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-destructive';
  };

  const getProgressColor = (score: number) => {
    if (score >= 80) return 'bg-success';
    if (score >= 60) return 'bg-warning';
    return 'bg-destructive';
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4 mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Mental Health & Wellbeing
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Comprehensive psychological support and mental health monitoring for optimal mission performance.
        </p>
      </div>

      {/* Daily Mood Check-in */}
      <Card className="gradient-card border-border/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-primary" />
            Daily Mood Check-in
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {moodOptions.map((option) => {
              const IconComponent = option.icon;
              return (
                <Button
                  key={option.id}
                  variant={mood === option.id ? 'medical' : 'outline'}
                  onClick={() => setMood(option.id)}
                  className="h-20 flex-col"
                >
                  <IconComponent className={`h-6 w-6 mb-2 ${option.color}`} />
                  {option.label}
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Mental Health Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="gradient-card border-border/20 backdrop-blur-sm text-center">
          <CardContent className="pt-6">
            <Brain className="h-8 w-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold mb-1">{mentalHealthMetrics.stressLevel}%</div>
            <div className="text-sm text-muted-foreground">Stress Level</div>
          </CardContent>
        </Card>
        <Card className="gradient-card border-border/20 backdrop-blur-sm text-center">
          <CardContent className="pt-6">
            <Moon className="h-8 w-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold mb-1">{mentalHealthMetrics.sleepQuality}%</div>
            <div className="text-sm text-muted-foreground">Sleep Quality</div>
          </CardContent>
        </Card>
        <Card className="gradient-card border-border/20 backdrop-blur-sm text-center">
          <CardContent className="pt-6">
            <Smile className="h-8 w-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold mb-1">{mentalHealthMetrics.moodScore}%</div>
            <div className="text-sm text-muted-foreground">Mood Score</div>
          </CardContent>
        </Card>
        <Card className="gradient-card border-border/20 backdrop-blur-sm text-center">
          <CardContent className="pt-6">
            <Users className="h-8 w-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold mb-1">{mentalHealthMetrics.socialConnectedness}%</div>
            <div className="text-sm text-muted-foreground">Social</div>
          </CardContent>
        </Card>
        <Card className="gradient-card border-border/20 backdrop-blur-sm text-center">
          <CardContent className="pt-6">
            <Activity className="h-8 w-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold mb-1">{mentalHealthMetrics.cognitivePerformance}%</div>
            <div className="text-sm text-muted-foreground">Cognitive</div>
          </CardContent>
        </Card>
      </div>

      {/* Assessment Results */}
      <Card className="gradient-card border-border/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Recent Assessment Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {assessmentResults.map((result, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{result.category}</span>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-medium ${getScoreColor(result.score)}`}>
                      {result.score}%
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {result.status}
                    </Badge>
                  </div>
                </div>
                <Progress value={result.score} className="h-2" />
                <p className="text-sm text-muted-foreground">{result.recommendation}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Wellness Activities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="gradient-card border-border/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Recommended Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Brain className="h-4 w-4 mr-2" />
                5-Minute Meditation
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Activity className="h-4 w-4 mr-2" />
                Breathing Exercise
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Users className="h-4 w-4 mr-2" />
                Team Chat Session
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Sun className="h-4 w-4 mr-2" />
                Light Therapy
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card border-border/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Support Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button variant="medical" className="w-full justify-start">
                <Heart className="h-4 w-4 mr-2" />
                Emergency Counseling
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Brain className="h-4 w-4 mr-2" />
                Cognitive Assessment
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Moon className="h-4 w-4 mr-2" />
                Sleep Analysis
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Smile className="h-4 w-4 mr-2" />
                Mood Journal
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MentalHealthPanel;