import { Helmet } from 'react-helmet-async';

import { Spa13PromotionsView } from 'src/sections/spa13/spa13-content-pages';

export default function Spa13PromotionsPage() {
  return (
    <>
      <Helmet>
        <title>Promotions — Amazônia Selvagem Spa</title>
      </Helmet>
      <Spa13PromotionsView />
    </>
  );
}
