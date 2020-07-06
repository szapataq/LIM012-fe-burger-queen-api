const linksPagination = (url, limit, page, total) => {
  const prevPage = page > 1 ? (parseInt(page, 0) - 1) : 1;
  const lastPage = Math.ceil(total / limit);
  const nextPage = limit * page < total ? parseInt(page, 0) + 1 : Math.ceil(total / limit);

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
