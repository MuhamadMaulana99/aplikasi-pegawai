import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// ✅ Fungsi Fetch Data Gaji
const fetchGaji = async () => {
  const response = await axios.get(`${API_URL}/gaji`);
  //   console.log(response, "resss");
  return response.data || [];
};

export const useGaji = () => {
  const queryClient = useQueryClient();

  // ✅ Fetch data Gaji dengan useQuery (React Query v5)
  const { data, isLoading, isError } = useQuery({
    queryKey: ["gaji"],
    queryFn: fetchGaji,
  });

  // ✅ Tambah Gaji (Mutation)
  const tambahGaji = useMutation({
    mutationFn: async (newData) => {
      const response = await axios.post(`${API_URL}/gaji`, newData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gaji"] });
    },
  });

  // ✅ Edit Gaji (Mutation)
  const editGaji = useMutation({
    mutationFn: async ({ id, ...GajiBaru }) => {
      await axios.put(`${API_URL}/gaji/${id}`, GajiBaru);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["gaji"]); // Refresh data setelah edit
    },
  });

  // ✅ Hapus Gaji (Mutation)
  const hapusGaji = useMutation({
    mutationFn: async (id) => {
      await axios.delete(`${API_URL}/gaji/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gaji"] });
    },
  });

  return { data, isLoading, isError, tambahGaji, editGaji, hapusGaji };
};
