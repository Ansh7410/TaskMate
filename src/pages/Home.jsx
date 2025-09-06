import React, { useState, useEffect } from "react";
import { getIncompleteHabits, completeHabit } from "../utils/db";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 18) return "Good Afternoon";
  return "Good Evening";
};

const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const HomePage = () => {
  const [habits, setHabits] = useState([]);
  const [weeklyData, setWeeklyData] = useState(
    WEEK_DAYS.map((d) => ({ day: d, completed: 0 }))
  );

  // Load only incomplete habits
  const loadHabits = async () => {
    const remaining = await getIncompleteHabits();
    setHabits(remaining);
  };

  useEffect(() => {
    loadHabits();
  }, []);

  const handleComplete = async (habitId) => {
    await completeHabit(habitId);
    await loadHabits();

    // Update weekly chart
    const todayIndex = new Date().getDay();
    setWeeklyData((prev) =>
      prev.map((d, i) =>
        i === todayIndex ? { ...d, completed: d.completed + 1 } : d
      )
    );
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      {/* Greeting */}
      <div className="bg-blue-600 text-white p-6 rounded-2xl shadow-xl mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-extrabold">{getGreeting()}, Ansh 👋</h1>
          <p className="mt-2">
            You have <b>{habits.length}</b> habit
            {habits.length !== 1 ? "s" : ""} left to complete today 🎯
          </p>
        </div>
      </div>

      {/* Habit Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {habits.map((habit) => (
          <div
            key={habit.id}
            className="p-5 bg-white rounded-xl shadow-lg border-l-4 border-indigo-500"
          >
            <h3 className="text-xl font-semibold">{habit.name}</h3>
            <button
              onClick={() => handleComplete(habit.id)}
              className="mt-4 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
            >
              Mark as Done
            </button>
          </div>
        ))}
        {habits.length === 0 && (
          <p className="text-center col-span-full">All habits completed 🎉</p>
        )}
      </div>

      {/* Weekly Progress */}
      <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
        <h2 className="text-2xl font-bold mb-4">📊 Weekly Progress</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={weeklyData}>
            <XAxis dataKey="day" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="completed" fill="#6366F1" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default HomePage;
