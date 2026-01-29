"use client";
import { useState } from "react";
import { DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const CalendarComponent = ({ onDateChange }) => {
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: "selection",
    },
  ]);

  const handleChange = (item) => {
    const selected = item.selection;
    setRange([selected]);
    onDateChange(selected);
  };

  return (
    <>
      <DateRangePicker
        ranges={range}
        onChange={handleChange}
        moveRangeOnFirstSelection={false}
        months={1}
        direction="horizontal"
        showDateDisplay={false}
        showPreview={false}
        staticRanges={[]}
        inputRanges={[]}
        calendarFocus="forwards"
      />

      {/* 🔥 INLINE CSS (NO EXTRA FILE) */}
      <style jsx global>{`
        /* Remove left preset panel completely */
        .rdrDefinedRangesWrapper {
          display: none;
        }

        /* Remove unnecessary spacing */
        .rdrCalendarWrapper {
          width: 100% !important;
          padding: 0 !important;
        }

        .rdrMonth {
          width: 100% !important;
        }

        .rdrMonths {
          justify-content: center;
        }
      `}</style>
    </>
  );
};

export default CalendarComponent;

