import { Helmet } from 'react-helmet-async';

import { Spa17SubContactPageView } from 'src/sections/spa17/view/spa17-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Crystal Glow | Liên hệ</title>
      </Helmet>
      <Spa17SubContactPageView />
    </>
  );
}
