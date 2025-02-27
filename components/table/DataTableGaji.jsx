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
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useGaji } from "../../utils/hooks/useGaji";
import { useJabatan } from "../../utils/hooks/useJabatan";

const statusKeGajianOptions = ["Tetap", "Kontrak", "Magang"];

const DataTableGaji = ({ setData }) => {
  const { data, isLoading, isError, tambahGaji, editGaji, hapusGaji } =
    useGaji();
  const { dataJabatan, isLoadingJabatan, isErrorJabatan } = useJabatan();
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
        nip: "",
        nama_lengkap: "",
        tempat_lahir: "",
        tanggal_lahir: null,
        jenis_kelamin: "",
        alamat: "",
        no_telp: "",
        email: "",
        status_keGajian: "",
        id_jabatan: null,
        tanggal_masuk: null,
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
      editGaji.mutate(
        { id: selectedRow.id_Gaji, ...formData },
        { onSuccess: handleCloseDialog }
      );
    } else {
      tambahGaji.mutate(formData, { onSuccess: handleCloseDialog });
    }
  };

  const handleDelete = () => {
    hapusGaji.mutate(selectedRow.id_Gaji, {
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
        Tambah Gaji
      </Button>

      <TableContainer sx={{ maxHeight: "400px", overflowY: "auto" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>NIP</TableCell>
              <TableCell>Nama</TableCell>
              <TableCell>Jabatan</TableCell>
              <TableCell>Cuti</TableCell>
              <TableCell>Tanggal Masuk</TableCell>
              <TableCell>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              ?.map((row, index) => (
                <TableRow key={row.id_Gaji} sx={{ backgroundColor: "#f9f9f9" }}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row.nip}</TableCell>
                  <TableCell>{row.nama_lengkap}</TableCell>
                  <TableCell>{row.jabatan?.nama_jabatan}</TableCell>
                  <TableCell>{row.status_keGajian}</TableCell>
                  <TableCell>
                    {dayjs(row.tanggal_masuk).format("DD-MM-YYYY")}
                  </TableCell>

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
        count={data?.length}
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
          Apakah Anda yakin ingin menghapus Gaji ini?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirm}>Batal</Button>
          <Button onClick={handleDelete} color="error">
            Hapus
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog Tambah/Edit */}
      <Dialog maxWidth="md" open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{selectedRow ? "Edit Gaji" : "Tambah Gaji"}</DialogTitle>
        <DialogContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <TextField
                label="NIP"
                fullWidth
                margin="dense"
                value={formData.nip}
                onChange={(e) =>
                  setFormData({ ...formData, nip: e.target.value })
                }
              />
              <TextField
                label="Nama Lengkap"
                fullWidth
                margin="dense"
                value={formData.nama_lengkap}
                onChange={(e) =>
                  setFormData({ ...formData, nama_lengkap: e.target.value })
                }
              />
              <TextField
                label="Tempat Lahir"
                fullWidth
                margin="dense"
                value={formData.tempat_lahir}
                onChange={(e) =>
                  setFormData({ ...formData, tempat_lahir: e.target.value })
                }
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Tanggal Lahir"
                  value={
                    formData.tanggal_lahir
                      ? dayjs(formData.tanggal_lahir)
                      : null
                  }
                  onChange={(newValue) =>
                    setFormData({
                      ...formData,
                      tanggal_lahir: newValue
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
                label="Jenis Kelamin"
                fullWidth
                margin="dense"
                value={formData.jenis_kelamin}
                onChange={(e) =>
                  setFormData({ ...formData, jenis_kelamin: e.target.value })
                }
              >
                <MenuItem value="P">Pria</MenuItem>
                <MenuItem value="W">Wanita</MenuItem>
              </TextField>
            </div>

            <div className="space-y-3">
              <TextField
                label="Alamat"
                fullWidth
                margin="dense"
                value={formData.alamat}
                onChange={(e) =>
                  setFormData({ ...formData, alamat: e.target.value })
                }
              />
              <TextField
                label="No. Telepon"
                fullWidth
                margin="dense"
                value={formData.no_telp}
                onChange={(e) =>
                  setFormData({ ...formData, no_telp: e.target.value })
                }
              />
              <TextField
                label="Email"
                fullWidth
                margin="dense"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <Autocomplete
                options={dataJabatan}
                getOptionLabel={(option) => option.nama_jabatan}
                value={
                  dataJabatan?.find((j) => j.id === formData.id_jabatan) || null
                }
                onChange={(e, newValue) =>
                  setFormData({ ...formData, id_jabatan: newValue?.id })
                }
                renderInput={(params) => (
                  <TextField {...params} label="Jabatan" margin="dense" />
                )}
              />
              <TextField
                select
                label="Status KeGajian"
                fullWidth
                margin="dense"
                value={formData.status_keGajian}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    status_keGajian: e.target.value,
                  })
                }
              >
                {statusKeGajianOptions.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </TextField>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Tanggal Lahir"
                  value={
                    formData.tanggal_masuk
                      ? dayjs(formData.tanggal_masuk)
                      : null
                  }
                  onChange={(newValue) =>
                    setFormData({
                      ...formData,
                      tanggal_masuk: newValue
                        ? newValue.format("YYYY-MM-DD")
                        : "",
                    })
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      margin="dense"
                      sx={{ width: "100%" }}
                    />
                  )}
                />
              </LocalizationProvider>
            </div>
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

export default DataTableGaji;
