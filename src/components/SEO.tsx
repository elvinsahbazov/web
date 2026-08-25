import { Helmet } from 'react-helmet-async';
import { siteConfig } from '../config/site';

type SEOProps = {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
};

export default function SEO({
  title,
  description,
  image,
  url,
  type = 'website',
}: SEOProps) {
  const metaTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.title;
  const metaDescription = description || siteConfig.description;
  const metaImage = image || siteConfig.ogImage;
  const metaUrl = url ? `${siteConfig.url}${url}` : siteConfig.url;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{metaTitle}</title>
      <meta name="title" content={metaTitle} />
      <meta name="description" content={metaDescription} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={metaUrl} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={metaUrl} />
      <meta property="twitter:title" content={metaTitle} />
      <meta property="twitter:description" content={metaDescription} />
      <meta property="twitter:image" content={metaImage} />
    </Helmet>
  );
}
