import { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownToggle from "react-bootstrap/DropdownToggle";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import "bootstrap/dist/css/bootstrap.min.css";
import "./../Dropdown/Dropdown.css";

function Dropdowns({ planName, handlePlanSelect }) {
  const [isOpen, setIsOpen] = useState(false);

  const onDropdownClick = () => {
    setIsOpen(!isOpen);
  };

  const onPlanSelect = (plan) => {
    handlePlanSelect(plan);
    setIsOpen(false);
  };

  const handlePlanSelectDropdown = (plan) => {
    handlePlanSelect(plan);
    setIsOpen(false);
  };

  return (
    <div className="dropdown-container">
      <Dropdown
        isOpen={isOpen}
        toggle={() => setIsOpen(!isOpen)}
        className="my-dropdown"
      >
        <DropdownToggle
          id="dropdown-item-button"
          className="dropdown-toggle"
          style={{
            color: planName ? "#1C1C1E" : "#bbbec6",
            background: "#ffffff",
          }}
        >
          {planName || "원하시는 플랜을 선택해 주세요"}
          <img src="/image/pc/Dropdown/down.svg" className="drop-down"></img>
        </DropdownToggle>
        <DropdownMenu>
          <Dropdown.Item
            onClick={() =>
              handlePlanSelectDropdown("옐로우 플랜(월 30만원부터)")
            }
          >
            옐로우 플랜(월 30만원부터)
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => handlePlanSelectDropdown("블루 플랜(주 50만원부터)")}
          >
            블루 플랜(주 50만원부터)
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => handlePlanSelectDropdown("그린 플랜(주 80만원부터)")}
          >
            그린 플랜(주 80만원부터)
          </Dropdown.Item>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

export { Dropdowns };
