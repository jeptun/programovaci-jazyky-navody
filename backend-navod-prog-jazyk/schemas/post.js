// eslint-disable-next-line import/no-anonymous-default-export
export default {
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    },
    {
      name: "author",
      title: "Author",
      type: "reference",
      to: { type: "author" },
    },
    {
      name: "mainImage",
      title: "Main image",
      type: "image",
      description: "Maly obrázek 575x384",
      options: {
        hotspot: true,
      },
    },
    {
      name: "postImage",
      title: "Post image",
      type: "image",
      description: "Velky obrázek",
      options: {
        hotspot: true,
      },
    },
    {
      title: "Description",
      name: "description",
      description: "Maximální délka 150 znaků",
      type: "text",
    },
    {
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
    },
    {
      name: "date",
      type: "datetime",
    },
    {
      name: "body",
      title: "Body",
      type: "blockContent",
    },
    {
      name: "tags",
      type: "array",
      description: "Tagy odděluj mezerou",
      of: [
        {
          type: "string",
        },
      ],
      options: {
        layout: "tags",
      },
    },

    {
      name: "prewlink",
      title: "Prew link",
      description: "Link na ukázku projektu",
      type: "url",
    },
    {
      name: "githublink",
      title: "Github link",
      description: "Link na repozitář",
      type: "url",
    },
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
