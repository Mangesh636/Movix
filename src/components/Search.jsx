import SearchIcon from "../assets/search.svg";

export const Search = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="search">
      <div>
        <img src={SearchIcon} alt="Search Icon" />

        <input
          type="text"
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>
    </div>
  );
};
