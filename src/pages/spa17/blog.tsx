import { Helmet } from 'react-helmet-async';

import { Spa17SubBlogPageView } from 'src/sections/spa17/view/spa17-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Crystal Glow | Blog</title>
      </Helmet>
      <Spa17SubBlogPageView />
    </>
  );
}
