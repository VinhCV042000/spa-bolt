import { Helmet } from 'react-helmet-async';

import { Spa17SubBlogDetailsPageView } from 'src/sections/spa17/view/spa17-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Crystal Glow | Bài viết</title>
      </Helmet>
      <Spa17SubBlogDetailsPageView />
    </>
  );
}
