"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import "./eventdetails.css";

interface Event {
  id: string;
  title: string;
  description: string;
  venue: string;
  date: string;
  time: string;
}

const EventDetailsPage = () => {
  const { id } = useParams();
  const router = useRouter();

  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/events/${id}/`);
        setEvent(res.data);
      } catch (err) {
        setError("Failed to fetch event details");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);


  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!event) return <p className="no-event">No event found.</p>;

  return (
    <div className="event-details-container">
      <h1>{event.title}</h1>
      <p>{event.description}</p>

      <div className="event-meta">
        <p>
          <span>Venue:</span> {event.venue}
        </p>
        <p>
          <span>Date & Time:</span> {event.date} at {event.time}
        </p>
      </div>

      <div className="event-buttons">

        <button className="back-btn" onClick={() => router.push("/")}>Back to Events</button>
      </div>
    </div>
  );
};

export default EventDetailsPage;
