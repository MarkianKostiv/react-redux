import { FormDataProp } from "./FormDataProp";
export interface PostAddProps {
  requestType: "POST" | "PUT";
  initialValues: FormDataProp;
}
