import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import sanityClient from "../client.js";
import colorChanger from "../func/colorChanger.js";
import Loader from "../components/Loader.jsx";

export default function Post() {
  const [postData, setPost] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "post"]{
                title,
                slug,
                description,
                tags,
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
    <main className="padding-block-600">
      <section className="cards-wrapper padding-block-900 padding-lr-600">
        <h1 className="">Projekty</h1>
        <h2 className="padding-block-600">Na této stránce naleznete mé projekty</h2>

        <input
          className="search-input"
          type="text"
          placeholder="Vyhledávání"
          onChange={(e) => searchItems(e.target.value)}
        />

        <div className="cards">
          {searchInput.length > 1
            ? filteredResults &&
              filteredResults.map((post, index) => (
                <article className="card-post" key={index}>
                  <Link
                    to={"/post/" + post.slug.current}
                    key={post.slug.current}
                  >
             
                  </Link>
                </article>
              ))
            : postData &&
              postData.map((post, index) => (
                <article className="card-post" key={index}>
                  <Link
                    to={"/post/" + post.slug.current}
                    key={post.slug.current}
                  >
              Link
                  </Link>
                </article>
              ))}
        </div>
      </section>
    </main>
  );
}
