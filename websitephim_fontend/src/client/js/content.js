import React, { useRef, useEffect, useState } from "react";
import PlayCircleRoundedIcon from '@mui/icons-material/PlayCircleRounded';
import Grid from '@mui/material/Grid';
import '../css/navbar.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import ListTrending from './listtrending';
import slugify from "./utils/slugify";
import MovieTrending from './movietrending';


function Content() {
    const navigate = useNavigate();

// fgdfgdfx


    const [moviesle, setMovieLe] = useState([]);
    const [moviesbo, setMovieBo] = useState([]);
    const [moviesChieuRap, setMovieChieuRap] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/website/movieLe')
            .then(response => {
                // Chỉ lấy 12 dữ liệu mới nhất
                setMovieLe(response.data.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate)).slice(0, 12));

            })
            .catch(error => console.error(error));
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8080/website/movieBo')
            .then(response => {
                // Chỉ lấy 12 dữ liệu mới nhất
                setMovieBo(response.data.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate)).slice(0, 12));

            })
            .catch(error => console.error(error));
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8080/website/movieChieuRap')
            .then(response => {
                // Chỉ lấy 12 dữ liệu mới nhất
                setMovieChieuRap(response.data.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate)).slice(0, 12));

            })
            .catch(error => console.error(error));
    }, []);


    return (

        <div className="content">

            <br></br>
            <p>Phim đề cử</p>
            <br></br>

            <MovieTrending />

            <div className="grid">
                <div className="grid__item grid__item_item4">
                    {/*  */}
                    <p>Phim lẻ mới nhất</p>
                    <br></br>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        {Array.isArray(moviesle) &&
                            moviesle.map((moviele, index) => (
                                <Grid item xs={3} key={index}>
                                    <div
                                        className="card"
                                        onClick={() => {
                                            // Lưu id vào localStorage
                                            localStorage.setItem('movieId', moviele.id);
                                            // Điều hướng đến trang chi tiết phim
                                            navigate(`/film/${slugify(moviele.name)}`);
                                        }}
                                    >
                                        <div className="img1">
                                            <img
                                                src={`data:image/jpeg;base64,${moviele.image}`}
                                                alt={moviele.name}
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    objectFit: "cover",
                                                    borderRadius: "8px",
                                                }}
                                            />
                                        </div>

                                        <div className="title">{moviele.name}</div>
                                        <div className="text">Full Vietsub</div>
                                        <div className="catagory">Phát hành năm: {moviele.namphathanh}</div>
                                        <div className="icon_video">
                                            <PlayCircleRoundedIcon sx={{ width: 60, height: 60 }} />
                                        </div>
                                        <div className="views">{moviele.duration} phút</div>
                                    </div>


                                </Grid>
                            ))}
                    </Grid>

                    <br></br>
                    <hr></hr>
                    <br></br>
                    <p>Phim bộ mới nhất</p>
                    <br></br>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        {Array.isArray(moviesbo) &&
                            moviesbo.map((moviebo, index) => (
                                <Grid item xs={3} key={index}>
                                    <div className="card" onClick={() => {
                                        // Lưu id vào localStorage
                                        localStorage.setItem('movieId', moviebo.id);
                                        // Điều hướng đến trang chi tiết phim
                                        navigate(`/film/${slugify(moviebo.name)}`);
                                    }}>
                                        <a href="">
                                            <div className="img1">
                                                <img
                                                    src={`data:image/jpeg;base64,${moviebo.image}`}
                                                    alt={moviebo.name}
                                                    style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px" }}
                                                />
                                            </div>
                                            <div className="title">{moviebo.name}</div>
                                            <div className="text">{moviebo.episodes} Tập Vietsub</div>
                                            <div className="catagory">Phát hành năm: {moviebo.namphathanh} </div>
                                            <div className="icon_video">
                                                <PlayCircleRoundedIcon sx={{ width: 60, height: 60 }} />
                                            </div>
                                        </a>
                                    </div>
                                </Grid>
                            ))}
                    </Grid>
                    <br></br>
                    <hr></hr>
                    <br></br>
                    <p>Phim chiếu rạp </p>
                    <br></br>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        {Array.isArray(moviesChieuRap) &&
                            moviesChieuRap.map((movieChieuRap, index) => (
                                <Grid item xs={3} key={index}>
                                    <div className="card" onClick={() => {
                                        // Lưu id vào localStorage
                                        localStorage.setItem('movieId', movieChieuRap.id);
                                        // Điều hướng đến trang chi tiết phim
                                        navigate(`/film/${slugify(movieChieuRap.name)}`);
                                    }}>
                                        <a href="">
                                            <div className="img1">
                                                <img
                                                    src={`data:image/jpeg;base64,${movieChieuRap.image}`}
                                                    alt={movieChieuRap.name}
                                                    style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px" }}
                                                />                                                </div>
                                            <div className="title">{movieChieuRap.name}</div>
                                            <div className="text">Full Vietsub</div>
                                            <div className="catagory">Phát hành năm: {movieChieuRap.namphathanh} </div>
                                            <div className="icon_video"><PlayCircleRoundedIcon sx={{ width: 60, height: 60 }} /></div>
                                            <div className="views">{movieChieuRap.duration} phút   </div>
                                        </a>
                                    </div>
                                </Grid>
                            ))}
                    </Grid>
                </div>
                <div className="grid__item grid__item_item5">   <ListTrending /></div>
            </div>
        </div>

    );
}

export default Content;
