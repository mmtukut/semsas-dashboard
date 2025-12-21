// Dashboard data store - can be updated via admin panel
export interface DashboardData {
  overview: {
    totalEmergencies: number
    activeAmbulances: number
    avgResponseTime: string
    livesSaved: number
    patientsTransported: number
    emergencyTrend: number // percentage change
  }
  ambulanceFleet: {
    total: number
    byLocation: { name: string; count: number; status: "available" | "on-route" | "maintenance" }[]
  }
  staff: {
    desmajOfficers: number
    totalMedicalPersonnel: number
    onDuty: number
    offDuty: number
  }
  facilities: {
    remonic: number
    cemone: number
    distribution: { area: string; remonic: number; cemone: number }[]
  }
  dailyDispatch: {
    callsReceived: number
    avgResponseTime: string
    successfulInterventions: number
    avgTimeToScene: string
    trends: { time: string; calls: number }[]
  }
  transport: {
    activeTransports: number
    completedToday: number
    distanceCovered: number
    patientOutcomes: { positive: number; neutral: number; critical: number }
  }
  emergencyTypes: {
    categories: { name: string; count: number; color: string }[]
  }
  performance: {
    responseTimeTarget: number
    responseTimeActual: number
    survivalRate: number
    satisfactionScore: number
    coverageArea: number
  }
  census: {
    byLGA: { name: string; coverage: number; population: number; ratio: string }[]
  }
  trends: {
    monthly: { month: string; emergencies: number; responses: number }[]
  }
  lastUpdated: string
}

export const defaultDashboardData: DashboardData = {
  overview: {
    totalEmergencies: 1247,
    activeAmbulances: 9,
    avgResponseTime: "12 mins",
    livesSaved: 892,
    patientsTransported: 3456,
    emergencyTrend: 12.5,
  },
  ambulanceFleet: {
    total: 9,
    byLocation: [
      { name: "GME (Gombe)", count: 29, status: "available" },
      { name: "BLG (Balanga)", count: 23, status: "available" },
      { name: "KLT (Kaltungo)", count: 11, status: "on-route" },
      { name: "BLR (Billiri)", count: 9, status: "available" },
      { name: "YDB (Yamaltu Deba)", count: 9, status: "maintenance" },
      { name: "FKY (Funakaye)", count: 8, status: "available" },
      { name: "SHM (Shomgom)", count: 8, status: "on-route" },
      { name: "NFD (Nafada)", count: 8, status: "available" },
      { name: "KWM (Kwami)", count: 5, status: "available" },
      { name: "DKU (Dukku)", count: 4, status: "available" },
      { name: "AKK (Akko)", count: 2, status: "maintenance" },
    ],
  },
  staff: {
    desmajOfficers: 82,
    totalMedicalPersonnel: 156,
    onDuty: 48,
    offDuty: 34,
  },
  facilities: {
    remonic: 12,
    cemone: 28,
    distribution: [
      { area: "Gombe Central", remonic: 4, cemone: 8 },
      { area: "Gombe North", remonic: 3, cemone: 7 },
      { area: "Gombe South", remonic: 3, cemone: 7 },
      { area: "Gombe East", remonic: 2, cemone: 6 },
    ],
  },
  dailyDispatch: {
    callsReceived: 47,
    avgResponseTime: "11:45",
    successfulInterventions: 43,
    avgTimeToScene: "14:30",
    trends: [
      { time: "6AM", calls: 3 },
      { time: "9AM", calls: 8 },
      { time: "12PM", calls: 12 },
      { time: "3PM", calls: 9 },
      { time: "6PM", calls: 7 },
      { time: "9PM", calls: 5 },
      { time: "12AM", calls: 3 },
    ],
  },
  transport: {
    activeTransports: 4,
    completedToday: 38,
    distanceCovered: 456,
    patientOutcomes: { positive: 89, neutral: 8, critical: 3 },
  },
  emergencyTypes: {
    categories: [
      { name: "Bleeding Emergencies", count: 234, color: "#DC143C" },
      { name: "Obstetric/Labor", count: 312, color: "#00A86B" },
      { name: "Convulsions/Seizures", count: 156, color: "#FFB81C" },
      { name: "Trauma/Accidents", count: 289, color: "#0052A5" },
      { name: "Cardiac Events", count: 145, color: "#8B5CF6" },
      { name: "Other", count: 111, color: "#64748B" },
    ],
  },
  performance: {
    responseTimeTarget: 15,
    responseTimeActual: 12,
    survivalRate: 94.5,
    satisfactionScore: 87,
    coverageArea: 78,
  },
  census: {
    byLGA: [
      { name: "Gombe", coverage: 95, population: 268536, ratio: "1:29,837" },
      { name: "Akko", coverage: 72, population: 353679, ratio: "1:176,840" },
      { name: "Balanga", coverage: 85, population: 170918, ratio: "1:7,431" },
      { name: "Billiri", coverage: 78, population: 159885, ratio: "1:17,765" },
      { name: "Dukku", coverage: 65, population: 207117, ratio: "1:51,779" },
      { name: "Funakaye", coverage: 70, population: 246646, ratio: "1:30,831" },
      { name: "Kaltungo", coverage: 82, population: 149805, ratio: "1:13,619" },
      { name: "Kwami", coverage: 68, population: 159442, ratio: "1:31,888" },
      { name: "Nafada", coverage: 75, population: 138185, ratio: "1:17,273" },
      { name: "Shomgom", coverage: 72, population: 137254, ratio: "1:17,157" },
      { name: "Yamaltu Deba", coverage: 80, population: 240922, ratio: "1:26,769" },
    ],
  },
  trends: {
    monthly: [
      { month: "Jan", emergencies: 98, responses: 95 },
      { month: "Feb", emergencies: 112, responses: 108 },
      { month: "Mar", emergencies: 125, responses: 122 },
      { month: "Apr", emergencies: 118, responses: 115 },
      { month: "May", emergencies: 134, responses: 130 },
      { month: "Jun", emergencies: 142, responses: 139 },
      { month: "Jul", emergencies: 156, responses: 152 },
      { month: "Aug", emergencies: 148, responses: 145 },
      { month: "Sep", emergencies: 138, responses: 135 },
      { month: "Oct", emergencies: 129, responses: 126 },
      { month: "Nov", emergencies: 121, responses: 118 },
      { month: "Dec", emergencies: 126, responses: 123 },
    ],
  },
  lastUpdated: new Date().toISOString(),
}
