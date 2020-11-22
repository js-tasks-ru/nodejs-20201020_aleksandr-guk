module.exports = {
  mongodb: {
    uri: (process.env.NODE_ENV === 'test') ?
      'mongodb+srv://alex_guk:1234@cluster0.40pbz.mongodb.net/6-module-2-task?retryWrites=true&w=majority' :
      'mongodb+srv://alex_guk:1234@cluster0.40pbz.mongodb.net/any-shop?retryWrites=true&w=majority',
  },
};
