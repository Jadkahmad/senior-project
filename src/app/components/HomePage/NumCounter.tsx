"use client";
import React from "react";
import CountUp from "react-countup";

const NumCounter = () => {
  return (
    <div className="bg-blue-500 text-white py-12">
      <div className="container grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="flex flex-col items-center justify-center">
          <p className="text-3xl font-semibold">
            <CountUp
              end={872}
              duration={3}
              enableScrollSpy={true}
              scrollSpyOnce={true}
            />
          </p>
          <p>Expert tutors</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-3xl font-semibold">
            <CountUp
              end={20000}
              separator=","
              suffix="+"
              duration={5}
              enableScrollSpy={true}
              scrollSpyOnce={true}
            />
          </p>
          <p>Hours content</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-3xl font-semibold">
            {" "}
            <CountUp
              end={298}
              duration={5}
              enableScrollSpy={true}
              scrollSpyOnce={true}
            />{" "}
          </p>
          <p>Subject and courses</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-3xl font-semibold">
            <CountUp
              end={72878}
              separator=","
              suffix="+"
              duration={5}
              enableScrollSpy={true}
              scrollSpyOnce={true}
            />
          </p>
          <p>Active students</p>
        </div>
      </div>

      {/* Trusted by logos */}
      <div className="mt-24 sm:mt-32">
              <p className="text-center text-sm font-semibold text-white mb-15">
                PROUDLY TRUSTED BY LEADING SCHOOLS
              </p>
              <div className="grid grid-cols-2 gap-8 md:grid-cols-6 lg:grid-cols-6">
                <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1" >
                  <img


                    src="/school1.png"
                    alt="Company logo"
                    className="h-25 object-contain"
                  />
                </div>
                <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
                  <img
                    src="https://tse2.mm.bing.net/th?id=OIP.21IBr4JKYC5RouYbN3dz4gHaHq&pid=Api&P=0&h=220"
                    alt="Company logo"
                    className="h-25 object-contain"
                  />
                </div>
                <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
                  <img
                    src="https://tse2.mm.bing.net/th?id=OIP.ZroXWUnIt6_FDIvj0l_CPgHaHa&pid=Api&P=0&h=220"
                    alt="Company logo"
                    className="h-25 object-contain"
                  />
                </div>
                <div className="col-span-1 flex justify-center md:col-span-3 lg:col-span-1">
                  <img
                    src="https://play-lh.googleusercontent.com/FDgHBBLihIzjDlacngnmSQ_prerKH3R3Ik19Wsqd_WaW-Vlm2Ng81MruJrPxX6RaSw"
                    alt="Company logo"
                    className="h-25 object-contain"
                  />
                </div>
                <div className="col-span-2 flex justify-center md:col-span-3 lg:col-span-1">
                  <img
                    src="https://tse1.mm.bing.net/th?id=OIP.toexZkhddIRY56ORXkYT6wAAAA&pid=Api&P=0&h=220"
                    alt="Company logo"
                    className="h-25 object-contain"
                  />
                </div>
                <div className="col-span-2 flex justify-center md:col-span-3 lg:col-span-1">
                  <img
                    src="https://www.edarabia.com/wp-content/uploads/2019/02/lebanese-american-school-mount-lebanon-200x200.jpg"
                    alt="Company logo"
                    className="h-25 object-contain"
                  />
                </div>
              </div>
            </div>
      
    </div>
    
  );
};

export default NumCounter;