import React, { useEffect, useState } from "react";
import sanityClient from "../client.js";
import imageUrlBuilder from "@sanity/image-url";
import Loader from "../components/Loader.jsx";
import { LazyLoadImage } from "react-lazy-load-image-component";
import colorChanger from "../func/colorChanger.js";

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

export default function About() {
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "author"]{
          name,
          "bio": bio[0].children[0].text,
          "authorImage": image.asset->url
      }`
      )
      .then((data) => setAuthor(data[0]))
      .catch(console.error);
  }, []);

  if (!author) return <Loader />;
  return (
    <main className="home-container padding-lr-600">
      <div className="hero">
        <div className="">
          <h1 className="">
            Ahoj, jmenuji se Josef. A jsem junior front-end developer!{" "}
          </h1>
          <p className="">{author.bio}</p>
        </div>
        <LazyLoadImage
          src={urlFor(author.authorImage).url()}
          className=""
          alt={author.name}
          style={{
            background: colorChanger(),
          }}
        />
      </div>
    </main>
  );
}
