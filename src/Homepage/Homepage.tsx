import { Col, Layout, Row } from 'antd';
import { Img } from 'react-image';
import HomepageJpg from '../assets/images/homepage_2.jpg';
import AboutUsCard from './AboutUsCard';
import './Homepage.css';

const Homepage = () => {
  return (
    <Layout className="layout-content">
      <Img
        src={HomepageJpg}
        style={{
          maxWidth: '100%',
          maxHeight: '700px',
          objectFit: 'contain',
          marginBottom: '40px',
        }}
      />
      <Row gutter={[16, 16]} justify="space-between">
        <Col xs={24} sm={12} md={12} lg={12} xl={12} className="center-content">
          <AboutUsCard name="Shubhpreet Toor" intro="Software Engineer working for Amazon" />
        </Col>
        <Col xs={24} sm={12} md={12} lg={12} xl={12} className="center-content">
          <AboutUsCard name="Harmeen Toor" intro="RN working at Greenville Memorial Hospital" />
        </Col>
      </Row>
    </Layout>
  );
};

export default Homepage;
