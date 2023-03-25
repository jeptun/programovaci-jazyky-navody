import React, { useState, useEffect } from "react";
import sanityClient from "../client.js";
import Loader from "../components/Loader.jsx";
import { Helmet } from "react-helmet";
import { Cart } from "../components/Cart.jsx";
//Todo Dodelat header
/**
 * Builder pro main zobrazení main obrazku
 */
export default function OtherPost() {
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
        <title>Moje Návody - Ostatní</title>
        <meta
          name="description"
          content="Různé návody pro programátory a kodéry."
        />
        <meta
          property="og:title"
          content="Různé návody pro programátory a kodéry."
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
      <section className="py-6 sm:py-12 max-w-6xl mx-auto">
        <div className="container p-6 mx-auto space-y-8">
          <div className="space-y-2 text-center">
          <h2 className="text-3xl font-bold">Ostatní články</h2>
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
              <button
                className="  text-2xl  "
                onClick={() => setSearchInput("")}
              >
                ❌
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-1 lg:grid-cols-1 p-8">
            {searchInput.length > 1
              ? filteredResults &&
                filteredResults.map((post, index) =>
                <Cart brand={post} key={index}/>
                )
              : postData &&
                postData.map((post, index) =>
                  <Cart brand={post} key={index}/>
                )}
          </div>
        </div>
      </section>
    </main>
  );
}
