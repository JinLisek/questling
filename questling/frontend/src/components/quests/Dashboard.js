import React, { Fragment } from "react";

import Form from "./Form";
import Quests from "./Quests";

export default function Dashboard() {
  return (
    <Fragment>
      <Form />
      <Quests />
    </Fragment>
  );
}
