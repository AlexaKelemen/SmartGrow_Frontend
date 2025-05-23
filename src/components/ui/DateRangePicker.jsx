import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateRangePicker = ({ startDate, endDate, onChange }) => {
  return (
    <div className="date-range-picker">
      <label>
        Start Date:
        <DatePicker
          selected={new Date(startDate)}
          onChange={(date) => onChange("startDate", date.toISOString().slice(0, 10))}
          selectsStart
          startDate={new Date(startDate)}
          endDate={new Date(endDate)}
          maxDate={new Date()}
          dateFormat="yyyy-MM-dd"
        />
      </label>
      <label>
        End Date:
        <DatePicker
          selected={new Date(endDate)}
          onChange={(date) => onChange("endDate", date.toISOString().slice(0, 10))}
          selectsEnd
          startDate={new Date(startDate)}
          endDate={new Date(endDate)}
          maxDate={new Date()}
          dateFormat="yyyy-MM-dd"
        />
      </label>
    </div>
  );
};

export default DateRangePicker;
