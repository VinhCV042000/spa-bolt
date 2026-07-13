import { Helmet } from 'react-helmet-async';

import { Spa7SubBlogPageView } from 'src/sections/spa7/view/spa7-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Noir & Rose | Blog</title>
      </Helmet>
      <Spa7SubBlogPageView />
    </>
  );
}
