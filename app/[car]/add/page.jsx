"use client";
import { db, storage } from "@/app/firebase";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

const Add = () => {
  const params = useParams();
  const router = useRouter();

  const [imageArray, setImageArray] = useState([]);
  let i = 0;

  const formHandler = async (e) => {
    e.preventDefault();
    console.log(imageArray);

    await addDoc(collection(db, params.car), {
      name: e.target[0].value,
      from: e.target[1].value,
      to: e.target[2].value,
    });
    // Array.from(e.target[3].files).forEach(async (file) => {
    //   const storageRef = ref(storage, `${params.car}/` + uuidv4());
    //   await uploadBytes(storageRef, file);
    //   console.log("Done");
    // });

    await Promise.all(
      imageArray.map((e) => {
        const storageRef = ref(storage, `${params.car}/` + `${i++}`);
        uploadBytes(storageRef, e);
        // console.log(e);
      })
    );
    router.push(`/${params.car}`);
  };

  return (
    <main className=" flex justify-center w-screen overflow-x-hidden">
      <form
        className="flex flex-col py-20 justify-evenly w-11/12 lg:w-9/12"
        onSubmit={formHandler}
      >
        <div>
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Client Name
          </label>
          <input
            type="text"
            id="name"
            className="bg-gray-50 border mb-10 border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            required
          />
        </div>
        <div>
          <label
            htmlFor="from"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            From:
          </label>
          <input
            type="date"
            id="from"
            className="bg-gray-50 border mb-10 border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
            required
          />
        </div>
        <div>
          <label
            htmlFor="to"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            To:
          </label>
          <input
            type="date"
            id="to"
            className="bg-gray-50 border mb-10 border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            required
          />
        </div>
        <div>
          <label
            htmlFor="images-1"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            كفر امام يمين
          </label>
          <input
            className="bg-gray-50 border mb-10 border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            type="file"
            id="images-1"
            accept="image/*"
            onChange={(e) => setImageArray([...imageArray, e.target.files[0]])}
            required
          />
        </div>
        <div>
          <label
            htmlFor="images-2"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            كفر امام يسار
          </label>
          <input
            className="bg-gray-50 border mb-10 border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            type="file"
            id="images-2"
            accept="image/*"
            onChange={(e) => setImageArray([...imageArray, e.target.files[0]])}
            required
          />
        </div>
        <div>
          <label
            htmlFor="images-3"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            كفر خلف يمين
          </label>
          <input
            className="bg-gray-50 border mb-10 border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            type="file"
            id="images-3"
            accept="image/*"
            onChange={(e) => setImageArray([...imageArray, e.target.files[0]])}
            required
          />
        </div>
        <div>
          <label
            htmlFor="images-4"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            كفر خلف يسار
          </label>
          <input
            className="bg-gray-50 border mb-10 border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            type="file"
            id="images-4"
            accept="image/*"
            onChange={(e) => setImageArray([...imageArray, e.target.files[0]])}
            required
          />
        </div>
        <div>
          <label
            htmlFor="images-5"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            كبوت
          </label>
          <input
            className="bg-gray-50 border mb-10 border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            type="file"
            id="images-5"
            accept="image/*"
            onChange={(e) => setImageArray([...imageArray, e.target.files[0]])}
            required
          />
        </div>
        <div>
          <label
            htmlFor="images-6"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            صدام امامي
          </label>
          <input
            className="bg-gray-50 border mb-10 border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            type="file"
            id="images-6"
            accept="image/*"
            onChange={(e) => setImageArray([...imageArray, e.target.files[0]])}
            required
          />
        </div>
        <div>
          <label
            htmlFor="images-7"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            صدام خلفي
          </label>
          <input
            className="bg-gray-50 border mb-10 border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            type="file"
            id="images-7"
            accept="image/*"
            onChange={(e) => setImageArray([...imageArray, e.target.files[0]])}
            required
          />
        </div>
        <div>
          <label
            htmlFor="images-8"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            باب امام يمين
          </label>
          <input
            className="bg-gray-50 border mb-10 border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            type="file"
            id="images-8"
            accept="image/*"
            onChange={(e) => setImageArray([...imageArray, e.target.files[0]])}
            required
          />
        </div>
        <div>
          <label
            htmlFor="images-9"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            باب امام يسار
          </label>
          <input
            className="bg-gray-50 border mb-10 border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            type="file"
            id="images-9"
            accept="image/*"
            onChange={(e) => setImageArray([...imageArray, e.target.files[0]])}
            required
          />
        </div>
        <div>
          <label
            htmlFor="images-10"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            باب خلف يمين
          </label>
          <input
            className="bg-gray-50 border mb-10 border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            type="file"
            id="images-10"
            accept="image/*"
            onChange={(e) => setImageArray([...imageArray, e.target.files[0]])}
            required
          />
        </div>
        <div>
          <label
            htmlFor="images-11"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            باب خلف يسار
          </label>
          <input
            className="bg-gray-50 border mb-10 border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            type="file"
            id="images-11"
            accept="image/*"
            onChange={(e) => setImageArray([...imageArray, e.target.files[0]])}
            required
          />
        </div>
        <div>
          <label
            htmlFor="images-12"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            ستبنة
          </label>
          <input
            className="bg-gray-50 border mb-10 border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            type="file"
            id="images-12"
            accept="image/*"
            onChange={(e) => setImageArray([...imageArray, e.target.files[0]])}
            required
          />
        </div>
        <div>
          <label
            htmlFor="images-13"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            كنب خلفي
          </label>
          <input
            className="bg-gray-50 border mb-10 border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            type="file"
            id="images-13"
            accept="image/*"
            onChange={(e) => setImageArray([...imageArray, e.target.files[0]])}
            required
          />
        </div>
        <div>
          <label
            htmlFor="images-14"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            كنب امامي
          </label>
          <input
            className="bg-gray-50 border mb-10 border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            type="file"
            id="images-14"
            accept="image/*"
            onChange={(e) => setImageArray([...imageArray, e.target.files[0]])}
            required
          />
        </div>
        <div>
          <label
            htmlFor="images-15"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            طبلون
          </label>
          <input
            className="bg-gray-50 border mb-10 border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            type="file"
            id="images-15"
            accept="image/*"
            onChange={(e) => setImageArray([...imageArray, e.target.files[0]])}
            required
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 my-12 hover:bg-blue-800 focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </main>
  );
};

export default Add;
