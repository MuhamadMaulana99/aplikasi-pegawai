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
import { useCuti } from "../../utils/hooks/useCuti";
import { usePegawai } from "../../utils/hooks/usePegawai";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";

const DataTableCuti = () => {
  const { data, isLoading, isError } = usePegawai();
  const {
    dataCuti,
    isLoadingCuti,
    isErrorCuti,
    tambahCuti,
    editCuti,
    hapusCuti,
  } = useCuti();
  // console.log(dataCuti, "dataCuti");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDialog, setOpenDialog] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [formData, setFormData] = useState({});
  console.log(formData)

  const handleOpenDialog = (row = null) => {
    setSelectedRow(row);
    setFormData(
      row || {
        jenis_cuti: "",
        status: "",
        tanggal_mulai: "",
        tanggal_selesai: "",
        keterangan: ''
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
      editCuti.mutate(
        { id: selectedRow.id_cuti, ...formData },
        { onSuccess: handleCloseDialog }
      );
    } else {
      tambahCuti.mutate(formData, { onSuccess: handleCloseDialog });
    }
  };

  const handleDelete = () => {
    hapusCuti.mutate(selectedRow.id_cuti, {
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
        Tambah Cuti
      </Button>

      <TableContainer sx={{ maxHeight: "400px", overflowY: "auto" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Nama</TableCell>
              <TableCell>Mulai</TableCell>
              <TableCell>Selesai</TableCell>
              <TableCell>Jenis Cuti</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Keterangan</TableCell>
              <TableCell>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataCuti
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              ?.map((row, index) => (
                <TableRow
                  key={row.id_pegawai}
                  sx={{ backgroundColor: "#f9f9f9" }}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row.pegawai?.nama_lengkap}</TableCell>
                  <TableCell>{row.tanggal_mulai}</TableCell>
                  <TableCell>{row.tanggal_selesai}</TableCell>
                  <TableCell>{row.jenis_cuti}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>{row.keterangan}</TableCell>

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
        count={dataCuti?.length}
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
      <Dialog maxWidth="lg" open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{selectedRow ? "Edit Cuti" : "Tambah Cuti"}</DialogTitle>
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
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Tanggal Mulai"
                value={
                  formData.tanggal_mulai ? dayjs(formData.tanggal_mulai) : null
                }
                onChange={(newValue) =>
                  setFormData({
                    ...formData,
                    tanggal_mulai: newValue
                      ? newValue.format("YYYY-MM-DD")
                      : "",
                  })
                }
                renderInput={(params) => (
                  <TextField {...params} fullWidth margin="dense" />
                )}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Tanggal Selesai"
                value={
                  formData.tanggal_selesai
                    ? dayjs(formData.tanggal_selesai)
                    : null
                }
                onChange={(newValue) =>
                  setFormData({
                    ...formData,
                    tanggal_selesai: newValue
                      ? newValue.format("YYYY-MM-DD")
                      : "",
                  })
                }
                renderInput={(params) => (
                  <TextField {...params} fullWidth margin="dense" />
                )}
              />
            </LocalizationProvider>
            <TextField
              select
              label="Status"
              fullWidth
              margin="dense"
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
            >
              <MenuItem value="Disetujui">Disetujui</MenuItem>
              <MenuItem value="Ditolak">DiTolak</MenuItem>
              <MenuItem value="Diajukan">Diajukan</MenuItem>
            </TextField>
            <TextField
              select
              label="Jenis Cuti"
              fullWidth
              margin="dense"
              value={formData.jenis_cuti}
              onChange={(e) =>
                setFormData({ ...formData, jenis_cuti: e.target.value })
              }
            >
              <MenuItem value="Tahunan">Tahunan</MenuItem>
              <MenuItem value="Sakit">Sakit</MenuItem>
              <MenuItem value="Melahirkan">Melahirkan</MenuItem>
              <MenuItem value="Lainnya">Lainnya</MenuItem>
            </TextField>
            <TextField
              label="Alasan"
              fullWidth
              multiline
              maxRows={4}
              margin="dense"
              value={formData.keterangan}
              onChange={(e) =>
                setFormData({ ...formData, keterangan: e.target.value })
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

export default DataTableCuti;
