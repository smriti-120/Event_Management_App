import React, { useEffect, useState } from "react";
import EventForm from "./components/EventForm";
import EventList from "./components/EventList";
import { Event } from "./types/event";
import { isConflict } from "./utils/validation";
import { Container, Typography, Alert } from "@mui/material";

const App = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [editEvent, setEditEvent] = useState<Event | null>(null);
  const [error, setError] = useState<string>("");
  const [loaded, setLoaded] = useState(false); // Tracks if initial load is done

  // Step 1: Load from localStorage once
  useEffect(() => {
    const saved = localStorage.getItem("events");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setEvents(parsed);
        console.log("✅ Loaded from localStorage:", parsed);
      } catch (e) {
        console.error("❌ Failed to parse saved events:", e);
      }
    }
    setLoaded(true); // Finished loading
  }, []);

  // Step 2: Save to localStorage only after loading
  useEffect(() => {
    if (loaded) {
      localStorage.setItem("events", JSON.stringify(events));
      console.log("💾 Saved to localStorage:", events);
    }
  }, [events, loaded]);

  // Step 3: Add or update event
  const handleAddOrUpdate = (newEvent: Event) => {
    if (isConflict(events, newEvent, editEvent?.id)) {
      setError("Date and Venue combination already exists!");
      return;
    }
    setError("");

    if (editEvent) {
      // Update existing event
      setEvents((prev) =>
        prev.map((e) => (e.id === newEvent.id ? newEvent : e))
      );
    } else {
      // Add new event
      setEvents((prev) => [...prev, newEvent]);
    }

    setEditEvent(null);
  };

  // Step 4: Delete event
  const handleDelete = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Event Management App
      </Typography>

      {error && (
        <Alert severity="error" onClose={() => setError("")} sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <EventForm onSubmit={handleAddOrUpdate} initialData={editEvent} />

      <Typography variant="h5" mt={4} mb={2}>
        Events
      </Typography>

      <EventList
        events={events}
        onEdit={setEditEvent}
        onDelete={handleDelete}
      />
    </Container>
  );
};

export default App;
