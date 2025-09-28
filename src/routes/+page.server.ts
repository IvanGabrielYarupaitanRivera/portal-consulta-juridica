import { ConsultaDB } from '$lib/database/consultas/db';
import type { Consulta } from '$lib/database/consultas/type';
import { UserDB } from '$lib/database/users/db';
import { fail, type Actions } from '@sveltejs/kit';

export const actions = {
	createConsulta: async ({ request, locals }) => {
		const { supabase } = locals;
		const formData = await request.formData();

		const consulta: Consulta = {
			id_consulta: crypto.randomUUID(),
			nombre: formData.get('nombre') as string,
			whatsapp: formData.get('whatsapp') as string | null,
			mensaje: formData.get('mensaje') as string | null,
			respuesta: 'Sin respuesta',
			estado: 'Pendiente',
			id_abogado: null,
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString(),
			responded_at: null
		};

		try {
			await ConsultaDB.createConsulta(supabase, consulta);
			return { success: true, message: 'Su consulta ha sido registrada exitosamente.' };
		} catch (err) {
			return fail(500, {
				success: false,
				message: err instanceof Error ? err.message : 'Error al crear la consulta.'
			});
		}
	},

	logout: async ({ locals: { supabase } }) => {
		console.log('Logging out...');
		try {
			await UserDB.signOut(supabase);
			return { success: true, message: 'Sesión cerrada' };
		} catch (err) {
			return fail(500, {
				success: false,
				message: err instanceof Error ? err.message : 'Error en el servidor'
			});
		}
	}
} satisfies Actions;
