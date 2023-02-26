// eslint-disable-next-line import/no-anonymous-default-export
export default {
    name: "csharpPosts",
    title: "Csharp Posts",
    type: "document",
    fields: [
      {
        name: "title",
        title: "Title",
        description: "*Povinné",
        type: "string",
      },
      {
        name: "slug",
        title: "Slug",
        description: "*Povinné - generovat ze jména",
        type: "slug",
        options: {
          source: "title",
          maxLength: 96,
        },
      },
      {
        name: "ids",
        title: "Ids",
        description: "*Povinné číslo určuje pořadí v zobrazení",
        type: "string",
      },
      {
        name: "author",
        title: "Author",
        description: "*Povinné",
        type: "reference",
        to: { type: "author" },
      },
      {
        name: "mainImage",
        title: "Main image",
        type: "image",
        description: "Maly obrázek 640x426",
        options: {
          hotspot: true,
        },
      },
      {
        name: "imagesSource",
        title: "Images Source",
        description: "*Povinné",
        type: "string",
      },
      {
        name: "imagesSourceFrom",
        title: "Images Source From",
        description: "*Povinné",
        type: "string",
      },
      {
        title: "Description",
        name: "description",
        description: "Maximální délka 150 znaků",
        type: "text",
      },
      {
        name: "topTips",
        title: "Top Tips",
        description: "*Povinné",
        type: "blockContent",
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
        description: "*Volitelné čas vytvoření ",
      },
      {
        name: "body",
        title: "Body",
        description: "*Povinné",
        type: "blockContent",
      },
      {
        name: "sideTips",
        title: "Side Tips",
        description: "*Povinné",
        type: "blockContent",
      },
      {
        name: "tags",
        type: "array",
        description: "*Volitelné #tagy",
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
        description: "Odkaz tuto na stranku. Generuje QR kod a link",
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
  