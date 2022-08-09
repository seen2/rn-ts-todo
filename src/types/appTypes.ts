export interface ITodo {
  _id?: string,
  title: string,
  description: string,
  isCompleted: Boolean,
  userId: string,
  __v?: string | number
}


export interface IUser {
  name: string | null;
  email: string | null;
  password: string | null;
  _id: string | null;
  loading: boolean;
  msg: string | null;
  statusCode: number | null

}