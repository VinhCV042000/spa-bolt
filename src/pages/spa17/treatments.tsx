import { Helmet } from 'react-helmet-async';

import { Spa17SubTreatmentsPageView } from 'src/sections/spa17/view/spa17-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Crystal Glow | Liệu trình</title>
      </Helmet>
      <Spa17SubTreatmentsPageView />
    </>
  );
}
