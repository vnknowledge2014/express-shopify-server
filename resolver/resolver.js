const request = require("request-promise");
const shop = process.env.shop;
const pageURI = `https://${shop}/admin/pages`;

const pages = () => {
  return request({
    method: "GET",
    uri: `${pageURI}.json`,
    headers: {
      "X-Shopify-Access-Token": process.env.accessToken,
      client_id: process.env.apiKey,
      client_secret: process.env.apiSecret
    },
    json: true
  })
    .then(async rs => {
      console.log(rs);
      let a = JSON.parse(rs);
      return a.id;
    })
    .catch(async error => {
      return error.json();
    });
};

const resolvers = {
  Query: {
    getPages: () => {
      return pages();
    }
    // getSinglePage: async (root, { id }) => {
    //     return await BookModel.findOne({ _id: id });
    // },
    // getPageCount: async (root, { author }) => {
    //     return await BookModel.find({ author: author }).sort([['like', -1]]);
    // }
  }
  // Mutation: {
  //     addBook: async (root, { bookTitle, author, category, image, content, link, uploader }) => {
  //         const Book = await new BookModel({ bookTitle: bookTitle, author: splitArray(author), category: splitArray(category), content: content, image: image, link: splitArray(link), uploader: uploader });
  //         return Book.save();
  //     },
  //     updateBook: async (root, { id, bookTitle, author, category, image, content, link, uploader }) => {
  //         return await BookModel.findOneAndUpdate({ _id: id }, { bookTitle: bookTitle, author: author, category: category, content: content, image: image, link: link, uploader: uploader });
  //     },
  //     deleteBook: async (root, { id }) => {
  //         return await BookModel.findOneAndDelete({ _id: id });
  //     },
  //     updateLike: async (root, { id }) => {
  //         await BookModel.update({ _id: id }, { $inc: { like: 1 } });
  //         return BookModel.findOne({ _id: id });
  //     }
  // }
};

module.exports = resolvers;
