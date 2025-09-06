import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addHabit } from "../utils/db";

function AddHabit() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [reminder, setReminder] = useState(false);
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !goal) return;

    await addHabit({
      name,
      goal,
      category,
      priority,
      reminder,
      dueDate: dueDate || null,
      createdAt: new Date(),
      completedOn: null,
      done: false,
    });

    navigate("/"); // Redirect to home
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 md:p-8 rounded-2xl shadow-lg mt-20 mb-10 border border-gray-200">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-slate-800">
        Add New Habit
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Habit Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Habit Name</label>
          <input
            type="text"
            placeholder="e.g. Morning Run"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
            required
          />
        </div>

        {/* Goal */}
        <div>
          <label className="block text-sm font-medium mb-1">Goal</label>
          <input
            type="text"
            placeholder="e.g. 30 days"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <input
            type="text"
            placeholder="e.g. Fitness, Mindfulness"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
        </div>

        {/* Priority */}
        <div>
          <label className="block text-sm font-medium mb-1">Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        {/* Reminder */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={reminder}
            onChange={(e) => setReminder(e.target.checked)}
            className="h-4 w-4 text-green-600"
          />
          <label className="text-sm">Set daily reminder</label>
        </div>

        {/* Due Date */}
        <div>
          <label className="block text-sm font-medium mb-1">Due Date (optional)</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
        >
          ➕ Add Habit
        </button>
      </form>
    </div>
  );
}

export default AddHabit;
