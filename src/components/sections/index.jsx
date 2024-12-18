import React, { lazy, Suspense } from 'react';
  import SectionOne from './sectionOne'
import SectionTwo from './sectionTwo'
import SectionThree from './sectionThree'
const SectionFour = lazy(() => import('./sectionFour'));
const index = () => {
  return (
    <>
 <SectionOne/>
<SectionTwo/>
<SectionThree/>
<Suspense fallback={<div>Loading Section Four...</div>}>
        <SectionFour />
      </Suspense>    </>
  )
}

export default index
