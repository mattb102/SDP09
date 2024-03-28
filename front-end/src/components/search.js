import React, {useState} from "react";

function SearchBar({maxPrice, setMaxPrice}) {
  return (
    <div className="search-bar">
      <input
        value={'test'}
        placeholder="City, ZIP, Address"
        className={"input-box"} />
      <input
        value={maxPrice}
        placeholder="max price"
        className={"input-box"}
        onChange={ev => setMaxPrice(ev.target.value)} />
      <input
        className={"input-button"}
        type="submit"
        value="Beds and Baths &#9660;" />
    </div>
  );
}

export default SearchBar;