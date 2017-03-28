function Pagination(total, pages, currentPage) {
  this.total = total;
  this.pages = pages;
  this.currentPage = currentPage;

  this.getPagination = function() {
    return {
      "totalResult": this.total,
      "totalPage": this.pages,
      "thisPage": this.currentPage
    }
  }
}

module.exports = Pagination