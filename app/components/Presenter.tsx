"use client";



export default function Presenter({name, shift,id}: any) {
  return (
    <div className="text-gray-700 my-8 p-8 rounded-lg">
      <div className="flex items-center gap-2">
    
        <h3 className="font-bold text-gray-700">{name}</h3>
       
      </div>
      <div className=" flex my-8">
        <p className="break-all">{shift}</p>
        
      </div>
     
      
   
    </div>
  );
}
