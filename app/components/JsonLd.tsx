export default function JsonLd() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://strandandstonellc.com/#organization",
    name: "Strand & Stone LLC",
    alternateName: "Strand and Stone",
    url: "https://strandandstonellc.com",
    logo: {
      "@type": "ImageObject",
      url: "https://strandandstonellc.com/icons/icon-512.png",
      width: 512,
      height: 512,
    },
    foundingDate: "2013",
    foundingLocation: {
      "@type": "Place",
      name: "Santa Monica, California",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Santa Monica",
        addressRegion: "CA",
        addressCountry: "US",
      },
    },
    description:
      "Strand & Stone LLC is a digital studio crafting unique digital experiences. Founded in 2013 in Santa Monica, California.",
    knowsAbout: [
      "Digital Experience Design",
      "Web Development",
      "Brand Identity",
      "Interactive Design",
    ],
    sameAs: ["https://github.com/strand-and-stone"],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://strandandstonellc.com/#website",
    url: "https://strandandstonellc.com",
    name: "Strand & Stone LLC",
    publisher: {
      "@id": "https://strandandstonellc.com/#organization",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://strandandstonellc.com/?s={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}
