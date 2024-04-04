export const handleBackPage = (setCurrentPage) => {
  setCurrentPage(prevPage => prevPage > 1 ? prevPage - 1 : prevPage);
  window.scrollTo({
    top: 72,
    behavior: 'smooth'
  });
}

export const handleNextPage = (setCurrentPage, totalPages) => {
  console.log(totalPages);
  setCurrentPage(prevPage => prevPage >= totalPages ? prevPage : prevPage + 1);
  window.scrollTo({
    top: 72,
    behavior: 'smooth'
  });
};