import { Helmet } from 'react-helmet-async';

import { Spa7SubBlogDetailsPageView } from 'src/sections/spa7/view/spa7-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Noir & Rose | Bài viết</title>
      </Helmet>
      <Spa7SubBlogDetailsPageView />
    </>
  );
}
