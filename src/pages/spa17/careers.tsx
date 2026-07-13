import { Helmet } from 'react-helmet-async';

import { Spa17SubCareersPageView } from 'src/sections/spa17/view/spa17-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Crystal Glow | Tuyển dụng</title>
      </Helmet>
      <Spa17SubCareersPageView />
    </>
  );
}
