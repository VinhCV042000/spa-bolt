import { Helmet } from 'react-helmet-async';

import { Spa14SubPolicyPageView } from 'src/sections/spa14/view/spa14-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Imperial Vienna | Chính sách</title>
      </Helmet>
      <Spa14SubPolicyPageView />
    </>
  );
}
