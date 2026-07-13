import { Helmet } from 'react-helmet-async';

import { Spa14SubTreatmentsPageView } from 'src/sections/spa14/view/spa14-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Imperial Vienna | Liệu trình</title>
      </Helmet>
      <Spa14SubTreatmentsPageView />
    </>
  );
}
