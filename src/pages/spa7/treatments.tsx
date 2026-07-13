import { Helmet } from 'react-helmet-async';

import { Spa7SubTreatmentsPageView } from 'src/sections/spa7/view/spa7-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Noir & Rose | Liệu trình</title>
      </Helmet>
      <Spa7SubTreatmentsPageView />
    </>
  );
}
