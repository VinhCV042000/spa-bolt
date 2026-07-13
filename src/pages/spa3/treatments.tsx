import { Helmet } from 'react-helmet-async';

import { Spa3TreatmentsPageView } from 'src/sections/spa3/view/spa3-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Mediterranean Spa | Liệu trình</title>
      </Helmet>
      <Spa3TreatmentsPageView />
    </>
  );
}
