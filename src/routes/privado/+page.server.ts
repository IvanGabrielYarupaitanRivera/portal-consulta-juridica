import type { Actions } from '@sveltejs/kit';
import { UserDB } from '$lib/database/users/db';
import { fail } from '@sveltejs/kit';

export const actions: Actions = {
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
};
