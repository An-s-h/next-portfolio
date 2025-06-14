import React from 'react'

interface EducationItem {
  startDate: string;
  endDate: string;
  collegeName?: string;
  schoolName?: string;
  courseName: string;
  address: string;
}

 const EducationItem:EducationItem[] = [
  {
    startDate: "August 2021",
    endDate: "May 2025",
    collegeName: "DIT University",
    courseName: "BTech. in Computer Science and Engineering",
    address: "Dehradun , Uttrakhand",
  },
  {
    startDate: "2018",
    endDate: "2019",
    schoolName: "St Jude's School",
    address: "Dehradun , Uttrakhand",
    courseName: "Senior Secondary(Science Stream)",
  },
];
const Education = () => {
  return (
     <div className='flex-col flex gap-4'>
     <h1 className='text-2xl font-bold'>Education</h1>
       <ol className="relative border-s border-gray-200 dark:border-gray-700">
        {EducationItem.map((item, index) => (
          <li key={index} className="mb-10 ms-4">
            <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
            <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              {item.startDate} - {item.endDate}
            </time>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {item.collegeName || item.schoolName}
            </h3>
            <p className="text-base font-normal text-gray-500 dark:text-gray-400">
              {item.courseName}
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500">
              {item.address}
            </p>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default Education
