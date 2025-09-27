import type { SupabaseClient } from '@supabase/supabase-js';
import { PerfilDB } from '../perfiles/db';
import type { Perfil } from '../perfiles/type';

export const UserDB = {
	async signIn(email: string, password: string, supabase: SupabaseClient) {
		const { error } = await supabase.auth.signInWithPassword({
			email,
			password
		});

		if (error) {
			throw new Error('Error al iniciar sesión: ' + error.message);
		}
	},

	async signUp(
		email: string,
		password: string,
		supabaseAdmin: SupabaseClient,
		nombres: string,
		apellidos: string,
		dni: string,
		rol: string,
		provincia: string,
		distrito: string,
		whatsapp: string
	) {
		const { data, error } = await supabaseAdmin.auth.admin.createUser({
			email,
			password,
			user_metadata: {
				nombres,
				apellidos,
				dni,
				rol
			},
			email_confirm: true
		});

		if (error) {
			throw new Error('Error al crear la cuenta: ' + error.message);
		}

		const perfil: Perfil = {
			id_user: data.user.id,
			nombres,
			apellidos,
			email,
			estado: 'Activo',
			dni,
			rol: 'Militante',
			provincia,
			distrito,
			whatsapp,
			token: crypto.randomUUID(),
			token_revocado: false,
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString()
		};

		await PerfilDB.createPerfil(supabaseAdmin, perfil);
	},

	async signOut(supabase: SupabaseClient) {
		const { error } = await supabase.auth.signOut();
		if (error) {
			throw new Error('Error al cerrar sesión: ' + error.message);
		}
	}
};
