<script lang="ts">
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
		title = 'Rony Vejarano Pérez - Candidato a la Alcaldía de Huancayo',
		description = 'Ingeniero civil y candidato a la alcaldía de Huancayo. Comprometido con el bienestar social, servicios básicos de calidad y desarrollo sostenible. Experto en gestión pública con 17 años de experiencia.',
		keywords = 'Rony Vejarano, alcalde Huancayo, candidato Huancayo, Batalla Perú, gestión pública, desarrollo urbano, transparencia, servicios básicos, infraestructura',
		author = 'Rony Vejarano Pérez',
		type = 'website',
		image = 'https://ronyvejarano.pe/images/rony-vejarano-og.jpg',
		url = 'https://ronyvejarano.pe',
		siteName = 'Rony Vejarano Pérez - Oficial',
		locale = 'es_PE',
		noindex = false,
		nofollow = false
	}: SEOProps = $props();

	// Construir el robots content
	const robotsContent = [
		...(noindex ? ['noindex'] : ['index']),
		...(nofollow ? ['nofollow'] : ['follow'])
	].join(', ');

	// Datos estructurados JSON-LD para candidato político
	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: 'Rony Vejarano Pérez',
		jobTitle: 'Candidato a la Alcaldía de Huancayo',
		description: description,
		image: image,
		url: url,
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': url
		},
		sameAs: ['https://www.facebook.com/huancayo.rony.vejarano'],
		address: {
			'@type': 'PostalAddress',
			addressLocality: 'Huancayo',
			addressRegion: 'Junín',
			addressCountry: 'PE'
		},
		affiliation: {
			'@type': 'Organization',
			name: 'Batalla Perú'
		},
		alumniOf: {
			'@type': 'EducationalOrganization',
			name: 'Universidad Nacional del Centro del Perú'
		},
		hasOccupation: {
			'@type': 'Occupation',
			name: 'Ingeniero Civil',
			occupationLocation: {
				'@type': 'City',
				name: 'Huancayo'
			}
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
	<meta name="geo.region" content="PE-JUN" />
	<meta name="geo.placename" content="Huancayo" />
	<meta name="geo.position" content="-12.0653;-75.2049" />
	<meta name="ICBM" content="-12.0653, -75.2049" />

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

	<!-- Meta tags adicionales para SEO político -->
	<meta name="political-candidate" content="Rony Vejarano Pérez" />
	<meta name="election-type" content="municipal" />
	<meta name="election-location" content="Huancayo, Junín, Perú" />
	<meta name="political-party" content="Batalla Perú" />

	<!-- Canonical URL -->
	<link rel="canonical" href={url} />

	<!-- Datos estructurados JSON-LD -->
	{@html `<script type="application/ld+json">${JSON.stringify(structuredData)}</script>`}

	<!-- Favicon y iconos -->
	<link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
	<link rel="icon" type="image/png" sizes="16x16" href="/favicon.png" />
	<link rel="apple-touch-icon" sizes="180x180" href="/favicon.png" />
	<meta name="theme-color" content="#ffffff" />
</svelte:head>
