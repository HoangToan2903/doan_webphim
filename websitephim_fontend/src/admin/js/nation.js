import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Paper, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit'
import TextField from '@mui/material/TextField';
import TablePagination from '@mui/material/TablePagination';




function Nation() {
    const [nations, setNation] = useState(null)
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
    


    const [newNation, setNewNation] = useState({
        name: ''
    })
    const [editNation, setEditNation] = useState({
        name: ''
    })
    const handleClickOpenEdit = (nation) => {
        setEditNation(nation)
        setOpenEdit(true)
    }

    const handleChange = (e) => {
        setNewNation({ ...newNation, name: e.target.value });
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
        setEditNation({
            ...editNation,
            [event.target.name]: event.target.value
        });
    };


    // delete
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/website/nation/${id}`);
            setNation(nations.filter(nation => nation.id !== id));
            handleConfirmClose()
        } catch (error) {
            alert('There was an error deleting the nation')
        }
    };
    // add
    const handleAdd = async () => {
        try {
            if (!newNation.name.trim()) {
                window.alert("Vui lòng nhập nation name!");
                return;
            }
            // Kiểm tra xem tên đã tồn tại trong danh sách chưa
            const isDuplicate = nations.some(nation => nation.name === newNation.name.trim());
            if (isDuplicate) {
                window.alert("Nation này đã tồn tại!");
                return;
            }
    
            const response = await axios.post('http://localhost:8080/website/nation', newNation);
    
            setNation([...nations, response.data]);
            setNewNation({ name: '' });
            window.alert("Thêm  thành công!");

        } catch (error) {
            console.error("Lỗi khi thêm loại:", error);
        }
    };

    // Update
    const handleEditNation = async () => {
        try {
    
            const response = await axios.put(`http://localhost:8080/website/nation/${editNation.id}`, editNation);
    
            setNation(prevNations => 
                prevNations.map(nation => 
                    nation.id === editNation.id ? response.data : nation
                )
            );
    
            handleCloseEdit();
        } catch (error) {
            console.error('Lỗi xảy ra khi cập nhật:', error);
        }
    };
    useEffect(() => {
        axios.get('http://localhost:8080/website/nationAll')
            .then(response => {
                setNation(response.data);
            })
            .catch(error => console.error(error));
    }, []);

    return (
        <section className="page-content">
            <h1>Nation</h1>
            <hr />
            <br />
            <div className="container">
                <div className="row">
                <TextField
                        id="outlined-multiline-flexible"
                        label="Name Nation ..."
                        multiline
                        fullWidth
                        maxRows={10}
                        value={newNation.name}
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
                                <TableCell align="center">Name Nation</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Array.isArray(nations) && nations.length > 0 ? (
                                nations.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((nation, index) => (
                                    <TableRow key={nation.id}>
                                        <TableCell align="center">{page * rowsPerPage + index + 1}</TableCell>
                                        <TableCell align="center">{nation.name}</TableCell>
                                        <TableCell sx={{ display: 'flex', justifyContent: 'center' }}>
                                            {/* <IconButton color="primary" onClick={() => handleConfirmOpen(nation.id)}>
                                                <DeleteIcon />
                                            </IconButton> */}
                                            <IconButton color="primary" onClick={() => handleClickOpenEdit(nation)}>
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
                        count={nations!= null? nations.length: 0}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </TableContainer>
                {/* Xoa */}
                <Dialog open={confirmOpen} onClose={handleConfirmClose}>
                    <DialogTitle>Confirm DeleteId</DialogTitle>
                    <DialogContent>Are you sure you want to delete this Nation?</DialogContent>
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
                    <DialogTitle>Update Nation</DialogTitle>
                    <DialogContent>
                        <TextField
                            name="name"
                            type="text"
                            value={editNation.name || ''}
                            onChange={handleChangeEdit}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseEdit} color="primary">
                            Cancel
                        </Button>
                        <Button color="primary" variant="contained" onClick={handleEditNation}>
                            Update
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>

        </section>
    )
}

export default Nation;