import { Helmet } from 'react-helmet-async';

import { Spa11SubBlogDetailsPageView } from 'src/sections/spa11/view/spa11-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Hammam Marrakech | Bài viết</title>
      </Helmet>
      <Spa11SubBlogDetailsPageView />
    </>
  );
}
