import React, { useEffect, useState } from "react";
import PlayCircleRoundedIcon from '@mui/icons-material/PlayCircleRounded';
import Grid from '@mui/material/Grid';
import '../css/navbar.css';
import axios from 'axios';
import { useNavigate, useLocation, Link } from "react-router-dom";
import ListTrending from './listtrending';
import slugify from "./utils/slugify";
import NavBar from './navbar';
import HomeIcon from '@mui/icons-material/Home';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

function PhimListStyle() {
  const navigate = useNavigate();

  const [id, setId] = useState(localStorage.getItem('styleId'));

  useEffect(() => {
    const storedId = localStorage.getItem('styleId');
    if (storedId !== id) {
      setId(storedId);
    }
  }, [window.location.pathname]);

  const [movies, setMovies] = useState([]);
  const [types, setTypes] = useState([]);
  const [nations, setNations] = useState([]);

  const [valueType, setValueType] = useState(null);
  const [inputValueType, setInputValueType] = useState('');
  const [valueNation, setValueNation] = useState(null);
  const [inputValueNation, setInputValueNation] = useState('');
  const [valueYear, setValueYear] = useState('');
  const [inputValueYear, setInputValueYear] = useState('');
  const [noMoviesFound, setNoMoviesFound] = useState(false); // State để kiểm tra có phim không

  const itemsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(1);

  // Load thể loại và quốc gia
  useEffect(() => {
    axios.get('http://localhost:8080/website/typeAll')
      .then(res => setTypes(res.data))
      .catch(err => console.error(err));

    axios.get('http://localhost:8080/website/nationAll')
      .then(res => setNations(res.data))
      .catch(err => console.error(err));
  }, []);


  useEffect(() => {
    if (id) {
      filterMovies(); // Gọi filterMovies khi có id
    }
  }, [id, valueNation, valueType, valueYear, currentPage]);
  // Lọc phim theo các lựa chọn

  const filterMovies = () => {
    axios.get('http://localhost:8080/website/filter', {
      params: {
        styleId: id,
        nationId: valueNation?.id,
        typeId: valueType?.id,
        namPhatHanh: valueYear || '',
      }
    })
      .then(res => {
        if (res.data && res.data.length > 0) {
          setMovies(res.data);
          setNoMoviesFound(false); // Nếu có phim, ẩn thông báo không có phim
        } else {
          setMovies([]); // Nếu không có phim, đặt mảng movies là rỗng
          setNoMoviesFound(true); // Hiển thị thông báo không có phim
        }
        // setCurrentPage(1);
      })
      .catch(err => {
        console.error("Lỗi khi lọc phim:", err);
        setMovies([]); // Nếu có lỗi, đặt mảng movies là rỗng
        setNoMoviesFound(true); // Hiển thị thông báo không có phim
      });
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentMovies = movies.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(movies.length / itemsPerPage);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1970 + 1 }, (_, i) => (1970 + i).toString());

  return (
    <div>
      <NavBar />
      <br />
      <div className="content">
        <div className="link">
          <HomeIcon sx={{ color: "#8B4513", fontSize: 25 }} />
          {movies.length > 0 && (
            <div>
              <Link to="/home" className="xemphim">Xem phim</Link> / {movies[0].style.name}
            </div>
          )}
        </div>

        <br />
        <div className="shearch">
          <div className="items">
            <div className="item">
              <Autocomplete
                options={types}
                getOptionLabel={(type) => type.name || ''}
                value={valueType}
                onChange={(e, newValue) => setValueType(newValue)}
                inputValue={inputValueType}
                onInputChange={(e, newInputValue) => setInputValueType(newInputValue)}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Thể loại"
                    InputProps={{
                      ...params.InputProps,
                      sx: {
                        color: '#e6e6e6',
                        backgroundColor: '#2a2a2a',
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: '#000' },
                      }
                    }}
                    InputLabelProps={{ sx: { color: '#e6e6e6' } }}
                  />
                )}
              />
            </div>

            <div className="item">
              <Autocomplete
                options={nations}
                getOptionLabel={(nation) => nation.name || ''}
                value={valueNation}
                onChange={(e, newValue) => setValueNation(newValue)}
                inputValue={inputValueNation}
                onInputChange={(e, newInputValue) => setInputValueNation(newInputValue)}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Quốc gia"
                    InputProps={{
                      ...params.InputProps,
                      sx: {
                        color: '#e6e6e6',
                        backgroundColor: '#2a2a2a',
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: '#000' },
                      }
                    }}
                    InputLabelProps={{ sx: { color: '#e6e6e6' } }}
                  />
                )}
              />
            </div>

            <div className="item">
              <Autocomplete
                options={years}
                value={valueYear}
                onChange={(e, newValue) => setValueYear(newValue)}
                inputValue={inputValueYear}
                onInputChange={(e, newInputValue) => setInputValueYear(newInputValue)}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Năm"
                    InputProps={{
                      ...params.InputProps,
                      sx: {
                        color: '#e6e6e6',
                        backgroundColor: '#2a2a2a',
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: '#000' },
                      }
                    }}
                    InputLabelProps={{ sx: { color: '#e6e6e6' } }}
                  />
                )}
              />
            </div>

            {/* <div className="item">
              <button className="button_shearch" onClick={filterMovies}>Lọc phim</button>
            </div> */}
          </div>
        </div>


        <div className="grid">
          {noMoviesFound ? (
            <div className="grid__item grid__item_item4 grid_text">Không có phim nào được tìm thấy.</div> // Hiển thị thông báo khi không có phim
          ) : (<div className="grid__item grid__item_item4">
            <Grid container spacing={2}>
              {currentMovies.map((movie, index) => (
                <Grid item xs={3} key={index}>
                  <div className="card" onClick={() => {
                    // Lưu id vào localStorage
                    localStorage.setItem('movieId', movie.id);
                    // Điều hướng đến trang chi tiết phim
                    navigate(`/film/${slugify(movie.name)}`);
                  }}>
                    <div className="img1">
                      <img
                        src={`data:image/jpeg;base64,${movie.image}`}
                        alt={movie.name}
                        style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px" }}
                      />
                    </div>
                    <div className="title">{movie.name}</div>
                    <div className="text">
                      {movie.style.name === 'Phim bộ' ? `${movie.episodes} Tập Vietsub` : 'Full Vietsub'}
                    </div>
                    <div className="catagory">Phát hành năm: {movie.namphathanh}</div>
                    <div className="icon_video">
                      <PlayCircleRoundedIcon sx={{ width: 60, height: 60 }} />
                    </div>
                    {movie.style.name !== 'Phim bộ' && (
                      <div className="views">{movie.duration} phút</div>
                    )}
                  </div>
                </Grid>
              ))}
            </Grid>

            {totalPages > 1 && (
              <div className="pagination">
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(page => page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1)
                  .reduce((acc, page, i, arr) => {
                    if (i > 0 && page - arr[i - 1] > 1) acc.push('...');
                    acc.push(page);
                    return acc;
                  }, [])
                  .map((item, index) =>
                    item === '...' ? (
                      <span key={`ellipsis-${index}`} className="ellipsis">...</span>
                    ) : (
                      <button
                        key={item}
                        onClick={() => setCurrentPage(item)}
                        className={item === currentPage ? 'active' : ''}
                      >
                        {item}
                      </button>
                    )
                  )}
              </div>
            )}
          </div>)}


          <div className="grid__item grid__item_item5">
            <ListTrending />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PhimListStyle;
