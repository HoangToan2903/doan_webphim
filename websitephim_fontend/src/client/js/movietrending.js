import React, { useRef, useEffect, useState } from "react";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import PlayCircleRoundedIcon from '@mui/icons-material/PlayCircleRounded';
import Grid from '@mui/material/Grid';
import '../css/navbar.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import slugify from "./utils/slugify";

function MovieTrending() {
    const carouselRef = useRef(null);
    const navigate = useNavigate();

    const willLeftLessThan40pxToScrollEnd = (nextStep) => {
        if (!carouselRef.current) return false;
        const scrollLeftAfterTwoClicks = carouselRef.current.scrollLeft + nextStep * 2;
        return scrollLeftAfterTwoClicks > carouselRef.current.scrollWidth - 40;
    };

    const willLeftLessThan40pxToScrollStart = (nextStep) => {
        if (!carouselRef.current) return false;
        const scrollLeftAfterOneClick = carouselRef.current.scrollLeft - nextStep;
        return scrollLeftAfterOneClick < 40;
    };

    const handleClickGoAhead = () => {
        if (!carouselRef.current) return;
        let nextStep = carouselRef.current.offsetWidth;
        if (willLeftLessThan40pxToScrollEnd(nextStep)) nextStep *= 2;

        carouselRef.current.scroll({
            left: carouselRef.current.scrollLeft + nextStep,
            behavior: "smooth",
        });
    };

    const handleClickGoBack = () => {
        if (!carouselRef.current) return;
        let nextStep = carouselRef.current.offsetWidth;
        if (willLeftLessThan40pxToScrollStart(nextStep)) nextStep *= 2;

        carouselRef.current.scroll({
            left: carouselRef.current.scrollLeft - nextStep,
            behavior: "smooth",
        });
    };
    const [moviestop, setMovieTop] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/website/topphim')
            .then(response => {
                const limitedData = response.data.slice(0, 15); // Lấy 15 phần tử đầu tiên
                setMovieTop(limitedData);
            })
            .catch(error => console.error(error));
    }, []);
    return (
        <div className="content">
            <div id="wrapper">
                <div id="carousel" ref={carouselRef}>
                    {Array.isArray(moviestop) &&
                        moviestop.map((movietop, index) => (
                            <div className="container_card" onClick={() => {
                                // Lưu id vào localStorage
                                localStorage.setItem('movieId', movietop.id);
                                // Điều hướng đến trang chi tiết phim
                                navigate(`/film/${slugify(movietop.name)}`);
                            }} key={index}>
                                <div className="img-container">
                                    <span className="vietsub">{movietop.episodes} Tập Vietsub</span>
                                    <span className="trending">Trending</span>

                                    <img
                                        src={`data:image/jpeg;base64,${movietop.image}`}
                                        alt={movietop.name}
                                        style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px" }}
                                    />
                                </div>
                                <ul className="social-media">
                                    <li>
                                        <a href=""><PlayCircleRoundedIcon sx={{ color: "#ffffff", width: 50, height: 50 }} />
                                        </a>
                                    </li>
                                </ul>
                                <div className="user-info">
                                    <h4>{movietop.name}</h4>
                                    <span>Năm phát hành: {movietop.namphathanh}</span>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
            <div className="buttons">
                <button onClick={handleClickGoBack} >
                    <ArrowBackIosNewRoundedIcon />
                </button>
                <button onClick={handleClickGoAhead}>
                    <ArrowForwardIosRoundedIcon />
                </button>
            </div>
        </div>
    )
}
export default MovieTrending;
