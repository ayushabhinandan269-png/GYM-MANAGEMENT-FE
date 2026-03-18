import { useEffect, useState } from "react";
import {
  getPlans,
  createPlan,
  deletePlan,
  updatePlan
} from "../../api/planAPI";

function ManagePlans() {

const [plans,setPlans] = useState<any[]>([])
const [showCreate,setShowCreate] = useState(false)
const [showEdit,setShowEdit] = useState(false)
const [selectedPlan,setSelectedPlan] = useState<any>(null)

const [newPlan,setNewPlan] = useState({
name:"",
price:0,
duration:"",
features:"",
image:""
})

/* FETCH PLANS */

const fetchPlans = async()=>{
const res = await getPlans()
setPlans(res.data)
}

useEffect(()=>{
fetchPlans()
},[])

/* ANALYTICS */

const totalPlans = plans.length
const activePlans = plans.filter(p=>p.isActive).length

/* CREATE PLAN */

const addPlan = async()=>{

if(!newPlan.name || !newPlan.price || !newPlan.duration){
alert("Please fill required fields")
return
}

const featuresArray =
newPlan.features
? newPlan.features.split(",").map((f)=>f.trim())
: []

await createPlan({
name:newPlan.name,
price:newPlan.price,
duration:newPlan.duration,
features:featuresArray,
image:newPlan.image
})

setShowCreate(false)

setNewPlan({
name:"",
price:0,
duration:"",
features:"",
image:""
})

fetchPlans()

}

/* DELETE PLAN */

const removePlan = async(id:string)=>{
if(!confirm("Delete plan?")) return
await deletePlan(id)
fetchPlans()
}

/* EDIT PLAN */

const openEdit = (plan:any)=>{
setSelectedPlan({
...plan,
features:plan.features?.join(", ")
})
setShowEdit(true)
}

const saveEdit = async()=>{

const featuresArray =
selectedPlan.features
? selectedPlan.features.split(",").map((f:string)=>f.trim())
: []

await updatePlan(selectedPlan._id,{
...selectedPlan,
features:featuresArray
})

setShowEdit(false)
fetchPlans()
}

/* FIND PREMIUM PLAN */

const premiumIndex =
plans.length>0
? plans.reduce((maxIndex,plan,i,arr)=>
plan.price>arr[maxIndex].price?i:maxIndex
,0)
:-1

return(

<div style={{padding:"50px 60px"}}>

<h1 style={{
textAlign:"center",
fontSize:"36px",
fontWeight:"700",
marginBottom:"40px"
}}>
Manage Plans
</h1>

{/* STATS */}

<div style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",
gap:"15px",
marginBottom:"30px"
}}>

<StatCard title="Total Plans" value={totalPlans}/>
<StatCard title="Active Plans" value={activePlans}/>

</div>

<button
onClick={()=>setShowCreate(true)}
style={createBtn}
>
+ Create Plan
</button>

{/* PLANS GRID */}

<div style={grid}>

{plans.map((plan,index)=>{

const isPremium = index===premiumIndex

return(

<div key={plan._id} style={{
background:"white",
borderRadius:"12px",
boxShadow:"0 10px 25px rgba(0,0,0,0.08)",
border:isPremium?"2px solid #facc15":"1px solid #eee",
overflow:"hidden"
}}>

{plan.image && (
<img
src={plan.image}
alt={plan.name}
style={{
width:"100%",
height:"160px",
objectFit:"cover"
}}
/>
)}

<div style={{padding:"20px"}}>

{isPremium&&(
<span style={popularBadge}>
Most Popular
</span>
)}

{plan.isActive && (
<span style={activeBadge}>
Active
</span>
)}

<h2>{plan.name}</h2>

<h1>₹{plan.price}</h1>

<p>{plan.duration}</p>

<div style={{marginBottom:"10px"}}>

{plan.features?.map((f:string,i:number)=>(
<span key={i} style={featureTag}>{f}</span>
))}

</div>

<div style={{display:"flex",gap:"8px",marginTop:"10px"}}>

<button onClick={()=>openEdit(plan)} style={editBtn}>
Edit
</button>

<button
onClick={()=>removePlan(plan._id)}
style={deleteBtn}
>
Delete
</button>

</div>

</div>

</div>

)

})}

</div>

{/* CREATE MODAL */}

{showCreate&&(

<Modal title="Create Membership Plan">

<input
placeholder="Plan Name"
value={newPlan.name}
onChange={(e)=>setNewPlan({...newPlan,name:e.target.value})}
/>

<input
type="number"
placeholder="Price"
value={newPlan.price}
onChange={(e)=>setNewPlan({...newPlan,price:Number(e.target.value)})}
/>

<select
value={newPlan.duration}
onChange={(e)=>setNewPlan({...newPlan,duration:e.target.value})}
>

<option value="">Duration</option>
<option value="Monthly">Monthly</option>
<option value="Quarterly">Quarterly</option>
<option value="Yearly">Yearly</option>

</select>

<input
placeholder="Image URL"
value={newPlan.image}
onChange={(e)=>setNewPlan({...newPlan,image:e.target.value})}
/>

<input
placeholder="Features (comma separated)"
value={newPlan.features}
onChange={(e)=>setNewPlan({...newPlan,features:e.target.value})}
/>

<div style={{display:"flex",gap:"10px"}}>

<button onClick={addPlan} style={saveBtn}>
Create Plan
</button>

<button onClick={()=>setShowCreate(false)} style={cancelBtn}>
Cancel
</button>

</div>

</Modal>

)}

{/* EDIT MODAL */}

{showEdit&&selectedPlan&&(

<Modal title="Edit Plan">

<input
value={selectedPlan.name}
onChange={(e)=>setSelectedPlan({...selectedPlan,name:e.target.value})}
/>

<input
type="number"
value={selectedPlan.price}
onChange={(e)=>setSelectedPlan({...selectedPlan,price:Number(e.target.value)})}
/>

<input
value={selectedPlan.image}
placeholder="Image URL"
onChange={(e)=>setSelectedPlan({...selectedPlan,image:e.target.value})}
/>

<input
value={selectedPlan.features}
placeholder="Features"
onChange={(e)=>setSelectedPlan({...selectedPlan,features:e.target.value})}
/>

<div style={{display:"flex",gap:"10px"}}>

<button onClick={saveEdit} style={saveBtn}>
Save
</button>

<button onClick={()=>setShowEdit(false)} style={cancelBtn}>
Cancel
</button>

</div>

</Modal>

)}

</div>

)

}

/* COMPONENTS */

const StatCard=({title,value}:any)=>(
<div style={statCard}>
<h3>{value}</h3>
<p>{title}</p>
</div>
)

const Modal=({children,title}:any)=>(
<div style={overlay}>
<div style={modal}>
<h2>{title}</h2>
{children}
</div>
</div>
)

/* STYLES — UNCHANGED */

const grid: React.CSSProperties = {
display:"grid",
gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",
gap:"25px"
}

const createBtn: React.CSSProperties = {
padding:"10px 16px",
background:"#111",
color:"white",
border:"none",
borderRadius:"6px",
marginBottom:"25px",
cursor:"pointer"
}

const statCard: React.CSSProperties = {
background:"white",
padding:"15px",
borderRadius:"10px",
boxShadow:"0 6px 18px rgba(0,0,0,0.08)"
}

const featureTag: React.CSSProperties = {
background:"#f3f4f6",
padding:"4px 8px",
borderRadius:"6px",
fontSize:"12px",
marginRight:"5px"
}

const popularBadge: React.CSSProperties = {
background:"#facc15",
padding:"4px 10px",
fontSize:"12px",
borderRadius:"20px"
}

const activeBadge: React.CSSProperties = {
background:"#10b981",
color:"white",
padding:"4px 10px",
fontSize:"12px",
borderRadius:"20px",
marginLeft:"8px"
}

const overlay: React.CSSProperties = {
position:"fixed",
top:0,left:0,right:0,bottom:0,
background:"rgba(0,0,0,0.5)",
display:"flex",
justifyContent:"center",
alignItems:"center"
}

const modal: React.CSSProperties = {
background:"white",
padding:"30px",
borderRadius:"10px",
width:"420px",
display:"flex",
flexDirection:"column",
gap:"10px"
}

const editBtn: React.CSSProperties = {
background:"#3b82f6",
color:"white",
border:"none",
padding:"6px 10px",
borderRadius:"6px"
}

const deleteBtn: React.CSSProperties = {
background:"#ef4444",
color:"white",
border:"none",
padding:"6px 10px",
borderRadius:"6px"
}

const saveBtn: React.CSSProperties = {
padding:"10px",
background:"#111",
color:"white",
border:"none",
borderRadius:"6px"
}

const cancelBtn: React.CSSProperties = {
padding:"10px",
background:"#ddd",
border:"none",
borderRadius:"6px"
}

export default ManagePlans;