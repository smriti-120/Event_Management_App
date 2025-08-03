import React from "react";
import { Event } from "../types/event";
import { Button, Card, CardContent, Typography, Stack } from "@mui/material";
import dayjs from "dayjs";

interface Props {
  events: Event[];
  onEdit: (event: Event) => void;
  onDelete: (id: string) => void;
}

const EventList: React.FC<Props> = ({ events, onEdit, onDelete }) => {
  const today = dayjs();

  return (
    <Stack spacing={2}>
      {events.length === 0 && (
        <Typography variant="body1" color="text.secondary" align="center">
          No events available. Please add one.
        </Typography>
      )}
      {events.map((event) => {
        const isPast = dayjs(event.date).isBefore(today, "day");
        return (
          <Card
            key={event.id}
            sx={{
              backgroundColor: isPast ? "#f8d7da" : "#d4edda",
              borderLeft: isPast ? "5px solid #dc3545" : "5px solid #28a745",
            }}
          >
            <CardContent>
              <Typography variant="h6">{event.title}</Typography>
              <Typography color="text.secondary">
                Date: {dayjs(event.date).format("MMMM D, YYYY")}
              </Typography>
              <Typography>Venue: {event.venue}</Typography>
              <Typography sx={{ mt: 1 }}>{event.description}</Typography>
              <Stack direction="row" spacing={1} mt={2}>
                <Button
                  onClick={() => onEdit(event)}
                  variant="outlined"
                  size="small"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => onDelete(event.id)}
                  variant="contained"
                  color="error"
                  size="small"
                >
                  Delete
                </Button>
              </Stack>
            </CardContent>
          </Card>
        );
      })}
    </Stack>
  );
};

export default EventList;
