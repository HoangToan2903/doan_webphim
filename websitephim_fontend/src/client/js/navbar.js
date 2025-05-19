import React, { useEffect, useState } from 'react';
import '../css/navbar.css';
import axios from 'axios'
import ArrowDropDownTwoToneIcon from '@mui/icons-material/ArrowDropDownTwoTone';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import slugify from "./utils/slugify";

function NavBar() {
  const navigate = useNavigate();
  const [types, setTypes] = useState([]);
  const [styles, setStyles] = useState([]);
  const [nations, setNations] = useState([]);
  const [movies, setMovie] = useState(null)
  const [refresh, setRefresh] = useState(false); // thêm dòng này nếu chưa có

  useEffect(() => {
    axios.get('http://localhost:8080/website/movieAll')
      .then(response => {
        setMovie(response.data);
      })
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    axios.get('http://localhost:8080/website/typeAll')
      .then(response => {
        setTypes(response.data);
      })
      .catch(error => console.error(error));
  }, []);
  useEffect(() => {
    axios.get('http://localhost:8080/website/styleAll')
      .then(response => {
        setStyles(response.data);
      })
      .catch(error => console.error(error));
  }, []);
  useEffect(() => {
    axios.get('http://localhost:8080/website/nationAll')
      .then(response => {
        setNations(response.data);
      })
      .catch(error => console.error(error));
  }, []);

  return (

    <header >
      <div className="header-one">
        <h1>PHIM CHILL</h1>
        <p>Phim online</p>
      </div>
      <div className="header">
        <Link to="/home" className="logo">Trang chủ</Link>
        <nav className="navigation">
          <ul>
            {Array.isArray(styles) &&
              styles.map((style, index) => (<li key={style.id || index}>
                <a

                  onClick={() => {
                    localStorage.setItem('styleId', style.id);
                    setRefresh(prev => !prev); // để trigger useEffect ở file kia
                    navigate(`/danh-sach/${slugify(style.name)}`);
                  }}
                >{style.name}</a></li>))
            }
            {/* <li><a href="/danh-sach/phim-le">Phim lẻ</a></li>
            <li><a href="/danh-sach/phim-bo">Phim bộ</a></li>
            <li><a href="/danh-sach/phim-chieu-rap">Phim chiếu rạp</a></li> */}
            <li>
              <a href="#">Thể loại <ArrowDropDownTwoToneIcon className="icon" /></a>
              <ul>
                {types.length > 0 ? (
                  types.map((type, index) => (
                    <li key={index}><a
                      onClick={() => {
                        localStorage.setItem('typeId', type.id);
                        localStorage.setItem('typeName', type.name);
                        setRefresh(prev => !prev); // để trigger useEffect ở file kia
                        navigate(`/the-loai/${slugify(type.name)}`);
                      }}>{type.name}</a></li>
                  ))
                ) : (
                  <li>Loading...</li>
                )}
              </ul>
            </li>

            <li>
              <a href="#">Quốc gia <ArrowDropDownTwoToneIcon className="icon" /></a>
              <ul>
                {nations.length > 0 ? (
                  nations.map((nation, index) => (
                    <li key={index}><a onClick={() => {
                      localStorage.setItem('nationId', nation.id);
                      setRefresh(prev => !prev); // để trigger useEffect ở file kia
                      navigate(`/quoc-gia/${slugify(nation.name)}`);
                    }}>{nation.name}</a></li>
                  ))
                ) : (
                  <li>Loading...</li>
                )}
              </ul>
            </li>
          </ul>
        </nav>
      </div>

    </header>

  );
}

export default NavBar;
