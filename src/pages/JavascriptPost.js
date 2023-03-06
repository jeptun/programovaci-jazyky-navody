import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import sanityClient from "../client.js";
import colorChanger from "../func/colorChanger.js";
import Loader from "../components/Loader.jsx";
import imageUrlBuilder from "@sanity/image-url";
import { Helmet } from "react-helmet";

//Todo Dodelat header
//Todo Ulozit posledni postData do stavu a zobrazit
/**
 * Builder pro main zobrazení main obrazku
 */
const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}
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
    <main className="col-md-10 ps-4 ">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Na této stránce naleznete Javascript projekty</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div>
        <section className="py-6 sm:py-12 ">
          <div className="container p-6 mx-auto space-y-8">
            <div className="space-y-2 text-center">
              <h2 className="text-3xl font-bold">Partem reprimique an pro</h2>
              <p className="font-serif text-sm ">
                Qualisque erroribus usu at, duo te agam soluta mucius.
              </p>
              <input
                className="search-input text-black border rounded-md shadow-lg p-2"
                type="text"
                placeholder="Vyhledávání"
                onChange={(e) => searchItems(e.target.value)}
              />
            </div>

            {postData.map((post, index) => (
              <div key={index} className="p-6 space-y-2 lg:col-span-5">
                <h3 className="text-2xl font-semibold sm:text-4xl group-hover:underline group-focus:underline">
                  {post.title}
                  {console.log(typeof post)}
                  {/* {post.title[post.title.length - 1]} */}
                </h3>
                {/* <span className="text-xs">{postData.date}</span>
              <p>{postData.description}</p> */}
              </div>
            ))}

            <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-4  rounded-lg shadow-md p-8 ">
              {searchInput.length > 1
                ? filteredResults &&
                  filteredResults.map((post, index) => (
                    <article
                      className="flex flex-col border   border-gray-700"
                      key={index}
                    >
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
                          className="text-xs tracking-wider uppercase hover:underline"
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
                        <div className="flex-1 py-2 text-md font-normal leading-snug 2">
                          <h4 className=" line-clamp-">{post.description}</h4>
                        </div>
                        <div className="flex flex-wrap justify-between pt-3 space-x-2 text-xs">
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
                    <article
                      className="flex flex-col  rounded-md shadow-lg"
                      key={index}
                    >
                      <Link
                        to={"/post/" + post.slug.current}
                        key={post.slug.current}
                        className="nav-link"
                      >
                        <img
                          src={post.mainImage.asset.url}
                          alt={post.title}
                          className="object-cover w-full h-32  rounded-t-md"
                        />
                      </Link>
                      <div className="flex flex-col flex-1 p-3">
                        <Link
                          rel="noopener noreferrer"
                          to={"/post/" + post.slug.current}
                          aria-label={post.title}
                        ></Link>
                        <Link
                          rel="noopener noreferrer"
                          to={"/post/" + post.slug.current}
                          className="text-md tracking-wider uppercase hover:underline decoration-red-500"
                          style={{ backgroundColor: colorChanger() }}
                        >
                          {post.tags}
                        </Link>
                        <Link
                          rel="noopener noreferrer"
                          to={"/post/" + post.slug.current}
                          className="flex-1 py-1 text-lg font-semibold leading-snug"
                        >
                          {post.title}
                        </Link>
                        <div className="flex-1 py-1 text-md font-normal leading-snug 2">
                          <h4 className="line-clamp-2">{post.description}</h4>
                        </div>
                        <div className="flex flex-wrap justify-between pt-3 space-x-2 text-xs">
                          <span>
                            {new Date(post.date).toLocaleDateString()}
                          </span>
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
