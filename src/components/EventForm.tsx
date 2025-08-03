import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Box } from "@mui/material";
import { Event } from "../types/event";

interface Props {
  onSubmit: (data: Event) => void;
  initialData?: Event | null;
}

const EventForm: React.FC<Props> = ({ onSubmit, initialData }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Event>({
    defaultValues: initialData || {
      title: "",
      description: "",
      venue: "",
      date: "",
      id: "",
    },
  });

  useEffect(() => {
    reset(
      initialData || {
        title: "",
        description: "",
        venue: "",
        date: "",
        id: "",
      }
    );
  }, [initialData, reset]);

  const onFormSubmit = (data: Event) => {
    // Add id if missing (new event)
    const eventData = {
      ...data,
      id: data.id || crypto.randomUUID(),
    };
    onSubmit(eventData);
    console.log("Form submitted, new event:", eventData);

    reset(); // Clear form after submit
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onFormSubmit)}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <TextField
        label="Title"
        {...register("title", { required: "Title is required" })}
        error={!!errors.title}
        helperText={errors.title?.message}
        fullWidth
      />

      <TextField
        label="Description"
        multiline
        {...register("description", { required: "Description is required" })}
        error={!!errors.description}
        helperText={errors.description?.message}
        fullWidth
        maxRows={10} // Optional: limit how tall it can grow
      />

      <TextField
        label="Venue"
        {...register("venue", { required: "Venue is required" })}
        error={!!errors.venue}
        helperText={errors.venue?.message}
        fullWidth
      />

      <TextField
        label="Date"
        type="date"
        InputLabelProps={{ shrink: true }}
        {...register("date", { required: "Date is required" })}
        error={!!errors.date}
        helperText={errors.date?.message}
        fullWidth
      />

      <Button type="submit" variant="contained" sx={{ mt: 1 }}>
        {initialData ? "Update Event" : "Add Event"}
      </Button>
    </Box>
  );
};

export default EventForm;
