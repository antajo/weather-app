import React from "react";
import { ReactComponent as Icon } from "../assets/images/volvo-logo.svg";
import "../assets/styles/header.scss";
import LocationSearch from "./LocationSearch";
import { LocationType } from "../model/Location";
import { useDispatch } from "../store/Store";

const Logo = () => (
  <div className="logo-wrapper">
    <Icon />
  </div>
);

const Header = () => {
  const dispatch = useDispatch();

  const locationChange = (location: LocationType) => {
    dispatch?.({ type: "SET_LOCATION", payload: location });
  };

  return (
    <div className="header" data-testid="header">
      <Logo />
      <LocationSearch onChange={locationChange} />
    </div>
  );
};

export default Header;
