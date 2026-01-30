'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { SectionPanel } from '@/components/dashboard/section-panel'
import { Ambulance } from 'lucide-react'

interface AmbulanceServiceRunsData {
  total: number
  monthlyRuns: { month: string; runs: number }[]
}

export function AmbulanceServiceRunsSection({ data }: { data: AmbulanceServiceRunsData }) {
  if (!data || !data.monthlyRuns) {
    return (
      <SectionPanel
        title="Ambulance Service Runs"
        icon={Ambulance}
        titleColor="#DC143C"
      >
        <div className="flex items-center justify-center h-96">
          <p className="text-black">No data available</p>
        </div>
      </SectionPanel>
    )
  }

  return (
    <SectionPanel
      title="Ambulance Service Runs"
      subtitle="Patients Moved to Hospital"
      icon={Ambulance}
      titleColor="#DC143C"
    >
      <div className="space-y-6">
        {/* Total stat */}
        <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-black text-sm font-semibold">Total Patients Moved</p>
              <p className="text-black text-xs mt-1">March - December</p>
            </div>
            <p className="text-4xl font-bold text-red-600">{data.total.toLocaleString()}</p>
          </div>
        </div>

        {/* Monthly bar chart */}
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.monthlyRuns} margin={{ top: 20, right: 30, left: 0, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="month"
                angle={-45}
                textAnchor="end"
                height={80}
                tick={{ fill: '#000', fontSize: 11 }}
              />
              <YAxis tick={{ fill: '#000', fontSize: 11 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #ddd',
                  color: '#000',
                }}
                labelStyle={{ color: '#000' }}
                formatter={(value) => [`${value} runs`, 'Patient Transfers']}
              />
              <Bar dataKey="runs" fill="#DC143C" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly breakdown table */}
        <div className="overflow-x-auto bg-gray-50 rounded-lg p-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-black">
                <th className="text-left py-3 px-3 text-black font-bold whitespace-nowrap">Month</th>
                <th className="text-center py-3 px-3 text-black font-bold whitespace-nowrap">Runs</th>
                <th className="text-right py-3 px-3 text-black font-bold whitespace-nowrap">% Total</th>
              </tr>
            </thead>
            <tbody>
              {data.monthlyRuns.map((item, idx) => (
                <tr key={idx} className="border-b border-black/10 hover:bg-white">
                  <td className="py-2 px-3 text-black font-medium">{item.month}</td>
                  <td className="text-center py-2 px-3 text-black font-semibold">{item.runs}</td>
                  <td className="text-right py-2 px-3 text-black">
                    {((item.runs / data.total) * 100).toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-black bg-white font-bold">
                <td className="py-3 px-3 text-black">TOTAL</td>
                <td className="text-center py-3 px-3 text-black">{data.total}</td>
                <td className="text-right py-3 px-3 text-black">100.0%</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </SectionPanel>
  )
}
