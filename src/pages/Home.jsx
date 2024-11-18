import { Helmet } from 'react-helmet';
import ClientSays from './ClientSays';
import FAQs from './Faqs';
import Services from './Services';
import Banner from './Banner';

const Home = () => {

  return (
    <main>
      <Helmet>
        <title>EquiLaw | Home</title>
      </Helmet>
      <section className="hero min-h-screen bg-base-200 flex justify-center items-center" style={{ backgroundImage: 'linear-gradient(to bottom, rgba(17, 17, 17, 0) 0%, rgba(17, 17, 17, 1) 100%), url(/images/banner.png)' }}>
        <Banner></Banner>
      </section>
      <section>
        <Services></Services>
      </section>
      <section>
        <ClientSays></ClientSays>
      </section>
      <section>
        <FAQs></FAQs>
      </section>
    </main>
  );
};

export default Home;
