import { Helmet } from 'react-helmet-async';

import { Spa3TrainingPageView } from 'src/sections/spa3/view/spa3-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Mediterranean Spa | Đào tạo</title>
      </Helmet>
      <Spa3TrainingPageView />
    </>
  );
}
