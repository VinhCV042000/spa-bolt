import { Helmet } from 'react-helmet-async';

import { Spa18SubContactPageView } from 'src/sections/spa18/view/spa18-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Jungle Haven | Liên hệ</title>
      </Helmet>
      <Spa18SubContactPageView />
    </>
  );
}
