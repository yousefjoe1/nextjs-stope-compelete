import { getData } from "@/actions/getGroups";
import React from "react";
import GroupCard from "./GroupCard";
import { Group } from "@/types/types";

const GroupCards = async () => {
  const data = await getData("groups");
  console.log("🚀 ~ GroupCards ~ data:", data)
  return (
    <>
      {data?.data?.map((group: Group) => (
        <GroupCard group={group} key={group._id} />
      ))}
    </>
  );
};

export default GroupCards;
