export const handleNextPage = () => {
  console.log(totalPages);
  setCurrentPage(prevPage => prevPage >= totalPages ? prevPage : prevPage + 1);
  document.getElementById('properties').scrollTop = 0;
};

export const handleBackPage = () => {
  setCurrentPage(prevPage => prevPage > 1 ? prevPage - 1 : prevPage);
  document.getElementById('properties').scrollTop = 0;
}