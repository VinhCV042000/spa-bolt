import { Helmet } from 'react-helmet-async';

import { Spa27View } from 'src/sections/spa27/spa27-view';

export default function Spa27Page() {
  return (
    <>
      <Helmet>
        <title>Rosé Atelier — Pink Beauty Studio</title>
        <meta
          name="description"
          content="Rosé Atelier — beauty studio cao cấp với tông hồng phấn, rose gold, dịch vụ chăm sóc da và làm đẹp toàn diện."
        />
      </Helmet>
      <Spa27View />
    </>
  );
}
