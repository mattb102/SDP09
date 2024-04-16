const clearFilter = (e, setQueryParams, setCurrentPage, setMenuOpen) => {
  e.preventDefault();
  setCurrentPage(1);
  setQueryParams(prev => { return prev.q ? {q: prev.q} : {}});
  setMenuOpen(false);

  var form = document.getElementById('filters');
  var inputs = form.querySelectorAll('input');
  inputs.forEach(function(input) {
    input.value = '';
  });
};  

export default clearFilter;