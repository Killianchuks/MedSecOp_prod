import NextHead from "next/head"

interface HeadProps {
  title?: string
  description?: string
  keywords?: string
  author?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  ogUrl?: string
}

export default function Head({
  title = "MedSecOp - Secure Medical Second Opinions",
  description = "Get secure medical second opinions from top specialists worldwide.",
  keywords = "medical, second opinion, healthcare, telemedicine",
  author = "MedSecOp",
  ogTitle,
  ogDescription,
  ogImage,
  ogUrl,
}: HeadProps) {
  // Create an array of meta tags
  const metaTags = [
    { name: "description", content: description },
    { name: "keywords", content: keywords },
    { name: "author", content: author },
    { property: "og:title", content: ogTitle || title },
    { property: "og:description", content: ogDescription || description },
    { property: "og:image", content: ogImage },
    { property: "og:url", content: ogUrl },
    { name: "twitter:card", content: "summary_large_image" },
  ].filter((tag) => tag.content) // Filter out tags with no content

  return (
    <NextHead>
      <title>{title}</title>
      {/* Add a unique key to each meta tag */}
      {metaTags.map((tag, index) => {
        const key = `meta-${tag.name || tag.property}-${index}`
        return tag.name ? (
          <meta key={key} name={tag.name} content={tag.content} />
        ) : (
          <meta key={key} property={tag.property} content={tag.content} />
        )
      })}
    </NextHead>
  )
}

