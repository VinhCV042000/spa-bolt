import { Helmet } from 'react-helmet-async';

import { Spa16SubBlogDetailsPageView } from 'src/sections/spa16/view/spa16-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Riad Al-Andalus | Bài viết</title>
      </Helmet>
      <Spa16SubBlogDetailsPageView />
    </>
  );
}
