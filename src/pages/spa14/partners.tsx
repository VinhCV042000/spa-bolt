import { Helmet } from 'react-helmet-async';

import { Spa14SubPartnersPageView } from 'src/sections/spa14/view/spa14-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Imperial Vienna | Đối tác</title>
      </Helmet>
      <Spa14SubPartnersPageView />
    </>
  );
}
