"use client";

import React, { useState } from "react";
import {useForm} from "react-hook-form";
import TextInput from "../FormInputs/TextInput";
import SubmitButton from "../FormInputs/SubmitButton";
import { GraduationCap, Heading1, IdCard, Phone, Send } from "lucide-react";
import { MdEmail, MdGrade } from "react-icons/md";
import { FaLocationArrow } from "react-icons/fa";

export type RegisterInputProps = {
  
    fullname: string;
    email: string;
    phone:string;
    role:string;
    program?:string;
    notes?:string;


  
    
  };

const SubmissionForm : React.FC = () => {



    const [isLoading, setIsLoading] = useState(false);
      const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm<RegisterInputProps>();



  async function onSubmit(data: RegisterInputProps) {
      console.log(data);
      //Here i should send data to my backend
      try {
        const res = await fetch('/api/submission', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
    
        if (!res.ok) {
          throw new Error('Failed to submit form');
        }
    
        const result = await res.json();
        console.log(result); 
    
        alert("Email sent");
      } catch (error) {
        console.error('Submission error:', error);
        alert("Error adding application");
      }


  }

  return (
    <section className="bg-gray-100 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1 space-y-4">
            <h4 className="font-extrabold text-center"> Students-Parents FAQ </h4>
            <div className="bg-blue-500 text-white p-6 rounded-2xl">
                
              <h3 className="font-semibold text-xl mb-2">
              What types of tutoring services do you offer?
              </h3>
              <p className="text-sm mb-4 py-4">
              We offer a range of tutoring services, including academic shadowing, agenda tutoring, subject-specific support, language support in multiple languages, music and art classes. All services can be provided either at our center or in-person.
              </p>
              {/*<button className="bg-white text-green-800 px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-100 transition duration-300">
                Book Appointment
              </button>
              */}
            </div>
            <div className="bg-blue-500 text-white p-6 rounded-2xl">
              <h3 className="font-semibold mb-2 text-xl">
              What is the cost of tutoring at ijtahed?
              </h3>
              <p className="text-sm mb-4 py-4">
              You will be charged on a monthly basis if you’re looking for an agenda teacher or a shadow teacher and on an hourly basis if you’re looking for a subject based teacher, but both ways, payment is through us on a monthly basis.
              </p>
              {/*<button className="bg-green-800 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-green-700 transition duration-300">
                Send a Mail
              </button>*/}
            </div>
          </div>

          <div className="col-span-2 bg-white p-6 rounded-2xl shadow">
            <h3 className="text-xl text-center font-semibold mb-4 text-blue-500">SignUp to your account </h3>
            <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>

            <label className="block text-sm font-medium text-black">

                  Account Type *
                </label>
                <select
                  {...register("role", { required: true })}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                >
                  <option value="">Select account type</option>
                  <option value="student">Student</option>
                  <option value="parent">Parent</option>
                  <option value="teacher">Teacher</option>
                </select>

            <TextInput
              icon={IdCard}
              label="Full Name"
              register={register}
              name="fullname"
              type="text"
              errors={errors}
              placeholder="  Enter Your Name..."
            />

            <div className="grid md:grid-cols-2 gap-4">
            

              <TextInput
              icon={MdEmail}
              label="Email"
              register={register}
              name="email"
              type="email"
              errors={errors}
              placeholder="  johndoe@gmail.com"
            />

            <TextInput
              icon={Phone}
              label="Phone Number"
              register={register}
              name="phone"
              
              errors={errors}
              placeholder="  Enter Your Number...+961"
            />

            


            </div>

            <div className="grid md:grid-cols-2 gap-4">

            <TextInput
              icon={FaLocationArrow}
              label="Address"
              register={register}
              name="address"
              type="text"
              errors={errors}
              placeholder="  Enter Your Location..."
            />

              <TextInput
              icon={GraduationCap}
              label="Educational Stage"
              register={register}
              name="program"
              type="text"
              errors={errors}
              placeholder="  Enter Your Current Academic Level..."
            />

                <div>
                <label className="block text-sm font-medium text-black mb-3">
                  Additional Information 
                </label>
                <textarea
                  {...register("notes")}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  rows={3}
                  
                  placeholder="Special requirements or notes"
                ></textarea>
              </div>

                

            
  






            </div>
            
            

            <SubmitButton
            buttonIcon={Send}


              title="Submit"
              loading={isLoading}
              loadingTitle="Sending..."
            />
          </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubmissionForm; 





