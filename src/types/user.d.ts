// type UserData = {
//     id: number,
//     email: string,
//     first_name: string,
//     last_name: string,
//     avatar: string,
//   };

//   type supportData = {
//     text: string,
//     url: string,
//   }
  
//   type UserResData = {
//     data: UserData[],
//     page: number,
//     per_page: number,
//     support: supportData,
//     url: string,
//     total: number,
//     total_pages: number,
//   };

type IUser = {
    id: number;
    email?: string;
    first_name: string;
    last_name?: string;
  };