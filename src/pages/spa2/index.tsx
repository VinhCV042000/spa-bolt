import { Helmet } from 'react-helmet-async';

import { Spa2View } from 'src/sections/spa2/view';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Nature Spa & Wellness</title>
      </Helmet>
      <Spa2View />
    </>
  );
}
