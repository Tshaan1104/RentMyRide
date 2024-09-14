"use client";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css";

import { DateRange } from "react-date-range";
import { useState } from "react";
import { eachDayOfInterval } from "date-fns";

export function SelectCalendar({
  reservations,
}: {
  reservations: {
    startdata: Date;
    enddate: Date;
  } [] | undefined;
}) {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  let disableddates: Date[] = [];
  reservations?.forEach((reservationitem) => {
    const dateRange=eachDayOfInterval({
        start: new Date(reservationitem.startdata),
        end: new Date(reservationitem.enddate),
    });

    disableddates=[...disableddates,...dateRange];

  })
  return (
    <>
      <input
        type="hidden"
        name="startdate"
        value={state[0].startDate.toISOString()}
      />
      <input
        type="hidden"
        name="enddate"
        value={state[0].endDate.toISOString()}
      />

      <DateRange
        date={new Date()}
        showDateDisplay={false}
        rangeColors={["#FFA500"]}
        ranges={state}
        onChange={(item) => setState([item.selection] as any)}
        minDate={new Date()}
        direction="vertical"
        disabledDates={disableddates}
      />
    </>
  );
}
