class HealthAPIService {
  private static instance: HealthAPIService;
  
  static getInstance() {
    if (!HealthAPIService.instance) {
      HealthAPIService.instance = new HealthAPIService();
    }
    return HealthAPIService.instance;
  }

  // FDA Alerts - Real API integration
  async getFDAAlerts() {
    try {
      const response = await fetch('https://api.fda.gov/device/recall.json?limit=5');
      const data = await response.json();
      
      return data.results?.map((alert: any) => ({
        id: alert.recall_number || Math.random().toString(),
        title: alert.product_description || 'Medical Device Alert',
        severity: alert.classification === 'Class I' ? 'critical' : 
                 alert.classification === 'Class II' ? 'warning' : 'info',
        message: alert.reason_for_recall || 'Device safety alert',
        timestamp: alert.recall_initiation_date || new Date().toISOString(),
        source: 'FDA'
      })) || [];
    } catch (error) {
      console.error('Failed to fetch FDA alerts:', error);
      return [];
    }
  }

  // Global Health Statistics - Real API
  async getGlobalHealthStats() {
    try {
      const response = await fetch('https://disease.sh/v3/covid-19/all');
      const data = await response.json();
      
      return {
        totalCases: data.cases,
        recovered: data.recovered,
        lastUpdated: new Date(data.updated).toLocaleString()
      };
    } catch (error) {
      console.error('Failed to fetch global health stats:', error);
      return null;
    }
  }

  // Generate realistic vital signs for space environment
  generateRealisticVitals() {
    return {
      heartRate: {
        value: this.generateVital(65, 85, 5), // Slightly elevated for space
        normal: [60, 100],
        trend: this.calculateTrend(),
        timestamp: Date.now()
      },
      bloodPressure: {
        systolic: this.generateVital(110, 140, 8),
        diastolic: this.generateVital(70, 90, 5),
        trend: this.calculateTrend(),
        timestamp: Date.now()
      },
      oxygenSaturation: {
        value: this.generateVital(96, 99, 1),
        normal: [95, 100],
        trend: this.calculateTrend(),
        timestamp: Date.now()
      },
      temperature: {
        value: this.generateVital(97.8, 99.2, 0.3), // Slightly elevated
        normal: [97.0, 99.5],
        trend: this.calculateTrend(),
        timestamp: Date.now()
      },
      respiratoryRate: {
        value: this.generateVital(14, 20, 2),
        normal: [12, 20],
        trend: this.calculateTrend(),
        timestamp: Date.now()
      },
      stressLevel: {
        value: this.generateVital(3, 7, 1), // Space stress factor
        normal: [1, 5],
        trend: this.calculateTrend(),
        timestamp: Date.now()
      }
    };
  }

  private generateVital(min: number, max: number, variance: number): number {
    const base = min + Math.random() * (max - min);
    const variation = (Math.random() - 0.5) * variance;
    return Math.round((base + variation) * 10) / 10;
  }

  private calculateTrend(): 'up' | 'down' | 'stable' {
    const rand = Math.random();
    if (rand < 0.3) return 'up';
    if (rand < 0.6) return 'down';
    return 'stable';
  }

  // Fitbit API integration (demo)
  async connectFitbitAPI(accessToken?: string) {
    try {
      if (!accessToken) {
        // Return demo data if no token provided
        return {
          heartRate: {
            value: this.generateVital(68, 78, 3),
            restingHeartRate: 65,
            timestamp: new Date().toISOString()
          }
        };
      }

      // Real Fitbit API call would go here
      const response = await fetch('https://api.fitbit.com/1/user/-/activities/heart/date/today/1d.json', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Fitbit API error:', error);
      return null;
    }
  }

  // Simulate medical device data
  simulateMedicalDevice() {
    return {
      deviceId: 'MED-SPACE-001',
      name: 'SpaceMed Pro Monitor',
      status: 'connected',
      batteryLevel: Math.floor(Math.random() * 30) + 70, // 70-100%
      signalStrength: Math.floor(Math.random() * 20) + 80, // 80-100%
      lastSync: new Date().toISOString(),
      sensors: {
        ecg: 'active',
        pulseOx: 'active',
        temperature: 'active',
        accelerometer: 'active'
      }
    };
  }

  // Emergency scenario simulation
  generateEmergencyScenario() {
    const scenarios = [
      {
        type: 'cardiac',
        vitals: { heartRate: 145, oxygenSat: 89 },
        alert: 'Tachycardia detected - immediate attention required'
      },
      {
        type: 'respiratory',
        vitals: { respiratoryRate: 28, oxygenSat: 91 },
        alert: 'Respiratory distress - oxygen levels low'
      },
      {
        type: 'thermal',
        vitals: { bodyTemp: 102.4, heartRate: 110 },
        alert: 'Hyperthermia detected - cooling protocol initiated'
      }
    ];

    return scenarios[Math.floor(Math.random() * scenarios.length)];
  }
}

export const healthAPI = HealthAPIService.getInstance();