import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import sanityClient from "../client.js";
import Loader from "../components/Loader.jsx";
import imageUrlBuilder from "@sanity/image-url";
import { Helmet } from "react-helmet";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Autoplay, Navigation } from "swiper";

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
    <main className="w-full">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Na této stránce naleznete Javascript projekty</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>

      <section>
        <section className="py-6 sm:py-12 ">
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

            <Swiper
              spaceBetween={30}
              centeredSlides={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false
              }}
              navigation={true}
              modules={[Autoplay, Navigation]}
              className="w-1/3 "
            >
              {/* {postData.map((post, index) =>
                <SwiperSlide key={index}>
                  <span className="w-8 h-8 flex bg-teal-400 items-center justify-center
                    transition duration-300 transform hover:-translate-y-0.5">
                    <svg
                      className="w-8 h-8 text-purple-700"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                  </span>

                  <div className="flex w-full justify-between mt-4 ">
                    <h3 className="text-xl pb-2 font-bold underline  decoration-4
              decoration-teal-400 uppercase ">
                      Rychlý Typ
                    </h3>
                  </div>
                  <p className="text-sm font-semibold ">
                    {post.description}
                  </p>
                </SwiperSlide>
              )} */}
            </Swiper>
            <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4 p-8 ">
              {searchInput.length > 1
                ? filteredResults &&
                  filteredResults.map((post, index) =>
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
                        />
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
                          <h4 className=" line-clamp-">
                            {post.description}
                          </h4>
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
                              background: "#000"
                            }}
                          />
                          <span>
                            {" "}{post.tags}
                          </span>
                        </div>
                      </div>
                    </article>
                  )
                : postData &&
                  postData.map((post, index) =>
                    <article className="flex flex-col border border-yellow-400" key={index}>
                      <Link
                        to={"/post/" + post.slug.current}
                        key={post.slug.current}
                        className="nav-link"
                      >
                        <img
                          src={post.mainImage.asset.url}
                          alt={post.title}
                          className="object-cover w-full h-32  "
                        />
                      </Link>
                      <div className="flex flex-col flex-1 p-3">
                        <Link
                          rel="noopener noreferrer"
                          to={"/post/" + post.slug.current}
                          aria-label={post.title}
                        />
                        <Link
                          rel="noopener noreferrer"
                          to={"/post/" + post.slug.current}
                          className="flex-1 py-1 text-lg font-semibold leading-snug"
                        >
                          {post.title}
                        </Link>
                        <div className="flex-1 py-1 text-md font-normal leading-snug 2">
                          <h4 className="line-clamp-2">
                            {post.description}
                          </h4>
                        </div>
                        <div className="flex flex-wrap justify-between pt-3 space-x-2 text-xs">
                          <span>
                            {new Date(post.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </article>
                  )}
            </div>
          </div>
        </section>
      </section>
      {/* <aside className="">
        <Footer />
      </aside> */}
    </main>
  );
}
