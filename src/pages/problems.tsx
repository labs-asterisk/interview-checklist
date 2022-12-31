import { type NextPage } from "next";

import Layout from "../components/layout";

import ProblemGrid from "../components/problemGrid";

const ProblemsPage: NextPage = () => {
  return (
    <Layout title="Problems">
      <ProblemGrid />
    </Layout>
  );
};

export default ProblemsPage;
