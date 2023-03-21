import React, { useEffect, useState } from "react";
import sanityClient from "../client.js";
import { NavLink } from "react-router-dom";
import Loader from "../components/Loader.jsx";
import { Helmet } from "react-helmet";

//Todo pridat Seo

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
    <main className="h-screen px-4 flex lg:items-center">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Moje Návody</title>
        <meta
          name="description"
          content="Moje Návody - blog, který slouží jako zdroj informací pro všechny vývojáře a programátory!"
        />
        <meta
          property="og:title"
          content="Moje Návody - blog, který slouží jako zdroj informací pro všechny vývojáře a programátory!"
        />
        <meta
          property="og:description"
          content="  Vítejte na blogu, který slouží jako zdroj informací pro všechny vývojáře a programátory!
         Najdete zde rozmanitou škálu témat, včetně Javascriptu, Typescriptu, C#, Reactu, CSS a mnoho dalšího."
        />
        <meta
          name="seznam-ranking-position"
          content="query-exact: 1.0; query-broad: 1.3; (Google compatible)"
        />
      </Helmet>
      <div className="m-auto max-w-xl text-center">
        <h1 className="text-3xl font-extrabold sm:text-5xl">
          Programovací Blog!
          <br />
          Návody, Tipy Triky!
        </h1>

        <p className="mt-4 sm:text-xl sm:leading-relaxed">
          Vítejte na blogu, který slouží jako zdroj informací pro všechny
          vývojáře a programátory! Najdete zde rozmanitou škálu témat, včetně
          Javascriptu, Typescriptu, C#, Reactu, CSS a mnoho dalšího.
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
            className="block w-full rounded bg-blue-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
          >
            React Post
          </NavLink>
          <NavLink
            to="/otherPosts"
            className="block w-full rounded bg-purple-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-purple-700 focus:outline-none focus:ring active:bg-purple-500 sm:w-auto"
          >
            Ostatní
          </NavLink>
        </div>
      </div>
    </main>
  );
}
