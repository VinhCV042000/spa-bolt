import { Helmet } from 'react-helmet-async';

import { Spa11SubContactPageView } from 'src/sections/spa11/view/spa11-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Hammam Marrakech | Liên hệ</title>
      </Helmet>
      <Spa11SubContactPageView />
    </>
  );
}
