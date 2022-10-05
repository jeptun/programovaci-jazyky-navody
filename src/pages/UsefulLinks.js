import React, { useEffect, useState } from "react";
import sanityClient from "../client.js";
import colorChanger from "../func/colorChanger.js";
import Loader from "../components/Loader.jsx";


export default function UsefulLinks() {
  const [projectData, setProjectData] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "project"]{
          title,
          date,
          place,
          description,
          projectType,
          link,
          logoLink,
          tags
      }`
      )
      .then((data) => setProjectData(data))
      .catch(console.error);
  }, []);

  if (!projectData) return <Loader />;
  return (
    <main className="padding-block-600">
      <section className="cards-wrapper padding-block-900 padding-lr-600">
        <h1 className="">O co se zajímám</h1>
        <h2 className="padding-block-600">
          Různé odkazy na hudbu, knihy, technologie a jiné.
        </h2>
        <div className="cards">
          {projectData &&
            projectData.map((project, index) => (
              <article className="card-post flow padding-lr-200" key={index}>
                <div className="usefullLinks-title ">
                  <h3 className="">
                    <a
                      href={project.link}
                      alt={project.title}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {project.title}
                    </a>
                  </h3>
                </div>
                <div className="padding-lr-200">
                  <div>{new Date(project.date).toLocaleDateString()}</div>
                  <div>Zdroj: {project.place}</div>
                  <div>Typ: {project.projectType}</div>
                </div>
                <p className="padding-lr-200 padding-block-200">
                  {project.description}
                </p>
              </article>
            ))}
        </div>
      </section>
    </main>
  );
}
