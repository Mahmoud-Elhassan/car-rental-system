"use client";

import Link from "next/link";
import Clientcard from "../_components/Clientcard";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const Car = () => {
  const params = useParams();
  const [carHitroy, setCarHitroy] = useState(null);

  useEffect(() => {
    getDocsHandler();
  }, []);

  const getDocsHandler = async () => {
    await getDocs(collection(db, `${params.car}`)).then((docs) => {
      setCarHitroy(docs.docs);
    });
  };

  return (
    <main className="flex flex-col justify-evenly items-center w-screen ">
      <div className="w-11/12 lg:w-9/12 mt-10 flex flex-col">
        <h1 className="my-5 text-lg font-semibold">Car History:</h1>
        <div className="flex flex-col">
          {carHitroy &&
            carHitroy.map((card) => (
              <Clientcard
                key={card.id}
                id={card.id}
                card={card.data()}
                par={params.car}
              />
            ))}
        </div>
      </div>

      <Link
        href={`/${params.car}/add`}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 m-5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Add a new history
      </Link>
    </main>
  );
};

export default Car;
