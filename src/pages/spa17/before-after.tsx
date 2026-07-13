import { Helmet } from 'react-helmet-async';

import { Spa17SubBeforeAfterPageView } from 'src/sections/spa17/view/spa17-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Crystal Glow | Trước & Sau</title>
      </Helmet>
      <Spa17SubBeforeAfterPageView />
    </>
  );
}
