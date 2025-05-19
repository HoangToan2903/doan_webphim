import React, { useRef, useEffect, useState } from "react";
import StarTwoToneIcon from '@mui/icons-material/StarTwoTone';
import '../css/navbar.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import slugify from "./utils/slugify";

function ListTrending() {
  const [moviesMovieRating, setMovieRating] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
      axios.get('http://localhost:8080/website/listMovieRating')
        .then(response => {
          const limitedData = response.data.slice(0, 15); // Lấy 15 phần tử đầu tiên
          setMovieRating(limitedData);
        })
        .catch(error => console.error(error));
    }, []);
  return (
    <div className="movieTrending" >
      <p>Bảng xếp hạng</p>
      - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      {Array.isArray(moviesMovieRating) &&
        moviesMovieRating.map((movieMovieRating, index) => (
          <div className="movieTrending_grid" onClick={() => {
            // Lưu id vào localStorage
            localStorage.setItem('movieId', movieMovieRating.id);
            // Điều hướng đến trang chi tiết phim
            navigate(`/film/${slugify(movieMovieRating.name)}`);
          }} key={index} >
            <div className="box"><img
              src={`data:image/jpeg;base64,${movieMovieRating.image}`}
              alt={movieMovieRating.name}
              style={{ width: "50px", height: "70px", objectFit: "cover", borderRadius: "8px" }}
            /></div>
            <div className="box">
              <span>{movieMovieRating.name}</span> <br></br>
              <b>{movieMovieRating.namphathanh}</b><br></br>
              <b>{movieMovieRating.rating} <StarTwoToneIcon sx={{ color: "gold" }} /></b>
            </div>
          </div>
        ))}
    </div>
  );
}

export default ListTrending;