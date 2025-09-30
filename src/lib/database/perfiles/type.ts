export const PERFIL_ROL = [
	'Militante',
	'Secretario',
	'Secretaria',
	'Abogado',
	'Administrador',
	'Comando'
] as const;

export type PerfilRol = (typeof PERFIL_ROL)[number];

export interface Perfil {
	id_user: string;
	nombres?: string | null;
	apellidos?: string | null;
	email?: string | null;
	estado?: string | null;
	dni?: string | null;
	rol?: PerfilRol | null;
	provincia?: string | null;
	distrito?: string | null;
	whatsapp?: string | null;
	token?: string | null;
	token_revocado?: boolean | null;
	created_at?: string;
	updated_at: string;
}
