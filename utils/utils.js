const linksPagination = (url, limit, page, total) => {
  const prevPage = parseInt(page, 0) - 1;
  const lastPage = total / limit;
  const nextPage = parseInt(page, 0) + 1;

  // const nextPage = () => {
  //   if () {
  //     parseInt(page, 0) + 1;
  //   } else {
  //     parseInt(page, 0);
  //   }
  // };

  const link = {
    first: `${url}?limit=${limit}&page=1`,
    prev: `${url}?limit=${limit}&page=${prevPage}`,
    next: `${url}?limit=${limit}&page=${nextPage}`,
    last: `${url}?limit=${limit}&page=${lastPage}`,
  };

  return link;
};

module.exports = {
  linksPagination,
};

// @header {Object} link Parámetros de paginación
// @header {String} link.first Link a la primera página
// @header {String} link.prev Link a la página anterior
// @header {String} link.next Link a la página siguiente
// @header {String} link.last Link a la última página
