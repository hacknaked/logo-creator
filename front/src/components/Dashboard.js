import { useQuery, gql } from "@apollo/client";
import { classNames } from "src/utils";

const GET_LOGOS = gql`
  query GetLogosQuery {
    logos {
      id
      url
    }
  }
`;

const Dashboard = () => {
  const { loading, error, data } = useQuery(GET_LOGOS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-4 md:grid-cols-2">
      {data.logos.map((logo, index) => {
        return (
          <div
            className={classNames(
              "p-2 bg-white shadow",
              index === 0 ? "md:col-span-2 md:row-span-2" : ""
            )}
            key={logo.id}
          >
            <img className="rounded" src={logo.url} alt="AILogo"></img>
          </div>
        );
      })}
    </div>
  );
};

export default Dashboard;
