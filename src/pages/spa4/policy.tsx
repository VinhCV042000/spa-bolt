import { Helmet } from 'react-helmet-async';

import { Spa4PolicyPageView } from 'src/sections/spa4/spa4-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Jade Blossom Spa | Chính sách</title>
      </Helmet>
      <Spa4PolicyPageView />
    </>
  );
}
