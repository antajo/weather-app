import React, { useState } from "react";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { getLocation } from "../helper/api";
import "../assets/styles/typeahead.scss";
import { LocationType } from "../model/Location";

const props: any = {
  labelKey: "title",
};

type PropType = {
  onChange: (event: LocationType) => void;
};

const LocationSearch = ({ onChange }: PropType) => {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    try {
      const { data } = await getLocation(query);
      setOptions(data);
    } catch (error) {
      setOptions([]);
    }

    setIsLoading(false);
  };

  const changeHandler = (data: LocationType[]) => {
    onChange(data?.[0]);
  };

  return (
    <AsyncTypeahead
      {...props}
      id="location-search"
      isLoading={isLoading}
      minLength={1}
      onSearch={handleSearch}
      options={options}
      onChange={changeHandler}
      placeholder="Search for location..."
      renderMenuItemChildren={(option: LocationType) => (
        <span>{option.title}</span>
      )}
    />
  );
};

export default LocationSearch;
