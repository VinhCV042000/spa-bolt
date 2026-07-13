import { Helmet } from 'react-helmet-async';

import { Spa17SubPolicyPageView } from 'src/sections/spa17/view/spa17-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Crystal Glow | Chính sách</title>
      </Helmet>
      <Spa17SubPolicyPageView />
    </>
  );
}
