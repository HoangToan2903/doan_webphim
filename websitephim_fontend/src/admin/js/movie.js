import React, { useEffect, useState } from 'react';
import TableMovie from './tableMovie';
import axios from 'axios'
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Autocomplete from '@mui/material/Autocomplete';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';
import Checkbox from '@mui/material/Checkbox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';



const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;


function Movie() {
    const [movies, setMovie] = useState(null)
    const [selectedImage, setSelectedImage] = useState(null); // Lưu file chưa upload
    const [imagePreview, setImagePreview] = useState("");
    const [types, setType] = useState(null)
    const [selectedType, setSelectedType] = useState([]);
    const [styles, setStyle] = useState(null)
    const [selectedStyle, setSelectedStyle] = useState(null);
    const [nations, setNation] = useState(null)
    const [selectedNation, setSelectedNation] = useState(null);
    // const [snackbarOpen, setSnackbarOpen] = useState(false)

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const [newMovie, setNewMovie] = useState({
        name: '',
        description: '',
        duration: '',
        episodes: '',
        link: '',
        namphathanh: '',
        status: '',
        trailer: '',
        nation: '',
        style: '',
        types: [],
        directors: '',
        cast: ''

    })


    const handleChange = (event) => {
        const { name, value } = event.target; // Lấy name và value từ sự kiện onChange
        setNewMovie((prev) => ({
            ...prev,
            [name]: value, // Cập nhật giá trị của thuộc tính tương ứng
        }));
    };



    const defaultMovie = {
        name: "",
        description: "",
        duration: "",
        episodes: "",
        link: "",
        namphathanh: "",
        status: "",
        rating: "",
        trailer: "",
        nation: "",
        style: "",
        types: [],
        directors: "",
        cast: ""
    };
    // add
    const handleAdd = async () => {
        try {
            if (!newMovie || !newMovie.name || !newMovie.name.trim()) {
                window.alert("Vui lòng nhập name novie!");
                return;
            }
            const isDuplicate = movies.some(movie => movie.name === newMovie.name.trim());
            if (isDuplicate) {
                window.alert("Movie này đã tồn tại!");
                return;
            }

            if (!newMovie || !newMovie.duration || !newMovie.duration.trim()) {
                window.alert("Vui lòng nhập duration!");
                return;
            }

            if (!newMovie || !newMovie.namphathanh || !newMovie.namphathanh.trim()) {
                window.alert("Vui lòng nhập year!");
                return;
            }
            if (!newMovie || !newMovie.trailer || !newMovie.trailer.trim()) {
                window.alert("Vui lòng nhập trailer!");
                return;
            }
            if (!newMovie || !newMovie.cast || !newMovie.cast.trim()) {
                window.alert("Vui lòng nhập cast!");
                return;
            }
            if (!newMovie || !newMovie.directors || !newMovie.directors.trim()) {
                window.alert("Vui lòng nhập directors!");
                return;
            }
            if (!newMovie || !newMovie.types || newMovie.types.length === 0) {
                window.alert("Vui lòng nhập type!");
                return;
            }

            if (!newMovie || !newMovie.nation || !newMovie.nation.trim()) {
                window.alert("Vui lòng nhập nation!");
                return;
            }
            if (!newMovie || !newMovie.style || !newMovie.style.trim()) {
                window.alert("Vui lòng nhập style!");
                return;
            }
            // if (newMovie.style === "Phim lẻ" && (!newMovie.episodes || !newMovie.episodes.trim())) {
            //     window.alert("Vui lòng nhập episodes!");
            //     return;
            // }
            if (!newMovie || (!newMovie.episodes?.trim() && selectedStyle?.name !== "Phim lẻ" && selectedStyle?.name !== "Phim chiếu rạp" )) {
                window.alert("Vui lòng nhập episodes!");
                return;
            }
            if (!newMovie || (!newMovie.link?.trim() && selectedStyle?.name !== "Phim bộ")) {
                window.alert("Vui lòng nhập link!");
                return;
            }

            if (!newMovie || !newMovie.status || !newMovie.status.trim()) {
                window.alert("Vui lòng nhập status!");
                return;
            }
            if (!newMovie || !newMovie.description || !newMovie.description.trim()) {
                window.alert("Vui lòng nhập description!");
                return;
            }
            // if (!newMovie || !newMovie.image || !newMovie.image.trim()) {
            //     window.alert("Vui lòng nhập image!");
            //     return;
            // }
            if (!newMovie || !newMovie.rating || !newMovie.rating.trim()) {
                window.alert("Vui lòng nhập rating!");
                return;
            }
         
            // Chuyển danh sách object thành danh sách ID
            const typeIds = newMovie.types.map(type => type.id);

            const formData = new FormData();
            formData.append("name", newMovie.name);
            formData.append("description", newMovie.description);
            formData.append("duration", newMovie.duration);
            formData.append("episodes", newMovie.episodes);
            formData.append("link", newMovie.link);
            formData.append("namphathanh", newMovie.namphathanh);
            formData.append("status", newMovie.status);
            formData.append("rating", newMovie.rating);
            formData.append("trailer", newMovie.trailer);
            formData.append("nation", newMovie.nation);
            formData.append("style", newMovie.style);

            // Gửi danh sách ID thay vì object
            typeIds.forEach(id => formData.append("type", id));

            formData.append("directors", newMovie.directors);
            formData.append("cast", newMovie.cast);

            if (selectedImage) {
                formData.append("image", selectedImage);
            }

            const response = await axios.post('http://localhost:8080/website/movie', formData);

            setMovie([...movies, response.data]);
            setNewMovie(defaultMovie);
            setSelectedImage(null);
            setSelectedStyle(null);
            setSelectedNation(null);
            setSelectedType([]);
            setImagePreview("");
            window.alert("Thêm thành công!");
        } catch (error) {
            console.error("Lỗi khi thêm phim:", error);
        }
    };


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
                setType(response.data);
            })
            .catch(error => console.error(error));
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8080/website/styleAll')
            .then(response => {
                setStyle(response.data);
            })
            .catch(error => console.error(error));
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8080/website/nationAll')
            .then(response => {
                setNation(response.data);
            })
            .catch(error => console.error(error));
    }, []);

    useEffect(() => {
        if (selectedStyle?.name === "Phim lẻ") {
            handleChange({ target: { name: "episodes", value: "" } });
        }
    }, [selectedStyle]);

    useEffect(() => {
        if (selectedStyle?.name === "Phim bộ") {
            handleChange({ target: { name: "link", value: "" } });
        }
    }, [selectedStyle]);

    return (
        <Box
            component="form"
            sx={{ '& > :not(movie)': { maxWidth: '100%' } }}
            noValidate
            autoComplete="off"
        >
            <section className="page-content">
                <h1>Movie</h1>
                <hr />
                <br />
                <div className="container">
                    <div className="row">
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            <Grid item xs={6}>
                                <TextField
                                    id="outlined-multiline-flexible"
                                    label="Name Movie ..."
                                    multiline
                                    fullWidth
                                    name="name"
                                    maxRows={10}
                                    value={newMovie.name}
                                    onChange={handleChange}
                                />
                            </Grid>



                            <Grid item xs={6}>
                                <TextField
                                    id="outlined-multiline-flexible"
                                    label="Duration ..."
                                    multiline
                                    fullWidth
                                    name="duration"
                                    value={newMovie.duration}
                                    maxRows={10}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        if (/^\d*$/.test(value)) { // Chỉ chấp nhận số
                                            handleChange(e);
                                        } else {
                                            alert("Vui lòng nhập số!");
                                        }
                                    }}
                                // error={isNaN(newMovie.duration)} // Hiển thị lỗi nếu giá trị không phải số
                                // helperText={isNaN(newMovie.duration) ? "Vui lòng nhập số!" : ""}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="outlined-multiline-flexible"
                                    label="Year of issue ..."
                                    multiline
                                    fullWidth
                                    name="namphathanh"
                                    value={newMovie.namphathanh}
                                    maxRows={10}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        if (/^\d*$/.test(value)) { // Chỉ chấp nhận số
                                            handleChange(e);
                                        } else {
                                            alert("Vui lòng nhập số!");
                                        }
                                    }}
                                // error={isNaN(newMovie.namphathanh)} // Hiển thị lỗi nếu giá trị không phải số
                                // helperText={isNaN(newMovie.namphathanh) ? "Vui lòng nhập số!" : ""}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="outlined-multiline-flexible"
                                    label="Trailer ..."
                                    multiline
                                    fullWidth
                                    name="trailer"
                                    value={newMovie.trailer}
                                    maxRows={10}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="outlined-multiline-flexible"
                                    label="Cast ..."
                                    multiline
                                    fullWidth
                                    name='cast'
                                    value={newMovie.cast}
                                    maxRows={10}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="outlined-multiline-flexible"
                                    label="Directors ..."
                                    multiline
                                    fullWidth
                                    name='directors'
                                    value={newMovie.directors}
                                    maxRows={10}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Autocomplete
                                    multiple
                                    id="checkboxes-tags-demo"
                                    options={types}
                                    disableCloseOnSelect
                                    getOptionLabel={(option) => option.name}
                                    value={selectedType} // Gán giá trị từ state
                                    onChange={(event, newValue) => {
                                        console.log("Selected Types:", newValue);
                                        setSelectedType(newValue);
                                        setNewMovie((prev) => ({
                                            ...prev,
                                            types: newValue, // Lưu object ở frontend, gửi ID ở backend
                                        }));
                                    }}
                                    renderOption={(props, option, { selected }) => (
                                        <li {...props} key={option.id}>
                                            <Checkbox
                                                icon={icon}
                                                checkedIcon={checkedIcon}
                                                style={{ marginRight: 8 }}
                                                checked={selected}
                                            />
                                            {option.name}
                                        </li>
                                    )}
                                    fullWidth
                                    name='type'
                                    renderInput={(params) => (
                                        <TextField {...params} label="Name Type.." placeholder="Select Types ..." />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Autocomplete
                                    disablePortal
                                    options={nations}
                                    getOptionLabel={(option) => option.name}
                                    value={selectedNation} // Gán giá trị từ state
                                    onChange={(event, newValue) => {
                                        setSelectedNation(newValue); // Cập nhật giá trị hiển thị
                                        setNewMovie((prev) => ({
                                            ...prev,
                                            nation: newValue ? newValue.id : null,
                                        }));
                                    }}
                                    name='nation'
                                    fullWidth
                                    renderInput={(params) => <TextField {...params} label="Name Nation ..." />}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Autocomplete
                                    disablePortal
                                    options={styles}
                                    getOptionLabel={(option) => option.name}
                                    value={selectedStyle}
                                    onChange={(event, newValue) => {
                                        setSelectedStyle(newValue);
                                        setNewMovie((prev) => ({
                                            ...prev,
                                            style: newValue ? newValue.id : null,
                                        }));
                                    }}
                                    name='style'
                                    fullWidth
                                    renderInput={(params) => <TextField {...params} label="Name Style ..." />}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="outlined-multiline-flexible"
                                    label="Episodes ..."
                                    multiline
                                    fullWidth
                                    name="episodes"
                                    value={newMovie.episodes || ""}
                                    maxRows={10}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        if (/^\d*$/.test(value)) {
                                            handleChange(e);
                                        } else {
                                            alert("Vui lòng nhập số!");
                                        }
                                    }}
                                    disabled={selectedStyle?.name?.trim().toLowerCase() === "phim lẻ" || selectedStyle?.name?.trim().toLowerCase() === "phim chiếu rạp"}
                                />

                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="outlined-multiline-flexible"
                                    label="Link Film ..."
                                    multiline
                                    fullWidth
                                    maxRows={10}
                                    name='link'
                                    value={newMovie.link || ""}
                                    onChange={handleChange}
                                    disabled={selectedStyle?.name === "Phim bộ"}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Autocomplete
                                    disablePortal
                                    options={[
                                        { label: "Đang chiếu", value: "0" },                                     
                                        { label: "Hoàn thành", value: "1" },
                                    ]}
                                    fullWidth
                                    name="status"
                                    value={
                                        newMovie.status
                                            ? { label: newMovie.status === "0" ? "Đang chiếu" :  "Hoàn thành", value: newMovie.status }
                                            : null
                                    }
                                    onChange={(event, newValue) => {
                                        setNewMovie((prev) => ({ ...prev, status: newValue ? newValue.value : "" }));
                                    }}
                                    getOptionLabel={(option) => option.label}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Status ..." />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="outlined-multiline-flexible"
                                    label="Rating ..."
                                    multiline
                                    fullWidth
                                    name="rating"
                                    value={newMovie.rating}
                                    maxRows={10}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        if (/^\d*\.?\d*$/.test(value)) { // Chấp nhận số nguyên và số thập phân
                                            handleChange(e);
                                        } else {
                                            alert("Vui lòng nhập số!");
                                        }
                                    }}
                                />
                            </Grid>

                            <Grid item xs={6}>
                                <TextareaAutosize
                                    name="description"
                                    value={newMovie.description}
                                    onChange={(e) => setNewMovie({ ...newMovie, description: e.target.value })}
                                    aria-label="empty textarea"
                                    placeholder="Description ..."
                                    minRows={3}
                                    style={{
                                        width: "100%",
                                        padding: "10px",
                                        fontSize: "16px",
                                        borderRadius: "5px",
                                        border: "1px solid #ccc",
                                        outline: "none",
                                        resize: "vertical"
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <div className="mb-1">
                                    Image <span className="font-css top">*</span>
                                    <div>
                                        <input type="file" name='image' id="file-input" onChange={handleImageChange} />
                                    </div>
                                    <br></br>
                                    {imagePreview && (
                                        <div className="mt-2">
                                            <img style={{ width: '100px' }} src={imagePreview} alt="Selected" />
                                            <button onClick={() => {
                                                setImagePreview("");
                                                setSelectedImage(null);
                                            }} color="primary">
                                                Delete image
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </Grid>
                        </Grid>

                    </div>
                    <br></br>
                    <div className="row">
                        <Button onClick={handleAdd} color="primary" variant="contained">
                            Add
                        </Button>
                    </div>
                    <br></br>
                    <TableMovie />
                </div>

            </section>
        </Box>
    )
}
const blue = {
    100: '#DAECFF',
    200: '#b6daff',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
};

const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};

const TextareaAutosize = styled(BaseTextareaAutosize)(
    ({ theme }) => `
    box-sizing: border-box;
    width: 590px;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
  
    &:hover {
      border-color: ${blue[400]};
    }
  
    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
    }
  
    /* firefox */
    &:focus-visible {
      outline: 0;
    }
  `,
);
export default Movie;