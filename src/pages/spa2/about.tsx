import { Helmet } from 'react-helmet-async';

import { Spa2AboutPageView } from 'src/sections/spa2/view/spa2-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Nature Spa | Giới thiệu</title>
      </Helmet>
      <Spa2AboutPageView />
    </>
  );
}
