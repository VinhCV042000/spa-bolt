import { Helmet } from 'react-helmet-async';

import { Spa18SubBlogDetailsPageView } from 'src/sections/spa18/view/spa18-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Jungle Haven | Bài viết</title>
      </Helmet>
      <Spa18SubBlogDetailsPageView />
    </>
  );
}
