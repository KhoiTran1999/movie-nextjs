"use client";

import Dashboard from "@/components/adminPage/content/Dashboard";
import Axios from "@/utils/axios";
import { setStatistics } from "@/utils/redux/slices/data/statisticSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function page() {
  return <Dashboard />;
}
