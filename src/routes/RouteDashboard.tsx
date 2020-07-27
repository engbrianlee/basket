import React from "react";
import Layout from "../layout/Layout";
import { gql, useSubscription } from "@apollo/client";

const RouteDashboard = () => {
  const { data } = useSubscription(gql`
    subscription {
      current_user {
        id
        user {
          name
        }
      }
    }
  `);
  return (
    <Layout>
      <div className="bg-red-500">Dashboard</div>
      {JSON.stringify(data)}
    </Layout>
  );
};

export default RouteDashboard;
