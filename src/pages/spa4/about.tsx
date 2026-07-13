import { Helmet } from 'react-helmet-async';

import { Spa4AboutPageView } from 'src/sections/spa4/spa4-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Jade Blossom Spa | Giới thiệu</title>
      </Helmet>
      <Spa4AboutPageView />
    </>
  );
}
