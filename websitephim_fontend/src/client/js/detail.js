import React, { useRef, useEffect, useState } from "react";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import PlayCircleRoundedIcon from '@mui/icons-material/PlayCircleRounded';
import Grid from '@mui/material/Grid';
import '../css/navbar.css';
import axios from 'axios';
import NavBar from './navbar';
import Footer from './footer';
import ListTrending from './listtrending';
import { useParams, useLocation } from "react-router-dom";
import StarTwoToneIcon from '@mui/icons-material/StarTwoTone';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import slugify from "./utils/slugify";
import MovieTrending from './movietrending';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 650,
    height: 450,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
function Detail() {
    const navigate = useNavigate();

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);



    const [id, setId] = useState(null);
    // console.log(localStorage.getItem('movieId'));

    useEffect(() => {
        const storedId = localStorage.getItem('movieId');
        console.log("ID lấy từ localStorage khi trang mới được load:", storedId);
        if (storedId) {
            setId(storedId);  // Cập nhật state id nếu có
        }
    },  [window.location.pathname]); // Kiểm tra một lần khi component mount



    const [movie, setMovie] = useState(null);
    const [episodes, setEpisodes] = useState([]);
    const currentEpisodeIndex = 0;

    useEffect(() => {
        if (!id) return;

        axios
            .get(`http://localhost:8080/website/movie/${id}`)
            .then((res) => setMovie(res.data))
            .catch((err) => console.error(err));
    }, [id]);

    useEffect(() => {
        if (!id) return;
        axios
            .get(`http://localhost:8080/website/movieALLEpisodes/${id}`)
            .then((res) => setEpisodes(res.data))
            .catch((err) => console.error(err));
    }, [id]);

    if (!movie) return <div>Loading...</div>;

    const handleClick = () => {

        let slug;
        if (movie.style.name === 'Phim lẻ' || movie.style.name === 'Phim chiếu rạp') {
            const episodeSlug = (String(movie.episodes) === '1') ? 'tap-full' : slugify(movie.episodes);

            // Tạo URL từ movie.name và episodeSlug với dấu "/"
            slug = `${slugify(movie.name)}/${episodeSlug}`; // Sử dụng "/" để phân tách
        } else {

            const episodeName = episodes.length > 0 ? episodes[currentEpisodeIndex]?.name : '';
            const episodeSlug = episodeName ? `tap-so-${episodeName}` : '';
            // Tạo URL từ movie.name và episodeSlug với dấu "/"
            slug = movie?.name ? `${slugify(movie.name)}/${episodeSlug}` : '';
        }
        // Kiểm tra nếu episodes là "1" thì thay thế thành "tap-full"

        // Điều hướng đến trang Video, truyền state gồm id của phim
        localStorage.setItem('movieId', movie.id);
        navigate(`/film/${slug}`);
    };


    return (

        <div>
            <NavBar />
            <br></br>


            <div className="content">
                <div className="link">
                    <HomeIcon color="primary" sx={{ color: "#8B4513", fontSize: 25 }} />
                    {/* {movie.style.name === 'Phim lẻ' && (
                        <> */}
                    <Link to="/home" className="xemphim">Xem phim</Link>  / <a onClick={() => {
                        // Lưu id vào localStorage
                        localStorage.setItem('styleId', movie.style.id);
                        // Điều hướng đến trang chi tiết phim
                        navigate(`/danh-sach/${slugify(movie.style.name)}`);
                    }}>{movie.style.name}</a> / {movie.name}
                            {/* </>
                    )} */}
                    {/* {movie.style.name === 'Phim bộ' && (
                        <>
                            <Link to="/home" className="xemphim">Xem phim</Link> / <a onClick={() =>
                                navigate(`/danh-sach/${slugify(movie.style.name)}`, {
                                    state: { id: movie.style.id },
                                })
                            }>{movie.style.name}</a> / {movie.name} </>
                    )}
                    {movie.style.name === 'Phim chiếu rạp' && (
                        <>
                            <Link to="/home" className="xemphim">Xem phim</Link> / <a onClick={() =>
                                navigate(`/danh-sach/${slugify(movie.style.name)}`, {
                                    state: { id: movie.style.id },
                                })
                            }>{movie.style.name}</a> / {movie.name} </>
                    )} */}
                </div>
                <div className="grid">
                    <div className="grid__item grid__item_item4">
                        <Grid container rowSpacing={0} columnSpacing={{ xs: 1, sm: 2, md: 0 }}>
                            <Grid size={6}>
                                <div
                                    className="card"
                                    onClick={handleClick}
                                    style={{ width: '300px', height: '400px' }}
                                >
                                    <a href="">
                                        <div className="img1">
                                            <img
                                                src={`data:image/jpeg;base64,${movie.image}`}
                                                alt={movie.name}
                                                style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px" }}
                                            />
                                        </div>

                                        <div className="icon_video_detail">
                                            <PlayCircleRoundedIcon sx={{ width: 90, height: 90 }} />
                                        </div>
                                    </a>
                                </div>

                                <button onClick={handleOpen} className="button_trailer" >Trailer</button>
                            </Grid>
                            <Grid size={6}>
                                <div className="card_infor">
                                    <h2>{movie.name}</h2>
                                    <hr style={{ width: "520px" }}></hr>
                                    <br></br>
                                    <div>
                                        <span className="line-break">Trạng thái : Full Vietsub</span>
                                        <span className="line-break">Thời lượng : {movie.duration} phút</span>
                                        <span className="line-break">Số tập : {movie.episodes} tập</span>
                                        <span className="line-break">
                                            Tình trạng: {
                                                movie.status === 0 ? "Đang chiếu" : "Hoàn thành"
                                            }
                                        </span>
                                        <span className="line-break">Ngôn ngữ : Vietsub</span>
                                        <span className="line-break">Năm sản xuất : {movie.namphathanh}</span>
                                        <span className="line-break">Quốc gia : {movie.nation.name}</span>
                                        <span className="line-break">Đạo diễn : {movie.directors}</span>
                                        <span className="line-break">Diễn viên: {movie.cast}</span>
                                        <span className="line-break">
                                            Thể loại: {movie.types.map(type => type.name).join(", ")}
                                        </span>
                                        <span className="line-break">Đánh giá : {movie.rating} <StarTwoToneIcon sx={{ color: "gold" }} /></span>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                        <br></br>
                        <div className="infor_flim">
                            <h1>Nội dung phim</h1>
                            <hr></hr>
                            <br></br>
                            {movie.description}
                        </div>
                        <br></br>

                        <div className="comment__container">
                            <b className="comment__title">0 comment</b>
                            <hr></hr>
                            <br></br>
                            <div className="comment__body">
                                <img src="https://img.ophim.live/uploads/movies/yeu-la-mu-quang-brazil-phan-3-thumb.jpg"
                                    style={{ width: "50px", height: "50px" }}
                                    className="comment__avatar" alt="avatar" />
                                <div>
                                    <textarea className="comment__textarea" placeholder="Bình luận ..." rows="8"></textarea>
                                    <div className="comment__post">
                                        <div className="comment__info"></div>
                                        <div>
                                            <button className="comment__send">Post Comment</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <br></br>
                        <p>Phim đề cử</p>
                        <br></br>
                        <MovieTrending />

                    </div>
                    <div className="grid__item grid__item_item5">
                        <ListTrending />
                    </div>
                </div>
            </div>
            <Footer />
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"

            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Trailer
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <iframe
                            src={movie.trailer}
                            title="YouTube video player" frameBorder="0"
                            width="100%"
                            height="350px"
                            allow="accelerometer; autoplay; clipboard-write;
                          encrypted-media; gyroscope; picture-in-picture; 
                          web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                    </Typography>
                </Box>
            </Modal>
        </div>


    );
}

export default Detail;
