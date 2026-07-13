import { Helmet } from 'react-helmet-async';

import { Spa11SubPartnersPageView } from 'src/sections/spa11/view/spa11-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Hammam Marrakech | Đối tác</title>
      </Helmet>
      <Spa11SubPartnersPageView />
    </>
  );
}
