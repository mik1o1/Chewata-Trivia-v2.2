import React, { useState, useEffect } from "react";
import { MdInfo } from "react-icons/md";
import { ImInfinite } from "react-icons/im";
import { BiTimeFive } from "react-icons/bi";
import { TbDeviceGamepad2 } from "react-icons/tb";
import categories from "@/assets/categories.json";
import Image from "next/image";

export default function DescriptionAndCredits() {
  const [isOpen, setIsOpen] = useState(false);

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const gameModes = [
    {
      icon: <TbDeviceGamepad2 className="text-3xl" />,
      title: "ቀላል",
      description: "ሁሉንም ጥያቄዎች ሳይሳሳቱ መልሶ ማሸነፍ! ነፍስ-አድን አማራጮቹን መጠቀም ይቻላል።",
    },
    {
      icon: <BiTimeFive className="text-3xl" />,
      title: "ፈጣኑ",
      description:
        "ሁሉንም ጥያቄዎች በተሰጠው ጊዜ መልሶ ማሸነፍ! ነፍስ-አድን አማራጮቹን አሁንም መጠቀም ይቻላል።",
    },
    {
      icon: <ImInfinite className="text-3xl" />,
      title: "የትየለሌ",
      description: "ብዙ መልሶ ማሸነፍ! እዚህ ላይም ነፍስ-አድን አማራጮቹን መጠቀም ይቻላል።",
    },
  ];

  return (
    <div>
      <button
        className={`align-middle relative z-20 hover:scale-105 p-1.5 bg-white rounded-md`}
        onClick={() => setIsOpen(true)}
      >
        <MdInfo className="text-[25px]" style={{ color: "#1c233a" }} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 w-screen h-screen flex items-center justify-center z-50 p-4">
        <div className="fixed top-1/2 w-11/12 md:max-w-[90vh] max-h-[90vh] overflow-y-auto h-fit left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-slate-900 m-0 backdrop-blur-lg rounded-md py-9 px-8 md:px-11">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-2xl"
            aria-label="Close"
          >
            X
          </button>
          <h2 className="text-s md:text-xl font-semibold text-center text-blue-600 mb-2">
            ስለ ጨዋታው
          </h2>
            <div className="text-gray-700 text-sm mb-4 space-y-6">
              <p className="mb-6">
                <span className="ml-1 text-xs md:text-s ">
                  "አራዳ" ምን ያክል የማወቅ እና የማስታወስ ችሎታ የሚፈትኑበት ጨዋታ ነው። በዚህ ጨዋታ ለብቻ
                  ወይም በቡድን ሆኖ ካሉት የጥያቄ ምድቦች በመምረጥ መጫወትና መፎካከር ይችላሉ። ይማሩበታልም!
                </span>
              </p>

              <p className="mb-6">
                <span className="text-blue-600 font-semibold text-s md:text-xl block mb-2">
                  የጨዋታ መንገድ
                </span>
                <nav>
                  <ul className="flex flex-col sm:flex-row justify-center gap-5">
                    {gameModes.map((mode, index) => (
                      <li
                        key={index + mode.title}
                        className="bg-neutral-300 max-w-10/12 m:max-w-9 bg-opacity-30 backdrop-blur-[2px] rounded p-5 hover:scale-[1.03] transition-all hover:backdrop-blur-0 hover:bg-opacity-100 hover:bg-white shadow-sm"
                      >
                        <h3 className="text-s font-medium my-1">
                          {mode.title}
                        </h3>
                        <p className="text-xs md:text-s">{mode.description}</p>
                      </li>
                    ))}
                  </ul>
                </nav>
              </p>

              <p className="mb-2">
                <span className="text-blue-600 font-semibold text-s md:text-xl block">
                  ምርጫዎች
                </span>
                <section className="bg-white px-8 py-2 flex flex-col  text-slate-900 items-center w-full">
                  <ul className="grid grid-cols-2 grid-rows-subgrid  justify-center gap-3 md:gap-5">
                    {categories.map((category) => (
                      <li
                        key={category.id}
                        title={category.name}
                        className={`max-w-fit rounded outline-slate-800 hover:outline-offset-4 outline-[${category.color}] hover:scale-[1.03] transition-transform p-2 flex gap-1 items-center justify-center shadow-sm`}
                        style={{
                          backgroundColor: category.color,
                          outlineColor: category.color,
                        }}>
                        <Image
                          className="drop-shadow-lg"
                          src={`/categories-icons/${category.name.toLowerCase()}.svg`}
                          alt=""
                          width={30}
                          height={30}
                        />  <h3 className="text-xs md:text-s mt-1 text-center text-white drop-shadow-md"> {category.name}</h3>
                      </li>
                    ))}
                  </ul>
                </section>
              </p>

              <p className="mb-6">
                <span className="text-blue-600 font-semibold text-s md:text-xl block">
                  ውጤት መያዝ
                </span>
                <span className="text-xs md:text-s">
                  ውጤት የሚይዘው ተጫዋቹ/አጫዋቹ ሲሆን ውጤቱም የሚቀመጠው በተወሰነው መንገድ ነው። የተቀመጠውን
                  ውጤትም አጥፍቶ እንደአዲስ መጀመርም ይቻላል።
                </span>
              </p>

              <p className="mb-6">
                <span className="text-blue-600 font-semibold text-xs block">©EfuyeGella Publishers</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
