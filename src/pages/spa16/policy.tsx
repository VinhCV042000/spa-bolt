import { Helmet } from 'react-helmet-async';

import { Spa16SubPolicyPageView } from 'src/sections/spa16/view/spa16-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Riad Al-Andalus | Chính sách</title>
      </Helmet>
      <Spa16SubPolicyPageView />
    </>
  );
}
