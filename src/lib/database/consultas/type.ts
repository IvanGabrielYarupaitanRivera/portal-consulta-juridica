import type { Perfil } from '../perfiles/type.js';

export const CONSULTA_ESTADO = ['Pendiente', 'Respondida'] as const;

export type ConsultaEstado = (typeof CONSULTA_ESTADO)[number];

export interface Consulta {
	id_consulta: string;
	nombre: string;
	whatsapp?: string | null;
	mensaje?: string | null;
	respuesta?: string | null;
	estado?: ConsultaEstado | null;
	id_abogado?: string | null;
	created_at?: string | null;
	updated_at?: string | null;
	responded_at?: string | null;
}

export interface GetConsulta {
	id_consulta: string;
	nombre: string;
	whatsapp?: string | null;
	mensaje?: string | null;
	respuesta?: string | null;
	estado?: ConsultaEstado | null;
	id_abogado?: Perfil | null;
	created_at?: string | null;
	updated_at?: string | null;
	responded_at?: string | null;
}
