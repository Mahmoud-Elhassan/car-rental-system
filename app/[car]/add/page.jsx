"use client";
import { auth, db, storage } from "@/app/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { v4 } from "uuid";

const Add = () => {
  const params = useParams();
  const router = useRouter();

  const [imageArray, setImageArray] = useState([]);
  const [imgSrcArray, setImgSrcArray] = useState([]);
  const [loading, setLoading] = useState(true);

  const webcamRef = useRef(null);
  // let i = 0;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoading(false);
      } else {
        router.push("/login");
      }
    });
  }, []);

  const videoConstraints = {
    facingMode: { exact: "environment" },
  };

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrcArray([...imgSrcArray, imageSrc]);
    console.log(imgSrcArray);
  };

  const formHandler = async (e) => {
    e.preventDefault();
    console.log(imageArray);

    await addDoc(collection(db, params.car), {
      name: e.target[0].value,
      date: new Date().toLocaleString(),
      imagesArray: imgSrcArray,
    });
    // Array.from(e.target[3].files).forEach(async (file) => {
    //   const storageRef = ref(storage, `${params.car}/` + uuidv4());
    //   await uploadBytes(storageRef, file);
    //   console.log("Done");
    // });

    // await Promise.all(
    //   imageArray.map((e) => {
    //     const storageRef = ref(storage, `${params.car}/` + `${i++}`);
    //     uploadBytes(storageRef, e);
    //     // console.log(e);
    //   })
    // );
    router.push(`/${params.car}`);
  };

  return (
    <>
      {!loading && (
        <main className=" flex flex-col items-center w-screen overflow-x-hidden">
          <form
            className="flex flex-col py-16 w-10/12 lg:w-9/12"
            onSubmit={formHandler}
          >
            <div>
              <label
                htmlFor="name"
                className="block  text-sm font-medium text-gray-900 "
              >
                Client Name
              </label>
              <input
                type="text"
                id="name"
                className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>

            <button
              type="submit"
              className="text-white bg-blue-700 my-12 hover:bg-blue-800 focus:outline-none  font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              Submit
            </button>
          </form>
          <div className=" flex flex-col items-center w-10/12 lg:w-9/12">
            <section className="mb-10">
              <h2 className="mb-2 text-lg font-semibold text-gray-900 ">
                :يرجى تصوير الصور بالترتيب
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

            <Webcam
              audio={false}
              ref={webcamRef}
              videoConstraints={videoConstraints}
              screenshotFormat="image/jpeg"
              className="w-full"
            />
            <button
              className="text-white bg-blue-700 my-12 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
              onClick={capture}
            >
              Capture photo
            </button>
            {imgSrcArray &&
              imgSrcArray.map((img, i) => {
                return (
                  <>
                    <p>{++i}</p>
                    <img className="w-full my-5" key={v4()} src={img} alt="" />
                  </>
                );
              })}
          </div>
        </main>
      )}
    </>
  );
};

export default Add;
