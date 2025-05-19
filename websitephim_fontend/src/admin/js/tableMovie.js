import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Tooltip, Paper, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit'
import TextField from '@mui/material/TextField';
import TablePagination from '@mui/material/TablePagination';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { styled } from '@mui/system';
import Grid from '@mui/material/Grid';
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import AddCircleIcon from '@mui/icons-material/AddCircle';
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function TableMovie() {
    const [movies, setMovie] = useState(null)
    const [moviesle, setMovieLe] = useState(null)
    const [moviesbo, setMovieBo] = useState(null)
    const [moviesChieuRap, setMovieChieuRap] = useState(null)

    const [deleteId, setDeleteId] = useState(null)
    const [confirmOpen, setConfirmOpen] = useState(false)
    const [openEdit1, setOpenEdit1] = useState(false)
    const [openEdit2, setOpenEdit2] = useState(false)
    const [openAdd, setOpenAdd] = useState(false)

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [newMovie, setNewMovie] = useState({})
    const [selectedImage, setSelectedImage] = useState(null); // Lưu file chưa upload
    const [imagePreview, setImagePreview] = useState("");
    const [types, setType] = useState(null)
    const [nations, setNation] = useState(null)
    const [styles, setStyle] = useState(null)
    const [selectedStyle, setSelectedStyle] = useState([]);

    const [selectedType, setSelectedType] = useState([]);
    const [selectedNation, setSelectedNation] = useState([])
        ;
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    // const handleDeleteImage = () => {
    //     setImagePreview("");
    //     setSelectedImage(null);
    // };

    // const [snackbarOpen, setSnackbarOpen] = useState(false)

    const [value, setValue] = React.useState('1');

    const handleChangeTab = (event, newValue) => {
        setValue(newValue);
    };


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const [editMovie, setEditMovie] = useState({})

    // const handleClickOpenEdit = (movie) => {
    //     setEditMovie(movie)
    //     console.log(editMovie.type)
    //     console.log(editMovie.name)

    //     setOpenEdit(true)
    // }
    useEffect(() => {
        axios.get('http://localhost:8080/website/typeAll')
            .then(response => {
                setType(response.data);
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
    const handleClickOpenEdit1 = (movie) => {
        setEditMovie(movie);

        // Lấy danh sách type của movie và hiển thị lên Autocomplete
        setSelectedType(movie.types || []);
        // Cập nhật giá trị nation
        setSelectedNation(movie.nation || []);
        setSelectedStyle(movie.style || []);
        console.log(movie.status)
        setEditMovie((prev) => ({ ...prev, status: movie.status }));
        console.log("Description value:", movie.description);

        setOpenEdit1(true);
    };
    const handleClickOpenEdit2 = (movie) => {
        setEditMovie(movie);

        // Lấy danh sách type của movie và hiển thị lên Autocomplete
        setSelectedType(movie.types || []);
        // Cập nhật giá trị nation
        setSelectedNation(movie.nation || []);
        setSelectedStyle(movie.style || []);
        console.log(movie.status)
        setEditMovie((prev) => ({ ...prev, status: movie.status }));
        console.log("Description value:", movie.description);

        setOpenEdit2(true);
    };


    const handleClickOpenAdd = (movie) => {
        setEditMovie(movie);
        setOpenAdd(true);
    };

    const handleConfirmOpen = (id) => {
        setDeleteId(id)
        setConfirmOpen(true)
    }
    const handleConfirmClose = (id) => {
        setDeleteId(null)
        setConfirmOpen(false)
    }

    const handleCloseEdit1 = () => {
        setOpenEdit1(false)
    }
    const handleCloseEditEposide = () => {
        setOpenEditEpisode(false)
    }
    const handleCloseEdit2 = () => {
        setOpenEdit2(false)
    }
    const handleCloseAdd = () => {
        setOpenAdd(false)
    }

    const handleChangeEdit = (event) => {
        setEditMovie({
            ...editMovie,
            [event.target.name]: event.target.value
        });
    };

    const handleChangeEditEpisode = (event) => {
        setEditEpisode({
            ...editEpisode,
            [event.target.name]: event.target.value
        });
    };

    const [editEpisode, setEditEpisode] = useState({
        name: '',
        link: ''
    })
    const [openEditEpisode, setOpenEditEpisode] = useState(false)

    const handleClickOpenEditEpisode = (episode) => {
        setEditEpisode(episode)
        setOpenEditEpisode(true)
    }
    // delete
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/website/movie/${id}`);
            setMovie(moviesle.filter(movie => movie.id !== id));

            await axios.delete(`http://localhost:8080/website/episodes/${id}`);
            setEpisodes(episodes.filter(episode => episode.id !== id));
            handleConfirmClose()
        } catch (error) {
            alert('There was an error deleting the style')
        }
    };


    // Update
    const handleEditMovie = async () => {
        try {
            if (!editMovie || !editMovie.id) {
                console.error('editMovie hoặc editMovie.id không hợp lệ:', editMovie);
                return;
            }

            const response = await axios.put(`http://localhost:8080/website/movie/${editMovie.id}`, editMovie);

            setMovie(prevMovies => {
                if (!prevMovies) {
                    // console.error('prevMovies đang là null hoặc undefined');
                    return [];
                }
                return prevMovies.map(movie =>
                    movie.id === editMovie.id ? response.data : movie
                );
            });

            handleCloseEdit1();
            handleCloseEdit2();

        } catch (error) {
            console.error('Lỗi xảy ra khi cập nhật:', error);
        }
    };


    useEffect(() => {
        axios.get('http://localhost:8080/website/movieLe')
            .then(response => {
                setMovieLe(response.data);
            })
            .catch(error => console.error(error));
    }, []);
    useEffect(() => {
        axios.get('http://localhost:8080/website/movieBo')
            .then(response => {
                setMovieBo(response.data);
            })
            .catch(error => console.error(error));
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8080/website/movieChieuRap')
            .then(response => {
                setMovieChieuRap(response.data);
            })
            .catch(error => console.error(error));
    }, []);
    // ADD
    //   const [editNation, setEditNation] = useState({
    //         name: ''
    //     })
    const [newEpisodes, setNewEpisodes] = useState({
        name: "",
        link: "" // Thêm trường link
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewEpisodes((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const [selectedMovieId, setSelectedMovieId] = useState(null);
    const [episodes, setEpisodes] = useState([]);

    useEffect(() => {
        if (selectedMovieId) {
            axios.get(`http://localhost:8080/website/episodesALLByIdMovie/${selectedMovieId}`)
                .then(response => {
                    setEpisodes(response.data);
                })
                .catch(error => console.error(error));
        }
    }, [selectedMovieId]);
    const handleAdd = async () => {
        try {
            if (!newEpisodes.name.trim()) {
                window.alert("Vui lòng nhập số tập!");
                return;
            }

            if (!newEpisodes.link.trim()) {
                window.alert("Vui lòng nhập link!");
                return;
            }

            let existingEpisodes = [];

            try {
                const response = await axios.get(`/website/episodesALLByIdMovie/${editMovie.id}`);
                console.log(response.data); // Kiểm tra dữ liệu trả về

                existingEpisodes = Array.isArray(response.data) ? response.data : [];

                // Lấy số tập hiện tại của bộ phim
                const currentEpisodeCount = existingEpisodes.length;

                // Kiểm tra nếu số tập mới lớn hơn số tập hiện tại
                if (!newEpisodes.name || newEpisodes.name > currentEpisodeCount) {
                    window.alert("Tập phim không hợp lý!");
                    return;
                }
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    console.warn("API không tìm thấy danh sách tập. Bỏ qua kiểm tra trùng lặp.");
                } else {
                    console.error("Lỗi khi lấy danh sách tập:", error);
                    window.alert("Lỗi khi lấy danh sách tập phim!");
                    return;
                }
            }


            const isDuplicate = existingEpisodes.some(ep => (ep.name?.toString() || "").trim() === newEpisodes.name.trim());
            if (isDuplicate) {
                window.alert("Tập phim này đã tồn tại!");
                return;
            }

            const newEpisodeData = {
                name: newEpisodes.name.trim(),
                link: newEpisodes.link.trim(),
                movie: { id: editMovie.id },
            };

            const addResponse = await axios.post(
                "http://localhost:8080/website/episodes",
                newEpisodeData
            );

            setEpisodes((prev) => [...prev, addResponse.data]);
            setNewEpisodes({ name: "", link: "" });

            window.alert("Thêm tập phim thành công!");
        } catch (error) {
            console.error("Lỗi khi thêm tập phim:", error);
            window.alert("Có lỗi xảy ra khi thêm tập phim!");
        }
    };

    // Update Episode
    const handleEditEpisodes = async () => {
        try {

            const response = await axios.put(`http://localhost:8080/website/episodes/${editEpisode.id}`, editEpisode);

            setEpisodes(prevTypes =>
                prevTypes.map(episode =>
                    episode.id === editEpisode.id ? response.data : episode
                )
            );

            handleCloseEditEposide();
        } catch (error) {
            console.error('Lỗi xảy ra khi cập nhật:', error);
        }
    };
    return (
        <Box sx={{ '& > :not(movie)': { maxWidth: '100%' } }}>

            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChangeTab} aria-label="lab API tabs example">
                        <Tab label="Phim lẻ" value="1" />
                        <Tab label="Phim bộ" value="2" />
                        <Tab label="Phim chiếu rạp" value="3" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow style={{ backgroundColor: 'Gray' }}>
                                    <TableCell align="center">STT</TableCell>
                                    <TableCell align="center">Name Movie</TableCell>
                                    <TableCell align="center">Duration</TableCell>
                                    <TableCell align="center">Type</TableCell>
                                    <TableCell align="center">Hình ảnh</TableCell>
                                    <TableCell align="center">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Array.isArray(moviesle) && moviesle.length > 0 ? (
                                    moviesle.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((moviele, index) => (
                                        <TableRow key={moviele.id}>
                                            <TableCell align="center">{page * rowsPerPage + index + 1}</TableCell>
                                            <TableCell align="center">{moviele.name}</TableCell>
                                            <TableCell align="center">{moviele.duration} (phút)</TableCell>
                                            <TableCell align="center"> {moviele.types.map((type) => type.name).join(", ")}</TableCell>
                                            <TableCell align="center">
                                                <img
                                                    src={`data:image/jpeg;base64,${moviele.image}`}
                                                    alt={moviele.name}
                                                    style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "8px" }}
                                                />
                                            </TableCell>
                                            <TableCell sx={{ justifyContent: 'center' }}>
                                                <IconButton color="primary" onClick={() => handleConfirmOpen(moviele.id)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                                <IconButton color="primary" onClick={() => handleClickOpenEdit1(moviele)}>
                                                    <EditIcon />
                                                </IconButton>

                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow >
                                        <TableCell colSpan={6} align="center">Loading...</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={moviesle != null ? moviesle.length : 0}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </TableContainer>
                </TabPanel>
                <TabPanel value="2">
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow style={{ backgroundColor: 'Gray' }}>
                                    <TableCell align="center">STT</TableCell>
                                    <TableCell align="center">Name Movie</TableCell>
                                    <TableCell align="center">Duration</TableCell>
                                    <TableCell align="center">Episodes</TableCell>
                                    <TableCell align="center">Type</TableCell>
                                    <TableCell align="center">Hình ảnh</TableCell>
                                    <TableCell align="center">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Array.isArray(moviesbo) && moviesbo.length > 0 ? (
                                    moviesbo.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((moviebo, index) => (
                                        <TableRow key={moviebo.id}>
                                            <TableCell align="center">{page * rowsPerPage + index + 1}</TableCell>
                                            <TableCell align="center">{moviebo.name}</TableCell>
                                            <TableCell align="center">{moviebo.duration} (phút/tập)</TableCell>
                                            <TableCell align="center">{moviebo.episodes} (tập)</TableCell>
                                            <TableCell align="center"> {moviebo.types.map((type) => type.name).join(", ")}</TableCell>
                                            <TableCell align="center">
                                                <img
                                                    src={`data:image/jpeg;base64,${moviebo.image}`}
                                                    alt={moviebo.name}
                                                    style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "8px" }}
                                                />
                                            </TableCell>
                                            <TableCell sx={{ justifyContent: 'center' }}>
                                                <IconButton color="primary" onClick={() => handleConfirmOpen(moviebo.id)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                                <IconButton color="primary" onClick={() => handleClickOpenEdit2(moviebo)}>
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton
                                                    color="primary"
                                                    onClick={() => {
                                                        setSelectedMovieId(moviebo.id);
                                                        handleClickOpenAdd(moviebo.id); // Gọi thêm hàm mở form/modal nếu cần
                                                    }}
                                                >
                                                    <AddCircleIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={6} align="center">Loading...</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={moviesbo != null ? moviesbo.length : 0}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </TableContainer>
                </TabPanel>
                <TabPanel value="3">
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow style={{ backgroundColor: 'Gray' }}>
                                    <TableCell align="center">STT</TableCell>
                                    <TableCell align="center">Name Movie</TableCell>
                                    <TableCell align="center">Duration</TableCell>
                                    <TableCell align="center">Type</TableCell>
                                    <TableCell align="center">Hình ảnh</TableCell>
                                    <TableCell align="center">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Array.isArray(moviesChieuRap) && moviesChieuRap.length > 0 ? (
                                    moviesChieuRap.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((movieChieuRap, index) => (
                                        <TableRow key={movieChieuRap.id}>
                                            <TableCell align="center">{page * rowsPerPage + index + 1}</TableCell>
                                            <TableCell align="center">{movieChieuRap.name}</TableCell>
                                            <TableCell align="center">{movieChieuRap.duration} (phút)</TableCell>
                                            <TableCell align="center"> {movieChieuRap.types.map((type) => type.name).join(", ")}</TableCell>
                                            <TableCell align="center">
                                                <img
                                                    src={`data:image/jpeg;base64,${movieChieuRap.image}`}
                                                    alt={movieChieuRap.name}
                                                    style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "8px" }}
                                                />
                                            </TableCell>
                                            <TableCell sx={{ justifyContent: 'center' }}>
                                                <IconButton color="primary" onClick={() => handleConfirmOpen(movieChieuRap.id)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                                <IconButton color="primary" onClick={() => handleClickOpenEdit1(movieChieuRap)}>
                                                    <EditIcon />
                                                </IconButton>

                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow >
                                        <TableCell colSpan={6} align="center">Loading...</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={moviesChieuRap != null ? moviesChieuRap.length : 0}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </TableContainer>
                </TabPanel>
            </TabContext>


            {/* add */}
            <Dialog
                open={openAdd}
                onClose={handleCloseAdd}
                maxWidth="xl" // Tăng kích thước tối đa
                fullWidth // Đảm bảo Dialog mở rộng toàn bộ chiều rộng có thể
                sx={{ '& .MuiDialog-paper': { width: '1000px' } }} // Tăng độ rộng cụ thể
            >
                <DialogTitle>Add Episodes</DialogTitle>
                <DialogContent >
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={6} sx={{ display: 'none' }}>
                            <br></br>
                            <TextField
                                id="outlined-multiline-flexible"
                                label="Id Movie ..."
                                multiline
                                fullWidth
                                name="movie"
                                maxRows={10}
                                value={editMovie.id || ''}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <br></br>
                            <TextField
                                id="outlined-multiline-flexible"
                                label="Episodes ..."
                                multiline
                                fullWidth
                                name='name'
                                value={newEpisodes.name}
                                maxRows={10}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (/^\d*$/.test(value)) {
                                        handleChange(e);
                                    } else {
                                        alert("Vui lòng nhập số!");
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <br></br>
                            <TextField
                                id="outlined-multiline-flexible"
                                label="Link film ..."
                                multiline
                                fullWidth
                                name='link'
                                maxRows={10}
                                value={newEpisodes.link}
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAdd} color='primary'>
                        Cancel
                    </Button>
                    <Button onClick={handleAdd} color='secondary' variant='contained'>
                        Add
                    </Button>
                </DialogActions>
                <hr></hr>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow style={{ backgroundColor: 'Gray' }}>
                                <TableCell align="center">STT</TableCell>
                                <TableCell align="center">Episodes</TableCell>
                                <TableCell align="center">Link</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Array.isArray(episodes) && episodes.length > 0 ? (
                                [...episodes] // Tạo bản sao để không thay đổi dữ liệu gốc
                                    .sort((a, b) => Number(a.name) - Number(b.name)) // Sắp xếp tăng dần
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((episode, index) => (
                                        <TableRow key={episode.id}>
                                            <TableCell align="center">{page * rowsPerPage + index + 1}</TableCell>
                                            <TableCell align="center">Tập {episode.name}</TableCell>
                                            <TableCell align="center" sx={{ minWidth: '200px' }}>
                                                <Tooltip title={episode.link}>
                                                    <div style={{
                                                        maxWidth: '200px',
                                                        overflowX: 'auto',
                                                        whiteSpace: 'nowrap',
                                                        scrollbarWidth: 'thin',  // Firefox: làm thanh cuộn nhỏ hơn
                                                        scrollbarColor: '#888 transparent' // Firefox: đổi màu thanh cuộn
                                                    }}>
                                                        {episode.link}
                                                    </div>
                                                </Tooltip>
                                            </TableCell>
                                            <TableCell sx={{ display: 'flex', justifyContent: 'center' }}>
                                                <IconButton color="primary" onClick={() => handleConfirmOpen(episode.id)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                                <IconButton color="primary" onClick={() => handleClickOpenEditEpisode(episode)}>
                                                    <EditIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={3} align="center">Loading...</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={episodes != null ? episodes.length : 0}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </TableContainer>
            </Dialog>
            {/* Xoa */}
            <Dialog open={confirmOpen} onClose={handleConfirmClose}>
                <DialogTitle>Confirm DeleteId</DialogTitle>
                <DialogContent>Are you sure you want to delete this Style?</DialogContent>
                <DialogActions>
                    <Button onClick={handleConfirmClose} color='primary'>
                        Cancel
                    </Button>
                    <Button onClick={() => { handleDelete(deleteId); }} color='secondary' variant='contained'>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
            {/* edit 1*/}
            <Dialog
                open={openEdit1}
                onClose={handleCloseEdit1}
                maxWidth="xl" // Tăng kích thước tối đa
                fullWidth // Đảm bảo Dialog mở rộng toàn bộ chiều rộng có thể
                sx={{ '& .MuiDialog-paper': { width: '1000px' } }} // Tăng độ rộng cụ thể
            >
                <DialogTitle>Update Movie</DialogTitle>
                <DialogContent style={{ width: "1000px" }}>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={6}>
                            <br></br>
                            <TextField
                                id="outlined-multiline-flexible"
                                label="Name Movie ..."
                                multiline
                                fullWidth
                                name="name"
                                maxRows={10}
                                value={editMovie.name || ''}
                                onChange={handleChangeEdit}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <br></br>
                            <TextField
                                id="outlined-multiline-flexible"
                                label="Duration ..."
                                multiline
                                fullWidth
                                name="duration"
                                maxRows={10}
                                value={editMovie.duration || ''}
                                onChange={handleChangeEdit}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <br></br>
                            <TextField
                                id="outlined-multiline-flexible"
                                label="Year of issue ..."
                                multiline
                                fullWidth
                                name="directors"
                                maxRows={10}
                                value={editMovie.directors || ''}
                                onChange={handleChangeEdit}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <br></br>
                            <TextField
                                id="outlined-multiline-flexible"
                                label="Trailer ..."
                                multiline
                                fullWidth
                                name="trailer"
                                maxRows={10}
                                value={editMovie.trailer || ''}
                                onChange={handleChangeEdit}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <br></br>
                            <TextField
                                id="outlined-multiline-flexible"
                                label="Cast ..."
                                multiline
                                fullWidth
                                name="cast"
                                maxRows={10}
                                value={editMovie.cast || ''}
                                onChange={handleChangeEdit}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <br></br>
                            <TextField
                                id="outlined-multiline-flexible"
                                label="Directors ..."
                                multiline
                                fullWidth
                                name="directors"
                                maxRows={10}
                                value={editMovie.directors || ''}
                                onChange={handleChangeEdit}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <br></br>
                            <Autocomplete
                                multiple
                                id="checkboxes-tags-demo"
                                options={types || []} // Đảm bảo không bị lỗi nếu types chưa có dữ liệu
                                disableCloseOnSelect
                                getOptionLabel={(option) => option.name}
                                value={selectedType} // Hiển thị danh sách thể loại đã chọn
                                onChange={(event, newValue) => {
                                    setSelectedType(newValue);
                                    setEditMovie(prev => ({
                                        ...prev,
                                        types: newValue // Cập nhật type cho movie
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
                                renderInput={(params) => (
                                    <TextField {...params} label="Name Type.." placeholder="Select Types ..." />
                                )}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <br></br>
                            <Autocomplete
                                disablePortal
                                options={nations}
                                getOptionLabel={(option) => option.name}
                                value={selectedNation} // Gán giá trị từ state
                                onChange={(event, newValue) => {
                                    setSelectedNation(newValue); // Cập nhật giá trị hiển thị
                                    setEditMovie((prev) => ({
                                        ...prev,
                                        nation: newValue ? newValue.id : null, // Lưu ID vào state của phim
                                    }));
                                }}
                                name="nation"
                                fullWidth
                                renderInput={(params) => <TextField {...params} label="Name Nation ..." />}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <br></br>
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
                            <br></br>
                            <TextField
                                id="outlined-multiline-flexible"
                                label="Link ..."
                                multiline
                                fullWidth
                                name="link"
                                maxRows={10}
                                value={editMovie.link || ''}
                                onChange={handleChangeEdit}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <br></br>
                            <Autocomplete
                                disablePortal
                                options={[
                                    { label: "Đang chiếu", value: "0" },
                                    { label: "Hoàn thành", value: "1" },
                                ]}
                                fullWidth
                                name="status"
                                value={
                                    editMovie.status !== undefined
                                        ? [
                                            { label: "Đang chiếu", value: "0" },
                                            { label: "Hoàn thành", value: "1" }
                                        ].find(option => option.value === String(editMovie.status)) || null
                                        : null
                                }
                                onChange={(event, newValue) => {
                                    setEditMovie((prev) => ({ ...prev, status: newValue ? newValue.value : "" }));
                                }}
                                getOptionLabel={(option) => option?.label || ""}
                                renderInput={(params) => (
                                    <TextField {...params} label="Status ..." />
                                )}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <br></br>
                            <TextareaAutosize
                                name="description"
                                // value={newMovie.description}
                                value={editMovie.description || ''}
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
                            <br></br>
                            <TextField
                                id="outlined-multiline-flexible"
                                label="Rating ..."
                                multiline
                                fullWidth
                                name="rating"
                                maxRows={10}
                                value={editMovie.rating || ''}
                                onChange={handleChangeEdit}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            {/* <br></br> */}
                            <div className="mb-1">
                                Image <span className="font-css top">*</span>
                                <div>
                                    <input type="file" name="image" id="file-input" onChange={handleImageChange} />
                                </div>
                                <br />

                                {/* Kiểm tra nếu có ảnh thì hiển thị */}
                                {imagePreview || editMovie?.image ? (
                                    <div className="mt-2 flex items-center gap-2">
                                        <img
                                            src={imagePreview || `data:image/jpeg;base64,${editMovie.image}`}
                                            alt="Movie"
                                            className="w-16 h-16 object-cover rounded-lg border"
                                            style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "8px" }}
                                        />
                                        {/* <button
                                            onClick={handleDeleteImage}
                                            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                        >
                                            Delete Image
                                        </button> */}
                                    </div>
                                ) : null}
                            </div>

                        </Grid>


                    </Grid>


                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEdit1} color="primary">
                        Cancel
                    </Button>
                    <Button color="primary" variant="contained" onClick={handleEditMovie}>
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
            {/* edit2 */}
            <Dialog
                open={openEdit2}
                onClose={handleCloseEdit2}
                maxWidth="xl" // Tăng kích thước tối đa
                fullWidth // Đảm bảo Dialog mở rộng toàn bộ chiều rộng có thể
                sx={{ '& .MuiDialog-paper': { width: '1000px' } }} // Tăng độ rộng cụ thể
            >
                <DialogTitle>Update Movie</DialogTitle>
                <DialogContent style={{ width: "1000px" }}>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={6}>
                            <br></br>
                            <TextField
                                id="outlined-multiline-flexible"
                                label="Name Movie ..."
                                multiline
                                fullWidth
                                name="name"
                                maxRows={10}
                                value={editMovie.name || ''}
                                onChange={handleChangeEdit}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <br></br>
                            <TextField
                                id="outlined-multiline-flexible"
                                label="Duration ..."
                                multiline
                                fullWidth
                                name="duration"
                                maxRows={10}
                                value={editMovie.duration || ''}
                                onChange={handleChangeEdit}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <br></br>
                            <TextField
                                id="outlined-multiline-flexible"
                                label="Year of issue ..."
                                multiline
                                fullWidth
                                name="directors"
                                maxRows={10}
                                value={editMovie.directors || ''}
                                onChange={handleChangeEdit}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <br></br>
                            <TextField
                                id="outlined-multiline-flexible"
                                label="Trailer ..."
                                multiline
                                fullWidth
                                name="trailer"
                                maxRows={10}
                                value={editMovie.trailer || ''}
                                onChange={handleChangeEdit}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <br></br>
                            <TextField
                                id="outlined-multiline-flexible"
                                label="Cast ..."
                                multiline
                                fullWidth
                                name="cast"
                                maxRows={10}
                                value={editMovie.cast || ''}
                                onChange={handleChangeEdit}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <br></br>
                            <TextField
                                id="outlined-multiline-flexible"
                                label="Directors ..."
                                multiline
                                fullWidth
                                name="directors"
                                maxRows={10}
                                value={editMovie.directors || ''}
                                onChange={handleChangeEdit}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <br></br>
                            <Autocomplete
                                multiple
                                id="checkboxes-tags-demo"
                                options={types || []} // Đảm bảo không bị lỗi nếu types chưa có dữ liệu
                                disableCloseOnSelect
                                getOptionLabel={(option) => option.name}
                                value={selectedType} // Hiển thị danh sách thể loại đã chọn
                                onChange={(event, newValue) => {
                                    setSelectedType(newValue);
                                    setEditMovie(prev => ({
                                        ...prev,
                                        types: newValue // Cập nhật type cho movie
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
                                renderInput={(params) => (
                                    <TextField {...params} label="Name Type.." placeholder="Select Types ..." />
                                )}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <br></br>
                            <Autocomplete
                                disablePortal
                                options={nations}
                                getOptionLabel={(option) => option.name}
                                value={selectedNation} // Gán giá trị từ state
                                onChange={(event, newValue) => {
                                    setSelectedNation(newValue); // Cập nhật giá trị hiển thị
                                    setEditMovie((prev) => ({
                                        ...prev,
                                        nation: newValue ? newValue.id : null, // Lưu ID vào state của phim
                                    }));
                                }}
                                name="nation"
                                fullWidth
                                renderInput={(params) => <TextField {...params} label="Name Nation ..." />}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <br></br>
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
                            <br></br>
                            <TextField
                                id="outlined-multiline-flexible"
                                label="Episodes ..."
                                multiline
                                fullWidth
                                name="episodes"
                                maxRows={10}
                                value={editMovie.episodes || ''}
                                onChange={handleChangeEdit}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <br></br>
                            <Autocomplete
                                disablePortal
                                options={[
                                    { label: "Đang chiếu", value: "0" },
                                    { label: "Hoàn thành", value: "1" },
                                ]}
                                fullWidth
                                name="status"
                                value={
                                    editMovie.status !== undefined
                                        ? [
                                            { label: "Đang chiếu", value: "0" },
                                            { label: "Hoàn thành", value: "1" }
                                        ].find(option => option.value === String(editMovie.status)) || null
                                        : null
                                }
                                onChange={(event, newValue) => {
                                    setEditMovie((prev) => ({ ...prev, status: newValue ? newValue.value : "" }));
                                }}
                                getOptionLabel={(option) => option?.label || ""}
                                renderInput={(params) => (
                                    <TextField {...params} label="Status ..." />
                                )}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <br></br>
                            <TextareaAutosize
                                name="description"
                                // value={newMovie.description}
                                value={editMovie.description || ''}
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
                            <br></br>
                            <TextField
                                id="outlined-multiline-flexible"
                                label="Rating ..."
                                multiline
                                fullWidth
                                name="rating"
                                maxRows={10}
                                value={editMovie.rating || ''}
                                onChange={handleChangeEdit}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            {/* <br></br> */}
                            <div className="mb-1">
                                Image <span className="font-css top">*</span>
                                <div>
                                    <input type="file" name="image" id="file-input" onChange={handleImageChange} />
                                </div>
                                <br />

                                {/* Kiểm tra nếu có ảnh thì hiển thị */}
                                {imagePreview || editMovie?.image ? (
                                    <div className="mt-2 flex items-center gap-2">
                                        <img
                                            src={imagePreview || `data:image/jpeg;base64,${editMovie.image}`}
                                            alt="Movie"
                                            className="w-16 h-16 object-cover rounded-lg border"
                                            style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "8px" }}
                                        />
                                        {/* <button
                                            onClick={handleDeleteImage}
                                            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                        >
                                            Delete Image
                                        </button> */}
                                    </div>
                                ) : null}
                            </div>

                        </Grid>


                    </Grid>


                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEdit2} color="primary">
                        Cancel
                    </Button>
                    <Button color="primary" variant="contained" onClick={handleEditMovie}>
                        Update
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Update episodes */}
            <Dialog open={openEditEpisode} sx={{ '& .MuiDialog-paper': { width: '700px' } }} >
                <DialogTitle>Update Style</DialogTitle>
                <DialogContent>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={6}>
                            <br></br>
                            <TextField
                                name="name"
                                type="text"
                                value={editEpisode.name || ''}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (/^\d*$/.test(value)) {
                                        handleChangeEditEpisode(e);
                                    } else {
                                        alert("Vui lòng nhập số!");
                                    }
                                }}

                            />
                        </Grid>
                        <Grid item xs={6}>
                            <br></br>
                            <TextField
                                name="link"
                                type="text"
                                value={editEpisode.link || ''}
                                onChange={handleChangeEditEpisode}
                            />
                        </Grid>
                    </Grid>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditEposide} color="primary">
                        Cancel
                    </Button>
                    <Button color="primary" variant="contained" onClick={handleEditEpisodes}>
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
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
    width: 460px;
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
export default TableMovie;