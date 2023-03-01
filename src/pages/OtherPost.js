import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import sanityClient from "../client.js";
import colorChanger from "../func/colorChanger.js";
import Loader from "../components/Loader.jsx";
import imageUrlBuilder from "@sanity/image-url";
import { Helmet } from "react-helmet";

//Todo Dodelat header
/**
 * Builder pro main zobrazení main obrazku
 */
const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}
export default function OtherPosts() {
  const [postData, setPost] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "otherPosts"]{
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
      .then((data) => setPost(data))
      .catch(console.error);
  }, []);

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== "") {
      const filteredData = postData.filter((item) => {
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
    <main className="col-md-10 ps-4">
    <Helmet>
      <meta charSet="utf-8" />
      <title>Na této stránce naleznete Javascript projekty</title>
      <link rel="canonical" href="http://mysite.com/example" />
    </Helmet>

    <div>
      {/* <div className="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5 bg-red-300">
          {searchInput.length > 1
            ? filteredResults &&
              filteredResults.map((post, index) => (
                <div className="col" key={index}>
                  <div
                    className="card card-cover h-100 overflow-hidden text-white rounded-5 "
                    style={{
                      backgroundImage: `url(${post.mainImage.asset.url})`,
                    }}
                  >
                    <div className="d-flex flex-column h-100 p-3 pb-3 text-white ">
                      <Link
                        to={"/post/" + post.slug.current}
                        key={post.slug.current}
                        className="nav-link"
                      >
                        <h2 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold text-white text-center">
                          {post.title}
                        </h2>
                      </Link>
                      <ul className="d-flex list-unstyled mt-auto">
                        <li className="me-auto">
                          <img
                            src={urlFor(post.authorImage).url()}
                            alt="Bootstrap"
                            width="42"
                            height="42"
                            className="rounded-circle  "
                            style={{
                              background: "#000",
                            }}
                          />
                        </li>
                        <li className="d-flex align-items-center me-2">
                          <div className="">
                            {new Date(post.date).toLocaleDateString()}
                          </div>
                        </li>
                        <li className="d-flex align-items-center">
                          <div
                            className=" rounded p-1"
                            style={{
                              background: colorChanger(),
                            }}
                          >
                            {post.tags}
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              ))
            : postData &&
              postData.map((post, index) => (
                <div className="col" key={index}>
                  <div
                    className="card card-cover h-100 overflow-hidden text-white rounded-5 "
                    style={{
                      backgroundImage: `url(${post.mainImage.asset.url})`,
                    }}
                  >
                    <div
                      className="d-flex flex-column h-100 p-3 pb-3 text-white"
                      style={{
                        background: "#0a1d1670",
                      }}
                    >
                      <Link
                        to={"/post/" + post.slug.current}
                        key={post.slug.current}
                        className="nav-link"
                      >
                        <h2 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold text-white text-center">
                          {post.title}
                        </h2>
                      </Link>
                      <ul className="d-flex list-unstyled mt-auto">
                        <li className="me-auto">
                          <img
                            src={urlFor(post.authorImage).url()}
                            alt="Bootstrap"
                            width="42"
                            height="42"
                            className="rounded-circle"
                            style={{
                              background: "#000",
                            }}
                          />
                        </li>
                        <li className="d-flex align-items-center me-2">
                          <div className="">
                            {new Date(post.date).toLocaleDateString()}
                          </div>
                        </li>
                        <li className="d-flex align-items-center">
                          <div
                            className=" rounded p-1"
                            style={{
                              background: colorChanger(),
                            }}
                          >
                            {post.tags}
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
        </div> */}
      <section className="py-6 sm:py-12 ">
        <div className="container p-6 mx-auto space-y-8">
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold">Partem reprimique an pro</h2>
            <p className="font-serif text-sm dark:text-gray-400">
              Qualisque erroribus usu at, duo te agam soluta mucius.
            </p>
            <input
              className="search-input text-black"
              type="text"
              placeholder="Vyhledávání"
              onChange={(e) => searchItems(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
            {searchInput.length > 1
              ? filteredResults &&
                filteredResults.map((post, index) => (
                  <article className="flex flex-col border dark:border-zinc-100 border-gray-700" key={index}>
                    <Link
                      to={"/post/" + post.slug.current}
                      key={post.slug.current}
                      className="nav-link"
                    >
                      <img
                        src={post.mainImage.asset.url}
                        alt={post.title}
                        className="object-cover w-full h-52 "
                      />
                    </Link>
                    <div className="flex flex-col flex-1 p-6">
                      <Link
                        rel="noopener noreferrer"
                        to={"/post/" + post.slug.current}
                        aria-label={post.title}
                      ></Link>
                      <Link
                        rel="noopener noreferrer"
                        to={"/post/" + post.slug.current}
                        className="text-xs tracking-wider uppercase hover:underline dark:dark:dark:text-violet-400"
                      >
                        Convenire
                      </Link>
                      <Link
                        rel="noopener noreferrer"
                        to={"/post/" + post.slug.current}
                        className="flex-1 py-2 text-lg font-semibold leading-snug"
                      >
                        {post.title}
                      </Link>
                      <h4 className="flex-1 py-2 text-md font-normal leading-snug line-clamp-2">
                        {post.description}
                      </h4>
                      <div className="flex flex-wrap justify-between pt-3 space-x-2 text-xs dark:dark:dark:text-gray-400">
                        <span>
                          {new Date(post.date).toLocaleDateString()}
                        </span>
                        <img
                          src={urlFor(post.authorImage).url()}
                          alt="Bootstrap"
                          width="42"
                          height="42"
                          className="rounded-circle  "
                          style={{
                            background: "#000",
                          }}
                        />
                        <span> {post.tags}</span>
                      </div>
                    </div>
                  </article>
                ))
              : postData &&
                postData.map((post, index) => (
                  <article className="flex flex-col border  dark:shadow-slate-100 shadow-sm" key={index}>
                    <Link
                      to={"/post/" + post.slug.current}
                      key={post.slug.current}
                      className="nav-link"
                    >
                      <img
                        src={post.mainImage.asset.url}
                        alt={post.title}
                        className="object-cover w-full h-52 "
                      />
                    </Link>
                    <div className="flex flex-col flex-1 p-6">
                      <Link
                        rel="noopener noreferrer"
                        to={"/post/" + post.slug.current}
                        aria-label={post.title}
                      ></Link>
                      <Link
                        rel="noopener noreferrer"
                        to={"/post/" + post.slug.current}
                        className="text-xs tracking-wider uppercase hover:underline dark:dark:dark:text-violet-400"
                      >
                        Convenire
                      </Link>
                      <Link
                        rel="noopener noreferrer"
                        to={"/post/" + post.slug.current}
                        className="flex-1 py-2 text-lg font-semibold leading-snug"
                      >
                        {post.title}
                      </Link>
                      <h4 className="flex-1 py-2 text-md font-normal leading-snug line-clamp-2">
                        {post.description}
                      </h4>
                      <div className="flex flex-wrap justify-between pt-3 space-x-2 text-xs dark:dark:dark:text-gray-400">
                        <span>
                          {new Date(post.date).toLocaleDateString()}
                        </span>
                        <img
                          src={urlFor(post.authorImage).url()}
                          alt="Bootstrap"
                          width="42"
                          height="42"
                          className="rounded-circle  "
                          style={{
                            background: "#000",
                          }}
                        />
                        <span> {post.tags}</span>
                      </div>
                    </div>
                  </article>
                ))}
          </div>
        </div>
      </section>
    </div>
  </main>
  );
}
