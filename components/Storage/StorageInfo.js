import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { app } from "../../config/firebaseConfig";
import { useSession } from "next-auth/react";

const StorageInfo = () => {

    const db = getFirestore(app)
    const {data:session} = useSession()
    const [totalSizeUsed,setTotalSizeUsed]=useState(0);
    let totalSize=0;

    useEffect(()=>{
        if(session){
            totalSize = 0;
            getAllFiles();
        }
    },[session])

    const getAllFiles = async () =>{
        const q = query(collection(db,"files"), where ("createdBy", "==", session.user.email))
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc)=>{
            totalSize=totalSize+doc.data()['size'];
        })
        setTotalSizeUsed((totalSize/1024**2).toFixed(2)+" MB");
    }
  return (
    <div className="mt-7">
      <h2 className="text-[22px] font-bold">
        {totalSizeUsed}
        <span className="text-[14px] font-medium"> used of </span> 5GB
      </h2>
      <div className="w-full bg-gray-200 rounded-full h-2.5 flex">
        <div className="bg-blue-600 h-2.5 w-[25%]"></div>
        <div className="bg-green-600 h-2.5 w-[35%]"></div>
        <div className="bg-yellow-600 h-2.5 w-[25%]"></div>
      </div>
    </div>
  );
};

export default StorageInfo;
