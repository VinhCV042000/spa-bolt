import { Helmet } from 'react-helmet-async';

import { Spa1TreatmentsPageView } from 'src/sections/spa1/view/spa1-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Luxe Spa | Treatment packages</title>
      </Helmet>
      <Spa1TreatmentsPageView />
    </>
  );
}
