import type { SupabaseClient } from '@supabase/supabase-js';
import type { Perfil, PerfilRol } from './type';

export const PerfilDB = {
	async createPerfil(supabase: SupabaseClient, perfil: Perfil) {
		const { data, error } = await supabase.from('perfiles').insert(perfil);

		if (error) {
			throw new Error('Error al crear el perfil: ' + error.message);
		}

		return data;
	},

	async readPerfilById(supabase: SupabaseClient, idPerfil: string) {
		const { data, error } = await supabase
			.from('perfiles')
			.select('*')
			.eq('id_user', idPerfil)
			.single();

		if (error) {
			throw new Error('Error al leer el perfil: ' + error.message);
		}

		return data as Perfil;
	},

	async readRolByIdUsuario(supabase: SupabaseClient, id_usuario: string) {
		const { data, error } = await supabase
			.from('perfiles')
			.select('rol')
			.eq('id_user', id_usuario)
			.single();
		if (error) {
			throw new Error('Error al leer el rol del usuario: ' + error.message);
		}
		return data?.rol as PerfilRol;
	}
};
