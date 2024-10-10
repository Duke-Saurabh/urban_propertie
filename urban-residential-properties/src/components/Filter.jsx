import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "./Filter.css";

function FilterComponent({ filteredData, setFilteredData, showType = true }) {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    location: false,
    type: false,
    priceRange: false,
  });
  const [location, setLocation] = useState("");
  const [type, setType] = useState("sale"); // Set default type
  const [lowerPrice, setLowerPrice] = useState("");
  const [ceilingPrice, setCeilingPrice] = useState("");
  const [searchInfo, setSearchInfo] = useState("");

  const filterRef = useRef(null);

  const handleClickOutsideFilter = (e) => {
    if (filterRef.current && !filterRef.current.contains(e.target)) {
      setShowFilters(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutsideFilter);
    return () => {
      document.removeEventListener("click", handleClickOutsideFilter);
    };
  }, []);

  const handleFilterToggle = (filter) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filter]: !prevFilters[filter],
    }));
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    let filteredDatas = [...filteredData];

    // Filter by type
    if (type !== "sale") {
      filteredDatas = filteredDatas.filter((field) => field.type === type);
    }

    // Filter by price range
    if (lowerPrice !== "") {
      filteredDatas = filteredDatas.filter((field) => field.price >= lowerPrice);
    }

    if (ceilingPrice !== "") {
      filteredDatas = filteredDatas.filter((fiel) => journey.price <= ceilingPrice);
    }

    // Filter by location
    if (location !== "") {
      filteredDatas = filteredDatas.filter((field) =>
         field.location.trim().toLowerCase().includes(location.trim().toLowerCase())
      );
    }

    // Sort journeys by journeyDate in descending order
    filteredDatas.sort((a, b) => new Date(b.journeyDate) - new Date(a.journeyDate));

    setFilteredData(filteredDatas);
    setShowFilters(false);
    setSearchInfo("");
  };

  const handleResetFilters = () => {
    setFilters({
      location: false,
      type: false,
      priceRange: false,
    });
    setLocation("");
    setType("sale");
    setLowerPrice("");
    setCeilingPrice("");
    setFilteredData(filteredData); // Reset to original data
    setSearchInfo(""); // Reset search info
  };

  useEffect(() => {
    if (searchInfo) {
      const searchFilteredData = filteredData.filter((journey) =>
       
        journey.description.toLowerCase().includes(searchInfo.toLowerCase())
      );
      setFilteredData(searchFilteredData);
    } else {
      // If searchInfo is empty, reset to filtered data
      setFilteredData(filteredData);
    }
  }, [searchInfo, filteredData, setFilteredData]);

  return (
    <div>
    <form className="max-w-lg mx-auto filter-search" onSubmit={handleFilterSubmit} ref={filterRef}>
      <div className="relative inline-block text-left filter">
        <button
          type="button"
          className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
          onClick={() => setShowFilters((prev) => !prev)}
        >
          Filters
          <svg
            className="w-2.5 h-2.5 ms-2.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>
        {showFilters && (
          <div className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-96 dark:bg-gray-700">
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Filters</h3>
              <div className="flex flex-wrap gap-4 mb-4">
                {Object.keys(filters).map((filter) => (
                  <label key={filter} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={filters[filter]}
                      onChange={() => handleFilterToggle(filter)}
                      className="form-checkbox"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-200">
                      {filter.charAt(0).toUpperCase() + filter.slice(1)}
                    </span>
                  </label>
                ))}
              </div>

              {/* Location Filter */}
              {filters.location && (
                <div className="my-2">
                  <label htmlFor="location-name" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Location
                  </label>
                  <input
                    type="text"
                    id="location-name"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                    placeholder="Enter location"
                  />
                </div>
              )}

              {/* Type Filter */}
              {showType && filters.type && (
                <div className="my-2">
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Type
                  </label>
                  <select
                    id="type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                  >
                    <option value="sale">Sale</option>
                    <option value="rent">Rent</option>
                    <option value="exchange">Exchange</option>
                  </select>
                </div>
              )}

              {/* Price Range Filter */}
              {filters.priceRange && (
                <div className="my-2">
                  <label htmlFor="lower-price" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Lower Price
                  </label>
                  <input
                    type="number"
                    id="lower-price"
                    value={lowerPrice}
                    onChange={(e) => setLowerPrice(e.target.value)}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                    placeholder="Enter lower price"
                  />
                  <label htmlFor="ceiling-price" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Ceiling Price
                  </label>
                  <input
                    type="number"
                    id="ceiling-price"
                    value={ceilingPrice}
                    onChange={(e) => setCeilingPrice(e.target.value)}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                    placeholder="Enter ceiling price"
                  />
                </div>
              )}

              <button
                type="submit"
                className="mt-4 inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Apply Filters
              </button>

              <button
                type="button"
                onClick={handleResetFilters}
                className="mt-2 inline-flex justify-center px-4 py-2 text-sm font-medium text-red-600 bg-white border border-red-600 rounded-md shadow-sm hover:bg-red-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600"
              >
                Reset Filters
              </button>
            </div>
          </div>
        )}
      </div>
    </form>
    <input
        type="text"
        value={searchInfo}
        onChange={(e) => setSearchInfo(e.target.value)}
        placeholder="Search by location or description"
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
      />
      </div>
  );
}

FilterComponent.propTypes = {
  filteredData: PropTypes.array.isRequired,
  setFilteredData: PropTypes.func.isRequired,
  showType: PropTypes.bool,
};

export default FilterComponent;
