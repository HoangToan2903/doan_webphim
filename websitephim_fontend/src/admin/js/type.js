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
// import Alert from '@mui/material/Alert';



function Type() {
    const [types, setType] = useState(null)
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


    const [newType, setNewType] = useState({
        name: ''
    })
    const [editType, setEditType] = useState({
        name: ''
    })
    const handleClickOpenEdit = (type) => {
        setEditType(type)
        setOpenEdit(true)
    }

    const handleChange = (e) => {
        setNewType({ ...newType, name: e.target.value });
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
        setEditType({
            ...editType,
            [event.target.name]: event.target.value
        });
    };


    // delete
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/website/type/${id}`);
            setType(types.filter(type => type.id !== id));
            handleConfirmClose()
        } catch (error) {
            alert('There was an error deleting the type')
        }
    };
    // add
    const handleAdd = async () => {
        try {
            if (!newType.name.trim()) {
                window.alert("Vui lòng nhập type name!");
                return;
            }
            // Kiểm tra xem tên đã tồn tại trong danh sách chưa
            const isDuplicate = types.some(type => type.name === newType.name.trim());
            if (isDuplicate) {
                window.alert("Type này đã tồn tại!");
                return;
            }

            const response = await axios.post('http://localhost:8080/website/type', newType);

            setType([...types, response.data]);
            setNewType({ name: '' });
            window.alert("Thêm  thành công!");
        } catch (error) {
            console.error("Lỗi khi thêm loại:", error);
        }
    };



    // Update
    const handleEditType = async () => {
        try {

            const response = await axios.put(`http://localhost:8080/website/type/${editType.id}`, editType);

            setType(prevTypes =>
                prevTypes.map(type =>
                    type.id === editType.id ? response.data : type
                )
            );

            handleCloseEdit();
        } catch (error) {
            console.error('Lỗi xảy ra khi cập nhật:', error);
        }
    };
    useEffect(() => {
        axios.get('http://localhost:8080/website/typeAll')
            .then(response => {
                setType(response.data);
            })
            .catch(error => console.error(error));
    }, []); // Thêm dependency array trống để tránh lặp vô hạn


    return (
        <section className="page-content">
            <h1>Type</h1>
            <hr />
            <br />
            <div className="container">
                <div className="row">
                    <TextField
                        id="outlined-multiline-flexible"
                        label="Name Type ..."
                        multiline
                        fullWidth
                        maxRows={10}
                        value={newType.name}
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
                                <TableCell align="center">Name Type</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Array.isArray(types) && types.length > 0 ? (
                                types.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((type, index) => (
                                    <TableRow key={type.id}>
                                        <TableCell align="center">{page * rowsPerPage + index + 1}</TableCell>
                                        <TableCell align="center">{type.name}</TableCell>
                                        <TableCell sx={{ display: 'flex', justifyContent: 'center' }}>
                                            <IconButton color="primary" onClick={() => handleConfirmOpen(type.id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                            <IconButton color="primary" onClick={() => handleClickOpenEdit(type)}>
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
                        count={types != null ? types.length : 0}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </TableContainer>


                {/* Xoa */}
                <Dialog open={confirmOpen} onClose={handleConfirmClose}>
                    <DialogTitle>Confirm DeleteId</DialogTitle>
                    <DialogContent>Are you sure you want to delete this Type?</DialogContent>
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
                    <DialogTitle>Update Type</DialogTitle>
                    <DialogContent>
                        <TextField
                            name="name"
                            type="text"
                            value={editType.name || ''}
                            onChange={handleChangeEdit}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseEdit} color="primary">
                            Cancel
                        </Button>
                        <Button color="primary" variant="contained" onClick={handleEditType}>
                            Update
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>

        </section>
    )
}

export default Type;