import { Helmet } from 'react-helmet-async';

import { Spa2TherapistProfilePageView } from 'src/sections/spa2/view/spa2-content-pages5';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Nature Spa | Therapist Profile</title>
      </Helmet>
      <Spa2TherapistProfilePageView />
    </>
  );
}
