import { Helmet } from 'react-helmet-async';

import { Spa3BlogPageView } from 'src/sections/spa3/view/spa3-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Mediterranean Spa | Blog</title>
      </Helmet>
      <Spa3BlogPageView />
    </>
  );
}
