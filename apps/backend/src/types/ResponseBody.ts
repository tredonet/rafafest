export type ResponseBody<T> = T | {
    status: number;
    data: T;
}
