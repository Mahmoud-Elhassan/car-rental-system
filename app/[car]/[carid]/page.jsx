"use client";

import { db, storage } from "@/app/firebase";
import { doc, getDoc } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { v4 } from "uuid";

const Carhistory = () => {
  const [carData, setCarData] = useState(null);
  const [carImages, setCarImages] = useState([]);
  const params = useParams();
  let carImagesNs = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

  const docRef = doc(db, `${params.car}`, `${params.carid}`);

  useEffect(() => {
    getDocHandler();
  }, []);

  const getDocHandler = async () => {
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setCarData(docSnap.data());
      await Promise.all(
        carImagesNs.map((e) => {
          getDownloadURL(ref(storage, `${params.car}/${e}`)).then((e) => {
            setCarImages((oldArray) => [...oldArray, e]);
          });
        })
      );
    } else {
      console.log("Document does not exist");
    }
  };

  return (
    <main className="w-screen p-24">
      <h2 className="mb-2 text-lg font-semibold text-gray-900 text-black ">
        Car history:
      </h2>
      {carData ? (
        <ul className="max-w-md space-y-1 text-slate-900 list-disc list-inside ">
          <li>Name: {carData.name}</li>
          <li>From: {carData.from}</li>
          <li>To : {carData.to}</li>
        </ul>
      ) : (
        <p>Client does not exist</p>
      )}
      {carImages.map((e) => (
        <Image key={v4()} src={e} width={500} height={500} alt="" />
      ))}
    </main>
  );
};

export default Carhistory;
