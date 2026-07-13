import { Helmet } from 'react-helmet-async';

import { Spa11SubTreatmentsPageView } from 'src/sections/spa11/view/spa11-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Hammam Marrakech | Liệu trình</title>
      </Helmet>
      <Spa11SubTreatmentsPageView />
    </>
  );
}
