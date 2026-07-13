import { Helmet } from 'react-helmet-async';

import { Spa14SubBlogPageView } from 'src/sections/spa14/view/spa14-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Imperial Vienna | Blog</title>
      </Helmet>
      <Spa14SubBlogPageView />
    </>
  );
}
