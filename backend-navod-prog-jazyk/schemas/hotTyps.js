export default {
  name: "hotTips",
  title: "Hot Tips",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      description: "*Povinné",
      type: "string",
    },
    {
      name: "category",
      title: "Category",
      description: "*Povinné",
      type: "string"
    },
    {
      title: "Description",
      name: "description",
      description: "Maximální délka 150 znaků",
      type: "text"
    }
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare(selection) {
      const { author } = selection;
      return Object.assign({}, selection, {
        subtitle: author && `by ${author}`,
      });
    },
  },
};
