import React, { useEffect, useState } from "react";
import { getAllHabits, getStreaks } from "../utils/db";

const Profile = () => {
  // Static user info
  const user = {
    name: "Ansh Gupta",
    username: "anshg",
    email: "ansh@example.com",
    bio: "Habit tracker enthusiast",
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
    <div className="p-6 max-w-4xl mx-auto">
      {/* Profile info */}
      <div className="flex items-center space-x-4 mb-6">
        <img
          src={user.avatar}
          alt="avatar"
          className="w-24 h-24 rounded-full border-2 border-blue-500"
        />
        <div>
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-gray-600">@{user.username}</p>
          <p className="text-gray-500">{user.bio}</p>
          <button className="mt-2 px-4 py-1 rounded bg-blue-600 text-white hover:bg-blue-700">
            Edit Profile
          </button>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-white shadow rounded text-center">
          <p className="text-gray-500">Total Habits</p>
          <p className="text-xl font-bold">{stats.totalHabits}</p>
        </div>
        <div className="p-4 bg-white shadow rounded text-center">
          <p className="text-gray-500">Today Completed</p>
          <p className="text-xl font-bold">{stats.todayCompleted}</p>
        </div>
        <div className="p-4 bg-white shadow rounded text-center">
          <p className="text-gray-500">Current Streak</p>
          <p className="text-xl font-bold">{stats.currentStreak} days</p>
        </div>
        <div className="p-4 bg-white shadow rounded text-center">
          <p className="text-gray-500">Longest Streak</p>
          <p className="text-xl font-bold">{stats.longestStreak} days</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
