import { Helmet } from 'react-helmet-async';

import { Spa17SubServiceDetailsPageView } from 'src/sections/spa17/view/spa17-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Crystal Glow | Chi tiết dịch vụ</title>
      </Helmet>
      <Spa17SubServiceDetailsPageView />
    </>
  );
}
