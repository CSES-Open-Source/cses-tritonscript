import "../../src/pages/Dashboard.css";
import filter from '../assets/filter-icon.png';

export default function Dashboard() {
    return (
    <div>
      <div>dashboard</div>
      <div className="search-features">
      <input className="search-input"
        type="text"
        placeholder="Search..."
      />
      <div className="filter">
        <img className="logo" src={filter} alt="search filter icon" />
      </div>
    </div>
    </div>
    );
  };