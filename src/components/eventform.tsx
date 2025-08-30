"use client";

import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEvent, updateEvent } from "@/services/api";


interface EventFormProps {
  onClose: () => void;
  eventData?: any;
}

const EventForm: React.FC<EventFormProps> = ({ onClose, eventData }) => {
  const queryClient = useQueryClient();

  const [title, setTitle] = useState(eventData?.title || "");
  const [description, setDescription] = useState(eventData?.description || "");
  const [venue, setVenue] = useState(eventData?.venue || "");
  const [date, setDate] = useState(eventData?.date || "");
  const [time, setTime] = useState(eventData?.time || "");

  const isEdit = Boolean(eventData?.id);

  const mutation = useMutation({
    mutationFn: (data: any) =>
      isEdit ? updateEvent(eventData.id, data) : createEvent(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["events"]);
      onClose();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ title, description, venue, date, time });
  };

  return (
    <div className="modal">
      <form className="form" onSubmit={handleSubmit}>
        <h2>{isEdit ? "Edit Event" : "Add Event"}</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Venue"
          value={venue}
          onChange={(e) => setVenue(e.target.value)}
          required
        />
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />

        <div className="form-buttons">
          <button type="button" className="btn cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn submit-btn">
            {isEdit ? "Update" : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;
