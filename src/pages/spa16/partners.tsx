import { Helmet } from 'react-helmet-async';

import { Spa16SubPartnersPageView } from 'src/sections/spa16/view/spa16-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Riad Al-Andalus | Đối tác</title>
      </Helmet>
      <Spa16SubPartnersPageView />
    </>
  );
}
