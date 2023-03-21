import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import sanityClient from "../client.js";
import SyntaxHighlighter from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/hljs";
import BlockContent from "@sanity/block-content-to-react";
import imageUrlBuilder from "@sanity/image-url";
import Loader from "../components/Loader.jsx";

import { Helmet } from "react-helmet";

/**
 * Builder pro main zobrazení main obrazku
 */
const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

export default function SinglePost() {
  const [singlePost, setSinglePost] = useState(null);
  const { slug } = useParams();
  const ref = useRef(null);

  useEffect(
    () => {
      sanityClient
        .fetch(
          `*[slug.current == "${slug}"]{
            title,
            _id,
            slug,
            code,
            sideTips,
            topTips,
            mainImage{
                asset->{
                    _id,
                    url
                }
            },
            imagesSource,
            imagesSourceFrom,
            tags,
            date,
            body,
            description,
            prewlink,
            slider{
              asset->{
                _id,
                url
              }
            },
            author,
            "name": author->name,
            "authorImage": author->image
        }`
        )
        .then(data => setSinglePost(data[0]))
        .catch(console.error);
    },
    [slug]
  );

  //nastaveni zobrazeni kodu
  const serializers = {
    types: {
      code: ({ node = {} }) => {
        const { code, language } = node;
        if (!code) {
          return null;
        }
        return (
          <SyntaxHighlighter
            language={language || "text"}
            style={nightOwl}
            className="rounded-3"
          >
            {code}
          </SyntaxHighlighter>
        );
      }
    }
  };

  // kontrola načtení obsahu
  if (!singlePost) return <Loader />;

  return (
    <main className="py-2 mb-4">
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {singlePost.title}
        </title>
        <link rel="canonical" href="http://mysite.com/example" />
        <meta name="description" content={singlePost.description} />
        <meta property="og:title" content={singlePost.title} />
        <meta property="og:description" content={singlePost.description} />
        <meta
          property="og:image"
          content={urlFor(singlePost.mainImage).url()}
        />
        <meta
          name="seznam-ranking-position"
          content="query-exact: 1.0; query-broad: 1.3; (Google compatible)"
        />
      </Helmet>
      <div className="">
        <aside className=" relative w-full px-6 py-6  md:max-w-3xl md:mx-auto lg:max-w-4xl lg:pt-26 lg:pb-8">
          <div className="">
            <div
              className="overflow-hidden my-4 "
              style={{
                height: "auto",
                maxWidth: "100%"
              }}
            >
              <h1 className=" text-4xl sm:text-5xl md:text-6xl font-extrabold my-8">
                {singlePost.title}
              </h1>
              <div className="d-flex justify-content-center">
                <img
                  className="img-fluid rounded-3"
                  src={urlFor(singlePost.mainImage).url()}
                  alt={singlePost.title}
                />
              </div>
            </div>
            <div className="flex justify-between">
              <figure className="">
                <img
                  className="rounded-full w-4 border-2 border-green-600 bg-purple-600"
                  src={urlFor(singlePost.authorImage).url()}
                  alt={singlePost.name}
                  style={{
                    width: "60px",
                    height: "60px"
                  }}
                />

                <div className="flex justify-between mt-2">
                  <div className="font-semibold">
                    {singlePost.name}
                  </div>
                </div>
              </figure>
              <div className="flex flex-col gap-4 mt-5">
                <div className="flex gap-2">
                  <p className="m-0">photo from</p>
                  <a
                    href={singlePost.imagesSource}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {singlePost.imagesSourceFrom}
                  </a>
                </div>
                <div className="text-muted">
                  Last updated: {new Date(singlePost.date).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        </aside>
        <section className="relative w-full px-6 py-6  md:max-w-3xl md:mx-auto lg:max-w-4xl lg:pt-2 lg:pb-28">
          <article
            style={{
              display: singlePost.body ? "block" : "none"
            }}
          >
            <BlockContent
              blocks={singlePost.body}
              serializers={serializers}
              projectId="0qhx0jng"
              dataset="production"
              className="mt-8 prose text-current  prose-slate mx-auto lg:prose-lg xl:prose-xl"
            />
          </article>
        </section>
      </div>
    </main>
  );
}
