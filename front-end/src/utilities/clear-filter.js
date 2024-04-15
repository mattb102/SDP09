const clearFilter = (e, setQueryParams, setCurrentPage, setMenuOpen) => {
  e.preventDefault();
  setCurrentPage(1);
  setQueryParams(prev => { return prev.q ? {q: prev.q} : {}});
  setMenuOpen(false);
};  

export default clearFilter;