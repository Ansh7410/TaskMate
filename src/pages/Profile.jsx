import React, { useEffect, useState } from "react";
import { getAllHabits, getStreaks } from "../utils/db";

function Profile() {
  // Static user info (for now)
  const user = {
    name: "Ansh Gupta",
    username: "anshg",
    email: "ansh@example.com",
    bio: "Habit tracker enthusiast 🌱",
    avatar: "https://i.pravatar.cc/150?img=3",
  };

  // Dynamic stats
  const [stats, setStats] = useState({
    totalHabits: 0,
    todayCompleted: 0,
    currentStreak: 0,
    longestStreak: 0,
  });

  useEffect(() => {
    const loadStats = async () => {
      const allHabits = await getAllHabits();
      const todayStr = new Date().toISOString().split("T")[0];

      const todayCompleted = allHabits.filter(
        (h) => h.completedOn === todayStr
      ).length;

      const { current, longest } = await getStreaks();

      setStats({
        totalHabits: allHabits.length,
        todayCompleted,
        currentStreak: current,
        longestStreak: longest,
      });
    };

    loadStats();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Profile Card */}
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-6 md:p-8 mb-8 flex flex-col md:flex-row items-center md:items-start gap-6">
        <img
          src={user.avatar}
          alt="avatar"
          className="w-28 h-28 rounded-full border-4 border-indigo-500 shadow"
        />
        <div className="text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            {user.name}
          </h1>
          <p className="text-gray-600">@{user.username}</p>
          <p className="text-gray-500 mt-2">{user.bio}</p>
          <button className="mt-4 px-5 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition">
            Edit Profile
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 bg-white rounded-xl shadow text-center hover:shadow-lg transition">
          <p className="text-gray-500">Total Habits</p>
          <p className="text-2xl font-bold text-indigo-600">
            {stats.totalHabits}
          </p>
        </div>
        <div className="p-5 bg-white rounded-xl shadow text-center hover:shadow-lg transition">
          <p className="text-gray-500">Today Completed</p>
          <p className="text-2xl font-bold text-green-600">
            {stats.todayCompleted}
          </p>
        </div>
        <div className="p-5 bg-white rounded-xl shadow text-center hover:shadow-lg transition">
          <p className="text-gray-500">Current Streak</p>
          <p className="text-2xl font-bold text-orange-500">
            {stats.currentStreak}d
          </p>
        </div>
        <div className="p-5 bg-white rounded-xl shadow text-center hover:shadow-lg transition">
          <p className="text-gray-500">Longest Streak</p>
          <p className="text-2xl font-bold text-purple-600">
            {stats.longestStreak}d
          </p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
