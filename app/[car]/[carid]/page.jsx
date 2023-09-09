"use client";

import { auth, db, storage } from "@/app/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { v4 } from "uuid";

const Carhistory = () => {
  const [carData, setCarData] = useState(null);
  const [carImages, setCarImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const params = useParams();
  let carImagesNs = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

  const docRef = doc(db, `${params.car}`, `${params.carid}`);

  useEffect(() => {
    getDocHandler();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoading(false);
      } else {
        router.push("/login");
      }
    });
  }, []);

  const getDocHandler = async () => {
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setCarData(docSnap.data());
      // await Promise.all(
      //   carImagesNs.map((e) => {
      //     getDownloadURL(ref(storage, `${params.car}/${e}`)).then((e) => {
      //       setCarImages((oldArray) => [...oldArray, e]);
      //     });
      //   })
      // );
    } else {
      console.log("Document does not exist");
    }
  };

  return (
    <>
      {!loading && (
        <main className="w-screen flex flex-col py-32 items-center">
          <h2 className="mb-2 text-lg font-semibold text-gray-900 text-black ">
            Car history:
          </h2>
          {carData ? (
            <ul className="max-w-md space-y-1 text-slate-900 list-disc list-inside ">
              <li>Name: {carData.name}</li>
              <li>Date: {carData.date}</li>
            </ul>
          ) : (
            <p>Client does not exist</p>
          )}
          <section className="my-10">
            <h2 className="mb-2 text-lg font-semibold text-gray-900 ">
              :تم تصوير الصور بالترتيب الآتي
            </h2>
            <ul className="max-w-md space-y-1 text-gray-500 list-decimal list-inside ">
              <li>كفر امام يمين</li>
              <li>كفر امام يسار</li>
              <li>كفر خلف يمين</li>
              <li>كفر خلف يسار</li>
              <li>باب امام يمين</li>
              <li>باب امام يسار</li>
              <li>باب خلف يمين</li>
              <li>باب خلف يسار</li>
              <li>صدام امام</li>
              <li>صدام خلف</li>
              <li>كبوت</li>
              <li>شنطة</li>
              <li>ستبنة</li>
              <li>كنب امام</li>
              <li>كنب خلف</li>
              <li>طبلون</li>
            </ul>
          </section>
          <div className="w-screen flex flex-col items-center my-12">
            {carData &&
              carData.imagesArray.map((e, i) => (
                <>
                  <p>{++i}</p>
                  <img className="my-10 w-10/12" key={v4()} src={e} alt="" />
                </>
              ))}
          </div>
        </main>
      )}
    </>
  );
};

export default Carhistory;
