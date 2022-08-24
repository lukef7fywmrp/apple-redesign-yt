import { BiCategory } from "react-icons/bi";

export default {
  name: "category",
  title: "Category",
  type: "document",
  icon: BiCategory,
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
  ],
};
