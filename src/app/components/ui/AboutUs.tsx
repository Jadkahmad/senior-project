import { Button } from "./button";
import { CheckCircle, Clock, Users } from "lucide-react";
import Link from "next/link";

const values = [
    {
      name: "Innovation",
      description: "Pushing boundaries with cutting-edge educational solutions",
      icon: Clock,
    },
    {
      name: "Excellence",
      description: "Maintaining the highest standards in education",
      icon: CheckCircle,
    },
    {
      name: "Community",
      description: "Building strong relationships between tutors and students",
      icon: Users,
    },
  ];


  const AboutSection = () => {
    return (
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="relative bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">About Us</span>
                <span className="block text-[#2B7293]">Empowering Education</span>
              </h1>
              <p className="mx-auto mt-3 max-w-md text-base text-gray-500 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
                We're dedicated to transforming education through personalized tutoring and innovative learning solutions.
              </p>
              <div className="mt-5 flex justify-center gap-x-2">
                <Link href={"submission"}>
                <Button className="bg-[#2B7293] text-lg px-8 py-3 cursor-pointer">
                  Get Started
                </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
  
        {/* Values Section */}
        <div className="bg-white py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Our Core Values
              </h2>
              <p className="mt-4 text-lg text-gray-500">
                Guided by principles that put education first
              </p>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {values.map((value) => (
                <div key={value.name} className="pt-6">
                  <div className="flow-root rounded-lg bg-gray-50 px-6 pb-8">
                    <div className="-mt-6">
                      <span className="inline-flex items-center justify-center rounded-md bg-[#2B7293] p-3">
                        <value.icon className="h-6 w-6 text-white" aria-hidden="true" />
                      </span>
                      <h3 className="mt-8 text-lg font-medium tracking-tight text-gray-900">
                        {value.name}
                      </h3>
                      <p className="mt-5 text-base text-gray-500">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
  
        {/* How We Started Section */}
        <div className="bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold tracking-tight text-[#2B7293] mb-12">
              How We Started
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <img
                  src="/started.png"
                  alt="Our journey"
                  className="rounded-lg shadow-lg w-140 h-100 object-cover"
                />
              </div>
              <div className="space-y-6">
                <p className="text-gray-700 text-lg">
                  Founded with a vision to revolutionize education, our journey began with a simple idea: make quality education accessible to everyone. What started as a small tutoring service has grown into a comprehensive educational platform.
                </p>
                <p className="text-gray-700 text-lg">
                  Today, we're proud to have helped thousands of students achieve their academic goals while building a community of passionate educators who share our commitment to excellence in education.
                </p>
              </div>
            </div>
          </div>
        </div>
  
        {/* Purpose and Vision Section */}
        <div className="bg-gray-50 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="text-3xl font-bold text-[#2B7293] mb-6">Our Purpose</h3>
                <p className="text-gray-700 text-lg">
                  We're committed to bridging the gap between students and quality education. Our purpose is to create an environment where learning becomes accessible, engaging, and effective for everyone.
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="text-3xl font-bold text-[#2B7293] mb-6">Our Vision</h3>
                <p className="text-gray-700 text-lg">
                  We envision a world where quality education knows no boundaries. Our goal is to become the leading global platform that connects passionate educators with eager learners, fostering a community of continuous growth and success.
                </p>
              </div>
            </div>
          </div>
        </div>
  
        {/* CEO Section */}
        <div className="bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-[#2B7293] mb-12">Leadership</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <img
                  src="/ijtahed.png"
                  alt="CEO"
                  className="rounded-lg shadow-lg w-full h-auto object-cover"
                />
              </div>
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-gray-900">Jad Al Sayed Ahmad</h3>
                <p className="text-xl text-[#2B7293]">Founder of ijtahed Academic Center</p>
                <p className="text-gray-700 text-lg">
                  With over 4 years of experience in education and technology, Jane leads our mission to transform how people learn and teach. Her vision of accessible, quality education drives our innovation and growth.
                </p>
                <p className="text-gray-700 text-lg">
                  "Education is the most powerful tool we have to change lives. Our platform makes it possible for anyone, anywhere, to access quality learning resources and connect with outstanding educators."
                </p>
              </div>
            </div>
          </div>
        </div>
  
        
  
        {/* Contact Section */}
        <section className="bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold tracking-tight text-[#2B7293]">
                Get in Touch
              </h2>
              <p className="mt-4 text-lg text-gray-500">
                Have questions? We're here to help.
              </p>
            </div>
            <div className="flex justify-center">

                <Link href={"submission"}>
              <Button className="bg-[#2B7293] hover:bg-[#1d4e66] text-white font-semibold px-8 py-3 text-lg cursor-pointer">
                Contact Us
              </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  };
  
  export default AboutSection;