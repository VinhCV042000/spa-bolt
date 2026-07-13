import { Helmet } from 'react-helmet-async';

import { Spa13View } from 'src/sections/spa13/view';

export default function Spa13Page() {
  return (
    <>
      <Helmet>
        <title>Amazônia Selvagem — Brazilian Amazon Healing Spa</title>
        <meta
          name="description"
          content="Amazônia Selvagem — Bí quyết chữa lành Amazon: açaí scrub, dầu andiroba, bơ tucumã và đất sét Amazon. 100% nguyên liệu bền vững được chứng nhận IBAMA Brazil."
        />
      </Helmet>
      <Spa13View />
    </>
  );
}
