import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import sanityClient from "../client.js";
import colorChanger from "../func/colorChanger.js";
import Loader from "../components/Loader.jsx";
import imageUrlBuilder from "@sanity/image-url";
import { Helmet } from "react-helmet";
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
    <main className="col-md-10 ps-4">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Na této stránce naleznete Javascript projekty</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>

      <section className="container">
        <h1 className="">Projekty</h1>
        <h2 className="">Na této stránce naleznete mé projekty</h2>

        <input
          className="search-input"
          type="text"
          placeholder="Vyhledávání"
          onChange={(e) => searchItems(e.target.value)}
        />

        <div className="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5">
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
        </div>
      </section>
    </main>
  );
}
