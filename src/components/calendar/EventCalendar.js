import React, { useMemo, useState } from "react";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import {
  DEFAULT_TIMEZONE,
  LEAVE_STATUS_COLOR,
} from "../../variables/constants";
import { useTheme } from "@mui/material";
import RequestCardModal from "../../features/leave/leaveManagement/RequestCardModal";
import { toPascalCase } from "../../utils/stringFormat";

dayjs.extend(timezone);
dayjs.extend(utc);
const djLocalizer = dayjsLocalizer(dayjs);

const formatEventsForCalendar = (events, type) => {
  return events.map((event) => {
    const start = dayjs(event.fromDate).utc().tz(DEFAULT_TIMEZONE).toDate();
    const end = dayjs(event.toDate).utc().tz(DEFAULT_TIMEZONE).toDate();
    return {
      start,
      end,
      title:
        type === "userView"
          ? toPascalCase(event.category.name)
          : event.requestedUser.fullName,
      status: event.status,
      ...event,
    };
  });
};

function EventCalendar({
  events,
  localizer = djLocalizer,
  type,
  height,
  fontSize,
  minWidth,
  ...props
}) {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const theme = useTheme();
  const { defaultDate } = useMemo(
    () => ({
      defaultDate: new Date(),
    }),
    []
  );

  const formattedEvents = formatEventsForCalendar(events, type);

  const eventStyleGetter = (event) => {
    const backgroundColor = LEAVE_STATUS_COLOR(event);
    return {
      style: {
        backgroundColor: `${theme.palette[backgroundColor].main}`,
        fontSize: fontSize,
      },
    };
  };

  const handleEventClick = (request, e) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedRequest(null);
    setIsModalOpen(false);
  };

  const colorButton = theme.palette.mode === "dark" ? "white" : "black";
  const labelFontSize = "25px";
  const bgOffrange = theme.palette.mode === "dark" ? "#424247" : "#e6e6e6";
  const bgToday = theme.palette.mode === "dark" ? "#b39dd4" : "#e8e1f2";
  const colorShowmore = theme.palette.mode === "dark" ? "#e8e1f2" : "#5E35B1";

  const customButton = `
  .rbc-toolbar{
    font-size: ${labelFontSize}
  }
  .rbc-btn-group button {
    color: ${colorButton};
    margin: 10px
  }
  .rbc-header {
    padding: 0
  }
  .rbc-off-range-bg{
    background: ${bgOffrange}
  }
  .rbc-today{
    background: ${bgToday}
  }
  .rbc-show-more{
    background: transparent;
    color: ${colorShowmore}
  }
  .rbc-row-segment{
    padding: 4px
  }
`;
  return (
    <div style={{ height: height, minWidth: minWidth }}>
      <style>{customButton}</style>
      <Calendar
        defaultDate={defaultDate}
        events={formattedEvents}
        localizer={localizer}
        views={["month"]}
        popup
        eventPropGetter={eventStyleGetter}
        onSelectEvent={handleEventClick}
      />
      {selectedRequest && (
        <RequestCardModal
          request={selectedRequest}
          open={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

export default EventCalendar;
