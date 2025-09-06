import { openDB } from "idb";

// ===================== INITIALIZE DB =====================
export const initDB = async () => {
  return openDB("TrackmateDB", 1, {
    upgrade(db) {
      // Habits store
      if (!db.objectStoreNames.contains("habits")) {
        const store = db.createObjectStore("habits", {
          keyPath: "id",
          autoIncrement: true,
        });
        store.createIndex("done", "done");
        store.createIndex("completedOn", "completedOn");
        store.createIndex("category", "category");
      }

      // Profile store
      if (!db.objectStoreNames.contains("profile")) {
        db.createObjectStore("profile");
      }
    },
  });
};

// ===================== HABIT CRUD =====================

// Get all habits
export const getAllHabits = async () => {
  const db = await initDB();
  return db.getAll("habits");
};

// Get incomplete habits
export const getIncompleteHabits = async () => {
  const habits = await getAllHabits();
  return habits.filter((h) => !h.done);
};

// Add new habit
export const addHabit = async (habit) => {
  const db = await initDB();
  await db.add("habits", {
    ...habit,
    done: false,
    completedOn: null,
  });
};

// Complete habit
export const completeHabit = async (id) => {
  const db = await initDB();
  const habit = await db.get("habits", id);
  if (!habit) return;
  habit.done = true;
  habit.completedOn = new Date().toISOString().split("T")[0];
  await db.put("habits", habit);
};

// Uncomplete habit (optional)
export const uncompleteHabit = async (id) => {
  const db = await initDB();
  const habit = await db.get("habits", id);
  if (!habit) return;
  habit.done = false;
  habit.completedOn = null;
  await db.put("habits", habit);
};

// Delete habit
export const deleteHabit = async (id) => {
  const db = await initDB();
  await db.delete("habits", id);
};

// Clear all habits
export const clearHabits = async () => {
  const db = await initDB();
  await db.clear("habits");
};

// ===================== ANALYTICS =====================

// Habits completed on a date
export const getHabitsCompletedOn = async (date) => {
  const habits = await getAllHabits();
  return habits.filter((h) => h.completedOn === date);
};

// Habit distribution by category
export const getHabitDistribution = async () => {
  const habits = await getAllHabits();
  const dist = {};
  habits.forEach((h) => {
    if (h.category) dist[h.category] = (dist[h.category] || 0) + 1;
  });
  return Object.entries(dist).map(([name, value]) => ({ name, value }));
};

// Streaks
export const getStreaks = async () => {
  const habits = (await getAllHabits()).filter((h) => h.done && h.completedOn);
  const dates = habits.map((h) => new Date(h.completedOn)).sort((a, b) => b - a);

  let longest = 0,
    current = 0,
    streakCount = 0,
    prevDate = null;

  dates.forEach((date) => {
    if (!prevDate) streakCount = 1;
    else {
      const diff = (prevDate - date) / (1000 * 60 * 60 * 24);
      if (diff === 1) streakCount++;
      else streakCount = 1;
    }
    if (streakCount > longest) longest = streakCount;
    prevDate = date;
  });

  if (dates.length > 0) {
    const diffToday = (new Date() - dates[0]) / (1000 * 60 * 60 * 24);
    current = diffToday <= 1 ? streakCount : 0;
  }

  return { current, longest };
};

// ===================== PROFILE MANAGEMENT =====================

// Save profile
export const saveProfile = async (profile) => {
  const db = await initDB();
  const tx = db.transaction("profile", "readwrite");
  const store = tx.objectStore("profile");
  await store.put(profile, "userProfile");
  await tx.done;
};

// Get profile
export const getProfile = async () => {
  const db = await initDB();
  const tx = db.transaction("profile", "readonly");
  const store = tx.objectStore("profile");
  const profile = await store.get("userProfile");
  await tx.done;
  return profile || null;
};

// Clear profile
export const clearProfile = async () => {
  const db = await initDB();
  const tx = db.transaction("profile", "readwrite");
  const store = tx.objectStore("profile");
  await store.clear();
  await tx.done;
};
