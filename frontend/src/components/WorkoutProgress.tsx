interface Props {
 progress: number;
}

const WorkoutProgress = ({ progress }: Props) => {

 return (

 <div className="bg-white p-6 rounded-xl shadow">

 <h3 className="font-semibold mb-3">
 Workout Progress
 </h3>

 <div className="w-full bg-gray-200 h-3 rounded-full">

 <div
 className="bg-blue-600 h-3 rounded-full"
 style={{ width: `${progress}%` }}
 />

 </div>

 <p className="text-sm text-gray-500 mt-2">
 {progress}% completed
 </p>

 </div>

 );
};

export default WorkoutProgress;