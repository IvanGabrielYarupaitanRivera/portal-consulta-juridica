import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { ConsultaDB } from '$lib/database/consultas/db';

export const load: PageServerLoad = async ({ locals }) => {
	const { supabase, user } = locals;

	if (!user) {
		throw error(401, 'No autorizado');
	}

	try {
		const consultas = await ConsultaDB.readConsultas(supabase);

		return {
			consultas
		};
	} catch (err) {
		console.error('Error loading consultas:', err);
		throw error(500, 'Error al cargar las consultas');
	}
};
