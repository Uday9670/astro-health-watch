import { useState, useEffect } from 'react';
import { healthAPI } from '@/services/healthAPI';

export interface VitalSigns {
  heartRate: { value: number; normal: number[]; trend: string; timestamp: number };
  bloodPressure: { systolic: number; diastolic: number; trend: string; timestamp: number };
  oxygenSaturation: { value: number; normal: number[]; trend: string; timestamp: number };
  temperature: { value: number; normal: number[]; trend: string; timestamp: number };
  respiratoryRate: { value: number; normal: number[]; trend: string; timestamp: number };
  stressLevel: { value: number; normal: number[]; trend: string; timestamp: number };
}

export const useHealthData = (updateInterval: number = 5000) => {
  const [vitals, setVitals] = useState<VitalSigns | null>(null);
  const [fdaAlerts, setFdaAlerts] = useState<any[]>([]);
  const [deviceInfo, setDeviceInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch real FDA alerts
  useEffect(() => {
    const fetchFDAData = async () => {
      try {
        const alerts = await healthAPI.getFDAAlerts();
        setFdaAlerts(alerts);
      } catch (err) {
        console.error('Failed to fetch FDA data:', err);
      }
    };
    
    fetchFDAData();
    // Refresh FDA alerts every hour
    const fdaInterval = setInterval(fetchFDAData, 3600000);
    return () => clearInterval(fdaInterval);
  }, []);

  // Generate realistic vital signs
  useEffect(() => {
    const updateVitals = () => {
      try {
        const newVitals = healthAPI.generateRealisticVitals();
        setVitals(newVitals);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to generate vital signs');
        setIsLoading(false);
      }
    };

    // Initial load
    updateVitals();
    
    // Set up real-time updates
    const interval = setInterval(updateVitals, updateInterval);
    return () => clearInterval(interval);
  }, [updateInterval]);

  // Simulate medical device info
  useEffect(() => {
    const device = healthAPI.simulateMedicalDevice();
    setDeviceInfo(device);
  }, []);

  const getVitalStatus = (vital: string, value: number): 'normal' | 'warning' | 'critical' => {
    const ranges: { [key: string]: { normal: [number, number]; warning: [number, number] } } = {
      heartRate: { normal: [60, 90], warning: [45, 120] },
      oxygenSaturation: { normal: [95, 100], warning: [90, 94] },
      temperature: { normal: [97, 99.5], warning: [95, 102] },
      respiratoryRate: { normal: [12, 20], warning: [8, 30] },
      stressLevel: { normal: [0, 25], warning: [26, 50] }
    };

    const range = ranges[vital];
    if (!range) return 'normal';

    if (value >= range.normal[0] && value <= range.normal[1]) return 'normal';
    if (value >= range.warning[0] && value <= range.warning[1]) return 'warning';
    return 'critical';
  };

  return {
    vitals,
    fdaAlerts,
    deviceInfo,
    isLoading,
    error,
    getVitalStatus,
    refreshData: () => {
      setIsLoading(true);
      const newVitals = healthAPI.generateRealisticVitals();
      setVitals(newVitals);
      setIsLoading(false);
    }
  };
};