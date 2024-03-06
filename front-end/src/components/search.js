import React from "react";

function SearchBar() {
  return (
    <div className="search-bar">
      <input
        value={'test'}
        placeholder="City, ZIP, Address"
        className={"input-box"} />
      <input
        className={"input-button"}
        type="submit"
        value="Price &#9660;" />
      <input
        className={"input-button"}
        type="submit"
        value="Beds and Baths &#9660;" />
    </div>
  );
}

export default SearchBar;