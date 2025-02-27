import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// ✅ Fungsi Fetch Data Cuti
const fetchCuti = async () => {
  const response = await axios.get(`${API_URL}/cuti`);
  // console.log(response, "resss");
  return response.data?.data || [];
};

export const useCuti = () => {
  const queryClient = useQueryClient();

  // ✅ Fetch data Cuti dengan useQuery (React Query v5)
  const {
    data: dataCuti,
    isLoading: isLoadingCuti,
    isError: isErrorCuti,
  } = useQuery({
    queryKey: ["cuti"],
    queryFn: fetchCuti,
  });

  // ✅ Tambah Cuti (Mutation)
  const tambahCuti = useMutation({
    mutationFn: async (newData) => {
      const response = await axios.post(`${API_URL}/cuti`, newData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cuti"] });
    },
  });

  // ✅ Edit Cuti (Mutation)
  const editCuti = useMutation({
    mutationFn: async ({ id, ...CutiBaru }) => {
      console.log({ id, ...CutiBaru })
      await axios.put(`${API_URL}/cuti/${id}`, CutiBaru);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["cuti"]); // Refresh data setelah edit
    },
  });

  // ✅ Hapus Cuti (Mutation)
  const hapusCuti = useMutation({
    mutationFn: async (id) => {
      await axios.delete(`${API_URL}/cuti/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cuti"] });
    },
  });

  return {
    dataCuti,
    isLoadingCuti,
    isErrorCuti,
    tambahCuti,
    editCuti,
    hapusCuti,
  };
};
