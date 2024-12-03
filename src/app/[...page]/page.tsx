import {
  Content,
  fetchOneEntry,
  getBuilderSearchParams,
  isPreviewing,
} from "@builder.io/sdk-react";

interface PageProps {
  params: {
    page: string[];
  };
  searchParams: Record<string, string>;
}

const PUBLIC_API_KEY = "ad30f9a246614faaa6a03374f83554c9";

export default async function Page(props: PageProps) {
  const { initializeNodeRuntime } = await import(
    "@builder.io/sdk-react/node/init"
  );
  initializeNodeRuntime();

  const urlPath = "/" + (props.params?.page?.join("/") || "");

  const content = await fetchOneEntry({
    options: getBuilderSearchParams(props.searchParams),
    apiKey: PUBLIC_API_KEY,
    model: "page",
    userAttributes: { urlPath },
  });

  const canShowContent = content || isPreviewing(props.searchParams);

  if (!canShowContent) {
    return (
      <>
        <h1>404</h1>
        <p>Make sure you have your content published at Builder.io.</p>
      </>
    );
  }
  return (
    <div>
      hello updated
      <Content content={content} apiKey={PUBLIC_API_KEY} model="page" />
    </div>
  );
}
