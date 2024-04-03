export const handleBackPage = (setCurrentPage) => {
  setCurrentPage(prevPage => prevPage > 1 ? prevPage - 1 : prevPage);
  document.getElementById('properties').scrollTop = 0;
}

export const handleNextPage = (setCurrentPage, totalPages) => {
  console.log(totalPages);
  setCurrentPage(prevPage => prevPage >= totalPages ? prevPage : prevPage + 1);
  document.getElementById('properties').scrollTop = 0;
};