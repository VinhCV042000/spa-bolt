import { Helmet } from 'react-helmet-async';

import { Spa2SkinSchoolPageView } from 'src/sections/spa2/view/spa2-content-pages5';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Nature Spa | Skin School</title>
      </Helmet>
      <Spa2SkinSchoolPageView />
    </>
  );
}
