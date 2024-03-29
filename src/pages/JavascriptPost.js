import React, { useState, useEffect } from "react";
import sanityClient from "../client.js";
import Loader from "../components/Loader.jsx";
import { Helmet } from "react-helmet";
import { Cart } from "../components/Cart.jsx";

//Todo dodelat v csharp, react, other, zmenu v schema a ve fetch query
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
                releaseDate,
                rating,
                author,              
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
    if (searchValue !== "") {
      const filteredData = postData.filter(item => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(postData);
    }
  };

  console.log(postData);

  function sortByDate(events) {
    return events.sort((a, b) => {
      const dateA = new Date(a.props.brand.releaseDate).toLocaleDateString();
      const dateB = new Date(b.props.brand.releaseDate).toLocaleDateString();
      console.log("dateA", dateA);
      console.log("daten", dateB);
      let dateFinal = dateA - dateB;
      return dateFinal;
    });
  }
  //console.log('sortByDate(postData)', sortByDate('2002-01-01', '2001-01-01', '2003-01-01'))
  if (!postData) return <Loader />;

  return (
    <main className="w-full pl-2">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Moje Návody - Javascript</title>
        <meta name="description" content="Javascript a Typescript Návody" />
        <meta property="og:title" content="Javascript a Typescript Návody" />
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
      <section className="py-6 sm:py-12 max-w-6xl mx-auto">
        <div className="container p-6 mx-auto space-y-8">
          <div className="space-y-2 text-center">
            <h2 className="text-3xl  font-bold">
              Javascript&Typescript články
            </h2>
            <p className="text-xl ">Zadej název článku, který hledáš.</p>
            <div className="flex m-auto rounded-md overflow-hidde w-3/4 gap-2">
              <input
                type="text"
                className=" px-3 py-2 bg-white border-2 shadow-sm border-slate-300 text-black
                          placeholder-slate-400 disabled:bg-slate-50 
                          disabled:border-slate-200 focus:outline-none focus:border-indigo-500
                          focus:ring-indigo-600 block w-full rounded-md sm:text-lg font-medium
                            focus:ring-1  disabled:shadow-none"
                onChange={e => searchItems(e.target.value)}
                placeholder="Vyhledávání...."
                value={searchInput}
              />
              <button className="text-2xl" onClick={() => setSearchInput("")}>
                ❌
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-1 lg:grid-cols-1 p-8">
            {searchInput.length > 1
              ? filteredResults &&
                sortByDate(
                  filteredResults.map((post, index) =>
                    <Cart brand={post} key={index} />
                  )
                )
              : postData &&
                sortByDate(
                  postData.map((post, index) =>
                    <Cart brand={post} key={index} />
                  )
                )}
          </div>
        </div>
      </section>
    </main>
  );
}
