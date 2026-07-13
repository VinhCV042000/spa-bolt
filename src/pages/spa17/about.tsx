import { Helmet } from 'react-helmet-async';

import { Spa17SubAboutPageView } from 'src/sections/spa17/view/spa17-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Crystal Glow | Giới thiệu</title>
      </Helmet>
      <Spa17SubAboutPageView />
    </>
  );
}
