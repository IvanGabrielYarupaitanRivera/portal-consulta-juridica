// Tipo para un usuario individual
export interface User {
	id: string;
	email: string;
}

// Tipo para la respuesta completa de Supabase Auth
export interface SupabaseUsersResponse {
	users: User[];
	aud: string;
	nextPage: string | null;
	lastPage: number;
	total: number;
}
