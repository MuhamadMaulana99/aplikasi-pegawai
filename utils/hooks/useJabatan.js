import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// ✅ Fungsi Fetch Data Jabatan
const fetchJabatan = async () => {
  const response = await axios.get(`${API_URL}/jabatan`);
  // console.log(response, "resss");
  return response.data?.data || [];
};

export const useJabatan = () => {
  const queryClient = useQueryClient();

  // ✅ Fetch data Jabatan dengan useQuery (React Query v5)
  const {
    data: dataJabatan,
    isLoading: isLoadingJabatan,
    isError: isErrorJabatan,
  } = useQuery({
    queryKey: ["jabatan"],
    queryFn: fetchJabatan,
  });

  // ✅ Tambah Jabatan (Mutation)
  const tambahJabatan = useMutation({
    mutationFn: async (newData) => {
      const response = await axios.post(`${API_URL}/jabatan`, newData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jabatan"] });
    },
  });

  // ✅ Edit Jabatan (Mutation)
  const editJabatan = useMutation({
    mutationFn: async ({ id, ...JabatanBaru }) => {
      await axios.put(`${API_URL}/jabatan/${id}`, JabatanBaru);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["jabatan"]); // Refresh data setelah edit
    },
  });

  // ✅ Hapus Jabatan (Mutation)
  const hapusJabatan = useMutation({
    mutationFn: async (id) => {
      await axios.delete(`${API_URL}/jabatan/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jabatan"] });
    },
  });

  return {
    dataJabatan,
    isLoadingJabatan,
    isErrorJabatan,
    tambahJabatan,
    editJabatan,
    hapusJabatan,
  };
};
