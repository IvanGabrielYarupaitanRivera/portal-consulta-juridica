import type { Actions } from './$types';
import { UserDB } from '$lib/database/users/db';
import { fail } from '@sveltejs/kit';

export const actions: Actions = {
	login: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		try {
			await UserDB.signIn(email, password, supabase);
			return { success: true, message: 'Inicio de sesión exitoso' };
		} catch (err) {
			return fail(500, {
				success: false,
				message: err instanceof Error ? err.message : 'Error en el servidor'
			});
		}
	}
};
