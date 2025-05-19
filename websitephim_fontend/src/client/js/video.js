import { Link } from "react-router-dom";
import NavBar from './navbar';
import HomeIcon from '@mui/icons-material/Home';
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Footer from './footer';
import ListTrending from './listtrending';
import MovieTrending from './movietrending';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import slugify from "./utils/slugify";


function Video() {

    const [id, setId] = useState(null);
    // console.log(localStorage.getItem('movieId'));

    useEffect(() => {
        const storedId = localStorage.getItem('movieId');
        console.log("ID lấy từ localStorage khi trang mới được load:", storedId);
        if (storedId) {
            setId(storedId);  // Cập nhật state id nếu có
        }
    }, []);

    const [movie, setMovie] = useState(null);
    const [episodes, setEpisodes] = useState([]);
    const [selectedEpisodeUrl, setSelectedEpisodeUrl] = useState('');
    const [selectedEpisodeIndex, setSelectedEpisodeIndex] = useState(0);
    const [episodeName, setEpisodeName] = useState('');
    const navigate = useNavigate();
    const { movieName } = useParams();
    // const currentEpisodeIndex = 0;

    useEffect(() => {
        if (!movie?.id) return;
        console.log(movie.id)

        // Chỉ cập nhật view nếu là "Phim lẻ" hoặc "Phim chiếu rạp"
        if (movie.style.name === 'Phim lẻ' || movie.style.name === 'Phim chiếu rạp') {
            const timer = setTimeout(() => {
                axios.put(`http://localhost:8080/website/movie/view/${movie.id}`, {
                    title: movie.title,
                })
                    .then(res => console.log("Đã cập nhật view"))
                    .catch(err => console.error("Lỗi cập nhật view:", err));
            }, 60000);

            return () => clearTimeout(timer);
        }
    }, [movie?.id, movie?.title, movie?.style?.name]); // nhớ thêm movie.style.name vào dependency

    useEffect(() => {
        if (!episodes?.id) return;
        console.log(episodes.id)
        if (movie.style.name === 'Phim bộ') {

            const timer = setTimeout(() => {
                axios.put(`http://localhost:8080/website/episodes/view/${episodes.id}`, {
                    title: episodes.title,
                })
                    .then(res => console.log("Đã cập nhật view"))
                    .catch(err => console.error("Lỗi cập nhật view:", err));
            }, 60000);

            return () => clearTimeout(timer);
        }
    }, [episodes?.id, episodes?.title, episodes?.style?.name]); // nhớ thêm movie.style.name vào dependency

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
            .get(`http://localhost:8080/website/episodesALLByIdMovie/${id}`)
            .then((res) => setEpisodes(res.data))
            .catch((err) => console.error(err));
    }, [id]);

    useEffect(() => {
        if (Array.isArray(episodes) && episodes.length > 0) {
            setSelectedEpisodeUrl(episodes[0].link); // hoặc .url tuỳ bạn đặt tên
        }
    }, [episodes]);
    useEffect(() => {
        if (Array.isArray(episodes) && episodes.length > 0) {
            setEpisodeName(episodes[0].name);
        }
    }, [episodes]);
    // const episodeName = episodes.length > 0
    //     ? episodes.reduce((min, ep) => ep.name < min ? ep.name : min, episodes[0].name)
    //     : '';
    // console.log(episodeName)
    if (!movie) return <div>Loading...</div>;

    const handleSelectEpisode = (episode, index) => {
        setSelectedEpisodeUrl(episode.link);
        setEpisodeName(episode.name);
        setSelectedEpisodeIndex(index);

        // Chuyển hướng URL
        const newEpisodeSlug = `tap-so-${index + 1}`;
        navigate(`/film/${movieName}/${newEpisodeSlug}`);
    };


    return (

        <div>
            <NavBar />
            <br></br>



            <div className="content">
                <div className="link">
                    <HomeIcon sx={{ color: "#8B4513", fontSize: 25 }} />
                    {movie.style.name === 'Phim lẻ' && (
                        <>
                            <Link to="/home" className="xemphim">Xem phim</Link> / <a onClick={() => {
                                // Lưu id vào localStorage
                                localStorage.setItem('styleId', movie.style.id);
                                // Điều hướng đến trang chi tiết phim
                                navigate(`/danh-sach/${slugify(movie.style.name)}`);
                            }}>{movie.style.name}</a> / {movie.episodes === 1 ? 'Tập Full' : `${movie.episodes}`}                       </>
                    )}
                    {movie.style.name === 'Phim bộ' && (
                        <>
                            <Link to="/home" className="xemphim">Xem phim</Link> / <a onClick={() => {
                                // Lưu id vào localStorage
                                localStorage.setItem('styleId', movie.style.id);
                                // Điều hướng đến trang chi tiết phim
                                navigate(`/danh-sach/${slugify(movie.style.name)}`);
                            }}>{movie.style.name}</a> / {`Tập ${episodeName}`}                       </>
                    )}
                    {movie.style.name === 'Phim chiếu rạp' && (
                        <>
                            <Link to="/home" className="xemphim">Xem phim</Link> / <a onClick={() => {
                                // Lưu id vào localStorage
                                localStorage.setItem('styleId', movie.style.id);
                                // Điều hướng đến trang chi tiết phim
                                navigate(`/danh-sach/${slugify(movie.style.name)}`);
                            }}>{movie.style.name}</a> / {movie.episodes === 1 ? 'Tập Full' : `${movie.episodes}`}                       </>
                    )}
                    {/* {(movie.style.name === 'Phim lẻ' || movie.style.name === 'Phim chiếu rạp') && (
                        <>
                            <Link to="/home" className="xemphim">Xem phim</Link> / {movie.style.name} / {movie.name} / {movie.episodes === 1 ? 'Tập Full' : `${movie.episodes}`}
                        </>
                    )}
                    {movie.style.name === 'Phim bộ' && (
                        <>
                            <Link to="/home" className="xemphim">Xem phim</Link> / {movie.style.name} / {movie.name} / {`Tập ${episodeName}`}
                        </>
                    )} */}
                </div>
                <div className="grid">
                    <div className="grid__item grid__item_item4">
                        {(movie.style.name === 'Phim lẻ' || movie.style.name === 'Phim chiếu rạp') && movie.link && (
                            <iframe
                                src={movie.link}
                                width="100%"
                                height="500"
                                allowFullScreen
                                className="blur-filter rounded-xl shadow"
                                title="Trình phát video"
                            />
                        )}
                        {movie.style.name === 'Phim bộ' && selectedEpisodeUrl && (
                            <iframe
                                width="100%"
                                height="500"
                                allowFullScreen
                                className="blur-filter rounded-xl shadow"
                                title="Trình phát video"
                                src={selectedEpisodeUrl}
                            />
                        )}
                        <br></br>
                        <br></br>
                        <div className="link"><OndemandVideoIcon sx={{ color: "#8B4513", fontSize: 25 }} /> #(Vietsub)</div>

                        <div>
                            {(movie.style.name === 'Phim lẻ' || movie.style.name === 'Phim chiếu rạp') && (
                                <>
                                    <button className="button_full">Full</button>
                                </>
                            )}
                            {movie.style.name === 'Phim bộ' && (
                                <>
                                    {episodes.map((episode, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleSelectEpisode(episode, index)}
                                            className={`button_episodes ${index === selectedEpisodeIndex ? 'active-episode' : ''
                                                }`}
                                        >
                                            {episode.name}
                                        </button>
                                    ))}

                                </>
                            )}
                        </div>




                        <br></br>
                        <div className="infor_flim">
                            <h1>{movie.name}</h1>
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

        </div>
    );
}

export default Video;