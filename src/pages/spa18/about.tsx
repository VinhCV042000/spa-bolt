import { Helmet } from 'react-helmet-async';

import { Spa18SubAboutPageView } from 'src/sections/spa18/view/spa18-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Jungle Haven | Giới thiệu</title>
      </Helmet>
      <Spa18SubAboutPageView />
    </>
  );
}
