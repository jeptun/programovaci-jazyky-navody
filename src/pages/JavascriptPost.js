import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import sanityClient from "../client.js";
import Loader from "../components/Loader.jsx";
import { Helmet } from "react-helmet";
//Todo Dodelat header
/**
 * Builder pro main zobrazení main obrazku
 */
export default function JavascriptPosts() {
  const [postData, setPost] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "javascriptPosts"]{
                title,
                slug,
                description,
                tags,
                date,
                author,
                githublink,
                "name": author->name,
                "authorImage": author->image,
                
                mainImage{
                    asset->{
                        _id,
                        url
                    },
                    alt,
                }
            }`
      )
      .then(data => setPost(data))
      .catch(console.error);
  }, []);

  const searchItems = searchValue => {
    setSearchInput(searchValue);
    if (searchInput !== "") {
      const filteredData = postData.filter(item => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(postData);
    }
  };

  if (!postData) return <Loader />;

  return (
    <main className="w-full pl-2">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Na této stránce naleznete Javascript projekty</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <section className="py-6 sm:py-12 max-w-6xl mx-auto">
        <div className="container p-6 mx-auto space-y-8">
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold">Partem reprimique an pro</h2>
            <p className="font-serif text-sm ">
              Qualisque erroribus usu at, duo te agam soluta mucius.
            </p>
            <input
              className="search-input text-black border  shadow-lg p-2"
              type="text"
              placeholder="Vyhledávání"
              onChange={e => searchItems(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-1 lg:grid-cols-1 p-8">
            {searchInput.length > 1
              ? filteredResults &&
                filteredResults.map((post, index) =>
                <Link
                    to={"/post/" + post.slug.current}
                    key={post.slug.current}
                    className="flex md:flex-row flex-col shadow-md rounded w-full"
                  >
                    <img
                      src={post.mainImage.asset.url}
                      alt={post.title}
                      className="h-80 w-full md:h-80 md:w-96 lg:h-60 lg:w-80"
                    />
                    <div className=" ">
                      <h2
                        rel="noopener noreferrer"
                        to={"/post/" + post.slug.current}
                        className="text-3xl text-indigo-500 font-black leading-snug px-3 py-2"
                      >
                        {post.title}
                      </h2>
                      <div className="flex flex-wrap gap-4 leading-snug px-3 py-1">
                        <span className="opacity-80 font-bold">
                          🗓️
                          {" " + new Date(post.date).toLocaleDateString()}
                        </span>
                        <div className="flex gap-1">
                          🧠
                          <p className="font-bold break-all opacity-80">
                            {post.tags + ";"}
                          </p>
                        </div>
                      </div>
                      <div className="text-md  font-bold leading-snug p-3">
                        <h4 className="line-clamp-3  ">
                          {post.description}
                        </h4>
                      </div>
                    </div>
                  </Link>
                )
              : postData &&
                postData.map((post, index) =>
                  <Link
                    to={"/post/" + post.slug.current}
                    key={post.slug.current}
                    className="flex md:flex-row flex-col shadow-md rounded w-full"
                  >
                    <img
                      src={post.mainImage.asset.url}
                      alt={post.title}
                      className="h-80 w-full md:h-80 md:w-96 lg:h-60 lg:w-80"
                    />
                    <div className=" ">
                      <h2
                        rel="noopener noreferrer"
                        to={"/post/" + post.slug.current}
                        className="text-3xl text-indigo-500 font-black leading-snug px-3 py-2"
                      >
                        {post.title}
                      </h2>
                      <div className="flex flex-wrap gap-4 leading-snug px-3 py-1">
                        <span className="opacity-80 font-bold">
                          🗓️
                          {" " + new Date(post.date).toLocaleDateString()}
                        </span>
                        <div className="flex gap-1">
                          🧠
                          <p className="font-bold break-all opacity-80">
                            {post.tags + ";"}
                          </p>
                        </div>
                      </div>
                      <div className="text-md  font-bold leading-snug p-3">
                        <h4 className="line-clamp-3  ">
                          {post.description}
                        </h4>
                      </div>
                    </div>
                  </Link>
                )}
          </div>
        </div>
      </section>
    </main>
  );
}
