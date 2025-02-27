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
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useAbsensi } from "../../utils/hooks/useAbsensi";
import { MobileTimePicker } from "@mui/x-date-pickers";
import { usePegawai } from "../../utils/hooks/usePegawai";

dayjs.extend(utc);
dayjs.extend(timezone);

const statusKepegawaianOptions = ["Tetap", "Kontrak", "Magang"];

const DataTableAbsensi = () => {
  const { data, isLoading, isError } = usePegawai();
  const {
    dataAbsensi,
    isLoadingAbsensi,
    isErrorAbsensi,
    tambahAbsensi,
    editAbsensi,
    hapusAbsensi,
  } = useAbsensi();
  // console.log(dataAbsensi, "dataAbsensi");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDialog, setOpenDialog] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [formData, setFormData] = useState({});
  // console.log(formData, "formData");

  const handleOpenDialog = (row = null) => {
    setSelectedRow(row);
    const prevRow = {
      id_pegawai: row?.id_pegawai,
      tanggal: row?.id_pegawai,
      jam_masuk: row?.id_pegawai,
      jam_keluar: row?.id_pegawai,
      status: row?.id_pegawai,
      is_tanggal_merah: row?.id_pegawai,
      jumlah_adon: row?.id_pegawai,
    };
    // setFormData({
    //   ...row,
    //   jam_masuk: row?.jam_masuk
    //     ? dayjs(row.jam_masuk, "HH:mm:ss").format("HH:mm")
    //     : "",
    //   jam_keluar: row?.jam_keluar
    //     ? dayjs(row.jam_keluar, "HH:mm:ss").format("HH:mm")
    //     : "",
    // });

    setFormData(
      row || {
        id_pegawai: "",
        tanggal: dayjs().format("YYYY-MM-DD"),
        jam_masuk: null,
        jam_keluar: null,
        status: "Hadir",
        is_tanggal_merah: false,
        jumlah_adon: "",
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

  // console.log(body, "body");
  const handleSave = () => {
    const body = {
      id_pegawai: formData?.id_pegawai,
      tanggal: formData?.tanggal,
      jam_masuk: formData?.jam_masuk,
      jam_keluar: formData?.jam_keluar,
      status: formData?.status,
      is_tanggal_merah: formData?.is_tanggal_merah,
      jumlah_adon: formData?.jumlah_adon,
    };
    if (selectedRow) {
      editAbsensi.mutate(
        { id: selectedRow.id_absensi, ...body },
        { onSuccess: handleCloseDialog }
      );
    } else {
      tambahAbsensi.mutate(body, { onSuccess: handleCloseDialog });
    }
  };

  const handleDelete = () => {
    hapusAbsensi.mutate(selectedRow.id_absensi, {
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
        Tambah Absensi
      </Button>

      <TableContainer sx={{ maxHeight: "400px", overflowY: "auto" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Nama</TableCell>
              <TableCell>Tanggal</TableCell>
              <TableCell>Jam Masuk</TableCell>
              <TableCell>Jam Keluar</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Tanggal Merah</TableCell>
              <TableCell>Jumlah Adon</TableCell>
              <TableCell>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataAbsensi
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              ?.map((row, index) => (
                <TableRow
                  key={row.id_pegawai}
                  sx={{ backgroundColor: "#f9f9f9" }}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row.pegawai?.nama_lengkap}</TableCell>
                  <TableCell>{row.tanggal}</TableCell>
                  <TableCell>{row.jam_masuk}</TableCell>
                  <TableCell>{row.jam_keluar}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>{row.is_tanggal_merah ? "Ya" : "Tidak"}</TableCell>
                  <TableCell>{row.jumlah_adon}</TableCell>

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
        count={dataAbsensi?.length}
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
      <Dialog maxWidth="md" open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {selectedRow ? "Edit Pegawai" : "Tambah Pegawai"}
        </DialogTitle>
        <DialogContent className="">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3 mt-3">
              <Autocomplete
                options={data}
                getOptionLabel={(option) => option.nama_lengkap}
                value={
                  data?.find((j) => j.id_pegawai === formData.id_pegawai) ||
                  null
                }
                onChange={(e, newValue) =>
                  setFormData({ ...formData, id_pegawai: newValue?.id_pegawai })
                }
                renderInput={(params) => (
                  <TextField {...params} label="Nama Pegawai" margin="dense" />
                )}
              />

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileTimePicker
                  label="Jam Masuk"
                  value={
                    formData.jam_masuk
                      ? dayjs(formData.jam_masuk, "HH:mm")
                      : null
                  }
                  onChange={(newValue) =>
                    setFormData({
                      ...formData,
                      jam_masuk: newValue ? newValue.format("HH:mm") : "", // Simpan dalam format string "HH:mm"
                    })
                  }
                  ampm={false} // Format 24 jam
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      margin="dense"
                      error={!formData.jam_masuk} // Beri error jika kosong
                      helperText={
                        !formData.jam_masuk ? "Jam masuk harus diisi" : ""
                      }
                    />
                  )}
                />
              </LocalizationProvider>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileTimePicker
                  label="Jam Keluar"
                  value={
                    formData.jam_keluar
                      ? dayjs(formData.jam_keluar, "HH:mm")
                      : null
                  }
                  onChange={(newValue) =>
                    setFormData({
                      ...formData,
                      jam_keluar: newValue ? newValue.format("HH:mm") : "", // Simpan dalam format string "HH:mm"
                    })
                  }
                  ampm={false} // Format 24 jam
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      margin="dense"
                      error={!formData.jam_keluar} // Validasi jika kosong
                      helperText={
                        !formData.jam_keluar ? "Jam keluar harus diisi" : ""
                      }
                    />
                  )}
                />
              </LocalizationProvider>
            </div>

            <div className="space-y-3 mt-5">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Tanggal"
                  value={formData.tanggal ? dayjs(formData.tanggal) : null}
                  onChange={(newValue) =>
                    setFormData({
                      ...formData,
                      tanggal: newValue ? newValue.format("YYYY-MM-DD") : "",
                    })
                  }
                  renderInput={(params) => (
                    <TextField {...params} fullWidth margin="dense" />
                  )}
                />
              </LocalizationProvider>
              <TextField
                select
                label="Status Kehadiran"
                fullWidth
                margin="dense"
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
              >
                <MenuItem value="Izin">Izin</MenuItem>
                <MenuItem value="Sakit">Sakit</MenuItem>
                <MenuItem value="Hadir">Hadir</MenuItem>
                <MenuItem value="Alpha">Alpha</MenuItem>
                <MenuItem value="Telat">Telat</MenuItem>
                <MenuItem value="Lembur">Lembur</MenuItem>
              </TextField>
              <TextField
                select
                label="Tanggal Merah"
                fullWidth
                margin="dense"
                value={formData.is_tanggal_merah}
                onChange={(e) =>
                  setFormData({ ...formData, is_tanggal_merah: e.target.value })
                }
              >
                <MenuItem value={true}>Ya</MenuItem>
                <MenuItem value={false}>Tidak</MenuItem>
              </TextField>
              <TextField
                label="Jumlah Adon"
                fullWidth
                margin="dense"
                type="number"
                value={formData.jumlah_adon}
                onChange={(e) =>
                  setFormData({ ...formData, jumlah_adon: e.target.value })
                }
              />
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

export default DataTableAbsensi;
