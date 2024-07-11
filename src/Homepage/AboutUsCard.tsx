import { Card, Typography } from 'antd';
import { Img } from 'react-image';
import AboutMe from '../assets/images/about_me.jpg';

const { Title, Paragraph } = Typography;

type AboutUsCardProps = {
  name: string;
  intro: string;
};

const AboutUsCard = (props: AboutUsCardProps) => {
  return (
    <Card
      hoverable={true}
      cover={<Img alt="Lifestyle" src={AboutMe} />}
      style={{ width: 300 }}
    >
      <div style={{ textAlign: 'center' }}>
        <Title level={3}>{props.name}</Title>
        <Paragraph>{props.intro}</Paragraph>
      </div>
    </Card>
  );
};

export default AboutUsCard;
