import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import sanityClient from "../client.js";

import BlockContent from "@sanity/block-content-to-react";

import colorChanger from "../func/colorChanger.js";
import Loader from "../components/Loader.jsx";


export default function SinglePost() {
  const [singlePost, setSinglePost] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    sanityClient
      .fetch(
        `*[slug.current == "${slug}"]{
            title,
            _id,
            slug,
            mainImage{
                asset->{
                    _id,
                    url
                }
            },
            postImage{
              asset->{
                  _id,
                  url
              }
            },
            tags,
            date,
            body,
            prewlink,
            slider{
              asset->{
                _id,
                url
              }
            },
            author,
            githublink,
            "name": author->name,
            "authorImage": author->image
        }`
      )
      .then((data) => setSinglePost(data[0]))
      .catch(console.error);
  }, [slug]);

  if (!singlePost) return <Loader />;


  return (
    <main className="container">
      <article className="singlepost-article padding-block-900 padding-lr-600">
        <aside className="singlepost-aside">
          <h1 className="singlepost-title">{singlePost.title}</h1>
          <div className="singlepost-tags-wrapper">
            {singlePost.tags ? (
              singlePost.tags.map((item, index) => (
                <div
                  key={index}
                  className="singlepost-tags"
                  style={{ color: colorChanger() }}
                >
                  {item}
                </div>
              ))
            ) : (
              <div>No tags found!</div>
            )}
          </div>

      
        </aside>
        <section className="singlepost-blockcontent">
          <BlockContent
            blocks={singlePost.body}
            projectId="0qhx0jng"
            dataset="production"
          />
        </section>
      </article>
    </main>
  );
}
