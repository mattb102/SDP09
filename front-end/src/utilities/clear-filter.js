const clearFilter = (e, setQueryParams, setCurrentPage, setMenuOpen) => {
  e.preventDefault();
  setCurrentPage(1);
  setQueryParams({});
  setMenuOpen(false);
};  

export default clearFilter;