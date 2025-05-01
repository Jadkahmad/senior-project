import { Button } from "./button";
import { CheckCircle, Clock, DollarSign, Users } from "lucide-react";
import { Check } from "lucide-react";
import Link from "next/link";




const benefits = [
    "SEO Optimization: Increase your profile's visibility on search engines.",
    "Social Media Advertising & Boosting: Your profile will be featured in social media campaigns to help attract more students.",
    "Profile Visibility: Your profile will be accessible to local and international students.",
    "Flexible Schedule Management: Easily set and manage your availability according to your preferences",
    "Student Matching: You'll be matched with students based on their needs, even if they haven't applied directly through the website.",
    "Access to Students: Connect with both school and university students across all majors and subjects."
]

const features = [
  {
    name: "Flexible Hours",
    description: "Create your own schedule and work when it suits you best",
    icon: Clock,
  },
  {
    name: "Competitive Pay",
    description: "Earn competitive rates while helping students succeed",
    icon: DollarSign,
  },
  {
    name: "Support Community",
    description: "Join a community of passionate educators and learners",
    icon: Users,
  },
  {
    name: "Easy Process",
    description: "Simple application and onboarding process",
    icon: CheckCircle,
  },
];

const steps = [
  {
    number: "01",
    title: "Apply",
    description: "Fill out our simple application form with your details and expertise",
  },
  {
    number: "02",
    title: "Interview",
    description: "Have a brief chat with our team to discuss your experience",
  },
  {
    number: "03",
    title: "Get Verified",
    description: "Complete our verification process to ensure quality standards",
  },
  {
    number: "04",
    title: "Start Teaching",
    description: "Begin connecting with students and sharing your knowledge",
  },
];

const BecomeTutor = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* TutorHero */}
      <div className="relative bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Become a Tutor</span>
              <span className="block text-[#2B7293]">Share Your Knowledge</span>
            </h1>
            <p className="mx-auto mt-3 max-w-md text-base text-gray-500 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
              Join our community of expert tutors and help students achieve their academic goals while earning competitive rates.
            </p>
            <div className="mt-5 flex justify-center gap-x-2">
                <Link href={"/submission"}>
              <Button className="bg-[#2B7293] text-lg px-8 py-3 cursor-pointer">
                Apply Now
              </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* TutorFeatures */}
      <div className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Why Choose Us
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Join our platform and enjoy these benefits
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.name} className="pt-6">
                <div className="flow-root rounded-lg bg-gray-50 px-6 pb-8">
                  <div className="-mt-6">
                    <span className="inline-flex items-center justify-center rounded-md bg-[#2B7293] p-3">
                      <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </span>
                    <h3 className="mt-8 text-lg font-medium tracking-tight text-gray-900">
                      {feature.name}
                    </h3>
                    <p className="mt-5 text-base text-gray-500">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* TutorProcess */}
      <div className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Follow these simple steps to start your tutoring journey
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <div key={step.number} className="pt-6">
                <div className="flow-root rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div className="inline-flex items-center justify-center">
                      <span className="text-4xl font-bold text-[#2B7293]">{step.number}</span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium tracking-tight text-gray-900">
                      {step.title}
                    </h3>
                    <p className="mt-5 text-base text-[#2B7293]">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight text-[#2B7293]">
              Tutor Registration
            </h2>
          </div>
          <div className="mx-auto max-w-2xl bg-gray-50 rounded-lg p-8 shadow-md">
            <div className="text-center mb-8">
              <div className="text-3xl font-semibold text-[#2B7293] mb-2">1-year Plan: <span className="font-bold">$30</span></div>
              <div className="text-gray-600 mb-4">
                Get access to all features and start growing your tutoring business
              </div>
            </div>
            <div className="space-y-5 mb-8">
              {benefits.map((feature, index) => (
                <div key={index} className="flex items-start gap-x-3">
                  <Check className="h-6 w-6 flex-none text-[#2B7293]" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
                <Link href={"/submission"}> 
              <Button className="bg-[#2B7293] hover:bg-[#1d4e66] text-white cursor-pointer font-semibold px-8 py-3 text-lg">
                Subscribe
              </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default BecomeTutor;