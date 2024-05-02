import { useDispatch, useSelector } from "react-redux";
import { AppDistpatch, RootState } from "./store/store";

export const useAppDispatch = useDispatch.withTypes<AppDistpatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
