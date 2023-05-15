import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import tourService from "../services/tours.services";

function EditTourPage(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();
  const { tourId } = useParams();

  useEffect(() => {
    // axios
    //   .get(
    //     `${API_URL}/api/tours/${tourId}`,
    //     { headers: { Authorization: `Bearer ${storedToken}` } }
    //   )

    tourService
      .getTours(tourId)
      .then((response) => {
        const oneTour = response.data;
        setTitle(oneTour.title);
        setDescription(oneTour.description);
      })
      .catch((error) => console.log(error));
  }, [tourId]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const requestBody = { title, description };

    // axios
    //   .put(
    //     `${API_URL}/api/tours/${tourId}`,
    //     requestBody,
    //     { headers: { Authorization: `Bearer ${storedToken}` } }
    //   )

    tourService.updateTours(tourId, requestBody).then((response) => {
      navigate(`/tours/${tourId}`);
    });
  };

  const deleteTour = () => {
    // axios
    //   .delete(
    //     `${API_URL}/api/tours/${tourId}`,
    //     { headers: { Authorization: `Bearer ${storedToken}` } }
    //   )
    tourService
      .deleteTour(tourId)
      .then(() => navigate("/tours"))
      .catch((err) => console.log(err));
  };

  return (
    <div className="EditTourPage">
      <h3>Edit the Project</h3>

      <form onSubmit={handleFormSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Description:</label>
        <textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">Update Project</button>
      </form>

      <button onClick={deleteTour}>Delete Project</button>
    </div>
  );
}

export default EditTourPage;
