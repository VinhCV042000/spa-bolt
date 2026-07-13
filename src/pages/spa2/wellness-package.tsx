import { Helmet } from 'react-helmet-async';

import { Spa2WellnessPackagePageView } from 'src/sections/spa2/view/spa2-content-pages2';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Nature Spa | WellnessPackagePage</title>
      </Helmet>
      <Spa2WellnessPackagePageView />
    </>
  );
}
