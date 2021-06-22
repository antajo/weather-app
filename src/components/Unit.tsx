import React from "react";
import { useStore, useDispatch } from "../store/Store";
import { ReactComponent as Icon } from "../assets/images/tick-mark.svg";
import "../assets/styles/unit.scss";

const Tick = () => <Icon data-testid="selected" />;

const Units = () => {
  const { unit } = useStore();
  const dispatch = useDispatch();

  const changeUnit = (unit: string) => {
    dispatch?.({ type: "SET_UNIT", payload: unit });
  };

  return (
    <div className="unit-wrapper" data-testid="units">
      <button title="°F, Mile, mi/h" onClick={() => changeUnit("I")}>
        {unit === "I" && <Tick />} <span>Imperial</span>
      </button>
      <button title="°C, km, km/h" onClick={() => changeUnit("M")}>
        {unit === "M" && <Tick />} <span>Metric</span>
      </button>
    </div>
  );
};

export default Units;
