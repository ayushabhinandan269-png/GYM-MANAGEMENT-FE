import { useEffect, useState } from "react";
import { Users, Dumbbell, CreditCard, UserCog, Moon, Sun } from "lucide-react";

import {
BarChart,
Bar,
XAxis,
YAxis,
Tooltip,
ResponsiveContainer,
CartesianGrid,
PieChart,
Pie,
Cell,
LineChart,
Line
} from "recharts";

import { getMembers } from "../../api/memberAPI";
import { getPlans } from "../../api/planAPI";
import { getWorkouts } from "../../api/workoutAPI";
import { getTrainers } from "../../api/trainerAPI";
import { useSocket } from "../../hooks/useSocket";

const COLORS = ["#f5c518","#4CAF50","#2196F3","#FF9800"];

function AdminDashboard(){

const [dark,setDark] = useState(false);

const [stats,setStats] = useState({
members:0,
trainers:0,
plans:0,
workouts:0,
revenue:0
});

const [members,setMembers] = useState<any[]>([]);
const [chartData,setChartData] = useState<any[]>([]);
const [revenueData,setRevenueData] = useState<any[]>([]);
const [workoutPopularity,setWorkoutPopularity] = useState<any[]>([]);
const [activities,setActivities] = useState<any[]>([]);

useEffect(()=>{

const stored = localStorage.getItem("gymActivities");

if(stored){
const parsed = JSON.parse(stored);
setActivities(parsed.slice(0,4));
}

},[]);

/* REALTIME ACTIVITY STREAM */

useSocket((data:any)=>{

let message = "New activity";

switch(data.type){

case "member_created":
message = "👤 New member registered";
break;

case "trainer_added":
message = "🧑‍🏫 New trainer added";
break;

case "plan_purchased":
message = "💳 Membership plan purchased";
break;

case "workout_assigned":
message = "🏋️ Workout assigned to member";
break;

default:
message = data.message || "New activity";
}

setActivities(prev => [
{ message,time:new Date().toLocaleTimeString() },
...prev
].slice(0,4));

if(data.type === "member_created"){

setStats(prev=>({
...prev,
members:prev.members+1
}));

if(data.member){
setMembers(prev=>[data.member,...prev.slice(0,4)]);
}

}

});

/* FETCH DASHBOARD */

const fetchDashboardData = async ()=>{

try{

const [m,t,p,w] = await Promise.all([
getMembers(),
getTrainers(),
getPlans(),
getWorkouts()
]);

const memberList = m?.data || [];
const trainerList = t?.data || [];
const planList = p?.data || [];
const workoutList = w?.data || [];

setMembers(memberList.slice(0,5));

const revenue = planList.length * 500;

setStats({
members:memberList.length,
trainers:trainerList.length,
plans:planList.length,
workouts:workoutList.length,
revenue
});

setChartData([
{name:"Jan",members:10},
{name:"Feb",members:20},
{name:"Mar",members:35},
{name:"Apr",members:50},
{name:"May",members:70},
{name:"Jun",members:memberList.length}
]);

setRevenueData([
{name:"Jan",revenue:500},
{name:"Feb",revenue:1200},
{name:"Mar",revenue:1800},
{name:"Apr",revenue:2500},
{name:"May",revenue:3200},
{name:"Jun",revenue}
]);

if(workoutList.length === 0){

setWorkoutPopularity([
{name:"Strength",value:40},
{name:"Cardio",value:30},
{name:"Flexibility",value:20},
{name:"HIIT",value:10}
]);

}
else if(workoutList.length === 1){

setWorkoutPopularity([
{name:workoutList[0].name || "Workout",value:70},
{name:"Other",value:30}
]);

}
else{

setWorkoutPopularity(

workoutList.map((wk:any,index:number)=>({
name:wk.name || `Workout ${index+1}`,
value: Math.floor(Math.random()*100)+20
}))

);

}

}catch(err){
console.error("Dashboard fetch error",err);
}

};

useEffect(()=>{
fetchDashboardData();
},[]);

const bg = dark ? "#121212" : "#f4f4f4";
const card = dark ? "#1e1e1e" : "white";
const text = dark ? "white" : "black";

return(

<div style={{padding:"30px",background:bg,minHeight:"100vh",color:text}}>

<div style={{
display:"flex",
justifyContent:"space-between",
alignItems:"center",
marginBottom:"30px"
}}>

<h1>Admin Dashboard</h1>

<button
onClick={()=>setDark(!dark)}
style={{
padding:"8px 12px",
borderRadius:"6px",
border:"none",
cursor:"pointer"
}}>
{dark ? <Sun/> : <Moon/>}
</button>

</div>

{/* STATS */}

<div style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",
gap:"20px",
marginBottom:"40px"
}}>

<StatCard icon={<Users/>} title="Members" value={stats.members} card={card}/>
<StatCard icon={<UserCog/>} title="Trainers" value={stats.trainers} card={card}/>
<StatCard icon={<CreditCard/>} title="Plans" value={stats.plans} card={card}/>
<StatCard icon={<Dumbbell/>} title="Workouts" value={stats.workouts} card={card}/>
<StatCard icon={<CreditCard/>} title="Revenue" value={`$${stats.revenue}`} card={card}/>

</div>

{/* CHARTS */}

<div style={{
display:"grid",
gridTemplateColumns:"1fr 1fr",
gap:"25px",
marginBottom:"40px"
}}>

<div style={box(card)}>

<h3>Member Growth</h3>

<ResponsiveContainer width="100%" height={260}>
<BarChart data={chartData}>
<CartesianGrid strokeDasharray="3 3"/>
<XAxis dataKey="name"/>
<YAxis/>
<Tooltip/>
<Bar dataKey="members" fill="#f5c518"/>
</BarChart>
</ResponsiveContainer>

</div>

<div style={box(card)}>

<h3>Workout Popularity</h3>

<ResponsiveContainer width="100%" height={260}>
<PieChart>
<Pie data={workoutPopularity} dataKey="value" nameKey="name" outerRadius={100} label>
{workoutPopularity.map((_,index)=>(
<Cell key={index} fill={COLORS[index % COLORS.length]} />
))}
</Pie>
<Tooltip/>
</PieChart>
</ResponsiveContainer>

</div>

</div>

{/* REVENUE */}

<div style={{...box(card),marginBottom:"40px"}}>

<h3>Revenue Analytics</h3>

<ResponsiveContainer width="100%" height={260}>
<LineChart data={revenueData}>
<CartesianGrid strokeDasharray="3 3"/>
<XAxis dataKey="name"/>
<YAxis/>
<Tooltip/>
<Line type="monotone" dataKey="revenue" stroke="#4CAF50"/>
</LineChart>
</ResponsiveContainer>

</div>

{/* RECENT MEMBERS */}

<div style={{...box(card),marginBottom:"40px"}}>

<h2>Recent Members</h2>

<table style={{
width:"100%",
marginTop:"15px",
borderCollapse:"collapse"
}}>

<thead>
<tr style={{
textAlign:"left",
borderBottom:"2px solid #ddd"
}}>
<th style={{padding:"10px"}}>Name</th>
<th style={{padding:"10px"}}>Email</th>
</tr>
</thead>

<tbody>

{members.map((m,i)=>(
<tr key={i} style={{borderBottom:"1px solid #eee"}}>
<td style={{padding:"10px"}}>{m.name}</td>
<td style={{padding:"10px"}}>{m.email}</td>
</tr>
))}

</tbody>

</table>

</div>

{/* ACTIVITY STREAM */}

<div style={{...box(card),height:"260px",display:"flex",flexDirection:"column"}}>

<h2>Real-time Gym Activity</h2>

<div style={{overflowY:"auto",marginTop:"15px",flex:1}}>

{activities.length === 0 && (
<div style={{color:"gray"}}>No activity yet</div>
)}

{activities.map((a,i)=>(
<div key={i} style={{
marginBottom:"12px",
borderBottom:"1px solid #eee",
paddingBottom:"8px"
}}>
<strong>{a.message}</strong>
<div style={{fontSize:"12px",color:"gray"}}>
{a.time}
</div>
</div>
))}

</div>

</div>

</div>

);

}

function StatCard({icon,title,value,card}:any){

return(

<div style={{
background:card,
padding:"25px",
borderRadius:"10px",
boxShadow:"0 8px 20px rgba(0,0,0,0.08)"
}}>

<div style={{display:"flex",alignItems:"center",gap:"10px"}}>
{icon}
<h4>{title}</h4>
</div>

<h2 style={{marginTop:"10px"}}>{value}</h2>

</div>

);

}

const box=(bg:string)=>({

background:bg,
padding:"25px",
borderRadius:"10px",
boxShadow:"0 8px 20px rgba(0,0,0,0.08)"

});

export default AdminDashboard;