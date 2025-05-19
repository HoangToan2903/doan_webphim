import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Paper, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';




function ThongKe() {
    const [moviesMovieRating, setMovieRating] = useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    useEffect(() => {
        axios.get('http://localhost:8080/website/listMovieRating')
            .then(response => {
                setMovieRating(response.data);
            })
            .catch(error => console.error(error));
    }, []);
    const [moviestop, setMovieTop] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/website/topphim')
            .then(response => {           
                setMovieTop(response.data);
            })
            .catch(error => console.error(error));
    }, []);
    return (
        <section className="page-content">
            <div class="box_accordion">
                <details>
                    <summary>Phim có Rating cao nhất</summary>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow style={{ backgroundColor: 'Gray' }}>
                                    <TableCell align="center">STT</TableCell>
                                    <TableCell align="center">Image</TableCell>
                                    <TableCell align="center">Name Movie</TableCell>
                                    <TableCell align="center">Rating</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Array.isArray(moviesMovieRating) && moviesMovieRating.length > 0 ? (
                                    moviesMovieRating.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((movieMovieRating, index) => (
                                        <TableRow key={movieMovieRating.id}>
                                            <TableCell align="center">{page * rowsPerPage + index + 1}</TableCell>
                                            <TableCell align="center">
                                                <img
                                                    src={`data:image/jpeg;base64,${movieMovieRating.image}`}
                                                    alt={movieMovieRating.name}
                                                    style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "8px" }}
                                                />
                                            </TableCell>
                                            <TableCell align="center">{movieMovieRating.name}</TableCell>
                                            <TableCell align="center">{movieMovieRating.rating}</TableCell>

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
                            rowsPerPageOptions={[ 10, 20, 25]}
                            component="div"
                            count={moviesMovieRating != null ? moviesMovieRating.length : 0}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </TableContainer>
                </details>
                <details>
                    <summary>Phim có lượng view cao nhất</summary>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow style={{ backgroundColor: 'Gray' }}>
                                    <TableCell align="center">STT</TableCell>
                                    <TableCell align="center">Image</TableCell>
                                    <TableCell align="center">Name Movie</TableCell>
                                    <TableCell align="center">View</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Array.isArray(moviestop) && moviestop.length > 0 ? (
                                    moviestop.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((movietop, index) => (
                                        <TableRow key={movietop.id}>
                                            <TableCell align="center">{page * rowsPerPage + index + 1}</TableCell>
                                            <TableCell align="center">
                                                <img
                                                    src={`data:image/jpeg;base64,${movietop.image}`}
                                                    alt={movietop.name}
                                                    style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "8px" }}
                                                />
                                            </TableCell>
                                            <TableCell align="center">{movietop.name}</TableCell>
                                            <TableCell align="center">{movietop.view}</TableCell>

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
                            rowsPerPageOptions={[ 10, 20, 25]}
                            component="div"
                            count={moviestop != null ? moviestop.length : 0}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </TableContainer>
                </details>
                <details>
                    <summary>Phim bộ có lượng view cao nhất</summary>
                    <p>Something small enough to escape casual notice.</p>
                </details>
            </div>

        </section>
    )
}

export default ThongKe;