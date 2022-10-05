import React, { useEffect, useState } from "react";
import sanityClient from "../client.js";
import { NavLink } from "react-router-dom";

import colorChanger from "../func/colorChanger.js";
import Loader from "../components/Loader.jsx";

export default function Home() {
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "author"]{
          name,
          "bio": bio[0].children[0].text,
          "authorImage": image.asset->url,
          "description": description[0].children[0].text,
      }`
      )
      .then((data) => setAuthor(data[0]))
      .catch(console.error);
  }, []);

  if (!author) return <Loader />;

  return (
    <main className="home-container padding-lr-600">
      <section className="hero">
        <div className="hero-info">
          <h1>
            Ahoj, jmenuji se <span className="halfcolor">{author.name}.</span>{" "}
            <br />A jsem junior
            <span className="halfcolor"> front-end</span> developer!
          </h1>
          <p>{author.bio}</p>
          <p>{author.description}</p>
          <NavLink
            to="/post"
            className="btn"
            style={{ borderColor: colorChanger() }}
          >
            Projekty
          </NavLink>
        </div>

      </section>
  
    </main>
  );
}
