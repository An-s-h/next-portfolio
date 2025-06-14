"use client"

import Image from "next/image"

const Intro = () => {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-center md:items-start">
      <div className="flex flex-col gap-4 w-full md:w-9/12">
        <h1 className="text-4xl font-bold">Hi! I am Ansh Chachra</h1>
         <p className="text-base text-gray-700 dark:text-gray-300">
  {"I’m a Fullstack Developer skilled in the MERN stack with a solid foundation in Java and problem-solving. I enjoy building responsive web apps and turning ideas into real products.\nI'm currently seeking opportunities to grow, collaborate on meaningful projects, and write clean, efficient code."}
</p>
      </div>
      
      {/* Image only visible on medium and up screens */}
      <div className="hidden md:flex w-3/12 items-center justify-center">
        <div className="w-35 h-33 rounded-full overflow-hidden">
          <Image
            src="/images/ansh1.png"
            alt="Ansh Chachra"
            width={144}
            height={144}
            className="object-cover h-full"
          />
        </div>
      </div>
    </div>
  )
}

export default Intro
