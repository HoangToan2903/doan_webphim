import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Paper, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit'
import TextField from '@mui/material/TextField';
import TablePagination from '@mui/material/TablePagination';




function Style() {
    const [styles, setStyle] = useState(null)
    const [deleteId, setDeleteId] = useState(null)
    const [confirmOpen, setConfirmOpen] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    // const [snackbarOpen, setSnackbarOpen] = useState(false)

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    const [newStyle, setNewStyle] = useState({
        name: ''
    })
    const [editStyle, setEditStyle] = useState({
        name: ''
    })
    const handleClickOpenEdit = (style) => {
        setEditStyle(style)
        setOpenEdit(true)
    }

    const handleChange = (e) => {
        setNewStyle({ ...newStyle, name: e.target.value });
    };
    const handleConfirmOpen = (id) => {
        setDeleteId(id)
        setConfirmOpen(true)
    }
    const handleConfirmClose = (id) => {
        setDeleteId(null)
        setConfirmOpen(false)
    }
    const handleCloseEdit = () => {
        setOpenEdit(false)
    }

    const handleChangeEdit = (event) => {
        setEditStyle({
            ...editStyle,
            [event.target.name]: event.target.value
        });
    };


    // delete
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/website/style/${id}`);
            setStyle(styles.filter(style => style.id !== id));
            handleConfirmClose()
        } catch (error) {
            alert('There was an error deleting the style')
        }
    };
    // add
    const handleAdd = async () => {
        try {
            if (!newStyle.name.trim()) {
                window.alert("Vui lòng nhập style name!");
                return;
            }
            // Kiểm tra xem tên đã tồn tại trong danh sách chưa
            const isDuplicate = styles.some(style => style.name === newStyle.name.trim());
            if (isDuplicate) {
                window.alert("Style này đã tồn tại!");
                return;
            }

            const response = await axios.post('http://localhost:8080/website/style', newStyle);

            setStyle([...styles, response.data]);
            setNewStyle({ name: '' });
            window.alert("Thêm  thành công!");

        } catch (error) {
            console.error("Lỗi khi thêm loại:", error);
        }
    };

    // Update
    const handleEditStyle = async () => {
        try {

            const response = await axios.put(`http://localhost:8080/website/style/${editStyle.id}`, editStyle);

            setStyle(prevStyles =>
                prevStyles.map(style =>
                    style.id === editStyle.id ? response.data : style
                )
            );

            handleCloseEdit();
        } catch (error) {
            console.error('Lỗi xảy ra khi cập nhật:', error);
        }
    };
    useEffect(() => {
        axios.get('http://localhost:8080/website/styleAll')
            .then(response => {
                setStyle(response.data);
            })
            .catch(error => console.error(error));
    }, []);

    return (
        <section className="page-content">
            <h1>Style</h1>
            <hr />
            <br />
            <div className="container">
                <div className="row">
                    <TextField
                        id="outlined-multiline-flexible"
                        label="Name Style ..."
                        multiline
                        fullWidth
                        maxRows={10}
                        value={newStyle.name}
                        onChange={handleChange}
                    />
                </div>
                <br></br>
                <div className="row">
                    <Button onClick={handleAdd} color="primary" variant="contained">
                        Add
                    </Button>
                </div>
                <br></br>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow style={{ backgroundColor: 'Gray' }}>
                                <TableCell align="center">STT</TableCell>
                                <TableCell align="center">Name Style</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Array.isArray(styles) && styles.length > 0 ? (
                                styles.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((style, index) => (
                                    <TableRow key={style.id}>
                                        <TableCell align="center">{page * rowsPerPage + index + 1}</TableCell>
                                        <TableCell align="center">{style.name}</TableCell>
                                        <TableCell sx={{ display: 'flex', justifyContent: 'center' }}>
                                            <IconButton color="primary" onClick={() => handleConfirmOpen(style.id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                            <IconButton color="primary" onClick={() => handleClickOpenEdit(style)}>
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
                        count={styles != null ? styles.length : 0}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </TableContainer>


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
                {/* edit */}
                <Dialog open={openEdit} onClose={handleCloseEdit}>
                    <DialogTitle>Update Style</DialogTitle>
                    <DialogContent>
                        <TextField
                            name="name"
                            type="text"
                            value={editStyle.name || ''}
                            onChange={handleChangeEdit}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseEdit} color="primary">
                            Cancel
                        </Button>
                        <Button color="primary" variant="contained" onClick={handleEditStyle}>
                            Update
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>

        </section>
    )
}

export default Style;