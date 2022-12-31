import { type NextPage } from "next";

import Layout from "../components/layout";

const mockData = {
  sections: [
    {
      sectionName: "Amazon",
      problems: [
        {
          name: "problem 1",
          slug: "",
          link: "",
          tags: [],
          otherCompanies: [
            ["amazon", 10],
            ["apple", 5],
          ],
          difficulty: "easy",
          occurrence: 45,
        },
        {
          name: "problem 2",
          slug: "",
          link: "",
          tags: [],
          otherCompanies: [
            ["amazon", 4],
            ["apple", 10],
          ],
          difficulty: "hard",
          occurence: 34,
        },
      ],
    },
    {
      sectionName: "Google",
      problems: [
        {
          name: "problem 3",
          slug: "",
          link: "",
          tags: [],
          otherCompanies: [],
          difficulty: "medium",
        },
      ],
    },
  ],
};

const ProblemsPage: NextPage = () => {
  return (
    <Layout title="Problems">
      <div>hi</div>
    </Layout>
  );
};

export default ProblemsPage;
