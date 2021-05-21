import { Footer, Header } from '../components/layout';

import styled from './BaseLayout.module.scss';

const BaseLayout = ({children}) => {
  return (
    <>
      <Header />
      <main className={styled.main}>
        { children }
      </main>
      <Footer />
    </>
  )
};

export default BaseLayout;