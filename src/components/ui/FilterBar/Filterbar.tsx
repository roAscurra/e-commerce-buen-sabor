import React from "react";
import './Filterbar.css'; // Importa tu archivo CSS personalizado
import { Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpShortWide } from "@fortawesome/free-solid-svg-icons";

interface FilterBarProps {
  selectedOption: any;
  handleOptionFilter: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  orderByPrecio: boolean;
  searchTerm: string;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSortByPrice: () => void;
  handleClearFilters: () => void;
  options: { value: any; label: string }[]; // Array de opciones de filtro
}

const FilterBar: React.FC<FilterBarProps> = ({
  selectedOption,
  handleOptionFilter,
  orderByPrecio,
  searchTerm,
  handleSearchChange,
  handleSortByPrice,
  handleClearFilters,
  options,
}) => {
  const clearFilters = () => {
    handleClearFilters();
  };

  return (
    <div className="row filterbar align-items-stretch justify-content-center mb-3 g-0">
    <div className="col-lg-2 col-md-3 col-sm-2 col-2 mb-3 mb-sm-0">
        <div className="d-flex h-100 align-items-center justify-content-center">
        <Button className="ordenar-btn" onClick={handleSortByPrice}>
            <FontAwesomeIcon icon={faArrowUpShortWide} />
        </Button>
        </div>
    </div>
    <div className="col-lg-4 col-md-5 col-sm-10 col-10 mb-3 mb-sm-0">
        <div className="d-flex h-100 align-items-center">
        <select
            value={selectedOption || ''}
            onChange={handleOptionFilter}
            className="form-select w-100"
            style={{ height: "100%" }}
        >
            {options.map((option) => (
            <option key={option.value} value={option.value}>
                {option.label}
            </option>
            ))}
        </select>
        </div>
    </div>
    {(selectedOption || searchTerm || orderByPrecio) && (
        <>
        <div className="col-lg-4 col-md-4 col-sm-12 col-12 mb-sm-0">
            <div className="d-flex h-100 align-items-center">
            <input
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="form-control search-input w-100"
                style={{ height: "100%" }}
            />
            </div>
        </div>
        <div className="col-lg-2 col-md-3 col-sm-12 col-12 d-flex align-items-center justify-content-center mb-3 mb-sm-0">
            <Button
            className="btn btn-clear-filter"
            onClick={clearFilters}
            style={{ backgroundColor: "#6093ce", color: "white", width: "100%", height: "100%"}}
            >
            Limpiar filtros
            </Button>
        </div>
        </>
    )}
    {!selectedOption && !searchTerm && !orderByPrecio &&(
        <div className="col-lg-6 col-md-6 col-sm-12 col-12 mb-sm-0">
        <div className="d-flex h-100 align-items-center">
            <input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="form-control search-input"
            style={{ height: "100%", width: "100%" }}
            />
        </div>
        </div>
    )}
    </div>
  );
};

export default FilterBar;
