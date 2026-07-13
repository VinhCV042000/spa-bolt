import { Helmet } from 'react-helmet-async';

import { Spa17SubTrainingPageView } from 'src/sections/spa17/view/spa17-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Crystal Glow | Đào tạo</title>
      </Helmet>
      <Spa17SubTrainingPageView />
    </>
  );
}
