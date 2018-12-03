import React from "react";
import DashboardSection from "./DashboardSection";
import Card from "../Card/Card";
import abstractTech from "../../../assets/img/abstractTech.svg";

const Events = () => (
  <DashboardSection title="Events">
    <Card title="QHacks 2019" image={abstractTech}>
      <table
        css={`
          border: none;
          margin: 0 -4px;
          td {
            border: none;
            :first-child {
              color: #626b7b;
              font-weight: 600;
            }
            padding: 4px;
          }
        `}
      >
        <tbody>
          <tr>
            <td>Date:</td>
            <td>February 1-3, 2019</td>
          </tr>
          <tr>
            <td>Status:</td>
            <td>Applied</td>
          </tr>
        </tbody>
      </table>
      <div>
        <strong
          css="
            display: block;
            margin: 30px 0 8px;
            font-size: 18px;
          "
        >
          Thanks for applying!
        </strong>
        <p>
          Your application is in and the QHacks’s team is working hard to review
          it carefully. Stay tuned for updates.
        </p>
      </div>
    </Card>
  </DashboardSection>
);

export default Events;
