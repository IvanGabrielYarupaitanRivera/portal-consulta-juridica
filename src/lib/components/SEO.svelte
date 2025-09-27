<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

	interface SEOProps {
		title?: string;
		description?: string;
		keywords?: string;
		author?: string;
		type?: 'website' | 'article' | 'profile';
		image?: string;
		url?: string;
		siteName?: string;
		locale?: string;
		noindex?: boolean;
		nofollow?: boolean;
	}

	let {
		title = 'Portal de Consulta Jurídica',
		description = 'Obtén asesoramiento legal rápido y sencillo. Haz preguntas sobre temas jurídicos sin necesidad de registrarte y recibe respuestas claras y concisas.',
		keywords = 'consulta jurídica, asesoramiento legal, preguntas legales, derecho, abogados, Perú, consultas gratuitas',
		author = 'Portal de Consulta Jurídica',
		type = 'website',
		image = 'https://portal-consulta-juridica.vercel.app/images/portal-juridico-og.jpg',
		url = 'https://portal-consulta-juridica.vercel.app/',
		siteName = 'Portal de Consulta Jurídica',
		locale = 'es_PE',
		noindex = false,
		nofollow = false
	}: SEOProps = $props();

	// Construir el robots content
	const robotsContent = [
		...(noindex ? ['noindex'] : ['index']),
		...(nofollow ? ['nofollow'] : ['follow'])
	].join(', ');

	// Datos estructurados JSON-LD para portal de consulta jurídica
	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: 'Portal de Consulta Jurídica',
		description: description,
		url: url,
		potentialAction: {
			'@type': 'SearchAction',
			target: url + '/search?q={search_term_string}',
			'query-input': 'required name=search_term_string'
		},
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': url
		},
		publisher: {
			'@type': 'Organization',
			name: 'Portal de Consulta Jurídica',
			url: url
		}
	};
</script>

<svelte:head>
	<!-- Título -->
	<title>{title}</title>

	<!-- Meta tags básicos -->
	<meta name="description" content={description} />
	<meta name="keywords" content={keywords} />
	<meta name="author" content={author} />
	<meta name="robots" content={robotsContent} />
	<meta name="googlebot" content={robotsContent} />

	<!-- Meta tags de idioma y región -->
	<meta name="language" content="Spanish" />
	<meta name="geo.region" content="PE" />
	<meta name="geo.placename" content="Perú" />
	<meta name="geo.position" content="-12.0464;-77.0428" />
	<meta name="ICBM" content="-12.0464, -77.0428" />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content={type} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={image} />
	<meta property="og:url" content={url} />
	<meta property="og:site_name" content={siteName} />
	<meta property="og:locale" content={locale} />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={image} />

	<!-- Meta tags adicionales para SEO legal -->
	<meta name="legal-portal" content="Portal de Consulta Jurídica" />
	<meta name="service-type" content="consulta jurídica" />
	<meta name="target-audience" content="público general" />

	<!-- Canonical URL -->
	<link rel="canonical" href={url} />

	<!-- Datos estructurados JSON-LD -->
	{@html `<script type="application/ld+json">${JSON.stringify(structuredData)}</script>`}

	<!-- Favicon y iconos -->
	<link rel="icon" href={favicon} type="image/svg+xml" />
	<link rel="apple-touch-icon" href={favicon} />
	<meta name="theme-color" content="#ffffff" />
</svelte:head>
