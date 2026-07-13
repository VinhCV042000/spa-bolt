import { Helmet } from 'react-helmet-async';

import { Spa4TrainingPageView } from 'src/sections/spa4/spa4-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Jade Blossom Spa | Đào tạo</title>
      </Helmet>
      <Spa4TrainingPageView />
    </>
  );
}
