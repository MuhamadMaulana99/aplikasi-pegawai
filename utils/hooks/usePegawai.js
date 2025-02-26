import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// ✅ Fungsi Fetch Data Pegawai
const fetchPegawai = async () => {
  const response = await axios.get(`${API_URL}/pegawai/getAll`);
  //   console.log(response, "resss");
  return response.data || [];
};

export const usePegawai = () => {
  const queryClient = useQueryClient();

  // ✅ Fetch data pegawai dengan useQuery (React Query v5)
  const { data, isLoading, isError } = useQuery({
    queryKey: ["pegawai"],
    queryFn: fetchPegawai,
  });

  // ✅ Tambah Pegawai (Mutation)
  const tambahPegawai = useMutation({
    mutationFn: async (newData) => {
      const response = await axios.post(`${API_URL}/pegawai`, newData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pegawai"] });
    },
  });

  // ✅ Edit Pegawai (Mutation)
  const editPegawai = useMutation({
    mutationFn: async ({ id, ...pegawaiBaru }) => {
      await axios.put(`/api/pegawai/${id}`, pegawaiBaru);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["pegawai"]); // Refresh data setelah edit
    },
  });

  // ✅ Hapus Pegawai (Mutation)
  const hapusPegawai = useMutation({
    mutationFn: async (id) => {
      await axios.delete(`${API_URL}/pegawai/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pegawai"] });
    },
  });

  return { data, isLoading, isError, tambahPegawai, editPegawai, hapusPegawai };
};
