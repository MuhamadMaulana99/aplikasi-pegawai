import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  TextField,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const TableMUI = ({ columns, data, onAdd, onEdit, onDelete }) => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState(columns[0]?.id || "");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filter, setFilter] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [formData, setFormData] = useState({});

  // Sorting data
  const handleRequestSort = (property) => {
    const isAscending = orderBy === property && order === "asc";
    setOrder(isAscending ? "desc" : "asc");
    setOrderBy(property);
  };

  // Mengurutkan data berdasarkan kolom
  const sortedRows = [...data].sort((a, b) => {
    if (a[orderBy] < b[orderBy]) return order === "asc" ? -1 : 1;
    if (a[orderBy] > b[orderBy]) return order === "asc" ? 1 : -1;
    return 0;
  });

  // Filter data berdasarkan pencarian
  const filteredRows = sortedRows.filter((row) =>
    columns.some((col) =>
      String(row[col.id]).toLowerCase().includes(filter.toLowerCase())
    )
  );

  // Fungsi buka/tutup dialog form tambah/edit
  const handleOpenDialog = (row = null) => {
    setSelectedRow(row);
    setFormData(row || {});
    setOpenDialog(true);
  };
  const handleCloseDialog = () => setOpenDialog(false);

  // Fungsi buka/tutup dialog konfirmasi hapus
  const handleOpenConfirm = (row) => {
    setSelectedRow(row);
    setOpenConfirm(true);
  };
  const handleCloseConfirm = () => setOpenConfirm(false);

  // Simpan Data
  const handleSave = () => {
    if (selectedRow) {
      onEdit(formData);
    } else {
      onAdd(formData);
    }
    handleCloseDialog();
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", padding: 2 }}>
      <TextField
        label="Cari Data"
        variant="outlined"
        fullWidth
        margin="dense"
        onChange={(e) => setFilter(e.target.value)}
      />

      <Button variant="contained" color="primary" onClick={() => handleOpenDialog()}>
        Tambah Data
      </Button>

      <TableContainer sx={{ maxHeight: "400px", overflowY: "auto" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell key={col.id}>
                  <TableSortLabel
                    active={orderBy === col.id}
                    direction={order}
                    onClick={() => handleRequestSort(col.id)}
                  >
                    {col.label}
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow
                  key={index}
                  sx={{
                    backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#ffffff",
                  }}
                >
                  {columns.map((col) => (
                    <TableCell key={col.id}>{row[col.id]}</TableCell>
                  ))}
                  <TableCell>
                    <Button size="small" onClick={() => handleOpenDialog(row)}>
                      Edit
                    </Button>
                    <Button size="small" color="error" onClick={() => handleOpenConfirm(row)}>
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
        count={filteredRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(e, newPage) => setPage(newPage)}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
      />

      {/* Dialog Tambah/Edit */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{selectedRow ? "Edit Data" : "Tambah Data"}</DialogTitle>
        <DialogContent>
          {columns.map((col) => (
            <TextField
              key={col.id}
              label={col.label}
              fullWidth
              margin="dense"
              value={formData[col.id] || ""}
              onChange={(e) => setFormData({ ...formData, [col.id]: e.target.value })}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Batal</Button>
          <Button onClick={handleSave} variant="contained">
            Simpan
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog Konfirmasi Hapus */}
      <Dialog open={openConfirm} onClose={handleCloseConfirm}>
        <DialogTitle>Konfirmasi</DialogTitle>
        <DialogContent>Apakah Anda yakin ingin menghapus data ini?</DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirm}>Batal</Button>
          <Button
            onClick={() => {
              onDelete(selectedRow);
              handleCloseConfirm();
            }}
            variant="contained"
            color="error"
          >
            Hapus
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default TableMUI;
