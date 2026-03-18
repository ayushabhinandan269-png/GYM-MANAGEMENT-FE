import { useEffect, useState } from "react";

import {
  getMembers,
  deleteMember,
  createMember,
  assignPlan,
  assignTrainer
} from "../../api/memberAPI";

import { getPlans } from "../../api/planAPI";
import { getTrainers } from "../../api/trainerAPI";

import { useActivity } from "../../context/ActivityContext";


/* ---------------- DEFAULT PLANS (FALLBACK) ---------------- */

const fallbackPlans = [
{
  _id:"basic",
  name:"Basic",
  price:20,
  duration:"1 Month"
},
{
  _id:"standard",
  name:"Standard",
  price:40,
  duration:"3 Months"
},
{
  _id:"premium",
  name:"Premium",
  price:80,
  duration:"6 Months"
}
]


interface Member{
  _id:string
  name:string
  email:string
  membershipStatus?:string
  membershipPlan?:{_id:string,name:string}
  trainerAssigned?:{_id:string,name:string}
}

function ManageMembers(){

const [members,setMembers] = useState<Member[]>([])
const [plans,setPlans] = useState<any[]>([])
const [trainers,setTrainers] = useState<any[]>([])

const [search,setSearch] = useState("")
const [filterPlan,setFilterPlan] = useState("")

const [showAdd,setShowAdd] = useState(false)

const [newMember,setNewMember] = useState({
name:"",
email:"",
password:"123456",
planId:"",
trainerId:""
})

const {addActivity} = useActivity()


/* ---------------- FETCH DATA ---------------- */

const fetchData = async()=>{

try{

const m = await getMembers()
const p = await getPlans()
const t = await getTrainers()

setMembers(m.data)

let plansData = p.data?.plans || p.data || []
const trainersData = t.data?.trainers || t.data || []

// if backend has no plans use fallback
if(!plansData || plansData.length === 0){
plansData = fallbackPlans
}

// sort plans by price
plansData.sort((a:any,b:any)=>a.price-b.price)

setPlans(plansData)
setTrainers(trainersData)

}catch(err){

console.error("Fetch error",err)

}

}

useEffect(()=>{
fetchData()
},[])



/* ---------------- DELETE MEMBER ---------------- */

const removeMember = async(id:string)=>{

if(!confirm("Delete member?")) return

await deleteMember(id)

addActivity("Member deleted")

fetchData()

}



/* ---------------- CREATE MEMBER ---------------- */

const addMember = async()=>{

try{

const res = await createMember({
name:newMember.name,
email:newMember.email,
password:newMember.password
})

const memberId = res.data._id

if(newMember.planId){

await assignPlan({
userId:memberId,
planId:newMember.planId
})

}

if(newMember.trainerId){

await assignTrainer({
userId:memberId,
trainerId:newMember.trainerId
})

}

addActivity(`Member ${res.data.name} added`)

setShowAdd(false)

setNewMember({
name:"",
email:"",
password:"123456",
planId:"",
trainerId:""
})

fetchData()

}catch(err){

alert("Failed to create member")

}

}



/* ---------------- ASSIGN PLAN INLINE ---------------- */

const changePlan = async(memberId:string,planId:string)=>{

await assignPlan({
userId:memberId,
planId
})

addActivity("Plan assigned")

fetchData()

}



/* ---------------- ASSIGN TRAINER INLINE ---------------- */

const changeTrainer = async(memberId:string,trainerId:string)=>{

await assignTrainer({
userId:memberId,
trainerId
})

addActivity("Trainer assigned")

fetchData()

}



/* ---------------- FILTER MEMBERS ---------------- */

const filteredMembers = members.filter(m=>{

if(search &&
!m.name.toLowerCase().includes(search.toLowerCase()) &&
!m.email.toLowerCase().includes(search.toLowerCase())
) return false

if(filterPlan && m.membershipPlan?.name !== filterPlan)
return false

return true

})



/* ---------------- UI ---------------- */

return(

<div style={{padding:"30px"}}>

<h1 style={{marginBottom:"20px"}}>Manage Members</h1>


{/* SEARCH + FILTER */}

<div style={topBar}>

<input
placeholder="Search members..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
style={input}
/>

<select
value={filterPlan}
onChange={(e)=>setFilterPlan(e.target.value)}
style={selectInput}
>

<option value="">All Plans</option>

{plans.length>0?(
plans.map(plan=>(
<option key={plan._id} value={plan.name}>
{plan.name}
</option>
))
):(
<option disabled>No Plans Found</option>
)}

</select>

<button style={addBtn} onClick={()=>setShowAdd(true)}>
+ Add Member
</button>

</div>



{/* MEMBER TABLE */}

<div style={tableBox}>

<table style={{width:"100%",borderCollapse:"collapse"}}>

<thead>

<tr>
<th style={th}>Name</th>
<th style={th}>Email</th>
<th style={th}>Plan</th>
<th style={th}>Trainer</th>
<th style={th}>Status</th>
<th style={th}>Actions</th>
</tr>

</thead>

<tbody>

{filteredMembers.map(m=>(

<tr key={m._id}>

<td style={td}>{m.name}</td>

<td style={td}>{m.email}</td>


<td style={td}>

<select
style={selectInline}
value={m.membershipPlan?._id || ""}
onChange={(e)=>changePlan(m._id,e.target.value)}
>

<option value="">None</option>

{plans.map(plan=>(
<option key={plan._id} value={plan._id}>
{plan.name} (${plan.price})
</option>
))}

</select>

</td>


<td style={td}>

<select
style={selectInline}
value={m.trainerAssigned?._id || ""}
onChange={(e)=>changeTrainer(m._id,e.target.value)}
>

<option value="">None</option>

{trainers.map(t=>(
<option key={t._id} value={t._id}>
{t.name}
</option>
))}

</select>

</td>


<td style={td}>

<span style={{
padding:"4px 10px",
borderRadius:"20px",
background:
m.membershipStatus==="active"
? "#4CAF50"
: "#f44336",
color:"white",
fontSize:"12px"
}}>
{m.membershipStatus || "expired"}
</span>

</td>


<td style={td}>

<button
style={deleteBtn}
onClick={()=>removeMember(m._id)}
>
Delete
</button>

</td>

</tr>

))}

</tbody>

</table>

</div>



{/* ADD MEMBER MODAL */}

{showAdd && (

<div style={modalOverlay}>

<div style={modalBox}>

<h2>Add New Member</h2>

<label>Name</label>
<input
style={input}
placeholder="Enter name"
value={newMember.name}
onChange={(e)=>setNewMember({...newMember,name:e.target.value})}
/>

<label>Email</label>
<input
style={input}
placeholder="Enter email"
value={newMember.email}
onChange={(e)=>setNewMember({...newMember,email:e.target.value})}
/>


<label>Choose Membership Plan</label>

<select
style={selectInput}
value={newMember.planId}
onChange={(e)=>setNewMember({...newMember,planId:e.target.value})}
>

<option value="">Select Plan</option>

{plans.map(plan=>(
<option key={plan._id} value={plan._id}>
{plan.name} (${plan.price}) - {plan.duration}
</option>
))}

</select>


<label>Assign Trainer</label>

<select
style={selectInput}
value={newMember.trainerId}
onChange={(e)=>setNewMember({...newMember,trainerId:e.target.value})}
>

<option value="">Select Trainer</option>

{trainers.map(t=>(
<option key={t._id} value={t._id}>
{t.name}
</option>
))}

</select>


<div style={buttonRow}>

<button style={createBtn} onClick={addMember}>
Create Member
</button>

<button style={cancelBtn}
onClick={()=>setShowAdd(false)}>
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

const topBar: React.CSSProperties = {
display:"flex",
gap:"15px",
marginBottom:"20px"
}

const input: React.CSSProperties = {
padding:"10px",
border:"1px solid #ddd",
borderRadius:"6px",
width:"100%"
}

const selectInput: React.CSSProperties = {
padding:"10px",
border:"1px solid #ddd",
borderRadius:"6px",
width:"100%"
}

const selectInline: React.CSSProperties = {
padding:"6px",
borderRadius:"6px",
border:"1px solid #ddd"
}

const tableBox: React.CSSProperties = {
background:"white",
borderRadius:"10px",
padding:"20px",
boxShadow:"0 8px 25px rgba(0,0,0,0.08)"
}

const th: React.CSSProperties = {
padding:"10px",
textAlign:"left"
}

const td: React.CSSProperties = {
padding:"10px",
borderTop:"1px solid #eee"
}

const addBtn: React.CSSProperties = {
padding:"10px 15px",
background:"#111",
color:"white",
border:"none",
borderRadius:"6px",
cursor:"pointer"
}

const deleteBtn: React.CSSProperties = {
background:"#f44336",
color:"white",
border:"none",
padding:"6px 10px",
borderRadius:"5px",
cursor:"pointer"
}

const modalOverlay: React.CSSProperties = {
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

const modalBox: React.CSSProperties = {
background:"white",
padding:"35px",
borderRadius:"12px",
display:"flex",
flexDirection:"column",
gap:"12px",
width:"420px",
boxShadow:"0 20px 50px rgba(0,0,0,0.25)"
}

const buttonRow: React.CSSProperties = {
display:"flex",
gap:"10px",
marginTop:"10px"
}

const createBtn: React.CSSProperties = {
padding:"10px 16px",
background:"#111",
color:"white",
border:"none",
borderRadius:"6px",
cursor:"pointer"
}

const cancelBtn: React.CSSProperties = {
padding:"10px 16px",
background:"#ddd",
border:"none",
borderRadius:"6px"
}

export default ManageMembers