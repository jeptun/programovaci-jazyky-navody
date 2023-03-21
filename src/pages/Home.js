import React, { useEffect, useState } from "react";
import sanityClient from "../client.js";
import { NavLink } from "react-router-dom";
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
      .then(data => setAuthor(data[0]))
      .catch(console.error);
  }, []);

  if (!author) return <Loader />;

  return (
    <main className="mx-auto  px-4 py-32 lg:flex  lg:items-center">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Moje návody</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="mx-auto max-w-xl text-center">
        <h1 className="text-3xl font-extrabold sm:text-5xl">
          Programovací Blog!
          <br />
          Návody, Tipy Triky!
        </h1>

        <p className="mt-4 sm:text-xl sm:leading-relaxed">
          tento blog slouží jako zdroj informací pro začátečníky v programování.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <NavLink
            to="/javascriptPosts"
            className="block w-full rounded bg-yellow-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-yellow-700 focus:outline-none focus:ring active:bg-yellow-500 sm:w-auto"
          >
            Javascript Post
          </NavLink>
          <NavLink
            to="/csharpPosts"
            className="block w-full rounded bg-green-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-green-700 focus:outline-none focus:ring active:bg-green-500 sm:w-auto"
          >
            C#
          </NavLink>
          <NavLink
            to="/ReactPost"
            className="block w-full rounded bg-blue-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
          >
            React Post
          </NavLink>
          <NavLink
            to="/otherPosts"
            className="block w-full rounded bg-purple-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
          >
            Ostatní
          </NavLink>
        </div>
      </div>
    </main>
  );
}
