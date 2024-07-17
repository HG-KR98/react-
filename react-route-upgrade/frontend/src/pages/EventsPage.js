import { Link } from "react-router-dom";

function EventsPage() {
  const events = [
    {
      id: "event-1",
      title: "first-event",
    },
    { id: "event-2", title: "second-event" },
    { id: "event-3", title: "third-event" },
  ];

  return (
    <>
      <h1>EventPage</h1>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <Link to={event.id}>{event.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default EventsPage;
