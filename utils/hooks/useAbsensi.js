import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// ✅ Fungsi Fetch Data Absensi
const fetchAbsensi = async () => {
  const response = await axios.get(`${API_URL}/absensi`);
  // console.log(response, "resss");
  return response.data?.data || [];
};

export const useAbsensi = () => {
  const queryClient = useQueryClient();

  // ✅ Fetch data Absensi dengan useQuery (React Query v5)
  const {
    data: dataAbsensi,
    isLoading: isLoadingAbsensi,
    isError: isErrorAbsensi,
  } = useQuery({
    queryKey: ["absensi"],
    queryFn: fetchAbsensi,
  });

  // ✅ Tambah Absensi (Mutation)
  const tambahAbsensi = useMutation({
    mutationFn: async (newData) => {
      const response = await axios.post(`${API_URL}/absensi`, newData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["absensi"] });
    },
  });

  // ✅ Edit Absensi (Mutation)
  const editAbsensi = useMutation({
    mutationFn: async ({ id, ...AbsensiBaru }) => {
      await axios.put(`${API_URL}/absensi/${id}`, AbsensiBaru);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["Absensi"]); // Refresh data setelah edit
    },
  });

  // ✅ Hapus Absensi (Mutation)
  const hapusAbsensi = useMutation({
    mutationFn: async (id) => {
      await axios.delete(`${API_URL}/absensi/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["absensi"] });
    },
  });

  return {
    dataAbsensi,
    isLoadingAbsensi,
    isErrorAbsensi,
    tambahAbsensi,
    editAbsensi,
    hapusAbsensi,
  };
};
