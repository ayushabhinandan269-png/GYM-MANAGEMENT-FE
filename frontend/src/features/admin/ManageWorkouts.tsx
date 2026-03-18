import { useEffect, useState } from "react";
import {
  getWorkouts,
  createWorkout,
  deleteWorkout,
  assignWorkout
} from "../../api/workoutAPI";

import { getMembers } from "../../api/memberAPI";

function Workouts() {
  const [workouts, setWorkouts] = useState<any[]>([]);
  const [members, setMembers] = useState<any[]>([]);
  const [assignedMap, setAssignedMap] = useState<{ [key: string]: boolean }>({});

  const [showModal, setShowModal] = useState(false);
  const [showAssign, setShowAssign] = useState(false);

  const [selectedWorkout, setSelectedWorkout] = useState<any>(null);
  const [selectedMember, setSelectedMember] = useState("");

  const [newWorkout, setNewWorkout] = useState({
    title: "",
    description: "",
    level: "Beginner",
    exercises: "",
    duration: 45
  });

  const fetchWorkouts = async () => {
    const res = await getWorkouts();
    setWorkouts(res.data);
  };

  const fetchMembers = async () => {
    const res = await getMembers();
    setMembers(res.data);

    const map: any = {};

    res.data.forEach((m: any) => {
      m.assignedWorkouts?.forEach((w: any) => {
        if (w.workout?._id) {
          map[w.workout._id] = true;
        }
      });
    });

    setAssignedMap(map);
  };

  useEffect(() => {
    fetchWorkouts();
    fetchMembers();
  }, []);

  const addWorkout = async () => {
    if (!newWorkout.title || !newWorkout.description) {
      alert("Please fill required fields");
      return;
    }

    const exercisesArray = newWorkout.exercises
      ? newWorkout.exercises.split(",").map((e) => e.trim())
      : [];

    await createWorkout({
      title: newWorkout.title,
      description: newWorkout.description,
      level: newWorkout.level,
      duration: newWorkout.duration,
      exercises: exercisesArray
    });

    setNewWorkout({
      title: "",
      description: "",
      level: "Beginner",
      exercises: "",
      duration: 45
    });

    setShowModal(false);
    fetchWorkouts();
  };

  const removeWorkout = async (id: string) => {
    if (!confirm("Delete workout?")) return;

    await deleteWorkout(id);
    fetchWorkouts();
    fetchMembers();
  };

  const handleAssignWorkout = async () => {
    if (!selectedMember) {
      alert("Please select member");
      return;
    }

    if (!selectedWorkout?._id) {
      alert("No workout selected");
      return;
    }

    try {
      await assignWorkout({
        memberId: selectedMember,
        workoutId: selectedWorkout._id
      });

      setAssignedMap((prev) => ({
        ...prev,
        [selectedWorkout._id]: true
      }));

      await fetchMembers();

      setShowAssign(false);
      setSelectedMember("");

      alert("Workout assigned successfully");
    } catch (err) {
      console.error("Assign failed", err);
      alert("Failed to assign workout");
    }
  };

  return (
    <div style={{ padding: "50px 60px" }}>
      <h1
        style={{
          fontSize: "34px",
          fontWeight: "700",
          marginBottom: "30px"
        }}
      >
        Workout Programs
      </h1>

      <button onClick={() => setShowModal(true)} style={createBtn}>
        + Add Workout
      </button>

      <div style={grid}>
        {workouts.map((workout) => (
          <div key={workout._id} style={card}>
            <h2 style={{ marginBottom: "6px" }}>{workout.title}</h2>

            <p style={{ marginBottom: "10px" }}>{workout.description}</p>

            <span style={levelTag}>{workout.level}</span>

            <div style={{ marginTop: "10px" }}>
              {workout.exercises?.map((ex: string, i: number) => (
                <span key={i} style={tag}>
                  {ex}
                </span>
              ))}
            </div>

            <p style={{ marginTop: "10px", fontSize: "13px" }}>
              Duration: {workout.duration} mins
            </p>

            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <button
                onClick={() => removeWorkout(workout._id)}
                style={deleteBtn}
              >
                Delete
              </button>

              <button
                onClick={() => {
                  setSelectedWorkout(workout);
                  setShowAssign(true);
                }}
                style={{
                  ...assignBtn,
                  background: assignedMap[workout._id] ? "#16a34a" : "#3b82f6"
                }}
              >
                {assignedMap[workout._id] ? "Assigned" : "Assign to Member"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div style={overlay}>
          <div style={modal}>
            <h2>Create Workout</h2>

            <input
              placeholder="Workout Title"
              value={newWorkout.title}
              onChange={(e) =>
                setNewWorkout({ ...newWorkout, title: e.target.value })
              }
            />

            <textarea
              placeholder="Workout Description"
              value={newWorkout.description}
              onChange={(e) =>
                setNewWorkout({ ...newWorkout, description: e.target.value })
              }
            />

            <select
              value={newWorkout.level}
              onChange={(e) =>
                setNewWorkout({ ...newWorkout, level: e.target.value })
              }
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>

            <input
              placeholder="Exercises (Pushups, Squats)"
              value={newWorkout.exercises}
              onChange={(e) =>
                setNewWorkout({ ...newWorkout, exercises: e.target.value })
              }
            />

            <input
              type="number"
              placeholder="Duration in minutes"
              value={newWorkout.duration}
              onChange={(e) =>
                setNewWorkout({
                  ...newWorkout,
                  duration: Number(e.target.value)
                })
              }
            />

            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={addWorkout} style={saveBtn}>
                Create Workout
              </button>

              <button onClick={() => setShowModal(false)} style={cancelBtn}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showAssign && (
        <div style={overlay}>
          <div style={modal}>
            <h2>Assign Workout</h2>

            <p>{selectedWorkout?.title}</p>

            <select
              value={selectedMember}
              onChange={(e) => setSelectedMember(e.target.value)}
            >
              <option value="">Select Member</option>

              {members.map((member: any) => (
                <option key={member._id} value={member._id}>
                  {member.name}
                </option>
              ))}
            </select>

            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={handleAssignWorkout} style={saveBtn}>
                Assign
              </button>

              <button onClick={() => setShowAssign(false)} style={cancelBtn}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const grid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))",
  gap: "25px",
  marginTop: "25px"
};

const card: React.CSSProperties = {
  background: "white",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.08)"
};

const tag: React.CSSProperties = {
  background: "#f3f4f6",
  padding: "5px 10px",
  borderRadius: "6px",
  fontSize: "12px",
  marginRight: "6px"
};

const levelTag: React.CSSProperties = {
  background: "#facc15",
  padding: "4px 10px",
  borderRadius: "6px",
  fontSize: "12px"
};

const createBtn: React.CSSProperties = {
  padding: "10px 16px",
  background: "#111",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};

const deleteBtn: React.CSSProperties = {
  background: "#ef4444",
  color: "white",
  border: "none",
  padding: "6px 12px",
  borderRadius: "6px",
  cursor: "pointer"
};

const assignBtn: React.CSSProperties = {
  background: "#3b82f6",
  color: "white",
  border: "none",
  padding: "6px 12px",
  borderRadius: "6px",
  cursor: "pointer"
};

const overlay: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0,0,0,0.4)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const modal: React.CSSProperties = {
  background: "white",
  padding: "30px",
  borderRadius: "10px",
  width: "420px",
  display: "flex",
  flexDirection: "column",
  gap: "10px"
};

const saveBtn: React.CSSProperties = {
  padding: "10px",
  background: "#111",
  color: "white",
  border: "none",
  borderRadius: "6px"
};

const cancelBtn: React.CSSProperties = {
  padding: "10px",
  background: "#ddd",
  border: "none",
  borderRadius: "6px"
};

export default Workouts;