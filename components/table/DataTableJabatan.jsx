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
} from "@mui/material";
import { useJabatan } from "../../utils/hooks/useJabatan";

const DataTableJabatan = () => {
  const {
    dataJabatan,
    isLoadingJabatan,
    isErrorJabatan,
    tambahJabatan,
    editJabatan,
    hapusJabatan,
  } = useJabatan();
  // console.log(dataJabatan, "dataJabatan");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDialog, setOpenDialog] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [formData, setFormData] = useState({});
  // console.log(formData)

  const handleOpenDialog = (row = null) => {
    setSelectedRow(row);
    setFormData(
      row || {
        nama_jabatan: "",
        gaji_pokok: "",
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
      editJabatan.mutate(
        { id: selectedRow.id_jabatan, ...formData },
        { onSuccess: handleCloseDialog }
      );
    } else {
      tambahJabatan.mutate(formData, { onSuccess: handleCloseDialog });
    }
  };

  const handleDelete = () => {
    hapusJabatan.mutate(selectedRow.id_jabatan, {
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
        Tambah Jabatan
      </Button>

      <TableContainer sx={{ maxHeight: "400px", overflowY: "auto" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Jabatan</TableCell>
              <TableCell>GajiPokok</TableCell>
              <TableCell>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataJabatan
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              ?.map((row, index) => (
                <TableRow
                  key={row.id_pegawai}
                  sx={{ backgroundColor: "#f9f9f9" }}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row.nama_jabatan}</TableCell>
                  <TableCell>{row.gaji_pokok}</TableCell>

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
        count={dataJabatan?.length}
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
        <DialogTitle>
          {selectedRow ? "Edit Jabatan" : "Tambah Jabatan"}
        </DialogTitle>
        <DialogContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextField
              label="Nama Jabatan"
              fullWidth
              margin="dense"
              value={formData.nama_jabatan}
              onChange={(e) =>
                setFormData({ ...formData, nama_jabatan: e.target.value })
              }
            />
            <TextField
              label="Gaji Pokok"
              fullWidth
              margin="dense"
              value={formData.gaji_pokok}
              onChange={(e) =>
                setFormData({ ...formData, gaji_pokok: e.target.value })
              }
            />
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

export default DataTableJabatan;
