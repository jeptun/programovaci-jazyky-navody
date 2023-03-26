// eslint-disable-next-line import/no-anonymous-default-export
export default {
  name: "javascriptPosts",
  title: "Javascript Posts",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      description: "*Povinné",
      type: "string"
    },
    {
      name: "slug",
      title: "Slug",
      description: "*Povinné - generovat ze jména",
      type: "slug",
      options: {
        source: "title",
        slugify: input => input.toLowerCase().replace(/\s+/g, "-").slice(0, 96)
      }
    },
    {
      name: "author",
      title: "Author",
      description: "*Povinné",
      type: "reference",
      to: { type: "author" }
    },
    {
      name: "mainImage",
      title: "Main image",
      type: "image",
      description: "Maly obrázek 640x426",
      options: {
        hotspot: true
      }
    },
    {
      name: "imagesSource",
      title: "Images Source",
      description: "*Povinné",
      type: "url"
    },
    {
      name: "imagesSourceFrom",
      title: "Images Source From",
      description: "*Povinné",
      type: "string"
    },
    {
      title: "Description",
      name: "description",
      description: "Maximální délka 150 znaků",
      type: "text"
    },
    {
      title: "Release Date",
      name: "releaseDate",
      type: "date"
    },
    {
      name: "body",
      title: "Body",
      description: "*Povinné",
      type: "blockContent"
    },
    {
      name: "tags",
      type: "array",
      description: "*Volitelné #tagy",
      description: "Tagy odděluj mezerou",
      of: [
        {
          type: "string"
        }
      ],
      options: {
        layout: "tags"
      }
    }
  ],

  orderings: [
    {
      title: "Release Date",
      name: "releaseDate",
      by: [{ field: "releaseDate", direction: "asc" }]
    },
    {
      title: "Rating",
      name: "rating",
      by: [{ field: "rating", direction: "desc" }]
    }
  ],

  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "mainImage",
    },
    prepare(selection) {
  const { author } = selection;
  return Object.assign({}, selection, {
    subtitle: author && `by ${author}`,
  });
    },
  },
};
