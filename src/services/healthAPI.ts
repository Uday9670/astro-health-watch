// Health API Service for real data integration
export class HealthAPIService {
  private static instance: HealthAPIService;
  
  public static getInstance(): HealthAPIService {
    if (!HealthAPIService.instance) {
      HealthAPIService.instance = new HealthAPIService();
    }
    return HealthAPIService.instance;
  }

  // OpenFDA API - Public health data (no key required)
  async getFDAAlerts() {
    try {
      const response = await fetch(
        'https://api.fda.gov/device/recall.json?limit=5'
      );
      const data = await response.json();
      return data.results?.map((item: any) => ({
        id: item.recall_number,
        type: 'warning',
        message: `FDA Alert: ${item.product_description?.substring(0, 50)}...`,
        time: new Date(item.report_date).toLocaleDateString(),
        source: 'FDA'
      })) || [];
    } catch (error) {
      console.error('FDA API Error:', error);
      return [];
    }
  }

  // Disease.sh API - Global health statistics (no key required)
  async getGlobalHealthStats() {
    try {
      const response = await fetch('https://disease.sh/v3/covid-19/all');
      const data = await response.json();
      return {
        totalCases: data.cases,
        recovered: data.recovered,
        lastUpdated: new Date(data.updated).toLocaleDateString()
      };
    } catch (error) {
      console.error('Health Stats API Error:', error);
      return null;
    }
  }

  // Realistic vital signs simulation based on medical standards
  generateRealisticVitals() {
    const baseTime = Date.now();
    const astronautProfile = {
      age: 35, // Average astronaut age
      fitness: 'excellent',
      environment: 'space'
    };

    // Medical ranges adjusted for space environment
    return {
      heartRate: {
        value: this.generateVital(65, 85, 2), // Space: slightly lower due to microgravity
        normal: [60, 90],
        trend: this.calculateTrend(),
        timestamp: baseTime
      },
      bloodPressure: {
        systolic: this.generateVital(110, 130, 3),
        diastolic: this.generateVital(70, 85, 2),
        trend: this.calculateTrend(),
        timestamp: baseTime
      },
      oxygenSaturation: {
        value: this.generateVital(96, 100, 1),
        normal: [95, 100],
        trend: this.calculateTrend(),
        timestamp: baseTime
      },
      temperature: {
        value: this.generateVital(97.8, 99.1, 0.2), // Space: slightly lower core temp
        normal: [97.0, 99.5],
        trend: this.calculateTrend(),
        timestamp: baseTime
      },
      respiratoryRate: {
        value: this.generateVital(12, 18, 1),
        normal: [12, 20],
        trend: this.calculateTrend(),
        timestamp: baseTime
      },
      stressLevel: {
        value: this.generateVital(10, 30, 5), // Mission stress indicators
        normal: [0, 25],
        trend: this.calculateTrend(),
        timestamp: baseTime
      }
    };
  }

  private generateVital(min: number, max: number, variance: number): number {
    const base = min + (max - min) * Math.random();
    const noise = (Math.random() - 0.5) * variance;
    return Math.round((base + noise) * 10) / 10;
  }

  private calculateTrend(): 'up' | 'down' | 'stable' {
    const rand = Math.random();
    if (rand < 0.3) return 'up';
    if (rand < 0.6) return 'down';
    return 'stable';
  }

  // Fitbit Web API integration (requires user consent)
  async connectFitbitAPI(accessToken?: string) {
    if (!accessToken) {
      // Return demo data or prompt for connection
      return {
        connected: false,
        demoMode: true,
        data: this.generateRealisticVitals()
      };
    }

    try {
      const response = await fetch('https://api.fitbit.com/1/user/-/activities/heart/date/today/1d.json', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Accept': 'application/json'
        }
      });
      const data = await response.json();
      return {
        connected: true,
        heartRate: data['activities-heart'][0]?.value?.restingHeartRate || null
      };
    } catch (error) {
      console.error('Fitbit API Error:', error);
      return { connected: false, error: 'Authentication failed' };
    }
  }

  // Medical device simulator (for hackathon demo)
  simulateMedicalDevice() {
    return {
      deviceId: 'AST-MON-001',
      manufacturer: 'NASA Medical Systems',
      model: 'AstronautVital Pro',
      firmware: '2.1.4',
      batteryLevel: 87,
      signalStrength: 95,
      lastSync: new Date().toISOString(),
      sensors: {
        ecg: { status: 'active', sampleRate: '250Hz' },
        pulse: { status: 'active', accuracy: '98%' },
        temperature: { status: 'active', calibrated: true },
        accelerometer: { status: 'active', sensitivity: 'high' }
      }
    };
  }

  // Emergency scenarios for demo
  generateEmergencyScenario() {
    const scenarios = [
      {
        type: 'critical',
        vitals: { heartRate: 45, oxygenSaturation: 92 },
        alert: 'Bradycardia detected - immediate attention required'
      },
      {
        type: 'warning', 
        vitals: { temperature: 101.2, heartRate: 105 },
        alert: 'Elevated temperature and heart rate - monitor closely'
      },
      {
        type: 'caution',
        vitals: { stressLevel: 75, respiratoryRate: 25 },
        alert: 'High stress indicators - recommend wellness check'
      }
    ];
    
    return scenarios[Math.floor(Math.random() * scenarios.length)];
  }
}

export const healthAPI = HealthAPIService.getInstance();