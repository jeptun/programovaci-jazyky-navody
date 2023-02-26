import React, { useEffect, useState } from "react";
import sanityClient from "../client.js";
import { NavLink } from "react-router-dom";

import colorChanger from "../func/colorChanger.js";
import Loader from "../components/Loader.jsx";
import { Helmet } from "react-helmet";

export default function Home() {
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "author"]{
          name,
          "bio": bio[0].children[0].text,
          "authorImage": image.asset->url,
      }`
      )
      .then((data) => setAuthor(data[0]))
      .catch(console.error);
  }, []);

  if (!author) return <Loader />;

  return (
    <main className="col-md-10">
      <Helmet>
        <meta charSet="utf-8" />
       
        <title>{author.name} Page</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <section className="container">
        <div className="hero-info">
          <h1>
            Ahoj, jmenuji se <span className="halfcolor">{author.name}.</span>{" "}
            <br />A jsem junior
            <span className="halfcolor"> front-end</span> developer!
          </h1>
          <div>{author.bio}</div>

          <NavLink
            to="/javascriptPosts"
            className="btn me-2"
            style={{ borderColor: colorChanger() }}
          >
            Javascript Post
          </NavLink>
          <NavLink
            to="/csharpPosts"
            className="btn me-2"
            style={{ borderColor: colorChanger() }}
          >
            C#
          </NavLink>
          <NavLink
            to="/ReactPost"
            className="btn me-2"
            style={{ borderColor: colorChanger() }}
          >
            React Post
          </NavLink>
          <NavLink
            to="/otherPosts"
            className="btn "
            style={{ borderColor: colorChanger() }}
          >
           Ostatní 
          </NavLink>
        </div>
      </section>
    </main>
  );
}
