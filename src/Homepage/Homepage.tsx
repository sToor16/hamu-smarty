import { Layout } from "antd";

export type HomepageProps = {};

const Homepage = (props: HomepageProps) => {
  return (
    <Layout>
      <Layout.Content
        style={{
          padding: "50px",
        }}
      />
    </Layout>
  );
};

export default Homepage;
