"use client"

import Link from "next/link"
import { Button } from "./ui/button"
import { ShineBorder } from "./magicui/shine-border"

const projectsData = [
  {
    title: "LocalConnect",
    description: "A community-driven platform where users and local business owners can share reliable information, leave reviews, and discover local services or stores in their area — made for the people, by the people.",
    link: "https://local-connect-47.vercel.app/",
    code: "https://github.com/An-s-h/LocalConnect",
    previewVideo: "/videos/local-Connect.mp4",
    technologies: ["React", "MongoDB", "Express", "Node.js", "JavaScript", "Firebase", "SerpApi", "Tailwind CSS", "GeoApify API","Cloudinary","ContextAPI"],
  },
  {
    title: "Super-Pod",
    description: "A podcast web app where users can sign in, add their own podcasts, and listen to them right from the site. It provides a clean interface to explore and manage podcasts easily.",
    link: "https://super-pod.vercel.app/",
    code: "https://github.com/An-s-h/super-pod",
    previewVideo: "/videos/super-pod.mp4",
    technologies: ["React", "MongoDB", "Express", "Node.js", "JavaScript", "JWT", "Bcrypt", "Tailwind CSS","Redux"],
  },
  {
    title: "Pro-To-Type",
    description: "A minimal, real-time prototyping tool where users can create and manage design projects collaboratively, with authentication, Firebase sync, and a sleek UI built with JavaScript.",
    link: "https://pro-to-type.vercel.app/",
    code: "https://github.com/An-s-h/pro-to-type",
    previewVideo: "/videos/pro-to-type.mp4",
    technologies: ["React", "Firebase", "Firestore", "TypeScript", "Tailwind CSS", "ContextAPI"],
  },
  {
    title: "Temp-View",
    description: "A modern weather forecasting app offering 7-day and 12-hour forecasts, unit toggles, location search with predictions, and light/dark mode – built with OpenWeather API.",
    link: "https://temp-view.vercel.app/",
    code: "https://github.com/An-s-h/TempView",
    previewVideo: "/videos/temp-view.mp4",
    technologies: ["React", "JavaScript", "Tailwind CSS", "OpenWeather API"],
  },
];


function Projects() {

  return (
    <div className="flex flex-col gap-4 w-full">
      <h1 className="text-2xl font-bold">Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projectsData.map((project, index) => (
          <div key={index} className="flex flex-col border rounded-md dark:border-gray-700 relative overflow-hidden">
            <ShineBorder />
            <video src={project.previewVideo} autoPlay muted loop className="rounded-t-md" />
            <div className="flex flex-col gap-3 p-4 grow">
              <h2 className="text-xl font-bold">{project.title}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">{project.description}</p>
              <div className="flex flex-wrap gap-[4px]">
                {project.technologies.map((technology, index) => (
                  <span
                    key={index}
                    className="bg-slate-100 text-gray-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300"
                  >
                    {technology}
                  </span>
                ))}
              </div>
              <div className="flex gap-2 mt-auto">
                <Link href={project.link}>
                  <Button variant="default">View</Button>
                </Link>
                <Link href={project.code}>
                  <Button variant="outline">Code</Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Projects
