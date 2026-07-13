import { Helmet } from 'react-helmet-async';

import { Spa11SubTrainingPageView } from 'src/sections/spa11/view/spa11-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Hammam Marrakech | Đào tạo</title>
      </Helmet>
      <Spa11SubTrainingPageView />
    </>
  );
}
