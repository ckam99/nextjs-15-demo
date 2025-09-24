export interface User {
  id: number | string;
  first_name: string;
  last_name: string;
  email: string;
  birthday?: string;
  phone?: string;

  permissions: Permission[];
}

export interface Permission {
  perm: string;
  description: string;
}
