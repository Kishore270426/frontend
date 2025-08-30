"use client";

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getEvents, deleteEvent } from "@/services/api";
import EventCard from "@/components/eventcard";
import EventForm from "@/components/eventform";


export default function Home() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editEvent, setEditEvent] = useState<any>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["events"],
    queryFn: getEvents,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteEvent(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["events"] });

  });

  if (isLoading) return <div className="loading">Loading events...</div>;
  if (isError) return <div className="error">Error loading events</div>;

  const filtered = Array.isArray(data)
    ? data.filter((e: any) => e.title.toLowerCase().includes(search.toLowerCase()))
    : [];

  return (
    <div className="container">
      {/* Header */}
      <div className="header">
        <h1>Event Management</h1>
        <button
          className="btn add-btn"
          onClick={() => {
            setEditEvent(null);
            setShowForm(true);
          }}
        >
          Add Event Detail
        </button>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search events..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search"
      />

      {/* Event Form Modal */}
      {showForm && <EventForm onClose={() => setShowForm(false)} eventData={editEvent} />}

      {/* Event List */}
      {filtered.length === 0 ? (
        <div className="no-events">No events found</div>
      ) : (
        <div className="event-grid">
          {filtered.map((event: any) => (
            <EventCard
              key={event.id}
              {...event}
              onEdit={() => {
                setEditEvent(event);
                setShowForm(true);
              }}
              onDelete={() => deleteMutation.mutate(event.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
