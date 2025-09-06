import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { getAllHabits, getHabitDistribution, getStreaks } from "../utils/db";

const COLORS = ["#6366F1", "#10B981", "#FBBF24"];
const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const AnalyticsDashboard = () => {
  const [monthlyProgress, setMonthlyProgress] = useState([]);
  const [habitDistribution, setHabitDistribution] = useState([]);
  const [streak, setStreak] = useState({ current: 0, longest: 0 });
  const [heatmap, setHeatmap] = useState([]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      const habits = await getAllHabits();
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth(); // 0-indexed

      // --- Monthly Progress ---
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const monthName = today.toLocaleString("default", { month: "short" });

      const monthly = Array.from({ length: daysInMonth }, (_, i) => {
        const dayStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(i + 1).padStart(2, "0")}`;
        const completedCount = habits.filter((h) => h.completedOn?.includes(dayStr)).length;
        return {
          day: `${monthName} ${i + 1}`,
          completed: completedCount,
        };
      });
      setMonthlyProgress(monthly);

      // --- Habit Distribution ---
      const distribution = await getHabitDistribution();
      setHabitDistribution(distribution);

      // --- Streaks ---
      const s = await getStreaks();
      setStreak(s);

      // --- Heatmap ---
      const startDay = new Date(year, month, 1).getDay(); // 0=Sun
      const weeks = Math.ceil((daysInMonth + startDay) / 7);
      const heat = [];

      for (let w = 0; w < weeks; w++) {
        const week = [];
        for (let d = 0; d < 7; d++) {
          const dayNum = w * 7 + d - startDay + 1;
          if (dayNum < 1 || dayNum > daysInMonth) {
            week.push(""); // empty cell
          } else {
            const dayStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(dayNum).padStart(2, "0")}`;
            const done = habits.some((h) => h.completedOn?.includes(dayStr));
            week.push(done ? "✔" : "");
          }
        }
        heat.push(week);
      }
      setHeatmap(heat);
    };

    fetchAnalytics();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-8">
      {/* Monthly Progress */}
      <div className="rounded-xl shadow-md overflow-hidden">
        <div className="bg-gray-800 text-white px-6 py-3 font-semibold text-lg flex justify-between items-center">
          <span>Monthly Progress</span>
          <span className="text-sm text-gray-200 font-normal">
            {new Date().toLocaleString("default", { month: "long" })} {new Date().getFullYear()}
          </span>
        </div>
        <div className="bg-white p-6">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={monthlyProgress}>
              <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fill: "#4B5563", fontWeight: 500 }} interval={3} />
              <YAxis allowDecimals={false} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ borderRadius: "8px", border: "none", backgroundColor: "#F3F4F6" }} />
              <Line type="monotone" dataKey="completed" stroke="#6366F1" strokeWidth={3} dot={{ r: 5, fill: "#10B981", stroke: "#6366F1", strokeWidth: 2 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Streaks */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="rounded-xl shadow-md overflow-hidden flex-1">
          <div className="bg-gray-700 text-white px-6 py-3 font-semibold text-lg text-center">Current Streak</div>
          <div className="bg-white p-6 text-center">
            <p className="text-3xl font-bold text-gray-800">{streak.current} days</p>
          </div>
        </div>
        <div className="rounded-xl shadow-md overflow-hidden flex-1">
          <div className="bg-gray-700 text-white px-6 py-3 font-semibold text-lg text-center">Longest Streak</div>
          <div className="bg-white p-6 text-center">
            <p className="text-3xl font-bold text-gray-800">{streak.longest} days</p>
          </div>
        </div>
      </div>

      {/* Habit Distribution */}
      <div className="rounded-xl shadow-md overflow-hidden">
        <div className="bg-gray-700 text-white px-6 py-3 font-semibold text-lg">Habit Distribution</div>
        <div className="bg-white p-6">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={habitDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                {habitDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: "8px", border: "none", backgroundColor: "#F3F4F6" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Completion Heatmap */}
      <div className="rounded-xl shadow-md overflow-hidden">
        <div className="bg-gray-700 text-white px-6 py-3 font-semibold text-lg">Completion Heatmap</div>
        <div className="bg-white p-6">
          <div className="grid grid-rows-4 grid-cols-7 gap-2">
            {weekDays.map((day, idx) => (
              <div key={`label-${idx}`} className="text-center text-sm font-medium text-gray-600">{day}</div>
            ))}
            {heatmap.flat().map((day, index) => (
              <div
                key={index}
                className={`w-10 h-10 flex items-center justify-center border rounded-lg ${day === "✔" ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-400"} font-semibold`}
              >
                {day || ""}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
