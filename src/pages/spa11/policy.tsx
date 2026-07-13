import { Helmet } from 'react-helmet-async';

import { Spa11SubPolicyPageView } from 'src/sections/spa11/view/spa11-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Hammam Marrakech | Chính sách</title>
      </Helmet>
      <Spa11SubPolicyPageView />
    </>
  );
}
