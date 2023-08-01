import { BsAirplane } from "react-icons/bs";
import { PiHeartbeat } from "react-icons/pi";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import {
  IoCartOutline,
  IoFastFoodOutline,
  IoSchoolOutline,
  IoTicketOutline,
} from "react-icons/io5";
import { LuSofa } from "react-icons/lu";
import { BiShoppingBag } from "react-icons/bi";

export const expensesCategories = {
  travel: <BsAirplane />,
  health: <PiHeartbeat />,
  other: <RiMoneyDollarCircleLine />,
  entertainment: <IoTicketOutline />,
  "eating out": <IoFastFoodOutline />,
  education: <IoSchoolOutline />,
  home: <LuSofa />,
  shopping: <IoCartOutline />,
  groceries: <BiShoppingBag />,
};
