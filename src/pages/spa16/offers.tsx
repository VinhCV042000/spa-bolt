import { Helmet } from 'react-helmet-async';

import { Spa16SubOffersPageView } from 'src/sections/spa16/view/spa16-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Riad Al-Andalus | Ưu đãi</title>
      </Helmet>
      <Spa16SubOffersPageView />
    </>
  );
}
