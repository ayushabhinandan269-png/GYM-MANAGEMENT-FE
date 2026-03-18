import { useEffect, useState } from "react";
import {
  getTrainers,
  createTrainer,
  deleteTrainer,
  updateTrainer
} from "../../api/trainerAPI";

function ManageTrainers() {

const [trainers,setTrainers] = useState<any[]>([])
const [search,setSearch] = useState("")
const [filter,setFilter] = useState("")

const [showAdd,setShowAdd] = useState(false)
const [showEdit,setShowEdit] = useState(false)

const [selectedTrainer,setSelectedTrainer] = useState<any>(null)

const [newTrainer,setNewTrainer] = useState({
name:"",
specialization:"",
experience:0,
contact:""
})


/* ---------------- DUMMY TRAINERS ---------------- */

const dummyTrainers = [

{
name:"Rahul",
specialization:"Strength Training",
experience:5,
contact:"9876543210",
members:6
},

{
name:"Priya",
specialization:"Yoga Trainer",
experience:4,
contact:"9123456780",
members:8
},

{
name:"Arjun",
specialization:"Cardio Trainer",
experience:6,
contact:"9988776655",
members:4
}

]



/* ---------------- FETCH TRAINERS ---------------- */

const fetchTrainers = async()=>{

try{

const res = await getTrainers()

let data = res.data || []

if(data.length === 0){

for(const trainer of dummyTrainers){
await createTrainer(trainer)
}

const refreshed = await getTrainers()
data = refreshed.data

}

setTrainers(data)

}catch(err){
console.error("Trainer fetch error",err)
}

}


useEffect(()=>{
fetchTrainers()
},[])



/* ---------------- STATS ---------------- */

const totalTrainers = trainers.length

const avgExperience =
Math.round(
trainers.reduce((sum,t)=>sum + t.experience,0) /
(trainers.length || 1)
)

const specializations =
[...new Set(trainers.map(t=>t.specialization))]

const totalMembers =
trainers.reduce((sum,t)=>sum + (t.members || Math.floor(Math.random()*10)),0)



/* ---------------- ADD TRAINER ---------------- */

const addTrainer = async()=>{

if(
!newTrainer.name ||
!newTrainer.specialization ||
!newTrainer.experience ||
!newTrainer.contact
){

alert("Please fill all fields")
return

}

try{

await createTrainer(newTrainer)

setShowAdd(false)

setNewTrainer({
name:"",
specialization:"",
experience:0,
contact:""
})

fetchTrainers()

}catch(err){

console.log("Create trainer error",err)

}

}



/* ---------------- DELETE TRAINER ---------------- */

const removeTrainer = async(id:string)=>{

if(!confirm("Delete this trainer?")) return

await deleteTrainer(id)

fetchTrainers()

}



/* ---------------- OPEN EDIT ---------------- */

const openEdit = (trainer:any)=>{
setSelectedTrainer(trainer)
setShowEdit(true)
}



/* ---------------- UPDATE TRAINER ---------------- */

const handleUpdate = async()=>{

try{

await updateTrainer(selectedTrainer._id,selectedTrainer)

setShowEdit(false)

fetchTrainers()

}catch(err){
console.log("Update error",err)
}

}



/* ---------------- SEARCH + FILTER ---------------- */

const filteredTrainers = trainers.filter(t=>{

if(filter && t.specialization !== filter) return false

return t.name.toLowerCase().includes(search.toLowerCase())

})



/* ---------------- UI ---------------- */

return(

<div style={{padding:"30px"}}>

<h1 style={{
textAlign:"center",
fontSize:"36px",
fontWeight:"700",
marginBottom:"30px",
color:"#111"
}}>
Manage Trainers
</h1>


{/* ---------------- STATS CARDS ---------------- */}

<div style={topBar}>

<div style={card}>
<h3>{totalTrainers}</h3>
<p>Total Trainers</p>
</div>

<div style={card}>
<h3>{avgExperience}</h3>
<p>Avg Experience</p>
</div>

<div style={card}>
<h3>{specializations.length}</h3>
<p>Specializations</p>
</div>

<div style={card}>
<h3>{totalMembers}</h3>
<p>Members Assigned</p>
</div>

</div>


{/* SEARCH + FILTER + ADD */}

<div style={topBar}>

<input
placeholder="Search trainers..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
style={input}
/>

<select
value={filter}
onChange={(e)=>setFilter(e.target.value)}
style={input}
>

<option value="">All Specializations</option>

{specializations.map(spec=>(
<option key={spec} value={spec}>
{spec}
</option>
))}

</select>

<button style={addBtn} onClick={()=>setShowAdd(true)}>
+ Add Trainer
</button>

</div>



{/* TRAINERS GRID */}

<div style={grid}>

{filteredTrainers.map(trainer=>(

<div
key={trainer._id}
style={{
...card,
display:"flex",
flexDirection:"column",
gap:"6px",
transition:"0.25s",
cursor:"pointer"
}}
onMouseEnter={(e)=>{
(e.currentTarget.style.transform = "translateY(-4px)")
}}
onMouseLeave={(e)=>{
(e.currentTarget.style.transform = "translateY(0px)")
}}
>

{/* AVATAR */}

<div style={{
width:"42px",
height:"42px",
borderRadius:"50%",
background:"#111",
color:"white",
display:"flex",
alignItems:"center",
justifyContent:"center",
fontWeight:"bold",
marginBottom:"8px"
}}>
{trainer.name.charAt(0)}
</div>

<h3>{trainer.name}</h3>

{/* SPECIALIZATION BADGE */}

<span style={{
background:"#f3f4f6",
padding:"4px 10px",
borderRadius:"6px",
fontSize:"12px",
width:"fit-content"
}}>
{trainer.specialization}
</span>

<p>Experience: {trainer.experience} yrs</p>

<p>Contact: {trainer.contact}</p>

<p>Members: {trainer.members || Math.floor(Math.random()*10)}</p>

<div style={btnRow}>

<button
style={editBtn}
onClick={()=>openEdit(trainer)}
>
Edit
</button>

<button
style={deleteBtn}
onClick={()=>removeTrainer(trainer._id)}
>
Delete
</button>

</div>

</div>

))}

</div>





{showAdd &&(

<div style={overlay}>

<div style={modal}>

<h2>Add Trainer</h2>

<input
placeholder="Name"
style={input}
value={newTrainer.name}
onChange={(e)=>setNewTrainer({...newTrainer,name:e.target.value})}
/>

<input
placeholder="Specialization"
style={input}
value={newTrainer.specialization}
onChange={(e)=>setNewTrainer({...newTrainer,specialization:e.target.value})}
/>

<input
placeholder="Experience (years)"
type="number"
style={input}
value={newTrainer.experience}
onChange={(e)=>setNewTrainer({...newTrainer,experience:Number(e.target.value)})}
/>

<input
placeholder="Contact"
style={input}
value={newTrainer.contact}
onChange={(e)=>setNewTrainer({...newTrainer,contact:e.target.value})}
/>

<div style={btnRow}>

<button style={saveBtn} onClick={addTrainer}>
Create
</button>

<button style={cancelBtn} onClick={()=>setShowAdd(false)}>
Cancel
</button>

</div>

</div>

</div>

)}





{showEdit && selectedTrainer &&(

<div style={overlay}>

<div style={modal}>

<h2>Edit Trainer</h2>

<input
style={input}
value={selectedTrainer.name}
onChange={(e)=>setSelectedTrainer({
...selectedTrainer,
name:e.target.value
})}
/>

<input
style={input}
value={selectedTrainer.specialization}
onChange={(e)=>setSelectedTrainer({
...selectedTrainer,
specialization:e.target.value
})}
/>

<input
type="number"
style={input}
value={selectedTrainer.experience}
onChange={(e)=>setSelectedTrainer({
...selectedTrainer,
experience:Number(e.target.value)
})}
/>

<input
style={input}
value={selectedTrainer.contact}
onChange={(e)=>setSelectedTrainer({
...selectedTrainer,
contact:e.target.value
})}
/>

<div style={btnRow}>

<button style={saveBtn} onClick={handleUpdate}>
Update
</button>

<button style={cancelBtn} onClick={()=>setShowEdit(false)}>
Cancel
</button>

</div>

</div>

</div>

)}

</div>

)

}



/* ---------------- STYLES ---------------- */

const topBar:React.CSSProperties={
display:"flex",
gap:"15px",
marginBottom:"20px"
}

const input:React.CSSProperties={
padding:"10px",
border:"1px solid #ddd",
borderRadius:"6px",
width:"100%"
}

const addBtn:React.CSSProperties={
padding:"10px 16px",
background:"#111",
color:"white",
border:"none",
borderRadius:"6px",
cursor:"pointer"
}

const grid:React.CSSProperties={
display:"grid",
gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",
gap:"20px"
}

const card:React.CSSProperties={
background:"white",
padding:"20px",
borderRadius:"10px",
boxShadow:"0 8px 25px rgba(0,0,0,0.08)"
}

const btnRow:React.CSSProperties={
display:"flex",
gap:"10px",
marginTop:"10px"
}

const editBtn:React.CSSProperties={
background:"#2196F3",
color:"white",
border:"none",
padding:"6px 10px",
borderRadius:"5px",
cursor:"pointer"
}

const deleteBtn:React.CSSProperties={
background:"#f44336",
color:"white",
border:"none",
padding:"6px 10px",
borderRadius:"5px",
cursor:"pointer"
}

const overlay:React.CSSProperties={
position:"fixed",
top:0,
left:0,
right:0,
bottom:0,
background:"rgba(0,0,0,0.5)",
display:"flex",
justifyContent:"center",
alignItems:"center"
}

const modal:React.CSSProperties={
background:"white",
padding:"30px",
borderRadius:"10px",
width:"350px",
display:"flex",
flexDirection:"column",
gap:"10px"
}

const saveBtn:React.CSSProperties={
padding:"10px",
background:"#111",
color:"white",
border:"none",
borderRadius:"6px",
cursor:"pointer"
}

const cancelBtn:React.CSSProperties={
padding:"10px",
background:"#ddd",
border:"none",
borderRadius:"6px"
}

export default ManageTrainers