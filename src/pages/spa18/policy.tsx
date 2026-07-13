import { Helmet } from 'react-helmet-async';

import { Spa18SubPolicyPageView } from 'src/sections/spa18/view/spa18-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Jungle Haven | Chính sách</title>
      </Helmet>
      <Spa18SubPolicyPageView />
    </>
  );
}
