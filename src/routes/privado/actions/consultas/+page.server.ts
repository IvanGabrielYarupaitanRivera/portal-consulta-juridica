import { ConsultaDB } from '$lib/database/consultas/db';
import type { Consulta } from '$lib/database/consultas/type';
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

			await fetch('https://flow.junin360.com/webhook/b66c78e6-1438-479a-9873-9e4e9439c0ed', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					nombre: consulta.nombre,
					whatsapp: consulta.whatsapp,
					consulta: consulta.mensaje
				})
			});

			return { success: true, message: 'Su consulta ha sido registrada exitosamente.' };
		} catch (err) {
			return fail(500, {
				success: false,
				message: err instanceof Error ? err.message : 'Error al crear la consulta.'
			});
		}
	},

	deleteConsulta: async ({ request, locals }) => {
		const { supabase } = locals;
		const formData = await request.formData();

		const id_consulta = formData.get('id_consulta') as string;

		try {
			await ConsultaDB.deleteConsulta(supabase, id_consulta);
			return { success: true, message: 'Consulta eliminada exitosamente.' };
		} catch (err) {
			return fail(500, {
				success: false,
				message: err instanceof Error ? err.message : 'Error al eliminar la consulta.'
			});
		}
	},

	responderConsulta: async ({ request, locals }) => {
		const { supabase } = locals;
		const formData = await request.formData();

		const id_consulta = formData.get('id_consulta') as string;
		const respuesta = formData.get('respuesta') as string;

		try {
			await ConsultaDB.responderConsulta(supabase, id_consulta, respuesta);
			return { success: true, message: 'Respuesta enviada exitosamente.' };
		} catch (err) {
			return fail(500, {
				success: false,
				message: err instanceof Error ? err.message : 'Error al responder la consulta.'
			});
		}
	}
} satisfies Actions;
