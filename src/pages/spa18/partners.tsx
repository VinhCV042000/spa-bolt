import { Helmet } from 'react-helmet-async';

import { Spa18SubPartnersPageView } from 'src/sections/spa18/view/spa18-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Jungle Haven | Đối tác</title>
      </Helmet>
      <Spa18SubPartnersPageView />
    </>
  );
}
