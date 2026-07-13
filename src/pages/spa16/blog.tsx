import { Helmet } from 'react-helmet-async';

import { Spa16SubBlogPageView } from 'src/sections/spa16/view/spa16-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Riad Al-Andalus | Blog</title>
      </Helmet>
      <Spa16SubBlogPageView />
    </>
  );
}
