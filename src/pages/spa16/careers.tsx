import { Helmet } from 'react-helmet-async';

import { Spa16SubCareersPageView } from 'src/sections/spa16/view/spa16-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Riad Al-Andalus | Tuyển dụng</title>
      </Helmet>
      <Spa16SubCareersPageView />
    </>
  );
}
