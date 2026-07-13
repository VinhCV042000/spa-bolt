import { Helmet } from 'react-helmet-async';

import { Spa16SubTrainingPageView } from 'src/sections/spa16/view/spa16-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Riad Al-Andalus | Đào tạo</title>
      </Helmet>
      <Spa16SubTrainingPageView />
    </>
  );
}
