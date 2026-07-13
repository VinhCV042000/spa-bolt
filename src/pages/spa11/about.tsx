import { Helmet } from 'react-helmet-async';

import { Spa11SubAboutPageView } from 'src/sections/spa11/view/spa11-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Hammam Marrakech | Giới thiệu</title>
      </Helmet>
      <Spa11SubAboutPageView />
    </>
  );
}
