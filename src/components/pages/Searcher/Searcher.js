import { useContext, useState } from "react";
import { ApiContext } from "../../../services/Api";
import "./Searcher.css";
import { BsSearch } from "react-icons/bs";

const Searcher = ({ type }) => {
  const { setSearch, setType } = useContext(ApiContext);

  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (ev) => {
    const inputValue = ev.target.value;
    setSearchTerm(inputValue);
  };

  const handleClick = () => {
    setType(type)
    setSearch(searchTerm);
  };

  const handleKeyPress = (ev) => {
    if (ev.key === "Enter") {
      setType(type);
      setSearch(searchTerm);
    }
  };

  return (
    <div className="searcher">
      <button className="searcher-btn" onClick={handleClick}>
        <BsSearch className="search-icon" />
        <img src={require("../../../assets/icon-search.png")} alt="Searcher" />
      </button>
      <input
        className="searcher-input"
        type="text"
        placeholder="SEARCH"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
      />
    </div>
  );
};

export default Searcher;