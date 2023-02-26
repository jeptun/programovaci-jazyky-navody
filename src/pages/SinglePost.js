import React, { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import sanityClient from "../client.js";
import SyntaxHighlighter from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/hljs";
import BlockContent from "@sanity/block-content-to-react";
import imageUrlBuilder from "@sanity/image-url";
import Loader from "../components/Loader.jsx";
// import colorChanger from "../func/colorChanger.js";
import QRCode from "react-qr-code";
import { BsFillArrowDownCircleFill } from "react-icons/bs";
import { FaLink } from "react-icons/fa";
import { CopyToClipboard } from "react-copy-to-clipboard";

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

  useEffect(() => {
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
      .then((data) => setSinglePost(data[0]))
      .catch(console.error);
  }, [slug]);

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
      },
    },
  };
  // reference id
  const handleClick = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  // kontrola načtení obsahu
  if (!singlePost) return <Loader />;

  return (
    <main className="col-md-10 ps-4 pt-4 mb-4">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{singlePost.title}</title>
        <link rel="canonical" href="http://mysite.com/example" />
        <meta name="description" content={singlePost.description}></meta>
        <meta property="og:title" content={singlePost.title}></meta>
        <meta property="og:description" content={singlePost.description}></meta>
        <meta
          property="og:image"
          content={urlFor(singlePost.mainImage).url()}
        ></meta>
        <meta
          name="seznam-ranking-position"
          content="query-exact: 1.0; query-broad: 1.3; (Google compatible)"
        ></meta>
      </Helmet>
      <div className="container">
        <aside className=" my-5">
          <div className="px-2">
            <div
              className="overflow-hidden my-4 "
              style={{ maxHeight: "70vh" }}
            >
              <div className="d-flex justify-content-center">
                <img
                  className="img-fluid rounded-3"
                  src={urlFor(singlePost.mainImage).url()}
                  alt={singlePost.title}
                />
              </div>
            </div>
            <h1 className="display-4 fw-bold">
              {singlePost.title}
            </h1>
            <div className=" d-flex gap-2 justify-content-end align-items-center">
              <blockquote className="m-0">photo from</blockquote>
              <a
                href={singlePost.imagesSource}
                target="_blank"
                rel="noreferrer"
              >
                {singlePost.imagesSourceFrom}
              </a>
            </div>
            {/* tady */}
            <div className="row ">
              <figure className="col-12 col-sm-4  d-flex gap-1  h-100   ">
                <img
                  className="  rounded-circle w-4"
                  src={urlFor(singlePost.authorImage).url()}
                  alt={singlePost.name}
                  style={{
                    width: "50px",
                    height: "50px",
                  }}
                />

                <div>
                  <div className="text-dark fw-bold fs-5">
                    {singlePost.name}
                  </div>

                  <div className="text-muted">
                    Last updated:{" "}
                    {new Date(singlePost.date).toLocaleDateString()}
                  </div>
                </div>
              </figure>
              <div className="col-12  col-sm-8 d-flex justify-content-end  h-100">
                <div className="d-flex gap-1 align-items-center ">
                  <Link
                    onClick={handleClick}
                    to={singlePost.slug}
                    className="lead nav-link fs-3 p-0 text-dark"
                  >
                    <BsFillArrowDownCircleFill
                      style={{
                        width: "20px",
                        height: "20px",
                        color: "#43b581",
                      }}
                    />
                  </Link>

                  <div className="pe-auto btn">
                    <CopyToClipboard
                      className=" fs-3"
                      text={singlePost.prewlink}
                    >
                      <FaLink
                        style={{
                          width: "18px",
                          height: "18px",
                          color: "#43b581",
                        }}
                      />
                    </CopyToClipboard>
                  </div>
                  <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                    <div
                      className="my-3 p-2 border border-2 border-dark rounded-4"
                      style={{
                        height: "auto",
                        maxWidth: "82px",
                        width: "100%",
                        display: singlePost.prewlink ? "flex" : "none",
                      }}
                    >
                      <QRCode
                        size={256}
                        fgColor="#5661f2"
                        style={{
                          height: "auto",
                          maxWidth: "100%",
                          width: "100%",
                        }}
                        value={singlePost.prewlink ? singlePost.prewlink : "0"}
                        viewBox={`0 0 256 256`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>
        {/* <aside className="my-5">
          <div className="">
            <div className="row g-0 border rounded-4 border border-dark overflow-hidden flex-md-row mb-4 position-relative ">
              <div className="col-md-1 bg-primary border border-4 border-primary"></div>
              <div
                className=" col-md-11 p-4 d-flex flex-column position-static"
                style={{
                  backgroundColor: "#f0f9ff",
                }}
              >
                <BlockContent
                  blocks={singlePost.topTips}
                  serializers={serializers}
                  projectId="0qhx0jng"
                  dataset="production"
                  className="mb-0 text-dark "
                />
              </div>

            </div>
          </div>
        </aside> */}
        <section className="row ps-2  my-5 " ref={ref}>
          <article className="col-md-6 col-lg-8">
            <section>
              <BlockContent
                blocks={singlePost.body}
                serializers={serializers}
                projectId="0qhx0jng"
                dataset="production"
              />
            </section>
          </article>
          <article
            className="col-md-6 col-lg-4 mb-3 "
            style={{
              display: singlePost.sideTips ? "block" : "none",
            }}
          >
            <div
              className="position-sticky"
              style={{
                top: "4rem",
              }}
            >
              <div
                className=" p-4 mb-3 bordericon "
                style={{
                  backgroundColor: "#fffbeb",
                }}
              >
                <BlockContent
                  blocks={singlePost.sideTips}
                  serializers={serializers}
                  projectId="0qhx0jng"
                  dataset="production"
                  className="mb-0 text-dark "
                />
              </div>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}
