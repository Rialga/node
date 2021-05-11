const {
  creatBookHandler, showBookHandler, detailBookHandler, editBookHandler, deleteBookHandler,
} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: creatBookHandler,
  },

  {
    method: 'GET',
    path: '/books',
    handler: showBookHandler,
  },

  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: detailBookHandler,
  },

  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: editBookHandler,
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteBookHandler,
  },
];

module.exports = routes;
