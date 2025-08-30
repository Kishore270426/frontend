"use client";

import { useRouter } from "next/navigation"; // for App Router. Use 'next/router' if Pages Router

interface EventCardProps {
  id: string;
  title: string;
  description: string;
  venue: string;
  date: string;
  time: string;
  onEdit: () => void;
  onDelete: () => void;
}

const EventCard: React.FC<EventCardProps> = ({
  id,
  title,
  description,
  venue,
  date,
  time,
  onEdit,
  onDelete,
}) => {
  const router = useRouter();

  const handleView = () => {
    router.push(`/event/${id}/`);

  };

  return (
    <div className="card">
      <h2>{title}</h2>
      
      <div className="card-buttons">
        <button className="btn view-btn" onClick={handleView}>
          View
        </button>
        <button className="btn edit-btn" onClick={onEdit}>
          Edit
        </button>
        <button className="btn delete-btn" onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default EventCard;
