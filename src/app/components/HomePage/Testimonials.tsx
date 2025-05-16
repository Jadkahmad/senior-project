"use client";
import React from "react";
import Slider from "react-slick";


export const TestimonialsData = [
  {
    id: 1,
    name: "Nadine H. - Parent",
    text: "We’ve tried many tutors before, but nothing matched the level of professionalism and structure we found at Ijtahed Center. My daughter’s confidence in math has grown tremendously."

,
    img: "/avatar.png",
    delay: 0.2,
  },
  {
    id: 2,
    name: "Rania S. - Parent",
    text: "Booking a tutor was incredibly easy, and the experience felt just like being at a real academic center even from home. The tutor was punctual, well prepared, and engaging.",
    img: "/avatar.png",
    delay: 0.5,
  },
  {
    id: 3,
    name: "Karim - Student",
    text: "Before joining Ijtahed, I struggled to understand physics. The tutor explained everything so clearly that I started enjoying the subject — and I finally passed with confidence.",
    img: "/avatar.png",
    delay: 0.8,
  },
  {
    id: 5,
    name: "Ahmad - Student",
    text: "Ijtahed is not just a tutoring service, it’s a full academic experience. Their commitment to student progress and parent communication is unmatched.",
    img: "/avatar.png",
    delay: 1.1,
  },
];

const Testimonials = () => {
  const setting = {
    dots: true,
    arrow: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    // autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    pauseOnHover: true,
    pauseOnFocus: true,
    responsive: [
      {
        breakpoint: 10000,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="py-14 mb-10">
      <div className="container">
        {/* header */}
        <div className="space-y-4 p-6 text-center max-w-[600px] mx-auto mb-5">
          <h2 className="uppercase font-semibold text-blue-500">
          STUDENTS-PARENTS TESTIMONIALS
          </h2>
          <h3 className="font-semibold text-3xl ">
          Stories and feedbacks that inspires
          </h3>
        </div>

        {/* Testimonials Cards */}
        <div>
          <Slider {...setting}>
            {TestimonialsData.map((data) => (
              <div key={data.id} className="my-6">
                <div className="flex flex-col gap-4 p-8 shadow-lg mx-4 rounded-xl bg-secondary/10">
                  {/* upper section */}
                  <div className="flex justify-start items-center gap-5">
                    <img
                      src={data.img}
                      alt=""
                      className="rounded-full w-16 h-16"
                    />
                    <div>
                      <p className="text-xl font-bold text-black/80">
                        {data.name}
                      </p>
                      
                    </div>
                  </div>
                  {/* bottom section */}
                  <div className=" py-6 space-y-4">
                    <p className="text-sm text-gray-500">{data.text}</p>
                    <p>⭐⭐⭐⭐⭐</p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
