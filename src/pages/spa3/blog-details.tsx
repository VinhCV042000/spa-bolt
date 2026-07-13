import { Helmet } from 'react-helmet-async';

import { Spa3BlogDetailsPageView } from 'src/sections/spa3/view/spa3-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Mediterranean Spa | Bài viết</title>
      </Helmet>
      <Spa3BlogDetailsPageView />
    </>
  );
}
