import {
 LineChart,
 Line,
 XAxis,
 YAxis,
 Tooltip,
 CartesianGrid
} from "recharts";

const data = [
 { day: "Mon", workouts: 1 },
 { day: "Tue", workouts: 2 },
 { day: "Wed", workouts: 1 },
 { day: "Thu", workouts: 3 },
 { day: "Fri", workouts: 2 }
];

const WorkoutChart = () => {

 return (

 <div className="bg-white p-6 rounded-xl shadow">

 <h3 className="font-semibold mb-4">
 Weekly Workout Activity
 </h3>

 <LineChart width={400} height={200} data={data}>
 <XAxis dataKey="day" />
 <YAxis />
 <Tooltip />
 <CartesianGrid stroke="#ccc" />
 <Line type="monotone" dataKey="workouts" stroke="#2563eb" />
 </LineChart>

 </div>

 );
};

export default WorkoutChart;