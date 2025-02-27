import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// ✅ Fungsi Fetch Data User
const fetchUser = async () => {
  const response = await axios.get(`${API_URL}/auth/register`);
  // console.log(response, "resss");
  return response.data?.data || [];
};

export const useUser = () => {
  const queryClient = useQueryClient();

  // ✅ Fetch data User dengan useQuery (React Query v5)
  const {
    data: dataUser,
    isLoading: isLoadingUser,
    isError: isErrorUser,
  } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
  });

  // ✅ Tambah User (Mutation)
  const tambahUser = useMutation({
    mutationFn: async (newData) => {
      const response = await axios.post(`${API_URL}/auth/register`, newData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  // ✅ Edit User (Mutation)
  const editUser = useMutation({
    mutationFn: async ({ id, ...UserBaru }) => {
      console.log({ id, ...UserBaru })
      await axios.put(`${API_URL}/auth/${id}`, UserBaru);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]); // Refresh data setelah edit
    },
  });

  // ✅ Hapus User (Mutation)
  const hapusUser = useMutation({
    mutationFn: async (id) => {
      await axios.delete(`${API_URL}/auth/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  return {
    dataUser,
    isLoadingUser,
    isErrorUser,
    tambahUser,
    editUser,
    hapusUser,
  };
};
