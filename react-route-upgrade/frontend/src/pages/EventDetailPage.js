import { useParams, Link } from "react-router-dom";

function EventDetailPage() {
  const params = useParams();
  return (
    <>
      <h1>{params.someId}</h1>
      <Link to=".." relative="path">
        Back
      </Link>
    </>
  );
}

export default EventDetailPage;
