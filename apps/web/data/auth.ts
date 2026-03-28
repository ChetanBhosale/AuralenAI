import fetcher from "@/lib/fetcher";
import endpoints from "@/utils/enpoints";
import type { IResponse, IMeData } from "@/types/api";

const auth = {
  me: (): Promise<IResponse<IMeData>> =>
    fetcher.get(endpoints.auth.me).then((res) => res.data),
};

export default auth;
