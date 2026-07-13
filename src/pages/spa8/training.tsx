import { Helmet } from 'react-helmet-async';

import { Spa8TrainingPageView } from 'src/sections/spa8/spa8-content-pages';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Amaya Onsen | Đào tạo</title>
      </Helmet>
      <Spa8TrainingPageView />
    </>
  );
}
