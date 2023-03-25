import React from 'react'
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";


export const Cart = (post) => {
  return (
    <Link
    to={"/post/" + post.brand.slug.current}
    key={post.brand.slug.current}
    className="flex md:flex-row flex-col shadow-md rounded w-full"
  >
    <LazyLoadImage
      src={post.brand.mainImage.asset.url}
      className="h-80 w-full md:h-80 md:w-96 lg:h-60 lg:w-80"
      alt={post.brand.title}
    />
    <div className=" ">
      <h2
        rel="noopener noreferrer"
        to={"/post/" + post.brand.slug.current}
        className="text-3xl text-indigo-500 font-black leading-snug px-3 py-2"
      >
        {post.brand.title}
      </h2>
      <div className="flex flex-wrap gap-4 leading-snug px-3 py-1">
        <span className="opacity-80 font-bold">
          🗓️
          {" " + new Date(post.brand.date).toLocaleDateString()}
        </span>
        <div className="flex gap-1">
          🧠
          <p className="font-bold break-all opacity-80">
            {post.brand.tags + ";"}
          </p>
        </div>
      </div>
      <div className="text-md  font-bold leading-snug p-3">
        <h4 className="line-clamp-3  ">
          {post.brand.description}
        </h4>
      </div>
    </div>
  </Link>
  )
}
