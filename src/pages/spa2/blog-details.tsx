import { Helmet } from 'react-helmet-async';

import { Spa2BlogDetailsPageView } from 'src/sections/spa2/view/spa2-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Nature Spa | Bài viết</title>
      </Helmet>
      <Spa2BlogDetailsPageView />
    </>
  );
}
