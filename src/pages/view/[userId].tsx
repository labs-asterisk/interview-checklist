import { type NextPage } from "next";
import { useRouter } from "next/router";

import { trpc } from "../../utils/trpc";

const ViewPage: NextPage = () => {
  const router = useRouter();
  const { userId } = router.query;

  const { isLoading, data, isError } = trpc.view.getGrid.useQuery({
    userId: userId ? userId.toString() : "",
  });

  if (isLoading) return <div>Loading</div>;
  if (isError) return <div>Error</div>;

  return (
    <div>
      <div>
        hi {userId} {JSON.stringify(data)}
      </div>
    </div>
  );
};

export default ViewPage;
