export function tiempoTranscurrido(created_at: string | null | undefined): string {
	if (!created_at) return 'Fecha desconocida';

	const ahora = new Date();
	const fechaCreacion = new Date(created_at);
	const diferenciaMilisegundos = ahora.getTime() - fechaCreacion.getTime();

	const minutos = Math.floor(diferenciaMilisegundos / (1000 * 60));
	const horas = Math.floor(diferenciaMilisegundos / (1000 * 60 * 60));
	const dias = Math.floor(diferenciaMilisegundos / (1000 * 60 * 60 * 24));

	if (minutos < 1) return 'hace un momento';
	if (minutos < 60) return `hace ${minutos} minuto${minutos === 1 ? '' : 's'}`;
	if (horas < 24) return `hace ${horas} hora${horas === 1 ? '' : 's'}`;
	if (dias < 7) return `hace ${dias} día${dias === 1 ? '' : 's'}`;

	return fechaCreacion.toLocaleDateString('es-ES', {
		day: 'numeric',
		month: 'short',
		year: fechaCreacion.getFullYear() !== ahora.getFullYear() ? 'numeric' : undefined
	});
}
