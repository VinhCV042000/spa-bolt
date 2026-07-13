import { Helmet } from 'react-helmet-async';

import { Spa18SubTreatmentsPageView } from 'src/sections/spa18/view/spa18-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Jungle Haven | Liệu trình</title>
      </Helmet>
      <Spa18SubTreatmentsPageView />
    </>
  );
}
