"use client"

import { createContext, useContext } from "react"
import type { DashboardData } from "./dashboard-data"
import { defaultDashboardData } from "./dashboard-data"

// Simple in-memory store for dashboard data
// In production, this would connect to a database

let dashboardData: DashboardData = { ...defaultDashboardData }

export function getDashboardData(): DashboardData {
  return dashboardData
}

export function updateDashboardData(newData: Partial<DashboardData>): DashboardData {
  dashboardData = {
    ...dashboardData,
    ...newData,
    lastUpdated: new Date().toISOString(),
  }
  return dashboardData
}

export function resetDashboardData(): DashboardData {
  dashboardData = { ...defaultDashboardData, lastUpdated: new Date().toISOString() }
  return dashboardData
}

// Context for reactive updates
export const DashboardDataContext = createContext<{
  data: DashboardData
  updateData: (newData: Partial<DashboardData>) => void
  resetData: () => void
}>({
  data: defaultDashboardData,
  updateData: () => {},
  resetData: () => {},
})

export function useDashboardData() {
  return useContext(DashboardDataContext)
}
