import { Helmet } from 'react-helmet-async';

import { Spa7SubPartnersPageView } from 'src/sections/spa7/view/spa7-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Noir & Rose | Đối tác</title>
      </Helmet>
      <Spa7SubPartnersPageView />
    </>
  );
}
