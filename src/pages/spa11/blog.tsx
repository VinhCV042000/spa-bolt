import { Helmet } from 'react-helmet-async';

import { Spa11SubBlogPageView } from 'src/sections/spa11/view/spa11-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Hammam Marrakech | Blog</title>
      </Helmet>
      <Spa11SubBlogPageView />
    </>
  );
}
