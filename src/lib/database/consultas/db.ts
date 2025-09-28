import type { SupabaseClient } from '@supabase/supabase-js';
import type { Consulta, GetConsulta } from './type.js';

export const ConsultaDB = {
	async createConsulta(supabase: SupabaseClient, consulta: Consulta) {
		const { data, error } = await supabase.from('consultas').insert(consulta).select().single();

		if (error) {
			throw new Error('Error al crear la consulta: ' + error.message);
		}

		return data as Consulta;
	},

	async readConsultaById(supabase: SupabaseClient, idConsulta: string) {
		const { data, error } = await supabase
			.from('consultas')
			.select(
				`
                *,
                id_abogado:perfiles(*)
            `
			)
			.eq('id_consulta', idConsulta)
			.single();

		if (error) {
			throw new Error('Error al leer la consulta: ' + error.message);
		}

		return data as GetConsulta;
	},

	async readConsultas(supabase: SupabaseClient) {
		const { data, error } = await supabase
			.from('consultas')
			.select(
				`
                *,
                id_abogado:perfiles(*)
            `
			)
			.order('created_at', { ascending: false });

		if (error) {
			throw new Error('Error al leer las consultas: ' + error.message);
		}

		return data as GetConsulta[];
	},

	async updateConsulta(supabase: SupabaseClient, consulta: Consulta) {
		const { data, error } = await supabase
			.from('consultas')
			.update(consulta)
			.eq('id_consulta', consulta.id_consulta)
			.select()
			.single();

		if (error) {
			throw new Error('Error al actualizar la consulta: ' + error.message);
		}

		return data as Consulta;
	},

	async responderConsulta(supabase: SupabaseClient, idConsulta: string, respuesta: string) {
		const { data, error } = await supabase
			.from('consultas')
			.update({
				respuesta,
				estado: 'Respondida',
				responded_at: new Date().toISOString()
			})
			.eq('id_consulta', idConsulta)
			.select()
			.single();

		if (error) {
			throw new Error('Error al responder consulta: ' + error.message);
		}

		return data as Consulta;
	},

	async readConsultasPendientes(supabase: SupabaseClient) {
		const { data, error } = await supabase
			.from('consultas')
			.select(
				`
                *,
                id_abogado:perfiles(*)
            `
			)
			.eq('estado', 'Pendiente')
			.order('created_at', { ascending: true });

		if (error) {
			throw new Error('Error al leer consultas pendientes: ' + error.message);
		}

		return data as GetConsulta[];
	},

	async deleteConsulta(supabase: SupabaseClient, idConsulta: string) {
		const { data, error } = await supabase
			.from('consultas')
			.delete()
			.eq('id_consulta', idConsulta)
			.select()
			.single();
		if (error) {
			throw new Error('Error al eliminar la consulta: ' + error.message);
		}
		return data as Consulta;
	}
};
