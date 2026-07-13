import { Helmet } from 'react-helmet-async';

import { Spa2TrainingPageView } from 'src/sections/spa2/view/spa2-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Nature Spa | Đào tạo</title>
      </Helmet>
      <Spa2TrainingPageView />
    </>
  );
}
