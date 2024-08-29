import React, { useContext, useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { MyContext } from "./ContextProvider";
import axios from "axios";

function AddStar() {
  const { id } = useParams();
  const { movies, stars, setMovies } = useContext(MyContext);
  const [updateMov, setUpdateMov] = useState({});
  const [checkedBox, setCheckedBox] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getMovie = movies.find((mov) => mov.id == id);
    if (getMovie) {
      setUpdateMov(getMovie);
      setCheckedBox(getMovie?.stars);
    }
  }, [id, movies]);
  // console.log(updateMov);

  console.log(checkedBox);

  const handleOnchange = (e) => {
    const parseValue = parseInt(e.target.value);
    setCheckedBox((prev) => {
      if (prev.includes(parseValue)) {
        return checkedBox.filter((check) => check != parseValue);
      } else {
        return [...checkedBox, parseValue];
      }
    });
  };
  const SubmitAddStar = async (e) => {
    e.preventDefault();
    const updateStar = { ...updateMov, stars: checkedBox };
    try {
      const responData = await axios.put(
        `http://localhost:9999/movies/${id}`,
        updateStar
      );
      console.log(responData.data);
      
      alert("Add success");
      setMovies(movies.map((mov) => (mov.id != id ? mov : responData.data)));
    } catch (error) {
      console.log(error);
    }
    navigate("/movie");
  };
  return (
    <Container>
      <h1 style={{ textAlign: "center" }}>Add stars to the movie</h1>
      <div>
        <Form onSubmit={SubmitAddStar}>
          <Form.Group>
            <Form.Label>
              <b>Movie title</b>
            </Form.Label>
            <Form.Control disabled value={updateMov.title} />
          </Form.Group>
          <Form.Group>
            <Form.Label>
              <b>Stars</b>
            </Form.Label>
            <div style={{ display: "flex" }}>
              {stars.map((item) => (
                <Form.Check
                  onChange={handleOnchange}
                  value={item.id}
                  style={{ marginRight: "20px" }}
                  checked={checkedBox?.includes(item.id)}
                  type="checkbox"
                  label={item?.fullname}
                />
              ))}
            </div>
          </Form.Group>
          <button className="btn btn-success">Add Stars</button>
        </Form>
      </div>
    </Container>
  );
}

export default AddStar;
