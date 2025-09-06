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
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4">Add New Habit</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Habit name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Goal (e.g. 30 days)"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Category (e.g. Fitness, Mindfulness)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border rounded"
        />

        {/* Priority */}
        <div>
          <label className="block mb-1 font-medium">Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full p-2 border rounded"
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
          />
          <label>Set daily reminder</label>
        </div>

        {/* Due Date */}
        <div>
          <label className="block mb-1 font-medium">Due Date (optional)</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Add Habit
        </button>
      </form>
    </div>
  );
}

export default AddHabit;
