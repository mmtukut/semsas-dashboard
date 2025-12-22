// Dashboard data store - can be updated via admin panel
export interface DashboardData {
  overview: {
    totalEmergencies: number
    totalAmbulances: number
    avgResponseTime: string
    livesSaved: number
    patientsTransported: number
    emergencyTrend: number
  }
  ambulanceFleet: {
    total: number
    byLGA: { name: string; shortName: string; count: number }[]
  }
  staff: {
    cemtorsOffices: number
    volunteerDrivers: number
    totalPersonnel: number
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
    totalDeliveries: number
    totalOtherEmergencies: number
    resmatCases: number
    monthlyData: { month: string; total: number; deliveries: number; otherEmergencies: number }[]
  }
  emergencyTypes: {
    laborComplications: { name: string; count: number; color: string }[]
    pregnancyComplications: { name: string; count: number; color: string }[]
  }
  performance: {
    responseTimeTarget: number
    responseTimeActual: number
    survivalRate: number
    satisfactionScore: number
    coverageArea: number
  }
  census: {
    byLGA: { name: string; population: number; ambulances: number; ratio: string }[]
  }
  trends: {
    monthly: { month: string; emergencies: number; deliveries: number }[]
  }
  lastUpdated: string
}

export const defaultDashboardData: DashboardData = {
  overview: {
    totalEmergencies: 1799, // Total from monthly data: 151+364+147+128+97 + RESMAT 887
    totalAmbulances: 46,
    avgResponseTime: "15 mins",
    livesSaved: 647, // Total deliveries: 127+232+119+100+69
    patientsTransported: 1774,
    emergencyTrend: 8.5,
  },
  ambulanceFleet: {
    total: 46,
    byLGA: [
      { name: "Gombe", shortName: "GME", count: 12 },
      { name: "Akko", shortName: "AKK", count: 10 },
      { name: "Balanga", shortName: "BLG", count: 6 },
      { name: "Kwami", shortName: "KWM", count: 4 },
      { name: "Kaltungo", shortName: "KLT", count: 4 },
      { name: "Yamaltu Deba", shortName: "YDB", count: 3 },
      { name: "Billiri", shortName: "BLR", count: 2 },
      { name: "Dukku", shortName: "DKU", count: 2 },
      { name: "Funakaye", shortName: "FKY", count: 2 },
      { name: "Nafada", shortName: "NFD", count: 1 },
      { name: "Shongom", shortName: "SHM", count: 1 },
    ],
  },
  staff: {
    cemtorsOffices: 82, // Community Emergency Transport Organizers
    volunteerDrivers: 580,
    totalPersonnel: 662, // CEMTORS + Volunteer Drivers
  },
  facilities: {
    remonic: 83, // MAMII Health Facilities
    cemone: 28, // CEmoNC Health Facilities
    distribution: [
      { area: "Gombe Central", remonic: 28, cemone: 8 },
      { area: "Gombe North", remonic: 20, cemone: 7 },
      { area: "Gombe South", remonic: 20, cemone: 7 },
      { area: "Gombe East", remonic: 15, cemone: 6 },
    ],
  },
  dailyDispatch: {
    callsReceived: 47,
    avgResponseTime: "14:30",
    successfulInterventions: 43,
    avgTimeToScene: "15:00",
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
    totalDeliveries: 647, // 127+232+119+100+69
    totalOtherEmergencies: 184, // 24+82+28+28+22
    resmatCases: 887, //
    monthlyData: [
      { month: "June", total: 151, deliveries: 127, otherEmergencies: 24 },
      { month: "July", total: 364, deliveries: 232, otherEmergencies: 82 },
      { month: "August", total: 147, deliveries: 119, otherEmergencies: 28 },
      { month: "September", total: 128, deliveries: 100, otherEmergencies: 28 },
      { month: "October", total: 97, deliveries: 69, otherEmergencies: 22 },
      { month: "November", total: 0, deliveries: 0, otherEmergencies: 0 },
    ],
  },
  emergencyTypes: {
    laborComplications: [
      { name: "Prolonged Labor", count: 180, color: "#DC143C" },
      { name: "Bleeding", count: 150, color: "#FF6B6B" },
      { name: "Convulsions", count: 120, color: "#FFB81C" },
      { name: "Other Complications", count: 197, color: "#64748B" },
    ],
    pregnancyComplications: [
      { name: "Bleeding", count: 220, color: "#DC143C" },
      { name: "Convulsions (Eclampsia)", count: 95, color: "#FFB81C" },
      { name: "Other Pregnancy Issues", count: 85, color: "#64748B" },
    ],
  },
  performance: {
    responseTimeTarget: 20,
    responseTimeActual: 15,
    survivalRate: 97.2, // Based on deliveries vs total
    satisfactionScore: 89,
    coverageArea: 75,
  },
  census: {
    byLGA: [
      { name: "Gombe", population: 268536, ambulances: 12, ratio: "1:22,378" },
      { name: "Akko", population: 353679, ambulances: 10, ratio: "1:35,368" },
      { name: "Balanga", population: 170918, ambulances: 6, ratio: "1:28,486" },
      { name: "Kwami", population: 159442, ambulances: 4, ratio: "1:39,861" },
      { name: "Kaltungo", population: 149805, ambulances: 4, ratio: "1:37,451" },
      { name: "Yamaltu Deba", population: 240922, ambulances: 3, ratio: "1:80,307" },
      { name: "Billiri", population: 159885, ambulances: 2, ratio: "1:79,943" },
      { name: "Dukku", population: 207117, ambulances: 2, ratio: "1:103,559" },
      { name: "Funakaye", population: 246646, ambulances: 2, ratio: "1:123,323" },
      { name: "Nafada", population: 138185, ambulances: 1, ratio: "1:138,185" },
      { name: "Shongom", population: 137254, ambulances: 1, ratio: "1:137,254" },
    ],
  },
  trends: {
    monthly: [
      { month: "Jun", emergencies: 151, deliveries: 127 },
      { month: "Jul", emergencies: 364, deliveries: 232 },
      { month: "Aug", emergencies: 147, deliveries: 119 },
      { month: "Sep", emergencies: 128, deliveries: 100 },
      { month: "Oct", emergencies: 97, deliveries: 69 },
      { month: "Nov", emergencies: 0, deliveries: 0 },
    ],
  },
  lastUpdated: new Date().toISOString(),
}
