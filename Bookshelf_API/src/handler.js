/* eslint-disable prefer-const */
/* eslint-disable eqeqeq */
const uniqid = require('uniqid');
const books = require('./books');

const creatBookHandler = (request, h) => {
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;

  const id = uniqid();
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = false;

  const newbook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  if (newbook.name == null) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  if (newbook.readPage > newbook.pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  books.push(newbook);

  const isSuccess = books.filter((book) => book.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }
  const response = h.response({
    status: 'error',
    message: 'Buku gagal ditambahkan',
  });
  response.code(500);
  return response;
};

const showBookHandler = (request, h) => {
  const { query } = request;
  const val = Object.values(query);

  const isTrue = val.length > 0;

  if (isTrue) {
    const searchName = val[0];
    const bool = searchName == 1;

    if (Object.keys(query)[0] == 'finished') {
      const data = books.filter((it) => new RegExp(bool, 'i').test(it.finished))
        .map((item) => ({ id: item.id, name: item.name, publisher: item.publisher }));

      const response = h.response({
        status: 'success',
        data: {
          books: data,
        },
      });
      response.code(200);
      return response;
    }

    if (Object.keys(query)[0] == 'reading') {
      const data = books.filter((it) => new RegExp(bool, 'i').test(it.reading))
        .map((item) => ({ id: item.id, name: item.name, publisher: item.publisher }));

      const response = h.response({
        status: 'success',
        data: {
          books: data,
        },
      });
      response.code(200);
      return response;
    }

    if (Object.keys(query)[0] == 'name') {
      const data = books.filter((it) => new RegExp(searchName, 'i').test(it.name))
        .map((item) => ({ id: item.id, name: item.name, publisher: item.publisher }));

      const response = h.response({
        status: 'success',
        data: {
          books: data,
        },
      });
      response.code(200);
      return response;
    }
  }

  const data = books.map((item) => ({ id: item.id, name: item.name, publisher: item.publisher }));
  const response = h.response({
    status: 'success',
    data: {
      books: data,
    },
  });
  response.code(200);
  return response;
};

const detailBookHandler = (request, h) => {
  const { bookId } = request.params;
  const book = books.filter((n) => n.id === bookId)[0];
  if (book !== undefined) {
    return {
      status: 'success',
      data: {
        book,
      },
    };
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
};

const editBookHandler = (request, h) => {
  const { bookId } = request.params;

  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;

  const updatedAt = new Date().toISOString();
  const index = books.findIndex((book) => book.id === bookId);

  if (name == null) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
    };

    return {
      status: 'success',
      message: 'Buku berhasil diperbarui',
    };
  }
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

const deleteBookHandler = (request, h) => {
  const { bookId } = request.params;

  const index = books.findIndex((item) => item.id === bookId);

  if (index > -1) {
    books.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = {
  creatBookHandler, showBookHandler, detailBookHandler, editBookHandler, deleteBookHandler,
};
