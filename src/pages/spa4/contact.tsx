import { Helmet } from 'react-helmet-async';

import { Spa4ContactPageView } from 'src/sections/spa4/spa4-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Jade Blossom Spa | Liên hệ</title>
      </Helmet>
      <Spa4ContactPageView />
    </>
  );
}
