import { Helmet } from 'react-helmet-async';

import { Spa17SubFaqPageView } from 'src/sections/spa17/view/spa17-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Crystal Glow | FAQ</title>
      </Helmet>
      <Spa17SubFaqPageView />
    </>
  );
}
