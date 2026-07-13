import { Helmet } from 'react-helmet-async';

import { Spa2MedicalSpaPageView } from 'src/sections/spa2/view/spa2-content-pages3';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Nature Spa | Medical Spa</title>
      </Helmet>
      <Spa2MedicalSpaPageView />
    </>
  );
}
