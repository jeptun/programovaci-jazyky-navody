export default {
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    // {
    //   name: "post",
    //   title: "Post",
    //   type: "array",
    //   of: [{ type: "reference", to: { type: "post" } }],
    // },
  ],
}
