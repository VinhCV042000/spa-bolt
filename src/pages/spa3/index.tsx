import { Helmet } from 'react-helmet-async';

import { Spa3View } from 'src/sections/spa3/view';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Mediterranean Spa & Wellness</title>
      </Helmet>
      <Spa3View />
    </>
  );
}
