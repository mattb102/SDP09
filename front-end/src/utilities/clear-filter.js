const clearFilter = (e, setQueryParams, setCurrentPage, setMenuOpen) => {
  e.preventDefault();
  setCurrentPage(1);
  setQueryParams(prev => { return {q: prev.q}});
  setMenuOpen(false);
};  

export default clearFilter;