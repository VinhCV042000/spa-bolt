import { Helmet } from 'react-helmet-async';

import { Spa18SubBlogPageView } from 'src/sections/spa18/view/spa18-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Jungle Haven | Blog</title>
      </Helmet>
      <Spa18SubBlogPageView />
    </>
  );
}
