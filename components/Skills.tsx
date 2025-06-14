import React from 'react'
const skillsData: string[] = [
  "React",
  "Next.js",
  "Tailwind CSS",
  "TypeScript",
  "JavaScript",
  "Express.js",
  "MongoDB",
  "Tailwind CSS",
  "HTML5",
  "CSS3",
  "Git",
  "REST APIs",
  "Java",
  "Problem Solving",
  "Responsive Design",
  "Figma (UI Design)",
];
const Skills = () => {
  return (
    <div className='flex flex-col gap-4'>
      <h1 className='text-2xl font-bold'>Skills</h1>
    <div className='flex flex-wrap gap-2'>
        {skillsData.map((skill,index)=>(
        <div key={index} className='flex border-gray-200 rounded-md p-4 px-2 py-1 text-small bg-gray-500 text-white'>
          {skill}
        </div>
      ))}
    </div>
    </div>
  )
}

export default Skills
