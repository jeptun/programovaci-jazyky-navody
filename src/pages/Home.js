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
    <main className="w-10/12 border rounded-xl shadow-md ">
      {/* <Helmet>
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
      </section> */}

      <section class="bg-white text-white rounded-xl">
        <Helmet>
          <meta charSet="utf-8" />

          <title>{author.name} Page</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
        <div class="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-full lg:items-center">
          <div class="mx-auto max-w-3xl text-center">
            <h1 class="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
              Understand User Flow.
              <span class="sm:block"> Increase Conversion. </span>
            </h1>

            <p class="mx-auto mt-4 max-w-xl sm:text-xl sm:leading-relaxed">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt
              illo tenetur fuga ducimus numquam ea!
            </p>

            <div class="mt-8 flex flex-wrap justify-center gap-4">
              <NavLink
                to="/javascriptPosts"
                className="block w-full rounded border border-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
                // style={{ borderColor: colorChanger() }}
              >
                Javascript Post
              </NavLink>
              <NavLink
                to="/csharpPosts"
                className="block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
                // style={{ borderColor: colorChanger() }}
              >
                C#
              </NavLink>

              <NavLink
                to="/ReactPost"
                className="block w-full rounded border border-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
                // style={{ borderColor: colorChanger() }}
              >
                React Post
              </NavLink>
              <NavLink
                to="/otherPosts"
                className="block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
                // style={{ borderColor: colorChanger() }}
              >
                Ostatní
              </NavLink>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
