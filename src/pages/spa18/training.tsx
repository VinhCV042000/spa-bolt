import { Helmet } from 'react-helmet-async';

import { Spa18SubTrainingPageView } from 'src/sections/spa18/view/spa18-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Jungle Haven | Đào tạo</title>
      </Helmet>
      <Spa18SubTrainingPageView />
    </>
  );
}
