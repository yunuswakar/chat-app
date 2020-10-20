





module.exports = {
  Paging(array, limit = 10, page = 1) {
    return array.slice(limit * (page - 1), limit * (page - 1) + limit);
  }

}