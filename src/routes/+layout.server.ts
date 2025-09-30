import { PerfilDB } from '$lib/database/perfiles/db';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals: { safeGetSession, supabase }, cookies }) => {
	const { user } = await safeGetSession();

	let rol = null;
	if (user?.id) {
		rol = await PerfilDB.readRolByIdUsuario(supabase, user.id);
	}

	return { rol, user, cookies: cookies.getAll() };
};
