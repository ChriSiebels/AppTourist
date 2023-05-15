import { Link } from "react-router-dom";

// We are deconstructing props object directly in the parentheses of the function
function ToursCard({ title, description, _id }) {
  return (
    <div className="ToursCard card">
      <Link to={`/tours/${_id}`}>
        <h3>{title}</h3>
      </Link>
      <p style={{ maxWidth: "400px" }}>{description} </p>
    </div>
  );
}

export default ToursCard;
