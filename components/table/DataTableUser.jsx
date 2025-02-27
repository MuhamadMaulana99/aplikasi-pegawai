import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Autocomplete,
  MenuItem,
} from "@mui/material";
import { useUser } from "../../utils/hooks/useUser";
import { usePegawai } from "../../utils/hooks/usePegawai";

const DataTableUser = () => {
  const { data, isLoading, isError } = usePegawai();
  const {
    dataUser,
    isLoadingUser,
    isErrorUser,
    tambahUser,
    editUser,
    hapusUser,
  } = useUser();
  // console.log(dataUser, "dataUser");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDialog, setOpenDialog] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [formData, setFormData] = useState({});
  // console.log(formData);

  const handleOpenDialog = (row = null) => {
    console.log(row);
    setSelectedRow(row);
    const prevRow = {
      id: row?.id_user,
      id_pegawai: row?.pegawai?.id_pegawai,
      username: row?.username,
      role: row?.role,
    };
    console.log(prevRow, "prevRow");
    setFormData(
      prevRow || {
        id_pegawai: null,
        username: "",
        role: "",
      }
    );
    setOpenDialog(true);
  };

  const handleCloseDialog = () => setOpenDialog(false);

  const handleOpenConfirm = (row) => {
    setSelectedRow(row);
    setOpenConfirm(true);
  };
  const handleCloseConfirm = () => setOpenConfirm(false);

  const handleSave = () => {
    if (selectedRow) {
      editUser.mutate(
        { id: selectedRow.id_user, ...formData },
        { onSuccess: handleCloseDialog }
      );
    } else {
      tambahUser.mutate(formData, { onSuccess: handleCloseDialog });
    }
  };

  const handleDelete = () => {
    hapusUser.mutate(selectedRow.id_user, {
      onSuccess: handleCloseConfirm,
    });
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", padding: 2 }}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOpenDialog()}
      >
        Tambah User
      </Button>

      <TableContainer sx={{ maxHeight: "400px", overflowY: "auto" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Nama</TableCell>
              <TableCell>Pegawai</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataUser
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              ?.map((row, index) => (
                <TableRow
                  key={row.id_pegawai}
                  sx={{ backgroundColor: "#f9f9f9" }}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row.username}</TableCell>
                  <TableCell>{row.pegawai?.nama_lengkap}</TableCell>
                  <TableCell>{row.role}</TableCell>

                  <TableCell>
                    <Button size="small" onClick={() => handleOpenDialog(row)}>
                      Edit
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      onClick={() => handleOpenConfirm(row)}
                    >
                      Hapus
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={dataUser?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(e, newPage) => setPage(newPage)}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
      />

      <Dialog open={openConfirm} onClose={handleCloseConfirm}>
        <DialogTitle>Konfirmasi</DialogTitle>
        <DialogContent>
          Apakah Anda yakin ingin menghapus pegawai ini?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirm}>Batal</Button>
          <Button onClick={handleDelete} color="error">
            Hapus
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog Tambah/Edit */}
      <Dialog maxWidth="xs" open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{selectedRow ? "Edit User" : "Tambah User"}</DialogTitle>
        <DialogContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Autocomplete
              options={data}
              getOptionLabel={(option) => option.nama_lengkap}
              value={
                data?.find((j) => j.id_pegawai === formData.id_pegawai) || null
              }
              onChange={(e, newValue) =>
                setFormData({ ...formData, id_pegawai: newValue?.id_pegawai })
              }
              renderInput={(params) => (
                <TextField {...params} label="Nama Pegawai" margin="dense" />
              )}
            />
            <TextField
              label="Nama User"
              fullWidth
              margin="dense"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
            <TextField
              select
              label="Role"
              fullWidth
              margin="dense"
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
            >
              <MenuItem value="Pegawai">Pegawai</MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
            </TextField>
          </div>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseDialog}>Batal</Button>
          <Button onClick={handleSave} color="primary">
            Simpan
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default DataTableUser;
