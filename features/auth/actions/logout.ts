import { api } from "@/lib/api/client";


 export const logoutAction = async () => await api.get(`/tests/logout`);
