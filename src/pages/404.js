import * as React from 'react';
import { Link } from 'gatsby';
import Footer from '../components/footer';
import { Helmet } from 'react-helmet';

// markup
const NotFoundPage = () => {
  const [scrollTop, setScrollTop] = React.useState(false);

  React.useEffect(() => {
    if (scrollTop) {
      window.scrollTo(0, 0);
      setScrollTop(false);
    }
  }, [scrollTop]);

  return (
    <main>
      <Helmet>
        <title>Website and Application Development Portfolio | Asher Best</title>
        <meta name='description' content="Asher Best's Website and Application Development Portfolio" />
      </Helmet>
      <section className='hero'>
        <div>
          <h1 className='section-title'>
            404 | Page <span>Not Found</span>
            <br />
            This page does not exist.
          </h1>
          <Link to='/' className='call-to-action hero-cta'>
            Return Home
          </Link>
        </div>
      </section>
      <Footer setScrollTop={setScrollTop} />
    </main>
  );
};

export default NotFoundPage;
