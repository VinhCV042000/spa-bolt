import { Helmet } from 'react-helmet-async';

import { Spa16SubTreatmentsPageView } from 'src/sections/spa16/view/spa16-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Riad Al-Andalus | Liệu trình</title>
      </Helmet>
      <Spa16SubTreatmentsPageView />
    </>
  );
}
